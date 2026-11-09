/* ==========================================================
   1. HELPERS & CONSTANTS
   ========================================================== */

/**
 * DOM selector helper (document.getElementById shortcut).
 * @param {string} id - The element ID.
 * @returns {HTMLElement|null} The DOM element if found.
 */
const $ = (id) => document.getElementById(id);

/**
 * Generates a pseudo-random 6-character alphanumeric unique ID.
 * Converts random float to base-36 string and slices characters 2 to 8.
 * @returns {string} 6-character unique string (e.g., "a8f3x2").
 */
const uid = () => Math.random().toString(36).slice(2, 8);

/**
 * Short for "Price/Peso". Formats a numeric amount into Philippine Peso currency string.
 * @param {number|string} n - The numeric amount.
 * @returns {string} Formatted currency string (e.g., "₱1,450").
 */
const P = (n) =>
  "₱" +
  Number(n).toLocaleString("en-PH", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

/**
 * Short for "Statuses". Sequential lifecycle stages for repair work orders.
 */
const ST = [
  "Queued",
  "Diagnosing",
  "Awaiting Parts/Approval",
  "In Progress",
  "Ready for Pickup",
  "Completed"
];

/**
 * Converts a status name into a CSS-friendly class name.
 * Takes the first token before space or slash and converts it to lower case.
 * @param {string} s - Full status label (e.g. "Awaiting Parts/Approval").
 * @returns {string} Class name token (e.g. "awaiting").
 */
const cls = (s) => s.split(/[ /]/)[0].toLowerCase();

/**
 * Returns today's calendar date as an ISO date string (YYYY-MM-DD).
 * Slices the first 10 characters of the ISO timestamp.
 * @returns {string} Date string (e.g., "2026-10-29").
 */
const today = () => new Date().toISOString().slice(0, 10);

/**
 * Returns current local timestamp in ISO-like format (YYYY-MM-DDTHH:MM:SS) using local time.
 * @returns {string} Local timestamp string.
 */
const nowLocalIso = () => {
  const d = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};


/* ==========================================================
   2. SEED (DEFAULT) DATA
   ========================================================== */

/**
 * DATA SHAPES:
 *
 * cu = Customers
 *   - id: string (unique customer ID, e.g., "c1")
 *   - name: string (customer's full name)
 *   - phone: string (customer's mobile phone number)
 *
 * bk = Motorcycles (Bikes)
 *   - id: string (unique motorcycle ID, e.g., "b1")
 *   - cid: string (customer ID referencing cu.id)
 *   - make: string (manufacturer/brand, e.g., "Honda")
 *   - model: string (model name, e.g., "Click 125")
 *   - year: number|string (model year, e.g., 2021)
 *   - plate: string (license plate number, e.g., "ABC-1234")
 *   - odo: number (current odometer reading in km)
 *
 * pt = Parts Catalog
 *   - id: string (unique part ID, e.g., "p1")
 *   - sku: string (stock keeping unit code, e.g., "OIL-10W40")
 *   - name: string (part description / name)
 *   - cost: number (unit selling price / cost in PHP)
 *
 * sv = Service Packages
 *   - id: string (unique service ID, e.g., "s1")
 *   - name: string (service job title, e.g., "Change oil")
 *   - labor: number (labor fee in PHP)
 *   - parts: string[] (array of part IDs from pt used during service)
 *
 * wo = Work Orders
 *   - id: string (unique work order ID, e.g., "w1")
 *   - bid: string (motorcycle ID referencing bk.id)
 *   - mech: string (assigned mechanic name)
 *   - st: string (status matching an item from ST)
 *   - sv: string[] (array of service package IDs referencing sv.id)
 *   - note: string (complaint details or repair notes)
 *   - at: string (creation date string, YYYY-MM-DD)
 *   - done?: string (completion timestamp, ISO-like string, optional)
 *   - odo?: number (intake odometer reading in km, optional)
 */

/**
 * Generates initial demo data when no saved state exists in localStorage.
 * Spreads realistic completed jobs across today, yesterday, last 7 days, last 30 days, last month, and earlier this year.
 * @returns {Object} Database object containing cu, bk, pt, sv, and wo collections.
 */
function seed() {
  const now = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  const toLocalIso = (d, h = 9, m = 30) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(h)}:${pad(m)}:00`;

  const dToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dYest = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  const d4DaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 4);
  const d18DaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 18);
  const dLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 15);
  const dEarlierYear = new Date(now.getFullYear(), 0, 20);

  return {
    cu: [
      { id: "c1", name: "Juan Dela Cruz", phone: "0917 555 0101" },
      { id: "c2", name: "Maria Santos", phone: "0918 555 0142" },
      { id: "c3", name: "Pedro Reyes", phone: "0920 555 0177" }
    ],
    bk: [
      { id: "b1", cid: "c1", make: "Honda", model: "Click 125", year: 2021, plate: "ABC-1234", odo: 18450 },
      { id: "b2", cid: "c2", make: "Yamaha", model: "Mio i125", year: 2019, plate: "XYZ-9876", odo: 32100 },
      { id: "b3", cid: "c3", make: "Suzuki", model: "Raider R150", year: 2022, plate: "DEF-5678", odo: 9800 }
    ],
    pt: [
      { id: "p1", sku: "OIL-10W40", name: "Engine oil 10W-40 (1L)", cost: 420 },
      { id: "p2", sku: "FLT-OIL", name: "Oil filter", cost: 180 },
      { id: "p3", sku: "BRK-PAD-F", name: "Front brake pads", cost: 650 },
      { id: "p4", sku: "CVT-BELT", name: "CVT drive belt", cost: 1450 },
      { id: "p5", sku: "SPK-PLG", name: "Spark plug", cost: 260 },
      { id: "p6", sku: "GRS-CVT", name: "CVT grease", cost: 150 }
    ],
    sv: [
      { id: "s1", name: "Change oil", labor: 150, parts: ["p1", "p2"] },
      { id: "s2", name: "Valve clearance", labor: 450, parts: [] },
      { id: "s3", name: "CVT cleaning", labor: 600, parts: ["p6"] },
      { id: "s4", name: "Brake overhaul", labor: 500, parts: ["p3"] },
      { id: "s5", name: "Tune-up", labor: 350, parts: ["p5"] }
    ],
    wo: [
      { id: "w1", bid: "b1", mech: "Leo", st: "Awaiting Parts/Approval", sv: ["s4"], note: "Squeaking front brake", at: today() },
      { id: "w2", bid: "b2", mech: "Mike", st: "Ready for Pickup", sv: ["s1", "s3"], note: "", at: today() },
      { id: "w3", bid: "b3", mech: "Mike", st: "In Progress", sv: ["s5"], note: "Hard to start", at: today() },
      {
        id: "w4",
        bid: "b1",
        mech: "Leo",
        st: "Completed",
        sv: ["s1", "s5"],
        note: "Routine 18,000 km maintenance and oil change",
        at: toLocalIso(dToday, 8, 30).slice(0, 10),
        done: toLocalIso(dToday, 11, 15),
        odo: 18450
      },
      {
        id: "w5",
        bid: "b2",
        mech: "Mike",
        st: "Completed",
        sv: ["s3"],
        note: "Belt inspection and CVT cleaning due to sluggish acceleration",
        at: toLocalIso(dYest, 9, 0).slice(0, 10),
        done: toLocalIso(dYest, 14, 45),
        odo: 32050
      },
      {
        id: "w6",
        bid: "b3",
        mech: "Leo",
        st: "Completed",
        sv: ["s4"],
        note: "Front brake pads worn down; calipers cleaned and bled",
        at: toLocalIso(d4DaysAgo, 10, 15).slice(0, 10),
        done: toLocalIso(d4DaysAgo, 15, 20),
        odo: 9650
      },
      {
        id: "w7",
        bid: "b1",
        mech: "Mike",
        st: "Completed",
        sv: ["s1", "s2"],
        note: "Engine tapping sound; valve clearance adjusted to factory specs",
        at: toLocalIso(d18DaysAgo, 8, 45).slice(0, 10),
        done: toLocalIso(d18DaysAgo, 13, 10),
        odo: 17800
      },
      {
        id: "w8",
        bid: "b2",
        mech: "Leo",
        st: "Completed",
        sv: ["s1"],
        note: "Regular 30,000 km oil change and inspection",
        at: toLocalIso(dLastMonth, 9, 30).slice(0, 10),
        done: toLocalIso(dLastMonth, 10, 50),
        odo: 30500
      },
      {
        id: "w9",
        bid: "b3",
        mech: "Mike",
        st: "Completed",
        sv: ["s5"],
        note: "Full tune-up and spark plug replacement",
        at: toLocalIso(dEarlierYear, 11, 0).slice(0, 10),
        done: toLocalIso(dEarlierYear, 16, 30),
        odo: 7200
      }
    ]
  };
}


/* ==========================================================
   3. STORAGE (load / save)
   ========================================================== */

/**
 * In-memory database object. Loads parsed JSON from localStorage key "moto1",
 * or falls back to seed() if not present or invalid.
 */
let D;
try {
  D = JSON.parse(localStorage.getItem("moto1"));
} catch (e) {}
if (!D) {
  D = seed();
}

/**
 * Persists the entire database object D into localStorage under key "moto1".
 */
const save = () => {
  try {
    localStorage.setItem("moto1", JSON.stringify(D));
  } catch (e) {}
};


/* ==========================================================
   4. DATA LOOKUPS
   ========================================================== */

/**
 * Short for "get". Generic lookup finder for any collection in D by record id.
 * @param {string} a - Collection key in D (e.g. "bk", "cu", "pt", "sv", "wo").
 * @param {string} id - The ID of the item to retrieve.
 * @returns {Object|undefined} The matching record or undefined.
 */
const g = (a, id) => D[a].find((x) => x.id === id);

/**
 * Retrieves a motorcycle record by ID.
 * @param {string} id - The motorcycle ID.
 * @returns {Object|undefined} Motorcycle record.
 */
const bike = (id) => g("bk", id);

/**
 * Retrieves the customer record who owns the specified motorcycle.
 * @param {Object} b - Motorcycle record object containing cid.
 * @returns {Object|undefined} Customer record.
 */
const own = (b) => g("cu", b.cid);

/**
 * Short for "bike name". Formats motorcycle plate and make/model into a clean label.
 * @param {Object} b - Motorcycle record.
 * @returns {string} Formatted label (e.g. "ABC-1234 · Honda Click 125").
 */
const bn = (b) => `${b.plate} · ${b.make} ${b.model}`;


/* ==========================================================
   5. BILLING CALCULATIONS
   ========================================================== */

/**
 * Calculates itemized billing line items for a work order or service array.
 * Each service produces a labor line item and line items for each part consumed.
 * @param {Object} o - Object containing an array of service IDs in `sv`.
 * @returns {Array<{n: string, a: number}>} Array of line items with description `n` and amount `a`.
 */
function lines(o) {
  const L = [];
  o.sv.forEach((id) => {
    const s = g("sv", id);
    L.push({ n: s.name + " (labor)", a: s.labor });
    s.parts.forEach((p) => {
      const x = g("pt", p);
      L.push({ n: x.name, a: x.cost });
    });
  });
  return L;
}

/**
 * Calculates the grand total amount for a work order or service package.
 * Sums all line item amounts using Array.reduce.
 * @param {Object} o - Object containing an array of service IDs in `sv`.
 * @returns {number} Total amount in PHP.
 */
const total = (o) => lines(o).reduce((a, l) => a + l.a, 0);


/* ==========================================================
   6. UI COMPONENTS
   ========================================================== */

/**
 * Builds an HTML status badge for a work order status.
 * @param {string} s - Status string.
 * @returns {string} HTML span element string.
 */
const badge = (s) => `<span class="bd ${cls(s)}">${s.toUpperCase()}</span>`;

/**
 * Renders an HTML table of work orders.
 * @param {Array<Object>} L - Array of work order objects.
 * @param {boolean} [full] - True to render services & total columns; false for compact view.
 * @returns {string} HTML table string or empty state placeholder.
 */
function tbl(L, full) {
  if (!L.length) {
    return `<div class="empty">No active jobs. Create a work order to get started.</div>`;
  }

  return `<div class="tw"><table><tr><th>PLATE NO.</th><th>STATUS</th><th>MECHANIC</th>${
    full ? `<th>SERVICES</th><th class="r">TOTAL</th>` : ""
  }<th></th></tr>${L.map((o) => {
    const b = bike(o.bid);
    return `<tr><td><b>${b.plate}</b>${
      full ? `<br><small style="color:var(--mu)">${b.make} ${b.model}</small>` : ""
    }</td><td>${badge(o.st)}</td><td>${o.mech}</td>${
      full ? `<td>${o.sv.map((i) => g("sv", i).name).join(", ")}</td><td class="r">${P(total(o))}</td>` : ""
    }<td class="r"><button class="btn g sm" onclick="mCard('${o.id}')">Job card</button></td></tr>`;
  }).join("")}</table></div>`;
}

/**
 * Helper to compute the authoritative total for a work order.
 * If the job has item rows, returns labor subtotal + parts subtotal.
 * If it has no item rows, returns the recorded job total.
 * @param {Object} job - Work order object.
 * @returns {number} Numeric total in PHP.
 */
function jobTotalOf(job) {
  if (!job) return 0;
  if (Array.isArray(job.items) && job.items.length) {
    let laborSub = 0;
    let partsSub = 0;
    job.items.forEach((it) => {
      const isLabor = it.kind === "labor";
      const qty = isLabor ? 1 : Math.max(1, Number(it.qty) || 1);
      if (it.src !== "own") {
        const price = Math.max(0, Number(it.price) || 0);
        if (isLabor) laborSub += qty * price;
        else partsSub += qty * price;
      }
    });
    return laborSub + partsSub;
  }
  return total(job);
}

/**
 * Short for "Modal". Opens the modal overlay and injects HTML into the dialog body.
 * @param {string} h - HTML content string to display inside modal.
 */
const M = (h) => {
  $("md").innerHTML = h;
  $("ov").classList.add("on");
};

/**
 * Short for "Close Modal". Closes the modal overlay.
 */
const cm = () => $("ov").classList.remove("on");

/**
 * Short for "value". Retrieves and trims the string value of an input element.
 * @param {string} id - Input element ID.
 * @returns {string} Trimmed value.
 */
const v = (id) => $(id).value.trim();

/**
 * Short for "finish". Persists changes, closes the modal, and refreshes the current view.
 */
const fin = () => {
  save();
  cm();
  go(view);
};

/**
 * Short for "actions". Builds Cancel and Save buttons for modal dialog footers.
 * @param {string} ok - JavaScript function call string executed on Save click.
 * @returns {string} HTML div string with action buttons.
 */
const acts = (ok) =>
  `<div class="acts"><button class="btn g" onclick="cm()">Cancel</button><button class="btn" onclick="${ok}">Save</button></div>`;


/* ==========================================================
   7. NAVIGATION
   ========================================================== */

/**
 * Navigation routes metadata: [routeId, icon, label].
 */
const V = [
  ["dash", "▦", "Dashboard"],
  ["cust", "👥", "Customers & Motorcycles"],
  ["rep", "🔧", "Active Repairs"],
  ["cat", "📦", "Service & Parts Catalog"],
  ["his", "🕘", "Service History"]
];

/** Currently active view key. */
let view = "dash";

/** Currently selected motorcycle ID if navigated from Customers view. */
let hisBike = null;

/** Active search query string for Active Repairs page. */
let repSearch = "";

/** Active status filter for Active Repairs page ("all" or status string). */
let repFilter = "all";

/** Active search query string in Service History shop-wide table. */
let hisSearch = "";

/** Active date filter for Service History page ("all", "today", "yesterday", "7days", "30days", "month", "lastMonth", "year", "custom"). */
let hisDate = "all";

/** Active mechanic filter for Service History page ("all" or mechanic name). */
let hisMech = "all";

/** Custom "From" date string for Service History page ("YYYY-MM-DD"). */
let hisFrom = "";

/** Custom "To" date string for Service History page ("YYYY-MM-DD"). */
let hisTo = "";

/**
 * Navigates to a view, updates sidebar active states, and renders the view content.
 * Resets search and filter state when navigating to another view (preserves hisBike for his view).
 * @param {string} v - Target view key ("dash", "cust", "rep", "cat", "his").
 */
function go(v) {
  if (view !== v) {
    repSearch = "";
    repFilter = "all";
    if (v === "his" && hisBike) {
      const b = bike(hisBike);
      hisSearch = b ? b.plate : "";
      hisBike = null;
      hisDate = "all";
      hisMech = "all";
      hisFrom = "";
      hisTo = "";
    } else {
      hisSearch = "";
      hisDate = "all";
      hisMech = "all";
      hisFrom = "";
      hisTo = "";
      hisBike = null;
    }
  }
  view = v;
  $("nav").innerHTML = V.map(
    (x) =>
      `<button class="${x[0] == v ? "on" : ""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`
  ).join("");
  $("main").innerHTML = R[v]();
}


/* ==========================================================
   8. VIEWS
   ========================================================== */

/**
 * Filter chip definitions for the Active Repairs view.
 * Status values must match ST exactly.
 */
const REP_CHIPS = [
  { id: "all", label: "All Active", status: "all", cls: "chip-all" },
  { id: "awaiting", label: "Awaiting Parts/Approval", status: "Awaiting Parts/Approval", cls: "chip-awaiting" },
  { id: "in", label: "In Progress", status: "In Progress", cls: "chip-in" },
  { id: "ready", label: "Ready for Pickup", status: "Ready for Pickup", cls: "chip-ready" }
];

/**
 * Returns filtered repair work orders matching both the active search query and status filter.
 * Search matches against plate number, customer name, job ID, and motorcycle make/model.
 * @param {string} [filter=repFilter] - Status filter to apply ("all" or an ST status).
 * @returns {Array<Object>} Filtered list of work orders.
 */
function getFilteredRepairs(filter = repFilter) {
  // Base set: all active (non-completed) work orders, including Ready for Pickup
  const base = D.wo.filter((o) => o.st !== "Completed");
  const q = repSearch.trim().toLowerCase().replace(/\s+/g, " ");

  return base.filter((o) => {
    // 1. Status matching
    const matchesStatus = filter === "all" || o.st === filter;
    if (!matchesStatus) {
      return false;
    }

    // 2. Search query matching
    if (!q) {
      return true;
    }

    const b = bike(o.bid);
    const c = b ? own(b) : null;
    const plate = b && b.plate ? b.plate.toLowerCase() : "";
    const customer = c && c.name ? c.name.toLowerCase() : "";
    const jobId = o.id ? o.id.toLowerCase() : "";
    const model = b ? `${b.make || ""} ${b.model || ""}`.toLowerCase() : "";

    return (
      plate.includes(q) ||
      customer.includes(q) ||
      jobId.includes(q) ||
      model.includes(q)
    );
  });
}

/**
 * Builds HTML for all filter chips with dynamic counts based on the current search text.
 * @returns {string} HTML string of filter chip buttons.
 */
function getRepChipsHtml() {
  return REP_CHIPS.map((chip) => {
    const isSelected = repFilter === chip.status;
    const count = getFilteredRepairs(chip.status).length;
    return `<button type="button" class="chip ${chip.cls} ${
      isSelected ? "on" : ""
    }" onclick="setRepFilter('${chip.status}')">${chip.label} (${count})</button>`;
  }).join("");
}

/**
 * Builds HTML for the repair results table or friendly empty state.
 * @returns {string} HTML string.
 */
function getRepResultsHtml() {
  const list = getFilteredRepairs();
  if (!list.length) {
    return `<div class="empty"><div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:4px">No repair jobs found.</div><div>Try a different plate number, name, or status.</div></div>`;
  }
  return tbl(list, 1);
}

/** Short names for calendar months (zero-indexed 0 = Jan .. 11 = Dec). */
const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

/**
 * Parses a "YYYY-MM-DD" date string, ISO timestamp, or Date object into a local Date instance at midnight (00:00:00.000).
 * Never uses toISOString or UTC parsing to avoid time zone date displacement.
 * @param {string|Date} str - Date string formatted as "YYYY-MM-DD" or Date object.
 * @returns {Date|null} Local Date object or null if invalid.
 */
function parseLocalDate(str) {
  if (!str) return null;
  if (str instanceof Date) {
    return new Date(str.getFullYear(), str.getMonth(), str.getDate(), 0, 0, 0, 0);
  }
  const datePart = String(str).split("T")[0];
  const parts = datePart.split("-");
  if (parts.length < 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m, d, 0, 0, 0, 0);
}

/**
 * Returns the current local calendar date at midnight (00:00:00.000).
 * @returns {Date} Local midnight Date object for today.
 */
function getLocalToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

/**
 * Formats a date string, ISO timestamp, or Date into a human-readable display string (e.g. "Oct 29, 2026").
 * @param {string|Date} dateStr - Date string, ISO timestamp, or Date object.
 * @returns {string} Formatted date string (e.g. "Oct 29, 2026").
 */
function formatJobDate(dateStr) {
  const d = parseLocalDate(dateStr);
  if (!d) return dateStr || "—";
  return `${MONTH_NAMES_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/**
 * Extracts and formats the 12-hour completion time from an ISO timestamp (e.g. "09:15 AM").
 * Returns " — " if no time component exists.
 * @param {string} isoStr - ISO timestamp string.
 * @returns {string} Formatted time string (e.g. "09:15 AM" or " — ").
 */
function formatJobTime(isoStr) {
  if (!isoStr || !String(isoStr).includes("T")) return " — ";
  const timePart = String(isoStr).split("T")[1];
  if (!timePart) return " — ";
  const [hStr, mStr] = timePart.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return " — ";
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  const mPad = m < 10 ? "0" + m : m;
  return `${h12 < 10 ? "0" + h12 : h12}:${mPad} ${ampm}`;
}

/**
 * Formats two local dates into a clean range string (e.g. "Oct 1 – Oct 31, 2026").
 * @param {Date} d1 - Start date.
 * @param {Date} d2 - End date.
 * @returns {string} Formatted range string.
 */
function formatShortRange(d1, d2) {
  if (!d1 || !d2) return "";
  const m1 = MONTH_NAMES_SHORT[d1.getMonth()];
  const m2 = MONTH_NAMES_SHORT[d2.getMonth()];
  const y1 = d1.getFullYear();
  const y2 = d2.getFullYear();
  if (y1 === y2) {
    return `${m1} ${d1.getDate()} – ${m2} ${d2.getDate()}, ${y1}`;
  }
  return `${m1} ${d1.getDate()}, ${y1} – ${m2} ${d2.getDate()}, ${y2}`;
}

/**
 * Checks whether a job's completion/creation date string falls within a specified filter period.
 * All comparisons are performed strictly using local date values (no UTC or toISOString).
 * @param {string} dateStr - Date string or ISO timestamp.
 * @param {string} filterKey - Filter identifier ("all", "today", "yesterday", "7days", "30days", "month", "lastMonth", "year", "custom").
 * @param {string} [customFrom=hisFrom] - Custom range start date string.
 * @param {string} [customTo=hisTo] - Custom range end date string.
 * @returns {boolean} True if date is within range.
 */
function inDateRange(dateStr, filterKey, customFrom = hisFrom, customTo = hisTo) {
  if (filterKey === "all") return true;
  const d = parseLocalDate(dateStr ? String(dateStr).split("T")[0] : "");
  if (!d) return false;
  const today = getLocalToday();

  if (filterKey === "today") {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }

  if (filterKey === "yesterday") {
    const yest = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0, 0, 0);
    return (
      d.getFullYear() === yest.getFullYear() &&
      d.getMonth() === yest.getMonth() &&
      d.getDate() === yest.getDate()
    );
  }

  if (filterKey === "7days") {
    const start7 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0, 0, 0, 0);
    const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return d.getTime() >= start7.getTime() && d.getTime() <= endToday.getTime();
  }

  if (filterKey === "30days") {
    const start30 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0, 0, 0, 0);
    const endToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    return d.getTime() >= start30.getTime() && d.getTime() <= endToday.getTime();
  }

  if (filterKey === "month") {
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth()
    );
  }

  if (filterKey === "lastMonth") {
    const targetYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
    const targetMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
    return (
      d.getFullYear() === targetYear &&
      d.getMonth() === targetMonth
    );
  }

  if (filterKey === "year") {
    return d.getFullYear() === today.getFullYear();
  }

  if (filterKey === "custom") {
    let f = parseLocalDate(customFrom);
    let t = parseLocalDate(customTo);
    if (f && t && f.getTime() > t.getTime()) {
      const temp = f;
      f = t;
      t = temp;
    }
    if (f && t) {
      return d.getTime() >= f.getTime() && d.getTime() <= (t.getTime() + 86399999);
    }
    if (f) return d.getTime() >= f.getTime();
    if (t) return d.getTime() <= (t.getTime() + 86399999);
    return true;
  }

  return true;
}

/**
 * Returns a sorted array of unique mechanic names found across all work orders.
 * @returns {Array<string>} Alphabetically sorted array of mechanic names.
 */
function getUniqueMechanics() {
  const set = new Set();
  D.wo.forEach((o) => {
    if (o.mech && o.mech.trim()) {
      set.add(o.mech.trim());
    }
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/**
 * Returns completed work orders matching the active search query, mechanic filter, and date range.
 * Search matches against plate number, customer name, phone, make/model, job ID, mechanic, and dates.
 * Sorted by newest completion date first.
 * @returns {Array<Object>} Filtered list of completed work orders.
 */
function getFilteredHistory() {
  const base = D.wo.filter((o) => o.st === "Completed");
  const q = hisSearch.trim().toLowerCase().replace(/\s+/g, " ");

  return base.filter((o) => {
    // 1. Mechanic filter
    if (hisMech !== "all" && (o.mech || "").trim().toLowerCase() !== hisMech.toLowerCase()) {
      return false;
    }

    // 2. Date range filter
    const dateVal = o.done || o.at || "";
    if (!inDateRange(dateVal, hisDate, hisFrom, hisTo)) {
      return false;
    }

    // 3. Search query filter
    if (!q) return true;

    const b = bike(o.bid);
    const c = b ? own(b) : null;
    const plate = b && b.plate ? b.plate.toLowerCase() : "";
    const customer = c && c.name ? c.name.toLowerCase() : "";
    const phone = c && c.phone ? c.phone.toLowerCase() : "";
    const model = b ? `${b.make || ""} ${b.model || ""}`.toLowerCase() : "";
    const jobId = o.id ? o.id.toLowerCase() : "";
    const mech = o.mech ? o.mech.toLowerCase() : "";
    const rawDate = dateVal.toLowerCase();
    const formattedDate = formatJobDate(dateVal).toLowerCase();

    return (
      plate.includes(q) ||
      customer.includes(q) ||
      phone.includes(q) ||
      model.includes(q) ||
      jobId.includes(q) ||
      mech.includes(q) ||
      rawDate.includes(q) ||
      formattedDate.includes(q)
    );
  }).sort((a, c) => (c.done || c.at || "").localeCompare(a.done || a.at || ""));
}

/**
 * Generates descriptive text for the active date range period.
 * @returns {string} Human-readable period description.
 */
function getHisSummaryDescription() {
  const today = getLocalToday();

  if (hisDate === "all") {
    return "All Time";
  }
  if (hisDate === "today") {
    return `Today (${formatJobDate(today)})`;
  }
  if (hisDate === "yesterday") {
    const yest = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1, 0, 0, 0, 0);
    return `Yesterday (${formatJobDate(yest)})`;
  }
  if (hisDate === "7days") {
    const start7 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6, 0, 0, 0, 0);
    return `Last 7 Days (${formatShortRange(start7, today)})`;
  }
  if (hisDate === "30days") {
    const start30 = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 29, 0, 0, 0, 0);
    return `Last 30 Days (${formatShortRange(start30, today)})`;
  }
  if (hisDate === "month") {
    const mStart = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0);
    const mEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 0, 0, 0);
    return `This Month (${formatShortRange(mStart, mEnd)})`;
  }
  if (hisDate === "lastMonth") {
    const targetYear = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
    const targetMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
    const lmStart = new Date(targetYear, targetMonth, 1, 0, 0, 0, 0);
    const lmEnd = new Date(targetYear, targetMonth + 1, 0, 0, 0, 0);
    return `Last Month (${formatShortRange(lmStart, lmEnd)})`;
  }
  if (hisDate === "year") {
    return `This Year (${today.getFullYear()})`;
  }
  if (hisDate === "custom") {
    let f = parseLocalDate(hisFrom);
    let t = parseLocalDate(hisTo);
    if (f && t) {
      if (f.getTime() > t.getTime()) {
        const temp = f;
        f = t;
        t = temp;
      }
      return `Custom (${formatShortRange(f, t)})`;
    }
    if (f) return `Custom (From ${formatJobDate(f)})`;
    if (t) return `Custom (Up to ${formatJobDate(t)})`;
    return "Custom (All dates)";
  }
  return "All Time";
}

/**
 * Builds HTML for the summary line above the completed jobs table.
 * @returns {string} HTML string.
 */
function getHisSummaryHtml() {
  const list = getFilteredHistory();
  const count = list.length;
  const jobWord = count === 1 ? "completed job" : "completed jobs";
  return `Showing ${count} ${jobWord} · ${getHisSummaryDescription()}`;
}

/**
 * Builds HTML for the shop-wide completed jobs table or empty state.
 * @returns {string} HTML string.
 */
function getHisResultsHtml() {
  const list = getFilteredHistory();
  if (!list.length) {
    return `<div class="empty">
      <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:4px">No completed jobs found.</div>
      <div>Try a different search, date range, or mechanic.</div>
    </div>`;
  }

  return `<div class="tw">
    <table>
      <thead>
        <tr>
          <th>COMPLETION DATE &amp; TIME</th>
          <th>VEHICLE &amp; CUSTOMER INFO</th>
          <th>LEAD MECHANIC</th>
          <th>PRIMARY ISSUE / DIAGNOSIS</th>
          <th class="r">TOTAL COST (₱)</th>
          <th class="r">ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        ${list.map((o) => {
          const b = bike(o.bid);
          const c = b ? own(b) : null;
          const dateVal = o.done || o.at || "";
          const svcNames = (o.sv || []).map((id) => (g("sv", id) ? g("sv", id).name : id)).join(", ") || "—";
          const truncSvcNames = svcNames.length > 45 ? svcNames.slice(0, 42) + "..." : svcNames;

          return `<tr>
            <td>
              <div style="font-weight:700;color:var(--text-primary)">${formatJobDate(dateVal)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${formatJobTime(dateVal)}</div>
            </td>
            <td>
              <button type="button" class="his-plate-btn" onclick="filterByPlate('${b.plate}')" title="Filter by plate ${b.plate}">
                <span>${b.plate}</span> <span class="his-plate-icon">🕒</span>
              </button>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${b.make} ${b.model}</div>
              <div style="font-weight:600;font-size:13px;color:var(--text-primary);margin-top:2px">${c ? c.name : "—"}</div>
            </td>
            <td>
              <span style="font-weight:600;color:var(--text-primary)">${o.mech || "Unassigned"}</span>
            </td>
            <td>
              <div style="font-weight:700;color:var(--text-primary)" title="${svcNames.replace(/"/g, '&quot;')}">${truncSvcNames}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${o.note || "—"}</div>
            </td>
            <td class="r" style="font-weight:700;color:var(--text-primary);font-size:14px">
              ${P(total(o))}
            </td>
            <td class="r">
              <button type="button" class="btn-rec" onclick="openRecord('${o.id}')">View Full Record</button>
            </td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>
  </div>`;
}

/**
 * View renderers registry containing HTML generator functions for each screen.
 */
const R = {
  /**
   * Dashboard view: shows KPI summary cards, priority repair queue, and active alerts.
   * @returns {string} HTML string.
   */
  dash() {
    // Active jobs: work orders not yet completed or ready for pickup
    const act = D.wo.filter((o) => o.st != "Completed" && o.st != "Ready for Pickup");
    // Ready jobs: work orders awaiting customer settlement and vehicle pickup
    const rdy = D.wo.filter((o) => o.st == "Ready for Pickup");
    // Services finished today: work orders with done date matching today
    const dn = D.wo.filter((o) => (o.done || "").slice(0, 10) == today());

    const d = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const stat = (i, bg, l, n, t) =>
      `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${n}</b>${t}</div></div>`;

    return `<div class="card top"><div><h1>Welcome back 👋</h1><p>Admin | ${d}</p></div><span class="pill">● Saved on this device</span></div>
 <div class="stats">${stat("🔧", "#DBEAFE", "ACTIVE REPAIRS", act.length, "In progress")}${stat("👛", "#FFEDD5", "PENDING PAYMENTS", rdy.length, "Ready for pickup")}${stat("✅", "#D1FAE5", "TODAY’S SERVICES", dn.length, "Jobs finished")}</div>
 <div class="grid2"><div class="card"><div class="hd">🔧 Priority Repair Queue<button class="btn g sm" onclick="go('rep')">View all</button></div>${tbl(D.wo.filter((o) => o.st != "Completed"))}</div>
 <div class="card"><div class="hd">🔔 Alerts &amp; Reminders</div>
 ${rdy.length ? `<div class="al or">Pending settlement<span>${rdy.length} repaired vehicle${rdy.length > 1 ? "s are" : " is"} waiting for customer payment &amp; pickup.</span></div>` : ""}
 ${!rdy.length ? `<div class="empty">All clear.</div>` : ""}</div></div>`;
  },

  /**
   * Customers & Motorcycles view: lists registered motorcycles, owner contact, and quick actions.
   * @returns {string} HTML string.
   */
  cust() {
    return `<div class="card top"><div><h1>Customers &amp; Motorcycles</h1><p>Owners and the motorcycles they bring in</p></div><button class="btn" onclick="mCust()">+ Add customer / motorcycle</button></div>
 <div class="card tw"><table><tr><th>PLATE NO.</th><th>MOTORCYCLE</th><th>YEAR</th><th>ODOMETER</th><th>OWNER</th><th></th></tr>
 ${D.bk.map((b) => `<tr><td><b>${b.plate}</b></td><td>${b.make} ${b.model}</td><td>${b.year}</td><td>${b.odo.toLocaleString()} km</td><td>${own(b).name}<br><small style="color:var(--mu)">${own(b).phone}</small></td><td class="r"><button class="btn g sm" onclick="hisBike='${b.id}';go('his')">History</button> <button class="btn sm" onclick="mWO('${b.id}')">New work order</button></td></tr>`).join("")}</table></div>`;
  },

  /**
   * Active Repairs view: shows search bar, status filter chips, and live results list.
   * @returns {string} HTML string.
   */
  rep() {
    return `<div class="card top"><div><h1>Active Repairs</h1><p>Move each job through the work order lifecycle</p></div><button class="btn" onclick="mWO()">+ New work order</button></div>
<div class="rep-search-wrap">
  <span class="search-icon" onclick="$('rep-search-input').focus()" title="Search">🔍</span>
  <input
    id="rep-search-input"
    type="text"
    placeholder="Search by Plate No., Customer Name, or Job ID..."
    value="${repSearch.replace(/"/g, '&quot;')}"
    oninput="onRepSearch(this.value)"
    onkeydown="if(event.key==='Enter')event.preventDefault()"
  />
  <button
    id="rep-search-clear"
    class="search-clear ${repSearch ? "visible" : ""}"
    onclick="clearRepSearch()"
    type="button"
    title="Clear search"
  >✕</button>
</div>
<div id="rep-chips" class="rep-chips">${getRepChipsHtml()}</div>
<div id="rep-results" class="card">${getRepResultsHtml()}</div>`;
  },

  /**
   * Service & Parts Catalog view: lists standard service packages and parts pricing catalog.
   * @returns {string} HTML string.
   */
  cat() {
    return `<div class="card top"><div><h1>Service &amp; Parts Catalog</h1><p>Standard packages linked to parts and labor fees</p></div></div>
 <div class="card" style="margin-bottom:20px"><div class="hd">Services<button class="btn sm" onclick="mSv()">+ Add service</button></div><div class="tw"><table><tr><th>SERVICE</th><th>PARTS USED</th><th class="r">LABOR</th><th class="r">PACKAGE TOTAL</th></tr>
 ${D.sv.map((s) => `<tr><td><b>${s.name}</b></td><td>${s.parts.map((p) => g("pt", p).name).join(", ") || "—"}</td><td class="r">${P(s.labor)}</td><td class="r">${P(total({ sv: [s.id] }))}</td></tr>`).join("")}</table></div></div>
 <div class="card"><div class="hd">Parts<button class="btn sm" onclick="mPt()">+ Add part</button></div><div class="tw"><table><tr><th>SKU</th><th>NAME</th><th class="r">UNIT COST</th></tr>
 ${D.pt.map((p) => `<tr><td>${p.sku}</td><td>${p.name}</td><td class="r">${P(p.cost)}</td></tr>`).join("")}</table></div></div>`;
  },

  /**
   * Service History view: shows shop-wide toolbar with live search, date range & mechanic filters, CSV export, and completed work orders table.
   * @returns {string} HTML string.
   */
  his() {
    return `<div class="card top">
  <div>
    <h1>Service History</h1>
    <p>Archived repair records and customer service history</p>
  </div>
</div>
<div class="card his-toolbar-card">
  <div class="his-toolbar">
    <div class="his-search-wrap">
      <span class="search-icon" onclick="$('his-search-input').focus()" title="Search">🔍</span>
      <input
        id="his-search-input"
        type="text"
        placeholder="Search by Plate No., Customer Name, or Date..."
        value="${hisSearch.replace(/"/g, '&quot;')}"
        autocomplete="off"
        oninput="onHisSearchInput(this.value)"
        onkeydown="if(event.key==='Enter')event.preventDefault()"
      />
      <button
        id="his-search-clear"
        class="search-clear ${hisSearch ? "visible" : ""}"
        onclick="clearHisSearch()"
        type="button"
        title="Clear search"
      >✕</button>
    </div>
    <div class="his-filter-group">
      <select id="his-date-select" class="his-select" onchange="onHisDateSelectChange(this.value)">
        <option value="all" ${hisDate === "all" ? "selected" : ""}>All Time</option>
        <option value="today" ${hisDate === "today" ? "selected" : ""}>Today</option>
        <option value="yesterday" ${hisDate === "yesterday" ? "selected" : ""}>Yesterday</option>
        <option value="7days" ${hisDate === "7days" ? "selected" : ""}>Last 7 Days</option>
        <option value="30days" ${hisDate === "30days" ? "selected" : ""}>Last 30 Days</option>
        <option value="month" ${hisDate === "month" ? "selected" : ""}>This Month</option>
        <option value="lastMonth" ${hisDate === "lastMonth" ? "selected" : ""}>Last Month</option>
        <option value="year" ${hisDate === "year" ? "selected" : ""}>This Year</option>
        <option value="custom" ${hisDate === "custom" ? "selected" : ""}>Custom Range</option>
      </select>
      <select id="his-mech-select" class="his-select" onchange="onHisMechSelectChange(this.value)">
        <option value="all" ${hisMech === "all" ? "selected" : ""}>All Mechanics</option>
        ${getUniqueMechanics().map((m) => `<option value="${m}" ${hisMech === m ? "selected" : ""}>${m}</option>`).join("")}
      </select>
      <button type="button" class="btn g his-btn-export" onclick="exportHisCsv()" title="Export filtered list to CSV">
        <span>📥</span> Export List
      </button>
    </div>
  </div>
  <div id="his-custom-row" class="his-custom-row ${hisDate === "custom" ? "open" : ""}">
    <label class="his-date-label">From: <input type="date" id="his-date-from" value="${hisFrom}" onchange="onHisCustomFromChange(this.value)"></label>
    <label class="his-date-label">To: <input type="date" id="his-date-to" value="${hisTo}" onchange="onHisCustomToChange(this.value)"></label>
  </div>
  <div id="his-export-toast" class="his-export-toast"></div>
</div>
<div id="his-summary" class="his-summary-text">${getHisSummaryHtml()}</div>
<div id="his-results" class="card his-table-card">${getHisResultsHtml()}</div>`;
  }
};


/* ==========================================================
   9. ACTIONS / EVENT HANDLERS
   ========================================================== */

/**
 * Live search input handler for Active Repairs.
 * Re-renders only the filter chips (to update counts) and the results container,
 * keeping the search input focused.
 * @param {string} val - Current input text value.
 */
function onRepSearch(val) {
  repSearch = val;
  const clr = $("rep-search-clear");
  if (clr) {
    clr.classList.toggle("visible", val.trim().length > 0);
  }
  const chipsEl = $("rep-chips");
  if (chipsEl) {
    chipsEl.innerHTML = getRepChipsHtml();
  }
  const resEl = $("rep-results");
  if (resEl) {
    resEl.innerHTML = getRepResultsHtml();
  }
}

/**
 * Filter chip selection handler for Active Repairs.
 * @param {string} status - Selected status filter ("all" or status string).
 */
function setRepFilter(status) {
  repFilter = status;
  const chipsEl = $("rep-chips");
  if (chipsEl) {
    chipsEl.innerHTML = getRepChipsHtml();
  }
  const resEl = $("rep-results");
  if (resEl) {
    resEl.innerHTML = getRepResultsHtml();
  }
}

/**
 * Clears the search text, refocuses the search input, and refreshes the view.
 */
function clearRepSearch() {
  repSearch = "";
  const inp = $("rep-search-input");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("rep-search-clear");
  if (clr) {
    clr.classList.remove("visible");
  }
  const chipsEl = $("rep-chips");
  if (chipsEl) {
    chipsEl.innerHTML = getRepChipsHtml();
  }
  const resEl = $("rep-results");
  if (resEl) {
    resEl.innerHTML = getRepResultsHtml();
  }
}

/**
 * Live search input handler for Service History.
 * Re-renders the summary line and results container, preserving search focus.
 * @param {string} val - Current input text value.
 */
function onHisSearchInput(val) {
  hisSearch = val;
  const clr = $("his-search-clear");
  if (clr) {
    clr.classList.toggle("visible", val.trim().length > 0);
  }
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Clears Service History search text, refocuses the search input, and refreshes the table.
 */
function clearHisSearch() {
  hisSearch = "";
  const inp = $("his-search-input");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("his-search-clear");
  if (clr) {
    clr.classList.remove("visible");
  }
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Date dropdown change handler for Service History.
 * @param {string} val - Selected date filter value.
 */
function onHisDateSelectChange(val) {
  hisDate = val;
  const customRow = $("his-custom-row");
  if (customRow) {
    customRow.classList.toggle("open", val === "custom");
  }
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Mechanic dropdown change handler for Service History.
 * @param {string} val - Selected mechanic ("all" or mechanic name).
 */
function onHisMechSelectChange(val) {
  hisMech = val;
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Custom "From" date change handler for Service History.
 * @param {string} val - Date string.
 */
function onHisCustomFromChange(val) {
  hisFrom = val;
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Custom "To" date change handler for Service History.
 * @param {string} val - Date string.
 */
function onHisCustomToChange(val) {
  hisTo = val;
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Clicking a plate number in the table sets the search filter to that plate.
 * @param {string} plate - License plate number.
 */
function filterByPlate(plate) {
  hisSearch = plate;
  const inp = $("his-search-input");
  if (inp) {
    inp.value = plate;
  }
  const clr = $("his-search-clear");
  if (clr) {
    clr.classList.add("visible");
  }
  const sumEl = $("his-summary");
  if (sumEl) {
    sumEl.innerHTML = getHisSummaryHtml();
  }
  const resEl = $("his-results");
  if (resEl) {
    resEl.innerHTML = getHisResultsHtml();
  }
}

/**
 * Shows an inline notification toast in the Service History toolbar.
 * @param {string} msg - Message to display.
 */
function showHisExportToast(msg) {
  const toast = $("his-export-toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  if (window._hisToastTimer) {
    clearTimeout(window._hisToastTimer);
  }
  window._hisToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/**
 * Exports currently filtered completed jobs into a clean CSV file with UTF-8 BOM.
 */
function exportHisCsv() {
  const list = getFilteredHistory();
  if (!list.length) {
    showHisExportToast("Nothing to export.");
    return;
  }

  const headers = [
    "Job ID",
    "Completion Date",
    "Completion Time",
    "Plate Number",
    "Motorcycle",
    "Customer Name",
    "Customer Phone",
    "Mechanic",
    "Services",
    "Notes",
    "Total Cost"
  ];

  const escapeCsv = (str) => `"${String(str || "").replace(/"/g, '""')}"`;

  const rows = list.map((o) => {
    const b = bike(o.bid);
    const c = b ? own(b) : null;
    const dateVal = o.done || o.at || "";
    const compDate = formatJobDate(dateVal);
    const compTime = formatJobTime(dateVal);
    const plate = b ? b.plate : "";
    const moto = b ? `${b.make} ${b.model} (${b.year || ""})`.trim() : "";
    const custName = c ? c.name : "";
    const custPhone = c ? c.phone : "";
    const mech = o.mech || "";
    const svcs = (o.sv || []).map((id) => (g("sv", id) ? g("sv", id).name : id)).join("; ");
    const note = o.note || "";
    const cost = total(o);

    return [
      escapeCsv(o.id),
      escapeCsv(compDate),
      escapeCsv(compTime === " — " ? "" : compTime),
      escapeCsv(plate),
      escapeCsv(moto),
      escapeCsv(custName),
      escapeCsv(custPhone),
      escapeCsv(mech),
      escapeCsv(svcs),
      escapeCsv(note),
      cost
    ].join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moto-service-history-${today()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Last element focused before opening the record modal, for focus restore. */
let lastFocusedEl = null;

/**
 * Opens the View Full Record modal for a completed repair job.
 * Shows comprehensive motorcycle and owner info, this job's details, itemized breakdown,
 * and the complete lifetime repair history of this motorcycle with this job highlighted.
 * @param {string} id - Work order ID.
 */
function openRecord(id) {
  const o = g("wo", id);
  if (!o) return;
  const b = bike(o.bid);
  const c = b ? own(b) : null;
  const dateVal = o.done || o.at || "";

  // All completed jobs for this motorcycle, sorted newest first
  const bikeHistory = D.wo
    .filter((w) => w.bid === b.id && w.st === "Completed")
    .sort((w1, w2) => (w2.done || w2.at || "").localeCompare(w1.done || w1.at || ""));

  const lifetimeTotal = bikeHistory.reduce((sum, w) => sum + total(w), 0);

  const html = `
    <div class="rec-header">
      <div>
        <div class="rec-title" id="rec-title">${b.plate} · ${b.make} ${b.model} (${b.year || "—"})</div>
        <div class="rec-subtitle">Permanent Vehicle &amp; Service Record</div>
      </div>
      <button type="button" class="rec-close-btn" onclick="closeRecord()" title="Close record" aria-label="Close record">✕</button>
    </div>

    <div class="rec-owner-card">
      <div>
        <div class="rec-field-label">Customer / Owner</div>
        <div class="rec-field-val">${c ? c.name : "—"}</div>
      </div>
      <div>
        <div class="rec-field-label">Contact Phone</div>
        <div class="rec-field-val">${c ? c.phone : "—"}</div>
      </div>
      <div>
        <div class="rec-field-label">Current Odometer</div>
        <div class="rec-field-val">${(b.odo || 0).toLocaleString()} km</div>
      </div>
    </div>

    <div class="rec-section-title">
      <span>This Job (#${o.id})</span>
      <span class="bd completed">COMPLETED</span>
    </div>

    <div class="rec-job-meta">
      <div>
        <div class="rec-field-label">Completed On</div>
        <div class="rec-field-val">${formatJobDate(dateVal)}</div>
        <div style="font-size:11px;color:var(--text-muted)">${formatJobTime(dateVal)}</div>
      </div>
      <div>
        <div class="rec-field-label">Lead Mechanic</div>
        <div class="rec-field-val">${o.mech || "Unassigned"}</div>
      </div>
      <div>
        <div class="rec-field-label">Intake Odometer</div>
        <div class="rec-field-val">${((o.odo !== undefined ? o.odo : b.odo) || 0).toLocaleString()} km</div>
      </div>
    </div>

    ${o.note ? `<div class="rec-note-box"><b>Notes / Diagnosis:</b> ${o.note}</div>` : ""}

    <table class="rec-bill-table">
      <thead>
        <tr>
          <th>ITEM / SERVICE</th>
          <th class="r">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${lines(o).map((l) => `<tr><td>${l.n}</td><td class="r">${P(l.a)}</td></tr>`).join("")}
      </tbody>
    </table>

    <div class="rec-bill-tot">
      <span>Total Cost</span>
      <span>${P(total(o))}</span>
    </div>

    <div class="rec-section-title">
      <span>Full Service History of This Motorcycle</span>
    </div>

    <div class="rec-lifetime-banner">
      <div><b>Lifetime Repairs:</b> ${bikeHistory.length} completed job${bikeHistory.length > 1 ? "s" : ""}</div>
      <div><b>Lifetime Total Spent:</b> ${P(lifetimeTotal)}</div>
    </div>

    <div class="rec-timeline">
      ${bikeHistory.map((w) => {
        const isCur = w.id === o.id;
        const wDate = w.done || w.at || "";
        const wSvcs = (w.sv || []).map((id) => (g("sv", id) ? g("sv", id).name : id)).join(", ");
        return `
          <div class="rec-timeline-item ${isCur ? "current" : ""}">
            <div class="rec-tl-header">
              <div>
                <b>${formatJobDate(wDate)}</b>
                <span class="rec-tl-time">${formatJobTime(wDate)}</span>
                ${isCur ? `<span class="rec-tl-badge">Current Record</span>` : ""}
              </div>
              <div class="rec-tl-tot">${P(total(w))}</div>
            </div>
            <div class="rec-tl-body">
              <div><b>Services:</b> ${wSvcs || "—"}</div>
              <div><b>Mechanic:</b> ${w.mech || "—"}${w.odo ? ` · <b>Odometer:</b> ${w.odo.toLocaleString()} km` : ""}</div>
              ${w.note ? `<div><b>Notes:</b> ${w.note}</div>` : ""}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div class="rec-footer">
      <button type="button" class="btn g" onclick="window.print()">🖨️ Print Record</button>
      <button type="button" class="btn" onclick="closeRecord()">Close</button>
    </div>
  `;

  lastFocusedEl = document.activeElement;
  $("rec-md").innerHTML = html;
  $("rec-ov").classList.add("on");
  document.body.style.overflow = "hidden";
  $("rec-ov").focus();
}

/**
 * Closes the View Full Record modal and restores focus.
 */
function closeRecord() {
  const ov = $("rec-ov");
  if (ov) {
    ov.classList.remove("on");
  }
  document.body.style.overflow = "";
  if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
    lastFocusedEl.focus();
  }
}

/**
 * Closes modal when user clicks on the backdrop outside the dialog card.
 */
$("ov").onclick = (e) => {
  if (e.target.id == "ov") {
    cm();
  }
};

$("rec-ov").onclick = (e) => {
  if (e.target.id == "rec-ov") {
    closeRecord();
  }
};

/**
 * Closes modal when user presses the Escape key.
 */
document.onkeydown = (e) => {
  if (e.key == "Escape") {
    if ($("rec-ov") && $("rec-ov").classList.contains("on")) {
      closeRecord();
      return;
    }
    cm();
  }
};

/**
 * Opens the "Add customer / motorcycle" modal.
 */
function mCust() {
  M(`<h2>Add customer / motorcycle</h2><label>Owner</label><select id="fc" onchange="$('nw').style.display=this.value?'none':'block'"><option value="">New customer…</option>${D.cu.map((c) => `<option value="${c.id}">${c.name}</option>`).join("")}</select>
 <div id="nw"><label>Full name</label><input id="fn"><label>Phone</label><input id="fp"></div>
 <div class="row"><div><label>Make</label><input id="fm"></div><div><label>Model</label><input id="fo"></div><div><label>Year</label><input id="fy" type="number"></div><div><label>Plate number</label><input id="fl"></div></div>
 <label>Current odometer (km)</label><input id="fk" type="number">${acts("addC()")}`);
}

/**
 * Validates and adds a new customer (if needed) and motorcycle to D.
 */
function addC() {
  let cid = v("fc");
  if (!cid) {
    if (!v("fn")) {
      return alert("Enter the owner name.");
    }
    cid = uid();
    D.cu.push({ id: cid, name: v("fn"), phone: v("fp") });
  }

  if (!v("fl") || !v("fm")) {
    return alert("Enter at least the make and plate number.");
  }

  D.bk.push({
    id: uid(),
    cid: cid,
    make: v("fm"),
    model: v("fo"),
    year: +v("fy") || "",
    plate: v("fl").toUpperCase(),
    odo: +v("fk") || 0
  });

  fin();
}

/**
 * Opens the "New work order" modal.
 * @param {string} [bid] - Optional motorcycle ID to pre-select.
 */
function mWO(bid) {
  M(`<h2>New work order</h2><label>Motorcycle</label><select id="wb">${D.bk.map((b) => `<option value="${b.id}" ${b.id == bid ? "selected" : ""}>${bn(b)} — ${own(b).name}</option>`).join("")}</select>
 <label>Services</label>${D.sv.map((s) => `<label class="chk"><input type="checkbox" name="ws" value="${s.id}">${s.name} — ${P(total({ sv: [s.id] }))}</label>`).join("")}
 <div class="row"><div><label>Mechanic</label><input id="wm" value="Mike"></div><div><label>Odometer in (km)</label><input id="wk" type="number"></div></div>
 <label>Customer complaint / notes</label><textarea id="wn" rows="2"></textarea>${acts("addW()")}`);
}

/**
 * Validates selected services and saves a new work order to D.wo.
 */
function addW() {
  // Gathers checked service package checkbox values
  const sv = [...document.getElementsByName("ws")]
    .filter((x) => x.checked)
    .map((x) => x.value);

  if (!sv.length) {
    return alert("Pick at least one service.");
  }

  const o = {
    id: uid(),
    bid: v("wb"),
    mech: v("wm") || "Unassigned",
    st: "Queued",
    sv: sv,
    note: v("wn"),
    at: today(),
    odo: +v("wk") || bike(v("wb")).odo
  };

  D.wo.push(o);
  fin();
}

/**
 * Opens the Job Card detail modal for a specific work order.
 * Shows motorcycle/owner info, stage progress steps, itemized bill, and status controls.
 * @param {string} id - Work order ID.
 */
function mCard(id) {
  const o = g("wo", id);
  const b = bike(o.bid);
  const i = ST.indexOf(o.st);

  M(`<h2>Job card · ${b.plate}</h2><div style="color:var(--mu);margin-bottom:8px">${b.make} ${b.model} ${b.year || ""} · ${own(b).name} · ${own(b).phone}<br>Mechanic: ${o.mech} · Opened ${o.at}${o.note ? `<br>Notes: ${o.note}` : ""}</div>
 <div class="steps">${ST.map((s, k) => `<span class="${k <= i ? "d" : ""}">${s}</span>`).join("")}</div>
 <table>${lines(o).map((l) => `<tr><td style="padding:7px 0">${l.n}</td><td class="r" style="padding:7px 0">${P(l.a)}</td></tr>`).join("")}</table>
 <div class="tot"><span>Total</span><span>${P(total(o))}</span></div>
 <div class="acts"><button class="btn g" onclick="cm()">Close</button><button class="btn g" onclick="print()">Print</button>
 ${i > 0 && i < 5 ? `<button class="btn g" onclick="mv('${o.id}',-1)">← Back</button>` : ""}${i < 5 ? `<button class="btn" onclick="mv('${o.id}',1)">${i == 4 ? "Collect payment &amp; complete" : "Move to " + ST[i + 1]}</button>` : ""}</div>`);
}

/**
 * Short for "move". Advances or regresses a work order along the status pipeline.
 * When completed: sets completion date and updates bike odometer.
 * @param {string} id - Work order ID.
 * @param {number} d - Direction delta (+1 to advance, -1 to rewind).
 */
function mv(id, d) {
  const o = g("wo", id);
  o.st = ST[ST.indexOf(o.st) + d];

  if (o.st == "Completed") {
    o.done = nowLocalIso();
    const b = bike(o.bid);
    if (o.odo > b.odo) {
      b.odo = o.odo;
    }
  }

  save();
  go(view);
  mCard(id);
}

/**
 * Opens the "Add part" modal.
 */
function mPt() {
  M(`<h2>Add part</h2><div class="row"><div><label>SKU</label><input id="ps"></div><div><label>Name</label><input id="pn"></div></div><label>Unit cost (₱)</label><input id="pc" type="number">${acts("addP()")}`);
}

/**
 * Validates and saves a new part to D.pt.
 */
function addP() {
  if (!v("pn")) {
    return alert("Enter a part name.");
  }

  D.pt.push({
    id: uid(),
    sku: v("ps"),
    name: v("pn"),
    cost: +v("pc") || 0
  });

  fin();
}

/**
 * Opens the "Add service" package modal.
 */
function mSv() {
  M(`<h2>Add service</h2><label>Service name</label><input id="sn"><label>Labor fee (₱)</label><input id="sl" type="number"><label>Parts used (1 each)</label>${D.pt.map((p) => `<label class="chk"><input type="checkbox" name="sp" value="${p.id}">${p.name}</label>`).join("")}${acts("addS()")}`);
}

/**
 * Validates and saves a new service package to D.sv.
 */
function addS() {
  if (!v("sn")) {
    return alert("Enter a service name.");
  }

  D.sv.push({
    id: uid(),
    name: v("sn"),
    labor: +v("sl") || 0,
    parts: [...document.getElementsByName("sp")]
      .filter((x) => x.checked)
      .map((x) => x.value)
  });

  fin();
}


/* ==========================================================
   9b. POS SWITCHER (Navigation & Tabs)
   ========================================================== */

/**
 * Tab definitions for the consolidated POS switcher bar.
 * Ordered: Quick Sales, Quick Labor, Transactions & Billing.
 */
const POS_TABS = [
  { id: "pos", label: "Quick Sales", shortLabel: "Sales", icon: "pos" },
  { id: "ql", label: "Quick Labor", shortLabel: "Labor", icon: "ql" },
  { id: "bill", label: "Transactions & Billing", shortLabel: "Billing", icon: "bill" }
];

/**
 * Returns the POS_TABS the current role may open, read from the shared role-permissions map.
 * @returns {Array<Object>} Permitted POS tab definitions.
 */
function getPosTabsForRole() {
  if (typeof canOpen === "function") {
    return POS_TABS.filter((tab) => canOpen(tab.id));
  }
  return POS_TABS;
}

/** Last POS screen ID opened during this session. */
let posLastTab = "";

/**
 * Resolves which POS screen should open when the POS sidebar item is tapped.
 * Returns posLastTab if permitted, else "pos" (Quick Sales) if permitted,
 * else the first permitted POS tab, else null.
 * @returns {string|null} Resolved screen ID.
 */
function resolvePosTab() {
  const tabs = getPosTabsForRole();
  if (!tabs.length) return null;
  if (posLastTab && tabs.some((t) => t.id === posLastTab)) {
    return posLastTab;
  }
  const quickSales = tabs.find((t) => t.id === "pos");
  if (quickSales) {
    return "pos";
  }
  return tabs[0].id;
}

/**
 * Renders the consolidated 3-button switcher bar at the top of the main content area.
 * Removes any existing switcher first to avoid duplicates.
 * If fewer than 2 tabs are permitted for the active role, adds nothing.
 * @param {string} activeId - The active POS screen ID ("pos", "ql", or "bill").
 */
function renderPosSwitcher(activeId) {
  const existing = $("pos-switcher");
  if (existing) {
    existing.remove();
  }

  const tabs = getPosTabsForRole();
  if (tabs.length < 2) {
    return;
  }

  const mainEl = $("main-content-area") || $("main");
  if (!mainEl) return;

  const switcher = document.createElement("div");
  switcher.id = "pos-switcher";
  switcher.setAttribute("role", "tablist");
  switcher.setAttribute("aria-label", "POS Section Switcher");

  const iconsMap = typeof ICONS !== "undefined" ? ICONS : {};

  switcher.innerHTML = tabs
    .map(
      (t) => `
        <button
          type="button"
          role="tab"
          class="pos-tab ${t.id === activeId ? "pos-tab-active" : ""}"
          data-screen="${t.id}"
          aria-selected="${t.id === activeId ? "true" : "false"}"
          onclick="loadView('${t.id}')"
        >
          <span>${iconsMap[t.icon] || ""}</span>
          <span class="pos-tab-label-full">${t.label}</span>
          <span class="pos-tab-label-short">${t.shortLabel}</span>
        </button>
      `
    )
    .join("");

  mainEl.insertBefore(switcher, mainEl.firstChild);

  if (window.lucide && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

/**
 * Loads a view and triggers per-screen setup.
 * Wraps go(v) for standard screen loading.
 * @param {string} v - Screen ID to load.
 */
function loadView(v) {
  if (typeof go === "function") {
    go(v);
  }
}


/* ==========================================================
   10. INIT
   ========================================================== */

/**
 * Bootstraps initial view and navigation on page load.
 */
go("dash");
