/* ============================================================
   Site configuration — edit firm details here (used site-wide)
   ============================================================ */
const SITE = {
  name: "Surenjav & Ulemj",
  suffix: "Partners · Attorneys at Law",
  legal: "Surenjav & Ulemj Partners",
  name_mn: "Сүрэнжав & Үлэмж Партнерс",
  tagline: "Advocacy and Legal Services",
  slogan: "We don't follow standards. We set them.",
  slogan_mn: "Бид стандартыг дагах биш, Бид стандартыг тогтоодог.",
  // TODO: replace with the firm's real contact details (not in the brochure)
  address: ["Ulaanbaatar, Mongolia"],
  email: "info@example.mn",
  phone: "+976 0000 0000",
  hours: "Mon – Fri, 9:00 – 18:00",
};

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About Us"],
  ["practices.html", "Services & Fees"],
  ["team.html", "Our Team"],
  ["insights.html", "Legal Report"],
  ["contact.html", "Contact Us"],
];

/* ---------- Inline SVG icons ---------- */
const ICONS = {
  briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 10l9-6 9 6M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18"/></svg>',
  scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/></svg>',
  coins: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><ellipse cx="9" cy="7" rx="6" ry="3"/><path d="M3 7v5c0 1.7 2.7 3 6 3s6-1.3 6-3V7"/><path d="M9 15v2c0 1.7 2.7 3 6 3s6-1.3 6-3v-5c0-1.7-2.7-3-6-3"/></svg>',
  award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="9" r="6"/><path d="M8.5 14L7 22l5-3 5 3-1.5-8"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 22s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 12l-8 8-9-9V3h8z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.2L12 17.4 6.5 20.3l1-6.2L3 9.7l6.2-.9z"/></svg>',
  thumb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 11v10H3V11zM7 11l4-8a2 2 0 0 1 2 2v4h6a2 2 0 0 1 2 2.3l-1.3 8A2 2 0 0 1 17.7 21H7"/></svg>',
  globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  energy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M8 7h7"/></svg>',
  calc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h1M12 12h1M16 12h0M8 16h1M12 16h1M16 12v4"/></svg>',
  mine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21l9-16 9 16z"/><path d="M8 21l4-7 4 7"/></svg>',
};
const icon = (n) => ICONS[n] || "";

/* ---------- Content data (built-in copy; the backend serves the live version) ---------- */
const PRACTICES = [
  { id: "advocacy", icon: "scale", title: "Advocacy",
    short: "Defending and advancing our clients' rights and interests as their advocates.",
    items: [] },
  { id: "legal-advice", icon: "chat", title: "Oral and Written Legal Advice",
    short: "Clear legal advice, in person or in writing, so you can make decisions with confidence.",
    items: [] },
  { id: "contracts", icon: "doc", title: "Contract Drafting",
    short: "Contracts drafted in line with Mongolian law and international trade law, rules and practice, and legal opinions on existing agreements.",
    items: [] },
  { id: "internal-rules", icon: "shield", title: "Internal Rules and Charters",
    short: "Drafting the internal regulations and charters that govern how your organisation operates.",
    items: [] },
  { id: "representation", icon: "bank", title: "Civil, Criminal and Administrative Cases",
    short: "Representing clients and restoring violated rights through court and administrative procedures.",
    items: ["Civil cases", "Criminal cases", "Administrative cases"] },
  { id: "tax", icon: "tag", title: "Tax Law Advice",
    short: "Advice on Mongolian tax legislation and how it applies to your business.",
    items: [] },
  { id: "financial", icon: "coins", title: "Financial Advice",
    short: "Financial advice that supports sound business decisions.",
    items: [] },
  { id: "accounting", icon: "calc", title: "Accounting Advice",
    short: "Advice on accounting and bookkeeping records.",
    items: [] },
  { id: "training", icon: "book", title: "Legal Training and Research",
    short: "Legal training for your team and in-depth legal research.",
    items: [] },
];

const WHY = [
  ["award", "Since 1996", "One of the first legal service firms established in Mongolia."],
  ["star", "International Standards", "Legal services delivered in line with international standards and practice."],
  ["globe", "International Partners", "We work with law firms in China, South Korea, Russia, Australia and France."],
  ["shield", "Lower Business Risk", "Ongoing legal advice and support that significantly reduces business risk."],
  ["scale", "Rights Restored", "Violated rights restored through court and administrative procedures."],
  ["doc", "Sound Contracts", "Contracts that comply with Mongolian law and international trade law."],
  ["book", "Legal Report", "Our online journal has kept citizens and businesses informed of government decisions since 2015."],
  ["tag", "Transparent Fees", "Published fees for consultations, contract drafting and advocacy."],
  ["layers", "Full-Service Support", "Legal, tax, financial and accounting advice from one firm."],
];

const TESTIMONIALS = [
  { quote: "Getting continuous legal advice and support in business significantly reduces business risk.",
    author: "Jon Jin Hyeon", role: "Director, “GS Loen” NBFI" },
  { quote: "The role of legal counsel is vital when operating in the construction sector.",
    author: "G. Khongorzul", role: "Director, “Asian Era” LLC" },
];

const FEES = [
  { title: "All types of consultation", price: "450,000₮", unit: "per hour" },
  { title: "Contract drafting", price: "500,000₮ – 1,500,000₮", unit: "" },
  { title: "Advocacy in civil cases", price: "400,000₮ – 600,000₮", unit: "per hour" },
  { title: "Advocacy in administrative cases", price: "600,000₮", unit: "per hour" },
  { title: "Advocacy in criminal cases", price: "400,000₮ – 600,000₮", unit: "per hour" },
];

// TODO: placeholder team: replace with the firm's real lawyers in the admin panel
const TEAM = [
  { name: "Batbayar G.", role: "Managing Partner", bio: "Leads the firm's corporate and M&A practice with 20 years of cross-border experience.", langs: ["EN", "MN", "RU"] },
  { name: "Sarah Mitchell", role: "Partner", bio: "Advises international lenders and sponsors on banking, finance and project finance matters.", langs: ["EN", "FR"] },
  { name: "Oyunchimeg D.", role: "Partner", bio: "Heads the regulatory and compliance group, focusing on financial services and fintech.", langs: ["EN", "MN"] },
  { name: "Temuujin B.", role: "Senior Associate", bio: "Specialises in mining, energy and infrastructure transactions and licensing.", langs: ["EN", "MN", "RU"] },
  { name: "Enkhjargal T.", role: "Senior Associate", bio: "Works on capital markets, securities regulation and private equity investments.", langs: ["EN", "MN"] },
  { name: "Daniel Park", role: "Of Counsel", bio: "Focuses on tax structuring and treaty planning for inbound investment.", langs: ["EN", "KO"] },
  { name: "Munkhzul S.", role: "Associate", bio: "Supports corporate, governance and employment matters for foreign-invested companies.", langs: ["EN", "MN"] },
  { name: "Ganbold E.", role: "Associate", bio: "Assists on banking and finance transactions and security enforcement.", langs: ["EN", "MN", "RU"] },
];

// TODO: placeholder articles: replace with real Legal Report issues in the admin panel
const POSTS = [
  { date: "2026-10-12", cat: "Energy", title: "New Incentives for Renewable Energy Producers",
    excerpt: "Recent amendments revise feed-in tariffs and grid-connection rules. We outline what developers need to know.",
    body: ["Amendments adopted this year revise the tariff mechanism for renewable generators and clarify the process for connecting to the national grid.", "Developers with projects in the pipeline should review their power purchase arrangements and permitting timelines against the new rules.", "This note is a general overview and not legal advice; please contact us to discuss how the changes affect your project."] },
  { date: "2026-08-28", cat: "Corporate", title: "Privatisation of State-Owned Enterprises: A Practical Guide",
    excerpt: "The government has announced a new round of privatisations. Here is how the process works and where investors can participate.",
    body: ["A new privatisation programme lists several state-owned enterprises for full or partial sale.", "We summarise the tender procedure, eligibility criteria for foreign bidders and key due-diligence considerations.", "Investors should engage early, as bidding windows are typically short."] },
  { date: "2026-06-15", cat: "Mining", title: "Draft Minerals Law: Key Proposals",
    excerpt: "A draft revision of the minerals law proposes changes to licensing, state participation and stability agreements.",
    body: ["The draft would reshape the licensing regime and the framework for state equity participation in strategic deposits.", "Stakeholders have been invited to comment during the consultation period.", "We will continue to monitor the draft as it moves through parliament."] },
  { date: "2026-04-03", cat: "Tax", title: "Taxation on Transfers of Mineral Licences",
    excerpt: "Clarification from the tax authority on how indirect transfers of licence-holding entities are taxed.",
    body: ["The tax authority has issued guidance on the treatment of indirect transfers of entities holding mineral licences.", "The guidance affects offshore holding structures and may trigger local tax filing obligations.", "Parties to pending transactions should reassess their structuring and tax indemnities."] },
  { date: "2026-02-20", cat: "Tax", title: "Land-Use Fee Changes for Commercial Property",
    excerpt: "Updated land-use fee rates take effect this year. We explain the impact on commercial landholders.",
    body: ["New rates for land-use fees apply to commercial and industrial land in major cities.", "Businesses should budget for the increase and check that their land-use certificates are up to date."] },
  { date: "2025-11-30", cat: "Firm News", title: "Firm Joins International Legal Alliance",
    excerpt: "We are pleased to announce our membership of an international network of independent business law firms.",
    body: ["Membership gives our clients access to trusted counsel in more than 40 jurisdictions.", "It also strengthens our ability to support inbound investors from Europe, Asia and North America."] },
];

/* ---------- Load content from the backend ----------
   When the site runs with the backend (python -m backend), content comes from /api/content
   and is edited in the admin panel. With the static server (serve.py) the API isn't there,
   so the built-in data above is used and the contact form can't send. */
async function loadContent() {
  if (location.protocol === "file:") return;
  try {
    const r = await fetch("/api/content", { headers: { Accept: "application/json" } });
    if (!r.ok || !r.headers.get("content-type")?.includes("json")) return;
    const d = await r.json();
    if (d.site) Object.assign(SITE, d.site);
    for (const [arr, src] of [[PRACTICES, d.practices], [WHY, d.why], [TEAM, d.team], [POSTS, d.posts],
      [TESTIMONIALS, d.testimonials], [FEES, d.fees]]) {
      if (Array.isArray(src)) arr.splice(0, arr.length, ...src);
    }
  } catch { /* offline or static hosting: keep built-in data */ }
}

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const telHref = (p) => "tel:" + esc(String(p).replace(/[^\d+]/g, ""));
const logoHTML = (onDark = false) => `<a class="logo" href="index.html" aria-label="${esc(SITE.legal)} home">
    <img class="logo-mark" src="img/logo-mark${onDark ? "-white" : ""}.png" alt="" width="124" height="182">
    <span class="logo-text">${esc(SITE.name.toUpperCase())}<small>${esc(SITE.suffix)}</small></span></a>`;

/* ---------- Layout: header & footer ---------- */
function renderLayout() {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) => `<li><a href="${href}" class="${href === page ? "active" : ""}">${label}</a></li>`).join("");

  const header = $("#site-header");
  if (header) header.outerHTML = `
    <div class="topbar"><div class="container">
      <span>${SITE.address.map(esc).join(", ")}</span>
      <span><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> &nbsp;|&nbsp; <a href="${telHref(SITE.phone)}">${esc(SITE.phone)}</a></span>
    </div></div>
    <header class="site-header"><div class="container">
      ${logoHTML()}
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="nav"><ul>${links}</ul></nav>
    </div></header>`;

  const footer = $("#site-footer");
  if (footer) footer.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          ${logoHTML(true)}
          <p class="slogan">${esc(SITE.slogan)}</p>
          <p>${esc(SITE.tagline)} since 1996. One of Mongolia's first legal service firms.</p>
        </div>
        <div><h4>Quick Links</h4><ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul></div>
        <div><h4>Contact Us</h4>
          <p>${SITE.address.map(esc).join("<br>")}</p><br>
          <p>Email: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a><br>
          Phone: <a href="${telHref(SITE.phone)}">${esc(SITE.phone)}</a><br>
          ${esc(SITE.hours)}</p>
        </div>
      </div>
      <div class="footer-bottom"><div class="container">
        <span>© ${new Date().getFullYear()} ${esc(SITE.legal)}. All rights reserved.</span>
        <span lang="mn">${esc(SITE.name_mn)}</span>
      </div></div>
    </footer>
    <button class="back-to-top" aria-label="Back to top">↑</button>`;

  const toggle = $(".nav-toggle"), nav = $(".nav");
  toggle?.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  const btt = $(".back-to-top");
  window.addEventListener("scroll", () => btt.classList.toggle("show", scrollY > 500));
  btt.addEventListener("click", () => scrollTo({ top: 0 }));

  $$("[data-site]").forEach((el) => (el.textContent = SITE[el.dataset.site]));
  document.title = document.title.replace("{FIRM}", SITE.legal);
}

/* ---------- Hero slider ---------- */
function initSlider() {
  const slides = $$(".slide");
  if (!slides.length) return;
  const dots = $(".slider-dots");
  let i = 0, timer;
  slides.forEach((_, n) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Slide ${n + 1}`);
    b.onclick = () => go(n, true);
    dots.appendChild(b);
  });
  const go = (n, user) => {
    slides[i].classList.remove("active"); dots.children[i].classList.remove("active");
    i = (n + slides.length) % slides.length;
    slides[i].classList.add("active"); dots.children[i].classList.add("active");
    if (user) restart();
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
  $(".slider-arrow.prev").onclick = () => go(i - 1, true);
  $(".slider-arrow.next").onclick = () => go(i + 1, true);
  go(0); restart();
}

/* ---------- Renderers ---------- */
function renderPractices() {
  const el = $("#practice-cards");
  if (el) {
    const n = +el.dataset.limit || PRACTICES.length;
    el.innerHTML = PRACTICES.slice(0, n).map((p) => `
      <div class="card reveal"><div class="icon">${icon(p.icon)}</div>
        <h3>${esc(p.title)}</h3><p>${esc(p.short)}</p>
        <a class="link-arrow" href="practices.html#${esc(p.id)}">Learn more</a></div>`).join("");
  }
  const nav = $("#practice-nav"), detail = $("#practice-detail");
  if (nav && detail) {
    nav.innerHTML = PRACTICES.map((p) => `<a href="#${esc(p.id)}">${esc(p.title)}</a>`).join("") +
      (FEES.length ? '<a href="#fees">Fees</a>' : "");
    detail.innerHTML = PRACTICES.map((p) => `
      <div class="practice-block reveal" id="${esc(p.id)}">
        <div class="card" style="box-shadow:none;padding:0;background:none"><div class="icon">${icon(p.icon)}</div></div>
        <h2>${esc(p.title)}</h2><p>${esc(p.short)}</p>
        ${p.items.length ? `<ul>${p.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>`).join("");
    // Content loads asynchronously, so jump to a #practice anchor once it exists.
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
  }
}

function renderWhy() {
  const el = $("#why-grid");
  if (el) el.innerHTML = WHY.map(([ic, t, d]) => `
    <div class="why-item reveal"><div class="icon">${icon(ic)}</div><div><h4>${esc(t)}</h4><p>${esc(d)}</p></div></div>`).join("");
}

function renderTestimonials() {
  const el = $("#testimonials");
  if (!el) return;
  const section = el.closest("section");
  if (section) section.hidden = !TESTIMONIALS.length;
  el.innerHTML = TESTIMONIALS.map((t) => `
    <figure class="quote reveal"><blockquote>${esc(t.quote)}</blockquote>
      <figcaption><strong>${esc(t.author)}</strong><span>${esc(t.role)}</span></figcaption></figure>`).join("");
}

function renderFees() {
  const el = $("#fee-grid");
  if (!el) return;
  const section = el.closest("section");
  if (section) section.hidden = !FEES.length;
  el.innerHTML = FEES.map((f) => `
    <div class="fee reveal"><h3>${esc(f.title)}</h3><div class="price">${esc(f.price)}</div>
      ${f.unit ? `<div class="unit">${esc(f.unit)}</div>` : ""}</div>`).join("");
}

function renderTeam() {
  const el = $("#team-grid");
  if (!el) return;
  const n = +el.dataset.limit || TEAM.length;
  el.innerHTML = TEAM.slice(0, n).map((m) => `
    <div class="team-card reveal"><div class="avatar">${esc(initials(m.name))}</div>
      <div class="info"><h3>${esc(m.name)}</h3><div class="role">${esc(m.role)}</div><p>${esc(m.bio)}</p>
      <div class="lang-tags">${m.langs.map((l) => `<span>${esc(l)}</span>`).join("")}</div></div></div>`).join("");
}

function renderPosts() {
  const el = $("#posts-grid");
  if (!el) return;
  const n = +el.dataset.limit || POSTS.length;
  const draw = (cat) => {
    el.innerHTML = POSTS.filter((p) => !cat || cat === "All" || p.cat === cat).slice(0, n).map((p) => `
      <article class="post reveal visible"><div class="post-thumb"><span class="tag">${esc(p.cat)}</span></div>
        <div class="post-body"><div class="post-date">${fmtDate(p.date)}</div>
        <h3>${esc(p.title)}</h3><p>${esc(p.excerpt)}</p>
        <a href="#" class="link-arrow" data-post="${POSTS.indexOf(p)}">Read more</a></div></article>`).join("");
  };
  draw();

  const filters = $("#post-filters");
  if (filters) {
    const cats = ["All", ...new Set(POSTS.map((p) => p.cat))];
    filters.innerHTML = cats.map((c, k) => `<button class="${k ? "" : "active"}">${esc(c)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;
      $$("button", filters).forEach((b) => b.classList.toggle("active", b === e.target));
      draw(e.target.textContent);
    });
  }

  // Article modal
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">×</button><div class="modal-content"></div></div>`;
  document.body.appendChild(modal);
  const close = () => modal.classList.remove("open");
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.classList.contains("modal-close")) close(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
  el.addEventListener("click", (e) => {
    const a = e.target.closest("[data-post]");
    if (!a) return;
    e.preventDefault();
    const p = POSTS[a.dataset.post];
    $(".modal-content", modal).innerHTML = `<div class="post-date">${fmtDate(p.date)} · ${esc(p.cat)}</div><h2>${esc(p.title)}</h2>${p.body.map((t) => `<p>${esc(t)}</p>`).join("")}`;
    modal.classList.add("open");
  });
}

function renderContact() {
  const info = $("#contact-info");
  if (info) info.innerHTML = `
    <div class="item"><div class="icon">${icon("pin")}</div><div><h4>Office</h4><p>${SITE.address.map(esc).join("<br>")}</p></div></div>
    <div class="item"><div class="icon">${icon("mail")}</div><div><h4>Email</h4><p><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p></div></div>
    <div class="item"><div class="icon">${icon("phone")}</div><div><h4>Phone</h4><p>${esc(SITE.phone)}</p></div></div>
    <div class="item"><div class="icon">${icon("clock")}</div><div><h4>Office Hours</h4><p>${esc(SITE.hours)}</p></div></div>`;

  const form = $("#contact-form");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const msg = $(".form-msg", form), btn = $("button[type=submit]", form);
    const show = (text, ok) => {
      msg.textContent = text;
      msg.classList.toggle("error", !ok);
      msg.style.display = "block";
      msg.scrollIntoView({ block: "nearest", behavior: "smooth" });
    };
    const fallback = `Sorry, your message could not be sent. Please email us at ${SITE.email} or call ${SITE.phone}.`;
    const data = Object.fromEntries(new FormData(form));
    btn.disabled = true;
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (r.ok) {
        show(`Thank you, ${data.name.trim().split(/\s+/)[0]}. Your message has been received and we will reply shortly.`, true);
        form.reset();
      } else if (r.status === 429) {
        show(`You have sent several messages in a short time. Please try again later, or email us at ${SITE.email}.`, false);
      } else if (r.status === 422) {
        show("Please check that your name, a valid email address and your message are filled in, then try again.", false);
      } else {
        show(fallback, false);
      }
    } catch {
      show(fallback, false);
    } finally {
      btn.disabled = false;
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadContent();
  renderLayout();
  initSlider();
  renderPractices();
  renderWhy();
  renderTestimonials();
  renderFees();
  renderTeam();
  renderPosts();
  renderContact();
  initReveal();
});
