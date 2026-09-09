/* ============================================================
   DAYBREAK PROPOSAL SYSTEM — DB-NB-002 · V2
   Naughty Berry Ecommerce Expansion Options

   NO FEE, TOTAL, RETAINER, HOUR COUNT OR DATE IS TYPED INTO THE
   HTML. Everything below is bound into the page at runtime, so
   the narrative pages and the commercial pages cannot disagree.

   The V1 "Sweet Range" deck is archived inside a <template> in
   index.html. Content in a <template> is inert, so nothing below
   touches it.
   ============================================================ */

const proposalData = {
  clientName:   "Naughty Berry",
  projectName:  "Ecommerce Expansion",
  reference:    "DB-NB-002 · V2",
  proposalDate: "9 September 2026",
  proposalValidityDays: 14,
  currency:     "ZAR",
  companyName:  "Daybreak",
  email:        "contact@daybreaktechinnovations.com",
  website:      "daybreaktech.agency",
  location:     "Cape Town, South Africa",
};

/* ---- the single source of every rand in this document ----- */
/* [key, name, fee, description, short label for the stack bar] */
const optionLines = {
  a: [
    ["storefront", "Custom React storefront, cart and checkout", 8000,
     "Custom React shop page, product cards and detail views, variants, quantity and stock, persistent cart, and the full custom checkout capturing contact, delivery and consent details.",
     "Storefront"],
    ["dashboard", "Database and order dashboard", 5000,
     "Product, variant, price, stock, weight and dimension records, customer, order, payment, shipment and tracking data, product administration, and the protected internal order dashboard.",
     "Dashboard"],
    ["courier", "Courier Guy custom integration", 6000,
     "Secure backend functions for rates, addresses, parcel dimensions, services and pricing, automated shipment creation after payment, shipment IDs, waybills, tracking, cancellation and failure handling, plus the customer-facing courier interface.",
     "Courier Guy"],
    ["yoco", "Yoco payment integration", 3000,
     "Yoco Checkout API connection, secure payment creation, hosted payment redirect, return, cancellation and failure handling, webhook verification, server-side total verification and duplicate-payment protection.",
     "Yoco"],
    ["mailchimp", "Mailchimp integration", 4000,
     "Account configuration, newsletter signup form, subscriber audience, marketing consent, welcome email, one initial branded newsletter template and subscriber-flow testing.",
     "Mailchimp"],
    ["launch", "Testing, deployment and training", 2000,
     "Product, cart, checkout, payment, courier-rate, shipment, waybill and tracking testing on mobile and desktop, duplicate webhook testing, live production test, dashboard training and final deployment.",
     "Launch"],
  ],
  b: [
    ["shopify", "Shopify store and Courier Guy setup", 6000,
     "Shopify account and store configuration, branded styling matched to Naughty Berry, navigation, catalogue and product pages, variants, stock, cart and checkout, order emails, mobile optimisation, connection to the existing React website, The Courier Guy plugin, zones, services and rates, testing and training.",
     "Shopify store"],
    ["yoco", "Yoco payment integration", 2000,
     "Naughty Berry's Yoco account connected and configured as the payment provider, successful and failed payment handling, test transactions and production payment testing.",
     "Yoco"],
    ["mailchimp", "Mailchimp integration", 4000,
     "Account configuration, newsletter signup connection, subscriber audience, marketing consent, welcome email, one initial branded newsletter template and subscriber testing.",
     "Mailchimp"],
  ],
};

/* Package price is what Naughty Berry pays. Where it is below the sum
   of the lines, the difference is shown as a package reduction. */
const packagePrice = { a: 24000, b: 12000 };
const retainers    = { a: 3500,  b: 2000  };
const timelines    = { a: "3–4 weeks", b: "2–3 weeks" };

/* ---- estimated development time --------------------------- */
/* [workstream, low hours, high hours] */
const hourLines = {
  a: [
    ["Planning and provider setup",       3,  5],
    ["Database and product management",   6,  9],
    ["Product catalogue and cart",        8, 12],
    ["Checkout and delivery interface",   6, 10],
    ["Yoco integration",                  5,  8],
    ["Courier Guy API integration",      10, 16],
    ["Dashboard, waybills and tracking",  8, 12],
    ["Mailchimp and notifications",       4,  7],
    ["Security, testing and deployment",  7, 11],
  ],
  b: [
    ["Shopify setup and branding",        7, 11],
    ["Products and store configuration",  4,  6],
    ["Existing website connection",       2,  4],
    ["Yoco integration",                  2,  4],
    ["Courier Guy plugin and shipping",   3,  6],
    ["Mailchimp integration",             4,  6],
    ["Testing, training and launch",      4,  6],
  ],
};

const productAllowance = 10;
const monthlyChangeAllowance = 5;

/* ---- derived ---------------------------------------------- */
const standardValue = {
  a: optionLines.a.reduce((t, l) => t + l[2], 0),
  b: optionLines.b.reduce((t, l) => t + l[2], 0),
};
const total = { a: packagePrice.a, b: packagePrice.b };
const saving = { a: standardValue.a - packagePrice.a, b: standardValue.b - packagePrice.b };

const hourRange = (k) => hourLines[k].reduce(
  (t, l) => [t[0] + l[1], t[1] + l[2]], [0, 0]);

/* comma grouping, per the house convention: R12,000 — not the en-ZA space */
const money = (n) => "R" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const yearOne = (k) => total[k] + retainers[k] * 12;
const dash = (k) => { const [lo, hi] = hourRange(k); return lo + "–" + hi; };

/* ---- text substitution map -------------------------------- */
const fills = {
  "client-name":      proposalData.clientName,
  "project-name":     proposalData.projectName,
  "reference":        proposalData.reference,
  "proposal-date":    proposalData.proposalDate,
  "validity":         proposalData.proposalValidityDays + " days",
  "company":          proposalData.companyName,
  "email":            proposalData.email,
  "website":          proposalData.website,
  "location":         proposalData.location,
  "product-count":    String(productAllowance),
  "change-count":     String(monthlyChangeAllowance),

  "a-total":          money(total.a),
  "b-total":          money(total.b),
  "a-standard":       money(standardValue.a),
  "b-standard":       money(standardValue.b),
  "a-saving":         money(saving.a),
  "b-saving":         money(saving.b),
  "a-retainer":       money(retainers.a),
  "b-retainer":       money(retainers.b),
  "a-retainer-year":  money(retainers.a * 12),
  "b-retainer-year":  money(retainers.b * 12),
  "a-year-one":       money(yearOne("a")),
  "b-year-one":       money(yearOne("b")),
  "a-time":           timelines.a,
  "b-time":           timelines.b,
  "a-hours":          dash("a") + " hours",
  "b-hours":          dash("b") + " hours",
  "a-hours-range":    dash("a"),
  "b-hours-range":    dash("b"),
  "delta":            money(total.a - total.b),
  "delta-retainer":   money(retainers.a - retainers.b),
};

/* every line fee is addressable as, e.g., data-fill="a-courier" */
Object.keys(optionLines).forEach((k) => {
  optionLines[k].forEach(([lineKey, , fee]) => {
    fills[k + "-" + lineKey] = money(fee);
  });
});

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

    const tail = saving[key] > 0
      ? `
      <div class="cost-row sub">
        <div class="cr-main"><b class="cr-name">Standard project value</b></div>
        <div class="cr-fig">${money(standardValue[key])}</div>
      </div>
      <div class="cost-row total">
        <div class="cr-main">
          <b class="cr-name">Package price · once off</b>
          <p class="cr-desc">Includes a ${money(saving[key])} package reduction on the standard value.</p>
        </div>
        <div class="cr-fig">${money(total[key])}</div>
      </div>`
      : `
      <div class="cost-row total">
        <div class="cr-main"><b class="cr-name">Total once-off investment</b></div>
        <div class="cr-fig">${money(total[key])}</div>
      </div>`;

    host.innerHTML = rows + tail;
  });
}

function renderStacks(){
  document.querySelectorAll("[data-stack]").forEach((host) => {
    const key = host.getAttribute("data-stack");
    const lines = optionLines[key];
    if (!lines) return;
    const t = standardValue[key];
    /* six narrow brackets need tighter type than three wide ones */
    host.classList.toggle("dense", lines.length > 4);
    const segs = lines.map(([, , fee]) =>
      `<i class="ti-seg" style="width:${(fee / t * 100).toFixed(2)}%"></i>`).join("");
    const brackets = lines.map(([, name, fee, , short]) => `
      <div class="ti-bracket" style="width:${(fee / t * 100).toFixed(2)}%">
        <span class="tb-name">${short || name}</span>
        <span class="tb-fig">${money(fee)}</span>
      </div>`).join("");
    host.innerHTML =
      `<div class="ti-bar">${segs}</div><div class="ti-brackets">${brackets}</div>`;
  });
}

function renderHours(){
  document.querySelectorAll("[data-hours]").forEach((host) => {
    const key = host.getAttribute("data-hours");
    const lines = hourLines[key];
    if (!lines) return;
    const rows = lines.map(([name, lo, hi]) =>
      `<tr><td>${name}</td><td>${lo}–${hi}</td></tr>`).join("");
    host.innerHTML =
      `<thead><tr><th scope="col">Workstream</th><th scope="col">Estimated hours</th></tr></thead>` +
      `<tbody>${rows}` +
      `<tr class="figure total"><td>Estimated total</td><td>${dash(key)} hours</td></tr></tbody>`;
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
renderHours();
numberPages();
buildSideNav();
wireControls();
observe();
setActive(0);
progress();
