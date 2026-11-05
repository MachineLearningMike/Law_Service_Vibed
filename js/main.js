/* ============================================================
   Site configuration — edit firm details here (used site-wide)
   ============================================================ */
const SITE = {
  name: "Meridian",
  suffix: "Law Group",
  legal: "Meridian Law Group LLP",
  address: ["Suite 500, Example Business Tower", "Peace Avenue 1", "Ulaanbaatar 14200, Mongolia"],
  email: "info@example-lawgroup.mn",
  phone: "+976 7000 0000",
  hours: "Mon – Fri, 9:00 – 18:00",
};

const NAV = [
  ["index.html", "Home"],
  ["about.html", "About Us"],
  ["team.html", "Our Team"],
  ["practices.html", "Practices"],
  ["insights.html", "Insights"],
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
  mine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 21l9-16 9 16z"/><path d="M8 21l4-7 4 7"/></svg>',
};
const icon = (n) => ICONS[n] || "";

/* ---------- Content data ---------- */
const PRACTICES = [
  { id: "corporate", icon: "briefcase", title: "Corporate and M&A",
    short: "Market entry, joint ventures, acquisitions and disposals, restructurings and day-to-day corporate support.",
    items: ["Foreign direct investment and company formation", "Share and asset acquisitions, mergers and disposals", "Joint ventures and shareholder agreements", "Due diligence and transaction structuring", "Corporate restructurings and reorganisations"] },
  { id: "governance", icon: "shield", title: "Corporate Governance and Compliance",
    short: "Board practice, internal policies, anti-corruption and regulatory compliance programmes.",
    items: ["Board and shareholder meeting procedures", "Anti-bribery and anti-money-laundering compliance", "Internal investigations", "Licensing and regulatory filings", "Related-party transaction reviews"] },
  { id: "banking", icon: "bank", title: "Banking and Finance",
    short: "Lender and borrower-side advice on secured lending, syndicated facilities and security packages.",
    items: ["Bilateral and syndicated loans", "Security creation, perfection and enforcement", "Trade and commodity finance", "Debt restructuring and workouts", "Development finance institution lending"] },
  { id: "financial-services", icon: "scale", title: "Financial Services and Regulations",
    short: "Licensing and regulatory advice for banks, non-bank financial institutions, fintech and insurers.",
    items: ["Banking and NBFI licensing", "Payments and fintech regulation", "Insurance regulation", "Regulatory investigations and enforcement", "Consumer finance compliance"] },
  { id: "capital-markets", icon: "chart", title: "Capital Markets",
    short: "Equity and debt offerings, listings, bond issuances and securities regulatory matters.",
    items: ["IPOs and secondary offerings", "Domestic and international bond issues", "Dual listings", "Securities disclosure and continuing obligations", "Takeover regulation"] },
  { id: "private-equity", icon: "coins", title: "Private Equity",
    short: "Fund formation, portfolio investments and exits for sponsors and institutional investors.",
    items: ["Portfolio company acquisitions", "Minority and growth investments", "Management incentive arrangements", "Exit strategies and secondary sales", "Fund structuring"] },
  { id: "energy", icon: "energy", title: "Energy and Infrastructure",
    short: "Power, renewables, PPP and concession projects from development through financing and operation.",
    items: ["Renewable energy projects and PPAs", "Public–private partnerships and concessions", "Project finance and construction contracts", "Permitting and regulatory approvals"] },
  { id: "mining", icon: "mine", title: "Mining and Natural Resources",
    short: "Exploration and mining licences, investment agreements, offtake and resource-sector transactions.",
    items: ["Licence acquisition and transfer", "Investment and stability agreements", "Offtake and supply contracts", "Environmental and community obligations"] },
  { id: "tax", icon: "tag", title: "Tax",
    short: "Transaction tax structuring, double-tax treaty planning and tax dispute support.",
    items: ["Tax structuring of investments and transactions", "Double taxation treaty analysis", "Withholding and indirect tax", "Tax audits and disputes"] },
];

const WHY = [
  ["award", "Proven Ability", "A track record on complex, high-value cross-border mandates."],
  ["pin", "On-the-Ground Experience", "Deep familiarity with local regulators, courts and business practice."],
  ["tag", "Alternative Fees", "Fixed, capped and blended fee arrangements tailored to each matter."],
  ["layers", "Full-Service Skills", "One team covering corporate, finance, regulatory, tax and disputes."],
  ["star", "High Ethical Standards", "Integrity and confidentiality at the core of every engagement."],
  ["thumb", "Value for Cost", "International-quality work at a sensible, transparent price."],
  ["globe", "Fluent English", "Lawyers who draft and negotiate fluently in English, Mongolian and Russian."],
  ["clock", "Strict Adherence to Timing", "We commit to deadlines and we meet them."],
  ["chat", "Effective Communication", "Clear, concise advice delivered when you need it."],
];

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

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const initials = (n) => n.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
const logoHTML = () => `<a class="logo" href="index.html" aria-label="${SITE.legal} home">
    <span class="logo-mark">${SITE.name[0]}</span>
    <span class="logo-text">${SITE.name.toUpperCase()}<small>${SITE.suffix}</small></span></a>`;

/* ---------- Layout: header & footer ---------- */
function renderLayout() {
  const page = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) => `<li><a href="${href}" class="${href === page ? "active" : ""}">${label}</a></li>`).join("");

  const header = $("#site-header");
  if (header) header.outerHTML = `
    <div class="topbar"><div class="container">
      <span>${SITE.address.join(", ")}</span>
      <span><a href="mailto:${SITE.email}">${SITE.email}</a> &nbsp;|&nbsp; <a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a></span>
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
          ${logoHTML()}
          <p>A full-service business law firm advising international investors, domestic companies and public bodies.</p>
        </div>
        <div><h4>Quick Links</h4><ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul></div>
        <div><h4>Contact Us</h4>
          <p>${SITE.address.join("<br>")}</p><br>
          <p>Email: <a href="mailto:${SITE.email}">${SITE.email}</a><br>
          Phone: <a href="tel:${SITE.phone.replace(/\s/g, "")}">${SITE.phone}</a><br>
          ${SITE.hours}</p>
        </div>
      </div>
      <div class="footer-bottom"><div class="container">
        <span>© ${new Date().getFullYear()} ${SITE.legal}. All rights reserved.</span>
        <span>Attorney advertising. Prior results do not guarantee a similar outcome.</span>
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
  document.title = document.title.replace("{FIRM}", SITE.name + " " + SITE.suffix);
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
        <h3>${p.title}</h3><p>${p.short}</p>
        <a class="link-arrow" href="practices.html#${p.id}">Learn more</a></div>`).join("");
  }
  const nav = $("#practice-nav"), detail = $("#practice-detail");
  if (nav && detail) {
    nav.innerHTML = PRACTICES.map((p) => `<a href="#${p.id}">${p.title}</a>`).join("");
    detail.innerHTML = PRACTICES.map((p) => `
      <div class="practice-block reveal" id="${p.id}">
        <div class="card" style="box-shadow:none;padding:0;background:none"><div class="icon">${icon(p.icon)}</div></div>
        <h2>${p.title}</h2><p>${p.short}</p>
        <ul>${p.items.map((x) => `<li>${x}</li>`).join("")}</ul></div>`).join("");
  }
}

function renderWhy() {
  const el = $("#why-grid");
  if (el) el.innerHTML = WHY.map(([ic, t, d]) => `
    <div class="why-item reveal"><div class="icon">${icon(ic)}</div><div><h4>${t}</h4><p>${d}</p></div></div>`).join("");
}

function renderTeam() {
  const el = $("#team-grid");
  if (!el) return;
  const n = +el.dataset.limit || TEAM.length;
  el.innerHTML = TEAM.slice(0, n).map((m) => `
    <div class="team-card reveal"><div class="avatar">${initials(m.name)}</div>
      <div class="info"><h3>${m.name}</h3><div class="role">${m.role}</div><p>${m.bio}</p>
      <div class="lang-tags">${m.langs.map((l) => `<span>${l}</span>`).join("")}</div></div></div>`).join("");
}

function renderPosts() {
  const el = $("#posts-grid");
  if (!el) return;
  const n = +el.dataset.limit || POSTS.length;
  const draw = (cat) => {
    el.innerHTML = POSTS.filter((p) => !cat || cat === "All" || p.cat === cat).slice(0, n).map((p) => `
      <article class="post reveal visible"><div class="post-thumb"><span class="tag">${p.cat}</span></div>
        <div class="post-body"><div class="post-date">${fmtDate(p.date)}</div>
        <h3>${p.title}</h3><p>${p.excerpt}</p>
        <a href="#" class="link-arrow" data-post="${POSTS.indexOf(p)}">Read more</a></div></article>`).join("");
  };
  draw();

  const filters = $("#post-filters");
  if (filters) {
    const cats = ["All", ...new Set(POSTS.map((p) => p.cat))];
    filters.innerHTML = cats.map((c, k) => `<button class="${k ? "" : "active"}">${c}</button>`).join("");
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
    $(".modal-content", modal).innerHTML = `<div class="post-date">${fmtDate(p.date)} · ${p.cat}</div><h2>${p.title}</h2>${p.body.map((t) => `<p>${t}</p>`).join("")}`;
    modal.classList.add("open");
  });
}

function renderContact() {
  const info = $("#contact-info");
  if (info) info.innerHTML = `
    <div class="item"><div class="icon">${icon("pin")}</div><div><h4>Office</h4><p>${SITE.address.join("<br>")}</p></div></div>
    <div class="item"><div class="icon">${icon("mail")}</div><div><h4>Email</h4><p><a href="mailto:${SITE.email}">${SITE.email}</a></p></div></div>
    <div class="item"><div class="icon">${icon("phone")}</div><div><h4>Phone</h4><p>${SITE.phone}</p></div></div>
    <div class="item"><div class="icon">${icon("clock")}</div><div><h4>Office Hours</h4><p>${SITE.hours}</p></div></div>`;

  const form = $("#contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const msg = $(".form-msg", form);
    msg.textContent = `Thank you, ${form.name.value.split(" ")[0]}. Your message has been received and we will reply shortly.`;
    msg.style.display = "block";
    form.reset();
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  initSlider();
  renderPractices();
  renderWhy();
  renderTeam();
  renderPosts();
  renderContact();
  initReveal();
});
