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
  proposalDate: "11 September 2026",
  retainerReviewDate: "March 2027",
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
    ["shopify", "Shopify store setup + custom Naughty Berry styling", 3200,
     "Configure the Shopify store and customise the theme to closely match Naughty Berry's existing brand and website design.",
     "Shopify store"],
    ["connection", "React website connection + shop subdomain", 800,
     "Connect the existing React website to Shopify and configure a dedicated shop subdomain such as shop.naughtyberry.co.za.",
     "Website connection"],
    ["yoco", "Yoco payment integration", 1200,
     "Set up and test Yoco as the online payment gateway for secure customer checkout.",
     "Yoco"],
    ["courier", "Courier Guy Shopify integration", 1200,
     "Connect The Courier Guy to Shopify for delivery rates, shipment processing and order fulfilment workflows.",
     "Courier Guy"],
    ["mailchimp", "Mailchimp setup + branded email integration", 800,
     "Connect Mailchimp and configure branded customer email flows and marketing integration.",
     "Mailchimp"],
    ["products", "Initial product setup — up to 10 products", 800,
     "Add and configure up to 10 products including pricing, images, descriptions and product options.",
     "Products"],
    ["launch", "Testing, training + production launch", 1600,
     "Fully test the store, resolve launch issues, provide client training and publish the ecommerce system live.",
     "Launch"],
  ],
};

/* Package price is what Naughty Berry pays. Where it is below the sum
   of the lines, the difference is shown as a package reduction. */
const packagePrice = { a: 24000, b: 9600 };
const retainers    = { a: 3500,  b: 1500 };
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
  "retainer-review":  proposalData.retainerReviewDate,
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

/* Signature records stay visible across tabs on the same device. */
function initSignatures(){
  const board = document.querySelector("[data-signature-board]");
  if (!board) return;
  const key = "daybreak-db-nb-002-signatures";
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(key) : null;
  const today = new Date().toISOString().slice(0, 10);
  const cards = Array.from(board.querySelectorAll("[data-signature-card]"));
  const status = document.querySelector("[data-signature-status]");

  function read(){
    try { return JSON.parse(localStorage.getItem(key) || "null"); }
    catch { return null; }
  }
  function write(record){
    localStorage.setItem(key, JSON.stringify(record));
    channel?.postMessage(record);
  }
  function setupCanvas(canvas, data){
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(rect.width * ratio);
    canvas.height = Math.round(rect.height * ratio);
    const context = canvas.getContext("2d");
    context.scale(ratio, ratio);
    context.strokeStyle = "#3d2d29";
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    if (data) { const image = new Image(); image.onload = () => context.drawImage(image, 0, 0, rect.width, rect.height); image.src = data; }
    let drawing = false;
    const point = (event) => { const box = canvas.getBoundingClientRect(); return { x: event.clientX - box.left, y: event.clientY - box.top }; };
    canvas.addEventListener("pointerdown", (event) => { if (canvas.closest("[data-signature-card]").classList.contains("signature-card-locked")) return; drawing = true; canvas.setPointerCapture(event.pointerId); const p = point(event); context.beginPath(); context.moveTo(p.x, p.y); });
    canvas.addEventListener("pointermove", (event) => { if (!drawing) return; const p = point(event); context.lineTo(p.x, p.y); context.stroke(); });
    canvas.addEventListener("pointerup", () => { drawing = false; });
    canvas.addEventListener("pointercancel", () => { drawing = false; });
    return () => canvas.toDataURL("image/png");
  }
  function collectCard(card, confirmed){
    return {
      id: card.dataset.signatureCard,
      name: card.querySelector("[data-signature-name]").value.trim(),
      role: card.querySelector("[data-signature-role]")?.value.trim() || "",
      date: card.querySelector("[data-signature-date]").value,
      signature: card._signatureData(),
      confirmed: confirmed || card.classList.contains("signature-card-locked"),
      confirmedAt: confirmed ? new Date().toISOString() : card.dataset.confirmedAt || ""
    };
  }
  function collectRecord(){
    return { cards: cards.map((card) => collectCard(card)), updatedAt: new Date().toISOString() };
  }
  function updateStatus(){
    const count = cards.filter((card) => card.classList.contains("signature-card-locked")).length;
    status.textContent = count ? `${count} of ${cards.length} signatures confirmed` : "Awaiting signatures";
  }
  function apply(record){
    if (!record) return;
    cards.forEach((card, index) => {
      const saved = record.cards?.[index];
      if (!saved) return;
      card.querySelector("[data-signature-name]").value = saved.name || "";
      const role = card.querySelector("[data-signature-role]");
      if (role) role.value = saved.role || "";
      card.querySelector("[data-signature-date]").value = saved.date || today;
      card._signatureData = setupCanvas(card.querySelector("[data-signature-canvas]"), saved.signature);
      card.dataset.confirmedAt = saved.confirmedAt || "";
      card.classList.toggle("signature-card-locked", Boolean(saved.confirmed));
    });
    updateStatus();
  }
  cards.forEach((card) => {
    card.querySelector("[data-signature-date]").value = today;
    card._signatureData = setupCanvas(card.querySelector("[data-signature-canvas]"));
    card.querySelector("[data-signature-clear]").addEventListener("click", () => {
      if (card.classList.contains("signature-card-locked")) return;
      const canvas = card.querySelector("[data-signature-canvas]");
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    });
    card.querySelector("[data-signature-confirm]").addEventListener("click", () => {
      const record = collectCard(card, true);
      if (!record.name || !record.date) {
        status.textContent = "Add a name and date before confirming this signature";
        return;
      }
      const saved = read() || { cards: cards.map((item) => collectCard(item)) };
      saved.cards = cards.map((item) => item === card ? record : collectCard(item));
      saved.updatedAt = new Date().toISOString();
      write(saved);
      apply(saved);
    });
  });
  channel?.addEventListener("message", (event) => apply(event.data));
  apply(read());
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
initSignatures();
numberPages();
buildSideNav();
wireControls();
observe();
setActive(0);
progress();
