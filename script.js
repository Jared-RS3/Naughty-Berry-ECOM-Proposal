/* ============================================================
   DAYBREAK PROPOSAL SYSTEM — DB-NB-002 · V1
   Naughty Berry E-Commerce Integration

   NO FEE, TOTAL, RETAINER OR DATE IS TYPED INTO THE HTML.
   Everything below is bound into the page at runtime, so the
   narrative pages and the commercial pages cannot disagree.
   ============================================================ */

const proposalData = {
  clientName:   "Naughty Berry",
  projectName:  "E-Commerce Integration",
  rangeName:    "sweet range",
  rangeLong:    "sweets and candy range",
  reference:    "DB-NB-002 · V1",
  proposalDate: "8 September 2026",
  proposalValidityDays: 14,
  currency:     "ZAR",
  companyName:  "Daybreak",
  email:        "contact@daybreaktechinnovations.com",
  website:      "daybreaktech.agency",
  location:     "Cape Town, South Africa",
  depositPct:   50,
};

/* ---- the single source of every rand in this document ----- */
/* [key, name, fee, description] */
const optionLines = {
  o1: [
    ["shopify", "Shopify Store Setup", 6000,
     "Store creation and configuration, branded catalogue, up to 10 products, cart and checkout, The Courier Guy plugin, shipping zones, connection to the existing website, full order-journey testing, training and launch."],
    ["yoco", "Yoco Payment Integration", 2000,
     "Yoco merchant account connected and configured as the online payment provider, successful, failed and cancelled payment handling, test transactions, production launch testing."],
    ["mailchimp", "Mailchimp Email Marketing Integration", 4000,
     "Audience and consent setup, newsletter signup connected to the website and store, branded newsletter template, welcome email, end-to-end subscriber testing."],
  ],
  o2: [
    ["storefront", "Custom React Storefront and Shopify Integration", 12000,
     "Shopify Storefront API configuration, custom React shop, product and cart components, persistent cart, live pricing and stock, checkout hand-off, The Courier Guy plugin and fulfilment workflow, deployment, training and launch."],
    ["yoco", "Yoco Payment Integration", 2000,
     "Yoco merchant account connected to Shopify, secure payment configuration, successful, failed and cancelled payment handling, test transactions, production launch testing."],
    ["mailchimp", "Mailchimp Email Marketing Integration", 4000,
     "Audience and consent setup, newsletter signup connected across the React website and Shopify, branded newsletter template, welcome email, end-to-end subscriber testing."],
  ],
};

const retainers = { o1: 2000, o2: 3500 };
const timelines = { o1: "2–3 weeks", o2: "3–4 weeks" };
const productAllowance = 10;
const monthlyChangeAllowance = 5;

/* ---- derived ---------------------------------------------- */
const sum   = (k) => optionLines[k].reduce((t, l) => t + l[2], 0);
const total = { o1: sum("o1"), o2: sum("o2") };
const deposit = {
  o1: total.o1 * proposalData.depositPct / 100,
  o2: total.o2 * proposalData.depositPct / 100,
};
/* comma grouping, per the house convention: R12,000 — not the en-ZA space */
const money = (n) => "R" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const yearOne = (k) => total[k] + retainers[k] * 12;

/* ---- text substitution map -------------------------------- */
const fills = {
  "client-name":      proposalData.clientName,
  "range":            proposalData.rangeName,
  "range-upper":      proposalData.rangeName.toUpperCase(),
  "range-long":       proposalData.rangeLong,
  "project-name":     proposalData.projectName,
  "reference":        proposalData.reference,
  "proposal-date":    proposalData.proposalDate,
  "validity":         proposalData.proposalValidityDays + " days",
  "company":          proposalData.companyName,
  "email":            proposalData.email,
  "website":          proposalData.website,
  "location":         proposalData.location,
  "deposit-pct":      proposalData.depositPct + "%",
  "balance-pct":      (100 - proposalData.depositPct) + "%",
  "product-count":    String(productAllowance),
  "change-count":     String(monthlyChangeAllowance),

  "o1-total":         money(total.o1),
  "o2-total":         money(total.o2),
  "o1-deposit":       money(deposit.o1),
  "o2-deposit":       money(deposit.o2),
  "o1-balance":       money(total.o1 - deposit.o1),
  "o2-balance":       money(total.o2 - deposit.o2),
  "o1-retainer":      money(retainers.o1),
  "o2-retainer":      money(retainers.o2),
  "o1-retainer-year": money(retainers.o1 * 12),
  "o2-retainer-year": money(retainers.o2 * 12),
  "o1-year-one":      money(yearOne("o1")),
  "o2-year-one":      money(yearOne("o2")),
  "o1-time":          timelines.o1,
  "o2-time":          timelines.o2,
  "delta":            money(total.o2 - total.o1),
  "delta-retainer":   money(retainers.o2 - retainers.o1),

  "o1-shopify":       money(optionLines.o1[0][2]),
  "o1-yoco":          money(optionLines.o1[1][2]),
  "o1-mailchimp":     money(optionLines.o1[2][2]),
  "o2-storefront":    money(optionLines.o2[0][2]),
  "o2-yoco":          money(optionLines.o2[1][2]),
  "o2-mailchimp":     money(optionLines.o2[2][2]),
};

/* ============================================================
   BINDING
   ============================================================ */
function applyFills(){
  document.querySelectorAll("[data-fill]").forEach((el) => {
    const key = el.getAttribute("data-fill");
    if (key in fills) el.textContent = fills[key];
  });
}

function renderLedgers(){
  document.querySelectorAll("[data-lines]").forEach((host) => {
    const key = host.getAttribute("data-lines");
    const lines = optionLines[key];
    if (!lines) return;
    const rows = lines.map(([, name, fee, desc]) => `
      <div class="cost-row">
        <div class="cr-main">
          <b class="cr-name">${name}</b>
          <p class="cr-desc">${desc}</p>
        </div>
        <div class="cr-fig">${money(fee)}</div>
      </div>`).join("");
    host.innerHTML = rows + `
      <div class="cost-row total">
        <div class="cr-main"><b class="cr-name">Total once-off investment</b></div>
        <div class="cr-fig">${money(total[key])}</div>
      </div>`;
  });
}

function renderStacks(){
  document.querySelectorAll("[data-stack]").forEach((host) => {
    const key = host.getAttribute("data-stack");
    const lines = optionLines[key];
    if (!lines) return;
    const t = total[key];
    const segs = lines.map(([, , fee]) =>
      `<i class="ti-seg" style="width:${(fee / t * 100).toFixed(2)}%"></i>`).join("");
    const brackets = lines.map(([, name, fee]) => `
      <div class="ti-bracket" style="width:${(fee / t * 100).toFixed(2)}%">
        <span class="tb-name">${name.split(" and ")[0].split(" Integration")[0]}</span>
        <span class="tb-fig">${money(fee)}</span>
      </div>`).join("");
    host.innerHTML =
      `<div class="ti-bar">${segs}</div><div class="ti-brackets">${brackets}</div>`;
  });
}

/* ============================================================
   NAVIGATION AND BEHAVIOUR
   ============================================================ */
const pages = Array.from(document.querySelectorAll(".proposal-page"));

function numberPages(){
  const totalPages = String(pages.length).padStart(2, "0");
  pages.forEach((p, i) => {
    const el = p.querySelector(".page-num");
    if (el) el.textContent = String(i + 1).padStart(2, "0") + " / " + totalPages;
  });
}

function buildSideNav(){
  const nav = document.querySelector(".sidenav");
  if (!nav) return;
  pages.forEach((p, i) => {
    const b = document.createElement("button");
    b.className = "sn-item";
    b.type = "button";
    b.dataset.index = String(i);
    const num = p.dataset.num ? p.dataset.num + " · " : "";
    b.innerHTML = `<i class="sn-tick"></i><span class="sn-label">${num}${p.dataset.title || ""}</span>`;
    b.addEventListener("click", () => goTo(i));
    nav.appendChild(b);
  });
}

let current = 0;
function setActive(i){
  current = i;
  const p = pages[i];
  const totalPages = String(pages.length).padStart(2, "0");
  const t = document.querySelector(".tb-title");
  const c = document.querySelector(".tb-count");
  if (t) t.textContent = p.dataset.title || "";
  if (c) c.textContent = String(i + 1).padStart(2, "0") + " / " + totalPages;
  document.querySelectorAll(".sn-item").forEach((el, j) =>
    el.classList.toggle("active", j === i));
}

function goTo(i){
  const t = Math.max(0, Math.min(pages.length - 1, i));
  const y = pages[t].getBoundingClientRect().top + window.scrollY
          - (parseFloat(getComputedStyle(document.documentElement)
              .getPropertyValue("--topbar-h")) || 60);
  window.scrollTo({ top: y, behavior: "smooth" });
}

function progress(){
  const bar = document.querySelector(".progress");
  if (!bar) return;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
}

function observe(){
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(pages.indexOf(e.target));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  pages.forEach((p) => spy.observe(p));

  if (window.matchMedia("(prefers-reduced-motion: no-preference)").matches){
    const rev = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll(":scope > *").forEach((child, i) => {
          child.style.transitionDelay = (i * 60) + "ms";
        });
        e.target.classList.add("revealed");
        rev.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".page-inner,.cover-inner,.split-dark,.split-light")
      .forEach((el) => rev.observe(el));
  } else {
    document.querySelectorAll(".page-inner,.cover-inner,.split-dark,.split-light")
      .forEach((el) => el.classList.add("revealed"));
  }
}

function wireControls(){
  const q = (s) => document.querySelector(s);
  q(".tb-prev")?.addEventListener("click", () => goTo(current - 1));
  q(".tb-next")?.addEventListener("click", () => goTo(current + 1));
  q(".tb-print")?.addEventListener("click", () => window.print());

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    switch (e.key){
      case "ArrowDown": case "ArrowRight": case "PageDown":
        e.preventDefault(); goTo(current + 1); break;
      case "ArrowUp": case "ArrowLeft": case "PageUp":
        e.preventDefault(); goTo(current - 1); break;
      case "Home": e.preventDefault(); goTo(0); break;
      case "End":  e.preventDefault(); goTo(pages.length - 1); break;
    }
  });

  window.addEventListener("scroll", progress, { passive: true });
  window.addEventListener("resize", progress);
}

applyFills();
renderLedgers();
renderStacks();
numberPages();
buildSideNav();
wireControls();
observe();
setActive(0);
progress();
