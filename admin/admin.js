/* Site admin — vanilla JS single page. Routes (hash):
   #inquiries   #site   #c/<collection>   #c/<collection>/new   #c/<collection>/<id> */
"use strict";

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
let SCHEMA = null;
let inquiryFilter = "new";

/* ---------- API ---------- */
async function api(path, { method = "GET", body } = {}) {
  const opts = { method, headers: { Accept: "application/json" }, credentials: "same-origin" };
  if (method !== "GET") opts.headers["X-Requested-With"] = "admin";
  if (body !== undefined) { opts.headers["Content-Type"] = "application/json"; opts.body = JSON.stringify(body); }
  const r = await fetch("/api" + path, opts);
  if (r.status === 401 && path !== "/admin/login") { showLogin(); throw new Error("Please log in again."); }
  const data = r.headers.get("content-type")?.includes("json") ? await r.json() : null;
  if (!r.ok) {
    const d = data?.detail;
    throw new Error(Array.isArray(d) ? d.map((e) => `${e.loc?.slice(-1)[0]}: ${e.msg}`).join("; ") : d || `Request failed (${r.status})`);
  }
  return data;
}

function toast(msg, isError = false) {
  const t = $("#toast");
  t.textContent = msg;
  t.className = "show" + (isError ? " error" : "");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => (t.className = ""), isError ? 6000 : 2500);
}

const fmtDateTime = (iso) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

/* ---------- Auth ---------- */
function showLogin() {
  $("#app-view").hidden = true;
  $("#login-view").hidden = false;
  $("#password").focus();
}

$("#login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const btn = $("button", e.target), err = $("#login-error");
  btn.disabled = true; err.textContent = "";
  try {
    await api("/admin/login", { method: "POST", body: { password: $("#password").value } });
    $("#password").value = "";
    await start();
  } catch (ex) { err.textContent = ex.message; }
  finally { btn.disabled = false; }
});

$("#logout").addEventListener("click", async () => {
  await api("/admin/logout", { method: "POST" }).catch(() => {});
  SCHEMA = null;
  showLogin();
});

/* ---------- Shell ---------- */
async function start() {
  try { SCHEMA = await api("/admin/schema"); } catch { return; }
  $("#login-view").hidden = true;
  $("#app-view").hidden = false;
  renderNav();
  route();
}

function renderNav(newCount) {
  const items = [["inquiries", "Inquiries"], ["site", "Firm details"],
    ...Object.entries(SCHEMA.collections).map(([k, v]) => [`c/${k}`, v.label])];
  $("#nav").innerHTML = items.map(([h, l]) =>
    `<a href="#${h}" data-route="${h}">${esc(l)}${h === "inquiries" ? '<span class="badge" id="new-badge" hidden></span>' : ""}</a>`).join("");
  refreshBadge(newCount);
  highlightNav();
}

async function refreshBadge(count) {
  if (count === undefined) count = (await api("/admin/me").catch(() => ({}))).new_inquiries;
  const b = $("#new-badge");
  if (b) { b.textContent = count; b.hidden = !count; }
}

function highlightNav() {
  const h = location.hash.slice(1) || "inquiries";
  document.querySelectorAll("#nav a").forEach((a) => a.classList.toggle("active", h === a.dataset.route || h.startsWith(a.dataset.route + "/")));
}

function setHead(title, actionsHTML = "") {
  $("#view-title").textContent = title;
  $("#view-actions").innerHTML = actionsHTML;
  document.title = `${title} · Site Admin`;
}

async function route() {
  if (!SCHEMA) return;
  highlightNav();
  const [view, name, id] = (location.hash.slice(1) || "inquiries").split("/");
  $("#view").onclick = null;
  $("#view").innerHTML = '<div class="card empty">Loading…</div>';
  try {
    if (view === "site") await viewSite();
    else if (view === "c" && SCHEMA.collections[name]) id ? await viewEdit(name, id) : await viewList(name);
    else await viewInquiries();
  } catch (ex) {
    $("#view").innerHTML = `<div class="card empty">${esc(ex.message)}</div>`;
  }
}
window.addEventListener("hashchange", route);

/* ---------- Inquiries ---------- */
async function viewInquiries() {
  const filters = [["new", "New"], ["read", "Read"], ["archived", "Archived"], ["", "All"]];
  setHead("Inquiries", `<div class="filters">${filters.map(([v, l]) => `<button data-f="${v}" class="${v === inquiryFilter ? "active" : ""}">${l}</button>`).join("")}</div>
    <a class="btn secondary small" href="/api/admin/inquiries.csv${inquiryFilter ? "?status=" + inquiryFilter : ""}">Export CSV</a>`);
  $("#view-actions .filters").onclick = (e) => {
    if (e.target.dataset.f === undefined) return;
    inquiryFilter = e.target.dataset.f;
    viewInquiries();
  };

  const rows = await api("/admin/inquiries" + (inquiryFilter ? "?status=" + inquiryFilter : ""));
  refreshBadge();
  if (!rows.length) {
    $("#view").innerHTML = `<div class="card empty">No ${inquiryFilter || ""} inquiries.</div>`;
    return;
  }
  $("#view").innerHTML = `<div class="card">${rows.map((q) => `
    <div class="inquiry ${q.status}" data-id="${q.id}">
      <div class="inquiry-head">
        <div><strong>${esc(q.name)}</strong> <span class="pill ${q.status}">${q.status}</span></div>
        <span class="muted">${fmtDateTime(q.created_at)}</span>
      </div>
      <div class="inquiry-meta"><a href="mailto:${esc(q.email)}">${esc(q.email)}</a>${q.company ? " · " + esc(q.company) : ""} · ${esc(q.topic)}</div>
      <p class="inquiry-msg">${esc(q.message)}</p>
      <div class="inquiry-actions">
        <a class="btn small" href="mailto:${esc(q.email)}?subject=${encodeURIComponent("Re: " + q.topic)}">Reply by email</a>
        ${q.status !== "read" ? '<button class="btn secondary small" data-act="read">Mark read</button>' : ""}
        ${q.status !== "new" ? '<button class="btn secondary small" data-act="new">Mark unread</button>' : ""}
        ${q.status !== "archived" ? '<button class="btn secondary small" data-act="archived">Archive</button>' : ""}
        <button class="btn danger small" data-act="delete">Delete</button>
      </div>
    </div>`).join("")}</div>`;

  $("#view").onclick = async (e) => {
    const act = e.target.dataset.act;
    if (!act) return;
    const id = e.target.closest(".inquiry").dataset.id;
    try {
      if (act === "delete") {
        if (!confirm("Delete this inquiry permanently?")) return;
        await api(`/admin/inquiries/${id}`, { method: "DELETE" });
        toast("Inquiry deleted");
      } else {
        await api(`/admin/inquiries/${id}`, { method: "PATCH", body: { status: act } });
        toast(act === "archived" ? "Archived" : `Marked ${act === "new" ? "unread" : "read"}`);
      }
      viewInquiries();
    } catch (ex) { toast(ex.message, true); }
  };
}

/* ---------- Generic form ---------- */
function fieldHTML(f, value) {
  const id = "f-" + f.name, req = f.required ? " required" : "", label = esc(f.label) + (f.required ? " *" : "");
  const max = f.max && f.type !== "list" ? ` maxlength="${f.max}"` : "";
  let input;
  switch (f.type) {
    case "textarea": input = `<textarea id="${id}" name="${f.name}"${req}${max}>${esc(value)}</textarea>`; break;
    case "list": input = `<textarea id="${id}" name="${f.name}" class="${f.max > 1000 ? "tall" : ""}"${req}>${esc((value || []).join("\n"))}</textarea>`; break;
    case "icon": input = `<select id="${id}" name="${f.name}"${req}>${SCHEMA.icons.map((i) => `<option${i === value ? " selected" : ""}>${esc(i)}</option>`).join("")}</select>`; break;
    case "date": input = `<input type="date" id="${id}" name="${f.name}" value="${esc(value)}"${req}>`; break;
    case "int": input = `<input type="number" step="1" id="${id}" name="${f.name}" value="${esc(value ?? 0)}">`; break;
    case "bool": return `<div class="field"><label class="check"><input type="checkbox" name="${f.name}"${value ? " checked" : ""}> ${esc(f.label)}</label></div>`;
    default: input = `<input type="text" id="${id}" name="${f.name}" value="${esc(value)}"${req}${max}${f.type === "slug" ? ' pattern="[a-z0-9]+(-[a-z0-9]+)*" title="lowercase letters, digits and hyphens"' : ""}>`;
  }
  return `<div class="field"><label for="${id}">${label}</label>${input}</div>`;
}

function readForm(form, fields) {
  const out = {};
  for (const f of fields) {
    const el = form.elements[f.name];
    out[f.name] = f.type === "bool" ? el.checked : f.type === "list" ? el.value.split("\n") : f.type === "int" ? Number(el.value || 0) : el.value;
  }
  return out;
}

const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 100);

/* ---------- Firm details ---------- */
async function viewSite() {
  setHead("Firm details");
  const site = await api("/admin/site");
  $("#view").innerHTML = `<form class="card form" id="edit-form">
    ${SCHEMA.site_fields.map((f) => fieldHTML(f, site[f.name])).join("")}
    <p class="muted">Shown in the header, footer and contact page on every page of the site.</p>
    <div class="form-actions"><button class="btn" type="submit">Save changes</button></div></form>`;
  $("#edit-form").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await api("/admin/site", { method: "PUT", body: readForm(e.target, SCHEMA.site_fields) });
      toast("Firm details saved");
    } catch (ex) { toast(ex.message, true); }
  };
}

/* ---------- Collections ---------- */
async function viewList(name) {
  const spec = SCHEMA.collections[name];
  setHead(spec.label, `<a class="btn" href="#c/${name}/new">+ Add new</a>`);
  const items = await api(`/admin/c/${name}`);
  if (!items.length) { $("#view").innerHTML = '<div class="card empty">Nothing here yet.</div>'; return; }
  const extra = name === "posts" ? ["date", "category"] : name === "team" ? ["role"] : [];
  $("#view").innerHTML = `<div class="card"><table>
    <thead><tr><th>${esc(spec.fields.find((f) => f.name === spec.title_field).label)}</th>${extra.map((c) => `<th class="hide-sm">${c}</th>`).join("")}<th></th></tr></thead>
    <tbody>${items.map((it) => `<tr data-id="${it.id}">
      <td><a href="#c/${name}/${it.id}">${esc(it[spec.title_field])}</a>${name === "posts" && !it.published ? ' <span class="pill draft">draft</span>' : ""}</td>
      ${extra.map((c) => `<td class="hide-sm">${esc(it[c])}</td>`).join("")}
      <td class="actions"><a class="btn secondary small" href="#c/${name}/${it.id}">Edit</a><button class="btn danger small" data-del>Delete</button></td>
    </tr>`).join("")}</tbody></table></div>`;
  $("#view").onclick = async (e) => {
    if (!e.target.hasAttribute("data-del")) return;
    const tr = e.target.closest("tr");
    if (!confirm(`Delete "${tr.querySelector("a").textContent}"? This cannot be undone.`)) return;
    try {
      await api(`/admin/c/${name}/${tr.dataset.id}`, { method: "DELETE" });
      toast("Deleted");
      viewList(name);
    } catch (ex) { toast(ex.message, true); }
  };
}

async function viewEdit(name, id) {
  const spec = SCHEMA.collections[name], isNew = id === "new";
  let item = { published: true, position: 0, date: new Date().toISOString().slice(0, 10) };
  if (!isNew) {
    const items = await api(`/admin/c/${name}`);
    item = items.find((x) => String(x.id) === id);
    if (!item) throw new Error("Item not found.");
  }
  setHead(isNew ? `New: ${spec.label}` : `Edit: ${item[spec.title_field]}`, `<a class="btn secondary" href="#c/${name}">← Back to list</a>`);
  $("#view").innerHTML = `<form class="card form" id="edit-form" novalidate>
    ${spec.fields.map((f) => fieldHTML(f, item[f.name])).join("")}
    <div class="form-actions"><button class="btn" type="submit">${isNew ? "Create" : "Save changes"}</button>
    <a class="btn secondary" href="#c/${name}">Cancel</a></div></form>`;
  const form = $("#edit-form");

  // Fill the URL id from the title while it hasn't been edited by hand.
  const slug = form.elements.slug, title = form.elements[spec.title_field];
  if (slug && title && isNew) {
    let touched = false;
    slug.addEventListener("input", () => (touched = true));
    title.addEventListener("input", () => { if (!touched) slug.value = slugify(title.value); });
  }

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const btn = $("button[type=submit]", form);
    btn.disabled = true;
    try {
      const saved = await api(isNew ? `/admin/c/${name}` : `/admin/c/${name}/${id}`, { method: isNew ? "POST" : "PUT", body: readForm(form, spec.fields) });
      toast(isNew ? "Created" : "Saved");
      if (isNew) location.hash = `c/${name}/${saved.id}`;
      else setHead(`Edit: ${saved[spec.title_field]}`, `<a class="btn secondary" href="#c/${name}">← Back to list</a>`);
    } catch (ex) { toast(ex.message, true); }
    finally { btn.disabled = false; }
  };
}

/* ---------- Boot ---------- */
start();
