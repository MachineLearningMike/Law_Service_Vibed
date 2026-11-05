"""FastAPI application: public content API, contact form, admin API and the static site."""
from __future__ import annotations

import csv
import io
import os
import sqlite3
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from typing import Any

from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, Field

from . import db

SESSION_COOKIE = "admin_session"
SESSION_TTL = 12 * 3600
# Set SECURE_COOKIES=1 when the site is served over HTTPS.
SECURE_COOKIES = os.environ.get("SECURE_COOKIES") == "1"

app = FastAPI(title="Law firm site API", docs_url="/api/docs", redoc_url=None, openapi_url="/api/openapi.json")


# ---------------------------------------------------------------- helpers

class RateLimiter:
    """Tiny in-memory sliding-window limiter, keyed by client IP."""

    def __init__(self, limit: int, window: float):
        self.limit, self.window = limit, window
        self.hits: dict[str, deque[float]] = defaultdict(deque)

    def blocked(self, key: str) -> bool:
        now, q = time.monotonic(), self.hits[key]
        while q and now - q[0] > self.window:
            q.popleft()
        return len(q) >= self.limit

    def hit(self, key: str) -> None:
        self.hits[key].append(time.monotonic())


contact_limiter = RateLimiter(limit=5, window=600)  # 5 messages / 10 min
login_limiter = RateLimiter(limit=5, window=900)  # 5 failed logins / 15 min


def client_ip(request: Request) -> str:
    return request.client.host if request.client else "unknown"


def get_conn():
    with db.connect() as conn:
        yield conn


Conn = Depends(get_conn)


@app.middleware("http")
async def security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers.setdefault("X-Content-Type-Options", "nosniff")
    response.headers.setdefault("Referrer-Policy", "same-origin")
    if request.url.path.startswith(("/admin", "/api/admin")):
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Cache-Control", "no-store")
    return response


# ---------------------------------------------------------------- public API

@app.get("/api/content")
def content(conn: sqlite3.Connection = Conn) -> dict[str, Any]:
    """Everything the public pages render, in the shape js/main.js expects."""
    return {
        "site": db.get_setting(conn, "site", {}),
        "practices": [{"id": p["slug"], "icon": p["icon"], "title": p["title"], "short": p["short"], "items": p["items"]}
                      for p in db.list_items(conn, "practices")],
        "why": [[w["icon"], w["title"], w["description"]] for w in db.list_items(conn, "why")],
        "team": [{"name": m["name"], "role": m["role"], "bio": m["bio"], "langs": m["langs"]}
                 for m in db.list_items(conn, "team")],
        "posts": [{"slug": p["slug"], "date": p["date"], "cat": p["category"], "title": p["title"],
                   "excerpt": p["excerpt"], "body": p["body"]}
                  for p in db.list_items(conn, "posts", published_only=True)],
        "testimonials": [{"quote": t["quote"], "author": t["author"], "role": t["role"]}
                         for t in db.list_items(conn, "testimonials")],
        "fees": [{"title": f["title"], "price": f["price"], "unit": f["unit"]} for f in db.list_items(conn, "fees")],
    }


class ContactIn(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)
    name: str = Field(min_length=1, max_length=120)
    email: str = Field(min_length=3, max_length=254, pattern=db.EMAIL_RE.pattern)
    company: str = Field(default="", max_length=160)
    topic: str = Field(default="General enquiry", max_length=80)
    message: str = Field(min_length=1, max_length=5000)
    website: str = Field(default="", max_length=500)  # honeypot: hidden from people, filled in by bots


@app.post("/api/contact", status_code=201)
def contact(body: ContactIn, request: Request, conn: sqlite3.Connection = Conn) -> dict[str, bool]:
    ip = client_ip(request)
    if contact_limiter.blocked(ip):
        raise HTTPException(429, "Too many messages. Please try again later.")
    contact_limiter.hit(ip)
    if body.website:  # pretend success so bots don't adapt
        return {"ok": True}
    conn.execute(
        "INSERT INTO inquiries(created_at, name, email, company, topic, message, ip) VALUES(?, ?, ?, ?, ?, ?, ?)",
        (datetime.now(timezone.utc).isoformat(timespec="seconds"), body.name, body.email, body.company,
         body.topic, body.message, ip),
    )
    return {"ok": True}


# ---------------------------------------------------------------- admin auth

def require_admin(request: Request, conn: sqlite3.Connection = Conn) -> sqlite3.Connection:
    if not db.session_valid(conn, request.cookies.get(SESSION_COOKIE)):
        raise HTTPException(401, "Not logged in.")
    # Cross-site requests can't set custom headers without a CORS preflight (which we never allow),
    # so requiring this header on writes blocks CSRF in addition to the SameSite cookie.
    if request.method not in ("GET", "HEAD") and request.headers.get("X-Requested-With") != "admin":
        raise HTTPException(403, "Missing X-Requested-With header.")
    return conn


Admin = Depends(require_admin)


class LoginIn(BaseModel):
    password: str = Field(min_length=1, max_length=200)


@app.post("/api/admin/login")
def login(body: LoginIn, request: Request, response: Response, conn: sqlite3.Connection = Conn) -> dict[str, bool]:
    ip = client_ip(request)
    if login_limiter.blocked(ip):
        raise HTTPException(429, "Too many failed attempts. Try again in 15 minutes.")
    if not db.check_password(conn, body.password):
        login_limiter.hit(ip)
        raise HTTPException(401, "Wrong password.")
    token = db.create_session(conn, SESSION_TTL)
    response.set_cookie(SESSION_COOKIE, token, max_age=SESSION_TTL, httponly=True, samesite="strict",
                        secure=SECURE_COOKIES, path="/")
    return {"ok": True}


@app.post("/api/admin/logout")
def logout(request: Request, response: Response, conn: sqlite3.Connection = Conn) -> dict[str, bool]:
    db.delete_session(conn, request.cookies.get(SESSION_COOKIE))
    response.delete_cookie(SESSION_COOKIE, path="/")
    return {"ok": True}


@app.get("/api/admin/me")
def me(conn: sqlite3.Connection = Admin) -> dict[str, Any]:
    new = conn.execute("SELECT COUNT(*) FROM inquiries WHERE status = 'new'").fetchone()[0]
    return {"ok": True, "new_inquiries": new}


@app.get("/api/admin/schema")
def schema(conn: sqlite3.Connection = Admin) -> dict[str, Any]:
    return {
        "collections": {k: {"label": v["label"], "title_field": v["title_field"], "fields": v["fields"]}
                        for k, v in db.COLLECTIONS.items()},
        "site_fields": db.SITE_FIELDS,
        "icons": db.ICONS,
        "inquiry_statuses": db.INQUIRY_STATUSES,
    }


# ---------------------------------------------------------------- admin: firm details

@app.get("/api/admin/site")
def get_site(conn: sqlite3.Connection = Admin) -> dict[str, Any]:
    return db.get_setting(conn, "site", {})


@app.put("/api/admin/site")
async def put_site(request: Request, conn: sqlite3.Connection = Admin) -> dict[str, Any]:
    clean = _validate(db.SITE_FIELDS, await _json(request))
    db.set_setting(conn, "site", clean)
    return clean


# ---------------------------------------------------------------- admin: content collections

def _collection(name: str) -> str:
    if name not in db.COLLECTIONS:
        raise HTTPException(404, "Unknown collection.")
    return name


async def _json(request: Request) -> Any:
    try:
        return await request.json()
    except ValueError:
        raise HTTPException(400, "Body must be JSON.")


def _validate(fields: list[dict], data: Any) -> dict[str, Any]:
    try:
        return db.validate(fields, data)
    except db.ValidationError as e:
        raise HTTPException(422, str(e))


def _save(conn: sqlite3.Connection, fn, *args):
    try:
        return fn(conn, *args)
    except sqlite3.IntegrityError:
        raise HTTPException(409, "Another item already uses that URL id.")


@app.get("/api/admin/c/{name}")
def list_collection(name: str, conn: sqlite3.Connection = Admin) -> list[dict]:
    return db.list_items(conn, _collection(name))


@app.post("/api/admin/c/{name}", status_code=201)
async def create_item(name: str, request: Request, conn: sqlite3.Connection = Admin) -> dict:
    name = _collection(name)
    clean = _validate(db.COLLECTIONS[name]["fields"], await _json(request))
    item_id = _save(conn, db.insert_item, name, clean)
    return db.get_item(conn, name, item_id)


@app.put("/api/admin/c/{name}/{item_id}")
async def update_item(name: str, item_id: int, request: Request, conn: sqlite3.Connection = Admin) -> dict:
    name = _collection(name)
    clean = _validate(db.COLLECTIONS[name]["fields"], await _json(request))
    if not _save(conn, db.update_item, name, item_id, clean):
        raise HTTPException(404, "Item not found.")
    return db.get_item(conn, name, item_id)


@app.delete("/api/admin/c/{name}/{item_id}")
def delete_item(name: str, item_id: int, conn: sqlite3.Connection = Admin) -> dict[str, bool]:
    if not db.delete_item(conn, _collection(name), item_id):
        raise HTTPException(404, "Item not found.")
    return {"ok": True}


# ---------------------------------------------------------------- admin: inquiries

INQUIRY_COLUMNS = ["id", "created_at", "status", "name", "email", "company", "topic", "message", "ip"]


def _inquiries(conn: sqlite3.Connection, status: str | None) -> list[dict]:
    if status and status not in db.INQUIRY_STATUSES:
        raise HTTPException(422, "Unknown status.")
    sql = "SELECT * FROM inquiries" + (" WHERE status = ?" if status else "") + " ORDER BY created_at DESC, id DESC"
    return [dict(r) for r in conn.execute(sql, (status,) if status else ()).fetchall()]


@app.get("/api/admin/inquiries")
def list_inquiries(status: str | None = None, conn: sqlite3.Connection = Admin) -> list[dict]:
    return _inquiries(conn, status)


@app.get("/api/admin/inquiries.csv")
def export_inquiries(status: str | None = None, conn: sqlite3.Connection = Admin) -> Response:
    buf = io.StringIO()
    w = csv.DictWriter(buf, fieldnames=INQUIRY_COLUMNS, extrasaction="ignore")
    w.writeheader()
    for row in _inquiries(conn, status):
        # Prefix cells that spreadsheet apps would treat as formulas.
        w.writerow({k: ("'" + str(v) if str(v)[:1] in "=+-@\t\r" else v) for k, v in row.items()})
    return Response("﻿" + buf.getvalue(), media_type="text/csv; charset=utf-8",
                    headers={"Content-Disposition": 'attachment; filename="inquiries.csv"'})


class InquiryPatch(BaseModel):
    status: str = Field(pattern="^(" + "|".join(db.INQUIRY_STATUSES) + ")$")


@app.patch("/api/admin/inquiries/{item_id}")
def patch_inquiry(item_id: int, body: InquiryPatch, conn: sqlite3.Connection = Admin) -> dict[str, bool]:
    if not conn.execute("UPDATE inquiries SET status = ? WHERE id = ?", (body.status, item_id)).rowcount:
        raise HTTPException(404, "Inquiry not found.")
    return {"ok": True}


@app.delete("/api/admin/inquiries/{item_id}")
def delete_inquiry(item_id: int, conn: sqlite3.Connection = Admin) -> dict[str, bool]:
    if not conn.execute("DELETE FROM inquiries WHERE id = ?", (item_id,)).rowcount:
        raise HTTPException(404, "Inquiry not found.")
    return {"ok": True}


@app.api_route("/api/{rest:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"], include_in_schema=False)
def api_not_found(rest: str):
    return JSONResponse({"detail": "Not found."}, status_code=404)


# ---------------------------------------------------------------- static site
# Only the public folders and root *.html pages are served, never backend/, data/ or .git/.

ROOT = db.ROOT
PAGES = {p.name for p in ROOT.glob("*.html")}

for folder in ("css", "js", "img", "images", "assets"):
    if (ROOT / folder).is_dir():
        app.mount(f"/{folder}", StaticFiles(directory=ROOT / folder), name=folder)
app.mount("/admin", StaticFiles(directory=ROOT / "admin", html=True), name="admin")


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(ROOT / "index.html")


@app.get("/{page}", include_in_schema=False)
def page(page: str):
    if page == "admin":
        return Response(status_code=307, headers={"Location": "/admin/"})
    if page not in PAGES:
        raise HTTPException(404, "Page not found.")
    return FileResponse(ROOT / page)
