"""SQLite storage: schema, seeding, content validation and admin credentials.

Uses only the standard library. The database file lives in ``data/site.db``
(override the folder with the LAW_DATA_DIR environment variable).
"""
from __future__ import annotations

import hashlib
import hmac
import json
import os
import re
import secrets
import sqlite3
import time
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = Path(os.environ.get("LAW_DATA_DIR", ROOT / "data"))
DB_PATH = DATA_DIR / "site.db"
SEED_PATH = Path(__file__).resolve().parent / "seed.json"

SCHEMA = """
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS practices (
  id INTEGER PRIMARY KEY, slug TEXT UNIQUE NOT NULL, icon TEXT NOT NULL, title TEXT NOT NULL,
  short TEXT NOT NULL DEFAULT '', items TEXT NOT NULL DEFAULT '[]', position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS why (
  id INTEGER PRIMARY KEY, icon TEXT NOT NULL, title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS team (
  id INTEGER PRIMARY KEY, name TEXT NOT NULL, role TEXT NOT NULL DEFAULT '', bio TEXT NOT NULL DEFAULT '',
  langs TEXT NOT NULL DEFAULT '[]', position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY, slug TEXT UNIQUE NOT NULL, date TEXT NOT NULL, category TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL, excerpt TEXT NOT NULL DEFAULT '', body TEXT NOT NULL DEFAULT '[]',
  published INTEGER NOT NULL DEFAULT 1);
CREATE TABLE IF NOT EXISTS testimonials (
  id INTEGER PRIMARY KEY, quote TEXT NOT NULL, author TEXT NOT NULL, role TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS fees (
  id INTEGER PRIMARY KEY, title TEXT NOT NULL, price TEXT NOT NULL, unit TEXT NOT NULL DEFAULT '',
  position INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS inquiries (
  id INTEGER PRIMARY KEY, created_at TEXT NOT NULL, name TEXT NOT NULL, email TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '', topic TEXT NOT NULL DEFAULT '', message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', ip TEXT NOT NULL DEFAULT '');
CREATE INDEX IF NOT EXISTS inquiries_status ON inquiries(status, created_at);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, expires_at REAL NOT NULL);
"""

ICONS = json.loads(SEED_PATH.read_text(encoding="utf-8"))["icons"]

# Field types: text, textarea, slug, icon, date, int, bool, list (JSON array of strings, edited one per line)
COLLECTIONS: dict[str, dict[str, Any]] = {
    "practices": {
        "label": "Services", "order": "position, id", "title_field": "title",
        "fields": [
            {"name": "title", "label": "Title", "type": "text", "required": True, "max": 120},
            {"name": "slug", "label": "URL id", "type": "slug", "required": True, "max": 60},
            {"name": "icon", "label": "Icon", "type": "icon", "required": True},
            {"name": "short", "label": "Summary", "type": "textarea", "max": 400},
            {"name": "items", "label": "Details (optional, one per line)", "type": "list", "max": 300},
            {"name": "position", "label": "Sort order", "type": "int"},
        ],
    },
    "fees": {
        "label": "Fees", "order": "position, id", "title_field": "title",
        "fields": [
            {"name": "title", "label": "Service", "type": "text", "required": True, "max": 120},
            {"name": "price", "label": "Price (e.g. 450,000₮ or 400,000₮ – 600,000₮)", "type": "text", "required": True, "max": 60},
            {"name": "unit", "label": "Unit (e.g. per hour; leave empty for a fixed price)", "type": "text", "max": 40},
            {"name": "position", "label": "Sort order", "type": "int"},
        ],
    },
    "testimonials": {
        "label": "Testimonials", "order": "position, id", "title_field": "author",
        "fields": [
            {"name": "quote", "label": "Quote", "type": "textarea", "required": True, "max": 600},
            {"name": "author", "label": "Name", "type": "text", "required": True, "max": 120},
            {"name": "role", "label": "Title and organisation", "type": "text", "max": 160},
            {"name": "position", "label": "Sort order", "type": "int"},
        ],
    },
    "team": {
        "label": "Team", "order": "position, id", "title_field": "name",
        "fields": [
            {"name": "name", "label": "Name", "type": "text", "required": True, "max": 120},
            {"name": "role", "label": "Role", "type": "text", "max": 80},
            {"name": "bio", "label": "Short bio", "type": "textarea", "max": 600},
            {"name": "langs", "label": "Languages (one per line, e.g. EN)", "type": "list", "max": 10},
            {"name": "position", "label": "Sort order", "type": "int"},
        ],
    },
    "posts": {
        "label": "Legal Report", "order": "date DESC, id DESC", "title_field": "title",
        "fields": [
            {"name": "title", "label": "Title", "type": "text", "required": True, "max": 200},
            {"name": "slug", "label": "URL id", "type": "slug", "required": True, "max": 100},
            {"name": "date", "label": "Date", "type": "date", "required": True},
            {"name": "category", "label": "Category", "type": "text", "required": True, "max": 40},
            {"name": "excerpt", "label": "Excerpt", "type": "textarea", "max": 500},
            {"name": "body", "label": "Article (one paragraph per line)", "type": "list", "max": 5000},
            {"name": "published", "label": "Published", "type": "bool"},
        ],
    },
    "why": {
        "label": "Why choose us", "order": "position, id", "title_field": "title",
        "fields": [
            {"name": "title", "label": "Title", "type": "text", "required": True, "max": 80},
            {"name": "icon", "label": "Icon", "type": "icon", "required": True},
            {"name": "description", "label": "Description", "type": "textarea", "max": 300},
            {"name": "position", "label": "Sort order", "type": "int"},
        ],
    },
}

SITE_FIELDS = [
    {"name": "name", "label": "Short name (logo)", "type": "text", "required": True, "max": 40},
    {"name": "suffix", "label": "Logo suffix", "type": "text", "max": 40},
    {"name": "legal", "label": "Full name", "type": "text", "required": True, "max": 120},
    {"name": "name_mn", "label": "Name in Mongolian", "type": "text", "max": 120},
    {"name": "tagline", "label": "Tagline", "type": "text", "max": 120},
    {"name": "slogan", "label": "Slogan", "type": "text", "max": 160},
    {"name": "slogan_mn", "label": "Slogan in Mongolian", "type": "text", "max": 160},
    {"name": "address", "label": "Address (one line each)", "type": "list", "max": 120},
    {"name": "email", "label": "Email", "type": "text", "required": True, "max": 254},
    {"name": "phone", "label": "Phone", "type": "text", "max": 40},
    {"name": "hours", "label": "Office hours", "type": "text", "max": 80},
]

INQUIRY_STATUSES = ("new", "read", "archived")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class ValidationError(ValueError):
    pass


def validate(fields: list[dict], data: Any) -> dict[str, Any]:
    """Return a clean dict of field values, or raise ValidationError with a readable message."""
    if not isinstance(data, dict):
        raise ValidationError("Expected a JSON object.")
    clean: dict[str, Any] = {}
    for f in fields:
        name, ftype, label = f["name"], f["type"], f["label"]
        v = data.get(name)
        if ftype == "list":
            if isinstance(v, str):
                v = v.splitlines()
            v = [str(x).strip() for x in (v or []) if str(x).strip()]
            if any(len(x) > f.get("max", 1000) for x in v):
                raise ValidationError(f"{label}: a line is longer than {f['max']} characters.")
            if f.get("required") and not v:
                raise ValidationError(f"{label} is required.")
        elif ftype == "int":
            try:
                v = int(v or 0)
            except (TypeError, ValueError):
                raise ValidationError(f"{label} must be a whole number.")
        elif ftype == "bool":
            v = bool(v)
        else:
            v = "" if v is None else str(v).strip()
            if f.get("required") and not v:
                raise ValidationError(f"{label} is required.")
            if len(v) > f.get("max", 10000):
                raise ValidationError(f"{label} must be at most {f['max']} characters.")
            if v and ftype == "slug" and not SLUG_RE.match(v):
                raise ValidationError(f"{label} may only contain lowercase letters, digits and single hyphens.")
            if v and ftype == "icon" and v not in ICONS:
                raise ValidationError(f"{label} must be one of: {', '.join(ICONS)}.")
            if v and ftype == "date" and not DATE_RE.match(v):
                raise ValidationError(f"{label} must be a date (YYYY-MM-DD).")
            if v and name == "email" and not EMAIL_RE.match(v):
                raise ValidationError(f"{label} is not a valid email address.")
        clean[name] = v
    return clean


# ---------------------------------------------------------------- connection

@contextmanager
def connect() -> Iterator[sqlite3.Connection]:
    # One connection per request; FastAPI may open it on a worker thread and use it on the
    # event-loop thread, but never from two threads at once, so the thread check can be off.
    conn = sqlite3.connect(DB_PATH, timeout=10, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    try:
        yield conn
        conn.commit()
    except BaseException:
        conn.rollback()
        raise
    finally:
        conn.close()


def _encode(fields: list[dict], clean: dict) -> dict:
    return {k: (json.dumps(v, ensure_ascii=False) if isinstance(v, list) else int(v) if isinstance(v, bool) else v)
            for k, v in clean.items()}


def row_to_dict(collection: str, row: sqlite3.Row) -> dict:
    d = dict(row)
    for f in COLLECTIONS[collection]["fields"]:
        if f["type"] == "list":
            d[f["name"]] = json.loads(d[f["name"]] or "[]")
        elif f["type"] == "bool":
            d[f["name"]] = bool(d[f["name"]])
    return d


# ---------------------------------------------------------------- settings

def get_setting(conn: sqlite3.Connection, key: str, default: Any = None) -> Any:
    row = conn.execute("SELECT value FROM settings WHERE key = ?", (key,)).fetchone()
    return json.loads(row["value"]) if row else default


def set_setting(conn: sqlite3.Connection, key: str, value: Any) -> None:
    conn.execute("INSERT INTO settings(key, value) VALUES(?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
                 (key, json.dumps(value, ensure_ascii=False)))


# ---------------------------------------------------------------- collections

def list_items(conn: sqlite3.Connection, collection: str, published_only: bool = False) -> list[dict]:
    spec = COLLECTIONS[collection]
    where = " WHERE published = 1" if published_only and collection == "posts" else ""
    rows = conn.execute(f"SELECT * FROM {collection}{where} ORDER BY {spec['order']}").fetchall()
    return [row_to_dict(collection, r) for r in rows]


def get_item(conn: sqlite3.Connection, collection: str, item_id: int) -> dict | None:
    row = conn.execute(f"SELECT * FROM {collection} WHERE id = ?", (item_id,)).fetchone()
    return row_to_dict(collection, row) if row else None


def insert_item(conn: sqlite3.Connection, collection: str, clean: dict) -> int:
    enc = _encode(COLLECTIONS[collection]["fields"], clean)
    cols = ", ".join(enc)
    marks = ", ".join("?" for _ in enc)
    cur = conn.execute(f"INSERT INTO {collection} ({cols}) VALUES ({marks})", tuple(enc.values()))
    assert cur.lastrowid is not None
    return cur.lastrowid


def update_item(conn: sqlite3.Connection, collection: str, item_id: int, clean: dict) -> bool:
    enc = _encode(COLLECTIONS[collection]["fields"], clean)
    sets = ", ".join(f"{k} = ?" for k in enc)
    cur = conn.execute(f"UPDATE {collection} SET {sets} WHERE id = ?", (*enc.values(), item_id))
    return cur.rowcount > 0


def delete_item(conn: sqlite3.Connection, collection: str, item_id: int) -> bool:
    return conn.execute(f"DELETE FROM {collection} WHERE id = ?", (item_id,)).rowcount > 0


# ---------------------------------------------------------------- admin password & sessions

def hash_password(password: str) -> str:
    salt = secrets.token_bytes(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1)
    return f"scrypt${salt.hex()}${digest.hex()}"


def check_password(conn: sqlite3.Connection, password: str) -> bool:
    stored = get_setting(conn, "admin_password")
    if not stored:
        return False
    _, salt, digest = stored.split("$")
    test = hashlib.scrypt(password.encode(), salt=bytes.fromhex(salt), n=2**14, r=8, p=1)
    return hmac.compare_digest(test.hex(), digest)


def set_password(password: str) -> None:
    with connect() as conn:
        set_setting(conn, "admin_password", hash_password(password))
        conn.execute("DELETE FROM sessions")  # log out everywhere


def _token_hash(token: str) -> str:
    return hashlib.sha256(token.encode()).hexdigest()


def create_session(conn: sqlite3.Connection, ttl_seconds: int) -> str:
    token = secrets.token_urlsafe(32)
    conn.execute("DELETE FROM sessions WHERE expires_at < ?", (time.time(),))
    conn.execute("INSERT INTO sessions(token_hash, expires_at) VALUES(?, ?)", (_token_hash(token), time.time() + ttl_seconds))
    return token


def session_valid(conn: sqlite3.Connection, token: str | None) -> bool:
    if not token:
        return False
    row = conn.execute("SELECT expires_at FROM sessions WHERE token_hash = ?", (_token_hash(token),)).fetchone()
    return bool(row and row["expires_at"] > time.time())


def delete_session(conn: sqlite3.Connection, token: str | None) -> None:
    if token:
        conn.execute("DELETE FROM sessions WHERE token_hash = ?", (_token_hash(token),))


# ---------------------------------------------------------------- setup

def init_db() -> str | None:
    """Create tables and seed content on first run.

    Returns a newly generated admin password if one had to be created (so it can be shown once),
    otherwise None. Set ADMIN_PASSWORD in the environment to choose the initial password yourself.
    """
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    generated = None
    with connect() as conn:
        conn.executescript(SCHEMA)
        # Each part is seeded once, so collections added later still get their initial content
        # on an existing database, and nothing an admin has edited is overwritten.
        seed = json.loads(SEED_PATH.read_text(encoding="utf-8"))
        seeded = set(get_setting(conn, "seeded_parts", []))
        if get_setting(conn, "seeded"):  # databases created before per-part seeding
            seeded |= {"site", "practices", "team", "posts", "why"}
        if "site" not in seeded:
            set_setting(conn, "site", validate(SITE_FIELDS, seed["site"]))
            seeded.add("site")
        for collection, spec in COLLECTIONS.items():
            if collection in seeded:
                continue
            for pos, item in enumerate(seed.get(collection, [])):
                item = {"position": pos, "published": True, **item}
                insert_item(conn, collection, validate(spec["fields"], item))
            seeded.add(collection)
        set_setting(conn, "seeded_parts", sorted(seeded))
        if not get_setting(conn, "admin_password"):
            password = os.environ.get("ADMIN_PASSWORD") or secrets.token_urlsafe(12)
            if not os.environ.get("ADMIN_PASSWORD"):
                generated = password
            set_setting(conn, "admin_password", hash_password(password))
    return generated
