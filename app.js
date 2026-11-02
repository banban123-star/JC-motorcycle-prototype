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
  (Number(n) || 0).toLocaleString("en-PH", {
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
  "Checking",
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
 * Returns today's calendar date as a local date string (YYYY-MM-DD).
 * Constructed strictly from local year, month, and day without toISOString().
 * @returns {string} Local date string (e.g., "2026-10-30").
 */
const today = () => {
  const d = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

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
      { id: "w1", bid: "b1", mech: "Larpus", st: "Awaiting Parts/Approval", sv: ["s4"], note: "Squeaking front brake", at: today() },
      { id: "w2", bid: "b2", mech: "Hiyo", st: "Ready for Pickup", sv: ["s1", "s3"], note: "", at: today() },
      { id: "w3", bid: "b3", mech: "Hiyo", st: "In Progress", sv: ["s5"], note: "Hard to start", at: today() },
      {
        id: "w4",
        bid: "b1",
        mech: "Larpus",
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
        mech: "Hiyo",
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
        mech: "Larpus",
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
        mech: "Hiyo",
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
        mech: "Larpus",
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
        mech: "Hiyo",
        st: "Completed",
        sv: ["s5"],
        note: "Full tune-up and spark plug replacement",
        at: toLocalIso(dEarlierYear, 11, 0).slice(0, 10),
        done: toLocalIso(dEarlierYear, 16, 30),
        odo: 7200
      }
    ],
    sales: []
  };
}


/* ==========================================================
   3. STORAGE (load / save)
   ========================================================== */

/**
 * In-memory database object. Loads parsed JSON from localStorage key "moto1",
 * or falls back to seed() if not present or invalid.
 * Safely migrates work-order mechanics "Leo" -> "Larpus" and "Mike" -> "Hiyo".
 * Ensures D.sales array exists for Quick Sales records.
 */
let D;
try {
  D = JSON.parse(localStorage.getItem("moto1"));
} catch (e) {}
if (!D) {
  D = seed();
} else {
  let migrated = false;
  if (!Array.isArray(D.sales)) {
    D.sales = [];
    migrated = true;
  }
  let mechMigrated = false;
  if (Array.isArray(D.wo)) {
    D.wo.forEach((o) => {
      if (o.mech === "Leo") {
        o.mech = "Larpus";
        mechMigrated = true;
      } else if (o.mech === "Mike") {
        o.mech = "Hiyo";
        mechMigrated = true;
      }
    });
  }
  if (mechMigrated || migrated) {
    try {
      localStorage.setItem("moto1", JSON.stringify(D));
    } catch (e) {}
  }
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
   AUTH & ROLES
   ========================================================== */

/**
 * System roles and their permitted action tokens.
 * Permissions are not enforced yet. Fill ROLES[role].permissions and make can() check them later.
 */
const ROLES = {
  superadmin: { label: "Super Admin", permissions: [] },
  admin:      { label: "Admin",       permissions: [] },
  mechanic:   { label: "Mechanic",    permissions: [] }
};

// Default Primary & Admin Navigation pages each role can open.
const DEFAULT_ROLE_NAV = {
  admin:      ["dash", "cust", "insp", "rep", "pos", "cat", "bill", "his", "reports"],
  superadmin: ["his", "reports", "users"],
  mechanic:   ["dash", "insp", "rep"]
};
const ROLE_NAV = DEFAULT_ROLE_NAV;

/**
 * Returns allowed primary/admin navigation route keys for a role.
 * Reads custom permissions matrix from localStorage key "moto1_nav", falling back to defaults.
 * Automatically merges newly introduced default keys (e.g. "pos") into legacy matrices.
 * Super Admin always has "users" and Admin always has "dash", regardless of stored matrix.
 * @param {string} role - System role key.
 * @returns {Array<string>} Allowed route keys.
 */
function getRoleNav(role) {
  let matrix = null;
  try {
    const raw = localStorage.getItem("moto1_nav");
    if (raw) {
      matrix = JSON.parse(raw);
    }
  } catch (e) {
    matrix = null;
  }

  let list = (matrix && Array.isArray(matrix[role]))
    ? [...matrix[role]]
    : [...(DEFAULT_ROLE_NAV[role] || [])];

  // Merge newly added default page keys (like "pos") missing from legacy saved matrices
  if (matrix && (!matrix._v || matrix._v < 2)) {
    if (role === "admin" && !list.includes("pos")) {
      const repIdx = list.indexOf("rep");
      if (repIdx !== -1) {
        list.splice(repIdx + 1, 0, "pos");
      } else {
        list.push("pos");
      }
    }
  }

  // Super Admin ALWAYS has access to User Management
  if (role === "superadmin" && !list.includes("users")) {
    list.push("users");
  }
  // Admin ALWAYS has access to Dashboard
  if (role === "admin" && !list.includes("dash")) {
    list.unshift("dash");
  }

  const validKeys = V.map((x) => x[0]);
  return list.filter((k) => validKeys.includes(k));
}

/**
 * Checks whether the active role has permission to open a specific navigation page.
 * @param {string} pageKey - Route key to check (e.g. "dash", "cust", "rep", "cat", "his", "reports", "users").
 * @returns {boolean} True if the active role can open the page.
 */
const canOpen = (pageKey) => {
  const u = getCurrentUser();
  if (!u) return false;
  const allowed = getRoleNav(u.activeRole);
  return allowed.includes(pageKey);
};

/**
 * Checks whether the current user has the specified permission.
 * Action permissions are not enforced yet.
 * @param {string} permission - The permission token to check.
 * @returns {boolean} Always true for now.
 */
const can = (permission) => true;

/**
 * Default demo user accounts seeded into localStorage under key "moto1_users".
 */
const DEFAULT_USERS = [
  { id: "u1", name: "Super Admin", email: "superadmin@gmail.com", role: "superadmin", active: true, lastLogin: "" },
  { id: "u2", name: "Admin",       email: "admin@gmail.com",      role: "admin",      active: true, lastLogin: "" },
  { id: "u3", name: "Larpus",      email: "larpus@gmail.com",     role: "mechanic",   active: true, lastLogin: "" },
  { id: "u4", name: "Hiyo",        email: "hiyo@gmail.com",       role: "mechanic",   active: true, lastLogin: "" }
];

/**
 * Returns a local timestamp string "YYYY-MM-DD HH:MM" built from local time parts.
 * Never uses toISOString().
 * @param {Date} [d=new Date()]
 * @returns {string} e.g. "2026-10-24 08:00"
 */
function nowLocalTimestamp(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hr = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${hr}:${min}`;
}

/**
 * Loads registered user accounts from localStorage under key "moto1_users".
 * Migrates existing users by adding missing active/lastLogin fields, preserves extra users,
 * and ensures default demo accounts are present without ever resetting on reload.
 * @returns {Array<Object>} List of user account records.
 */
function loadUsers() {
  let list = [];
  try {
    const raw = localStorage.getItem("moto1_users");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        list = parsed;
      }
    }
  } catch (e) {
    list = [];
  }

  if (!list.length) {
    list = JSON.parse(JSON.stringify(DEFAULT_USERS));
    try {
      localStorage.setItem("moto1_users", JSON.stringify(list));
    } catch (e) {}
  } else {
    // Migration: ensure 4 default accounts exist without wiping extra users
    DEFAULT_USERS.forEach((def) => {
      const exists = list.some((u) => u.email && u.email.toLowerCase() === def.email.toLowerCase());
      if (!exists) {
        list.push(JSON.parse(JSON.stringify(def)));
      }
    });

    let modified = false;
    list = list.map((u) => {
      let changed = false;
      if (u.active === undefined) {
        u.active = true;
        changed = true;
      }
      if (u.lastLogin === undefined) {
        u.lastLogin = "";
        changed = true;
      }
      if (changed) modified = true;
      return u;
    });

    if (modified) {
      try {
        localStorage.setItem("moto1_users", JSON.stringify(list));
      } catch (e) {}
    }
  }

  return list;
}

/**
 * Persists the user accounts list to localStorage under key "moto1_users".
 * @param {Array<Object>} users - The user accounts array.
 */
function saveUsers(users) {
  try {
    localStorage.setItem("moto1_users", JSON.stringify(users));
  } catch (e) {}
}

/**
 * Loads the active session payload from localStorage under key "moto1_session".
 * @returns {Object|null} Session object { userId, role, at } or null.
 */
function getSession() {
  try {
    const raw = localStorage.getItem("moto1_session");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && parsed.userId) {
        return parsed;
      }
    }
  } catch (e) {}
  return null;
}

/**
 * Persists the active session payload into localStorage under key "moto1_session".
 * @param {Object} s - The session object { userId, role, at }.
 */
function saveSession(s) {
  try {
    localStorage.setItem("moto1_session", JSON.stringify(s));
  } catch (e) {}
}

/**
 * Clears the active session from localStorage under key "moto1_session".
 */
function clearSession() {
  try {
    localStorage.removeItem("moto1_session");
  } catch (e) {}
}

/**
 * Retrieves the currently authenticated user object with the active role from session.
 * Clears corrupted sessions and returns null if unauthenticated.
 * @returns {Object|null} User object with activeRole property or null.
 */
function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = loadUsers();
  const user = users.find((u) => u.id === session.userId);
  if (!user || user.active === false) {
    clearSession();
    return null;
  }
  const activeRole = session.role && ROLES[session.role] ? session.role : user.role;
  return {
    ...user,
    activeRole
  };
}

/**
 * Computes avatar initials from a display name (e.g. "Shop Owner" -> "SO", "Mike" -> "M").
 * @param {string} name - User display name.
 * @returns {string} 1 or 2 letter uppercase initials.
 */
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Returns inline SVG markup for a given role icon tile.
 * @param {string} role - System role key.
 * @returns {string} SVG markup string.
 */
/**
 * Formats user role for dropdown lists and switchers.
 * Mechanics show "Mechanic · {name}" to differentiate between accounts.
 * @param {Object} u - User record.
 * @returns {string} Formatted label.
 */
function getUserRoleLabel(u) {
  const meta = ROLES[u.role] || { label: u.role };
  if (u.role === "mechanic") {
    return `${meta.label} · ${u.name}`;
  }
  return meta.label;
}

function getRoleIconSvg(role) {
  if (role === "superadmin") {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="16" y1="11" x2="22" y2="11"></line></svg>`;
  }
  if (role === "admin") {
    return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M4 18l2-10 5 5 5-5 2 10H4z"></path><circle cx="4" cy="7" r="1.5" fill="currentColor"></circle><circle cx="12" cy="7" r="1.5" fill="currentColor"></circle><circle cx="20" cy="7" r="1.5" fill="currentColor"></circle></svg>`;
  }
  return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
}

/**
 * Renders the sidebar user profile block based on the active user.
 */
function renderSidebarUser() {
  const u = getCurrentUser();
  if (!u) return;

  const avEl = $("user-av");
  if (avEl) avEl.textContent = getInitials(u.name);

  const nameEl = $("user-name");
  if (nameEl) nameEl.textContent = u.name;

  const roleEl = $("user-role");
  const roleMeta = ROLES[u.activeRole] || { label: u.activeRole };
  if (roleEl) roleEl.textContent = roleMeta.label;
}

/**
 * Adjusts the sidebar popup max-height to ensure it is never cut off by viewport boundaries.
 */
function adjustSidebarPopupPosition() {
  const popup = $("sidebar-account-popup");
  const btn = $("btn-switch-account");
  if (!popup || popup.style.display === "none" || !btn) return;

  const rect = btn.getBoundingClientRect();
  const top = rect.bottom + 6;
  const availHeight = Math.max(100, window.innerHeight - top - 16);
  popup.style.maxHeight = availHeight + "px";
}

window.addEventListener("resize", adjustSidebarPopupPosition);
window.addEventListener("scroll", adjustSidebarPopupPosition, true);

/**
 * Toggles the sidebar account switcher popup list.
 */
function toggleAccountSwitcher() {
  const popup = $("sidebar-account-popup");
  const btn = $("btn-switch-account");
  if (!popup) return;
  const isCurrentlyOpen = popup.style.display !== "none";
  if (isCurrentlyOpen) {
    closeAccountSwitcher();
  } else {
    renderSidebarAccountPopup();
    popup.style.display = "block";
    if (btn) btn.setAttribute("aria-expanded", "true");
    adjustSidebarPopupPosition();
  }
}

/**
 * Closes the sidebar account switcher popup list.
 */
function closeAccountSwitcher() {
  const popup = $("sidebar-account-popup");
  const btn = $("btn-switch-account");
  if (popup) popup.style.display = "none";
  if (btn) btn.setAttribute("aria-expanded", "false");
}

/**
 * Renders the saved accounts in the sidebar account switcher popup.
 * Active account is marked with a checkmark.
 */
function renderSidebarAccountPopup() {
  const popup = $("sidebar-account-popup");
  if (!popup) return;

  const users = loadUsers().filter((u) => u.active !== false);
  const current = getCurrentUser();
  const currentId = current ? current.id : null;

  let html = `<div class="sidebar-acc-header">SWITCH ACCOUNT</div>`;

  html += users
    .map((u) => {
      const isCurrent = u.id === currentId;
      const roleMeta = ROLES[u.role] || { label: u.role };
      return `
        <div
          class="sidebar-acc-item"
          role="option"
          aria-selected="${isCurrent ? "true" : "false"}"
          tabindex="0"
          onmousedown="switchAccount('${u.id}')"
          onkeydown="if(event.key==='Enter'||event.key===' ')switchAccount('${u.id}')"
        >
          <div class="role-tile sm ${u.role}">
            ${getRoleIconSvg(u.role)}
          </div>
          <div class="sidebar-acc-info">
            <span class="sidebar-acc-email">${u.email}</span>
            <span class="sidebar-acc-role">${getUserRoleLabel(u)}</span>
          </div>
          ${
            isCurrent
              ? `<span class="sidebar-acc-check" title="Active account">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>`
              : ""
          }
        </div>
      `;
    })
    .join("");

  popup.innerHTML = html;
}

/**
 * Switches active user to target account immediately without logout or reload.
 * Updates lastLogin, persists to "moto1_session", refreshes sidebar profile, and checks page access.
 * @param {string} userId - Target account ID.
 */
function switchAccount(userId) {
  const users = loadUsers();
  const target = users.find((u) => u.id === userId);
  if (!target || target.active === false) return;

  target.lastLogin = nowLocalTimestamp();
  saveUsers(users);

  saveSession({
    userId: target.id,
    role: target.role,
    at: Date.now()
  });

  closeAccountSwitcher();
  syncViewForRole();
}

/**
 * Backward-compatible role switcher helper.
 * @param {string} newRole - Target role key.
 */
function switchRole(newRole) {
  const s = getSession();
  if (!s) return;
  s.role = newRole;
  saveSession(s);
  syncViewForRole();
}

/** Active index in the filtered accounts dropdown for keyboard navigation (-1 = no highlight). */
let loginHighlightIndex = -1;

/** Currently filtered user records displayed in the login dropdown. */
let loginFilteredUsers = [];

/**
 * Opens the login accounts dropdown and populates it.
 */
function openLoginDropdown() {
  const dd = $("login-dropdown");
  const inp = $("login-email");
  if (!dd) return;
  dd.style.display = "block";
  if (inp) inp.setAttribute("aria-expanded", "true");
  renderLoginDropdown(inp ? inp.value : "");
}

/**
 * Closes the login accounts dropdown.
 */
function closeLoginDropdown() {
  const dd = $("login-dropdown");
  const inp = $("login-email");
  if (dd) dd.style.display = "none";
  if (inp) {
    inp.setAttribute("aria-expanded", "false");
    inp.removeAttribute("aria-activedescendant");
  }
  loginHighlightIndex = -1;
}

/**
 * Renders the saved accounts dropdown list based on typed filter text.
 * @param {string} filterText - Current text in the email input.
 */
function renderLoginDropdown(filterText = "") {
  const dd = $("login-dropdown");
  if (!dd) return;

  const q = (filterText || "").trim().toLowerCase();
  const users = loadUsers().filter((u) => u.active !== false);

  const filtered = users.filter((u) => {
    if (!q) return true;
    const email = (u.email || "").toLowerCase();
    const name = (u.name || "").toLowerCase();
    const roleLabel = (ROLES[u.role]?.label || u.role || "").toLowerCase();
    const label = getUserRoleLabel(u).toLowerCase();
    return email.includes(q) || name.includes(q) || roleLabel.includes(q) || label.includes(q);
  });

  loginFilteredUsers = filtered;

  if (loginHighlightIndex >= filtered.length) {
    loginHighlightIndex = filtered.length - 1;
  }

  let html = `<div class="login-dd-header">SAVED ACCOUNTS</div>`;

  if (!filtered.length) {
    html += `<div class="login-dd-empty">No saved account matches. Press Sign in to try this email.</div>`;
  } else {
    html += filtered
      .map((u, idx) => {
        const isHighlighted = idx === loginHighlightIndex;
        const roleMeta = ROLES[u.role] || { label: u.role };
        return `
          <div
            id="login-opt-${idx}"
            class="login-dd-item ${isHighlighted ? "highlighted" : ""}"
            role="option"
            aria-selected="${isHighlighted ? "true" : "false"}"
            tabindex="-1"
            onmousedown="selectLoginUser('${u.id}')"
            onclick="selectLoginUser('${u.id}')"
          >
            <div class="role-tile ${u.role}">
              ${getRoleIconSvg(u.role)}
            </div>
            <div class="login-dd-info">
              <span class="login-dd-email"><b>${escHtml(u.email)}</b></span>
              <span class="login-dd-role">${escHtml(getUserRoleLabel(u))}</span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  dd.innerHTML = html;
}

/**
 * Scrolls the currently highlighted dropdown item into view and updates ARIA active descendant.
 */
function scrollLoginHighlight() {
  if (loginHighlightIndex < 0) return;
  const opt = $(`login-opt-${loginHighlightIndex}`);
  if (opt && opt.scrollIntoView) {
    opt.scrollIntoView({ block: "nearest" });
  }
  const inp = $("login-email");
  if (inp) {
    inp.setAttribute("aria-activedescendant", `login-opt-${loginHighlightIndex}`);
  }
}

/**
 * Handles live input in the email field.
 * @param {string} val - Input value.
 */
function onLoginEmailInput(val) {
  const errEl = $("login-err");
  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }
  loginHighlightIndex = -1;
  openLoginDropdown();
  renderLoginDropdown(val);
}

/**
 * Handles keyboard events on the email input for navigation and submission.
 * @param {KeyboardEvent} e - Keyboard event.
 */
function onLoginEmailKeydown(e) {
  const dd = $("login-dropdown");
  const isOpen = dd && dd.style.display !== "none";

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!isOpen) {
      openLoginDropdown();
      return;
    }
    if (loginFilteredUsers.length > 0) {
      loginHighlightIndex = (loginHighlightIndex + 1) % loginFilteredUsers.length;
      renderLoginDropdown($("login-email")?.value || "");
      scrollLoginHighlight();
    }
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!isOpen) {
      openLoginDropdown();
      return;
    }
    if (loginFilteredUsers.length > 0) {
      loginHighlightIndex = (loginHighlightIndex - 1 + loginFilteredUsers.length) % loginFilteredUsers.length;
      renderLoginDropdown($("login-email")?.value || "");
      scrollLoginHighlight();
    }
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    if (isOpen && loginHighlightIndex >= 0 && loginHighlightIndex < loginFilteredUsers.length) {
      selectLoginUser(loginFilteredUsers[loginHighlightIndex].id);
    } else {
      login();
    }
    return;
  }

  if (e.key === "Escape") {
    closeLoginDropdown();
    return;
  }

  if (e.key === "Tab") {
    closeLoginDropdown();
    return;
  }
}

/**
 * Immediately logs in as the selected user account without password prompt.
 * Opens Dashboard directly.
 * @param {string} userId - User ID to sign in.
 */
function selectLoginUser(userId) {
  const users = loadUsers();
  const matched = users.find((u) => u.id === userId);
  if (!matched) return;

  const errEl = $("login-err");
  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }

  closeLoginDropdown();

  saveSession({
    userId: matched.id,
    role: matched.role,
    at: Date.now()
  });

  document.body.classList.remove("logged-out");
  document.body.classList.add("logged-in");

  syncViewForRole();
}

/**
 * Signs in using the email typed into the input field.
 * Validates against saved accounts by email (case-insensitive).
 */
function login() {
  const emailEl = $("login-email");
  const errEl = $("login-err");
  const typed = (emailEl ? emailEl.value : "").trim();

  if (!typed) {
    if (errEl) {
      errEl.textContent = "Choose or type an email.";
      errEl.style.display = "block";
    }
    return;
  }

  const users = loadUsers();
  const matched = users.find(
    (u) => (u.email || "").trim().toLowerCase() === typed.toLowerCase()
  );

  if (!matched) {
    if (errEl) {
      errEl.textContent = "No account found for that email.";
      errEl.style.display = "block";
    }
    return;
  }

  if (matched.active === false) {
    if (errEl) {
      errEl.textContent = "This account is deactivated.";
      errEl.style.display = "block";
    }
    return;
  }

  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }

  closeLoginDropdown();

  matched.lastLogin = nowLocalTimestamp();
  saveUsers(users);

  saveSession({
    userId: matched.id,
    role: matched.role,
    at: Date.now()
  });

  document.body.classList.remove("logged-out");
  document.body.classList.add("logged-in");

  syncViewForRole();
}

/**
 * Logs out the current user, clears the active session, and shows the login screen.
 */
function logout() {
  clearSession();
  view = "dash";
  hisSearch = "";
  hisDate = "all";
  hisMech = "all";
  hisFrom = "";
  hisTo = "";
  repSearch = "";
  repFilter = "all";
  repScope = "all";
  if (typeof resetInspDraft === "function") {
    resetInspDraft();
  }
  if (typeof resetPosState === "function") {
    resetPosState();
  }

  document.body.classList.remove("logged-in");
  document.body.classList.add("logged-out");

  closeAccountSwitcher();

  const emailEl = $("login-email");
  const errEl = $("login-err");

  if (emailEl) emailEl.value = "";
  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }

  if (emailEl) {
    emailEl.focus();
    openLoginDropdown();
  }
}

/**
 * Renders a placeholder card in the main area when the active role has no accessible pages.
 * @returns {string} HTML string.
 */
function renderNoAccess() {
  const u = getCurrentUser();
  const name = u ? u.name : "User";
  const roleLabel = u && ROLES[u.activeRole] ? ROLES[u.activeRole].label : "Workspace";
  return `<div class="card no-access-card"><div style="font-size:36px;margin-bottom:12px">🔒</div><h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:var(--text-primary)">Welcome, ${name}</h1><p style="margin:0;font-size:14px;color:var(--text-muted);line-height:1.5">Your ${roleLabel} workspace isn't set up yet. Navigation for this role will be added soon.</p></div>`;
}

/**
 * Synchronizes view and navigation with the active role permissions.
 * Switches to the first allowed page or displays the placeholder if none are accessible.
 */
function syncViewForRole() {
  const u = getCurrentUser();
  if (!u) {
    document.body.classList.remove("logged-in");
    document.body.classList.add("logged-out");
    closeAccountSwitcher();
    const emailEl = $("login-email");
    if (emailEl) openLoginDropdown();
    return;
  }

  renderSidebarUser();
  renderNav();

  const allowed = getRoleNav(u.activeRole);
  if (allowed.length > 0) {
    if (!allowed.includes(view)) {
      if (u.activeRole === "superadmin" && allowed.includes("reports")) {
        go("reports");
      } else {
        go(allowed[0]);
      }
    } else {
      go(view);
    }
  } else {
    view = "";
    $("main").innerHTML = renderNoAccess();
  }
}

// Global click-outside listener to close dropdowns
document.addEventListener("click", (e) => {
  const loginWrap = document.querySelector(".login-input-wrap");
  const loginInp = $("login-email");
  const loginDd = $("login-dropdown");

  const clickedInsideLogin =
    (loginWrap && loginWrap.contains(e.target)) ||
    (loginInp && loginInp.contains(e.target)) ||
    (loginDd && loginDd.contains(e.target));

  if (!clickedInsideLogin) {
    closeLoginDropdown();
  }

  const switcher = $("sidebar-account-switcher");
  if (switcher && !switcher.contains(e.target)) {
    closeAccountSwitcher();
  }

  // Close item suggestion dropdowns when clicking outside
  if (!e.target.closest || !e.target.closest(".item-input-group.name-group")) {
    document.querySelectorAll(".item-suggestions-dropdown").forEach((el) => {
      el.style.display = "none";
    });
  }
});

// Global Escape listener to close popups
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAccountSwitcher();
  }
});


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
 * If o.items exists, lines come from items (kind 'labor' and 'part') plus o.extra.
 * Line items with src 'own' have price 0 and amount 0 with label "Customer's own part".
 * Otherwise, legacy service package logic applies for orders with sv.
 * @param {Object} o - Work order object.
 * @returns {Array<{n: string, a: number, kind: string, qty?: number, price?: number, rawName?: string, src?: string}>} Array of line items.
 */
function lines(o) {
  if (!o) return [];
  const L = [];

  // 1. Recommended Services & Items from Inspection / Job Order
  if (Array.isArray(o.items) && o.items.length) {
    o.items.forEach((item) => {
      const qty = Math.max(1, Number(item.qty) || 1);
      const isOwn = item.src === "own";
      const price = isOwn ? 0 : Math.max(0, Number(item.price) || 0);
      const isLabor = item.kind === "labor";
      let label = item.name + (qty > 1 ? ` (×${qty})` : "");
      if (isOwn) {
        label += " (Customer's own part)";
      } else if (isLabor) {
        label += " (labor)";
      }
      L.push({
        n: label,
        a: isOwn ? 0 : (qty * price),
        kind: isLabor ? "labor" : "part",
        qty: qty,
        price: price,
        rawName: item.name,
        src: item.src || "shop",
        done: !!item.done
      });
    });
  }

  // 2. Extra Items / Fluids Logged during In Repair Stage
  if (Array.isArray(o.extra) && o.extra.length) {
    o.extra.forEach((item) => {
      const qty = Math.max(1, Number(item.qty) || 1);
      const isOwn = item.src === "own";
      const price = isOwn ? 0 : Math.max(0, Number(item.price) || 0);
      const isLabor = item.kind === "labor";
      let label = item.name + (qty > 1 ? ` (×${qty})` : "");
      if (isOwn) {
        label += " (Customer's own part)";
      } else if (isLabor) {
        label += " (labor)";
      } else {
        label += " (extra part)";
      }
      L.push({
        n: label,
        a: isOwn ? 0 : (qty * price),
        kind: isLabor ? "labor" : "part",
        qty: qty,
        price: price,
        rawName: item.name,
        src: item.src || "shop",
        done: !!item.done
      });
    });
  }

  // 3. Legacy Service Package logic for work orders with sv
  if (Array.isArray(o.sv) && o.sv.length) {
    o.sv.forEach((id) => {
      const s = g("sv", id);
      if (s) {
        L.push({
          n: s.name + " (labor)",
          a: s.labor || 0,
          kind: "labor",
          rawName: s.name,
          src: "shop"
        });
        (s.parts || []).forEach((p) => {
          const x = g("pt", p);
          if (x) {
            L.push({
              n: x.name,
              a: x.cost || 0,
              kind: "part",
              rawName: x.name,
              src: "shop"
            });
          }
        });
      }
    });
  }

  return L;
}

/**
 * Calculates financial breakdown for a work order: labor, parts, discount, and net total.
 * @param {Object} o - Work order object.
 * @returns {{labor: number, parts: number, discount: number, total: number}}
 */
function getOrderTotals(o) {
  if (!o) return { labor: 0, parts: 0, discount: 0, total: 0 };
  const all = lines(o);
  let labor = 0;
  let parts = 0;
  all.forEach((l) => {
    if (l.kind === "part") parts += (l.a || 0);
    else labor += (l.a || 0);
  });
  const subtotal = labor + parts;
  const discount = Math.min(subtotal, Math.max(0, Number(o.discount) || 0));
  const tot = Math.max(0, subtotal - discount);
  return { labor, parts, discount, total: tot };
}

/**
 * Calculates the grand net total amount for a work order or service package,
 * including any discounts applied.
 * @param {Object} o - Work order object.
 * @returns {number} Net total amount in PHP.
 */
const total = (o) => getOrderTotals(o).total;

/**
 * Escapes user-typed text before inserting into HTML strings to prevent markup breaking.
 * @param {string} str - String to escape.
 * @returns {string} Escaped HTML-safe string.
 */
function escHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Formats a short readable job number (e.g. "JO-0001") based on creation order in D.wo.
 * @param {Object} o - Work order object.
 * @returns {string} Formatted job number string.
 */
function getJobNumber(o) {
  if (!o) return "JO-0000";
  const idx = D.wo.findIndex((x) => x.id === o.id);
  const num = idx >= 0 ? idx + 1 : D.wo.length + 1;
  return "JO-" + String(num).padStart(4, "0");
}


/* ==========================================================
   6. UI COMPONENTS
   ========================================================== */

/**
 * Builds an HTML status badge for a work order status.
 * Displays "READY FOR BILLING" in the UI for "Ready for Pickup" status.
 * @param {string} s - Status string.
 * @returns {string} HTML span element string.
 */
const badge = (s) => {
  const label = s === "Ready for Pickup" ? "READY FOR BILLING" : (s || "").toUpperCase();
  return `<span class="bd ${cls(s)}">${escHtml(label)}</span>`;
};

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
    const svcText = (o.sv && o.sv.length)
      ? o.sv.map((i) => (g("sv", i) ? g("sv", i).name : i)).join(", ")
      : (o.items && o.items.length)
        ? o.items.filter((i) => i.kind === "labor").map((i) => i.name).join(", ") || (o.items[0] ? o.items[0].name : "—")
        : (o.complaints && o.complaints.length)
          ? o.complaints.join(", ")
          : "—";

    const u = getCurrentUser();
    const isMech = u && u.activeRole === "mechanic";
    const isUnassigned = !o.mech || o.mech.trim() === "" || o.mech.trim().toLowerCase() === "unassigned";
    const mechCell = isMech && isUnassigned
      ? `<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span>Unassigned</span><button type="button" class="btn-take-job" onclick="takeJob('${o.id}')">Take this job</button></div>`
      : escHtml(o.mech || "Unassigned");

    return `<tr><td><b>${b ? escHtml(b.plate) : "NO PLATE"}</b>${
      full ? `<br><small style="color:var(--mu)">${b ? escHtml(b.make + " " + b.model) : "Unknown"}</small>` : ""
    }</td><td>${badge(o.st)}</td><td>${mechCell}</td>${
      full ? `<td>${svcText}</td><td class="r">${P(total(o))}</td>` : ""
    }<td class="r"><button class="btn g sm" onclick="openInspModal('${o.id}')">Job card</button></td></tr>`;
  }).join("")}</table></div>`;
}

/**
 * Assigns an unassigned work order to the currently logged-in mechanic.
 * Persists change to localStorage and updates relevant UI components without a page reload.
 * @param {string} woId - Work order ID.
 */
function takeJob(woId) {
  const u = getCurrentUser();
  if (!u || u.activeRole !== "mechanic") return;
  const o = g("wo", woId);
  if (!o) return;

  o.mech = u.name;
  save();

  if (inspActiveWoId === woId) {
    renderInspModal(woId);
  }

  if (view === "rep") {
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
  } else if (view === "dash") {
    $("main").innerHTML = R.dash();
  }
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
  ["insp", "🔍", "Motorcycle Inspection"],
  ["rep", "🔧", "Active Repairs"],
  ["pos", "⚡", "Quick Sales"],
  ["cat", "📦", "Service & Parts Catalog"],
  ["bill", "💳", "Transactions & Billing"],
  ["his", "🕘", "Service History"],
  ["reports", "📊", "Reports & Monitoring"],
  ["users", "🛡️", "User Management"]
];

/** Route keys placed under the PRIMARY NAVIGATION section. */
const PRIMARY_NAV_KEYS = ["dash", "cust", "insp", "rep", "pos", "cat", "bill", "his"];

/** Route keys placed under the ADMINISTRATION & SUPPORT section. */
const ADMIN_NAV_KEYS = ["reports", "users"];

/** Currently active view key. */
let view = "dash";

/** Currently selected motorcycle ID if navigated from Customers view. */
let hisBike = null;

/** Active search query string for Active Repairs page. */
let repSearch = "";

/** Active status filter for Active Repairs page ("all" or status string). */
let repFilter = "all";

/** Active scope filter on Active Repairs page for Mechanic role ("all" or "my"). */
let repScope = "all";

/** Active search query string in Transactions & Billing table. */
let billSearch = "";

/** Active filter chip on Transactions & Billing page ("all", "advances", "final", "completed"). */
let billFilter = "all";

/** Currently opened work order ID in the Advance Payment modal. */
let advActiveWoId = null;

/** Selected payment method in Advance Payment modal ("Cash", "GCash", "Maya"). */
let advPayMethod = "Cash";

/** Currently opened work order ID in the Settle Balance modal. */
let settleActiveWoId = null;

/** Selected payment method in Settle Balance modal ("Cash", "GCash", "Maya"). */
let settlePayMethod = "Cash";

/** Currently opened work order ID in the inspection modal (null = new intake draft). */
let inspActiveWoId = null;

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
 * Renders the primary and administration navigation lists based on permissions of the active role.
 * Shows each section label only when at least one of its routes is accessible.
 */
function renderNav() {
  const primaryAllowed = V.filter((x) => PRIMARY_NAV_KEYS.includes(x[0]) && canOpen(x[0]));
  const adminAllowed = V.filter((x) => ADMIN_NAV_KEYS.includes(x[0]) && canOpen(x[0]));

  const navEl = $("nav");
  const navLabelEl = $("nav-label");
  const adminNavEl = $("admin-nav");
  const adminNavLabelEl = $("admin-nav-label");

  // 1. PRIMARY NAVIGATION section
  if (!primaryAllowed.length) {
    if (navLabelEl) navLabelEl.style.display = "none";
    if (navEl) {
      navEl.innerHTML = "";
      navEl.style.display = "none";
    }
  } else {
    if (navLabelEl) navLabelEl.style.display = "";
    if (navEl) {
      navEl.style.display = "";
      navEl.innerHTML = primaryAllowed
        .map(
          (x) =>
            `<button class="${x[0] == view ? "on" : ""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`
        )
        .join("");
    }
  }

  // 2. ADMINISTRATION & SUPPORT section
  if (!adminAllowed.length) {
    if (adminNavLabelEl) adminNavLabelEl.style.display = "none";
    if (adminNavEl) {
      adminNavEl.innerHTML = "";
      adminNavEl.style.display = "none";
    }
  } else {
    if (adminNavLabelEl) adminNavLabelEl.style.display = "";
    if (adminNavEl) {
      adminNavEl.style.display = "";
      adminNavEl.innerHTML = adminAllowed
        .map(
          (x) =>
            `<button class="${x[0] == view ? "on" : ""}" onclick="go('${x[0]}')"><span>${x[1]}</span>${x[2]}</button>`
        )
        .join("");
    }
  }
}

/**
 * Navigates to a view, updates sidebar active states, and renders the view content.
 * Resets search and filter state when navigating to another view (preserves hisBike for his view).
 * @param {string} v - Target view key ("dash", "cust", "insp", "rep", "cat", "his", "reports", "users").
 */
function go(v) {
  if (!canOpen(v)) return;
  if (view !== v) {
    userMgmtTab = "directory";
    userSearch = "";
    userRoleFilter = "all";
    userStatusFilter = "all";
    repSearch = "";
    repFilter = "all";
    repScope = "all";
    billSearch = "";
    billFilter = "all";
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
  renderNav();
  $("main").innerHTML = R[v]();
  if (v === "insp" && inspDraftStep === 2) {
    autoGrowTextarea($("insp-diag-findings"));
  }
}


/* ==========================================================
   8. VIEWS
   ========================================================== */

/**
 * Filter chip definitions for the Active Repairs view.
 * Ordered: All Active, Awaiting Parts/Approval, In Progress, Checking, Ready for Billing.
 */
const REP_CHIPS = [
  { id: "all", label: "All Active", status: "all", cls: "chip-all" },
  { id: "awaiting", label: "Awaiting Parts/Approval", status: "Awaiting Parts/Approval", cls: "chip-awaiting" },
  { id: "in", label: "In Progress", status: "In Progress", cls: "chip-in" },
  { id: "checking", label: "Checking", status: "Checking", cls: "chip-checking" },
  { id: "ready", label: "Ready for Billing", status: "Ready for Pickup", cls: "chip-ready" }
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
  const u = getCurrentUser();
  const isMech = u && u.activeRole === "mechanic";
  const mechName = u ? (u.name || "").trim().toLowerCase() : "";

  return base.filter((o) => {
    // Mechanic scope filter ("My Jobs")
    if (isMech && repScope === "my") {
      const oMech = (o.mech || "").trim().toLowerCase();
      if (!oMech || oMech !== mechName) {
        return false;
      }
    }

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

/**
 * Sets the active repair scope filter for the Mechanic role ("all" or "my").
 * Updates active pill styling and refreshes the chips and results table.
 * @param {"all"|"my"} scope
 */
function setRepScope(scope) {
  repScope = scope;
  const segEl = $("rep-scope-seg");
  if (segEl) {
    const btns = segEl.querySelectorAll(".obd-seg-btn");
    btns.forEach((btn) => {
      const isMy = btn.getAttribute("data-scope") === "my";
      const active = (scope === "my" && isMy) || (scope === "all" && !isMy);
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }
  const chipsEl = $("rep-chips");
  if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  const resEl = $("rep-results");
  if (resEl) resEl.innerHTML = getRepResultsHtml();
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
  const users = loadUsers();
  users.filter((u) => u.role === "mechanic" && u.active !== false).forEach((u) => {
    if (u.name && u.name.trim()) set.add(u.name.trim());
  });
  D.wo.forEach((o) => {
    if (o.mech && o.mech.trim() && o.mech.trim().toLowerCase() !== "unassigned") {
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
    const jo = getJobNumber(o).toLowerCase();

    return (
      plate.includes(q) ||
      customer.includes(q) ||
      phone.includes(q) ||
      model.includes(q) ||
      jobId.includes(q) ||
      jo.includes(q) ||
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
          const svcList = (o.sv && o.sv.length)
            ? o.sv.map((id) => (g("sv", id) ? g("sv", id).name : id))
            : (o.items && o.items.length)
              ? o.items.filter((i) => i.kind === "labor").map((i) => i.name)
              : (o.complaints && o.complaints.length)
                ? o.complaints
                : [];
          const svcNames = svcList.join(", ") || (o.findings ? "Inspection Diagnosis" : "—");
          const truncSvcNames = svcNames.length > 45 ? svcNames.slice(0, 42) + "..." : svcNames;
          const displayNote = o.note || o.notes || o.findings || "—";

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
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(displayNote)}</div>
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
 * Renders the dedicated Mechanic Dashboard view.
 * Features greeting, 4 mechanic KPI cards, My Job Queue, and Unassigned Jobs tables.
 * Excludes revenue, pending settlement, and links to inaccessible pages.
 * @returns {string} HTML string.
 */
function dashMechanic() {
  const u = getCurrentUser();
  const mechName = u ? (u.name || "").trim() : "";
  const isMyJob = (o) => {
    return Boolean(o.mech && o.mech.trim().toLowerCase() === mechName.toLowerCase());
  };
  const isUnassigned = (o) => {
    return !o.mech || o.mech.trim() === "" || o.mech.trim().toLowerCase() === "unassigned";
  };

  // 1. MY ACTIVE JOBS: assigned to this mechanic with status "In Progress" or "Checking"
  const myActiveJobs = D.wo.filter((o) => isMyJob(o) && (o.st === "In Progress" || o.st === "Checking"));

  // 2. UNASSIGNED JOBS: empty wo.mech, not Completed, not Ready for Pickup
  const unassignedJobs = D.wo.filter((o) => isUnassigned(o) && o.st !== "Completed" && o.st !== "Ready for Pickup");

  // 3. AWAITING PARTS: all jobs with status "Awaiting Parts/Approval"
  const awaitingPartsJobs = D.wo.filter((o) => o.st === "Awaiting Parts/Approval");

  // 4. DONE TODAY: jobs this mechanic sent to Ready for Pickup or Completed today
  const todayStr = today();
  const doneTodayJobs = D.wo.filter((o) => {
    if (!isMyJob(o)) return false;
    const isReadyOrDone = o.st === "Ready for Pickup" || o.st === "Completed";
    if (!isReadyOrDone) return false;
    const dateMatch = (o.readyAt && o.readyAt.slice(0, 10) === todayStr) ||
                      (o.done && o.done.slice(0, 10) === todayStr) ||
                      (o.at && o.at === todayStr && o.st === "Ready for Pickup");
    return Boolean(dateMatch);
  });

  const d = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const stat = (i, bg, l, n, t) =>
    `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${Number(n) || 0}</b>${t}</div></div>`;

  // My Job Queue: open jobs assigned to this mechanic (not Completed, not Ready for Pickup)
  const myQueueJobs = D.wo.filter((o) => isMyJob(o) && o.st !== "Completed" && o.st !== "Ready for Pickup");

  // Up to 5 unassigned jobs, newest first
  const unassignedRecent = [...unassignedJobs].reverse().slice(0, 5);

  const renderComplaintChips = (o) => {
    const list = Array.isArray(o.complaints) ? o.complaints.filter(Boolean) : [];
    if (!list.length) return "—";
    return list.slice(0, 2).map((c) =>
      `<span class="badge" style="background:#F1F5F9;color:#475569;font-size:11px;padding:2px 8px;border-radius:12px;margin-right:4px;display:inline-block">${escHtml(c)}</span>`
    ).join("");
  };

  const renderRow = (o, showTakeBtn) => {
    const b = bike(o.bid);
    const jo = getJobNumber(o);
    const plate = b ? b.plate : "NO PLATE";
    const bikeDesc = b ? `${b.make || ""} ${b.model || ""}`.trim() : "Unknown";

    return `
      <tr>
        <td><b>${escHtml(jo)}</b></td>
        <td>
          <b>${escHtml(plate)}</b>
          <br><small style="color:var(--text-muted)">${escHtml(bikeDesc)}</small>
        </td>
        <td>${badge(o.st)}</td>
        <td>${renderComplaintChips(o)}</td>
        <td class="r" style="white-space:nowrap">
          ${showTakeBtn ? `<button type="button" class="btn-take-job" style="margin-right:6px" onclick="takeJob('${o.id}')">Take this job</button>` : ""}
          <button type="button" class="btn g sm" onclick="openInspModal('${o.id}')">Job card</button>
        </td>
      </tr>
    `;
  };

  return `
    <div class="card top">
      <div>
        <h1>Welcome back, ${escHtml(mechName || "Mechanic")} 👋</h1>
        <p>Mechanic | ${d}</p>
      </div>
      <span class="pill">● Saved on this device</span>
    </div>

    <div class="stats">
      ${stat("🔧", "#DBEAFE", "MY ACTIVE JOBS", myActiveJobs.length, "Assigned to you")}
      ${stat("⏳", "#FFEDD5", "UNASSIGNED JOBS", unassignedJobs.length, "Waiting to be taken")}
      ${stat("📦", "#F3E8FF", "AWAITING PARTS", awaitingPartsJobs.length, "Waiting for parts or approval")}
      ${stat("✅", "#D1FAE5", "DONE TODAY", doneTodayJobs.length, "Finished by you")}
    </div>

    <div style="display:flex;flex-direction:column;gap:20px">
      <!-- My Job Queue Card -->
      <div class="card">
        <div class="hd" style="display:flex;justify-content:space-between;align-items:center">
          <span>🔧 My Job Queue</span>
          <button type="button" class="btn g sm" onclick="go('rep')">View all</button>
        </div>
        ${myQueueJobs.length ? `
          <div class="tw">
            <table>
              <thead>
                <tr>
                  <th>JOB NO.</th>
                  <th>PLATE / MOTORCYCLE</th>
                  <th>STATUS</th>
                  <th>COMPLAINT</th>
                  <th class="r"></th>
                </tr>
              </thead>
              <tbody>
                ${myQueueJobs.map((o) => renderRow(o, false)).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No jobs assigned to you yet. Take one from Active Repairs.</div>
        `}
      </div>

      <!-- Unassigned Jobs Card -->
      <div class="card">
        <div class="hd">📋 Unassigned Jobs</div>
        ${unassignedRecent.length ? `
          <div class="tw">
            <table>
              <thead>
                <tr>
                  <th>JOB NO.</th>
                  <th>PLATE / MOTORCYCLE</th>
                  <th>STATUS</th>
                  <th>COMPLAINT</th>
                  <th class="r"></th>
                </tr>
              </thead>
              <tbody>
                ${unassignedRecent.map((o) => renderRow(o, true)).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No unassigned jobs.</div>
        `}
      </div>
    </div>
  `;
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
    const u = getCurrentUser();
    if (u && u.activeRole === "mechanic") {
      return dashMechanic();
    }

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

    const roleLabel = u ? (ROLES[u.activeRole]?.label || u.activeRole) : "Admin";

    return `<div class="card top"><div><h1>Welcome back 👋</h1><p>${roleLabel} | ${d}</p></div><span class="pill">● Saved on this device</span></div>
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
   * Motorcycle Inspection view: shows accounting summary, stage filter pills, live search, and active job order board.
   * @returns {string} HTML string.
   */
  insp() {
    return getInspViewHtml();
  },

  /**
   * Active Repairs view: shows search bar, status filter chips, and live results list.
   * @returns {string} HTML string.
   */
  rep() {
    const u = getCurrentUser();
    const isMech = u && u.activeRole === "mechanic";

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
${isMech ? `
  <div class="rep-scope-wrap" style="margin-bottom:12px">
    <div class="obd-seg-track" id="rep-scope-seg" role="tablist" aria-label="Job Filter Scope" style="max-width:320px">
      <button
        type="button"
        role="tab"
        aria-selected="${repScope === "all" ? "true" : "false"}"
        data-scope="all"
        class="obd-seg-btn ${repScope === "all" ? "active" : ""}"
        onclick="setRepScope('all')"
      >
        All Jobs
      </button>
      <button
        type="button"
        role="tab"
        aria-selected="${repScope === "my" ? "true" : "false"}"
        data-scope="my"
        class="obd-seg-btn ${repScope === "my" ? "active" : ""}"
        onclick="setRepScope('my')"
      >
        My Jobs
      </button>
    </div>
  </div>
` : ""}
<div id="rep-chips" class="rep-chips">${getRepChipsHtml()}</div>
<div id="rep-results" class="card">${getRepResultsHtml()}</div>`;
  },

  /**
   * Quick Sales view: fast checkout for labor and parts catalog items.
   * @returns {string} HTML string.
   */
  pos() {
    return getPosViewHtml();
  },

  /**
   * Service & Parts Catalog view: Quick-Select Price Menu.
   * Displays labor services and parts in one unified price menu with live search.
   * @returns {string} HTML string.
   */
  cat() {
    return `
      <div class="card top">
        <div>
          <h1>Service &amp; Parts Catalog</h1>
          <p>Quick-select price menu used when recording services and items.</p>
        </div>
        <div>
          <button type="button" class="btn" onclick="openAddCatalogModal()">+ Add Menu Item</button>
        </div>
      </div>

      <div class="card" style="padding:12px 16px;margin-bottom:16px">
        <input
          id="cat-search-input"
          type="text"
          placeholder="Search price menu items by name..."
          value="${escHtml(catSearch)}"
          oninput="onCatSearch(this.value)"
          style="height:42px;font-size:14px;width:100%"
        />
      </div>

      <div class="card" id="cat-table-wrap">
        ${getCatTableHtml()}
      </div>
    `;
  },

  /**
   * Transactions & Billing view: shows billing records, advance payments, and invoice settlements.
   * @returns {string} HTML string.
   */
  bill() {
    return getBillViewHtml();
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
  },

  /**
   * Reports & Monitoring view: shop performance, KPIs, and status analytics.
   * Accessible to Admin and Super Admin roles.
   * @returns {string} HTML string.
   */
  reports() {
    return getReportsViewHtml();
  },

  /**
   * User Management view: employee directory, account credentials, and permissions matrix.
   * Accessible exclusively to Super Admin.
   * @returns {string} HTML string.
   */
  users() {
    return getUsersViewHtml();
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
    const mech = o.mech || "Unassigned";
    const svcsList = (o.sv && o.sv.length)
      ? o.sv.map((id) => (g("sv", id) ? g("sv", id).name : id))
      : (o.items && o.items.length)
        ? o.items.filter((i) => i.kind === "labor").map((i) => i.name)
        : (o.complaints && o.complaints.length)
          ? o.complaints
          : [];
    const svcs = svcsList.join("; ") || (o.findings ? "Inspection" : "");
    const note = o.note || o.notes || o.findings || "";
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

  // Inspection findings: treat unmarked items as OK, list Fix items first, then Watch items
  const recInsp = o.inspection || {};
  const recInspItems = recInsp.items || {};
  const recFixList = [];
  const recWatchList = [];
  let recWatchCount = 0;
  let recFixCount = 0;
  if (recInsp.enablePhysical !== false && Object.keys(recInspItems).length > 0) {
    INSPECTION_CHECKLIST.forEach((cat) => {
      cat.items.forEach((item) => {
        const stateObj = recInspItems[`${cat.key}.${item.key}`];
        if (stateObj) {
          if (stateObj.s === "fix") {
            recFixCount++;
            recFixList.push({ catName: cat.name, label: item.label, state: "fix", note: stateObj.note || "" });
          } else if (stateObj.s === "watch") {
            recWatchCount++;
            recWatchList.push({ catName: cat.name, label: item.label, state: "watch", note: stateObj.note || "" });
          }
        }
      });
    });
  }
  const recWatchFixList = [...recFixList, ...recWatchList];
  const recOkCount = Math.max(0, 27 - (recWatchCount + recFixCount));
  const recObdCodes = (recInsp.obd && Array.isArray(recInsp.obd.codes)) ? recInsp.obd.codes : [];

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

    ${(o.note || o.notes || o.findings || (o.complaints && o.complaints.length ? o.complaints.join(", ") : "")) ? `<div class="rec-note-box"><b>Notes / Diagnosis:</b> ${escHtml(o.note || o.notes || o.findings || o.complaints.join(", "))}</div>` : ""}

    ${(recInsp.enablePhysical !== false || recWatchFixList.length > 0 || recObdCodes.length > 0) ? `
      <div class="rec-note-box" style="margin-top:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <b>Inspection Findings:</b>
          <span style="font-size:12px;color:var(--text-secondary)">OK: ${recOkCount}${recWatchCount > 0 ? ` · Watch: ${recWatchCount}` : ""} · Fix: ${recFixCount}</span>
        </div>
        ${recWatchFixList.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:4px;margin-top:4px">
            ${recWatchFixList.map((wf) => `
              <div style="font-size:12px;display:flex;align-items:baseline;gap:6px">
                <span class="fault-badge ${wf.state}">${wf.state.toUpperCase()}</span>
                <span><b>${escHtml(wf.label)}</b> <span style="font-size:11px;color:var(--text-muted)">(${escHtml(wf.catName)})</span>${wf.note ? ` — <i>${escHtml(wf.note)}</i>` : ""}</span>
              </div>
            `).join("")}
          </div>
        ` : `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">All inspected items OK.</div>`}
        ${recObdCodes.length > 0 ? `
          <div style="display:flex;flex-direction:column;gap:4px;margin-top:6px">
            ${recObdCodes.map((c) => {
              const label = c.part && !c.desc.startsWith(c.part) ? `${c.part}: ${c.desc}` : (c.desc || "");
              return `
                <div style="font-size:12px;display:flex;align-items:baseline;gap:6px">
                  <span style="display:inline-block;padding:1px 5px;border-radius:4px;background:#FEE2E2;color:#B91C1C;font-weight:700;font-size:11px">${escHtml(c.code)}</span>
                  <span>· ${escHtml(label)}</span>
                </div>
              `;
            }).join("")}
          </div>
        ` : ""}
      </div>
    ` : ""}

    <table class="rec-bill-table">
      <thead>
        <tr>
          <th>ITEM / SERVICE</th>
          <th class="r">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${lines(o).map((l) => `<tr><td>${escHtml(l.n)}</td><td class="r">${P(l.a)}</td></tr>`).join("")}
        ${o.discount ? `<tr><td style="color:#DC2626">Discount / Adjustment</td><td class="r" style="color:#DC2626">-${P(o.discount)}</td></tr>` : ""}
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
        const wSvcList = (w.sv && w.sv.length)
          ? w.sv.map((id) => (g("sv", id) ? g("sv", id).name : id))
          : (w.items && w.items.length)
            ? w.items.filter((i) => i.kind === "labor").map((i) => i.name)
            : (w.complaints && w.complaints.length)
              ? w.complaints
              : [];
        const wSvcs = wSvcList.join(", ") || (w.findings ? "Inspection" : "—");
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
              <div><b>Mechanic:</b> ${w.mech || "Unassigned"}${w.odo ? ` · <b>Odometer:</b> ${w.odo.toLocaleString()} km` : ""}</div>
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

const inspOvEl = $("insp-ov");
if (inspOvEl) {
  inspOvEl.onclick = (e) => {
    if (e.target.id === "insp-ov") {
      closeInspModal();
    }
  };
}

const rcptOvEl = $("rcpt-ov");
if (rcptOvEl) {
  rcptOvEl.onclick = (e) => {
    if (e.target.id === "rcpt-ov") {
      closeReceipt();
    }
  };
}

const advOvEl = $("adv-ov");
if (advOvEl) {
  advOvEl.onclick = (e) => {
    if (e.target.id === "adv-ov") {
      closeAdvanceModal();
    }
  };
}

const settleOvEl = $("settle-ov");
if (settleOvEl) {
  settleOvEl.onclick = (e) => {
    if (e.target.id === "settle-ov") {
      closeSettleBalanceModal();
    }
  };
}

const posVoidOvEl = $("pos-void-ov");
if (posVoidOvEl) {
  posVoidOvEl.onclick = (e) => {
    if (e.target.id === "pos-void-ov") {
      closePosVoidModal();
    }
  };
}

/**
 * Closes modal when user presses the Escape key.
 */
document.onkeydown = (e) => {
  if (e.key == "Escape") {
    if ($("pos-void-ov") && $("pos-void-ov").classList.contains("on")) {
      closePosVoidModal();
      return;
    }
    if ($("rcpt-ov") && $("rcpt-ov").classList.contains("on")) {
      closeReceipt();
      return;
    }
    if ($("settle-ov") && $("settle-ov").classList.contains("on")) {
      closeSettleBalanceModal();
      return;
    }
    if ($("adv-ov") && $("adv-ov").classList.contains("on")) {
      closeAdvanceModal();
      return;
    }
    if ($("insp-ov") && $("insp-ov").classList.contains("on")) {
      closeInspModal();
      return;
    }
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
 <div class="row"><div><label>Mechanic</label><input id="wm" value="Hiyo"></div><div><label>Odometer in (km)</label><input id="wk" type="number"></div></div>
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
 * Delegates directly to the 5-stage job order modal (openInspModal) at the job's current stage.
 * @param {string} id - Work order ID.
 */
function mCard(id) {
  openInspModal(id);
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

let catSearch = "";
let catModalKind = "labor";

/**
 * Searches and returns catalog items formatted for table display or dropdowns.
 * Categorizes D.sv as "labor" and D.pt as "part".
 * @param {"labor"|"part"|"all"} [kindFilter="all"]
 * @returns {Array<{id: string, kind: "labor"|"part", type: "sv"|"pt", name: string, price: number, sku?: string}>}
 */
function getCatalogItems(kindFilter = "all") {
  const items = [];
  if (Array.isArray(D.sv)) {
    D.sv.forEach((s) => {
      items.push({
        id: s.id,
        kind: "labor",
        type: "sv",
        name: s.name || "Unnamed service",
        price: Number(s.labor) || 0
      });
    });
  }
  if (Array.isArray(D.pt)) {
    D.pt.forEach((p) => {
      items.push({
        id: p.id,
        kind: "part",
        type: "pt",
        name: p.name || "Unnamed part",
        price: Number(p.cost) || 0,
        sku: p.sku || ""
      });
    });
  }
  if (kindFilter === "all") return items;
  return items.filter((it) => it.kind === kindFilter);
}

/**
 * Returns HTML string for the unified catalog price menu table.
 * @returns {string}
 */
function getCatTableHtml() {
  const q = catSearch.trim().toLowerCase();
  const all = getCatalogItems("all");
  const filtered = q ? all.filter((it) => it.name.toLowerCase().includes(q)) : all;

  return `
    <div class="tw">
      <table>
        <thead>
          <tr>
            <th>ITEM / SERVICE NAME</th>
            <th>CATEGORY</th>
            <th class="r">DEFAULT REFERENCE PRICE</th>
            <th class="r" style="width:140px">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${
            !filtered.length
              ? `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px">No menu items found.</td></tr>`
              : filtered.map((it) => `
                <tr>
                  <td><b>${escHtml(it.name)}</b></td>
                  <td>
                    <span class="cat-badge ${it.kind}">
                      ${it.kind === "labor" ? "Labor / Service" : "Part / Fluid"}
                    </span>
                  </td>
                  <td class="r"><b>${P(it.price)}</b></td>
                  <td class="r" style="white-space:nowrap">
                    <button type="button" class="btn g sm" onclick="openEditCatalogModal('${it.type}', '${it.id}')">Edit</button>
                    <button type="button" class="btn d sm" style="margin-left:6px" onclick="deleteCatalogItem('${it.type}', '${it.id}')">Delete</button>
                  </td>
                </tr>
              `).join("")
          }
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Live search handler for Catalog view. Re-renders only table without losing input focus.
 * @param {string} val
 */
function onCatSearch(val) {
  catSearch = val;
  const wrap = $("cat-table-wrap");
  if (wrap) {
    wrap.innerHTML = getCatTableHtml();
  }
}

/**
 * Opens Add Menu Item modal.
 * @param {"labor"|"part"} [defaultKind="labor"]
 */
function openAddCatalogModal(defaultKind = "labor") {
  catModalKind = defaultKind;
  renderCatalogModal("add");
}

/**
 * Opens Edit Menu Item modal.
 * @param {"sv"|"pt"} type
 * @param {string} id
 */
function openEditCatalogModal(type, id) {
  renderCatalogModal("edit", type, id);
}

/**
 * Renders modal dialog for adding or editing a price menu item.
 * @param {"add"|"edit"} mode
 * @param {"sv"|"pt"} [type]
 * @param {string} [id]
 */
function renderCatalogModal(mode, type, id) {
  let item = null;
  if (mode === "edit") {
    if (type === "sv") {
      const s = g("sv", id);
      if (s) item = { id: s.id, type: "sv", kind: "labor", name: s.name, price: s.labor || 0 };
    } else if (type === "pt") {
      const p = g("pt", id);
      if (p) item = { id: p.id, type: "pt", kind: "part", name: p.name, price: p.cost || 0, sku: p.sku || "" };
    }
  }

  const kind = item ? item.kind : catModalKind;
  const name = item ? item.name : "";
  const price = item ? item.price : "";

  M(`
    <h2>${mode === "edit" ? "Edit Menu Item" : "Add Menu Item"}</h2>
    <div style="margin-bottom:14px">
      <label style="font-size:12px;font-weight:700;color:var(--text-secondary);display:block;margin-bottom:6px">Category</label>
      <div class="item-cat-toggle-wrap">
        <button
          type="button"
          class="item-cat-btn ${kind === 'labor' ? 'active' : ''}"
          onclick="catModalKind='labor';renderCatalogModal('${mode}'${item ? `,'${type}','${id}'` : ''})"
        >
          Labor / Service
        </button>
        <button
          type="button"
          class="item-cat-btn ${kind === 'part' ? 'active' : ''}"
          onclick="catModalKind='part';renderCatalogModal('${mode}'${item ? `,'${type}','${id}'` : ''})"
        >
          Part / Fluid
        </button>
      </div>
    </div>
    <label for="cat-modal-name">Item / Service Name</label>
    <input
      id="cat-modal-name"
      type="text"
      placeholder="${kind === 'labor' ? 'e.g. Change oil' : 'e.g. Engine oil 10W-40'}"
      value="${escHtml(name)}"
      style="height:42px;font-size:14px;margin-bottom:12px"
    />
    <label for="cat-modal-price">Default Reference Price (₱)</label>
    <input
      id="cat-modal-price"
      type="number"
      step="any"
      min="0"
      placeholder="0.00"
      value="${price !== '' ? price : ''}"
      style="height:42px;font-size:14px;margin-bottom:16px"
    />
    <div class="acts">
      <button type="button" class="btn g" onclick="fin()">Cancel</button>
      <button type="button" class="btn" onclick="saveCatalogModalItem('${mode}', '${type || ""}', '${id || ""}')">
        ${mode === "edit" ? "Save Changes" : "Add Item"}
      </button>
    </div>
  `);
}

/**
 * Saves a catalog item from the modal form.
 * @param {"add"|"edit"} mode
 * @param {"sv"|"pt"} type
 * @param {string} id
 */
function saveCatalogModalItem(mode, type, id) {
  const nameInp = $("cat-modal-name");
  const priceInp = $("cat-modal-price");

  const rawName = nameInp ? nameInp.value.trim() : "";
  const name = rawName || "Unnamed item";
  const price = priceInp ? Math.max(0, Number(priceInp.value) || 0) : 0;
  const targetKind = catModalKind;

  if (mode === "add") {
    if (targetKind === "labor") {
      if (!Array.isArray(D.sv)) D.sv = [];
      D.sv.push({ id: uid(), name, labor: price, parts: [] });
    } else {
      if (!Array.isArray(D.pt)) D.pt = [];
      D.pt.push({ id: uid(), sku: "", name, cost: price });
    }
  } else if (mode === "edit") {
    if (type === "sv" && targetKind === "labor") {
      const s = g("sv", id);
      if (s) { s.name = name; s.labor = price; }
    } else if (type === "pt" && targetKind === "part") {
      const p = g("pt", id);
      if (p) { p.name = name; p.cost = price; }
    } else if (type === "sv" && targetKind === "part") {
      D.sv = D.sv.filter((s) => s.id !== id);
      if (!Array.isArray(D.pt)) D.pt = [];
      D.pt.push({ id: uid(), sku: "", name, cost: price });
    } else if (type === "pt" && targetKind === "labor") {
      D.pt = D.pt.filter((p) => p.id !== id);
      if (!Array.isArray(D.sv)) D.sv = [];
      D.sv.push({ id: uid(), name, labor: price, parts: [] });
    }
  }

  save();
  fin();
  if (view === "cat") {
    const wrap = $("cat-table-wrap");
    if (wrap) wrap.innerHTML = getCatTableHtml();
  }
}

/**
 * Deletes a catalog item from D.sv or D.pt.
 * @param {"sv"|"pt"} type
 * @param {string} id
 */
function deleteCatalogItem(type, id) {
  if (type === "sv" && Array.isArray(D.sv)) {
    D.sv = D.sv.filter((s) => s.id !== id);
  } else if (type === "pt" && Array.isArray(D.pt)) {
    D.pt = D.pt.filter((p) => p.id !== id);
  }
  save();
  if (view === "cat") {
    const wrap = $("cat-table-wrap");
    if (wrap) wrap.innerHTML = getCatTableHtml();
  }
}

/** Legacy aliases for catalog modals */
function mPt() { openAddCatalogModal("part"); }
function mSv() { openAddCatalogModal("labor"); }


/* ==========================================================
   MOTORCYCLE INSPECTION (3-STEP JOB ORDER WORKFLOW)
   ========================================================== */

/**
 * Stage metadata for the 3-step motorcycle inspection lifecycle.
 */
const INSP_STAGES = [
  { id: 1, key: "intake", label: "Intake" },
  { id: 2, key: "diag", label: "Diagnosis" },
  { id: 3, key: "confirm", label: "Confirmation" }
];

/**
 * Supported motorcycle brands for ECU/OBD scanner fast-selection.
 */
const OBD_BRANDS = ["Yamaha", "Honda", "Rusi", "Kawasaki", "Motoposh"];

/**
 * Sample data from the Yamaha Sniper 150 V2 DTC reference.
 * Replace or extend later with real scan results and other models.
 */
const ECU_SAMPLES = [
  {
    dtc: ["P0120", "P0122", "P0123"],
    code: "P0122",
    err: "Error 15",
    part: "Throttle Position Sensor (TPS)",
    desc: "Defective or dirty TPS, causing poor acceleration or an unstable engine idle.",
    checks: [
      "Clean the throttle body with FI cleaner.",
      "Check for loose TPS wiring."
    ],
    parts: [
      "Throttle Position Sensor (TPS)"
    ],
    common: true
  },
  {
    dtc: ["P0105", "P0107", "P0108"],
    code: "P0105",
    err: "Error 13 & 14",
    part: "Intake Air Pressure Sensor (MAP)",
    desc: "Sensor circuit open/shorted, or a loose/disconnected vacuum hose line.",
    checks: [
      "Inspect the rubber vacuum hose for cracks or leaks.",
      "Check the 3-pin sensor connector."
    ],
    parts: [
      "Manifold Absolute Pressure (MAP) Sensor"
    ],
    common: true
  },
  {
    dtc: ["P1601", "P1901"],
    code: "P1601",
    err: "Error 19",
    part: "Side Stand Switch",
    desc: "Broken or disconnected blue/green wire leading to the ECU. Prevents starting.",
    checks: [
      "Check if the side stand switch is stuck with mud/dirt.",
      "Inspect the blue/green wire under the frame."
    ],
    parts: [
      "Side Stand Switch"
    ],
    common: true
  },
  {
    dtc: ["P0110", "P0112", "P0113"],
    code: "P0110",
    err: "Error 22",
    part: "Intake Air Temperature (IAT) Sensor",
    desc: "Faulty sensor or disconnected harness causing incorrect air temperature readings.",
    checks: [
      "Check the air filter box housing connector.",
      "Inspect for loose pins in the sensor wire."
    ],
    parts: [
      "Intake Air Temperature (IAT) Sensor"
    ],
    common: true
  },
  {
    dtc: ["P0130", "P0131", "P0132"],
    code: "P0130",
    err: "Error 24",
    part: "Oxygen (O2) Sensor",
    desc: "The ECU is getting abnormal or no signals from the exhaust O2 sensor. Often triggers a fuel gauge blinking symptom.",
    checks: [
      "Inspect the exhaust pipe connection for leaks.",
      "Check for carbon buildup on the sensor tip."
    ],
    parts: [
      "Oxygen (O2) Sensor"
    ],
    common: true
  },
  {
    dtc: ["P1500", "P1999"],
    code: "P1500",
    err: "Error 30 & 41",
    part: "Lean Angle Sensor",
    desc: "Triggers if the motorcycle has rolled over, or if the sensor is dislodged/faulty. It shuts off the engine for safety.",
    checks: [
      "Check if the sensor has fallen out of its rubber mount.",
      "Ensure the sensor is oriented vertically."
    ],
    parts: [
      "Lean Angle Sensor (Bank Angle Sensor)"
    ],
    common: true
  },
  {
    dtc: ["P0201"],
    code: "P0201",
    err: "Error 39",
    part: "Fuel Injector",
    desc: "Open or short circuit detected in the injector wiring, causing engine jerking.",
    checks: [
      "Listen if the injector clicks when priming.",
      "Inspect the injector harness connector for corrosion."
    ],
    parts: [
      "Fuel Injector coupler",
      "Fuel Injector"
    ],
    common: true
  },
  {
    dtc: ["P0500"],
    code: "P0500",
    err: "Error 42",
    part: "Speed Sensor",
    desc: "No normal signal received from the speed sensor. The digital speedometer on the cluster will stop reading correctly.",
    checks: [
      "Check the front wheel speed sensor cable for cuts.",
      "Inspect the digital gear/sensor at the wheel hub."
    ],
    parts: [
      "Speedometer Cable / Speed Sensor"
    ],
    common: true
  },
  {
    dtc: ["P0335", "P0336"],
    code: "P0335",
    err: "Error 12",
    part: "Crankshaft Position Sensor (CKP)",
    desc: "The ECU is not receiving normal signals from the crank sensor. The bike usually will not start or may misfire.",
    checks: [
      "Clean the stator/crank area from debris.",
      "Check the CKP sensor plug for water intrusion."
    ],
    parts: [
      "Stator assembly"
    ],
    common: false
  },
  {
    dtc: ["P0115", "P0117", "P0118"],
    code: "P0118",
    err: "Error 21",
    part: "Coolant Temperature Sensor",
    desc: "Open/short circuit in the sensor. Can cause the radiator fan to run continuously or the engine to run too rich.",
    checks: [
      "Check coolant level in the radiator and reservoir.",
      "Inspect the wiring plug on the back of the cylinder."
    ],
    parts: [
      "Engine Coolant Temperature (ECT) Sensor",
      "Cooling fan"
    ],
    common: false
  },
  {
    dtc: ["P0351"],
    code: "P0351",
    err: "Error 33",
    part: "Ignition Coil",
    desc: "Primary lead open or short circuit. Causes severe engine misfiring or no spark.",
    checks: [
      "Check the spark plug cap connection.",
      "Inspect the high-tension wire for burns/cuts."
    ],
    parts: [
      "Yamaha Ignition Coil",
      "Spark Plug"
    ],
    common: false
  },
  {
    dtc: ["P0560", "P0562", "P0563"],
    code: "P0562",
    err: "Error 46",
    part: "Power Supply / Charging System",
    desc: "The ECU is receiving abnormal voltage (too low or too high). Usually caused by a dead battery, faulty rectifier/regulator, or stator issue.",
    checks: [
      "Measure battery voltage using a multimeter (should be 12.4V-12.8V off).",
      "Check for loose or corroded battery terminals."
    ],
    parts: [
      "Yamaha Regulator Rectifier",
      "Motorcycle Battery (12V)"
    ],
    common: false
  }
];

/**
 * 27-item physical inspection checklist divided into 6 distinct categories.
 */
const INSPECTION_CHECKLIST = [
  {
    key: "tires",
    name: "Tires & Wheels",
    icon: "🛞",
    items: [
      { key: "front_tire", label: "Front tire condition and tread" },
      { key: "rear_tire", label: "Rear tire condition and tread" },
      { key: "tire_pressure", label: "Tire pressure" },
      { key: "rims_spokes", label: "Rims and spokes" },
      { key: "wheel_bearings", label: "Wheel bearings" }
    ]
  },
  {
    key: "brakes",
    name: "Brakes",
    icon: "🛑",
    items: [
      { key: "front_pads", label: "Front brake pads" },
      { key: "rear_pads_shoes", label: "Rear brake pads or shoes" },
      { key: "fluid_level", label: "Brake fluid level" },
      { key: "discs_drums", label: "Discs or drums" },
      { key: "lever_pedal", label: "Lever and pedal feel" }
    ]
  },
  {
    key: "engine",
    name: "Engine & Fluids",
    icon: "⚙️",
    items: [
      { key: "oil_condition", label: "Engine oil level and condition" },
      { key: "coolant_level", label: "Coolant level" },
      { key: "air_filter", label: "Air filter" },
      { key: "spark_plug", label: "Spark plug" },
      { key: "leaks_noise", label: "Leaks and unusual noise" }
    ]
  },
  {
    key: "drivetrain",
    name: "Drivetrain",
    icon: "⛓️",
    items: [
      { key: "belt_chain", label: "Drive belt or chain" },
      { key: "cvt_clutch", label: "CVT or clutch" },
      { key: "rollers_sprockets", label: "Rollers and sprockets" }
    ]
  },
  {
    key: "electrical",
    name: "Electrical",
    icon: "⚡",
    items: [
      { key: "battery", label: "Battery" },
      { key: "headlight_taillight", label: "Headlight and taillight" },
      { key: "brake_signals", label: "Brake light and signals" },
      { key: "horn", label: "Horn" },
      { key: "charging_starter", label: "Charging system and starter" }
    ]
  },
  {
    key: "suspension",
    name: "Suspension & Steering",
    icon: "🔧",
    items: [
      { key: "front_fork", label: "Front fork" },
      { key: "rear_shock", label: "Rear shock" },
      { key: "steering_bearings", label: "Steering and head bearings" },
      { key: "swingarm_frame", label: "Swingarm and frame" }
    ]
  }
];

/**
 * Creates an empty inspection draft structure.
 * Held purely in JS memory (not localStorage).
 * @returns {Object} Fresh inspection draft.
 */
function createFreshInspDraft() {
  return {
    plate: "",
    odo: "",
    make: "",
    model: "",
    year: "",
    selectedBikeId: null,
    complaints: [],
    notes: "",
    custName: "",
    custPhone: "",
    items: [],
    inspection: {
      enablePhysical: true,
      enableObd: true,
      obd: {
        codes: [],
        bike: null
      },
      items: {},
      expandedCats: {}
    },
    findings: ""
  };
}

/**
 * Customer complaint symptom choices for Step 1 Intake.
 * Defined in one central list for easy updating.
 */
const COMPLAINT_OPTIONS = [
  "Hard to start",
  "Engine noise",
  "Poor acceleration",
  "Overheating",
  "Brake problem",
  "Vibration",
  "Oil leak",
  "Electrical issue",
  "Regular maintenance"
];

/**
 * Icons mapped to Step 1 customer complaints.
 */
const COMPLAINT_ICONS = {
  "Hard to start": "⚡",
  "Engine noise": "🔊",
  "Poor acceleration": "🐢",
  "Overheating": "🌡️",
  "Brake problem": "🛑",
  "Vibration": "📳",
  "Oil leak": "🛢️",
  "Electrical issue": "💡",
  "Regular maintenance": "🔧"
};

/**
 * Mapping customer complaints to inspection zones.
 */
const COMPLAINT_TO_ZONES = {
  "Hard to start": ["electrical", "engine_trans", "fluids"],
  "Engine noise": ["engine_trans", "fluids"],
  "Poor acceleration": ["engine_trans"],
  "Overheating": ["fluids", "engine_trans"],
  "Brake problem": ["front_brakes", "fluids", "rear_suspension"],
  "Vibration": ["front_brakes", "rear_suspension"],
  "Oil leak": ["fluids", "engine_trans"],
  "Electrical issue": ["electrical"],
  "Regular maintenance": ["fluids", "front_brakes", "engine_trans"]
};

/**
 * 6 Inspection Zones mapping the 27 physical items across 5 vehicle zones plus ECU/OBD.
 */
const INSPECTION_ZONES = [
  {
    key: "front_brakes",
    name: "Front Wheel & Brakes",
    icon: "🛑",
    items: [
      { catKey: "tires", itKey: "front_tire", label: "Front tire condition and tread" },
      { catKey: "tires", itKey: "rims_spokes", label: "Rims and spokes" },
      { catKey: "tires", itKey: "wheel_bearings", label: "Wheel bearings" },
      { catKey: "brakes", itKey: "front_pads", label: "Front brake pads" },
      { catKey: "brakes", itKey: "discs_drums", label: "Discs or drums" }
    ],
    pctX: 82,
    pctY: 72
  },
  {
    key: "engine_trans",
    name: "Engine & Transmission",
    icon: "⚙️",
    items: [
      { catKey: "engine", itKey: "air_filter", label: "Air filter" },
      { catKey: "engine", itKey: "spark_plug", label: "Spark plug" },
      { catKey: "engine", itKey: "leaks_noise", label: "Leaks and unusual noise" },
      { catKey: "drivetrain", itKey: "belt_chain", label: "Drive belt or chain" },
      { catKey: "drivetrain", itKey: "cvt_clutch", label: "CVT or clutch" },
      { catKey: "drivetrain", itKey: "rollers_sprockets", label: "Rollers and sprockets" }
    ],
    pctX: 48,
    pctY: 66
  },
  {
    key: "electrical",
    name: "Electrical & Battery",
    icon: "⚡",
    items: [
      { catKey: "electrical", itKey: "battery", label: "Battery" },
      { catKey: "electrical", itKey: "headlight_taillight", label: "Headlight and taillight" },
      { catKey: "electrical", itKey: "brake_signals", label: "Brake light and signals" },
      { catKey: "electrical", itKey: "horn", label: "Horn" },
      { catKey: "electrical", itKey: "charging_starter", label: "Charging system and starter" }
    ],
    pctX: 62,
    pctY: 30
  },
  {
    key: "rear_suspension",
    name: "Rear Drive & Suspension",
    icon: "🔧",
    items: [
      { catKey: "tires", itKey: "rear_tire", label: "Rear tire condition and tread" },
      { catKey: "brakes", itKey: "rear_pads_shoes", label: "Rear brake pads or shoes" },
      { catKey: "suspension", itKey: "front_fork", label: "Front fork" },
      { catKey: "suspension", itKey: "rear_shock", label: "Rear shock" },
      { catKey: "suspension", itKey: "steering_bearings", label: "Steering and head bearings" },
      { catKey: "suspension", itKey: "swingarm_frame", label: "Swingarm and frame" }
    ],
    pctX: 20,
    pctY: 72
  },
  {
    key: "fluids",
    name: "Fluids",
    icon: "🛢️",
    items: [
      { catKey: "engine", itKey: "oil_condition", label: "Engine oil level and condition" },
      { catKey: "engine", itKey: "coolant_level", label: "Coolant level" },
      { catKey: "brakes", itKey: "fluid_level", label: "Brake fluid level" },
      { catKey: "brakes", itKey: "lever_pedal", label: "Lever and pedal feel" },
      { catKey: "tires", itKey: "tire_pressure", label: "Tire pressure" }
    ],
    pctX: 38,
    pctY: 38
  },
  {
    key: "ecu_obd",
    name: "ECU / OBD",
    icon: "💻",
    items: [],
    pctX: 74,
    pctY: 12
  }
];

/**
 * One-tap canned jobs linked to inspection checklist items.
 */
const CANNED_JOBS = {
  "brakes.front_pads": [
    {
      label: "Replace Front Pads",
      lines: [
        { kind: "labor", name: "Replace front brake pads", price: 200 },
        { kind: "part", name: "Front brake pads", price: 650 }
      ]
    },
    {
      label: "Clean & Adjust Brakes",
      lines: [
        { kind: "labor", name: "Clean & adjust brakes", price: 150 }
      ]
    }
  ],
  "brakes.rear_pads_shoes": [
    {
      label: "Replace Rear Pads/Shoes",
      lines: [
        { kind: "labor", name: "Replace rear brake pads/shoes", price: 200 },
        { kind: "part", name: "Rear brake pads / shoes", price: 600 }
      ]
    }
  ],
  "brakes.fluid_level": [
    {
      label: "Flush Brake Fluid",
      lines: [
        { kind: "labor", name: "Flush brake fluid", price: 150 },
        { kind: "part", name: "Brake fluid DOT 3", price: 120 }
      ]
    }
  ],
  "tires.front_tire": [
    {
      label: "Replace Front Tire",
      lines: [
        { kind: "labor", name: "Replace front tire", price: 150 },
        { kind: "part", name: "Front tire", price: 1200 }
      ]
    }
  ],
  "tires.rear_tire": [
    {
      label: "Replace Rear Tire",
      lines: [
        { kind: "labor", name: "Replace rear tire", price: 150 },
        { kind: "part", name: "Rear tire", price: 1400 }
      ]
    }
  ],
  "engine.oil_condition": [
    {
      label: "Change Engine Oil",
      lines: [
        { kind: "labor", name: "Change engine oil", price: 150 },
        { kind: "part", name: "Engine oil 1L", price: 420 }
      ]
    }
  ],
  "engine.coolant_level": [
    {
      label: "Top Up / Flush Coolant",
      lines: [
        { kind: "labor", name: "Top up / flush coolant", price: 150 },
        { kind: "part", name: "Coolant 1L", price: 250 }
      ]
    }
  ],
  "engine.air_filter": [
    {
      label: "Replace Air Filter",
      lines: [
        { kind: "labor", name: "Replace air filter", price: 100 },
        { kind: "part", name: "Air filter element", price: 280 }
      ]
    }
  ],
  "engine.spark_plug": [
    {
      label: "Replace Spark Plug",
      lines: [
        { kind: "labor", name: "Replace spark plug", price: 100 },
        { kind: "part", name: "Spark plug", price: 260 }
      ]
    }
  ],
  "drivetrain.belt_chain": [
    {
      label: "Replace Drive Belt / Chain",
      lines: [
        { kind: "labor", name: "Replace drive belt/chain", price: 250 },
        { kind: "part", name: "Drive belt / chain", price: 1450 }
      ]
    }
  ],
  "drivetrain.cvt_clutch": [
    {
      label: "Clean CVT",
      lines: [
        { kind: "labor", name: "Clean CVT", price: 600 }
      ]
    },
    {
      label: "Replace CVT Parts",
      lines: [
        { kind: "labor", name: "Replace CVT parts", price: 350 },
        { kind: "part", name: "CVT rollers and sliders", price: 750 }
      ]
    }
  ],
  "electrical.battery": [
    {
      label: "Replace Battery",
      lines: [
        { kind: "labor", name: "Replace battery", price: 100 },
        { kind: "part", name: "Motorcycle Battery 12V", price: 1350 }
      ]
    }
  ],
  "electrical.headlight_taillight": [
    {
      label: "Replace Bulb",
      lines: [
        { kind: "labor", name: "Replace bulb", price: 80 },
        { kind: "part", name: "Bulb 12V", price: 150 }
      ]
    }
  ],
  "suspension.front_fork": [
    {
      label: "Replace Fork Oil / Seals",
      lines: [
        { kind: "labor", name: "Replace front fork oil & seals", price: 450 },
        { kind: "part", name: "Fork oil & seals", price: 380 }
      ]
    }
  ],
  "suspension.rear_shock": [
    {
      label: "Replace Rear Shock",
      lines: [
        { kind: "labor", name: "Replace rear shock absorber", price: 250 },
        { kind: "part", name: "Rear shock absorber", price: 1800 }
      ]
    }
  ]
};

/**
 * 8 Quick Fault Codes chips for the compact OBD drawer.
 */
const QUICK_OBD_CODES = [
  { code: "P0105", label: "P0105 MAP Sensor" },
  { code: "P0122", label: "P0122 Throttle Position" },
  { code: "P0335", label: "P0335 Crankshaft" },
  { code: "P0562", label: "P0562 Low Battery Voltage" },
  { code: "P1601", label: "P1601 Side Stand Switch" },
  { code: "P0130", label: "P0130 O2 Sensor" },
  { code: "P0201", label: "P0201 Fuel Injector" },
  { code: "P1500", label: "P1500 Lean Angle Sensor" }
];

let selectedInspectionZone = null;
let obdDrawerOpen = false;
let cannedJobToastTimer = null;

/**
 * In-memory map of auto-inserted OBD finding text by fault code: { [code]: string }.
 * Used to cleanly remove exact auto-inserted text when a fault code is removed.
 */
let obdFindingText = {};

/**
 * In-memory map of auto-inserted physical inspection entry text by item key: { ["catKey.itemKey"]: string }.
 * Used to detect changes and prevent duplicate insertions of the same physical fault.
 */
let physFindingText = {};

let taHighlightTimer = null;
let sharedBarFeedbackTimer = null;

/**
 * In-memory active inspection draft and step indicator.
 */
let inspDraft = createFreshInspDraft();
let inspDraftStep = 1;
let selectedPhysRailCat = null;
let inspPendingObdCode = null;
let obdScanResults = null;
let isObdScanning = false;

/**
 * Resets the inspection draft to initial empty state.
 */
function resetInspDraft() {
  inspDraft = createFreshInspDraft();
  inspDraftStep = 1;
  selectedPhysRailCat = null;
  inspPendingObdCode = null;
  obdScanResults = null;
  isObdScanning = false;
  selectedInspectionZone = null;
  obdDrawerOpen = false;
  obdFindingText = {};
  physFindingText = {};
  if (cannedJobToastTimer) {
    clearTimeout(cannedJobToastTimer);
    cannedJobToastTimer = null;
  }
  if (taHighlightTimer) {
    clearTimeout(taHighlightTimer);
    taHighlightTimer = null;
  }
  if (sharedBarFeedbackTimer) {
    clearTimeout(sharedBarFeedbackTimer);
    sharedBarFeedbackTimer = null;
  }
  if (typeof itemFeedbackTimers === "object") {
    Object.keys(itemFeedbackTimers).forEach((k) => {
      clearTimeout(itemFeedbackTimers[k]);
    });
    itemFeedbackTimers = {};
  }
  if (view === "insp") {
    const mainEl = $("main");
    if (mainEl) mainEl.innerHTML = R.insp();
  }
}

/**
 * Auto-grows a textarea up to max-height (320px) and scrolls inside if exceeded.
 * @param {HTMLTextAreaElement} ta
 */
function autoGrowTextarea(ta) {
  if (!ta) return;
  ta.style.height = "auto";
  const scrollH = ta.scrollHeight;
  const maxH = 320;
  if (scrollH > maxH) {
    ta.style.height = maxH + "px";
    ta.style.overflowY = "auto";
  } else {
    ta.style.height = Math.max(80, scrollH) + "px";
    ta.style.overflowY = "hidden";
  }
}

/**
 * Switches the active step of the inspection draft (1 to 3).
 * Captures current form fields prior to switching.
 * @param {number} newStep - Destination step (1: Intake, 2: Diagnosis, 3: Confirmation).
 */
function setInspDraftStep(newStep) {
  if (inspDraftStep === 1) {
    readIntakeDomIntoDraft();
  } else if (inspDraftStep === 2) {
    readDiagDomIntoDraft();
  } else if (inspDraftStep === 3) {
    readConfirmDomIntoDraft();
  }

  inspDraftStep = Math.max(1, Math.min(3, newStep));
  if (view === "insp") {
    const mainEl = $("main");
    if (mainEl) mainEl.innerHTML = R.insp();
    if (inspDraftStep === 2) {
      autoGrowTextarea($("insp-diag-findings"));
    }
  }
}

/**
 * Builds HTML for the 3-step progress stepper bar.
 * Steps are display-only (not clickable).
 * @param {number} [curStage=1] - Active stage number (1 to 3).
 * @returns {string} HTML string.
 */
function getInspStepperHtml(curStage = 1) {
  return `
    <div class="insp-stepper">
      ${INSP_STAGES.map((s, idx) => {
        const isDone = s.id < curStage;
        const isActive = s.id === curStage;
        const clsName = isDone ? "done" : isActive ? "active" : "upcoming";
        const iconOrNum = isDone ? "✓" : s.id;
        const divider = idx < INSP_STAGES.length - 1 ? `<div class="insp-step-divider ${s.id < curStage ? "done" : ""}"></div>` : "";
        return `
          <div class="insp-step ${clsName}">
            <span class="insp-step-num">${iconOrNum}</span>
            <span>${s.id}. ${s.label}</span>
          </div>
          ${divider}
        `;
      }).join("")}
    </div>
  `;
}

/**
 * Builds the top-level Motorcycle Inspection view HTML with 3-step wizard.
 * @returns {string} HTML string.
 */
function getInspViewHtml() {
  let stepBodyHtml = "";
  if (inspDraftStep === 1) {
    stepBodyHtml = getInspStep1Html();
  } else if (inspDraftStep === 2) {
    stepBodyHtml = getInspStep2Html();
  } else {
    stepBodyHtml = getInspStep3Html();
  }

  return `
    <div class="card top" style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h1 style="margin:0 0 4px">Motorcycle Inspection</h1>
        <p style="margin:0;color:var(--text-muted)">Register a motorcycle and start a new job order</p>
      </div>
      ${inspDraftStep === 1 ? `<button type="button" class="btn-clear-draft" onclick="resetInspDraft()" title="Clear form">Clear form</button>` : ""}
    </div>

    <div class="card insp-card-container">
      ${getInspStepperHtml(inspDraftStep)}
      ${stepBodyHtml}
    </div>
  `;
}

/**
 * Opens the Job Order modal for an active job or new intake.
 * @param {string|null} id - Work order ID.
 */
function openInspModal(id) {
  inspActiveWoId = id;
  renderInspModal(id);
  const ov = $("insp-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Job Order inspection modal and refreshes active view if needed.
 */
function closeInspModal() {
  const ov = $("insp-ov");
  if (ov) ov.classList.remove("on");
  inspActiveWoId = null;
  document.body.style.overflow = "";
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  } else if (view === "dash") {
    $("main").innerHTML = R.dash();
  }
}

/**
 * Updates status of a work order directly from the Job Card modal.
 * @param {string} woId - Work order ID.
 * @param {string} newStatus - New status from ST array.
 */
function setJobCardStatus(woId, newStatus) {
  const o = g("wo", woId);
  if (!o) return;
  o.st = newStatus;
  if (newStatus === "Ready for Pickup") {
    o.readyAt = nowLocalIso();
  }
  if (newStatus === "Completed" && !o.done) {
    o.done = nowLocalIso();
    const b = bike(o.bid);
    if (b && o.odo > (b.odo || 0)) {
      b.odo = o.odo;
    }
  }
  save();
  renderInspModal(woId);
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  } else if (view === "dash") {
    $("main").innerHTML = R.dash();
  }
}

/**
 * Renders the read-only Job Card modal for a work order.
 * Displays vehicle metadata, status control strip, complaints, fault inspection,
 * legacy estimates/remarks, and billing redirection if Ready for Pickup.
 * @param {string|null} id - Work order ID.
 */
function renderInspModal(id) {
  const md = $("insp-md");
  if (!md) return;

  const o = id ? g("wo", id) : null;
  if (!o) {
    md.innerHTML = `
      <div class="insp-header">
        <div class="insp-title">Job Card</div>
        <button type="button" class="insp-close-btn" onclick="closeInspModal()">✕</button>
      </div>
      <div class="empty" style="padding:24px">No work order selected.</div>
    `;
    return;
  }

  const b = bike(o.bid);
  const c = b ? own(b) : null;
  const jo = getJobNumber(o);
  const isReady = o.st === "Ready for Pickup";
  const isDone = o.st === "Completed";
  const u = getCurrentUser();
  const isMech = u && u.activeRole === "mechanic";
  const isUnassigned = !o.mech || o.mech.trim() === "" || o.mech.trim().toLowerCase() === "unassigned";
  const isAssignedToOther = isMech && !isUnassigned && (o.mech || "").trim().toLowerCase() !== (u.name || "").trim().toLowerCase();

  // Counts & items from inspection: treat unmarked items as OK, list Fix items first, then Watch items
  const insp = o.inspection || {};
  const inspItems = insp.items || {};
  let watchCount = 0;
  let fixCount = 0;
  const fixList = [];
  const watchList = [];

  INSPECTION_CHECKLIST.forEach((cat) => {
    cat.items.forEach((item) => {
      const stateObj = inspItems[`${cat.key}.${item.key}`];
      if (stateObj) {
        if (stateObj.s === "fix") {
          fixCount++;
          fixList.push({ catName: cat.name, label: item.label, state: "fix", note: stateObj.note || "" });
        } else if (stateObj.s === "watch") {
          watchCount++;
          watchList.push({ catName: cat.name, label: item.label, state: "watch", note: stateObj.note || "" });
        }
      }
    });
  });
  const watchFixList = [...fixList, ...watchList];
  const okCount = Math.max(0, 27 - (watchCount + fixCount));

  const obdCodes = (insp.obd && Array.isArray(insp.obd.codes)) ? insp.obd.codes : [];
  const legacyItems = Array.isArray(o.items) ? o.items : [];
  const legacyExtra = Array.isArray(o.extra) ? o.extra : [];

  let html = `
    <div class="insp-header">
      <div>
        <div class="insp-title" id="insp-modal-title">
          ${b ? escHtml(b.plate) : "NO PLATE"} · ${b ? escHtml(b.make + " " + b.model) : "Unknown"}
          <span style="color:var(--primary);font-size:16px;margin-left:8px">${jo}</span>
        </div>
        <div class="insp-subtitle">Job Order #${o.id} · Read-only Job Card</div>
      </div>
      <button type="button" class="insp-close-btn" onclick="closeInspModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <!-- Metadata Grid -->
    <div class="jobcard-meta-grid">
      <div><b>Plate Number:</b> ${b ? escHtml(b.plate) : "NO PLATE"}</div>
      <div><b>Motorcycle:</b> ${b ? escHtml(b.make + " " + b.model + (b.year ? " (" + b.year + ")" : "")) : "Unknown"}</div>
      <div><b>Customer:</b> ${c ? escHtml(c.name + (c.phone ? " (" + c.phone + ")" : "")) : "Walk-in Customer"}</div>
      <div><b>Odometer:</b> ${((o.odo !== undefined ? o.odo : b ? b.odo : 0) || 0).toLocaleString()} km</div>
      <div>
        <b>Assigned Mechanic:</b> ${escHtml(o.mech || "Unassigned")}
        ${isMech && isUnassigned ? `<button type="button" class="btn-take-job" style="margin-left:8px" onclick="takeJob('${o.id}')">Take this job</button>` : ""}
        ${isAssignedToOther ? `<div style="font-size:12px;color:var(--text-muted);margin-top:2px;font-style:italic">Assigned to ${escHtml(o.mech)}</div>` : ""}
      </div>
      <div><b>Date In:</b> ${formatJobDate(o.at)}</div>
      <div><b>Current Status:</b> ${badge(o.st)}</div>
      <div><b>Total Cost:</b> <b id="jobcard-meta-total-${o.id}">${P(total(o))}</b></div>
    </div>

    <!-- Stage Flow Control Bar -->
    ${getJobCardStageControlHtml(o)}

    <!-- Recommended Services & Allocated Items Card -->
    <div class="card" style="padding:16px;margin-bottom:16px;background:#FFFFFF;border:1px solid var(--border)">
      <div style="font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:8px">
        Recommended Services &amp; Allocated Items
      </div>
      <div id="${o.id}-items-container">
        ${getItemsBuilderHtml(o.id, {
          readOnly: o.st === "Checking" || o.st === "Ready for Pickup" || o.st === "Completed",
          showLaborDone: o.st === "In Progress",
          showExtraToggle: o.st === "In Progress"
        })}
      </div>
    </div>
  `;

  // Ready for pickup notice with direct link to billing
  if (isReady) {
    const canBill = canOpen("bill");
    html += `
      <div class="card" style="padding:16px;text-align:center;margin-bottom:16px;background:var(--bg-surface-alt);border:1px solid var(--border)">
        <div style="font-size:24px;margin-bottom:4px">📋</div>
        <h4 style="margin:0 0 4px">Vehicle Ready for Billing &amp; Pickup</h4>
        <p style="color:var(--text-muted);font-size:13px;margin:0 0 12px">All repairs finished. Vehicle awaiting settlement in Transactions &amp; Billing.</p>
        ${canBill
          ? `<button type="button" class="btn sm" onclick="closeInspModal(); go('bill');">Go to Transactions &amp; Billing →</button>`
          : `<div style="font-size:13px;color:var(--text-muted);font-style:italic">Sent to billing. The Admin handles payment.</div>`
        }
      </div>
    `;
  }

  // Complaints & Notes
  const compStr = (o.complaints && o.complaints.length) ? o.complaints.map(escHtml).join(", ") : "None";
  const notesStr = o.notes ? escHtml(o.notes) : (o.note ? escHtml(o.note) : "None");

  html += `
    <div class="card" style="padding:16px;margin-bottom:16px;background:var(--bg-surface-alt);border:1px solid var(--border)">
      <div style="font-weight:700;font-size:13px;color:var(--text-primary);margin-bottom:8px">Customer Complaints &amp; Requests</div>
      <div style="font-size:13px;line-height:1.6">
        <div><b>Complaints:</b> ${compStr}</div>
        <div><b>Notes:</b> ${notesStr}</div>
      </div>
    </div>
  `;

  // Fault Inspection Summary
  const hasInspData = (okCount + watchCount + fixCount > 0) || obdCodes.length > 0 || (o.findings && o.findings.trim());
  html += `
    <div class="card" style="padding:16px;margin-bottom:16px;background:var(--bg-surface-alt);border:1px solid var(--border)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <div style="font-weight:700;font-size:13px;color:var(--text-primary)">Inspection &amp; Diagnosis Results</div>
        <div style="display:flex;gap:6px">
          <span class="phys-count-pill ok">OK ${okCount}</span>
          ${watchCount > 0 ? `<span class="phys-count-pill watch">Watch ${watchCount}</span>` : ""}
          <span class="phys-count-pill fix">Fix ${fixCount}</span>
        </div>
      </div>
  `;

  if (!hasInspData) {
    html += `
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">All inspected items OK.</div>
      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Final Findings &amp; Diagnosis Verification:</div>
        <div style="font-size:13px;color:var(--text-muted)">-</div>
      </div>
    `;
  } else {
    // Watch & Fix list
    if (watchFixList.length > 0) {
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">Noted Faults &amp; Wear Items:</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${watchFixList.map((wf) => `
              <div style="font-size:13px;display:flex;align-items:baseline;gap:8px">
                <span class="fault-badge ${wf.state}">${wf.state.toUpperCase()}</span>
                <span><b>${escHtml(wf.label)}</b> <span style="font-size:11px;color:var(--text-muted)">(${escHtml(wf.catName)})</span>${wf.note ? ` — <i>${escHtml(wf.note)}</i>` : ""}</span>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    } else {
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Physical Inspection:</div>
          <div style="font-size:13px;color:var(--text-muted)">All inspected items OK.</div>
        </div>
      `;
    }

    // OBD Codes
    if (obdCodes.length > 0) {
      html += `
        <div style="margin-bottom:12px">
          <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">ECU / OBD Trouble Codes:</div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${obdCodes.map((c) => {
              const label = c.part && !c.desc.startsWith(c.part) ? `${c.part}: ${c.desc}` : (c.desc || "");
              return `
                <div style="font-size:13px;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
                  <span style="display:inline-block;padding:2px 6px;border-radius:4px;background:#FEE2E2;color:#B91C1C;font-weight:700;font-size:11px">${escHtml(c.code)}</span>
                  ${c.err ? `<span class="obd-err-code-pill" style="font-size:11px;padding:1px 6px">${escHtml(c.err)}</span>` : ""}
                  <span>${escHtml(label)}</span>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      `;
    }

    // Final Findings & Diagnosis Verification
    html += `
      <div style="margin-top:8px">
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Final Findings &amp; Diagnosis Verification:</div>
        ${o.findings && o.findings.trim()
          ? `<div style="font-size:13px;white-space:pre-wrap;background:#FFFFFF;border:1px solid var(--border);border-radius:6px;padding:8px 12px">${escHtml(o.findings)}</div>`
          : `<div style="font-size:13px;color:var(--text-muted)">-</div>`
        }
      </div>
    `;
  }
  html += `</div>`;

  // Mechanic Remarks (if present)
  if (o.remarks && o.remarks.trim()) {
    html += `
      <div class="card" style="padding:16px;margin-bottom:16px;background:var(--bg-surface-alt);border:1px solid var(--border)">
        <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Mechanic Remarks:</div>
        <div style="font-size:13px;white-space:pre-wrap">${escHtml(o.remarks)}</div>
      </div>
    `;
  }

  // Footer Actions
  html += `
    <div class="insp-footer" style="position:static;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px">
      <button type="button" class="btn g" onclick="closeInspModal()">Close</button>
      ${isDone ? `<button type="button" class="btn" onclick="openReceipt('${o.id}')">🖨️ View Digital Receipt</button>` : ""}
    </div>
  `;

  md.innerHTML = html;
}

/**
 * Reads all current values from Step 1 Intake inputs into inspDraft.
 */
function readIntakeDomIntoDraft() {
  const p = $("insp-plate"); if (p) inspDraft.plate = p.value.trim();
  const o = $("insp-odo"); if (o) inspDraft.odo = o.value ? +o.value : "";
  const m = $("insp-make"); if (m) inspDraft.make = m.value.trim();
  const mo = $("insp-model"); if (mo) inspDraft.model = mo.value.trim();
  const y = $("insp-year"); if (y) inspDraft.year = y.value ? +y.value : "";
  const n = $("insp-notes"); if (n) inspDraft.notes = n.value.trim();
}

/**
 * Reads all current values from Step 2 Diagnosis inputs into inspDraft.
 */
function readDiagDomIntoDraft() {
  const f = $("insp-diag-findings");
  if (f) inspDraft.findings = f.value;
  if (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.bike) {
    const bike = inspDraft.inspection.obd.bike;
    const otherInp = $("obd-other-brand-input");
    const modelInp = $("obd-model-input");
    const plateInp = $("obd-plate-input");
    if (otherInp) bike.otherBrand = otherInp.value;
    if (modelInp) bike.model = modelInp.value;
    if (plateInp) bike.plate = plateInp.value.toUpperCase();
  }
  if (typeof document !== "undefined" && document.querySelectorAll) {
    const noteInputs = document.querySelectorAll(".phys-item-note");
    noteInputs.forEach((inp) => {
      const parts = inp.id.replace("phys-note-", "").split("-");
      if (parts.length >= 2) {
        const catKey = parts[0];
        const itKey = parts.slice(1).join("-");
        const itemKey = `${catKey}.${itKey}`;
        if (inspDraft.inspection && inspDraft.inspection.items && inspDraft.inspection.items[itemKey]) {
          inspDraft.inspection.items[itemKey].note = inp.value;
        }
      }
    });
  }
}

/**
 * Reads all current values from Step 3 Confirmation inputs into inspDraft.
 */
function readConfirmDomIntoDraft() {
  const n = $("insp-cust-name"); if (n) inspDraft.custName = n.value.trim();
  const p = $("insp-cust-phone"); if (p) inspDraft.custPhone = p.value.trim();
}

/**
 * Generates HTML for Step 1 Intake form.
 * Contains vehicle info and complaints only (no mechanic, no customer name/phone).
 * @returns {string} HTML string.
 */
function getInspStep1Html() {
  const comp = Array.isArray(inspDraft.complaints) ? inspDraft.complaints : [];
  const isReturning = Boolean(inspDraft.selectedBikeId);

  return `
    <div class="insp-stage-body">
      <div class="insp-field-group">
        <label for="insp-intake-search">Auto-fill from existing motorcycle or customer</label>
        <div class="insp-suggest-wrap">
          <input
            id="insp-intake-search"
            type="text"
            placeholder="Type plate number (e.g. ABC-1234) or customer phone..."
            autocomplete="off"
            oninput="onIntakeSearch(this.value)"
          />
          <div id="insp-suggest-box" class="insp-suggest-dropdown" style="display:none"></div>
        </div>
      </div>

      ${isReturning ? `
        <!-- Returning Vehicle Summary Badge Card -->
        <div class="row" style="margin-bottom:16px;gap:16px;align-items:flex-end">
          <div class="vehicle-summary-badge" style="flex:1">
            <div style="font-size:28px;margin-right:12px;line-height:1">🏍️</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:15px;font-weight:700;color:var(--text-primary);line-height:1.3">
                ${escHtml([inspDraft.make, inspDraft.model].filter(Boolean).join(" "))}${inspDraft.plate ? ` • ${escHtml(inspDraft.plate)}` : ""}${inspDraft.year ? ` • ${inspDraft.year}` : ""}
              </div>
              <div style="font-size:13px;color:var(--text-muted);margin-top:2px">
                ${escHtml([inspDraft.custName, inspDraft.custPhone].filter(Boolean).join(" • ") || "Walk-in Customer")}
              </div>
            </div>
            <button type="button" class="btn-change-vehicle" onclick="clearSelectedIntakeBike()">Change vehicle</button>
          </div>
          <div class="insp-field-group" style="width:200px;flex:0 0 200px;margin-bottom:0">
            <label for="insp-odo">Current Odometer (km)</label>
            <input
              id="insp-odo"
              type="number"
              min="0"
              placeholder="e.g. 15000"
              value="${inspDraft.odo !== undefined && inspDraft.odo !== null ? inspDraft.odo : ""}"
              oninput="inspDraft.odo=this.value"
            />
          </div>
        </div>
      ` : `
        <!-- Manual Vehicle Inputs -->
        <div class="row">
          <div class="insp-field-group">
            <label for="insp-plate">Plate Number</label>
            <input
              id="insp-plate"
              type="text"
              placeholder="e.g. ABC-1234"
              value="${escHtml(inspDraft.plate)}"
              oninput="inspDraft.plate=this.value"
            />
          </div>
          <div class="insp-field-group">
            <label for="insp-odo">Current Odometer (km)</label>
            <input
              id="insp-odo"
              type="number"
              min="0"
              placeholder="e.g. 15000"
              value="${inspDraft.odo !== undefined && inspDraft.odo !== null ? inspDraft.odo : ""}"
              oninput="inspDraft.odo=this.value"
            />
          </div>
        </div>

        <div class="row">
          <div class="insp-field-group">
            <label for="insp-make">Make / Brand</label>
            <input
              id="insp-make"
              type="text"
              placeholder="e.g. Honda, Yamaha, Suzuki"
              value="${escHtml(inspDraft.make)}"
              oninput="inspDraft.make=this.value"
            />
          </div>
          <div class="insp-field-group">
            <label for="insp-model">Model</label>
            <input
              id="insp-model"
              type="text"
              placeholder="e.g. Click 125, Mio i125"
              value="${escHtml(inspDraft.model)}"
              oninput="inspDraft.model=this.value"
            />
          </div>
        </div>

        <div class="row">
          <div class="insp-field-group">
            <label for="insp-year">Model Year</label>
            <input
              id="insp-year"
              type="number"
              min="1990"
              max="2035"
              placeholder="e.g. 2021"
              value="${inspDraft.year || ""}"
              oninput="inspDraft.year=this.value"
            />
          </div>
          <div></div>
        </div>
      `}

      <!-- 3x3 Symptom Grid -->
      <div class="insp-field-group">
        <label style="font-weight:700;font-size:12px;color:var(--text-secondary);text-transform:uppercase;display:block">
          Customer Complaint <span style="font-weight:400;text-transform:none;color:var(--text-muted);font-size:12px">(tap all that apply)</span>
        </label>
        <div id="insp-complaint-chips-wrap" class="symptom-grid">
          ${getComplaintChipsHtml()}
        </div>
      </div>

      <div class="insp-field-group">
        <label for="insp-notes">Customer Notes / Special Requests</label>
        <textarea
          id="insp-notes"
          rows="2"
          placeholder="Describe customer complaint details, weird sounds, or requests..."
          oninput="inspDraft.notes=this.value"
        >${escHtml(inspDraft.notes)}</textarea>
      </div>

      <div class="insp-footer" style="position:static;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:flex-end">
        <button type="button" class="btn" onclick="setInspDraftStep(2)">Next: Diagnosis →</button>
      </div>
    </div>
  `;
}

/**
 * Searches motorcycles and customers for auto-fill in Step 1 Intake.
 * @param {string} val - Query text.
 */
function onIntakeSearch(val) {
  const box = $("insp-suggest-box");
  if (!box) return;

  const q = (val || "").trim().toLowerCase();
  if (!q) {
    box.style.display = "none";
    box.innerHTML = "";
    return;
  }

  const matches = [];
  D.bk.forEach((b) => {
    const c = own(b);
    const plate = (b.plate || "").toLowerCase();
    const phone = c && c.phone ? c.phone.toLowerCase() : "";
    const name = c && c.name ? c.name.toLowerCase() : "";
    if (plate.includes(q) || phone.includes(q) || name.includes(q)) {
      matches.push({ b, c });
    }
  });

  if (!matches.length) {
    box.style.display = "block";
    box.innerHTML = `<div class="insp-suggest-item" style="color:var(--text-muted);cursor:default">No existing vehicle or customer found. Fill fields below to create.</div>`;
    return;
  }

  box.style.display = "block";
  box.innerHTML = matches
    .map(
      (m) => `
      <div class="insp-suggest-item" onmousedown="selectIntakeSuggestion('${m.b.id}')">
        <b>${escHtml(m.b.plate)} · ${escHtml(m.b.make + " " + m.b.model)} (${m.b.year || "—"})</b>
        <small>${escHtml(m.c ? m.c.name : "—")} · ${escHtml(m.c ? m.c.phone : "—")} · Last odo: ${(m.b.odo || 0).toLocaleString()} km</small>
      </div>
    `
    )
    .join("");
}

/**
 * Auto-fills Step 1 Intake inputs and stores owner details in draft for Step 3.
 * @param {string} bikeId - Motorcycle ID.
 */
function selectIntakeSuggestion(bikeId) {
  const b = bike(bikeId);
  if (!b) return;
  const c = own(b);

  inspDraft.selectedBikeId = bikeId;
  inspDraft.plate = b.plate || "";
  inspDraft.odo = b.odo || "";
  inspDraft.make = b.make || "";
  inspDraft.model = b.model || "";
  inspDraft.year = b.year || "";
  if (c) {
    inspDraft.custName = c.name || "";
    inspDraft.custPhone = c.phone || "";
  }

  if (view === "insp" && inspDraftStep === 1) {
    const mainEl = $("main");
    if (mainEl) mainEl.innerHTML = R.insp();
  }
}

/**
 * Clears the selected returning vehicle and restores manual vehicle inputs.
 */
function clearSelectedIntakeBike() {
  readIntakeDomIntoDraft();
  inspDraft.selectedBikeId = null;
  if (view === "insp" && inspDraftStep === 1) {
    const mainEl = $("main");
    if (mainEl) mainEl.innerHTML = R.insp();
  }
}

/**
 * Generates HTML for the 3x3 symptom grid icon cards in Step 1 Intake.
 * @returns {string} HTML string.
 */
function getComplaintChipsHtml() {
  const selected = Array.isArray(inspDraft.complaints) ? inspDraft.complaints : [];
  return COMPLAINT_OPTIONS.map((opt) => {
    const isSel = selected.includes(opt);
    const icon = COMPLAINT_ICONS[opt] || "🏍️";
    return `
      <button
        type="button"
        class="symptom-card ${isSel ? 'active' : ''}"
        aria-pressed="${isSel ? 'true' : 'false'}"
        onclick="toggleDraftComplaint('${escHtml(opt)}')"
      >
        ${isSel ? '<span class="symptom-check-badge">✓</span>' : ''}
        <span class="symptom-icon">${icon}</span>
        <span class="symptom-label">${escHtml(opt)}</span>
      </button>
    `;
  }).join("");
}

/**
 * Re-renders only the symptom grid container in Step 1 without disturbing other inputs.
 */
function renderComplaintChips() {
  const wrap = $("insp-complaint-chips-wrap");
  if (wrap) {
    wrap.innerHTML = getComplaintChipsHtml();
  }
}

/**
 * Toggles a customer complaint symptom in the draft complaints array and updates the grid.
 * @param {string} val - Complaint name.
 */
function toggleDraftComplaint(val) {
  if (!Array.isArray(inspDraft.complaints)) {
    inspDraft.complaints = [];
  }
  const idx = inspDraft.complaints.indexOf(val);
  if (idx > -1) {
    inspDraft.complaints.splice(idx, 1);
  } else {
    inspDraft.complaints.push(val);
  }
  renderComplaintChips();
}

/**
 * Computes live physical inspection counts across all 27 items.
 * Unmarked items default to OK.
 * @returns {{ total: 27, checked: 27, ok: number, watch: number, fix: number }}
 */
function getPhysicalInspectionCounts() {
  const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
  let watch = 0;
  let fix = 0;

  INSPECTION_CHECKLIST.forEach((cat) => {
    cat.items.forEach((item) => {
      const stateObj = items[`${cat.key}.${item.key}`];
      if (stateObj) {
        if (stateObj.s === "watch") watch++;
        else if (stateObj.s === "fix") fix++;
      }
    });
  });

  const total = 27;
  const ok = total - (watch + fix);
  return { total, checked: total, ok, watch, fix };
}

/**
 * Returns formatted header text: "27 items · All OK" or "27 items · 2 Fix · 1 Watch".
 * @param {{ total: number, ok: number, watch: number, fix: number }} counts
 * @returns {string}
 */
function getPhysicalCountsSummaryText(counts) {
  if (counts.fix === 0 && counts.watch === 0) {
    return `${counts.total} items · All OK`;
  }
  const parts = [];
  if (counts.fix > 0) parts.push(`${counts.fix} Fix`);
  if (counts.watch > 0) parts.push(`${counts.watch} Watch`);
  return `${counts.total} items · ${parts.join(" · ")}`;
}

/**
 * Computes the set of zone keys flagged by the active customer complaints.
 * @returns {Set<string>}
 */
function getFlaggedInspectionZones() {
  const comp = Array.isArray(inspDraft.complaints) ? inspDraft.complaints : [];
  const set = new Set();
  comp.forEach((c) => {
    const list = COMPLAINT_TO_ZONES[c];
    if (Array.isArray(list)) {
      list.forEach((z) => set.add(z));
    }
  });
  return set;
}

/**
 * Returns customer complaints matching a specific zone key.
 * @param {string} zoneKey
 * @returns {string[]}
 */
function getComplaintsForZone(zoneKey) {
  const comp = Array.isArray(inspDraft.complaints) ? inspDraft.complaints : [];
  return comp.filter((c) => {
    const list = COMPLAINT_TO_ZONES[c];
    return Array.isArray(list) && list.includes(zoneKey);
  });
}

/**
 * Resolves the currently active inspection zone key.
 * Default selected zone: the first flagged zone from complaints, otherwise Front Wheel & Brakes.
 * @returns {string}
 */
function getActiveInspectionZoneKey() {
  if (selectedInspectionZone) {
    const found = INSPECTION_ZONES.find((z) => z.key === selectedInspectionZone);
    if (found) return selectedInspectionZone;
  }
  const flagged = getFlaggedInspectionZones();
  for (const z of INSPECTION_ZONES) {
    if (flagged.has(z.key) && z.key !== "ecu_obd") {
      return z.key;
    }
  }
  return "front_brakes";
}

/**
 * Returns the status color name ("fix" | "watch" | "ok") for a zone.
 * Red if any item is Fix, amber if any is Watch, green otherwise.
 * @param {string} zoneKey
 * @returns {"fix"|"watch"|"ok"}
 */
function getZoneStatus(zoneKey) {
  if (zoneKey === "ecu_obd") {
    const codes = (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.codes) || [];
    return codes.length > 0 ? "fix" : "ok";
  }
  const zone = INSPECTION_ZONES.find((z) => z.key === zoneKey);
  if (!zone) return "ok";
  const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
  let hasFix = false;
  let hasWatch = false;
  zone.items.forEach((it) => {
    const st = items[`${it.catKey}.${it.itKey}`];
    if (st) {
      if (st.s === "fix") hasFix = true;
      else if (st.s === "watch") hasWatch = true;
    }
  });
  if (hasFix) return "fix";
  if (hasWatch) return "watch";
  return "ok";
}

/**
 * Generates an accessible aria-label for a zone button.
 * @param {string} zoneKey
 * @returns {string}
 */
function getZoneAriaLabel(zoneKey) {
  const zone = INSPECTION_ZONES.find((z) => z.key === zoneKey);
  if (!zone) return "";
  if (zoneKey === "ecu_obd") {
    const codes = (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.codes) || [];
    return `ECU and OBD Diagnostic, ${codes.length} codes`;
  }
  const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
  let fixCount = 0;
  let watchCount = 0;
  zone.items.forEach((it) => {
    const st = items[`${it.catKey}.${it.itKey}`];
    if (st) {
      if (st.s === "fix") fixCount++;
      else if (st.s === "watch") watchCount++;
    }
  });
  return `${zone.name} zone, ${fixCount} fix, ${watchCount} watch`;
}

/**
 * Resolves reference price from catalog or uses fallback default price.
 * @param {"labor"|"part"} kind
 * @param {string} name
 * @param {number} defaultPrice
 * @returns {number}
 */
function resolveCannedJobPrice(kind, name, defaultPrice) {
  const q = (name || "").trim().toLowerCase();
  if (kind === "labor") {
    const match = D.sv.find((s) => (s.name || "").toLowerCase() === q);
    if (match && typeof match.labor === "number") return match.labor;
  } else if (kind === "part") {
    const match = D.pt.find((p) => (p.name || "").toLowerCase() === q);
    if (match && typeof match.cost === "number") return match.cost;
  }
  return typeof defaultPrice === "number" ? defaultPrice : 0;
}

/**
 * Displays temporary muted notice when a canned job is added.
 */
function showCannedJobNotice() {
  const toast = $("canned-job-toast");
  if (!toast) return;
  if (cannedJobToastTimer) clearTimeout(cannedJobToastTimer);
  toast.textContent = "Added to Recommended Services below";
  toast.style.display = "block";
  cannedJobToastTimer = setTimeout(() => {
    if (toast) {
      toast.style.display = "none";
      toast.textContent = "";
    }
    cannedJobToastTimer = null;
  }, 1500);
}

/**
 * Adds or removes a canned job package linked to an inspection item.
 * @param {string} catKey
 * @param {string} itKey
 * @param {string} jobLabel
 */
function toggleCannedJob(catKey, itKey, jobLabel) {
  readDiagDomIntoDraft();
  const itemKey = `${catKey}.${itKey}`;
  const jobList = CANNED_JOBS[itemKey] || [];
  const job = jobList.find((j) => j.label === jobLabel);
  if (!job) return;

  const fromId = `${itemKey}|${jobLabel}`;
  if (!Array.isArray(inspDraft.items)) inspDraft.items = [];

  const isAdded = inspDraft.items.some((it) => it.from === fromId);
  if (isAdded) {
    // Remove lines with matching fromId
    inspDraft.items = inspDraft.items.filter((it) => it.from !== fromId);
  } else {
    // Add lines without duplicating
    job.lines.forEach((line) => {
      const price = resolveCannedJobPrice(line.kind, line.name, line.price);
      inspDraft.items.push({
        id: uid(),
        kind: line.kind,
        name: line.name,
        src: "shop",
        qty: 1,
        price: price,
        from: fromId,
        done: false
      });
    });
    showCannedJobNotice();
  }

  // Update zone panel and items table without full page reload
  renderZonePanel();
  renderItemsManager("draft");
}

/**
 * Selects an inspection zone or toggles/scrolls to the OBD drawer.
 * @param {string} zoneKey
 */
function selectInspectionZone(zoneKey) {
  if (zoneKey === "ecu_obd") {
    if (!obdDrawerOpen) {
      toggleObdDrawer();
    }
    const card = $("obd-drawer-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  selectedInspectionZone = zoneKey;
  renderPhysicalInspectionWorkspace();
}

/**
 * Clean inline SVG vector illustration of a side-view motorcycle (~360px wide).
 * @returns {string} HTML string.
 */
function getMotorcycleMapSvgHtml() {
  return `
    <svg class="bike-map-svg" viewBox="0 0 360 210" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="180" cy="186" rx="145" ry="6" fill="#F1F5F9" />
      <circle cx="70" cy="140" r="42" stroke="#94A3B8" stroke-width="8" fill="#F8FAFC" />
      <circle cx="70" cy="140" r="30" stroke="#CBD5E1" stroke-width="2" fill="none" />
      <circle cx="70" cy="140" r="12" fill="#94A3B8" />
      <circle cx="70" cy="140" r="20" stroke="#64748B" stroke-width="2" stroke-dasharray="3 3" fill="none" />
      <circle cx="290" cy="140" r="42" stroke="#94A3B8" stroke-width="8" fill="#F8FAFC" />
      <circle cx="290" cy="140" r="30" stroke="#CBD5E1" stroke-width="2" fill="none" />
      <circle cx="290" cy="140" r="12" fill="#94A3B8" />
      <circle cx="290" cy="140" r="24" stroke="#64748B" stroke-width="3" stroke-dasharray="4 2" fill="none" />
      <rect x="298" y="125" width="10" height="18" rx="3" fill="#DC2626" />
      <path d="M70 140 L135 130" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <path d="M100 135 L135 88" stroke="#D97706" stroke-width="5" stroke-linecap="round" />
      <path d="M108 123 L127 98" stroke="#F59E0B" stroke-width="7" stroke-dasharray="3 4" stroke-linecap="round" />
      <path d="M70 140 L150 142" stroke="#475569" stroke-width="3" stroke-dasharray="5 3" />
      <circle cx="150" cy="142" r="10" fill="#64748B" />
      <path d="M165 140 Q150 162 110 160 L50 148" stroke="#475569" stroke-width="6" stroke-linecap="round" />
      <path d="M85 155 L45 147" stroke="#334155" stroke-width="10" stroke-linecap="round" />
      <rect x="140" y="105" width="62" height="45" rx="10" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3" />
      <line x1="148" y1="116" x2="194" y2="116" stroke="#94A3B8" stroke-width="2" />
      <line x1="148" y1="124" x2="194" y2="124" stroke="#94A3B8" stroke-width="2" />
      <line x1="152" y1="132" x2="190" y2="132" stroke="#94A3B8" stroke-width="2" />
      <circle cx="178" cy="132" r="8" fill="#CBD5E1" stroke="#94A3B8" stroke-width="2" />
      <path d="M135 130 L160 85 L242 54" stroke="#475569" stroke-width="6" stroke-linecap="round" />
      <path d="M160 85 L140 105" stroke="#475569" stroke-width="5" stroke-linecap="round" />
      <path d="M202 105 L242 54" stroke="#475569" stroke-width="5" stroke-linecap="round" />
      <path d="M290 140 L242 54" stroke="#64748B" stroke-width="6" stroke-linecap="round" />
      <path d="M285 140 L238 54" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" />
      <path d="M242 54 L236 36" stroke="#334155" stroke-width="4" stroke-linecap="round" />
      <line x1="228" y1="36" x2="246" y2="38" stroke="#1E293B" stroke-width="5" stroke-linecap="round" />
      <path d="M246 54 L258 56 L254 68 Z" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
      <path d="M180 58 C195 44, 230 46, 240 56 C232 72, 195 76, 180 72 Z" fill="#E2E8F0" stroke="#94A3B8" stroke-width="3" />
      <path d="M115 76 C135 70, 165 70, 182 72 C180 82, 130 84, 115 76 Z" fill="#334155" stroke="#1E293B" stroke-width="2" />
      <path d="M115 76 L75 92 C65 106, 60 115, 58 122" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" />
      <rect x="70" y="88" width="6" height="8" rx="2" fill="#DC2626" />
    </svg>
  `;
}

/**
 * Builds HTML for interactive hotspot buttons overlaid on the bike map.
 * @returns {string}
 */
function getHotspotsHtml() {
  const activeKey = getActiveInspectionZoneKey();
  const flagged = getFlaggedInspectionZones();

  return INSPECTION_ZONES.map((z) => {
    const isActive = activeKey === z.key;
    const isFlagged = flagged.has(z.key);
    const st = getZoneStatus(z.key);

    return `
      <button
        type="button"
        id="hotspot-${z.key}"
        class="bike-hotspot ${isActive ? 'active' : ''} ${isFlagged ? 'flagged' : ''}"
        style="left:${z.pctX}%;top:${z.pctY}%"
        aria-label="${getZoneAriaLabel(z.key)}"
        onclick="selectInspectionZone('${z.key}')"
      >
        <span class="hotspot-dot dot-${st}"></span>
        <span class="hotspot-label">${escHtml(z.name)}</span>
        ${isFlagged ? `<span class="hotspot-flag-badge" title="Customer reported issue">!</span>` : ""}
      </button>
    `;
  }).join("");
}

/**
 * Builds HTML for mobile 2-column zone tile grid (<768px).
 * @returns {string}
 */
function getZoneTilesHtml() {
  const activeKey = getActiveInspectionZoneKey();
  const flagged = getFlaggedInspectionZones();

  return `
    <div class="bike-tiles-grid">
      ${INSPECTION_ZONES.map((z) => {
        const isActive = activeKey === z.key;
        const isFlagged = flagged.has(z.key);
        const st = getZoneStatus(z.key);

        let countText = "All OK";
        if (z.key === "ecu_obd") {
          const codes = (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.codes) || [];
          countText = codes.length > 0 ? `${codes.length} code${codes.length === 1 ? '' : 's'}` : "No codes";
        } else {
          const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
          let fc = 0;
          let wc = 0;
          z.items.forEach((it) => {
            const s = items[`${it.catKey}.${it.itKey}`];
            if (s) {
              if (s.s === "fix") fc++;
              else if (s.s === "watch") wc++;
            }
          });
          if (fc > 0 && wc > 0) countText = `${fc} Fix · ${wc} Watch`;
          else if (fc > 0) countText = `${fc} Fix`;
          else if (wc > 0) countText = `${wc} Watch`;
        }

        return `
          <button
            type="button"
            class="bike-tile-btn ${isActive ? 'active' : ''} ${isFlagged ? 'flagged' : ''}"
            onclick="selectInspectionZone('${z.key}')"
            aria-label="${getZoneAriaLabel(z.key)}"
          >
            <div class="bike-tile-top">
              <span class="bike-tile-icon">${z.icon}</span>
              <div style="display:flex;align-items:center;gap:4px">
                ${isFlagged ? `<span class="hotspot-flag-badge" title="Customer reported">!</span>` : ""}
                <span class="hotspot-dot dot-${st}"></span>
              </div>
            </div>
            <div class="bike-tile-name">${escHtml(z.name)}</div>
            <div class="bike-tile-count">${countText}</div>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

/**
 * Builds HTML for the Right Panel (items belonging to the selected zone).
 * @param {string} [zoneKey]
 * @returns {string}
 */
function getZonePanelHtml(zoneKey) {
  const activeKey = zoneKey || getActiveInspectionZoneKey();
  const zone = INSPECTION_ZONES.find((z) => z.key === activeKey) || INSPECTION_ZONES[0];
  const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
  const complaints = getComplaintsForZone(zone.key);

  const itemsHtml = zone.items.map((it) => {
    const itemKey = `${it.catKey}.${it.itKey}`;
    const stateObj = items[itemKey];
    const curState = stateObj ? stateObj.s : "ok";
    const noteVal = stateObj ? (stateObj.note || "") : "";
    const cannedList = CANNED_JOBS[itemKey] || [];

    return `
      <div class="zone-item-card">
        <div class="zone-item-main">
          <div class="zone-item-label">${escHtml(it.label)}</div>
          <div class="triage-btn-group">
            <button
              type="button"
              class="triage-btn ok ${curState === 'ok' ? 'active' : ''}"
              onclick="setItemInspectionState('${it.catKey}', '${it.itKey}', 'ok')"
            >
              ${curState === 'ok' ? '✓ OK' : 'OK'}
            </button>
            <button
              type="button"
              class="triage-btn watch ${curState === 'watch' ? 'active' : ''}"
              onclick="setItemInspectionState('${it.catKey}', '${it.itKey}', 'watch')"
            >
              Watch
            </button>
            <button
              type="button"
              class="triage-btn fix ${curState === 'fix' ? 'active' : ''}"
              onclick="setItemInspectionState('${it.catKey}', '${it.itKey}', 'fix')"
            >
              Fix
            </button>
          </div>
        </div>

        ${(curState === "watch" || curState === "fix") ? `
          <div class="zone-item-sub">
            <input
              type="text"
              class="phys-item-note"
              placeholder="Describe the fault..."
              value="${escHtml(noteVal)}"
              oninput="updateItemFaultNote('${it.catKey}', '${it.itKey}', this.value)"
            />

            ${cannedList.length > 0 ? `
              <div class="canned-jobs-row">
                <span class="canned-jobs-label">One-tap services:</span>
                ${cannedList.map((job) => {
                  const fromId = `${itemKey}|${job.label}`;
                  const isAdded = (inspDraft.items || []).some((x) => x.from === fromId);
                  return `
                    <button
                      type="button"
                      class="canned-chip ${isAdded ? 'added' : ''}"
                      onclick="toggleCannedJob('${it.catKey}', '${it.itKey}', '${escHtml(job.label)}')"
                    >
                      ${isAdded ? '✓ Added' : '+ ' + escHtml(job.label)}
                    </button>
                  `;
                }).join("")}
              </div>
            ` : ""}
          </div>
        ` : ""}
      </div>
    `;
  }).join("");

  return `
    <div class="zone-panel-header">
      <div style="display:flex;align-items:center">
        <span style="font-size:20px;margin-right:8px">${zone.icon}</span>
        <b style="font-size:14px;color:var(--text-primary)">${escHtml(zone.name)}</b>
      </div>
      <span style="font-size:12px;color:var(--text-muted)">${zone.items.length} items</span>
    </div>

    ${complaints.length > 0 ? `
      <div class="zone-complaint-alert">
        <span>⚠️</span>
        <span>Customer reported: <b>${escHtml(complaints.join(", "))}</b></span>
      </div>
    ` : ""}

    <div class="zone-items-list">
      ${itemsHtml}
    </div>
    <div id="canned-job-toast" class="canned-job-toast" style="display:none" role="status" aria-live="polite"></div>
  `;
}

/**
 * Re-renders only the Zone Panel content.
 */
function renderZonePanel() {
  const panel = $("zone-panel-body");
  if (panel) {
    panel.innerHTML = getZonePanelHtml();
  }
}

/**
 * Re-renders all live parts of the Physical Inspection workspace without reloading inputs.
 */
function renderPhysicalInspectionWorkspace() {
  const railEl = $("phys-rail");
  if (railEl) {
    renderPhysRailButtons();
    renderPhysPanel();
  }
}

/**
 * Toggles the compact OBD drawer open or closed.
 */
function toggleObdDrawer() {
  obdDrawerOpen = !obdDrawerOpen;
  const body = $("obd-drawer-body");
  const chevron = document.querySelector(".obd-drawer-chevron");
  if (body) body.style.display = obdDrawerOpen ? "block" : "none";
  if (chevron) chevron.classList.toggle("open", obdDrawerOpen);
}

/**
 * Generates HTML for the 8 Quick Fault Codes chips in the compact OBD drawer.
 * @returns {string}
 */
function getQuickObdChipsHtml() {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.codes) || [];
  return QUICK_OBD_CODES.map((q) => {
    const isAdded = codes.some((c) => c.code === q.code);
    return `
      <button
        type="button"
        class="quick-code-chip ${isAdded ? 'active' : ''}"
        aria-pressed="${isAdded ? 'true' : 'false'}"
        onclick="toggleQuickObdCode('${q.code}')"
      >
        ${isAdded ? '✓ ' : '+ '}${escHtml(q.label)}
      </button>
    `;
  }).join("");
}

/**
 * Re-renders only the quick OBD chips row.
 */
function renderQuickObdChips() {
  const chipsEl = $("quick-obd-chips");
  if (chipsEl) chipsEl.innerHTML = getQuickObdChipsHtml();
}

/**
 * Toggles a quick fault code into or out of draft OBD codes.
 * @param {string} code
 */
function toggleQuickObdCode(code) {
  readDiagDomIntoDraft();
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.codes) || [];
  if (codes.some((c) => c.code === code)) {
    removeObdCode(code);
  } else {
    addSampleCodeToFindings(code);
  }
  renderQuickObdChips();
  updateHotspotsAndTiles();
}

/**
 * Updates status dots on bike hotspots and tiles.
 */
function updateHotspotsAndTiles() {
  const hotspotsWrap = $("bike-hotspots-wrap");
  if (hotspotsWrap) hotspotsWrap.innerHTML = getHotspotsHtml();
  const tilesWrap = $("bike-tiles-wrap");
  if (tilesWrap) tilesWrap.innerHTML = getZoneTilesHtml();
}

/**
 * Sanitizes inspection draft items for the physical inspection log:
 * - Converts any draft item with state "watch" into "fix" (preserving note).
 * - Removes any draft item with state "ok" (since omitted entry means OK).
 * - Operates strictly on the draft; never touches saved work orders.
 */
function sanitizeInspDraftInspectionItems() {
  if (!inspDraft || !inspDraft.inspection || !inspDraft.inspection.items) return;
  const items = inspDraft.inspection.items;
  Object.keys(items).forEach((k) => {
    const it = items[k];
    if (!it || it.s === "ok") {
      delete items[k];
    } else if (it.s === "watch") {
      it.s = "fix";
    }
  });
}

/**
 * Generates HTML for Step 2 Diagnosis form.
 * Order: MOTORCYCLE card, 1. Setup toggles, Workspace (Interactive Map + Zone panel),
 * Compact OBD drawer, Shared "Add to findings" bar, 4. Final Findings, 5. Recommended Services & Items.
 * @returns {string} HTML string.
 */
function getInspStep2Html() {
  sanitizeInspDraftInspectionItems();
  const insp = inspDraft.inspection;

  return `
    <div class="insp-stage-body">
      <!-- MOTORCYCLE CARD -->
      ${getInspMotorcycleCardHtml()}

      <!-- Card 1. INSPECTION SETUP -->
      <div class="insp-card" style="margin-bottom:16px">
        <div class="insp-diag-card-title">1. INSPECTION SETUP</div>
        <div style="display:flex;gap:20px;flex-wrap:wrap">
          <label class="insp-chk-item" style="border:none;padding:0;background:none">
            <input
              type="checkbox"
              ${insp.enablePhysical ? "checked" : ""}
              onchange="toggleInspectionType('physical', this.checked)"
            />
            <span style="font-weight:600;font-size:14px">Physical Inspection</span>
          </label>
          <label class="insp-chk-item" style="border:none;padding:0;background:none">
            <input
              type="checkbox"
              ${insp.enableObd ? "checked" : ""}
              onchange="toggleInspectionType('obd', this.checked)"
            />
            <span style="font-weight:600;font-size:14px">ECU/OBD Diagnostic</span>
          </label>
        </div>
        ${!insp.enablePhysical && !insp.enableObd ? `
          <div style="font-size:13px;color:var(--text-muted);margin-top:10px">
            Select at least one inspection type to record faults.
          </div>
        ` : ""}
      </div>

      <!-- Card 3: PHYSICAL INSPECTION LOG -->
      ${insp.enablePhysical ? getPhysicalInspectionLogCardHtml() : ""}

      <!-- COMPACT OBD DRAWER CARD (Step 2 Part 3) -->
      ${insp.enableObd ? `
        <div class="insp-card obd-drawer-card" id="obd-drawer-card" style="margin-bottom:16px">
          <div class="obd-drawer-header" onclick="toggleObdDrawer()">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
              <span class="obd-drawer-chevron ${obdDrawerOpen ? 'open' : ''}">▶</span>
              <span class="insp-diag-card-title" style="margin:0">ECU / OBD DIAGNOSTIC (optional)</span>
              <span class="elm-status-pill">● Disconnected</span>
            </div>
            <button type="button" class="btn-elm-pair" onclick="event.stopPropagation(); showObdNotice()">
              ᛒ Pair / Connect
            </button>
          </div>

          <div id="obd-proto-notice" class="obd-proto-notice" style="display:none;margin-top:10px">
            ECU/OBD hardware connection is not available in this prototype yet. You can look up and add fault codes manually.
          </div>

          <div id="obd-drawer-body" style="display:${obdDrawerOpen ? 'block' : 'none'};margin-top:14px;border-top:1px solid var(--border);padding-top:14px">
            <!-- Quick fault codes row -->
            <div style="margin-bottom:14px">
              <div class="obd-field-label" style="margin-bottom:8px">QUICK FAULT CODES <span class="muted-hint">(tap to add/remove)</span></div>
              <div class="quick-obd-chips" id="quick-obd-chips">
                ${getQuickObdChipsHtml()}
              </div>
            </div>

            <!-- Compact Run Scan button -->
            <button type="button" class="btn-elm-scan-compact" id="btn-run-ecu-scan" onclick="runEcuScan()">
              🖲️ Run ECU/OBD Scan
            </button>

            <!-- Scan Results Area -->
            <div id="obd-scan-results-wrap" aria-live="polite">
              ${getObdScanResultsAreaHtml()}
            </div>

            <!-- Added Codes List -->
            <div id="obd-added-codes" class="obd-codes-list">
              ${getObdAddedCodesHtml()}
            </div>

            <!-- Decision support notice -->
            <div class="obd-notice-box" style="margin-top:14px">
              <span style="font-size:16px">ℹ️</span>
              <span>Diagnostic outputs are for reference and decision support only. Final diagnosis requires mechanic verification.</span>
            </div>
          </div>
        </div>
      ` : ""}

      <!-- Shared Add to Findings Bar -->
      ${getSharedAddToFindingsBarHtml()}

      <!-- Card 4. FINAL FINDINGS & DIAGNOSIS VERIFICATION -->
      <div class="insp-card" style="margin-bottom:16px">
        <div class="insp-diag-card-title">4. FINAL FINDINGS &amp; DIAGNOSIS VERIFICATION</div>
        <p style="font-size:12px;color:var(--text-muted);margin:-8px 0 12px">
          Codes you add from the scan appear here. Review, edit, and add anything else to finalize the diagnosis.
        </p>
        <div class="insp-field-group" style="margin-bottom:0">
          <label for="insp-diag-findings">Findings / Mechanic Notes (optional)</label>
          <textarea
            id="insp-diag-findings"
            rows="3"
            placeholder="Describe technician findings, parts to replace, or issues identified..."
            oninput="inspDraft.findings=this.value; autoGrowTextarea(this); updateSharedAddToFindingsBar();"
          >${escHtml(inspDraft.findings)}</textarea>
        </div>
      </div>

      <!-- Card 5. RECOMMENDED SERVICES & ITEMS TO ALLOCATE -->
      <div class="insp-card" id="insp-services-card" style="margin-bottom:16px">
        <div class="insp-diag-card-title">5. RECOMMENDED SERVICES &amp; ITEMS TO ALLOCATE</div>
        <p style="font-size:12px;color:var(--text-muted);margin:-8px 0 12px">
          List the labor and items for this job. This is a price list, not inventory.
        </p>
        <div id="draft-items-container">
          ${getItemsBuilderHtml("draft", { readOnly: false, showLaborDone: false })}
        </div>
      </div>

      <!-- Footer Buttons -->
      <div class="insp-footer" style="position:static;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:space-between">
        <button type="button" class="btn g" onclick="setInspDraftStep(1)">← Back</button>
        <button type="button" class="btn" onclick="setInspDraftStep(3)">Next: Confirmation →</button>
      </div>
    </div>
  `;
}

/**
 * Toggles Physical or ECU/OBD inspection cards in Step 2.
 * @param {string} type - "physical" or "obd".
 * @param {boolean} checked - True if enabled.
 */
function toggleInspectionType(type, checked) {
  readDiagDomIntoDraft();
  if (type === "physical") {
    inspDraft.inspection.enablePhysical = checked;
  } else if (type === "obd") {
    inspDraft.inspection.enableObd = checked;
  }
  const mainEl = $("main");
  if (mainEl && view === "insp") mainEl.innerHTML = R.insp();
}

/**
 * Displays the inline prototype message when Pair or Run Scan are clicked.
 */
function showObdNotice() {
  const el = $("obd-proto-notice");
  if (el) {
    el.style.display = "block";
  }
}

/**
 * Ensures the OBD scanner motorcycle selection object is initialized.
 * Prefills from inspDraft when not yet set.
 * @returns {Object} The bike selection object.
 */
function initObdScanDraft() {
  if (!inspDraft.inspection) {
    inspDraft.inspection = {
      enablePhysical: true,
      enableObd: true,
      obd: { codes: [], bike: null },
      items: {},
      expandedCats: {}
    };
  }
  if (!inspDraft.inspection.obd) {
    inspDraft.inspection.obd = { codes: [], bike: null };
  }

  let bike = inspDraft.inspection.obd.bike;
  const makeTrim = (inspDraft.make || "").trim();
  const modelTrim = (inspDraft.model || "").trim();
  const plateTrim = (inspDraft.plate || "").trim();

  if (!bike) {
    let brand = "";
    let otherBrand = "";
    if (makeTrim) {
      const match = OBD_BRANDS.find((b) => b.toLowerCase() === makeTrim.toLowerCase());
      if (match) {
        brand = match;
      } else {
        brand = "Other";
        otherBrand = makeTrim;
      }
    }
    bike = {
      mode: "select",
      brand: brand,
      otherBrand: otherBrand,
      model: modelTrim,
      plate: plateTrim
    };
    inspDraft.inspection.obd.bike = bike;
  } else {
    if (bike.mode === "select") {
      if (!bike.brand && !bike.otherBrand && makeTrim) {
        const match = OBD_BRANDS.find((b) => b.toLowerCase() === makeTrim.toLowerCase());
        if (match) {
          bike.brand = match;
        } else {
          bike.brand = "Other";
          bike.otherBrand = makeTrim;
        }
      }
      if (!bike.model && modelTrim) {
        bike.model = modelTrim;
      }
      if (!bike.plate && plateTrim) {
        bike.plate = plateTrim;
      }
    }
  }

  return bike;
}

/**
 * Computes the reference string for the ECU card subtitle.
 * @returns {string} Reference string.
 */
function getObdReferenceText() {
  const bike = inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.bike;
  if (bike) {
    if (bike.mode === "anon") {
      return "Anonymous";
    }
    const brand = bike.brand === "Other" ? (bike.otherBrand || "").trim() : (bike.brand || "").trim();
    const model = (bike.model || "").trim();
    const combined = [brand, model].filter(Boolean).join(" ");
    if (combined) return combined;
    if (bike.mode === "select" && !brand && !model) {
      return "Unknown";
    }
  }
  const intakeCombined = [inspDraft.make, inspDraft.model].filter(Boolean).join(" ");
  return intakeCombined || "Unknown";
}

/**
 * Copies non-empty scanner motorcycle values into empty Intake draft fields.
 * Never overwrites already filled Intake fields.
 */
function syncObdBikeToIntake() {
  const bike = inspDraft.inspection && inspDraft.inspection.obd && inspDraft.inspection.obd.bike;
  if (!bike || bike.mode === "anon") return;

  const brandVal = bike.brand === "Other" ? (bike.otherBrand || "").trim() : (bike.brand || "").trim();
  const modelVal = (bike.model || "").trim();
  const plateVal = (bike.plate || "").trim();

  if (!inspDraft.make && brandVal) {
    inspDraft.make = brandVal;
    const inp = $("insp-make");
    if (inp && !inp.value) inp.value = brandVal;
  }
  if (!inspDraft.model && modelVal) {
    inspDraft.model = modelVal;
    const inp = $("insp-model");
    if (inp && !inp.value) inp.value = modelVal;
  }
  if (!inspDraft.plate && plateVal) {
    inspDraft.plate = plateVal;
    const inp = $("insp-plate");
    if (inp && !inp.value) inp.value = plateVal;
  }
}

/**
 * Updates the live Reference text in Card 2 ECU / OBD DIAGNOSTIC.
 */
function updateObdReferenceSubtitle() {
  const subEl = $("ecu-reference-sub");
  if (subEl) {
    subEl.textContent = `Reference: ${getObdReferenceText()}`;
  }
}

/**
 * Generates HTML for the Motorcycle selection card in Step 2 Diagnosis.
 * Rendered inline as the first card on the page.
 * @returns {string} HTML string.
 */
function getInspMotorcycleCardHtml() {
  const bike = initObdScanDraft();
  const isSelect = bike.mode !== "anon";
  const isOther = bike.brand === "Other";

  const chipsHtml = [...OBD_BRANDS, "Other"].map((b) => {
    const isSelected = bike.brand === b;
    return `
      <button
        type="button"
        class="obd-brand-chip ${isSelected ? "active" : ""}"
        data-brand="${escHtml(b)}"
        aria-pressed="${isSelected ? "true" : "false"}"
        onclick="selectObdScanBrand('${escHtml(b)}')"
      >
        ${escHtml(b)}
      </button>
    `;
  }).join("");

  return `
    <!-- MOTORCYCLE CARD -->
    <div class="insp-card" style="margin-bottom:16px">
      <div class="insp-diag-card-title">MOTORCYCLE</div>
      <p style="font-size:12px;color:var(--text-muted);margin:-8px 0 12px">
        Select the motorcycle you are scanning. This also fills the Reference line below.
      </p>

      <!-- Segmented Toggle -->
      <div class="obd-seg-track" role="tablist" aria-label="Motorcycle Selection Mode">
        <button
          type="button"
          role="tab"
          id="obd-tab-select"
          class="obd-seg-btn ${isSelect ? "active" : ""}"
          aria-selected="${isSelect ? "true" : "false"}"
          onclick="setObdScanMode('select')"
        >
          Select Motorcycle
        </button>
        <button
          type="button"
          role="tab"
          id="obd-tab-anon"
          class="obd-seg-btn ${!isSelect ? "active" : ""}"
          aria-selected="${!isSelect ? "true" : "false"}"
          onclick="setObdScanMode('anon')"
        >
          Walk-in / Anonymous
        </button>
      </div>

      <div class="obd-divider"></div>

      <!-- MODE: Select Motorcycle -->
      <div id="obd-mode-select-wrap" style="display:${isSelect ? "block" : "none"}">
        <div class="obd-field-label">BRAND <span class="muted-hint">(tap one)</span></div>
        <div class="obd-brand-chips" id="obd-brand-chips" role="group" aria-label="Motorcycle Brand">
          ${chipsHtml}
        </div>

        <!-- Brand Name input for Other -->
        <div id="obd-brand-other-wrap" style="display:${isOther ? "block" : "none"};margin-bottom:14px">
          <label class="obd-field-label" for="obd-other-brand-input">BRAND NAME</label>
          <input
            type="text"
            id="obd-other-brand-input"
            class="obd-input"
            placeholder="e.g. exact brand"
            value="${escHtml(bike.otherBrand || "")}"
            oninput="updateObdScanOtherBrand(this.value)"
          />
          <div class="obd-helper-text">Please type the exact brand so it can be recorded correctly.</div>
        </div>

        <!-- Side-by-side Model & Plate fields -->
        <div class="obd-fields-row">
          <div class="obd-field-col">
            <label class="obd-field-label" for="obd-model-input">
              MODEL <span class="muted-hint">(optional)</span>
            </label>
            <input
              type="text"
              id="obd-model-input"
              class="obd-input"
              placeholder="${isOther ? "e.g. exact model" : "e.g. model name"}"
              value="${escHtml(bike.model || "")}"
              oninput="updateObdScanModel(this.value)"
            />
          </div>
          <div class="obd-field-col">
            <label class="obd-field-label" for="obd-plate-input">
              PLATE NUMBER <span class="muted-hint">(optional)</span>
            </label>
            <input
              type="text"
              id="obd-plate-input"
              class="obd-input"
              placeholder="ABC 123"
              value="${escHtml(bike.plate || "")}"
              oninput="this.value = this.value.toUpperCase(); updateObdScanPlate(this.value)"
            />
          </div>
        </div>
      </div>

      <!-- MODE: Walk-in / Anonymous -->
      <div id="obd-mode-anon-wrap" style="display:${!isSelect ? "block" : "none"}">
        <div class="obd-anon-note">This scan won't be linked to a specific motorcycle.</div>
      </div>
    </div>
  `;
}

/**
 * Sets the motorcycle selection mode ('select' or 'anon').
 * @param {'select'|'anon'} mode
 */
function setObdScanMode(mode) {
  const bike = initObdScanDraft();
  bike.mode = mode;
  const isSelect = mode !== "anon";

  const tabSelect = $("obd-tab-select");
  const tabAnon = $("obd-tab-anon");
  const wrapSelect = $("obd-mode-select-wrap");
  const wrapAnon = $("obd-mode-anon-wrap");

  if (tabSelect) {
    tabSelect.classList.toggle("active", isSelect);
    tabSelect.setAttribute("aria-selected", isSelect ? "true" : "false");
  }
  if (tabAnon) {
    tabAnon.classList.toggle("active", !isSelect);
    tabAnon.setAttribute("aria-selected", !isSelect ? "true" : "false");
  }
  if (wrapSelect) wrapSelect.style.display = isSelect ? "block" : "none";
  if (wrapAnon) wrapAnon.style.display = !isSelect ? "block" : "none";

  syncObdBikeToIntake();
  updateObdReferenceSubtitle();
}

/**
 * Handles tapping a brand chip. Tapping active chip clears it.
 * @param {string} brand
 */
function selectObdScanBrand(brand) {
  const bike = initObdScanDraft();
  if (bike.brand === brand) {
    bike.brand = "";
  } else {
    bike.brand = brand;
  }

  const chips = document.querySelectorAll("#obd-brand-chips .obd-brand-chip");
  chips.forEach((c) => {
    const isAct = c.getAttribute("data-brand") === bike.brand;
    c.classList.toggle("active", isAct);
    c.setAttribute("aria-pressed", isAct ? "true" : "false");
  });

  const otherWrap = $("obd-brand-other-wrap");
  const isOther = bike.brand === "Other";
  if (otherWrap) {
    otherWrap.style.display = isOther ? "block" : "none";
    if (isOther) {
      const otherInp = $("obd-other-brand-input");
      if (otherInp) otherInp.focus();
    }
  }

  const modelInp = $("obd-model-input");
  if (modelInp) {
    modelInp.placeholder = isOther ? "e.g. exact model" : "e.g. model name";
  }

  syncObdBikeToIntake();
  updateObdReferenceSubtitle();
}

/**
 * Handles typing in the "Other" Brand Name input.
 * @param {string} val
 */
function updateObdScanOtherBrand(val) {
  const bike = initObdScanDraft();
  bike.otherBrand = val;
  syncObdBikeToIntake();
  updateObdReferenceSubtitle();
}

/**
 * Handles typing in the Model input.
 * @param {string} val
 */
function updateObdScanModel(val) {
  const bike = initObdScanDraft();
  bike.model = val;
  syncObdBikeToIntake();
  updateObdReferenceSubtitle();
}

/**
 * Handles typing in the Plate input.
 * @param {string} val
 */
function updateObdScanPlate(val) {
  const bike = initObdScanDraft();
  bike.plate = (val || "").toUpperCase();
  syncObdBikeToIntake();
}

/**
 * Picks random fault code entries from ECU_SAMPLES using Fisher-Yates shuffle.
 * @param {number} [count=4] Number of sample items to pick.
 * @returns {Array<Object>} Shuffled sample objects without duplicates.
 */
function pickRandomEcuSamples(count = 4) {
  if (!Array.isArray(ECU_SAMPLES) || ECU_SAMPLES.length === 0) return [];
  const pool = [...ECU_SAMPLES];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

/**
 * Simulates an ECU/OBD scan for fault codes.
 * Plays a ~1.2s spinner animation, then selects 4 random sample faults.
 */
function runEcuScan() {
  if (isObdScanning) return;
  isObdScanning = true;

  const btn = $("btn-run-ecu-scan");
  if (btn) {
    btn.innerHTML = `<span class="obd-spinner"></span> Scanning...`;
  }

  setTimeout(() => {
    isObdScanning = false;
    const b = $("btn-run-ecu-scan");
    if (b) {
      b.innerHTML = `🖲️ Run ECU/OBD Scan`;
    }
    obdScanResults = pickRandomEcuSamples(4);
    renderObdScanResultsArea();
    updateSharedAddToFindingsBar();
  }, 1200);
}

/**
 * Generates HTML for the OBD scan results area.
 * Displays placeholder when no scan has been run, or 4 result cards.
 * @returns {string} HTML string.
 */
function getObdScanResultsAreaHtml() {
  if (!obdScanResults || obdScanResults.length === 0) {
    return `<div class="obd-no-scan-placeholder">No scan yet. Press Run ECU/OBD Scan to read fault codes.</div>`;
  }

  const addedCodes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];

  const cardsHtml = obdScanResults.map((item) => {
    const isAdded = addedCodes.some((c) => c.code === item.code);
    const otherCodes = Array.isArray(item.dtc) ? item.dtc.filter((c) => c !== item.code) : [];

    return `
      <div class="obd-result-card">
        <div>
          <div class="obd-card-top-row">
            <div class="obd-card-pills-row">
              <span class="obd-primary-code-pill">${escHtml(item.code)}</span>
              ${item.err ? `<span class="obd-err-code-pill">${escHtml(item.err)}</span>` : ""}
              ${otherCodes.length > 0 ? `<span class="obd-also-dtc">Also: ${escHtml(otherCodes.join(", "))}</span>` : ""}
            </div>
            <div class="obd-card-action">
              ${isAdded ? `
                <span class="obd-btn-added" role="status" aria-label="Fault code added to findings">✓ Added</span>
                <div class="obd-added-hint">Added to Final Findings below</div>
              ` : `
                <button type="button" class="obd-btn-add" onclick="addSampleCodeToFindings('${escHtml(item.code)}')">
                  Add to findings
                </button>
              `}
            </div>
          </div>

          <div class="obd-card-part">${escHtml(item.part || "")}</div>
          <div class="obd-card-desc">${escHtml(item.desc || "")}</div>

          ${Array.isArray(item.checks) && item.checks.length > 0 ? `
            <div class="obd-card-section">
              <div class="obd-card-section-label">Verification:</div>
              <ul class="obd-card-checks-list">
                ${item.checks.map((chk) => `<li>${escHtml(chk)}</li>`).join("")}
              </ul>
            </div>
          ` : ""}

          ${Array.isArray(item.parts) && item.parts.length > 0 ? `
            <div class="obd-card-section" style="margin-top:8px">
              <div class="obd-card-section-label">Suggested parts:</div>
              <div class="obd-card-parts-chips">
                ${item.parts.map((pt) => `<span class="obd-part-chip">${escHtml(pt)}</span>`).join("")}
              </div>
            </div>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");

  return `
    <div class="obd-results-header">
      <div class="obd-results-title">SCAN RESULTS (${obdScanResults.length} faults found)</div>
      <div class="obd-results-sub">Sample data · Yamaha Sniper 150 V2 · simulated scan</div>
    </div>
    <div class="obd-results-grid">
      ${cardsHtml}
    </div>
  `;
}

/**
 * Re-renders only the scan results area.
 */
function renderObdScanResultsArea() {
  const container = $("obd-scan-results-wrap");
  if (container) {
    container.innerHTML = getObdScanResultsAreaHtml();
  }
}

/**
 * Generates HTML for the list of added OBD fault codes.
 * @returns {string} HTML string.
 */
function getObdAddedCodesHtml() {
  const obdCodes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  if (obdCodes.length === 0) return "";

  return obdCodes.map((c) => {
    const label = c.part && !c.desc.startsWith(c.part) ? `${c.part}: ${c.desc}` : (c.desc || "");
    return `
      <div class="obd-code-pill">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <b>${escHtml(c.code)}</b>
          ${c.err ? `<span class="obd-err-code-pill" style="font-size:11px;padding:1px 6px">${escHtml(c.err)}</span>` : ""}
          <span>· ${escHtml(label)}</span>
        </div>
        <button type="button" class="btn g sm" onclick="removeObdCode('${escHtml(c.code)}')" style="padding:2px 8px;font-size:12px;min-height:32px" title="Remove code">✕</button>
      </div>
    `;
  }).join("");
}

/**
 * Re-renders only the added-codes list without re-rendering the whole page.
 */
function renderObdAddedCodes() {
  const container = $("obd-added-codes");
  if (container) {
    container.innerHTML = getObdAddedCodesHtml();
  }
}

/**
 * Formats a scan result fault code entry for auto-insertion into the findings text box.
 * Format:
 * Code [(err)] - Component: Description
 * Verify: check1; check2
 * @param {Object} item - Scan fault code object.
 * @returns {string} Plain text entry block.
 */
function formatObdFindingText(item) {
  const codePart = item.code || "";
  const errPart = item.err ? ` (${item.err})` : "";
  const component = item.part || "";
  let desc = item.desc || "";
  if (component && desc.startsWith(component + ": ")) {
    desc = desc.slice(component.length + 2).trim();
  }

  let line1 = `${codePart}${errPart}`;
  if (component && desc) {
    line1 += ` - ${component}: ${desc}`;
  } else if (component) {
    line1 += ` - ${component}`;
  } else if (desc) {
    line1 += ` - ${desc}`;
  }

  let line2 = "";
  if (Array.isArray(item.checks) && item.checks.length > 0) {
    const cleanChecks = item.checks.map((c, i, arr) => {
      let s = String(c).trim();
      if (i < arr.length - 1) {
        s = s.replace(/\.+$/, "");
      }
      return s;
    }).filter(Boolean);
    if (cleanChecks.length > 0) {
      line2 = `\nVerify: ${cleanChecks.join("; ")}`;
    }
  }

  return `${line1}${line2}`;
}

/**
 * Adds an ECU sample fault code to the findings list and automatically appends to the findings textarea.
 * Updates draft.inspection.obd.codes, writes entry into draft.findings, highlights textarea, and updates results UI.
 * @param {string} code - Primary fault code.
 */
function addSampleCodeToFindings(code) {
  readDiagDomIntoDraft();
  if (!inspDraft.inspection) {
    inspDraft.inspection = { enablePhysical: true, enableObd: true, obd: { codes: [] } };
  }
  if (!inspDraft.inspection.obd) {
    inspDraft.inspection.obd = { codes: [] };
  }
  if (!Array.isArray(inspDraft.inspection.obd.codes)) {
    inspDraft.inspection.obd.codes = [];
  }

  let item = (Array.isArray(obdScanResults) ? obdScanResults.find((s) => s.code === code) : null)
    || (Array.isArray(ECU_SAMPLES) ? ECU_SAMPLES.find((s) => s.code === code) : null);

  if (!inspDraft.inspection.obd.codes.some((x) => x.code === code)) {
    if (item) {
      inspDraft.inspection.obd.codes.push({
        code: item.code,
        desc: `${item.part}: ${item.desc}`,
        part: item.part,
        err: item.err,
        checks: Array.isArray(item.checks) ? [...item.checks] : [],
        parts: Array.isArray(item.parts) ? [...item.parts] : []
      });
    }
  }

  if (item) {
    const entryText = formatObdFindingText(item);
    obdFindingText[code] = entryText;

    const ta = $("insp-diag-findings");
    const curVal = ta ? ta.value : (inspDraft.findings || "");

    // Only append if that code's entry is not already in the text
    if (!curVal.includes(entryText)) {
      const headingNeeded = !curVal.includes("ECU/OBD SCAN");
      const blockToInsert = headingNeeded ? `ECU/OBD SCAN\n${entryText}` : entryText;

      let newVal = curVal;
      if (!newVal.trim()) {
        newVal = blockToInsert;
      } else {
        if (newVal.endsWith("\n\n")) {
          newVal += blockToInsert;
        } else if (newVal.endsWith("\n")) {
          newVal += "\n" + blockToInsert;
        } else {
          newVal += "\n\n" + blockToInsert;
        }
      }

      if (ta) {
        ta.value = newVal;
        autoGrowTextarea(ta);
      }
      inspDraft.findings = newVal;
    }

    // Briefly highlight the textarea border (green for ~1.5 seconds)
    if (ta) {
      ta.classList.add("ta-highlight-green");
      if (taHighlightTimer) clearTimeout(taHighlightTimer);
      taHighlightTimer = setTimeout(() => {
        if (ta) ta.classList.remove("ta-highlight-green");
        taHighlightTimer = null;
      }, 1500);
    }
  }

  renderObdScanResultsArea();
  renderObdAddedCodes();
  renderQuickObdChips();
  updateHotspotsAndTiles();
  updateSharedAddToFindingsBar();
}

/**
 * Removes an exact, untouched auto-inserted entry block from text.
 * Returns the cleaned text, or null if the entry was modified or not found as an intact block.
 * @param {string} text - Current findings text.
 * @param {string} inserted - Exact entry text originally inserted.
 * @returns {string|null} Cleaned text or null if entry was modified.
 */
function removeExactInsertedEntry(text, inserted) {
  if (!text || !inserted) return null;
  const escaped = inserted.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(^|\\n\\n|\\n)${escaped}(?=\\n\\n|\\n|$)`);
  if (!regex.test(text)) {
    return null;
  }
  if (text.includes("\n\n" + inserted)) {
    return text.replace("\n\n" + inserted, "").trim();
  }
  if (text.includes(inserted + "\n\n")) {
    return text.replace(inserted + "\n\n", "").trim();
  }
  if (text.includes("\n" + inserted)) {
    return text.replace("\n" + inserted, "").trim();
  }
  if (text.includes(inserted + "\n")) {
    return text.replace(inserted + "\n", "").trim();
  }
  return text.replace(inserted, "").trim();
}

/**
 * Removes an OBD code from the findings list and removes its untouched auto-inserted entry from the textarea.
 * @param {string} code - Fault code.
 */
function removeObdCode(code) {
  readDiagDomIntoDraft();
  if (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes)) {
    inspDraft.inspection.obd.codes = inspDraft.inspection.obd.codes.filter((x) => x.code !== code);
  }

  // Remove that code's auto-inserted entry from the textarea ONLY if still exactly as inserted
  const inserted = obdFindingText[code];
  if (inserted) {
    const ta = $("insp-diag-findings");
    const curVal = ta ? ta.value : (inspDraft.findings || "");
    const cleaned = removeExactInsertedEntry(curVal, inserted);
    if (cleaned !== null) {
      let finalVal = cleaned;
      if (finalVal.trim() === "ECU/OBD SCAN") {
        finalVal = "";
      }
      if (ta) {
        ta.value = finalVal;
        autoGrowTextarea(ta);
      }
      inspDraft.findings = finalVal;
    }
    delete obdFindingText[code];
  }

  renderObdScanResultsArea();
  renderObdAddedCodes();
  updateSharedAddToFindingsBar();
}

/**
 * Formats a physical inspection fault entry for insertion into findings.
 * Format is strictly:
 * [FIX] Category - Item label: {note, or "No note"}
 * @param {string} catName - Category display name.
 * @param {string} itemLabel - Checklist item label.
 * @param {string} [state="fix"] - Action state.
 * @param {string} [note] - Optional technician fault note.
 * @returns {string} Formatted entry text block.
 */
function formatPhysicalFindingText(catName, itemLabel, state, note) {
  const cleanNote = typeof note === "string" && note.trim().length > 0 ? note.trim() : "No note";
  return `[FIX] ${catName} - ${itemLabel}: ${cleanNote}`;
}

/**
 * Calculates counts of pending findings waiting to be added to the findings box.
 * Only includes scan results not yet added to draft.inspection.obd.codes,
 * and physical items (Fix) whose current entry differs from physFindingText and is not in text.
 * @returns {{ scan: number, physical: number, total: number }} Pending findings counts.
 */
function getPendingFindingsCounts() {
  const f = $("insp-diag-findings");
  const curVal = f ? f.value : (inspDraft.findings || "");

  // Scan items count
  let scanCount = 0;
  const addedCodes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  if (inspDraft.inspection && inspDraft.inspection.enableObd && Array.isArray(obdScanResults)) {
    obdScanResults.forEach((s) => {
      if (!addedCodes.some((c) => c.code === s.code)) {
        scanCount++;
      }
    });
  }

  // Physical items count: counts Fix items not yet added
  let physCount = 0;
  if (inspDraft.inspection && inspDraft.inspection.enablePhysical && inspDraft.inspection.items) {
    INSPECTION_CHECKLIST.forEach((cat) => {
      cat.items.forEach((it) => {
        const itemKey = `${cat.key}.${it.key}`;
        const stateObj = inspDraft.inspection.items[itemKey];
        if (stateObj && (stateObj.s === "fix" || stateObj.s === "watch")) {
          const curS = "fix";
          const curNote = (typeof stateObj.note === "string") ? stateObj.note.trim() : "";
          const inserted = physFindingText[itemKey];
          const isAdded = inserted && typeof inserted === "object" && inserted.s === curS && (inserted.note || "").trim() === curNote;
          if (!isAdded) {
            physCount++;
          }
        }
      });
    });
  }

  return { scan: scanCount, physical: physCount, total: scanCount + physCount };
}

/**
 * Formats the summary line for the shared "Add to findings" bar.
 * Handles singular and plural rules correctly.
 * @param {{ scan: number, physical: number, total: number }} counts
 * @returns {string} Summary string.
 */
function getSharedFindingsSummaryText(counts) {
  const scanCount = counts.scan;
  const physCount = counts.physical;

  if (scanCount === 0 && physCount === 0) {
    return "Nothing new to add yet.";
  }

  const scanPart = scanCount > 0 ? `${scanCount} scan result${scanCount === 1 ? "" : "s"}` : "";
  const physPart = physCount > 0 ? `${physCount} inspection fault${physCount === 1 ? "" : "s"}` : "";

  if (scanCount > 0 && physCount > 0) {
    return `${scanPart} and ${physPart} ready to add`;
  }
  if (scanCount > 0) {
    return `${scanPart} ready to add`;
  }
  return `${physPart} ready to add`;
}

/**
 * Generates the HTML for the shared "Add to findings" bar placed between cards 2/3 and card 4.
 * Never disabled. Visible focus outline, responsive, aria-live polite.
 * @returns {string} HTML string.
 */
function getSharedAddToFindingsBarHtml() {
  const counts = getPendingFindingsCounts();
  const summaryText = getSharedFindingsSummaryText(counts);

  return `
    <div class="insp-shared-add-bar" id="insp-shared-add-bar" style="margin-bottom:16px">
      <div class="insp-shared-add-summary-wrap">
        <div class="insp-shared-summary-text" id="insp-shared-summary-text" aria-live="polite">
          ${escHtml(summaryText)}
        </div>
        <div class="insp-shared-feedback" id="insp-shared-feedback" aria-live="polite" style="display:none"></div>
      </div>
      <button
        type="button"
        class="insp-shared-add-btn"
        id="btn-insp-shared-add"
        onclick="addSharedResultsToFindings()"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px" aria-hidden="true">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <line x1="12" y1="11" x2="12" y2="17"></line>
          <line x1="9" y1="14" x2="15" y2="14"></line>
        </svg>
        <span>Add to findings</span>
      </button>
    </div>
  `;
}

/**
 * Updates the summary text in the shared "Add to findings" bar without full re-render.
 */
function updateSharedAddToFindingsBar() {
  const summaryEl = $("insp-shared-summary-text");
  if (!summaryEl) return;
  const counts = getPendingFindingsCounts();
  summaryEl.textContent = getSharedFindingsSummaryText(counts);
}

/**
 * Displays temporary feedback text inside the shared bar with polite screen-reader announcement.
 * @param {string} msg - Message to display.
 * @param {number} [duration=2000] - Duration in milliseconds.
 */
function showSharedBarFeedback(msg, duration = 2000) {
  const fbEl = $("insp-shared-feedback");
  if (!fbEl) return;
  if (sharedBarFeedbackTimer) {
    clearTimeout(sharedBarFeedbackTimer);
    sharedBarFeedbackTimer = null;
  }
  fbEl.textContent = msg;
  fbEl.style.display = "block";
  sharedBarFeedbackTimer = setTimeout(() => {
    if (fbEl) {
      fbEl.style.display = "none";
      fbEl.textContent = "";
    }
    sharedBarFeedbackTimer = null;
  }, duration);
}

/**
 * Adds unadded scan results and physical inspection faults into the findings textarea.
 * Order:
 * 1. ECU/OBD scan results (with "ECU/OBD SCAN" heading if not already in text)
 * 2. Physical faults: Fix items first, then Watch items, in category order (with "PHYSICAL INSPECTION" heading if not in text)
 * Never overwrites mechanic text, checks duplicates, updates UI live without full re-render.
 */
function addSharedResultsToFindings() {
  readDiagDomIntoDraft();

  const ta = $("insp-diag-findings");
  let curVal = ta ? ta.value : (inspDraft.findings || "");

  if (!inspDraft.inspection) {
    inspDraft.inspection = { enablePhysical: true, enableObd: true, obd: { codes: [] }, items: {} };
  }
  if (!inspDraft.inspection.obd) {
    inspDraft.inspection.obd = { codes: [] };
  }
  if (!Array.isArray(inspDraft.inspection.obd.codes)) {
    inspDraft.inspection.obd.codes = [];
  }
  if (!inspDraft.inspection.items) {
    inspDraft.inspection.items = {};
  }

  // Gather pending scan items
  const addedCodes = inspDraft.inspection.obd.codes;
  const pendingScanItems = (inspDraft.inspection.enableObd && Array.isArray(obdScanResults))
    ? obdScanResults.filter((s) => !addedCodes.some((c) => c.code === s.code))
    : [];

  // Gather pending physical items: Fix items in category order
  const pendingPhysItems = [];
  if (inspDraft.inspection.enablePhysical && inspDraft.inspection.items) {
    INSPECTION_CHECKLIST.forEach((cat) => {
      cat.items.forEach((it) => {
        const itemKey = `${cat.key}.${it.key}`;
        const stateObj = inspDraft.inspection.items[itemKey];
        if (stateObj && (stateObj.s === "fix" || stateObj.s === "watch")) {
          stateObj.s = "fix"; // Normalize
          const curS = "fix";
          const curNote = (typeof stateObj.note === "string") ? stateObj.note.trim() : "";
          const inserted = physFindingText[itemKey];
          const isAdded = inserted && typeof inserted === "object" && inserted.s === curS && (inserted.note || "").trim() === curNote;
          if (!isAdded) {
            const entry = formatPhysicalFindingText(cat.name, it.label, curS, curNote);
            pendingPhysItems.push({ catKey: cat.key, itKey: it.key, itemKey, entry, s: curS, note: curNote });
          }
        }
      });
    });
  }

  // If nothing is waiting to be added
  if (pendingScanItems.length === 0 && pendingPhysItems.length === 0) {
    showSharedBarFeedback("Nothing new to add.", 2000);
    return;
  }

  // Build blocks to append
  let textToAppend = "";

  // 1. Scan results
  if (pendingScanItems.length > 0) {
    const scanBlocks = [];
    pendingScanItems.forEach((item) => {
      // Add to draft codes
      inspDraft.inspection.obd.codes.push({
        code: item.code,
        desc: `${item.part}: ${item.desc}`,
        part: item.part,
        err: item.err,
        checks: Array.isArray(item.checks) ? [...item.checks] : [],
        parts: Array.isArray(item.parts) ? [...item.parts] : []
      });
      const entryText = formatObdFindingText(item);
      obdFindingText[item.code] = entryText;
      if (!curVal.includes(entryText)) {
        scanBlocks.push(entryText);
      }
    });

    if (scanBlocks.length > 0) {
      const headingNeeded = !curVal.includes("ECU/OBD SCAN");
      if (headingNeeded) {
        textToAppend += (textToAppend ? "\n\n" : "") + "ECU/OBD SCAN\n" + scanBlocks.join("\n\n");
      } else {
        textToAppend += (textToAppend ? "\n\n" : "") + scanBlocks.join("\n\n");
      }
    }
  }

  // 2. Physical faults
  if (pendingPhysItems.length > 0) {
    const physBlocks = [];
    pendingPhysItems.forEach((p) => {
      physFindingText[p.itemKey] = { s: p.s, note: p.note };
      if (!curVal.includes(p.entry)) {
        physBlocks.push(p.entry);
      }
    });

    if (physBlocks.length > 0) {
      const headingNeeded = !curVal.includes("PHYSICAL INSPECTION") && !textToAppend.includes("PHYSICAL INSPECTION");
      if (headingNeeded) {
        textToAppend += (textToAppend ? "\n\n" : "") + "PHYSICAL INSPECTION\n" + physBlocks.join("\n\n");
      } else {
        textToAppend += (textToAppend ? "\n\n" : "") + physBlocks.join("\n\n");
      }
    }
  }

  // Append to textarea if we have blocks
  if (textToAppend) {
    let newVal = curVal;
    if (!newVal.trim()) {
      newVal = textToAppend;
    } else {
      if (newVal.endsWith("\n\n")) {
        newVal += textToAppend;
      } else if (newVal.endsWith("\n")) {
        newVal += "\n" + textToAppend;
      } else {
        newVal += "\n\n" + textToAppend;
      }
    }

    if (ta) {
      ta.value = newVal;
      autoGrowTextarea(ta);
    }
    inspDraft.findings = newVal;

    // Highlight green for ~1.5s
    if (ta) {
      ta.classList.add("ta-highlight-green");
      if (taHighlightTimer) clearTimeout(taHighlightTimer);
      taHighlightTimer = setTimeout(() => {
        if (ta) ta.classList.remove("ta-highlight-green");
        taHighlightTimer = null;
      }, 1500);
    }
  }

  // Update OBD results area (cards flip to "✓ Added" with "Added to Final Findings below")
  renderObdScanResultsArea();
  renderObdAddedCodes();

  // Flip per-item buttons to "✓ Added"
  updateAllItemFindingsButtons();

  // Update the shared bar summary text
  updateSharedAddToFindingsBar();

  // Show shared bar feedback "Added to Final Findings below"
  showSharedBarFeedback("Added to Final Findings below", 2500);
}

/* ==========================================================
   RECOMMENDED SERVICES & ITEMS (PRICE MENU BUILDER)
   ========================================================== */

/**
 * Tracks active Add Row form parameters for each context ("draft" or woId).
 */
const itemAddFormState = {};

/**
 * Gets or initializes the Add Row form state for a given context.
 * @param {string} context - "draft" or work order ID.
 * @returns {{kind: "labor"|"part", src: "shop"|"waiting"|"own", showExtraForm: boolean}}
 */
function getItemAddFormState(context) {
  if (!itemAddFormState[context]) {
    itemAddFormState[context] = {
      kind: "labor",
      src: "shop",
      showExtraForm: false
    };
  }
  return itemAddFormState[context];
}

/**
 * Sets the active category kind ("labor" or "part") for an add row form.
 * @param {string} context
 * @param {"labor"|"part"} kind
 */
function setItemFormKind(context, kind) {
  const st = getItemAddFormState(context);
  st.kind = kind;
  if (kind === "labor") {
    st.src = "shop";
  }

  const wrap = $(`${context}-item-form-wrap`);
  if (wrap) {
    const btns = wrap.querySelectorAll(".item-cat-btn");
    btns.forEach((btn, idx) => {
      btn.classList.toggle("active", (idx === 0 && kind === "labor") || (idx === 1 && kind === "part"));
    });
  }

  const srcGrp = $(`${context}-src-group`);
  if (srcGrp) {
    srcGrp.style.display = kind === "part" ? "flex" : "none";
  }

  const nameInp = $(`${context}-item-name`);
  if (nameInp) {
    nameInp.placeholder = kind === "labor"
      ? "e.g. Change oil, CVT cleaning"
      : "e.g. Engine oil 10W-40, Drive Belt";
  }

  closeItemSuggestions(context);
}

/**
 * Handles source change in the Add Row form.
 * When source is "own", locks price to 0.
 * @param {string} context
 * @param {string} srcVal
 */
function onItemSourceChange(context, srcVal) {
  const st = getItemAddFormState(context);
  st.src = srcVal;
  const priceInp = $(`${context}-item-price`);
  if (priceInp) {
    if (srcVal === "own") {
      priceInp.value = "0";
      priceInp.readOnly = true;
      priceInp.classList.add("locked");
    } else {
      priceInp.readOnly = false;
      priceInp.classList.remove("locked");
      if (priceInp.value === "0") priceInp.value = "";
    }
  }
}

/**
 * Handles typing in the item name input.
 * Searches the catalog filtered by kind and displays custom suggestion dropdown.
 * @param {string} context
 * @param {string} val
 */
function onItemNameInput(context, val) {
  const st = getItemAddFormState(context);
  const dropdown = $(`${context}-item-suggestions`);
  if (!dropdown) return;

  const q = val.trim().toLowerCase();
  if (!q) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const catalog = getCatalogItems(st.kind);
  const matches = catalog.filter((it) => it.name.toLowerCase().includes(q));

  if (!matches.length) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  dropdown.innerHTML = `
    <div class="item-suggestions-list">
      ${matches.slice(0, 8).map((it) => `
        <div class="item-suggestion-row" onmousedown="selectItemSuggestion('${context}', '${escHtml(it.name)}', ${it.price})">
          <span class="item-suggestion-name">${escHtml(it.name)}</span>
          <span class="item-suggestion-price">${P(it.price)}</span>
        </div>
      `).join("")}
    </div>
  `;
  dropdown.style.display = "block";
}

/**
 * Handles focus on the item name input.
 * If text is present, opens matching suggestions.
 * @param {string} context
 */
function onItemNameFocus(context) {
  const inp = $(`${context}-item-name`);
  if (inp && inp.value.trim()) {
    onItemNameInput(context, inp.value);
  }
}

/**
 * Selects an item from the suggestions dropdown and fills name & price.
 * @param {string} context
 * @param {string} name
 * @param {number} price
 */
function selectItemSuggestion(context, name, price) {
  const nameInp = $(`${context}-item-name`);
  const priceInp = $(`${context}-item-price`);
  const st = getItemAddFormState(context);

  if (nameInp) nameInp.value = name;
  if (priceInp && st.src !== "own") {
    priceInp.value = price;
  }
  closeItemSuggestions(context);
}

/**
 * Closes the suggestion dropdown.
 * @param {string} context
 */
function closeItemSuggestions(context) {
  const dropdown = $(`${context}-item-suggestions`);
  if (dropdown) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
  }
}

/**
 * Gets the active items array for a context.
 * @param {string} context - "draft" or work order ID.
 * @param {"items"|"extra"} [key="items"]
 * @returns {Array<Object>}
 */
function getContextItems(context, key = "items") {
  if (context === "draft") {
    if (!Array.isArray(inspDraft.items)) inspDraft.items = [];
    return inspDraft.items;
  }
  const o = g("wo", context);
  if (!o) return [];
  if (!Array.isArray(o[key])) o[key] = [];
  return o[key];
}

/**
 * Submits the Add Row form and appends the item to the list.
 * @param {string} context - "draft" or work order ID.
 * @param {"items"|"extra"} [targetKey="items"]
 */
function submitItemAddForm(context, targetKey = "items") {
  const st = getItemAddFormState(context);
  const nameInp = $(`${context}-item-name`);
  const srcSel = $(`${context}-item-src`);
  const qtyInp = $(`${context}-item-qty`);
  const priceInp = $(`${context}-item-price`);

  const rawName = nameInp ? nameInp.value.trim() : "";
  const name = rawName || "Unnamed item";
  const kind = st.kind || "labor";
  const src = kind === "labor" ? "shop" : (srcSel ? srcSel.value : "shop");
  const qty = qtyInp ? Math.max(1, parseInt(qtyInp.value, 10) || 1) : 1;
  const price = src === "own" ? 0 : (priceInp ? Math.max(0, Number(priceInp.value) || 0) : 0);

  const newItem = {
    id: uid(),
    kind,
    name,
    qty,
    price,
    src,
    done: false
  };

  const list = getContextItems(context, targetKey);
  list.push(newItem);

  if (context !== "draft") {
    save();
  }

  // Clear inputs
  if (nameInp) nameInp.value = "";
  if (priceInp) priceInp.value = "";
  if (qtyInp) qtyInp.value = "1";
  closeItemSuggestions(context);

  renderItemsManager(context);
}

/**
 * Updates a field on an existing line item.
 * @param {string} context - "draft" or work order ID.
 * @param {string} itemId - Item ID.
 * @param {string} field - "name" | "src" | "qty" | "price"
 * @param {string|number} val - New value.
 */
function updateItemRow(context, itemId, field, val) {
  let item = null;
  const items = getContextItems(context, "items");
  item = items.find((x) => x.id === itemId);

  if (!item && context !== "draft") {
    const extra = getContextItems(context, "extra");
    item = extra.find((x) => x.id === itemId);
  }

  if (!item) return;

  if (field === "name") {
    item.name = String(val).trim() || "Unnamed item";
  } else if (field === "src") {
    item.src = val;
    if (val === "own") item.price = 0;
  } else if (field === "qty") {
    item.qty = Math.max(1, parseInt(val, 10) || 1);
  } else if (field === "price") {
    item.price = item.src === "own" ? 0 : Math.max(0, Number(val) || 0);
  }

  if (context !== "draft") {
    save();
  }

  renderItemsManager(context);
}

/**
 * Removes a line item.
 * @param {string} context - "draft" or work order ID.
 * @param {string} itemId - Item ID.
 */
function removeItemRow(context, itemId) {
  if (context === "draft") {
    inspDraft.items = (inspDraft.items || []).filter((x) => x.id !== itemId);
  } else {
    const o = g("wo", context);
    if (o) {
      if (Array.isArray(o.items)) o.items = o.items.filter((x) => x.id !== itemId);
      if (Array.isArray(o.extra)) o.extra = o.extra.filter((x) => x.id !== itemId);
      save();
    }
  }
  renderItemsManager(context);
}

/**
 * Toggles the 'done' state for a labor line item in Stage 3: In Repair.
 * @param {string} woId
 * @param {string} itemId
 * @param {boolean} checked
 */
function toggleItemDone(woId, itemId, checked) {
  const o = g("wo", woId);
  if (!o) return;
  const all = [...(o.items || []), ...(o.extra || [])];
  const item = all.find((x) => x.id === itemId);
  if (item) {
    item.done = checked;
    save();
  }
}

/**
 * Toggles visibility of the mini Add Extra Item form in In Repair stage.
 * @param {string} woId
 */
function toggleJobCardExtraForm(woId) {
  const st = getItemAddFormState(woId);
  st.showExtraForm = !st.showExtraForm;
  renderItemsManager(woId);
}

/**
 * Re-renders only the items manager container for a context.
 * Updates totals in real-time.
 * @param {string} context
 */
function renderItemsManager(context) {
  const container = $(`${context}-items-container`);
  if (!container) return;

  let options = { readOnly: false, showLaborDone: false, showExtraToggle: false };
  if (context === "draft") {
    options = { readOnly: false, showLaborDone: false, showExtraToggle: false };
  } else {
    const o = g("wo", context);
    if (o) {
      const isReadOnly = o.st === "Checking" || o.st === "Ready for Pickup" || o.st === "Completed";
      options = {
        readOnly: isReadOnly,
        showLaborDone: o.st === "In Progress",
        showExtraToggle: o.st === "In Progress"
      };
      const totEl = $(`jobcard-meta-total-${context}`);
      if (totEl) totEl.textContent = P(total(o));
      const warnWrap = $(`jobcard-warning-${context}`);
      if (warnWrap) {
        const waitingCount = (o.items || []).filter((i) => i.src === "waiting").length;
        warnWrap.innerHTML = waitingCount > 0 ? `<span class="waiting-pill">⏳ Waiting for part: ${waitingCount}</span>` : "";
      }
    }
  }

  container.innerHTML = getItemsBuilderHtml(context, options);
}

/**
 * Generates HTML for the Recommended Services & Items builder or read-only table.
 * @param {string} context - "draft" or work order ID.
 * @param {Object} options
 * @param {boolean} [options.readOnly=false]
 * @param {boolean} [options.showLaborDone=false]
 * @param {boolean} [options.showExtraToggle=false]
 * @returns {string} HTML string.
 */
function getItemsBuilderHtml(context, options = {}) {
  const { readOnly = false, showLaborDone = false, showExtraToggle = false } = options;
  const formState = getItemAddFormState(context);
  const items = getContextItems(context, "items");
  const extraItems = context !== "draft" ? getContextItems(context, "extra") : [];
  const allItems = [...items, ...extraItems.map((x) => ({ ...x, _isExtra: true }))];

  let laborSub = 0;
  let partsSub = 0;
  let ownCount = 0;
  let hasWaiting = false;

  allItems.forEach((it) => {
    const qty = Math.max(1, Number(it.qty) || 1);
    if (it.src === "own") {
      ownCount++;
    } else {
      const price = Math.max(0, Number(it.price) || 0);
      const lineTot = qty * price;
      if (it.kind === "labor") laborSub += lineTot;
      else partsSub += lineTot;
    }
    if (it.src === "waiting") hasWaiting = true;
  });

  const estTotal = laborSub + partsSub;

  let html = `<div class="item-builder-wrap">`;

  // 1. Add Row Form (if not read-only, or extra form toggled)
  if (!readOnly) {
    const showForm = !showExtraToggle || formState.showExtraForm;
    const targetKey = showExtraToggle ? "extra" : "items";

    if (showExtraToggle) {
      html += `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <button type="button" class="btn sm g" onclick="toggleJobCardExtraForm('${context}')">
            ${formState.showExtraForm ? "✕ Close Extra Item Form" : "+ Add Extra Item/Fluid Used"}
          </button>
        </div>
      `;
    }

    if (showForm) {
      html += `
        <div class="item-add-form-wrap" id="${context}-item-form-wrap">
          <div class="item-cat-toggle-wrap">
            <button
              type="button"
              class="item-cat-btn ${formState.kind === 'labor' ? 'active' : ''}"
              onclick="setItemFormKind('${context}', 'labor')"
            >
              Labor / Service
            </button>
            <button
              type="button"
              class="item-cat-btn ${formState.kind === 'part' ? 'active' : ''}"
              onclick="setItemFormKind('${context}', 'part')"
            >
              Part / Fluid Used
            </button>
          </div>

          <div class="item-add-inputs-row">
            <!-- Name with Custom Suggestion Dropdown -->
            <div class="item-input-group name-group" style="position:relative;flex:2;min-width:200px">
              <label class="item-field-label">Item / Service Name</label>
              <input
                type="text"
                id="${context}-item-name"
                class="item-field-input"
                placeholder="${formState.kind === 'labor' ? 'e.g. Change oil, CVT cleaning' : 'e.g. Engine oil 10W-40, Drive Belt'}"
                autocomplete="off"
                oninput="onItemNameInput('${context}', this.value)"
                onfocus="onItemNameFocus('${context}')"
              />
              <div id="${context}-item-suggestions" class="item-suggestions-dropdown" style="display:none"></div>
            </div>

            <!-- Source Select (visible only when Part) -->
            <div
              class="item-input-group src-group"
              id="${context}-src-group"
              style="flex:1.5;min-width:180px;display:${formState.kind === 'part' ? 'flex' : 'none'}"
            >
              <label class="item-field-label">Part Availability / Source</label>
              <select id="${context}-item-src" class="item-field-input" onchange="onItemSourceChange('${context}', this.value)">
                <option value="shop" ${formState.src === 'shop' ? 'selected' : ''}>Ready / Shop Provided</option>
                <option value="waiting" ${formState.src === 'waiting' ? 'selected' : ''}>Waiting for Part (Buy Outside / Order)</option>
                <option value="own" ${formState.src === 'own' ? 'selected' : ''}>Customer Brought Own Part</option>
              </select>
            </div>

            <!-- Qty -->
            <div class="item-input-group qty-group" style="width:75px;flex:0 0 75px">
              <label class="item-field-label">Qty</label>
              <input
                type="number"
                id="${context}-item-qty"
                class="item-field-input"
                min="1"
                value="1"
              />
            </div>

            <!-- Price (₱) -->
            <div class="item-input-group price-group" style="width:120px;flex:0 0 120px">
              <label class="item-field-label">Price (₱)</label>
              <input
                type="number"
                id="${context}-item-price"
                class="item-field-input ${formState.src === 'own' ? 'locked' : ''}"
                min="0"
                step="any"
                placeholder="0.00"
                ${formState.src === 'own' ? 'readonly value="0"' : ''}
              />
            </div>

            <!-- Add Row Button -->
            <div class="item-input-group btn-group" style="align-self:flex-end">
              <button type="button" class="btn item-add-btn" style="background:#2563EB" onclick="submitItemAddForm('${context}', '${targetKey}')">
                + Add Row
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // 2. Items Table
  html += `
    <div class="items-table-wrap">
      <table class="items-table">
        <thead>
          <tr>
            ${showLaborDone ? `<th class="c" style="width:50px">DONE</th>` : ""}
            <th style="width:110px">CATEGORY</th>
            <th>ITEM / SERVICE</th>
            <th style="width:160px">SOURCE</th>
            <th class="r" style="width:75px">QTY</th>
            <th class="r" style="width:100px">PRICE</th>
            <th class="r" style="width:110px">LINE TOTAL</th>
            ${!readOnly ? `<th class="c" style="width:45px"></th>` : ""}
          </tr>
        </thead>
        <tbody>
  `;

  if (!allItems.length) {
    const colCount = (showLaborDone ? 1 : 0) + 6 + (!readOnly ? 1 : 0);
    html += `<tr><td colspan="${colCount}" style="text-align:center;color:var(--text-muted);padding:24px">No items added yet.</td></tr>`;
  } else {
    allItems.forEach((it) => {
      const isOwn = it.src === "own";
      const isWaiting = it.src === "waiting";
      const isLabor = it.kind === "labor";
      const qty = Math.max(1, Number(it.qty) || 1);
      const price = isOwn ? 0 : Math.max(0, Number(it.price) || 0);
      const lineTot = qty * price;

      html += `<tr>`;

      // Done tick checkbox for Labor in In Repair stage
      if (showLaborDone) {
        if (isLabor) {
          html += `
            <td class="c">
              <input
                type="checkbox"
                ${it.done ? "checked" : ""}
                onchange="toggleItemDone('${context}', '${it.id}', this.checked)"
                title="Mark labor task completed"
              />
            </td>
          `;
        } else {
          html += `<td class="c" style="color:var(--text-muted)">—</td>`;
        }
      }

      // Category badge
      html += `
        <td>
          <span class="cat-badge ${it.kind}">
            ${isLabor ? "Labor" : "Part / Fluid"}
          </span>
          ${it._isExtra ? `<span style="font-size:10px;color:var(--text-muted);display:block">(extra)</span>` : ""}
        </td>
      `;

      // Item Name
      if (readOnly) {
        html += `<td><b>${escHtml(it.name)}</b></td>`;
      } else {
        html += `
          <td>
            <input
              type="text"
              class="item-inline-input"
              value="${escHtml(it.name)}"
              onchange="updateItemRow('${context}', '${it.id}', 'name', this.value)"
            />
          </td>
        `;
      }

      // Source Badge / Inline select
      if (readOnly || isLabor) {
        let srcBadgeHtml = `<span class="src-badge shop">Shop Provided</span>`;
        if (isWaiting) srcBadgeHtml = `<span class="src-badge waiting">⏳ Waiting for Part</span>`;
        else if (isOwn) srcBadgeHtml = `<span class="src-badge own">Customer's Own Part</span>`;
        html += `<td>${srcBadgeHtml}</td>`;
      } else {
        html += `
          <td>
            <select
              class="item-inline-select"
              onchange="updateItemRow('${context}', '${it.id}', 'src', this.value)"
            >
              <option value="shop" ${it.src === 'shop' || !it.src ? 'selected' : ''}>Shop Provided</option>
              <option value="waiting" ${it.src === 'waiting' ? 'selected' : ''}>Waiting for Part</option>
              <option value="own" ${it.src === 'own' ? 'selected' : ''}>Customer's Own Part</option>
            </select>
          </td>
        `;
      }

      // Qty
      if (readOnly) {
        html += `<td class="r">${qty}</td>`;
      } else {
        html += `
          <td class="r">
            <input
              type="number"
              min="1"
              class="item-inline-num"
              value="${qty}"
              style="width:55px"
              onchange="updateItemRow('${context}', '${it.id}', 'qty', this.value)"
            />
          </td>
        `;
      }

      // Price
      if (readOnly) {
        html += `<td class="r">${isOwn ? "₱0.00" : P(price)}</td>`;
      } else {
        if (isOwn) {
          html += `<td class="r"><input type="text" class="item-inline-num" value="₱0.00" disabled style="width:75px;background:#F1F5F9;color:#64748B"></td>`;
        } else {
          html += `
            <td class="r">
              <input
                type="number"
                min="0"
                step="any"
                class="item-inline-num"
                value="${price}"
                style="width:75px"
                onchange="updateItemRow('${context}', '${it.id}', 'price', this.value)"
              />
            </td>
          `;
        }
      }

      // Line Total
      html += `
        <td class="r">
          ${isOwn ? `<span style="color:var(--text-muted);font-size:12px">₱0.00 <span style="font-size:10px">(recorded)</span></span>` : `<b>${P(lineTot)}</b>`}
        </td>
      `;

      // Remove button
      if (!readOnly) {
        html += `
          <td class="c">
            <button
              type="button"
              class="btn g sm"
              style="padding:2px 8px;font-size:12px"
              onclick="removeItemRow('${context}', '${it.id}')"
              title="Remove item"
            >✕</button>
          </td>
        `;
      }

      html += `</tr>`;
    });
  }

  html += `
        </tbody>
      </table>
    </div>

    <!-- Subtotals Row -->
    <div class="items-summary-row">
      <div style="font-size:13px;color:var(--text-secondary);align-self:center">
        ${ownCount > 0 ? `<span class="src-badge own">${ownCount} customer-supplied part${ownCount > 1 ? "s" : ""} (recorded only)</span>` : ""}
      </div>
      <div class="items-totals-box">
        <div>Labor Subtotal: <b>${P(laborSub)}</b></div>
        <div>Parts Subtotal: <b>${P(partsSub)}</b></div>
        <div style="font-size:15px;color:var(--text-primary);border-top:1px solid var(--border);padding-top:4px;margin-top:2px">
          Estimated Total: <b>${P(estTotal)}</b>
        </div>
      </div>
    </div>
  `;

  // Amber warning note if any row has src "waiting"
  if (hasWaiting) {
    html += `
      <div class="items-waiting-note">
        <span>⏳</span>
        <span>Job will wait for parts before repair starts.</span>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

/**
 * Generates the stage header, stage action buttons, warning pills, and QC checkboxes for the Job Card.
 * @param {Object} o - Work order object.
 * @returns {string} HTML string.
 */
function getJobCardStageControlHtml(o) {
  const isAwaiting = o.st === "Awaiting Parts/Approval" || o.st === "Queued" || o.st === "Diagnosing";
  const isInProgress = o.st === "In Progress";
  const isChecking = o.st === "Checking";
  const isReady = o.st === "Ready for Pickup";
  const isDone = o.st === "Completed";

  const waitingCount = (o.items || []).filter((i) => i.src === "waiting").length;
  const qc = o.qc || {};

  let stageTitle = "";
  if (isAwaiting) stageTitle = "Stage: Awaiting Parts / Customer Approval";
  else if (isInProgress) stageTitle = "Stage 3: In Repair";
  else if (isChecking) stageTitle = "Stage 4: Checking (Final QC)";
  else if (isReady) stageTitle = "Stage 5: Ready for Billing";
  else if (isDone) stageTitle = "Stage: Completed";

  let html = `
    <div class="jobcard-stage-bar">
      <div class="jobcard-stage-header-row">
        <div class="jobcard-stage-title">
          <span>${stageTitle}</span>
          <span id="jobcard-warning-${o.id}">${waitingCount > 0 && isAwaiting ? `<span class="waiting-pill">⏳ Waiting for part: ${waitingCount}</span>` : ""}</span>
        </div>
        <div class="jobcard-stage-actions">
  `;

  if (isAwaiting) {
    html += `
      <button
        type="button"
        class="btn sm"
        style="background:#2563EB"
        onclick="startRepairFromAwaiting('${o.id}')"
      >
        Parts Ready &amp; Customer Approved -> Start Repair →
      </button>
    `;
  } else if (isInProgress) {
    html += `
      <button
        type="button"
        class="btn g sm"
        onclick="setJobCardStatus('${o.id}', 'Awaiting Parts/Approval')"
      >
        ← Back
      </button>
      <button
        type="button"
        class="btn sm"
        style="background:#2563EB"
        onclick="setJobCardStatus('${o.id}', 'Checking')"
      >
        Repair Done -> Move to Stage 4: Checking →
      </button>
    `;
  } else if (isChecking) {
    html += `
      <div style="display:flex;align-items:center;gap:6px">
        <input
          type="text"
          id="qc-reason-${o.id}"
          placeholder="Return reason (optional)..."
          style="height:36px;font-size:12px;width:170px"
        />
        <button
          type="button"
          class="btn g sm"
          onclick="returnJobToRepair('${o.id}')"
        >
          ← Return to Repair
        </button>
      </div>
      <button
        type="button"
        class="btn sm"
        style="background:#2563EB"
        onclick="passJobChecking('${o.id}')"
      >
        Passed Checking -> Send to Transactions &amp; Billing →
      </button>
    `;
  } else if (isReady) {
    const canBill = canOpen("bill");
    if (canBill) {
      html += `
        <button
          type="button"
          class="btn g sm"
          onclick="setJobCardStatus('${o.id}', 'Checking')"
        >
          ← Back
        </button>
        <button
          type="button"
          class="btn sm"
          style="background:#047857;color:#fff"
          onclick="closeInspModal(); go('bill');"
        >
          Go to Transactions &amp; Billing →
        </button>
      `;
    } else {
      html += `
        <div style="font-size:13px;color:var(--text-muted);font-style:italic;display:flex;align-items:center">
          Sent to billing. The Admin handles payment.
        </div>
      `;
    }
  }

  html += `
        </div>
      </div>
  `;

  // QC Checklist for Stage 4: Checking
  if (isChecking) {
    html += `
      <div class="jobcard-qc-box">
        <div style="font-weight:700;font-size:12px;color:var(--text-secondary);text-transform:uppercase;margin-bottom:8px">
          Quality Control Checklist (optional)
        </div>
        <div style="display:flex;gap:20px;flex-wrap:wrap">
          <label class="insp-chk-item" style="border:none;padding:0;background:none">
            <input
              type="checkbox"
              ${qc.resolved ? "checked" : ""}
              onchange="updateJobQc('${o.id}', 'resolved', this.checked)"
            />
            <span style="font-size:13px;font-weight:600">Faults resolved?</span>
          </label>
          <label class="insp-chk-item" style="border:none;padding:0;background:none">
            <input
              type="checkbox"
              ${qc.test ? "checked" : ""}
              onchange="updateJobQc('${o.id}', 'test', this.checked)"
            />
            <span style="font-size:13px;font-weight:600">Test ride passed?</span>
          </label>
          <label class="insp-chk-item" style="border:none;padding:0;background:none">
            <input
              type="checkbox"
              ${qc.oldParts ? "checked" : ""}
              onchange="updateJobQc('${o.id}', 'oldParts', this.checked)"
            />
            <span style="font-size:13px;font-weight:600">Old parts bagged?</span>
          </label>
        </div>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

/**
 * Advances work order from Awaiting Parts/Approval to In Progress.
 * Sets approved = true and converts all waiting parts to shop.
 * @param {string} woId
 */
function startRepairFromAwaiting(woId) {
  const o = g("wo", woId);
  if (!o) return;
  o.st = "In Progress";
  o.approved = true;
  if (Array.isArray(o.items)) {
    o.items.forEach((it) => {
      if (it.src === "waiting") it.src = "shop";
    });
  }
  if (Array.isArray(o.extra)) {
    o.extra.forEach((it) => {
      if (it.src === "waiting") it.src = "shop";
    });
  }
  save();
  renderInspModal(woId);
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  }
}

/**
 * Returns work order from Checking back to In Progress with optional remark.
 * @param {string} woId
 */
function returnJobToRepair(woId) {
  const o = g("wo", woId);
  if (!o) return;
  const reasonInp = $("qc-reason-" + woId);
  const reason = reasonInp ? reasonInp.value.trim() : "";
  if (reason) {
    o.remarks = (o.remarks ? o.remarks + "\n" : "") + "Returned from checking: " + reason;
  }
  o.st = "In Progress";
  save();
  renderInspModal(woId);
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  }
}

/**
 * Passes checking stage and sends work order to Ready for Pickup (Ready for Billing).
 * @param {string} woId
 */
function passJobChecking(woId) {
  const o = g("wo", woId);
  if (!o) return;
  o.st = "Ready for Pickup";
  o.readyAt = nowLocalIso();
  save();
  renderInspModal(woId);
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  } else if (view === "dash") {
    $("main").innerHTML = R.dash();
  }
}

/**
 * Updates QC checkbox state for a work order.
 * @param {string} woId
 * @param {"resolved"|"test"|"oldParts"} key
 * @param {boolean} checked
 */
function updateJobQc(woId, key, checked) {
  const o = g("wo", woId);
  if (!o) return;
  if (!o.qc || typeof o.qc !== "object") {
    o.qc = {};
  }
  o.qc[key] = checked;
  save();
}

/* ==========================================================================
   PHYSICAL INSPECTION LOG (Side Rail + Items Panel, Default-to-OK Triage)
   ========================================================================== */

let itemFeedbackTimers = {};

/**
 * Displays brief inline feedback text under an item's finding button.
 * @param {string} catKey
 * @param {string} itKey
 * @param {string} msg
 * @param {number} [duration=1500]
 */
function showItemFeedback(catKey, itKey, msg, duration = 1500) {
  const itemKey = `${catKey}.${itKey}`;
  const el = $(`phys-feedback-${catKey}-${itKey}`);
  if (!el) return;
  el.textContent = msg;
  el.style.display = "inline";
  if (itemFeedbackTimers[itemKey]) clearTimeout(itemFeedbackTimers[itemKey]);
  itemFeedbackTimers[itemKey] = setTimeout(() => {
    const elAfter = $(`phys-feedback-${catKey}-${itKey}`);
    if (elAfter) elAfter.style.display = "none";
    delete itemFeedbackTimers[itemKey];
  }, duration);
}

/**
 * Computes fault state and aria-label for a category button on the side rail.
 * Shows small red dot (#DC2626) when category has any Fix item.
 * @param {Object} cat - Category from INSPECTION_CHECKLIST.
 * @returns {{ dotClass: string, ariaLabel: string, fixCount: number, watchCount: number }}
 */
function getPhysRailCatState(cat) {
  const items = (inspDraft.inspection && inspDraft.inspection.items) || {};
  let fixCount = 0;

  cat.items.forEach((it) => {
    const sObj = items[`${cat.key}.${it.key}`];
    if (sObj && (sObj.s === "fix" || sObj.s === "watch")) {
      fixCount++;
    }
  });

  const dotClass = fixCount > 0 ? "dot-red" : "";
  const ariaLabel = fixCount > 0 ? `${cat.name}, ${fixCount} fix` : cat.name;

  return { dotClass, ariaLabel, fixCount, watchCount: 0 };
}

/**
 * Generates HTML for an individual category button on the side rail.
 * Emoji-only button (min 56px by 56px) with tooltip and top-right fault dot.
 * @param {Object} cat - Category from INSPECTION_CHECKLIST.
 * @returns {string} HTML string.
 */
function getPhysRailButtonHtml(cat) {
  const isSelected = selectedPhysRailCat === cat.key;
  const state = getPhysRailCatState(cat);

  return `
    <button
      type="button"
      class="phys-rail-btn ${isSelected ? 'active' : ''}"
      id="phys-rail-btn-${cat.key}"
      title="${escHtml(cat.name)}"
      aria-label="${escHtml(state.ariaLabel)}"
      aria-pressed="${isSelected ? 'true' : 'false'}"
      onclick="toggleSelectPhysRailCategory('${cat.key}')"
    >
      <span class="phys-rail-emoji">${cat.icon}</span>
      <span
        id="phys-rail-dot-${cat.key}"
        class="phys-rail-dot ${state.dotClass}"
        style="${state.dotClass ? '' : 'display:none'}"
      ></span>
    </button>
  `;
}

/**
 * Generates HTML for an individual item row in a category checklist.
 * Each row shows only: item name on the left and ONE Fix toggle button on the right.
 * When Fix is selected, shows the fault note input and per-item "Add to findings" button.
 * When deselected, hides them.
 * @param {string} catKey
 * @param {Object} it
 * @returns {string} HTML string
 */
function getInspectionItemRowHtml(catKey, it) {
  const itemKey = `${catKey}.${it.key}`;
  const sObj = (inspDraft.inspection && inspDraft.inspection.items && inspDraft.inspection.items[itemKey]) || null;
  const isFix = Boolean(sObj && (sObj.s === "fix" || sObj.s === "watch"));
  const note = (sObj && typeof sObj.note === "string") ? sObj.note : "";

  return `
    <div class="phys-item-wrap" id="phys-item-wrap-${catKey}-${it.key}">
      <div class="phys-item-top">
        <div class="phys-item-label">${escHtml(it.label)}</div>
        <div class="phys-item-controls">
          <button
            type="button"
            class="phys-btn-state fix ${isFix ? 'active' : ''}"
            id="phys-btn-fix-${catKey}-${it.key}"
            aria-pressed="${isFix ? 'true' : 'false'}"
            onclick="setItemInspectionState('${catKey}', '${it.key}', 'fix')"
          >
            Fix
          </button>
        </div>
      </div>
      ${isFix ? `
        <div class="phys-item-sub" id="phys-item-sub-${catKey}-${it.key}">
          <input
            type="text"
            class="phys-item-note"
            id="phys-note-${catKey}-${it.key}"
            placeholder="Describe the fault..."
            value="${escHtml(note)}"
            oninput="handleItemNoteInput('${catKey}', '${it.key}', this.value)"
            onchange="handleItemNoteInput('${catKey}', '${it.key}', this.value)"
          />
          <div class="phys-item-actions" id="phys-item-actions-${catKey}-${it.key}">
            ${getItemFindingsButtonHtml(catKey, it.key)}
            <span class="phys-item-feedback" id="phys-feedback-${catKey}-${it.key}" style="display:none"></span>
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

/**
 * Returns HTML for the per-item "Add to findings" / "✓ Added" / "Add update" button.
 * Shown only when an item has Fix selected.
 * @param {string} catKey
 * @param {string} itKey
 * @returns {string}
 */
function getItemFindingsButtonHtml(catKey, itKey) {
  const itemKey = `${catKey}.${itKey}`;
  const sObj = (inspDraft.inspection && inspDraft.inspection.items && inspDraft.inspection.items[itemKey]) || null;
  if (!sObj || (sObj.s !== "watch" && sObj.s !== "fix")) return "";

  const curS = "fix";
  const curNote = (typeof sObj.note === "string") ? sObj.note.trim() : "";
  const lastInserted = physFindingText[itemKey];

  if (lastInserted && typeof lastInserted === "object") {
    const insS = lastInserted.s;
    const insNote = (typeof lastInserted.note === "string") ? lastInserted.note.trim() : "";
    if (insS === curS && insNote === curNote) {
      return `<span class="phys-btn-added">✓ Added</span>`;
    } else {
      return `<button type="button" class="phys-btn-add" onclick="addItemFaultToFindings('${catKey}', '${itKey}')">Add update</button>`;
    }
  }

  return `<button type="button" class="phys-btn-add" onclick="addItemFaultToFindings('${catKey}', '${itKey}')">Add to findings</button>`;
}

/**
 * Updates an item's finding action container in the DOM.
 * @param {string} catKey
 * @param {string} itKey
 */
function updateItemFindingsButton(catKey, itKey) {
  const actionsEl = $(`phys-item-actions-${catKey}-${itKey}`);
  if (!actionsEl) return;
  const feedbackEl = $(`phys-feedback-${catKey}-${itKey}`);
  const feedbackText = feedbackEl ? feedbackEl.textContent : "";
  const feedbackVisible = feedbackEl && feedbackEl.style.display !== "none";

  actionsEl.innerHTML = `
    ${getItemFindingsButtonHtml(catKey, itKey)}
    <span class="phys-item-feedback" id="phys-feedback-${catKey}-${itKey}" style="${feedbackVisible ? 'display:inline' : 'display:none'}">${escHtml(feedbackText)}</span>
  `;
}

/**
 * Updates all items' finding action buttons (e.g. after shared bar adds all faults).
 */
function updateAllItemFindingsButtons() {
  INSPECTION_CHECKLIST.forEach((cat) => {
    cat.items.forEach((it) => {
      updateItemFindingsButton(cat.key, it.key);
    });
  });
}

/**
 * Appends one physical fault into the Card 4 findings textarea directly.
 * Highlights textarea border green for ~1.5s, auto-grows, flips button to "✓ Added".
 * @param {string} catKey
 * @param {string} itKey
 */
function addItemFaultToFindings(catKey, itKey) {
  const itemKey = `${catKey}.${itKey}`;
  const sObj = (inspDraft.inspection && inspDraft.inspection.items && inspDraft.inspection.items[itemKey]) || null;
  if (!sObj || (sObj.s !== "watch" && sObj.s !== "fix")) return;

  const cat = INSPECTION_CHECKLIST.find((c) => c.key === catKey);
  const it = cat ? cat.items.find((i) => i.key === itKey) : null;
  if (!cat || !it) return;

  const curS = sObj.s;
  const curNote = (typeof sObj.note === "string") ? sObj.note.trim() : "";
  const lastInserted = physFindingText[itemKey];

  // If already added and unchanged, do nothing
  if (lastInserted && typeof lastInserted === "object" && lastInserted.s === curS && (lastInserted.note || "").trim() === curNote) {
    return;
  }

  const entry = formatPhysicalFindingText(cat.name, it.label, curS, curNote);
  const ta = $("insp-diag-findings");
  let curVal = ta ? ta.value : (inspDraft.findings || "");

  let textToAppend = "";
  const headingNeeded = !curVal.includes("PHYSICAL INSPECTION");
  if (headingNeeded) {
    textToAppend = `PHYSICAL INSPECTION\n${entry}`;
  } else {
    textToAppend = entry;
  }

  let newVal = curVal ? (curVal.trimEnd() + "\n\n" + textToAppend) : textToAppend;

  if (ta) {
    ta.value = newVal;
    autoGrowTextarea(ta);
    ta.classList.add("ta-highlight-green");
    if (taHighlightTimer) clearTimeout(taHighlightTimer);
    taHighlightTimer = setTimeout(() => {
      if (ta) ta.classList.remove("ta-highlight-green");
      taHighlightTimer = null;
    }, 1500);
  }

  inspDraft.findings = newVal;
  physFindingText[itemKey] = { s: curS, note: curNote };

  updateItemFindingsButton(catKey, itKey);
  showItemFeedback(catKey, itKey, "Added to Final Findings below", 1500);
  updateSharedAddToFindingsBar();
}

/**
 * Handles typing in an item's fault note input.
 * Updates draft, updates action button state if modified, updates shared bar.
 * @param {string} catKey
 * @param {string} itKey
 * @param {string} val
 */
function handleItemNoteInput(catKey, itKey, val) {
  const itemKey = `${catKey}.${itKey}`;
  if (!inspDraft.inspection.items[itemKey]) {
    inspDraft.inspection.items[itemKey] = { s: "fix", note: "" };
  }
  inspDraft.inspection.items[itemKey].note = val;
  updateItemFindingsButton(catKey, itKey);
  updateSharedAddToFindingsBar();
}

/**
 * Re-renders only the changed item row via outerHTML to preserve focus.
 * @param {string} catKey
 * @param {string} itKey
 */
function renderInspectionItemRow(catKey, itKey) {
  const cat = INSPECTION_CHECKLIST.find((c) => c.key === catKey);
  const it = cat ? cat.items.find((i) => i.key === itKey) : null;
  if (!it) return;

  const wrapEl = $(`phys-item-wrap-${catKey}-${itKey}`);
  if (wrapEl) {
    wrapEl.outerHTML = getInspectionItemRowHtml(catKey, it);
  }
}

/**
 * Generates HTML for the right items panel (content or empty hint).
 * @returns {string} HTML string.
 */
function getPhysPanelHtml() {
  if (!selectedPhysRailCat) {
    return `
      <div class="phys-panel-empty">
        <div class="phys-panel-empty-text">Tap an icon to inspect that area.</div>
      </div>
    `;
  }

  const cat = INSPECTION_CHECKLIST.find((c) => c.key === selectedPhysRailCat);
  if (!cat) {
    return `
      <div class="phys-panel-empty">
        <div class="phys-panel-empty-text">Tap an icon to inspect that area.</div>
      </div>
    `;
  }

  return `
    <div class="phys-panel-content">
      <div class="phys-panel-header">
        <span class="phys-panel-title">${cat.icon} ${escHtml(cat.name)}</span>
      </div>
      <div class="phys-panel-items">
        ${cat.items.map((it) => getInspectionItemRowHtml(cat.key, it)).join("")}
      </div>
    </div>
  `;
}

/**
 * Generates HTML for Card 3: Physical Inspection Log.
 * Two-column layout: side rail with emoji-only category buttons + items panel.
 * @returns {string} HTML string.
 */
function getPhysicalInspectionLogCardHtml() {
  return `
    <div class="insp-card" id="phys-log-card" style="margin-bottom:16px">
      <div class="insp-diag-card-title" style="margin-bottom:14px">3. PHYSICAL INSPECTION LOG</div>
      <div class="phys-rail-container">
        <!-- LEFT: Emoji Side Rail -->
        <div class="phys-rail" id="phys-rail" role="region" aria-label="Inspection Categories">
          ${INSPECTION_CHECKLIST.map((cat) => getPhysRailButtonHtml(cat)).join("")}
        </div>

        <!-- RIGHT: Items Panel -->
        <div class="phys-panel" id="phys-panel" aria-live="polite">
          ${getPhysPanelHtml()}
        </div>
      </div>
    </div>
  `;
}

/**
 * Updates the fault dot and aria-label on an individual rail button live.
 * @param {string} catKey
 */
function renderPhysRailCategoryDot(catKey) {
  const cat = INSPECTION_CHECKLIST.find((c) => c.key === catKey);
  if (!cat) return;
  const state = getPhysRailCatState(cat);

  const btn = $(`phys-rail-btn-${catKey}`);
  if (btn) {
    btn.setAttribute("aria-label", state.ariaLabel);
  }

  const dot = $(`phys-rail-dot-${catKey}`);
  if (dot) {
    dot.className = `phys-rail-dot ${state.dotClass}`;
    dot.style.display = state.dotClass ? "" : "none";
  }
}

/**
 * Re-renders the rail buttons to update active states, aria-pressed, and dots.
 */
function renderPhysRailButtons() {
  const railEl = $("phys-rail");
  if (railEl) {
    railEl.innerHTML = INSPECTION_CHECKLIST.map((cat) => getPhysRailButtonHtml(cat)).join("");
  }
}

/**
 * Re-renders the items panel.
 */
function renderPhysPanel() {
  const panelEl = $("phys-panel");
  if (panelEl) {
    panelEl.innerHTML = getPhysPanelHtml();
  }
}

/**
 * Toggles category selection in the side rail.
 * Tapping the active category deselects it and shows the hint.
 * @param {string} catKey - Category key.
 */
function toggleSelectPhysRailCategory(catKey) {
  readDiagDomIntoDraft();
  sanitizeInspDraftInspectionItems();
  if (selectedPhysRailCat === catKey) {
    selectedPhysRailCat = null;
  } else {
    selectedPhysRailCat = catKey;
  }
  renderPhysRailButtons();
  renderPhysPanel();
}

/**
 * Toggles Fix state on an individual checklist item.
 * Tapping when unselected marks as Fix. Tapping again deselects and returns to OK.
 * Stores only { s: "fix", note }. No entry means OK.
 * Re-renders only the changed row, the emoji button dot, and the shared bar count.
 * @param {string} catKey - Category key.
 * @param {string} itKey - Item key.
 * @param {string} [state="fix"] - Action state.
 */
function setItemInspectionState(catKey, itKey, state = "fix") {
  readDiagDomIntoDraft();
  if (!inspDraft.inspection) {
    inspDraft.inspection = { enablePhysical: true, enableObd: true, items: {}, obd: { codes: [] } };
  }
  if (!inspDraft.inspection.items) {
    inspDraft.inspection.items = {};
  }

  const itemKey = `${catKey}.${itKey}`;
  const cur = inspDraft.inspection.items[itemKey];
  const isCurrentlySelected = Boolean(cur && (cur.s === "fix" || cur.s === "watch"));

  if (isCurrentlySelected) {
    delete inspDraft.inspection.items[itemKey];
  } else {
    inspDraft.inspection.items[itemKey] = {
      s: "fix",
      note: (cur && typeof cur.note === "string") ? cur.note : ""
    };
  }

  renderInspectionItemRow(catKey, itKey);
  renderPhysRailCategoryDot(catKey);
  updateSharedAddToFindingsBar();
}

/**
 * Updates fault note text on an inspection item.
 * @param {string} catKey - Category key.
 * @param {string} itKey - Item key.
 * @param {string} note - Note text.
 */
function updateItemFaultNote(catKey, itKey, note) {
  handleItemNoteInput(catKey, itKey, note);
}

/**
 * Adds a standard service package as a labor line in Stage 2 Diagnosis.
 * @param {string} woId - Work order ID.
 * @param {string} svcId - Service ID from D.sv.
 */
function addStandardServiceToDiag(woId, svcId) {
  const o = g("wo", woId);
  const s = g("sv", svcId);
  if (!o || !s) return;

  o.items = Array.isArray(o.items) ? o.items : [];
  o.items.push({
    id: uid(),
    kind: "labor",
    name: s.name,
    qty: 1,
    price: s.labor || 0,
    done: false
  });

  save();
  renderInspModal(woId);
}

/**
 * Adds a custom needed part item in Stage 2 Diagnosis.
 * @param {string} woId - Work order ID.
 */
function addCustomPartToDiag(woId) {
  const o = g("wo", woId);
  if (!o) return;

  const name = v("diag-part-name");
  const qty = Math.max(1, +v("diag-part-qty") || 1);
  const price = Math.max(0, +v("diag-part-price") || 0);

  if (!name) return;

  o.items = Array.isArray(o.items) ? o.items : [];
  o.items.push({
    id: uid(),
    kind: "part",
    name: name,
    qty: qty,
    price: price,
    done: false
  });

  save();
  renderInspModal(woId);
}

/**
 * Removes an estimated item from Stage 2 Diagnosis.
 * @param {string} woId - Work order ID.
 * @param {string} itemId - Item ID.
 */
/**
 * Updates quantity or unit price of an estimated item in Stage 2 Diagnosis.
 * @param {string} woId - Work order ID.
 * @param {string} itemId - Item ID.
 * @param {string} field - "qty" or "price".
 * @param {string|number} val - New value.
 */
function updateDiagItem(woId, itemId, field, val) {
  const o = g("wo", woId);
  if (!o || !Array.isArray(o.items)) return;
  const item = o.items.find((i) => i.id === itemId);
  if (!item) return;
  if (field === "qty") item.qty = Math.max(1, +val || 1);
  if (field === "price") item.price = Math.max(0, +val || 0);
  save();
  renderInspModal(woId);
}

/**
 * Updates quantity or unit price of an extra part in Stage 3 Repair.
 * @param {string} woId - Work order ID.
 * @param {string} extraId - Extra part record ID.
 * @param {string} field - "qty" or "price".
 * @param {string|number} val - New value.
 */
function updateExtraPart(woId, extraId, field, val) {
  const o = g("wo", woId);
  if (!o || !Array.isArray(o.extra)) return;
  const item = o.extra.find((x) => x.id === extraId);
  if (!item) return;
  if (field === "qty") item.qty = Math.max(1, +val || 1);
  if (field === "price") item.price = Math.max(0, +val || 0);
  save();
  renderInspModal(woId);
}

function removeDiagItem(woId, itemId) {
  const o = g("wo", woId);
  if (!o || !Array.isArray(o.items)) return;
  o.items = o.items.filter((x) => x.id !== itemId);
  save();
  renderInspModal(woId);
}

/**
 * Toggles customer estimate approval state in Stage 2 Diagnosis.
 * @param {string} woId - Work order ID.
 */
function toggleCustomerApproval(woId) {
  const o = g("wo", woId);
  if (!o) return;
  o.approved = !o.approved;
  save();
  renderInspModal(woId);
}

/**
 * Calculates labor, parts, and total amounts for inspDraft.items.
 * Treats items with src: "own" as zero cost.
 * @returns {{ labor: number, parts: number, total: number }}
 */
function getDraftItemsTotals() {
  const items = Array.isArray(inspDraft.items) ? inspDraft.items : [];
  let labor = 0;
  let parts = 0;
  items.forEach((it) => {
    const qty = Math.max(1, Number(it.qty) || 1);
    if (it.src !== "own") {
      const price = Math.max(0, Number(it.price) || 0);
      const lineTot = qty * price;
      if (it.kind === "labor") labor += lineTot;
      else parts += lineTot;
    }
  });
  return { labor, parts, total: labor + parts };
}

/**
 * Returns the zone display name that contains a given inspection checklist item.
 * @param {string} catKey
 * @param {string} itKey
 * @returns {string}
 */
function getZoneNameForItem(catKey, itKey) {
  const zone = INSPECTION_ZONES.find((z) =>
    Array.isArray(z.items) && z.items.some((it) => it.catKey === catKey && it.itKey === itKey)
  );
  return zone ? zone.name : catKey;
}

/**
 * Generates HTML for Step 3 Confirmation form.
 * Two-column layout: left column contains read-only summaries with Edit links;
 * right column contains a sticky Job Order Ticket with prefilled customer inputs,
 * live totals, counts, and primary Confirm button.
 * @returns {string} HTML string.
 */
function getInspStep3Html() {
  sanitizeInspDraftInspectionItems();
  const counts = getPhysicalInspectionCounts();
  const draftTotals = getDraftItemsTotals();

  // Flagged items: Fix first, then Watch (omitting OK items)
  const fixList = [];
  const watchList = [];
  INSPECTION_CHECKLIST.forEach((cat) => {
    cat.items.forEach((item) => {
      const stateObj = inspDraft.inspection.items[`${cat.key}.${item.key}`];
      if (stateObj) {
        if (stateObj.s === "fix") {
          fixList.push({
            catName: cat.name,
            label: item.label,
            zoneName: getZoneNameForItem(cat.key, item.key),
            state: "fix",
            note: stateObj.note || ""
          });
        } else if (stateObj.s === "watch") {
          watchList.push({
            catName: cat.name,
            label: item.label,
            zoneName: getZoneNameForItem(cat.key, item.key),
            state: "watch",
            note: stateObj.note || ""
          });
        }
      }
    });
  });

  const obdCodes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];

  return `
    <div class="insp-stage-body">
      <div style="margin-bottom:16px">
        <h3 style="margin:0 0 4px">Confirmation</h3>
        <p style="margin:0;color:var(--text-muted);font-size:13px">Review the details, add the customer, then send this job to Active Repairs.</p>
      </div>

      <div class="confirm-two-col">
        <!-- LEFT COLUMN: Read-only summary cards -->
        <div class="confirm-left-col">
          <!-- 1. Vehicle & Complaints Card -->
          <div class="confirm-summary-card">
            <div class="confirm-card-header">
              <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Vehicle &amp; Complaints</span>
              <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(1)">Edit</a>
            </div>
            <div style="font-size:13px;line-height:1.6">
              <div><b>Plate:</b> ${escHtml(inspDraft.plate || "NO PLATE")}</div>
              <div><b>Make &amp; Model:</b> ${escHtml([inspDraft.make, inspDraft.model].filter(Boolean).join(" ") || "Unknown")}</div>
              <div><b>Model Year:</b> ${escHtml(inspDraft.year ? String(inspDraft.year) : "—")}</div>
              <div><b>Odometer:</b> ${inspDraft.odo ? Number(inspDraft.odo).toLocaleString() + " km" : "—"}</div>
              <div style="margin-top:8px">
                <b>Customer Complaints:</b>
                ${(inspDraft.complaints && inspDraft.complaints.length > 0)
                  ? `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px">
                      ${inspDraft.complaints.map((c) => `<span class="complaint-chip-ro">${escHtml(c)}</span>`).join("")}
                    </div>`
                  : `<span style="color:var(--text-muted);margin-left:4px">None</span>`
                }
              </div>
              <div style="margin-top:6px">
                <b>Customer Notes:</b> ${inspDraft.notes ? escHtml(inspDraft.notes) : `<span style="color:var(--text-muted)">None</span>`}
              </div>
            </div>
          </div>

          <!-- 2. Flagged Issues Card (Fix first, then Watch; omits OK) -->
          <div class="confirm-summary-card">
            <div class="confirm-card-header">
              <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Flagged Issues (${fixList.length + watchList.length})</span>
              <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(2)">Edit</a>
            </div>
            <div style="font-size:13px;line-height:1.6">
              ${(fixList.length === 0 && watchList.length === 0) ? `
                <div style="color:var(--text-muted)">All inspected items OK.</div>
              ` : `
                ${fixList.length > 0 ? `
                  <div class="flagged-subheading" style="color:var(--danger)">Fix Required (${fixList.length})</div>
                  <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:${watchList.length > 0 ? '12px' : '0'}">
                    ${fixList.map((wf) => `
                      <div class="flagged-issue-row">
                        <span class="fault-badge fix">FIX</span>
                        <div>
                          <div style="font-weight:700;font-size:13px;color:var(--text-primary)">
                            ${escHtml(wf.label)} <span style="font-size:11px;font-weight:400;color:var(--text-muted)">(${escHtml(wf.zoneName)})</span>
                          </div>
                          ${wf.note ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;font-style:italic">${escHtml(wf.note)}</div>` : ""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}

                ${watchList.length > 0 ? `
                  <div class="flagged-subheading" style="color:var(--warning)">Watch / Wearing (${watchList.length})</div>
                  <div style="display:flex;flex-direction:column;gap:6px">
                    ${watchList.map((wf) => `
                      <div class="flagged-issue-row">
                        <span class="fault-badge watch">WATCH</span>
                        <div>
                          <div style="font-weight:700;font-size:13px;color:var(--text-primary)">
                            ${escHtml(wf.label)} <span style="font-size:11px;font-weight:400;color:var(--text-muted)">(${escHtml(wf.zoneName)})</span>
                          </div>
                          ${wf.note ? `<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;font-style:italic">${escHtml(wf.note)}</div>` : ""}
                        </div>
                      </div>
                    `).join("")}
                  </div>
                ` : ""}
              `}
            </div>
          </div>

          <!-- 3. ECU / OBD Trouble Codes Card (Hidden when none) -->
          ${obdCodes.length > 0 ? `
            <div class="confirm-summary-card">
              <div class="confirm-card-header">
                <span style="font-weight:700;font-size:13px;color:var(--text-primary)">ECU / OBD Trouble Codes (${obdCodes.length})</span>
                <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(2)">Edit</a>
              </div>
              <div style="display:flex;flex-direction:column;gap:6px">
                ${obdCodes.map((c) => {
                  const label = c.part && !c.desc.startsWith(c.part) ? `${c.part}: ${c.desc}` : (c.desc || "");
                  return `
                    <div style="font-size:13px;display:flex;align-items:baseline;gap:6px;flex-wrap:wrap">
                      <span class="obd-primary-code-pill" style="font-size:11px;padding:2px 6px">${escHtml(c.code)}</span>
                      ${c.err ? `<span class="obd-err-code-pill" style="font-size:11px;padding:1px 6px">${escHtml(c.err)}</span>` : ""}
                      <span>· ${escHtml(label)}</span>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          ` : ""}

          <!-- 4. Final Findings & Diagnosis Verification Card -->
          <div class="confirm-summary-card">
            <div class="confirm-card-header">
              <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Final Findings &amp; Diagnosis Verification</span>
              <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(2)">Edit</a>
            </div>
            <div>
              ${inspDraft.findings && inspDraft.findings.trim()
                ? `<div style="white-space:pre-wrap;background:#F8FAFC;padding:8px 12px;border-radius:6px;font-size:13px;line-height:1.5;border:1px solid var(--border)">${escHtml(inspDraft.findings)}</div>`
                : `<div style="font-size:13px;color:var(--text-muted)">-</div>`
              }
            </div>
          </div>

          <!-- 5. Services & Parts (auto-attached) Card -->
          <div class="confirm-summary-card">
            <div class="confirm-card-header">
              <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Services &amp; Parts (auto-attached)</span>
              <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(2)">Edit</a>
            </div>
            ${
              (!inspDraft.items || !inspDraft.items.length)
                ? `<div style="font-size:13px;color:var(--text-muted)">None</div>`
                : getItemsBuilderHtml("draft", { readOnly: true, showLaborDone: false })
            }
          </div>
        </div>

        <!-- RIGHT COLUMN: Sticky Job Order Ticket -->
        <div class="confirm-right-col">
          <div class="confirm-sticky-ticket">
            <div class="ticket-header-strip">
              <div>
                <div class="ticket-header-title">Draft Job Order</div>
                <div class="ticket-header-sub">${formatJobDate(today())}</div>
              </div>
              <span class="ticket-badge-pill">Ticket</span>
            </div>

            <div class="ticket-vehicle-line">
              <div style="font-weight:700">${escHtml([inspDraft.make, inspDraft.model].filter(Boolean).join(" ") || "Unknown")}</div>
              <div style="font-size:12px;color:var(--text-muted);display:flex;gap:8px;margin-top:2px">
                <span>Plate: <b>${escHtml(inspDraft.plate || "NO PLATE")}</b></span>
                ${inspDraft.odo ? `<span>· Odo: <b>${Number(inspDraft.odo).toLocaleString()} km</b></span>` : ""}
              </div>
            </div>

            <div class="ticket-cust-fields">
              <div>
                <label class="ticket-label" for="insp-cust-name">Customer Name</label>
                <input
                  id="insp-cust-name"
                  type="text"
                  class="ticket-input"
                  placeholder="Full name (e.g. Juan dela Cruz)"
                  value="${escHtml(inspDraft.custName || "")}"
                  oninput="inspDraft.custName=this.value"
                />
              </div>
              <div>
                <label class="ticket-label" for="insp-cust-phone">Contact Number</label>
                <input
                  id="insp-cust-phone"
                  type="text"
                  class="ticket-input"
                  placeholder="e.g. 0917 555 0101"
                  value="${escHtml(inspDraft.custPhone || "")}"
                  oninput="inspDraft.custPhone=this.value"
                />
              </div>
            </div>

            <div class="ticket-counts-line">
              ${(() => {
                const parts = [];
                if (counts.fix > 0) parts.push(`${counts.fix} Fix`);
                if (counts.watch > 0) parts.push(`${counts.watch} Watch`);
                const physText = parts.length > 0 ? parts.join(" · ") : "All inspected items OK.";
                return `${physText} · ${obdCodes.length} code${obdCodes.length === 1 ? "" : "s"}`;
              })()}
            </div>

            <div class="ticket-totals-block">
              <div class="ticket-totals-row">
                <span>Labor Subtotal</span>
                <span style="font-weight:600">${P(draftTotals.labor)}</span>
              </div>
              <div class="ticket-totals-row">
                <span>Parts Subtotal</span>
                <span style="font-weight:600">${P(draftTotals.parts)}</span>
              </div>
              <div class="ticket-totals-divider"></div>
              <div class="ticket-totals-row total">
                <span>Estimated Total</span>
                <span class="ticket-total-val">${P(draftTotals.total)}</span>
              </div>
            </div>

            <div class="ticket-send-note">
              Confirming sends this job to Active Repairs with status Awaiting Parts/Approval.
            </div>

            <button
              type="button"
              class="btn-confirm-ticket"
              onclick="confirmInspectionJobOrder()"
            >
              Confirm &amp; Send to Active Repairs
            </button>

            <button
              type="button"
              class="btn g"
              style="width:100%;min-height:44px;margin-top:8px;justify-content:center"
              onclick="setInspDraftStep(2)"
            >
              ← Back to Diagnosis
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Creates the work order from the draft with status "Awaiting Parts/Approval",
 * reuses/creates customer and motorcycle, clears draft, and switches to Active Repairs.
 */
function confirmInspectionJobOrder() {
  readConfirmDomIntoDraft();

  const rawPlate = (inspDraft.plate || "").trim();
  const rawMake = (inspDraft.make || "").trim();
  const rawModel = (inspDraft.model || "").trim();
  const rawCustName = (inspDraft.custName || "").trim();
  const rawCustPhone = (inspDraft.custPhone || "").trim();
  const year = inspDraft.year ? +inspDraft.year : "";
  const odo = inspDraft.odo ? +inspDraft.odo : 0;

  // Fallbacks
  const plate = rawPlate ? rawPlate.toUpperCase() : "NO PLATE";
  const custName = rawCustName || "Walk-in Customer";
  const make = rawMake || (rawModel ? "" : "Unknown");
  const model = rawModel || "";
  const custPhone = rawCustPhone || "";

  // 1. Customer matching: never match on empty phone or walk-in customer
  let c = null;
  if (custPhone) {
    c = D.cu.find((x) => x.phone && x.phone.trim() === custPhone);
  }
  if (!c && rawCustName && rawCustName.toLowerCase() !== "walk-in customer") {
    c = D.cu.find((x) => x.name && x.name.toLowerCase() === rawCustName.toLowerCase());
  }
  if (!c) {
    c = { id: uid(), name: custName, phone: custPhone };
    D.cu.push(c);
  } else {
    c.name = custName;
    if (custPhone) c.phone = custPhone;
  }

  // 2. Motorcycle matching: never match on empty or NO PLATE
  let b = null;
  if (rawPlate && rawPlate.toUpperCase() !== "NO PLATE") {
    b = D.bk.find((x) => x.plate && x.plate.trim().toUpperCase() === rawPlate.toUpperCase());
  }
  if (!b) {
    b = {
      id: uid(),
      cid: c.id,
      make: make || "Unknown",
      model: model || "",
      year: year,
      plate: plate,
      odo: odo
    };
    D.bk.push(b);
  } else {
    b.cid = c.id;
    if (rawMake) b.make = rawMake;
    if (rawModel) b.model = rawModel;
    if (year) b.year = year;
    if (odo) b.odo = Math.max(b.odo || 0, odo);
  }

  // 3. Work order object
  const complaints = Array.isArray(inspDraft.complaints) ? [...inspDraft.complaints] : [];
  const notes = (inspDraft.notes || "").trim();
  const compText = complaints.join(", ");
  const combinedNotes = compText + (notes ? (compText ? " · " : "") + notes : "");
  const u = getCurrentUser();
  const isMechanic = u && u.activeRole === "mechanic";

  const wo = {
    id: uid(),
    bid: b.id,
    mech: isMechanic ? u.name : "", // Automatic assignment for Mechanic, unassigned for Admin
    st: "Awaiting Parts/Approval", // per Part 5
    sv: [],
    odo: odo,
    complaints: complaints,
    notes: notes,
    note: combinedNotes,
    findings: inspDraft.findings || "",
    inspection: JSON.parse(JSON.stringify(inspDraft.inspection)),
    approved: false,
    items: Array.isArray(inspDraft.items) ? JSON.parse(JSON.stringify(inspDraft.items)) : [],
    extra: [],
    advances: [],
    remarks: "",
    qc: { complaint: null, tight: null, test: null, oldParts: null },
    discount: 0,
    pay: null,
    at: today(),
    done: null
  };
  D.wo.push(wo);
  save();

  resetInspDraft();

  if (canOpen("rep")) {
    go("rep");
  } else {
    go("insp");
  }
}


/**
 * Removes an extra part from Stage 3 Repair.
 * @param {string} woId - Work order ID.
 * @param {string} extraId - Extra part record ID.
 */
function removeExtraPart(woId, extraId) {
  const o = g("wo", woId);
  if (!o || !Array.isArray(o.extra)) return;
  o.extra = o.extra.filter((x) => x.id !== extraId);
  save();
  renderInspModal(woId);
}


/**
 * Formats a consistent Transaction ID for a work order (e.g. TXN-0001).
 * @param {Object} o - Work order record.
 * @returns {string} Formatted transaction ID.
 */
function getTxnId(o) {
  if (!o) return "TXN-0000";
  const idx = D.wo.findIndex((x) => x.id === o.id);
  const num = idx >= 0 ? idx + 1 : D.wo.length + 1;
  return "TXN-" + String(num).padStart(4, "0");
}

/**
 * Calculates sum of all recorded advance payments for a work order.
 * @param {Object} o - Work order record.
 * @returns {number} Sum of advance payments.
 */
function getAdvancesTotal(o) {
  if (!o || !Array.isArray(o.advances)) return 0;
  return o.advances.reduce((acc, a) => acc + (Number(a.amount) || 0), 0);
}

/**
 * Determines payment status pill metadata for a work order.
 * @param {Object} o - Work order record.
 * @returns {Object} { status: string, label: string, pillHtml: string }
 */
function getJobPaymentStatus(o) {
  if (!o) return { status: "unpaid", label: "Unpaid", pillHtml: '<span class="pay-pill unpaid">● Unpaid</span>' };
  if (o.st === "Completed" || o.pay) {
    return { status: "paid", label: "Paid", pillHtml: '<span class="pay-pill paid">● Paid</span>' };
  }
  const adv = getAdvancesTotal(o);
  if (adv > 0) {
    return { status: "partial", label: "Partial/Adv Paid", pillHtml: `<span class="pay-pill partial">● Partial/Adv Paid (${P(adv)})</span>` };
  }
  return { status: "unpaid", label: "Unpaid", pillHtml: '<span class="pay-pill unpaid">● Unpaid</span>' };
}

/**
 * Tests whether a work order matches the search query in Transactions & Billing.
 * @param {Object} o - Work order record.
 * @param {string} q - Query text.
 * @returns {boolean} True if matching.
 */
function matchesBillSearch(o, q) {
  if (!q) return true;
  const b = bike(o.bid);
  const c = b ? own(b) : null;
  const plate = b && b.plate ? b.plate.toLowerCase() : "";
  const name = c && c.name ? c.name.toLowerCase() : "";
  const phone = c && c.phone ? c.phone.toLowerCase() : "";
  const txnId = getTxnId(o).toLowerCase();
  const jo = getJobNumber(o).toLowerCase();
  const wid = o.id ? o.id.toLowerCase() : "";
  const model = b ? `${b.make || ""} ${b.model || ""}`.toLowerCase() : "";

  return (
    plate.includes(q) ||
    name.includes(q) ||
    phone.includes(q) ||
    txnId.includes(q) ||
    jo.includes(q) ||
    wid.includes(q) ||
    model.includes(q)
  );
}

/**
 * Filters all work orders for Transactions & Billing based on active filter and search text.
 * @param {string} [filter=billFilter] - "all", "advances", "settlement", "completed".
 * @returns {Array<Object>} Filtered list of work orders.
 */
function getFilteredBillOrders(filter = billFilter) {
  const q = billSearch.trim().toLowerCase().replace(/\s+/g, " ");
  return D.wo.filter((o) => {
    if (filter === "all") {
      if (o.st === "Completed") return false;
    } else if (filter === "advances") {
      if (o.st === "Completed" || o.st === "Ready for Pickup") return false;
    } else if (filter === "settlement") {
      if (o.st !== "Ready for Pickup") return false;
    } else if (filter === "completed") {
      if (o.st !== "Completed") return false;
    }

    if (!matchesBillSearch(o, q)) return false;

    return true;
  });
}

/**
 * Builds HTML for Transactions & Billing page:
 * Header, search bar, dynamic status filter chips, and transaction table.
 * @returns {string} HTML string.
 */
function getBillViewHtml() {
  return `
    <div class="card top">
      <div>
        <h1>Transactions &amp; Billing</h1>
        <p>Manage job order invoices, advance payments, and payment settlements</p>
      </div>
    </div>

    <!-- Live Search Toolbar -->
    <div class="rep-search-wrap">
      <span class="search-icon" onclick="$('bill-search-input').focus()" title="Search">🔍</span>
      <input
        id="bill-search-input"
        type="text"
        placeholder="Search by Plate No., Customer Name, TXN ID, or Job Order..."
        value="${billSearch.replace(/"/g, '&quot;')}"
        autocomplete="off"
        oninput="onBillSearchInput(this.value)"
        onkeydown="if(event.key==='Enter')event.preventDefault()"
      />
      <button
        id="bill-search-clear"
        class="search-clear ${billSearch ? "visible" : ""}"
        onclick="clearBillSearch()"
        type="button"
        title="Clear search"
      >✕</button>
    </div>

    <!-- Filter Chips with Dynamic Counts -->
    <div id="bill-chips" class="rep-chips">${getBillChipsHtml()}</div>

    <!-- Transactions Table Container -->
    <div id="bill-results" class="card">${getBillResultsHtml()}</div>
  `;
}

/**
 * Handles live search input in Transactions & Billing.
 * @param {string} val - Input query.
 */
function onBillSearchInput(val) {
  billSearch = val;
  const clr = $("bill-search-clear");
  if (clr) {
    clr.classList.toggle("visible", val.trim().length > 0);
  }
  const chipsEl = $("bill-chips");
  if (chipsEl) {
    chipsEl.innerHTML = getBillChipsHtml();
  }
  const resEl = $("bill-results");
  if (resEl) {
    resEl.innerHTML = getBillResultsHtml();
  }
}

/**
 * Clears search input in Transactions & Billing.
 */
function clearBillSearch() {
  billSearch = "";
  const inp = $("bill-search-input");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("bill-search-clear");
  if (clr) clr.classList.remove("visible");
  const chipsEl = $("bill-chips");
  if (chipsEl) chipsEl.innerHTML = getBillChipsHtml();
  const resEl = $("bill-results");
  if (resEl) resEl.innerHTML = getBillResultsHtml();
}

/**
 * Sets active filter chip tab in Transactions & Billing.
 * @param {string} f - Filter key.
 */
function setBillFilter(f) {
  billFilter = f;
  const chipsEl = $("bill-chips");
  if (chipsEl) chipsEl.innerHTML = getBillChipsHtml();
  const resEl = $("bill-results");
  if (resEl) resEl.innerHTML = getBillResultsHtml();
}

/**
 * Refreshes dynamic chips and table in Transactions & Billing if currently active.
 */
function refreshBillView() {
  if (view === "bill") {
    const chipsEl = $("bill-chips");
    if (chipsEl) chipsEl.innerHTML = getBillChipsHtml();
    const resEl = $("bill-results");
    if (resEl) resEl.innerHTML = getBillResultsHtml();
  }
}

/**
 * Builds HTML for Transactions & Billing filter chips with dynamic counts.
 * @returns {string} HTML string.
 */
function getBillChipsHtml() {
  const chips = [
    { key: "all", label: "All Active", cls: "chip-all" },
    { key: "advances", label: "Pending Advances", cls: "chip-adv" },
    { key: "settlement", label: "Pending Final Settlement", cls: "chip-ready" },
    { key: "completed", label: "Completed Transactions", cls: "chip-completed" }
  ];

  return chips
    .map((c) => {
      const isSelected = billFilter === c.key;
      const count = getFilteredBillOrders(c.key).length;
      return `<button type="button" class="chip ${c.cls} ${
        isSelected ? "on" : ""
      }" onclick="setBillFilter('${c.key}')">${c.label} (${count})</button>`;
    })
    .join("");
}

/**
 * Builds HTML table or empty placeholder for Transactions & Billing results.
 * @returns {string} HTML string.
 */
function getBillResultsHtml() {
  const list = getFilteredBillOrders(billFilter);
  if (!list.length) {
    return `
      <div class="empty">
        <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:4px">No transactions found.</div>
        <div>Try a different search query or select another filter tab.</div>
      </div>
    `;
  }

  return `
    <div class="bill-table-wrap">
      <table>
        <thead>
          <tr>
            <th>TRANSACTION ID &amp; TYPE</th>
            <th>CUSTOMER / VEHICLE INFO</th>
            <th>TOTAL AMOUNT (₱)</th>
            <th>PAYMENT STATUS</th>
            <th class="r">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map((o) => {
              const b = bike(o.bid);
              const c = b ? own(b) : null;
              const brk = getOrderTotals(o);
              const advances = getAdvancesTotal(o);
              const isFinal = o.st === "Ready for Pickup" || o.st === "Completed";
              const totalLabel = isFinal ? "(Final)" : "(Est.)";
              const balanceDue = Math.max(0, brk.total - advances);
              const payStatus = getJobPaymentStatus(o);
              const txnId = getTxnId(o);
              const jo = getJobNumber(o);

              let actionsHtml = "";
              if (o.st === "Completed") {
                actionsHtml = `<button type="button" class="btn g sm" onclick="openReceipt('${o.id}')">View Receipt</button>`;
              } else if (o.st === "Ready for Pickup") {
                actionsHtml = `
                  <div style="display:flex;gap:6px;justify-content:flex-end;flex-wrap:wrap">
                    <button type="button" class="btn sm" onclick="openSettleBalanceModal('${o.id}')">Settle Balance →</button>
                    <button type="button" class="btn g sm" onclick="openAdvanceModal('${o.id}')" title="Record an advance payment">+ Advance</button>
                  </div>
                `;
              } else {
                actionsHtml = `<button type="button" class="btn sm btn-adv-pay" onclick="openAdvanceModal('${o.id}')">+ Advance Payment</button>`;
              }

              return `
                <tr>
                  <td>
                    <b>${txnId}</b>
                    <br><span class="badge-txn-type">REPAIR SERVICE</span>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${jo} · ${formatJobDate(o.done || o.at)}</div>
                  </td>
                  <td>
                    <b>${c ? escHtml(c.name) : "Walk-in Customer"}</b>
                    <div style="font-size:12px;color:var(--text-secondary)">${c && c.phone ? escHtml(c.phone) : "—"}</div>
                    <div style="font-size:12px;font-weight:600;margin-top:2px">${b ? escHtml(b.plate) : "NO PLATE"} · ${b ? escHtml(b.make + " " + b.model) : "Unknown"}</div>
                    <div style="font-size:11px;color:var(--text-muted)">${((o.odo !== undefined ? o.odo : b ? b.odo : 0) || 0).toLocaleString()} km · Assigned: ${escHtml(o.mech || "Unassigned")}</div>
                  </td>
                  <td>
                    <div style="font-weight:700;font-size:14px">${P(brk.total)} <span style="font-size:11px;font-weight:500;color:var(--text-muted)">${totalLabel}</span></div>
                    ${advances > 0 ? `<div style="font-size:11px;color:#047857">Advances: ${P(advances)}</div>` : ""}
                    ${o.st !== "Completed" ? `<div style="font-size:12px;font-weight:700;color:${balanceDue > 0 ? "var(--text-primary)" : "#047857"};margin-top:2px">Due: ${P(balanceDue)}</div>` : ""}
                  </td>
                  <td>
                    ${payStatus.pillHtml}
                    ${
                      o.st === "Completed" && o.pay
                        ? `<div style="font-size:11px;color:var(--text-muted);margin-top:3px">${escHtml(o.pay.method || "Cash")} · ${formatJobDate(o.pay.paidAt || o.done)}</div>`
                        : advances > 0
                          ? `<div style="font-size:11px;color:var(--text-muted);margin-top:3px">${o.advances.length} advance payment${o.advances.length > 1 ? "s" : ""}</div>`
                          : ""
                    }
                  </td>
                  <td class="r">
                    ${actionsHtml}
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Opens the Advance Payment modal for a work order.
 * @param {string} woId - Work order ID.
 */
function openAdvanceModal(woId) {
  const o = g("wo", woId);
  if (!o) return;
  advActiveWoId = woId;
  advPayMethod = "Cash";
  renderAdvanceModalContent(o);
  const ov = $("adv-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Advance Payment modal.
 */
function closeAdvanceModal() {
  const ov = $("adv-ov");
  if (ov) ov.classList.remove("on");
  advActiveWoId = null;
  document.body.style.overflow = "";
}

/**
 * Updates selected payment method in Advance Payment modal.
 * @param {string} method - "Cash", "GCash", or "Maya".
 */
function setAdvPayMethod(method) {
  advPayMethod = method;
  if (advActiveWoId) {
    const o = g("wo", advActiveWoId);
    if (o) renderAdvanceModalContent(o);
  }
}

/**
 * Renders contents of the Advance Payment modal dialog.
 * @param {Object} o - Work order record.
 */
function renderAdvanceModalContent(o) {
  const md = $("adv-md");
  if (!md) return;

  const b = bike(o.bid);
  const c = b ? own(b) : null;
  const brk = getOrderTotals(o);
  const advances = Array.isArray(o.advances) ? o.advances : [];
  const advancesTotal = getAdvancesTotal(o);
  const remaining = Math.max(0, brk.total - advancesTotal);
  const jo = getJobNumber(o);
  const method = advPayMethod || "Cash";

  md.innerHTML = `
    <div class="insp-header">
      <div>
        <div class="insp-title" id="adv-modal-title">Record Advance Payment</div>
        <div class="insp-subtitle">Job Order ${jo} · ${b ? escHtml(b.plate) : "NO PLATE"} (${b ? escHtml(b.make + " " + b.model) : "Unknown"})</div>
      </div>
      <button type="button" class="insp-close-btn" onclick="closeAdvanceModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <div class="insp-stage-body" style="padding-top:8px">
      <!-- Summary Context Box -->
      <div style="background:var(--bg-surface-alt);border:1px solid var(--border);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div><b>Customer:</b> ${c ? escHtml(c.name) : "Walk-in Customer"}</div>
        <div><b>Estimate Total:</b> ${P(brk.total)}</div>
        <div><b>Previous Advances:</b> <span style="color:#047857;font-weight:700">${P(advancesTotal)}</span></div>
        <div><b>Remaining Balance:</b> <span style="font-weight:700">${P(remaining)}</span></div>
      </div>

      ${
        advances.length
          ? `<div style="font-size:11px;color:var(--text-secondary);margin-bottom:12px">
              <b>Recorded Advances (${advances.length}):</b>
              <ul style="margin:4px 0 0 16px;padding:0">
                ${advances.map((a) => `<li>${formatJobDate(a.at)}: <b>${P(a.amount)}</b> via ${escHtml(a.method || "Cash")}${a.ref ? ` (${escHtml(a.ref)})` : ""}</li>`).join("")}
              </ul>
            </div>`
          : ""
      }

      <div class="insp-field-group">
        <label for="adv-amount">Advance Amount (₱)</label>
        <input
          id="adv-amount"
          type="number"
          min="1"
          placeholder="0.00"
          value="${remaining > 0 ? remaining : ""}"
          style="height:44px;font-size:18px;font-weight:700"
        />
      </div>

      <div class="insp-field-group">
        <label>Payment Method</label>
        <div style="display:flex;gap:8px">
          ${["Cash", "GCash", "Maya"]
            .map(
              (m) => `
            <button
              type="button"
              class="btn g sm"
              style="flex:1;${method === m ? "background:#2563EB;color:#FFFFFF;border-color:#2563EB;font-weight:700" : ""}"
              onclick="setAdvPayMethod('${m}')"
            >${m}</button>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="insp-field-group">
        <label for="adv-ref">Reference No. / Note (Optional)</label>
        <input
          id="adv-ref"
          type="text"
          placeholder="e.g. GCash Ref # 123456789 or Deposit note..."
        />
      </div>

      <div id="adv-err" class="insp-err" style="display:none"></div>

      <div class="insp-footer">
        <button type="button" class="btn g" onclick="closeAdvanceModal()">Cancel</button>
        <button type="button" class="btn btn-adv-pay" onclick="recordAdvancePayment('${o.id}')">Save Advance Payment</button>
      </div>
    </div>
  `;
}

/**
 * Saves a new advance payment to the work order.
 * @param {string} woId - Work order ID.
 */
function recordAdvancePayment(woId) {
  const o = g("wo", woId);
  if (!o) return;

  const errEl = $("adv-err");
  if (errEl) {
    errEl.style.display = "none";
    errEl.textContent = "";
  }

  const amt = +v("adv-amount") || 0;
  if (amt <= 0) {
    if (errEl) {
      errEl.textContent = "Please enter an advance amount greater than ₱0.";
      errEl.style.display = "block";
    }
    return;
  }

  const ref = v("adv-ref").trim();
  o.advances = Array.isArray(o.advances) ? o.advances : [];
  o.advances.push({
    id: uid(),
    amount: amt,
    method: advPayMethod || "Cash",
    ref: ref,
    at: nowLocalIso()
  });

  save();
  closeAdvanceModal();
  refreshBillView();
  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  }
}

/**
 * Opens the Settle Balance modal for a work order in "Ready for Pickup" status.
 * @param {string} woId - Work order ID.
 */
function openSettleBalanceModal(woId) {
  const o = g("wo", woId);
  if (!o) return;
  settleActiveWoId = woId;
  settlePayMethod = "Cash";
  const brk = getOrderTotals(o);
  const advances = getAdvancesTotal(o);
  const balanceDue = Math.max(0, brk.total - advances);
  o.tempTendered = balanceDue;
  renderSettleBalanceModalContent(o);
  const ov = $("settle-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
  document.body.style.overflow = "hidden";
}

/**
 * Closes the Settle Balance modal.
 */
function closeSettleBalanceModal() {
  const ov = $("settle-ov");
  if (ov) ov.classList.remove("on");
  settleActiveWoId = null;
  document.body.style.overflow = "";
}

/**
 * Renders contents of the Settle Balance modal.
 * @param {Object} o - Work order record.
 */
function renderSettleBalanceModalContent(o) {
  const md = $("settle-md");
  if (!md) return;

  const b = bike(o.bid);
  const brk = getOrderTotals(o);
  const allLines = lines(o);
  const laborLines = allLines.filter((l) => l.kind === "labor");
  const partLines = allLines.filter((l) => l.kind === "part");
  const advances = Array.isArray(o.advances) ? o.advances : [];
  const advancesTotal = getAdvancesTotal(o);
  const subtotal = brk.labor + brk.parts;
  const discount = Math.min(subtotal, Math.max(0, +o.discount || 0));
  const netTotal = Math.max(0, subtotal - discount);
  const balanceDue = Math.max(0, netTotal - advancesTotal);
  const method = settlePayMethod || "Cash";
  const tendered = o.tempTendered !== undefined ? o.tempTendered : balanceDue;
  const diff = tendered - balanceDue;
  const isSufficient = tendered >= balanceDue;
  const jo = getJobNumber(o);

  md.innerHTML = `
    <div class="insp-header">
      <div>
        <div class="insp-title" id="settle-modal-title">Settle Balance &amp; Release Motorcycle</div>
        <div class="insp-subtitle">Job Order ${jo} · ${b ? escHtml(b.plate) : "NO PLATE"} (${b ? escHtml(b.make + " " + b.model) : "Unknown"})</div>
      </div>
      <button type="button" class="insp-close-btn" onclick="closeSettleBalanceModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <div class="insp-bill-grid">
      <!-- Left Column: Itemized Statement -->
      <div class="insp-bill-side">
        <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:12px">Itemized Billing Statement</div>

        <!-- Labor Group -->
        <div style="font-weight:700;font-size:11px;color:var(--text-muted);text-transform:uppercase;margin-bottom:4px">
          Labor &amp; Service Charges
        </div>
        <table style="margin-bottom:8px;font-size:13px;width:100%">
          <tbody>
            ${
              !laborLines.length
                ? `<tr><td style="color:var(--text-muted);padding:4px 0">No labor charges</td></tr>`
                : laborLines.map((l) => `<tr><td style="padding:4px 0">${escHtml(l.n)}</td><td class="r" style="padding:4px 0">${P(l.a)}</td></tr>`).join("")
            }
            <tr style="border-top:1px dashed var(--border)">
              <td style="font-weight:700;padding-top:6px">Labor Subtotal</td>
              <td class="r" style="font-weight:700;padding-top:6px">${P(brk.labor)}</td>
            </tr>
          </tbody>
        </table>

        <!-- Parts Group -->
        <div style="font-weight:700;font-size:11px;color:var(--text-muted);text-transform:uppercase;margin:12px 0 4px">
          Parts &amp; Materials Used
        </div>
        <table style="margin-bottom:8px;font-size:13px;width:100%">
          <tbody>
            ${
              !partLines.length
                ? `<tr><td style="color:var(--text-muted);padding:4px 0">No parts used</td></tr>`
                : partLines.map((l) => `<tr><td style="padding:4px 0">${escHtml(l.n)}</td><td class="r" style="padding:4px 0">${P(l.a)}</td></tr>`).join("")
            }
            <tr style="border-top:1px dashed var(--border)">
              <td style="font-weight:700;padding-top:6px">Parts Subtotal</td>
              <td class="r" style="font-weight:700;padding-top:6px">${P(brk.parts)}</td>
            </tr>
          </tbody>
        </table>

        <!-- Discount Input -->
        <div style="margin-top:14px;padding-top:10px;border-top:1px solid var(--border)">
          <label for="settle-discount" style="font-size:11px;font-weight:700;color:var(--text-secondary);text-transform:uppercase;margin-bottom:4px">Discount / Adjustment (₱)</label>
          <input
            id="settle-discount"
            type="number"
            min="0"
            max="${subtotal}"
            value="${o.discount || 0}"
            style="height:38px;font-size:14px"
            oninput="onSettleDiscountChange('${o.id}', this.value)"
          />
        </div>

        <!-- Net Total Due -->
        <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:8px;border-top:1px solid var(--border);font-size:14px">
          <span>Net Repair Total</span>
          <span id="settle-net-total" style="font-weight:700">${P(netTotal)}</span>
        </div>

        <!-- Advances Section -->
        <div style="margin-top:12px;padding:10px;border-radius:8px;background:#F8FAFC;border:1px solid var(--border)">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#047857">
            <span>Previous Advance Payments</span>
            <span id="settle-adv-total">-${P(advancesTotal)}</span>
          </div>
          ${
            advances.length
              ? `<div style="font-size:11px;color:var(--text-muted);margin-top:4px">
                  ${advances.map((a) => `<div>• ${formatJobDate(a.at)}: ${P(a.amount)} (${escHtml(a.method || "Cash")}${a.ref ? ` · ${escHtml(a.ref)}` : ""})</div>`).join("")}
                </div>`
              : `<div style="font-size:11px;color:var(--text-muted);margin-top:2px">No advances previously recorded.</div>`
          }
        </div>

        <!-- Final Balance Due -->
        <div style="display:flex;justify-content:space-between;margin-top:14px;padding-top:10px;border-top:2px solid var(--text-primary);font-size:16px;font-weight:800;color:var(--text-primary)">
          <span>Balance Due</span>
          <span id="settle-balance-due">${P(balanceDue)}</span>
        </div>
      </div>

      <!-- Right Column: Payment Settlement -->
      <div class="insp-bill-side" style="display:flex;flex-direction:column;justify-content:space-between">
        <div>
          <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:12px">Payment Settlement</div>

          <div class="insp-field-group">
            <label>Payment Method</label>
            <div style="display:flex;gap:8px">
              ${["Cash", "GCash", "Maya"]
                .map(
                  (m) => `
                <button
                  type="button"
                  class="btn g sm"
                  style="flex:1;${method === m ? "background:#2563EB;color:#FFFFFF;border-color:#2563EB;font-weight:700" : ""}"
                  onclick="setSettlePaymentMethod('${o.id}', '${m}')"
                >${m}</button>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="insp-field-group">
            <label for="settle-tendered">Amount Tendered (₱)</label>
            <input
              id="settle-tendered"
              type="number"
              min="0"
              placeholder="0.00"
              value="${tendered !== undefined ? tendered : balanceDue}"
              style="height:44px;font-size:18px;font-weight:700"
              oninput="onSettleTenderedChange('${o.id}', this.value)"
            />
          </div>

          <!-- Live Change / Short Status -->
          <div id="settle-change-display" style="padding:12px;border-radius:8px;background:${isSufficient ? "#F0FDF4" : "#FEF2F2"};border:1px solid ${isSufficient ? "#BBF7D0" : "#FECACA"};margin-top:12px">
            ${
              isSufficient
                ? `<div style="color:#166534;font-size:14px;font-weight:700">Change: <b>${P(diff)}</b></div>`
                : `<div style="color:#DC2626;font-size:14px;font-weight:700">Short by ${P(Math.abs(diff))}</div>`
            }
          </div>
        </div>

        <div style="margin-top:20px;display:flex;flex-direction:column;gap:8px">
          <button
            type="button"
            class="btn g"
            onclick="openReceipt('${o.id}')"
            style="width:100%;text-align:center;box-sizing:border-box"
          >
            🖨️ Print / View Digital Receipt
          </button>
        </div>
      </div>
    </div>

    <!-- Sticky Footer -->
    <div class="insp-footer">
      <div class="insp-footer-helper" id="settle-footer-helper">
        ${!isSufficient ? "Enter full tendered amount to complete payment and release." : "Payment verified."}
      </div>
      <button
        type="button"
        id="btn-settle-release"
        class="btn"
        ${!isSufficient ? "disabled style='opacity:0.5;cursor:not-allowed'" : ""}
        onclick="confirmSettleAndRelease('${o.id}')"
      >
        Mark as Paid &amp; Release Motorcycle ✓
      </button>
    </div>
  `;
}

/**
 * Handles discount input change in Settle Balance modal.
 * @param {string} woId - Work order ID.
 * @param {string} val - Numeric discount string.
 */
function onSettleDiscountChange(woId, val) {
  const o = g("wo", woId);
  if (!o) return;
  const brk = getOrderTotals(o);
  const subtotal = brk.labor + brk.parts;
  const num = Math.min(subtotal, Math.max(0, +val || 0));
  o.discount = num;
  save();

  const netTotal = Math.max(0, subtotal - num);
  const advancesTotal = getAdvancesTotal(o);
  const balanceDue = Math.max(0, netTotal - advancesTotal);

  const netEl = $("settle-net-total");
  if (netEl) netEl.textContent = P(netTotal);

  const dueEl = $("settle-balance-due");
  if (dueEl) dueEl.textContent = P(balanceDue);

  const tenderedEl = $("settle-tendered");
  const tendered = tenderedEl ? +tenderedEl.value || 0 : 0;
  updateSettleTenderedCalc(balanceDue, tendered);
}

/**
 * Sets payment method in Settle Balance modal.
 * @param {string} woId - Work order ID.
 * @param {string} method - "Cash", "GCash", or "Maya".
 */
function setSettlePaymentMethod(woId, method) {
  const o = g("wo", woId);
  if (!o) return;
  settlePayMethod = method;
  renderSettleBalanceModalContent(o);
}

/**
 * Handles tendered amount input in Settle Balance modal.
 * @param {string} woId - Work order ID.
 * @param {string} val - Tendered amount string.
 */
function onSettleTenderedChange(woId, val) {
  const o = g("wo", woId);
  if (!o) return;
  const tendered = Math.max(0, +val || 0);
  o.tempTendered = tendered;

  const brk = getOrderTotals(o);
  const subtotal = brk.labor + brk.parts;
  const discount = Math.min(subtotal, Math.max(0, +o.discount || 0));
  const netTotal = Math.max(0, subtotal - discount);
  const advancesTotal = getAdvancesTotal(o);
  const balanceDue = Math.max(0, netTotal - advancesTotal);

  updateSettleTenderedCalc(balanceDue, tendered);
}

/**
 * Updates live change or short indicator and enables/disables the Settle & Release button.
 * @param {number} balanceDue - Net balance due.
 * @param {number} tendered - Tendered amount.
 */
function updateSettleTenderedCalc(balanceDue, tendered) {
  const displayEl = $("settle-change-display");
  const btnEl = $("btn-settle-release");
  const helperEl = $("settle-footer-helper");
  const diff = tendered - balanceDue;
  const isSufficient = tendered >= balanceDue;

  if (displayEl) {
    displayEl.style.background = isSufficient ? "#F0FDF4" : "#FEF2F2";
    displayEl.style.borderColor = isSufficient ? "#BBF7D0" : "#FECACA";
    displayEl.innerHTML = isSufficient
      ? `<div style="color:#166534;font-size:14px;font-weight:700">Change: <b>${P(diff)}</b></div>`
      : `<div style="color:#DC2626;font-size:14px;font-weight:700">Short by ${P(Math.abs(diff))}</div>`;
  }

  if (helperEl) {
    helperEl.textContent = isSufficient
      ? "Payment verified."
      : "Enter full tendered amount to complete payment and release.";
  }

  if (btnEl) {
    if (isSufficient) {
      btnEl.removeAttribute("disabled");
      btnEl.style.opacity = "1";
      btnEl.style.cursor = "pointer";
    } else {
      btnEl.setAttribute("disabled", "true");
      btnEl.style.opacity = "0.5";
      btnEl.style.cursor = "not-allowed";
    }
  }
}

/**
 * Finalizes billing settlement, sets work order to "Completed", records pay timestamp, and closes modal.
 * @param {string} woId - Work order ID.
 */
function confirmSettleAndRelease(woId) {
  const o = g("wo", woId);
  if (!o) return;

  const brk = getOrderTotals(o);
  const subtotal = brk.labor + brk.parts;
  const discount = Math.min(subtotal, Math.max(0, +o.discount || 0));
  const netTotal = Math.max(0, subtotal - discount);
  const advancesTotal = getAdvancesTotal(o);
  const balanceDue = Math.max(0, netTotal - advancesTotal);

  const tenderedEl = $("settle-tendered");
  const tendered = tenderedEl ? Math.max(0, +tenderedEl.value || 0) : balanceDue;
  if (tendered < balanceDue) return;

  const method = settlePayMethod || "Cash";
  const change = Math.max(0, tendered - balanceDue);
  const timeNow = nowLocalIso();

  o.st = "Completed";
  o.pay = {
    method: method,
    tendered: tendered,
    change: change,
    netPaid: Math.min(tendered, balanceDue),
    advancesTotal: advancesTotal,
    paidAt: timeNow
  };
  o.done = timeNow;

  const b = bike(o.bid);
  if (b && o.odo > (b.odo || 0)) {
    b.odo = o.odo;
  }

  delete o.tempPayMethod;
  delete o.tempTendered;

  save();
  closeSettleBalanceModal();
  if (view === "bill") {
    refreshBillView();
  } else if (view === "rep") {
    go("rep");
  }
  openReceipt(woId);
}

/**
 * Legacy compatibility alias for finalizing billing settlement.
 * @param {string} woId - Work order ID.
 */
function markPaidAndRelease(woId) {
  confirmSettleAndRelease(woId);
}

/**
 * Opens the digital receipt modal for a completed or billing-stage work order.
 * @param {string} woId - Work order ID.
 */
function openReceipt(woId) {
  const o = g("wo", woId);
  if (!o) return;

  const b = bike(o.bid);
  const c = b ? own(b) : null;
  const brk = getOrderTotals(o);
  const allLines = lines(o);
  const laborLines = allLines.filter((l) => l.kind === "labor");
  const partLines = allLines.filter((l) => l.kind === "part");
  const jo = getJobNumber(o);
  const pay = o.pay || {
    method: o.tempPayMethod || "Cash",
    tendered: brk.total,
    change: 0,
    paidAt: o.done || o.at || ""
  };

  const md = $("rcpt-md");
  if (!md) return;

  md.innerHTML = `
    <div style="text-align:center;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:16px">
      <div style="font-size:28px">🏍️</div>
      <h2 style="margin:4px 0 2px;font-size:22px;color:#0F172A">MotoShop</h2>
      <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">Official Repair &amp; Service Receipt</div>
      <div style="font-size:13px;font-weight:700;color:var(--primary);margin-top:6px">${jo}</div>
      <div style="font-size:11px;color:var(--text-muted)">${formatJobDate(pay.paidAt || today())} · ${formatJobTime(pay.paidAt || "")}</div>
    </div>

    <!-- Vehicle & Customer Meta -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;font-size:12px;background:#F8FAFC;padding:12px;border-radius:8px;border:1px solid var(--border)">
      <div>
        <div style="color:var(--text-muted);font-weight:600">CUSTOMER</div>
        <div style="font-weight:700;color:var(--text-primary)">${c ? escHtml(c.name) : "—"}</div>
        <div style="color:var(--text-secondary)">${c ? escHtml(c.phone) : ""}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">MOTORCYCLE</div>
        <div style="font-weight:700;color:var(--text-primary)">${b ? escHtml(b.plate) : "—"}</div>
        <div style="color:var(--text-secondary)">${b ? escHtml(b.make + " " + b.model) : ""} · ${(o.odo || (b ? b.odo : 0) || 0).toLocaleString()} km</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">MECHANIC</div>
        <div style="font-weight:700;color:var(--text-primary)">${escHtml(o.mech || "Unassigned")}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">STATUS</div>
        <div>${badge(o.st)}</div>
      </div>
    </div>

    <!-- Itemized Lines -->
    <table style="width:100%;margin-bottom:12px;font-size:12px">
      <thead>
        <tr style="border-bottom:1px solid var(--border)">
          <th style="padding:6px 0">ITEM / SERVICE</th>
          <th class="r" style="padding:6px 0">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        ${
          laborLines.length
            ? `<tr><td colspan="2" style="font-weight:700;font-size:10px;text-transform:uppercase;color:var(--text-muted);padding:8px 0 4px">Labor &amp; Services</td></tr>` +
              laborLines.map((l) => `<tr><td style="padding:4px 0">${escHtml(l.n)}</td><td class="r" style="padding:4px 0">${P(l.a)}</td></tr>`).join("")
            : ""
        }
        ${
          partLines.length
            ? `<tr><td colspan="2" style="font-weight:700;font-size:10px;text-transform:uppercase;color:var(--text-muted);padding:8px 0 4px">Parts &amp; Materials</td></tr>` +
              partLines.map((l) => `<tr><td style="padding:4px 0">${escHtml(l.n)}</td><td class="r" style="padding:4px 0">${P(l.a)}</td></tr>`).join("")
            : ""
        }
      </tbody>
    </table>

    <!-- Totals & Payment -->
    <div style="border-top:1px solid var(--border);padding-top:10px;font-size:13px;display:flex;flex-direction:column;gap:4px">
      <div style="display:flex;justify-content:space-between">
        <span>Subtotal</span>
        <span>${P(brk.labor + brk.parts)}</span>
      </div>
      ${
        brk.discount
          ? `<div style="display:flex;justify-content:space-between;color:#059669">
              <span>Discount</span>
              <span>-${P(brk.discount)}</span>
            </div>`
          : ""
      }
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;border-top:1px solid var(--border);padding-top:6px;margin-top:4px">
        <span>Total Paid</span>
        <span>${P(brk.total)}</span>
      </div>
    </div>

    <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-top:14px;font-size:12px">
      <div style="display:flex;justify-content:space-between">
        <span>Payment Method:</span>
        <b>${escHtml(pay.method || "Cash")}</b>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:3px">
        <span>Amount Tendered:</span>
        <b>${P(pay.tendered || brk.total)}</b>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:3px">
        <span>Change:</span>
        <b>${P(pay.change || 0)}</b>
      </div>
    </div>

    <div style="text-align:center;margin-top:20px;font-size:12px;color:var(--text-muted)">
      Thank you for your business! Ride safely.
    </div>

    <div class="rcpt-no-print" style="display:flex;justify-content:flex-end;gap:8px;margin-top:20px;border-top:1px solid var(--border);padding-top:14px">
      <button type="button" class="btn g" onclick="closeReceipt()">Close</button>
      <button type="button" class="btn" onclick="window.print()">🖨️ Print Receipt</button>
    </div>
  `;

  const ov = $("rcpt-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
}

/**
 * Closes the digital receipt modal.
 */
function closeReceipt() {
  const ov = $("rcpt-ov");
  if (ov) ov.classList.remove("on");
}


/* ==========================================================
   USER MANAGEMENT
   ========================================================== */

/** Currently active tab on User Management screen ("directory" or "matrix"). */
let userMgmtTab = "directory";

/** Active search query for user directory table. */
let userSearch = "";

/** Active role filter for user directory ("all", "superadmin", "admin", "mechanic"). */
let userRoleFilter = "all";

/** Active status filter for user directory ("all", "active", "inactive"). */
let userStatusFilter = "all";

/** Currently edited user ID in Add/Edit user modal (null = adding new user). */
let editingUserId = null;

/** Inline reset confirmation state for permissions matrix defaults. */
let matrixResetConfirmActive = false;
let matrixResetTimer = null;

/**
 * Sets the active tab on the User Management screen.
 * @param {"directory"|"matrix"} tab - Target tab.
 */
function setUserMgmtTab(tab) {
  userMgmtTab = tab;
  const main = $("main");
  if (main) main.innerHTML = getUsersViewHtml();
}

/**
 * Handles live search input on User Directory tab.
 * Refreshes only the table rows to preserve input focus.
 * @param {string} val - Typed search string.
 */
function onUserSearchInput(val) {
  userSearch = val;
  const tbody = $("user-table-body");
  if (tbody) tbody.innerHTML = getUserTableRowsHtml();
}

/**
 * Handles role filter dropdown changes.
 * @param {string} val - Selected role or "all".
 */
function onUserRoleFilterChange(val) {
  userRoleFilter = val;
  const tbody = $("user-table-body");
  if (tbody) tbody.innerHTML = getUserTableRowsHtml();
}

/**
 * Handles status filter dropdown changes.
 * @param {string} val - Selected status or "all".
 */
function onUserStatusFilterChange(val) {
  userStatusFilter = val;
  const tbody = $("user-table-body");
  if (tbody) tbody.innerHTML = getUserTableRowsHtml();
}

/**
 * Returns filtered user accounts matching search and dropdown filters.
 * @returns {Array<Object>} Filtered list of user accounts.
 */
function getFilteredUsers() {
  const users = loadUsers();
  const q = (userSearch || "").trim().toLowerCase();
  return users.filter((u) => {
    if (userRoleFilter !== "all" && u.role !== userRoleFilter) return false;
    if (userStatusFilter === "active" && u.active === false) return false;
    if (userStatusFilter === "inactive" && u.active !== false) return false;
    if (!q) return true;
    const name = (u.name || "").toLowerCase();
    const email = (u.email || "").toLowerCase();
    return name.includes(q) || email.includes(q);
  });
}

/**
 * Formats user role badge with role-tinted background, border, and icon.
 * @param {string} role - System role key.
 * @returns {string} HTML markup string.
 */
function getUserRoleBadge(role) {
  if (role === "superadmin") {
    return `<span class="um-role-badge superadmin">🛡️ SUPER ADMIN</span>`;
  }
  if (role === "admin") {
    return `<span class="um-role-badge admin">👑 ADMIN</span>`;
  }
  return `<span class="um-role-badge mechanic">🔧 MECHANIC</span>`;
}

/**
 * Formats a stored local timestamp string into a dark date and muted time.
 * @param {string} ts - Stored local timestamp ("YYYY-MM-DD HH:MM").
 * @returns {string} Formatted HTML.
 */
function formatLastLoginDisplay(ts) {
  if (!ts || !ts.trim()) {
    return `<span style="color:var(--text-muted)">Never</span>`;
  }
  const parts = ts.trim().split(" ");
  if (parts.length !== 2) return `<span style="color:var(--text-muted)">Never</span>`;
  const [datePart, timePart] = parts;
  const [y, m, d] = datePart.split("-").map(Number);
  const [hr, min] = timePart.split(":").map(Number);
  if (!y || !m || !d || isNaN(hr) || isNaN(min)) {
    return `<span style="color:var(--text-muted)">Never</span>`;
  }
  const dateObj = new Date(y, m - 1, d, hr, min);
  const dateStr = dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = dateObj.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  return `
    <div style="font-weight:600;color:var(--text-primary)">${escHtml(dateStr)}</div>
    <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(timeStr)}</div>
  `;
}

/**
 * Builds HTML table rows for the User Directory table.
 * @returns {string} HTML table rows.
 */
function getUserTableRowsHtml() {
  const list = getFilteredUsers();
  if (!list.length) {
    return `
      <tr>
        <td colspan="5" style="text-align:center;padding:36px;color:var(--text-muted)">
          <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:4px">No users found.</div>
          <div>Try a different search or filter.</div>
        </td>
      </tr>
    `;
  }

  const current = getCurrentUser();
  const curId = current ? current.id : null;
  const allUsers = loadUsers();
  const activeSuperAdmins = allUsers.filter((u) => u.role === "superadmin" && u.active !== false).length;

  return list.map((u) => {
    const isSelf = u.id === curId;
    const isLastSuperAdmin = u.role === "superadmin" && activeSuperAdmins <= 1 && u.active !== false;
    const canToggleStatus = !isSelf && !isLastSuperAdmin;
    const isActive = u.active !== false;
    const roleBadge = getUserRoleBadge(u.role);
    const statusBadge = isActive
      ? `<span class="um-status-pill active">● Active</span>`
      : `<span class="um-status-pill inactive">● Inactive</span>`;
    const lastLoginHtml = formatLastLoginDisplay(u.lastLogin);
    const emailPrefix = (u.email || "").split("@")[0] || "user";
    const usernameStr = `@${emailPrefix}.${u.role}`;

    return `
      <tr>
        <td>
          <div class="um-user-cell">
            <div class="um-avatar ${escHtml(u.role)}">${getInitials(u.name)}</div>
            <div>
              <div class="um-user-name-row">
                <span class="um-user-name">${escHtml(u.name)}</span>
                ${isSelf ? `<span class="um-you-pill">You</span>` : ""}
              </div>
              <div class="um-username">${escHtml(usernameStr)}</div>
            </div>
          </div>
        </td>
        <td>${roleBadge}</td>
        <td>${statusBadge}</td>
        <td>${lastLoginHtml}</td>
        <td class="r" style="white-space:nowrap">
          <button type="button" class="um-action-btn" onclick="openEditUserModal('${u.id}')" title="Edit user" aria-label="Edit user">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button type="button" class="um-action-btn" onclick="openViewAccessModal('${u.id}')" title="View access" aria-label="View access">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="7.5" cy="15.5" r="5.5"></circle>
              <path d="m21 2-9.6 9.6"></path>
              <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
            </svg>
          </button>
          ${canToggleStatus ? `
            <button type="button" class="um-action-btn" onclick="toggleUserActive('${u.id}')" title="${isActive ? "Deactivate user" : "Reactivate user"}" aria-label="${isActive ? "Deactivate user" : "Reactivate user"}">
              ${isActive
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="22" y1="11" x2="16" y2="11"></line></svg>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#047857" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>`
              }
            </button>
          ` : ""}
        </td>
      </tr>
    `;
  }).join("");
}

/**
 * Toggles a user's active/inactive status.
 * Prevents self-deactivation and deactivation of the last active Super Admin.
 * @param {string} userId - ID of user to toggle.
 */
function toggleUserActive(userId) {
  const users = loadUsers();
  const u = users.find((x) => x.id === userId);
  if (!u) return;

  const current = getCurrentUser();
  if (current && current.id === u.id) return;

  const activeSuperAdmins = users.filter((x) => x.role === "superadmin" && x.active !== false).length;
  if (u.role === "superadmin" && activeSuperAdmins <= 1 && u.active !== false) return;

  u.active = !u.active;
  saveUsers(users);

  const tbody = $("user-table-body");
  if (tbody) tbody.innerHTML = getUserTableRowsHtml();
}

/**
 * Opens modal dialog to add a new user.
 */
function openAddUserModal() {
  editingUserId = null;
  renderUserModal();
}

/**
 * Opens modal dialog to edit an existing user.
 * @param {string} userId - User ID to edit.
 */
function openEditUserModal(userId) {
  editingUserId = userId;
  renderUserModal();
}

/**
 * Closes the Add/Edit User modal dialog.
 */
function closeUserModal() {
  editingUserId = null;
  const ov = $("user-ov");
  if (ov) {
    ov.classList.remove("on");
    ov.style.display = "none";
  }
  document.body.style.overflow = "";
}

/**
 * Renders the Add / Edit User modal content and displays the modal overlay.
 */
function renderUserModal() {
  const ov = $("user-ov");
  const md = $("user-md");
  if (!ov || !md) return;

  const isEdit = Boolean(editingUserId);
  const users = loadUsers();
  const u = isEdit ? users.find((x) => x.id === editingUserId) : null;
  const current = getCurrentUser();
  const isSelf = isEdit && current && current.id === editingUserId;
  const activeSuperAdmins = users.filter((x) => x.role === "superadmin" && x.active !== false).length;
  const isLastSuperAdmin = isEdit && u && u.role === "superadmin" && activeSuperAdmins <= 1;

  const title = isEdit ? "Edit User" : "Add New User";
  const nameVal = u ? u.name : "";
  const emailVal = u ? u.email : "";
  const roleVal = u ? u.role : "mechanic";
  const statusVal = u && u.active === false ? "inactive" : "active";

  md.innerHTML = `
    <div class="insp-header">
      <div>
        <div class="insp-title" id="user-modal-title">${title}</div>
        <div class="insp-subtitle">${isEdit ? "Update user account information and role access." : "Create a new employee account."}</div>
      </div>
      <button type="button" class="insp-close-btn" onclick="closeUserModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <div style="padding:20px;display:flex;flex-direction:column;gap:14px">
      <div id="user-form-error" style="display:none;color:#DC2626;font-size:13px;background:#FEE2E2;border:1px solid #FCA5A5;padding:8px 12px;border-radius:8px"></div>

      <div>
        <label style="display:block;font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">Full Name</label>
        <input
          id="user-name-input"
          type="text"
          placeholder="e.g. Juan dela Cruz"
          value="${escHtml(nameVal)}"
          style="width:100%;box-sizing:border-box;height:44px;padding:0 12px;border-radius:10px;border:1px solid #E2E8F0;background:#F8FAFC;font-size:14px"
        />
      </div>

      <div>
        <label style="display:block;font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">Email Address</label>
        <input
          id="user-email-input"
          type="email"
          placeholder="e.g. employee@gmail.com"
          value="${escHtml(emailVal)}"
          style="width:100%;box-sizing:border-box;height:44px;padding:0 12px;border-radius:10px;border:1px solid #E2E8F0;background:#F8FAFC;font-size:14px"
        />
      </div>

      <div>
        <label style="display:block;font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">Role</label>
        <select
          id="user-role-input"
          ${(isSelf || isLastSuperAdmin) ? "disabled" : ""}
          style="width:100%;box-sizing:border-box;height:44px;padding:0 12px;border-radius:10px;border:1px solid #E2E8F0;background:#F8FAFC;font-size:14px;cursor:pointer"
        >
          <option value="mechanic" ${roleVal === "mechanic" ? "selected" : ""}>Mechanic</option>
          <option value="admin" ${roleVal === "admin" ? "selected" : ""}>Admin</option>
          <option value="superadmin" ${roleVal === "superadmin" ? "selected" : ""}>Super Admin</option>
        </select>
        ${isSelf ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">You can't change your own role.</div>` : ""}
        ${isLastSuperAdmin && !isSelf ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">Cannot reassign the last active Super Admin.</div>` : ""}
      </div>

      ${isEdit ? `
        <div>
          <label style="display:block;font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">Account Status</label>
          <select
            id="user-status-input"
            ${(isSelf || isLastSuperAdmin) ? "disabled" : ""}
            style="width:100%;box-sizing:border-box;height:44px;padding:0 12px;border-radius:10px;border:1px solid #E2E8F0;background:#F8FAFC;font-size:14px;cursor:pointer"
          >
            <option value="active" ${statusVal === "active" ? "selected" : ""}>Active</option>
            <option value="inactive" ${statusVal === "inactive" ? "selected" : ""}>Inactive</option>
          </select>
          ${isSelf ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">You can't deactivate yourself.</div>` : ""}
          ${isLastSuperAdmin && !isSelf ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px">Cannot deactivate the last active Super Admin.</div>` : ""}
        </div>
      ` : ""}
    </div>

    <div class="insp-footer" style="position:static;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px">
      <button type="button" class="btn g" onclick="closeUserModal()">Cancel</button>
      <button type="button" class="btn" style="background:#2563EB" onclick="saveUserModal()">Save User</button>
    </div>
  `;

  ov.style.display = "block";
  ov.classList.add("on");
  document.body.style.overflow = "hidden";
  const nameInp = $("user-name-input");
  if (nameInp) nameInp.focus();
}

/**
 * Validates and saves Add/Edit user form.
 */
function saveUserModal() {
  const nameEl = $("user-name-input");
  const emailEl = $("user-email-input");
  const roleEl = $("user-role-input");
  const statusEl = $("user-status-input");
  const errEl = $("user-form-error");

  const name = nameEl ? nameEl.value.trim() : "";
  const email = emailEl ? emailEl.value.trim() : "";
  const role = roleEl ? roleEl.value : "mechanic";
  const status = statusEl ? statusEl.value : "active";

  const showErr = (msg) => {
    if (errEl) {
      errEl.textContent = msg;
      errEl.style.display = "block";
    }
  };

  if (!name) {
    showErr("Please enter the user's full name.");
    if (nameEl) nameEl.focus();
    return;
  }

  if (!email) {
    showErr("Please enter an email address.");
    if (emailEl) emailEl.focus();
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showErr("Please enter a valid email address (e.g. user@domain.com).");
    if (emailEl) emailEl.focus();
    return;
  }

  const users = loadUsers();
  const isEdit = Boolean(editingUserId);

  // Email unique check
  const duplicate = users.find((x) => x.id !== editingUserId && (x.email || "").toLowerCase() === email.toLowerCase());
  if (duplicate) {
    showErr("That email is already registered to another account.");
    if (emailEl) emailEl.focus();
    return;
  }

  const current = getCurrentUser();
  const isSelf = isEdit && current && current.id === editingUserId;
  const activeSuperAdmins = users.filter((x) => x.role === "superadmin" && x.active !== false).length;

  if (isEdit) {
    const target = users.find((x) => x.id === editingUserId);
    if (!target) return;

    const oldName = target.name;
    target.name = name;
    target.email = email;

    if (!isSelf) {
      if (target.role === "superadmin" && activeSuperAdmins <= 1 && role !== "superadmin") {
        showErr("Cannot change role: at least one active Super Admin is required.");
        return;
      }
      target.role = role;
      if (statusEl) {
        if (target.role === "superadmin" && activeSuperAdmins <= 1 && status === "inactive") {
          showErr("Cannot deactivate: at least one active Super Admin is required.");
          return;
        }
        target.active = status === "active";
      }
    }

    if (oldName && oldName !== name) {
      D.wo.forEach((wo) => {
        if (wo.mech && wo.mech.trim() === oldName.trim()) {
          wo.mech = name;
        }
      });
      save();
    }

    if (isSelf) {
      const nameSidebar = $("user-name");
      if (nameSidebar) nameSidebar.textContent = name;
      const avSidebar = $("user-av");
      if (avSidebar) avSidebar.textContent = getInitials(name);
    }
  } else {
    const newUser = {
      id: uid(),
      name: name,
      email: email,
      role: role,
      active: true,
      lastLogin: ""
    };
    users.push(newUser);
  }

  saveUsers(users);
  closeUserModal();

  const tbody = $("user-table-body");
  if (tbody) tbody.innerHTML = getUserTableRowsHtml();
}

/**
 * Opens view access modal showing role description and accessible pages for a user.
 * @param {string} userId
 */
function openViewAccessModal(userId) {
  const users = loadUsers();
  const u = users.find((x) => x.id === userId);
  if (!u) return;

  const ov = $("access-ov");
  const md = $("access-md");
  if (!ov || !md) return;

  const allowedKeys = getRoleNav(u.role);
  const allowedPages = V.filter((x) => allowedKeys.includes(x[0]));

  let desc = "Standard user with assigned role access.";
  if (u.role === "superadmin") {
    desc = "Complete control over user accounts, permissions, reports, and service history.";
  } else if (u.role === "admin") {
    desc = "Operations manager with full access to active repairs, customers, catalog, billing, and reports.";
  } else if (u.role === "mechanic") {
    desc = "Service floor specialist with access to dashboard queue, inspections, and assigned repair jobs.";
  }

  md.innerHTML = `
    <div class="insp-header">
      <div>
        <div class="insp-title" id="access-modal-title">Role Access &amp; Permissions</div>
        <div class="insp-subtitle">${escHtml(u.name)} (${escHtml(u.email)})</div>
      </div>
      <button type="button" class="insp-close-btn" onclick="closeViewAccessModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <div style="padding:20px;display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px">
        <div class="um-avatar ${escHtml(u.role)}">${getInitials(u.name)}</div>
        <div>
          <div style="font-weight:700;font-size:15px;color:var(--text-primary)">${escHtml(u.name)}</div>
          <div style="margin-top:2px">${getUserRoleBadge(u.role)}</div>
        </div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Role Description</div>
        <div style="font-size:13px;color:var(--text-secondary);line-height:1.5">${desc}</div>
      </div>

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Accessible Navigation Pages</div>
        <div style="display:flex;flex-direction:column;gap:6px">
          ${allowedPages.map((p) => `
            <div style="display:flex;align-items:center;gap:8px;padding:8px 10px;background:#FFFFFF;border:1px solid #E2E8F0;border-radius:8px;font-size:13px;font-weight:600">
              <span>${p[1]}</span>
              <span>${p[2]}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <div class="insp-footer" style="position:static;padding-top:14px;border-top:1px solid var(--border);display:flex;justify-content:flex-end">
      <button type="button" class="btn" onclick="closeViewAccessModal()">Close</button>
    </div>
  `;

  ov.style.display = "block";
  ov.classList.add("on");
  document.body.style.overflow = "hidden";
}

/**
 * Closes the View Access modal dialog.
 */
function closeViewAccessModal() {
  const ov = $("access-ov");
  if (ov) {
    ov.classList.remove("on");
    ov.style.display = "none";
  }
  document.body.style.overflow = "";
}

/**
 * Builds HTML for the Permissions Matrix tab table.
 * @returns {string} HTML string.
 */
function getPermissionsMatrixHtml() {
  const superNav = getRoleNav("superadmin");
  const adminNav = getRoleNav("admin");
  const mechNav = getRoleNav("mechanic");

  return `
    <div class="matrix-card">
      <table class="matrix-table">
        <thead>
          <tr>
            <th>PAGE / MODULE</th>
            <th>SUPER ADMIN</th>
            <th>ADMIN</th>
            <th>MECHANIC</th>
          </tr>
        </thead>
        <tbody>
          ${V.map((route) => {
            const key = route[0];
            const icon = route[1];
            const label = route[2];

            const isSuperLocked = key === "users";
            const isAdminLocked = key === "dash";

            const hasSuper = superNav.includes(key);
            const hasAdmin = adminNav.includes(key);
            const hasMech = mechNav.includes(key);

            return `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px;font-weight:700">
                    <span style="font-size:16px">${icon}</span>
                    <span>${label}</span>
                  </div>
                </td>
                <td>
                  <label class="matrix-check-wrap" title="${isSuperLocked ? "Super Admin must always have access to User Management." : ""}">
                    <input
                      type="checkbox"
                      class="matrix-check"
                      ${hasSuper ? "checked" : ""}
                      ${isSuperLocked ? "disabled" : ""}
                      onchange="toggleMatrixPermission('superadmin', '${key}', this.checked)"
                    />
                    ${isSuperLocked ? `<span style="font-size:12px" title="Locked permission">🔒</span>` : ""}
                  </label>
                </td>
                <td>
                  <label class="matrix-check-wrap" title="${isAdminLocked ? "Admin must always have access to Dashboard." : ""}">
                    <input
                      type="checkbox"
                      class="matrix-check"
                      ${hasAdmin ? "checked" : ""}
                      ${isAdminLocked ? "disabled" : ""}
                      onchange="toggleMatrixPermission('admin', '${key}', this.checked)"
                    />
                    ${isAdminLocked ? `<span style="font-size:12px" title="Locked permission">🔒</span>` : ""}
                  </label>
                </td>
                <td>
                  <label class="matrix-check-wrap">
                    <input
                      type="checkbox"
                      class="matrix-check"
                      ${hasMech ? "checked" : ""}
                      onchange="toggleMatrixPermission('mechanic', '${key}', this.checked)"
                    />
                  </label>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>

      <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <p style="margin:0;font-size:13px;color:var(--text-muted);font-style:italic">
          This controls which pages each role can open. It hides pages in the browser only and is not real security.
        </p>
        <button
          type="button"
          id="btn-matrix-reset"
          class="btn g sm"
          onclick="resetMatrixDefaults()"
          style="color:var(--text-muted);font-weight:600"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  `;
}

/**
 * Toggles a role's page permission in the matrix, persists to "moto1_nav", and updates sidebar.
 * @param {string} role - Role key.
 * @param {string} pageKey - Route key.
 * @param {boolean} checked - Desired state.
 */
function toggleMatrixPermission(role, pageKey, checked) {
  if (role === "superadmin" && pageKey === "users") return;
  if (role === "admin" && pageKey === "dash") return;

  const currentNav = {
    superadmin: getRoleNav("superadmin"),
    admin: getRoleNav("admin"),
    mechanic: getRoleNav("mechanic")
  };

  const list = currentNav[role] || [];
  if (checked) {
    if (!list.includes(pageKey)) list.push(pageKey);
  } else {
    const idx = list.indexOf(pageKey);
    if (idx !== -1) list.splice(idx, 1);
  }
  currentNav[role] = list;
  currentNav._v = 2;

  try {
    localStorage.setItem("moto1_nav", JSON.stringify(currentNav));
  } catch (e) {}

  renderNav();
  syncViewForRole();
}

/**
 * Handles two-step inline reset confirmation for the permissions matrix.
 */
function resetMatrixDefaults() {
  const btn = $("btn-matrix-reset");
  if (!matrixResetConfirmActive) {
    matrixResetConfirmActive = true;
    if (btn) btn.textContent = "Tap again to reset";
    if (matrixResetTimer) clearTimeout(matrixResetTimer);
    matrixResetTimer = setTimeout(() => {
      matrixResetConfirmActive = false;
      if (btn) btn.textContent = "Reset to defaults";
    }, 3000);
    return;
  }

  matrixResetConfirmActive = false;
  if (matrixResetTimer) clearTimeout(matrixResetTimer);
  try {
    localStorage.removeItem("moto1_nav");
  } catch (e) {}

  renderNav();
  const main = $("main");
  if (main) main.innerHTML = getUsersViewHtml();
  syncViewForRole();
}

/**
 * Generates the full HTML markup for the User Management view (Super Admin only).
 * @returns {string} HTML markup string.
 */
function getUsersViewHtml() {
  const isDirectory = userMgmtTab === "directory";

  return `
    <div class="um-header">
      <h1 class="um-title">User Management</h1>
      <p class="um-subtitle">Manage employee accounts and role access.</p>
    </div>

    <!-- Tab navigation -->
    <div class="um-tabs" role="tablist" aria-label="User Management Views">
      <button
        type="button"
        role="tab"
        id="um-tab-dir"
        class="um-tab ${isDirectory ? "active" : ""}"
        aria-selected="${isDirectory ? "true" : "false"}"
        onclick="setUserMgmtTab('directory')"
      >
        <span>👥</span> User Directory
      </button>
      <button
        type="button"
        role="tab"
        id="um-tab-matrix"
        class="um-tab ${!isDirectory ? "active" : ""}"
        aria-selected="${!isDirectory ? "true" : "false"}"
        onclick="setUserMgmtTab('matrix')"
      >
        <span>🛡️</span> Permissions Matrix
      </button>
    </div>

    ${isDirectory ? `
      <!-- Toolbar -->
      <div class="um-toolbar">
        <div class="um-toolbar-left">
          <div class="um-search-wrap">
            <span class="um-search-icon">🔍</span>
            <input
              id="user-search-input"
              class="um-search-input"
              type="text"
              placeholder="Search by Name or Username..."
              value="${escHtml(userSearch)}"
              oninput="onUserSearchInput(this.value)"
            />
          </div>

          <select class="um-filter-select" onchange="onUserRoleFilterChange(this.value)">
            <option value="all" ${userRoleFilter === "all" ? "selected" : ""}>Filter by Role: All</option>
            <option value="superadmin" ${userRoleFilter === "superadmin" ? "selected" : ""}>Super Admin</option>
            <option value="admin" ${userRoleFilter === "admin" ? "selected" : ""}>Admin</option>
            <option value="mechanic" ${userRoleFilter === "mechanic" ? "selected" : ""}>Mechanic</option>
          </select>

          <select class="um-filter-select" onchange="onUserStatusFilterChange(this.value)">
            <option value="all" ${userStatusFilter === "all" ? "selected" : ""}>Filter by Status: All</option>
            <option value="active" ${userStatusFilter === "active" ? "selected" : ""}>Active</option>
            <option value="inactive" ${userStatusFilter === "inactive" ? "selected" : ""}>Inactive</option>
          </select>
        </div>

        <button type="button" class="btn-add-user" onclick="openAddUserModal()">
          <span>👤+</span> Add New User
        </button>
      </div>

      <!-- Table Container -->
      <div class="um-table-wrap">
        <table class="um-table">
          <thead>
            <tr>
              <th>EMPLOYEE NAME &amp; USERNAME</th>
              <th>ASSIGNED ROLE</th>
              <th>ACCOUNT STATUS</th>
              <th>LAST LOGIN DATE/TIME</th>
              <th class="r">ACTIONS</th>
            </tr>
          </thead>
          <tbody id="user-table-body">
            ${getUserTableRowsHtml()}
          </tbody>
        </table>
      </div>
    ` : `
      ${getPermissionsMatrixHtml()}
    `}
  `;
}


/* ==========================================================
   REPORTS & MONITORING
   ========================================================== */

/** Currently selected report filter period ("today", "7days", "month", "lastMonth", "year", "all"). */
let reportPeriod = "month";

/**
 * Returns human-readable label for a report period key.
 * @param {string} p - Period key.
 * @returns {string} Formatted label.
 */
function getReportPeriodLabel(p) {
  if (p === "today") return "Today";
  if (p === "7days") return "Last 7 Days";
  if (p === "month") return "This Month";
  if (p === "lastMonth") return "Last Month";
  if (p === "year") return "This Year";
  return "All Time";
}

/**
 * Sets the active report filter period and updates only the report results container.
 * @param {string} period - Selected period key.
 */
function setReportPeriod(period) {
  reportPeriod = period;
  const resEl = $("report-results-wrap");
  if (resEl) resEl.innerHTML = getReportResultsHtml();
}

/**
 * Computes performance metrics for the active report period.
 * @param {string} period - Active filter period.
 * @returns {Object} Calculated metrics.
 */
function getReportMetrics(period = reportPeriod) {
  const completedInPeriod = D.wo.filter((o) => o.st === "Completed" && inDateRange(o.done || o.at, period));
  const openJobs = D.wo.filter((o) => o.st !== "Completed");

  let revenue = 0;
  let labor = 0;
  let parts = 0;

  completedInPeriod.forEach((o) => {
    revenue += total(o);
    const orderLines = lines(o);
    orderLines.forEach((l) => {
      if (l.kind === "labor") {
        labor += (l.a || 0);
      } else if (l.kind === "part") {
        parts += (l.a || 0);
      }
    });
  });

  const completedCount = completedInPeriod.length;
  const avgValue = completedCount > 0 ? (revenue / completedCount) : 0;

  return {
    revenue,
    labor,
    parts,
    completed: completedCount,
    inShop: openJobs.length,
    avgValue,
    completedJobs: completedInPeriod
  };
}

/**
 * Exports report summary numbers and completed jobs into a clean CSV file with UTF-8 BOM.
 */
function exportReportCsv() {
  const metrics = getReportMetrics(reportPeriod);
  const periodLabel = getReportPeriodLabel(reportPeriod);
  const todayStr = today();

  const periodSales = (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => !s.void && inDateRange(s.at ? s.at.slice(0, 10) : "", reportPeriod)
  );
  const posSalesTotal = periodSales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const posSalesCount = periodSales.length;

  const escapeCsv = (str) => `"${String(str || "").replace(/"/g, '""')}"`;

  const summaryLines = [
    ["Shop Performance Report", ""],
    ["Period", periodLabel],
    ["Generated On", todayStr],
    ["Total Revenue (PHP)", metrics.revenue],
    ["Labor Earnings (PHP)", metrics.labor],
    ["Parts Billed (PHP)", metrics.parts],
    ["Quick Sales Total", posSalesTotal],
    ["Quick Sales Count", posSalesCount],
    ["Jobs Completed", metrics.completed],
    ["Jobs in Shop", metrics.inShop],
    ["Average Job Value (PHP)", Math.round(metrics.avgValue)]
  ].map((row) => row.map(escapeCsv).join(","));

  const jobHeaders = [
    "Job ID",
    "Job Number",
    "Completion Date",
    "Completion Time",
    "Plate Number",
    "Motorcycle",
    "Customer Name",
    "Customer Phone",
    "Lead Mechanic",
    "Services",
    "Total Cost (PHP)"
  ];

  const jobRows = metrics.completedJobs.map((o) => {
    const b = bike(o.bid);
    const c = b ? own(b) : null;
    const dateVal = o.done || o.at || "";
    const compDate = formatJobDate(dateVal);
    const compTime = formatJobTime(dateVal);
    const plate = b ? b.plate : "";
    const moto = b ? `${b.make} ${b.model} (${b.year || ""})`.trim() : "";
    const custName = c ? c.name : "";
    const custPhone = c ? c.phone : "";
    const mech = o.mech || "Unassigned";
    const svcsList = (o.sv && o.sv.length)
      ? o.sv.map((id) => (g("sv", id) ? g("sv", id).name : id))
      : (o.items && o.items.length)
        ? o.items.filter((i) => i.kind === "labor").map((i) => i.name)
        : (o.complaints && o.complaints.length)
          ? o.complaints
          : [];
    const svcs = svcsList.join("; ") || (o.findings ? "Inspection Diagnosis" : "");
    const cost = total(o);

    return [
      escapeCsv(o.id),
      escapeCsv(getJobNumber(o)),
      escapeCsv(compDate),
      escapeCsv(compTime === " — " ? "" : compTime),
      escapeCsv(plate),
      escapeCsv(moto),
      escapeCsv(custName),
      escapeCsv(custPhone),
      escapeCsv(mech),
      escapeCsv(svcs),
      cost
    ].join(",");
  });

  const fullContent = "\uFEFF" + [
    ...summaryLines,
    "",
    jobHeaders.map(escapeCsv).join(","),
    ...jobRows
  ].join("\r\n");

  const blob = new Blob([fullContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moto-report-${todayStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Builds HTML for report KPI cards, horizontal status bars, mechanic table, top complaints, and recent activity.
 * @returns {string} HTML string.
 */
function getReportResultsHtml() {
  const metrics = getReportMetrics(reportPeriod);

  // 1. Jobs by Status calculation
  const mandatoryStatuses = ["In Progress", "Checking", "Ready for Pickup"];
  const statusCounts = ST.map((st) => {
    const cnt = D.wo.filter((o) => o.st === st).length;
    return { status: st, count: cnt };
  }).filter((x) => x.count > 0 || mandatoryStatuses.includes(x.status));

  const maxStatusCount = Math.max(...statusCounts.map((x) => x.count), 1);

  // 2. Mechanic Performance calculation
  const users = loadUsers();
  const activeMechs = users.filter((u) => u.role === "mechanic" && u.active !== false);
  const mechRows = activeMechs.map((m) => {
    const mName = m.name.trim();
    const inProg = D.wo.filter((o) => o.st === "In Progress" && o.mech && o.mech.trim().toLowerCase() === mName.toLowerCase()).length;
    const compJobs = metrics.completedJobs.filter((o) => o.mech && o.mech.trim().toLowerCase() === mName.toLowerCase());
    const rev = compJobs.reduce((sum, o) => sum + total(o), 0);
    return { name: mName, inProg, completed: compJobs.length, revenue: rev };
  });

  // Unassigned row
  const unassignedInProg = D.wo.filter((o) => o.st === "In Progress" && (!o.mech || !o.mech.trim() || o.mech.trim().toLowerCase() === "unassigned")).length;
  const unassignedCompJobs = metrics.completedJobs.filter((o) => !o.mech || !o.mech.trim() || o.mech.trim().toLowerCase() === "unassigned");
  const unassignedRev = unassignedCompJobs.reduce((sum, o) => sum + total(o), 0);
  mechRows.push({
    name: "Unassigned",
    inProg: unassignedInProg,
    completed: unassignedCompJobs.length,
    revenue: unassignedRev
  });

  mechRows.sort((a, b) => b.completed - a.completed || b.revenue - a.revenue);

  // 3. Top Customer Complaints
  const jobsCreatedInPeriod = D.wo.filter((o) => inDateRange(o.at, reportPeriod));
  const complaintCounts = {};
  jobsCreatedInPeriod.forEach((o) => {
    const list = Array.isArray(o.complaints) ? o.complaints : (o.complaint ? [o.complaint] : []);
    list.forEach((c) => {
      const clean = String(c || "").trim();
      if (clean) complaintCounts[clean] = (complaintCounts[clean] || 0) + 1;
    });
  });
  const topComplaints = Object.keys(complaintCounts)
    .map((k) => ({ label: k, count: complaintCounts[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  const maxComplaint = Math.max(...topComplaints.map((x) => x.count), 1);

  // 4. Most Frequent Fault Codes
  const codeCounts = {};
  const codeLabels = {};
  metrics.completedJobs.forEach((o) => {
    const obdCodes = (o.inspection && o.inspection.obd && Array.isArray(o.inspection.obd.codes))
      ? o.inspection.obd.codes
      : [];
    obdCodes.forEach((c) => {
      const code = (c.code || "").trim();
      if (code) {
        codeCounts[code] = (codeCounts[code] || 0) + 1;
        if (!codeLabels[code]) codeLabels[code] = c.desc || c.part || "";
      }
    });
  });
  const topCodes = Object.keys(codeCounts)
    .map((k) => ({ code: k, label: codeLabels[k], count: codeCounts[k] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // 5. Recent Activity: 8 most recently completed jobs
  const recentCompleted = [...D.wo.filter((o) => o.st === "Completed")]
    .sort((a, c) => (c.done || c.at || "").localeCompare(a.done || a.at || ""))
    .slice(0, 8);

  const periodSales = (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => !s.void && inDateRange(s.at ? s.at.slice(0, 10) : "", reportPeriod)
  );
  const posSalesTotal = periodSales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const posSalesCount = periodSales.length;

  const stat = (i, bg, l, n, t) =>
    `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${n}</b>${t}</div></div>`;

  return `
    <!-- KPI Row -->
    <div class="reports-kpi-grid">
      ${stat("💰", "#DBEAFE", "REVENUE", P(metrics.revenue), "Paid in period")}
      ${stat("🔧", "#D1FAE5", "LABOR EARNINGS", P(metrics.labor), "From services")}
      ${stat("📦", "#FEF3C7", "PARTS BILLED", P(metrics.parts), "From items/fluids")}
      ${stat("⚡", "#E0F2FE", "QUICK SALES", P(posSalesTotal), `${posSalesCount} sale${posSalesCount === 1 ? "" : "s"}`)}
      ${stat("✅", "#E0E7FF", "JOBS COMPLETED", metrics.completed, "In period")}
      ${stat("⏳", "#FFEDD5", "JOBS IN SHOP", metrics.inShop, "Currently open")}
      ${stat("📊", "#F3E8FF", "AVERAGE JOB VALUE", P(Math.round(metrics.avgValue)), "Per completed job")}
    </div>

    <!-- Analytics Cards Grid -->
    <div class="reports-grid">
      <!-- Jobs by Status -->
      <div class="card">
        <div class="hd" style="margin-bottom:16px">📋 Jobs by Status</div>
        <div>
          ${statusCounts.map((item) => {
            const displayLabel = item.status === "Ready for Pickup" ? "Ready for Billing" : item.status;
            const pct = Math.max(item.count > 0 ? (item.count / maxStatusCount) * 100 : 0, 0);
            return `
              <div class="report-bar-row">
                <div class="report-bar-header">
                  <div style="display:flex;align-items:center;gap:6px">
                    ${badge(item.status)}
                    <span style="font-weight:600;font-size:13px">${displayLabel}</span>
                  </div>
                  <b>${item.count}</b>
                </div>
                <div class="report-bar-track">
                  <div class="report-bar-fill" style="width:${pct}%;background:#2563EB"></div>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>

      <!-- Mechanic Performance -->
      <div class="card">
        <div class="hd" style="margin-bottom:16px">🔧 Mechanic Performance</div>
        ${mechRows.some((r) => r.inProg > 0 || r.completed > 0 || r.revenue > 0) ? `
          <div class="tw">
            <table>
              <thead>
                <tr>
                  <th>MECHANIC</th>
                  <th>IN PROGRESS</th>
                  <th>COMPLETED</th>
                  <th class="r">REVENUE</th>
                </tr>
              </thead>
              <tbody>
                ${mechRows.map((r) => `
                  <tr>
                    <td><b>${escHtml(r.name)}</b></td>
                    <td>${r.inProg}</td>
                    <td><b>${r.completed}</b></td>
                    <td class="r" style="font-weight:700">${P(r.revenue)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No mechanic activity yet.</div>
        `}
      </div>

      <!-- Top Customer Complaints -->
      <div class="card">
        <div class="hd" style="margin-bottom:16px">💬 Top Customer Complaints</div>
        ${topComplaints.length ? `
          <div>
            ${topComplaints.map((c) => {
              const pct = (c.count / maxComplaint) * 100;
              return `
                <div class="report-bar-row">
                  <div class="report-bar-header">
                    <span><b>${escHtml(c.label)}</b></span>
                    <b>${c.count}</b>
                  </div>
                  <div class="report-bar-track">
                    <div class="report-bar-fill" style="width:${pct}%;background:#059669"></div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="empty">No complaints recorded.</div>
        `}
      </div>

      <!-- Most Frequent Fault Codes -->
      <div class="card">
        <div class="hd" style="margin-bottom:16px">⚡ Most Frequent Fault Codes</div>
        ${topCodes.length ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${topCodes.map((c) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="display:inline-block;padding:2px 6px;border-radius:4px;background:#FEE2E2;color:#B91C1C;font-weight:700;font-size:11px">${escHtml(c.code)}</span>
                  <span style="font-size:13px;color:var(--text-secondary)">${escHtml(c.label || "Trouble code")}</span>
                </div>
                <b>${c.count}</b>
              </div>
            `).join("")}
          </div>
        ` : `
          <div class="empty">No fault codes recorded.</div>
        `}
      </div>

      <!-- Recent Activity (Full width) -->
      <div class="card" style="grid-column: 1 / -1">
        <div class="hd" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <span>🕒 Recent Completed Activity</span>
          ${canOpen("his") ? `
            <button type="button" class="btn g sm" onclick="go('his')">View in Service History →</button>
          ` : ""}
        </div>
        ${recentCompleted.length ? `
          <div class="tw">
            <table>
              <thead>
                <tr>
                  <th>JOB NO.</th>
                  <th>PLATE &amp; VEHICLE</th>
                  <th>CUSTOMER</th>
                  <th>MECHANIC</th>
                  <th>COMPLETED</th>
                  <th class="r">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${recentCompleted.map((o) => {
                  const b = bike(o.bid);
                  const c = b ? own(b) : null;
                  const dateVal = o.done || o.at || "";
                  return `
                    <tr>
                      <td><b>${escHtml(getJobNumber(o))}</b></td>
                      <td>
                        <b>${b ? escHtml(b.plate) : "NO PLATE"}</b>
                        <br><small style="color:var(--text-muted)">${b ? escHtml(b.make + " " + b.model) : "Unknown"}</small>
                      </td>
                      <td>${c ? escHtml(c.name) : "—"}</td>
                      <td>${escHtml(o.mech || "Unassigned")}</td>
                      <td>
                        <div>${formatJobDate(dateVal)}</div>
                        <small style="color:var(--text-muted)">${formatJobTime(dateVal)}</small>
                      </td>
                      <td class="r" style="font-weight:700">${P(total(o))}</td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No recent completed activity.</div>
        `}
      </div>
    </div>
  `;
}

/**
 * Generates the full HTML markup for the Reports & Monitoring view.
 * @returns {string} HTML markup string.
 */
function getReportsViewHtml() {
  return `
    <div class="card top">
      <div>
        <h1>Reports &amp; Monitoring</h1>
        <p>Shop performance, job status, and activity at a glance.</p>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="reports-toolbar">
      <div style="display:flex;align-items:center;gap:10px">
        <label for="report-period-select" style="font-size:13px;font-weight:700;color:var(--text-secondary)">Period:</label>
        <select
          id="report-period-select"
          class="his-select"
          onchange="setReportPeriod(this.value)"
          style="min-width:180px"
        >
          <option value="today" ${reportPeriod === "today" ? "selected" : ""}>Today</option>
          <option value="7days" ${reportPeriod === "7days" ? "selected" : ""}>Last 7 Days</option>
          <option value="month" ${reportPeriod === "month" ? "selected" : ""}>This Month</option>
          <option value="lastMonth" ${reportPeriod === "lastMonth" ? "selected" : ""}>Last Month</option>
          <option value="year" ${reportPeriod === "year" ? "selected" : ""}>This Year</option>
          <option value="all" ${reportPeriod === "all" ? "selected" : ""}>All Time</option>
        </select>
      </div>

      <button type="button" class="btn g his-btn-export" onclick="exportReportCsv()" title="Export report to CSV">
        <span>📥</span> Export Report
      </button>
    </div>

    <!-- Report Results Container -->
    <div id="report-results-wrap">
      ${getReportResultsHtml()}
    </div>
  `;
}


/* ==========================================================
   9.5 QUICK SALES
   ========================================================== */

/** In-memory cart items for active Quick Sales sale. */
let posCart = [];

/** Optional customer name or phone for active sale. */
let posCustomer = "";

/** Selected payment method: "Cash" | "GCash". */
let posMethod = "Cash";

/** Amount tendered by customer for cash transactions. */
let posTendered = 0;

/** Flag indicating whether tendered was explicitly entered by cashier. */
let posTenderedManual = false;

/** Discount amount (in PHP) applied to active sale. */
let posDiscount = 0;

/** Payment reference number for GCash transactions. */
let posRef = "";

/** Active tab in right column: "cart" | "today". */
let posTab = "cart";

/** Active catalog search query for Quick Sales left column. */
let posSearch = "";

/** Active category filter: "all" | "labor" | "part". */
let posCat = "all";

/** Toggle flag for inline "+ Custom item" creation form. */
let posCustomOpen = false;

/** Selected item kind for custom item form: "part". */
let posCustomKind = "part";

/** Two-step inline confirmation flag for "Clear cart" button. */
let posClearConfirmActive = false;
let posClearConfirmTimer = null;

/** Mobile bottom sheet open state. */
let posBottomSheetOpen = false;

/** ID of sale pending void confirmation. */
let posVoidSaleId = null;

/** Toggle flag for viewing older sales beyond today. */
let posShowOlderSales = false;

/**
 * Returns current timestamp in local "YYYY-MM-DD HH:MM" format.
 * Never uses toISOString() to preserve exact local device clock.
 * @returns {string} Local timestamp string.
 */
function nowLocalString() {
  const d = new Date();
  const pad = (n) => (n < 10 ? "0" + n : String(n));
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * Formats a local timestamp ("YYYY-MM-DD HH:MM") into human-friendly format (e.g. "Nov 3, 2026 · 2:30 PM").
 * @param {string} dtStr - Timestamp string.
 * @returns {string} Formatted string.
 */
function formatPosDateTime(dtStr) {
  if (!dtStr) return "-";
  const parts = String(dtStr).split(" ");
  const datePart = parts[0];
  const timePart = parts[1] || "";
  let formattedTime = "";
  if (timePart) {
    const timePieces = timePart.split(":");
    let hr = parseInt(timePieces[0], 10);
    const min = timePieces[1] || "00";
    if (!isNaN(hr)) {
      const ampm = hr >= 12 ? "PM" : "AM";
      hr = hr % 12 || 12;
      formattedTime = `${hr}:${min} ${ampm}`;
    }
  }
  const d = parseLocalDate(datePart);
  const formattedDate = d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : datePart;
  return formattedTime ? `${formattedDate} · ${formattedTime}` : formattedDate;
}

/**
 * Formats time component of local timestamp (e.g. "2:30 PM").
 * @param {string} dtStr - Timestamp string.
 * @returns {string} Formatted time string.
 */
function formatPosTime(dtStr) {
  if (!dtStr) return "";
  const parts = String(dtStr).split(" ");
  const timePart = parts[1] || "";
  if (!timePart) return "";
  const timePieces = timePart.split(":");
  let hr = parseInt(timePieces[0], 10);
  const min = timePieces[1] || "00";
  if (isNaN(hr)) return timePart;
  const ampm = hr >= 12 ? "PM" : "AM";
  hr = hr % 12 || 12;
  return `${hr}:${min} ${ampm}`;
}

/**
 * Generates the next sequential sale receipt number based on the highest existing number + 1.
 * Supports both legacy "POS-XXXX" and current "QS-XXXX" numbers.
 * Format: "QS-0001", "QS-0002", etc.
 * @returns {string} Next sale receipt number.
 */
function generatePosNumber() {
  const sales = Array.isArray(D.sales) ? D.sales : [];
  let maxNum = 0;
  sales.forEach((s) => {
    if (s && s.no) {
      const match = String(s.no).match(/(?:POS|QS)-(\d+)/i);
      if (match) {
        const n = parseInt(match[1], 10);
        if (!isNaN(n) && n > maxNum) {
          maxNum = n;
        }
      }
    }
  });
  const nextNum = maxNum + 1;
  const pad = String(nextNum).padStart(4, "0");
  return `QS-${pad}`;
}

/**
 * Resets POS cart and cashier checkout state to blank defaults.
 */
function resetPosState() {
  posCart = [];
  posCustomer = "";
  posMethod = "Cash";
  posTendered = 0;
  posTenderedManual = false;
  posDiscount = 0;
  posRef = "";
  posTab = "cart";
  posSearch = "";
  posCat = "all";
  posCustomOpen = false;
  posCustomKind = "part";
  posClearConfirmActive = false;
  if (posClearConfirmTimer) clearTimeout(posClearConfirmTimer);
  posClearConfirmTimer = null;
  posBottomSheetOpen = false;
  posVoidSaleId = null;
  posShowOlderSales = false;
}

/**
 * Returns subtotal of active POS cart items.
 * @returns {number} Subtotal in PHP.
 */
function getPosSubtotal() {
  return posCart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0), 0);
}

/**
 * Returns validated discount amount capped at subtotal.
 * @returns {number} Discount in PHP.
 */
function getPosDiscount() {
  const subtotal = getPosSubtotal();
  const disc = Number(posDiscount) || 0;
  return Math.min(Math.max(0, disc), subtotal);
}

/**
 * Returns final total of active POS cart.
 * @returns {number} Total in PHP.
 */
function getPosTotal() {
  const subtotal = getPosSubtotal();
  const disc = getPosDiscount();
  return Math.max(0, subtotal - disc);
}

/**
 * Returns total count of items in active cart.
 * @returns {number} Count.
 */
function getPosTotalItemsCount() {
  return posCart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
}

/**
 * Returns formatted text string for POS header stats: "Today: {n} sales · {P(total)}".
 * @returns {string} Live stats string.
 */
function getPosHeaderTodayText() {
  const todayStr = today();
  const todaySales = (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => !s.void && (s.at || "").slice(0, 10) === todayStr
  );
  const count = todaySales.length;
  const sum = todaySales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  return `Today: ${count} sale${count === 1 ? "" : "s"} · ${P(sum)}`;
}

/**
 * Updates POS header stats text in the DOM if currently rendered.
 */
function updatePosHeaderStats() {
  const el = $("pos-header-stats");
  if (el) el.textContent = getPosHeaderTodayText();
}

/**
 * Retrieves catalog items matching search filter.
 * Quick Sales shows Part / Fluid items only.
 * @returns {Array<Object>} Filtered catalog items.
 */
function getFilteredPosCatalogItems() {
  const items = getCatalogItems("part");
  const q = posSearch.trim().toLowerCase();
  return items.filter((it) => {
    if (q) {
      const matchName = (it.name || "").toLowerCase().includes(q);
      const matchSku = (it.sku || "").toLowerCase().includes(q);
      if (!matchName && !matchSku) return false;
    }
    return true;
  });
}

/**
 * Returns counts for catalog category filter chips.
 * @returns {{all: number, labor: number, part: number}}
 */
function getPosCategoryCounts() {
  const allItems = getCatalogItems("all");
  return {
    all: allItems.length,
    labor: allItems.filter((i) => i.kind === "labor").length,
    part: allItems.filter((i) => i.kind === "part").length
  };
}

/**
 * Generates HTML string for the category filter chips using Active Repairs pill style.
 * @returns {string} HTML string.
 */
function getPosChipsHtml() {
  const counts = getPosCategoryCounts();
  return `
    <button
      type="button"
      class="pos-chip ${posCat === 'all' ? 'active' : ''}"
      onclick="setPosCat('all')"
      aria-pressed="${posCat === 'all' ? 'true' : 'false'}"
    >
      All <span class="pos-chip-cnt">(${counts.all})</span>
    </button>
    <button
      type="button"
      class="pos-chip ${posCat === 'labor' ? 'active' : ''}"
      onclick="setPosCat('labor')"
      aria-pressed="${posCat === 'labor' ? 'true' : 'false'}"
    >
      Labor / Service <span class="pos-chip-cnt">(${counts.labor})</span>
    </button>
    <button
      type="button"
      class="pos-chip ${posCat === 'part' ? 'active' : ''}"
      onclick="setPosCat('part')"
      aria-pressed="${posCat === 'part' ? 'true' : 'false'}"
    >
      Part / Fluid <span class="pos-chip-cnt">(${counts.part})</span>
    </button>
  `;
}

/**
 * Sets active category filter and refreshes chips and grid.
 * @param {string} catKey - "all" | "labor" | "part"
 */
function setPosCat(catKey) {
  posCat = catKey;
  const chipsEl = $("pos-chips");
  if (chipsEl) chipsEl.innerHTML = getPosChipsHtml();
  renderPosGrid();
}

/**
 * Handles live typing into the Quick Sales search input.
 * @param {string} val - Input query.
 */
function onPosSearchInput(val) {
  posSearch = val || "";
  const clr = $("pos-search-clear");
  if (clr) {
    if (posSearch.trim()) clr.classList.add("visible");
    else clr.classList.remove("visible");
  }
  renderPosGrid();
}

/**
 * Clears search query, refocuses search input, and refreshes grid.
 */
function clearPosSearch() {
  posSearch = "";
  const inp = $("pos-search-input");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("pos-search-clear");
  if (clr) clr.classList.remove("visible");
  renderPosGrid();
}

/**
 * Adds the first matching catalog item to the cart when user hits Enter.
 */
function addFirstPosMatchToCart() {
  const items = getFilteredPosCatalogItems();
  if (items.length > 0) {
    addCatalogItemToPosCart(items[0].id, items[0].kind);
    posSearch = "";
    const inp = $("pos-search-input");
    if (inp) {
      inp.value = "";
      inp.focus();
    }
    const clr = $("pos-search-clear");
    if (clr) clr.classList.remove("visible");
    renderPosGrid();
  }
}

/**
 * Returns current quantity of a catalog item in active cart.
 * @param {string} catId - Catalog item ID.
 * @param {string} kind - "labor" | "part"
 * @returns {number} Quantity.
 */
function getInCartQty(catId, kind) {
  const line = posCart.find((x) => x.ref === catId && x.kind === kind);
  return line ? Number(line.qty) || 0 : 0;
}

/**
 * Generates HTML string for the Quick Sales items grid and custom item card.
 * @returns {string} HTML string.
 */
function getPosGridHtml() {
  const items = getFilteredPosCatalogItems();

  let customFormHtml = "";
  if (posCustomOpen) {
    customFormHtml = `
      <div class="pos-custom-form-card" id="pos-custom-form-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div class="pos-custom-form-title">Add Custom Item (Part / Fluid)</div>
          <button type="button" class="search-clear visible" onclick="togglePosCustomForm(false)" style="position:static" title="Cancel">✕</button>
        </div>
        <div class="pos-custom-row">
          <div class="pos-custom-field" style="flex:2;min-width:180px">
            <label for="pos-custom-name">Description / Name</label>
            <input id="pos-custom-name" type="text" placeholder="e.g. Quick chain lube, Misc hardware" onkeydown="if(event.key==='Enter')addCustomItemToPosCart()" />
          </div>
          <div class="pos-custom-field" style="flex:1;min-width:100px">
            <label for="pos-custom-price">Unit Price (PHP)</label>
            <input id="pos-custom-price" type="number" min="0" step="1" placeholder="0" onkeydown="if(event.key==='Enter')addCustomItemToPosCart()" />
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn g sm" onclick="togglePosCustomForm(false)">Cancel</button>
          <button type="button" class="btn sm" onclick="addCustomItemToPosCart()">Add to Cart</button>
        </div>
      </div>
    `;
  }

  const customTileHtml = `
    <button type="button" class="pos-tile pos-tile-custom" onclick="togglePosCustomForm(true)" title="Add custom item">
      <div class="pos-custom-plus">+</div>
      <div class="pos-custom-text">Custom item</div>
    </button>
  `;

  if (items.length === 0) {
    return `
      ${customFormHtml}
      <div class="pos-tiles-grid">
        ${customTileHtml}
      </div>
      <div class="empty" style="padding:40px 16px;text-align:center;background:#FFFFFF;border:1px dashed #CBD5E1;border-radius:12px;margin-top:12px">
        No catalog items matched "<b>${escHtml(posSearch)}</b>". You can add it as a custom item above.
      </div>
    `;
  }

  const tilesHtml = items.map((it) => {
    const inCartQty = getInCartQty(it.id, it.kind);
    const isLabor = it.kind === "labor";
    return `
      <button
        type="button"
        class="pos-tile ${inCartQty > 0 ? "in-cart" : ""}"
        onclick="addCatalogItemToPosCart('${it.id}', '${it.kind}')"
        title="Tap to add: ${escHtml(it.name)}"
      >
        ${inCartQty > 0 ? `<span class="pos-tile-badge">${inCartQty}</span>` : ""}
        <div>
          <span class="cat-badge ${it.kind}">
            ${isLabor ? 'Labor' : 'Part'}
          </span>
          <div class="pos-tile-name">${escHtml(it.name)}</div>
        </div>
        <div class="pos-tile-price">${P(it.price)}</div>
      </button>
    `;
  }).join("");

  return `
    ${customFormHtml}
    <div class="pos-tiles-grid">
      ${customTileHtml}
      ${tilesHtml}
    </div>
  `;
}

/**
 * Re-renders the items grid container in the DOM.
 */
function renderPosGrid() {
  const gridEl = $("pos-grid-wrap");
  if (gridEl) gridEl.innerHTML = getPosGridHtml();
}

/**
 * Adds an item from the unified catalog into the cart, or increments quantity.
 * @param {string} catId - Catalog item ID.
 * @param {string} [kind] - "labor" | "part"
 */
function addCatalogItemToPosCart(catId, kind) {
  const allItems = getCatalogItems("part");
  const it = allItems.find((x) => x.id === catId && (!kind || x.kind === kind));
  if (!it) return;

  const existing = posCart.find((x) => x.ref === it.id && x.kind === it.kind);
  if (existing) {
    existing.qty = (Number(existing.qty) || 1) + 1;
  } else {
    posCart.push({
      id: uid(),
      ref: it.id,
      kind: it.kind,
      name: it.name,
      price: Number(it.price) || 0,
      qty: 1
    });
  }

  renderPosGrid();
  renderPosCart();
  updatePosMobileBar();
}

/**
 * Toggles visibility of the custom item inline creation form.
 * @param {boolean} open - Target state.
 */
function togglePosCustomForm(open) {
  posCustomOpen = !!open;
  renderPosGrid();
  if (posCustomOpen) {
    setTimeout(() => {
      const inp = $("pos-custom-name");
      if (inp) inp.focus();
    }, 50);
  }
}

/**
 * Sets kind ("labor" or "part") for custom item creation.
 * @param {string} kind - "labor" | "part"
 */
function setPosCustomKind(kind) {
  posCustomKind = kind === "part" ? "part" : "labor";
  renderPosGrid();
}

/**
 * Reads custom item input fields and adds new item to the cart.
 */
function addCustomItemToPosCart() {
  const nameInp = $("pos-custom-name");
  const priceInp = $("pos-custom-price");
  const name = nameInp ? nameInp.value.trim() : "";
  const price = priceInp ? Math.max(0, parseFloat(priceInp.value) || 0) : 0;

  const fallbackName = "Custom Part";

  posCart.push({
    id: uid(),
    ref: "",
    kind: "part",
    name: name || fallbackName,
    price: price,
    qty: 1
  });

  posCustomOpen = false;
  renderPosGrid();
  renderPosCart();
  updatePosMobileBar();
}

/**
 * Switches active right-column tab between "cart" and "today".
 * @param {string} tab - "cart" | "today"
 */
function setPosTab(tab) {
  posTab = tab === "today" ? "today" : "cart";
  renderPosRightPanel();
}

/**
 * Returns total count of sales recorded for today's date.
 * @returns {number} Today sales count.
 */
function getTodaySalesCount() {
  const todayStr = today();
  return (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => (s.at || "").slice(0, 10) === todayStr
  ).length;
}

/**
 * Computes change or shortage HTML string for cash payment breakdown.
 * @param {number} total - Grand total.
 * @param {number} tendered - Tendered cash.
 * @returns {string} HTML string.
 */
function getCashCalcHtml(total, tendered) {
  const diff = (Number(tendered) || 0) - total;
  if (diff >= 0) {
    return `<span>Change:</span><b style="color:var(--success, #16A34A);font-size:14px">${P(diff)}</b>`;
  }
  return `<span style="color:var(--danger, #DC2626);font-weight:600">Short:</span><b style="color:var(--danger, #DC2626);font-size:14px">${P(Math.abs(diff))}</b>`;
}

/**
 * Generates full HTML for the right column panel (Cart tab or Today's Sales tab).
 * @returns {string} HTML string.
 */
function getPosRightPanelHtml() {
  const subtotal = getPosSubtotal();
  const disc = getPosDiscount();
  const total = getPosTotal();
  const isCashShort = posMethod === "Cash" && (Number(posTendered) || 0) < total;
  const isChargeDisabled = posCart.length === 0 || isCashShort;

  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <span style="font-size:13px;font-weight:700;color:var(--text-secondary)">Current Sale</span>
        <div style="display:flex;align-items:center;gap:8px">
          <button
            type="button"
            class="btn g sm"
            id="pos-btn-clear-cart"
            onclick="handlePosClearCart()"
            style="${posClearConfirmActive ? 'color:var(--danger, #DC2626);font-weight:700' : ''}"
            title="Empty current cart"
          >
            ${posClearConfirmActive ? "Tap again to clear" : "Clear cart"}
          </button>
          <button type="button" class="pos-sheet-close" onclick="closePosBottomSheet()" title="Close">✕</button>
        </div>
      </div>

      <div class="pos-cart-list" id="pos-cart-list">
        ${
          posCart.length === 0
            ? `<div class="empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-muted)">Cart is empty.<br>Tap catalog items on the left to add.</div>`
            : posCart.map((item) => {
                const lineTotal = (Number(item.qty) || 1) * (Number(item.price) || 0);
                const isLabor = item.kind === "labor";
                return `
                  <div class="pos-cart-line" id="pos-cart-line-${item.id}">
                    <div class="pos-cart-line-top">
                      <div style="flex:1;min-width:0">
                        <span class="cat-badge ${item.kind}" style="margin-right:4px">${isLabor ? 'Labor' : 'Part'}</span>
                        <b style="font-size:13px;color:var(--text-primary)">${escHtml(item.name)}</b>
                      </div>
                      <button type="button" class="pos-line-del-btn" onclick="removePosCartLine('${item.id}')" title="Remove item">✕</button>
                    </div>
                    <div class="pos-cart-line-bottom">
                      <div class="pos-qty-stepper">
                        <button type="button" class="pos-qty-btn" onclick="updatePosCartQty('${item.id}', -1)" title="Decrease quantity">−</button>
                        <span class="pos-qty-val">${item.qty}</span>
                        <button type="button" class="pos-qty-btn" onclick="updatePosCartQty('${item.id}', 1)" title="Increase quantity">+</button>
                      </div>
                      <div style="display:flex;align-items:center;gap:4px">
                        <span style="font-size:11px;color:var(--text-muted)">@ ₱</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          class="pos-price-input"
                          value="${item.price}"
                          oninput="updatePosCartPrice('${item.id}', this.value)"
                        />
                      </div>
                      <b style="font-size:13px;color:#0F172A;min-width:60px;text-align:right" id="pos-line-tot-${item.id}">
                        ${P(lineTotal)}
                      </b>
                    </div>
                  </div>
                `;
              }).join("")
        }
      </div>

      <!-- Totals Block -->
      <div class="pos-totals-block">
        <div class="pos-totals-row">
          <span style="color:var(--text-secondary)">Subtotal</span>
          <span style="font-weight:700" id="pos-subtotal-val">${P(subtotal)}</span>
        </div>
        <div class="pos-totals-row">
          <span style="color:var(--text-secondary)">Discount (PHP)</span>
          <div style="display:flex;align-items:center;gap:4px">
            <span style="font-size:11px;color:var(--text-muted)">- ₱</span>
            <input
              id="pos-discount-input"
              type="number"
              min="0"
              max="${subtotal}"
              step="1"
              value="${posDiscount > 0 ? posDiscount : ''}"
              placeholder="0"
              oninput="onPosDiscountInput(this.value)"
              style="width:80px;height:28px;border-radius:6px;border:1px solid #CBD5E1;padding:0 6px;text-align:right;font-size:12px;font-weight:700"
            />
          </div>
        </div>
        <div class="pos-totals-row grand-total">
          <span>Total</span>
          <span id="pos-total-val">${P(total)}</span>
        </div>
      </div>

      <!-- Payment Method Toggle -->
      <div style="margin-top:14px">
        <label style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;display:block;margin-bottom:6px">Payment Method</label>
        <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:6px">
          <button type="button" class="btn g sm ${posMethod === 'Cash' ? 'on' : ''}" style="${posMethod === 'Cash' ? 'background:#2563EB;color:#FFF;border-color:#2563EB;font-weight:700' : ''}" onclick="setPosMethod('Cash')">💵 Cash</button>
          <button type="button" class="btn g sm ${posMethod === 'GCash' ? 'on' : ''}" style="${posMethod === 'GCash' ? 'background:#2563EB;color:#FFF;border-color:#2563EB;font-weight:700' : ''}" onclick="setPosMethod('GCash')">📱 GCash</button>
        </div>
      </div>

      <!-- Method Specific Fields -->
      ${
        posMethod === "Cash"
          ? `
            <div style="margin-top:12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px 12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <label for="pos-tendered-input" style="font-size:12px;font-weight:700;color:var(--text-secondary)">Tendered (PHP):</label>
                <input
                  id="pos-tendered-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value="${posTendered > 0 ? posTendered : ''}"
                  oninput="onPosTenderedInput(this.value)"
                  style="width:100px;height:32px;border-radius:6px;border:1px solid #CBD5E1;padding:0 8px;text-align:right;font-size:13px;font-weight:700"
                />
              </div>
              <div class="pos-quick-tender-row">
                <button type="button" class="pos-quick-tender-btn" onclick="setPosQuickTender('Exact')">Exact</button>
                <button type="button" class="pos-quick-tender-btn" onclick="setPosQuickTender(100)">₱100</button>
                <button type="button" class="pos-quick-tender-btn" onclick="setPosQuickTender(500)">₱500</button>
                <button type="button" class="pos-quick-tender-btn" onclick="setPosQuickTender(1000)">₱1,000</button>
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px" id="pos-cash-calc-row">
                ${getCashCalcHtml(total, posTendered)}
              </div>
            </div>
          `
          : `
            <div style="margin-top:12px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:8px;padding:10px 12px">
              <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">
                Digital payment via <b>GCash</b>. Exact amount (${P(total)}) billed.
              </div>
              <label for="pos-ref-input" style="font-size:11px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px">Reference No. (optional):</label>
              <input
                id="pos-ref-input"
                type="text"
                placeholder="e.g. 1002938472"
                value="${escHtml(posRef)}"
                oninput="posRef=this.value"
                style="width:100%;height:32px;border-radius:6px;border:1px solid #CBD5E1;padding:0 8px;font-size:13px;box-sizing:border-box"
              />
            </div>
          `
      }

      <!-- Charge Action -->
      <button
        type="button"
        class="pos-charge-btn"
        id="pos-charge-btn"
        ${isChargeDisabled ? 'disabled' : ''}
        onclick="chargePosSale()"
      >
        Charge ${P(total)}
      </button>
    </div>
  `;
}

/**
 * Re-renders the right column panel in the DOM.
 */
function renderPosRightPanel() {
  const panel = $("pos-cart-panel");
  if (panel) panel.innerHTML = getPosRightPanelHtml();
}

/**
 * Re-renders cart view and tabs.
 */
function renderPosCart() {
  renderPosRightPanel();
}

/**
 * Synchronizes DOM summary elements without destroying input focus.
 */
function syncPosCartSummaryDom() {
  const subtotal = getPosSubtotal();
  const disc = getPosDiscount();
  const total = getPosTotal();

  const subtotalEl = $("pos-subtotal-val");
  if (subtotalEl) subtotalEl.textContent = P(subtotal);

  const totalEl = $("pos-total-val");
  if (totalEl) totalEl.textContent = P(total);

  const cashCalcRow = $("pos-cash-calc-row");
  if (cashCalcRow && posMethod === "Cash") {
    cashCalcRow.innerHTML = getCashCalcHtml(total, posTendered);
  }

  const isChargeDisabled = posCart.length === 0 || (posMethod === "Cash" && (Number(posTendered) || 0) < total);
  const chargeBtn = $("pos-charge-btn");
  if (chargeBtn) {
    chargeBtn.disabled = isChargeDisabled;
    chargeBtn.textContent = `Charge ${P(total)}`;
  }

  updatePosMobileBar();
}

/**
 * Adjusts line item quantity by delta; removes item if quantity reaches 0.
 * @param {string} lineId - Cart item ID.
 * @param {number} delta - Change amount (+1 or -1).
 */
function updatePosCartQty(lineId, delta) {
  const idx = posCart.findIndex((x) => x.id === lineId);
  if (idx === -1) return;
  const newQty = (Number(posCart[idx].qty) || 1) + delta;
  if (newQty <= 0) {
    posCart.splice(idx, 1);
  } else {
    posCart[idx].qty = newQty;
  }
  renderPosGrid();
  renderPosCart();
  updatePosMobileBar();
}

/**
 * Updates unit price for a specific cart line item.
 * @param {string} lineId - Cart item ID.
 * @param {string|number} newPrice - New unit price.
 */
function updatePosCartPrice(lineId, newPrice) {
  const line = posCart.find((x) => x.id === lineId);
  if (!line) return;
  const num = parseFloat(newPrice);
  line.price = isNaN(num) || num < 0 ? 0 : num;

  const totEl = $(`pos-line-tot-${lineId}`);
  if (totEl) {
    totEl.textContent = P((Number(line.qty) || 1) * line.price);
  }

  syncPosCartSummaryDom();
}

/**
 * Removes a specific line item from active cart.
 * @param {string} lineId - Cart item ID.
 */
function removePosCartLine(lineId) {
  const idx = posCart.findIndex((x) => x.id === lineId);
  if (idx !== -1) {
    posCart.splice(idx, 1);
    renderPosGrid();
    renderPosCart();
    updatePosMobileBar();
  }
}

/**
 * Handles two-step inline confirmation for clearing cart contents.
 */
function handlePosClearCart() {
  const btn = $("pos-btn-clear-cart");
  if (!posClearConfirmActive) {
    posClearConfirmActive = true;
    if (btn) {
      btn.textContent = "Tap again to clear";
      btn.style.color = "var(--danger, #DC2626)";
      btn.style.fontWeight = "700";
    }
    if (posClearConfirmTimer) clearTimeout(posClearConfirmTimer);
    posClearConfirmTimer = setTimeout(() => {
      posClearConfirmActive = false;
      const b = $("pos-btn-clear-cart");
      if (b) {
        b.textContent = "Clear cart";
        b.style.color = "";
        b.style.fontWeight = "";
      }
    }, 3000);
    return;
  }

  posClearConfirmActive = false;
  if (posClearConfirmTimer) clearTimeout(posClearConfirmTimer);
  posCart = [];
  posDiscount = 0;
  posTendered = 0;
  posTenderedManual = false;
  posRef = "";
  renderPosGrid();
  renderPosCart();
  updatePosMobileBar();
}

/**
 * Sets payment method for active sale ("Cash" or "GCash").
 * @param {string} m - Method name.
 */
function setPosMethod(m) {
  if (m !== "Cash" && m !== "GCash") return;
  posMethod = m;
  renderPosCart();
}

/**
 * Sets quick tender amount from predefined quick cash buttons.
 * @param {string|number} val - "Exact" or numeric cash value.
 */
function setPosQuickTender(val) {
  const total = getPosTotal();
  if (val === "Exact") {
    posTendered = total;
  } else {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      posTendered = num;
    }
  }
  posTenderedManual = true;
  renderPosCart();
}

/**
 * Handles cashier input into cash tendered field.
 * @param {string} val - Input amount.
 */
function onPosTenderedInput(val) {
  const num = parseFloat(val);
  posTendered = isNaN(num) || num < 0 ? 0 : num;
  posTenderedManual = true;
  syncPosCartSummaryDom();
}

/**
 * Handles cashier input into discount field.
 * @param {string} val - Input amount.
 */
function onPosDiscountInput(val) {
  const num = parseFloat(val);
  posDiscount = isNaN(num) || num < 0 ? 0 : num;
  syncPosCartSummaryDom();
}

/**
 * Finalizes sale, persists to D.sales, prints receipt, and resets cart.
 */
function chargePosSale() {
  const total = getPosTotal();
  if (posCart.length === 0) return;
  if (posMethod === "Cash" && (Number(posTendered) || 0) < total) return;

  const u = getCurrentUser();
  const tendered = posMethod === "Cash" ? (Number(posTendered) || 0) : total;
  const change = posMethod === "Cash" ? Math.max(0, tendered - total) : 0;

  const newSale = {
    id: uid(),
    no: generatePosNumber(),
    at: nowLocalString(),
    by: u ? u.name : "Cashier",
    customer: "Walk-in",
    items: posCart.map((it) => ({
      id: it.id || uid(),
      kind: it.kind || "part",
      name: it.name || "Item",
      qty: Number(it.qty) || 1,
      price: Number(it.price) || 0,
      ref: it.ref || ""
    })),
    discount: getPosDiscount(),
    method: posMethod,
    ref: (posMethod === "GCash" && posRef) ? posRef.trim() : "",
    tendered: tendered,
    change: change,
    total: total,
    void: false,
    voidReason: "",
    voidAt: ""
  };

  if (!Array.isArray(D.sales)) D.sales = [];
  D.sales.push(newSale);
  save();

  // Reset cart state
  posCart = [];
  posCustomer = "";
  posDiscount = 0;
  posTendered = 0;
  posTenderedManual = false;
  posRef = "";
  posClearConfirmActive = false;
  if (posClearConfirmTimer) clearTimeout(posClearConfirmTimer);

  closePosBottomSheet();
  renderPosGrid();
  renderPosCart();
  updatePosMobileBar();
  openPosReceipt(newSale.id);
}

/**
 * Generates HTML for Today's Sales tab in right column.
 * @returns {string} HTML string.
 */
function getPosTodaySalesHtml() {
  const todayStr = today();
  const sales = Array.isArray(D.sales) ? D.sales : [];
  const todaySales = sales.filter((s) => (s.at || "").slice(0, 10) === todayStr);

  const nonVoidToday = todaySales.filter((s) => !s.void);
  const cnt = nonVoidToday.length;
  const totRev = nonVoidToday.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const cashRev = nonVoidToday.filter((s) => s.method === "Cash").reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const digRev = nonVoidToday.filter((s) => s.method !== "Cash").reduce((acc, s) => acc + (Number(s.total) || 0), 0);

  const salesToList = posShowOlderSales ? sales : todaySales;
  const sortedSales = [...salesToList].sort((a, b) => {
    return (b.at || "").localeCompare(a.at || "") || (b.no || "").localeCompare(a.no || "");
  });

  const u = getCurrentUser();
  const canVoid = u && (u.activeRole === "admin" || u.activeRole === "superadmin");

  return `
    <div class="pos-today-kpi-row">
      <div class="pos-today-kpi">
        <div class="pos-today-kpi-lbl">SALES</div>
        <div class="pos-today-kpi-val">${cnt}</div>
      </div>
      <div class="pos-today-kpi">
        <div class="pos-today-kpi-lbl">TODAY TOTAL</div>
        <div class="pos-today-kpi-val">${P(totRev)}</div>
      </div>
      <div class="pos-today-kpi">
        <div class="pos-today-kpi-lbl">CASH / DIGITAL</div>
        <div class="pos-today-kpi-val" style="font-size:11px">${P(cashRev)} / ${P(digRev)}</div>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
      <span style="font-size:12px;font-weight:700;color:var(--text-secondary)">
        ${posShowOlderSales ? "All Recorded Sales" : "Today's Transactions"}
      </span>
      <button type="button" class="btn g sm" onclick="togglePosShowOlderSales()">
        ${posShowOlderSales ? "Show Today Only" : "Show Older Sales"}
      </button>
    </div>

    <div style="max-height:calc(100vh - 380px);overflow-y:auto;padding-right:2px">
      ${
        sortedSales.length === 0
          ? `<div class="empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-muted)">No sales recorded ${posShowOlderSales ? "yet" : "today"}.</div>`
          : sortedSales.map((s) => {
              const itemCount = s.items?.length || 0;
              const summaryItems = (s.items || []).map((i) => i.name).slice(0, 2).join(", ");
              const hasMore = (s.items || []).length > 2 ? "..." : "";
              return `
                <div class="pos-sale-row ${s.void ? 'is-voided' : ''}" style="${s.void ? 'opacity:0.75;background:#F8FAFC' : ''}">
                  <div style="flex:1;min-width:0">
                    <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                      <b>${escHtml(s.no)}</b>
                      ${s.void ? `<span class="pos-void-badge">VOIDED</span>` : ""}
                      <span style="font-size:11px;color:var(--text-muted)">${formatPosDateTime(s.at)}</span>
                    </div>
                    <div style="font-size:11px;color:var(--text-secondary);margin-top:2px">
                      ${escHtml(s.by || "Cashier")} · <span style="color:var(--text-primary);font-weight:600">${escHtml(s.customer || "Customer")}</span>
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">
                      ${itemCount} item${itemCount === 1 ? "" : "s"} · ${escHtml(summaryItems)}${hasMore}
                    </div>
                    ${
                      s.void
                        ? `<div style="font-size:11px;color:var(--danger, #DC2626);margin-top:3px;font-style:italic">Voided${s.voidAt ? ` on ${formatPosDateTime(s.voidAt)}` : ""}${s.voidReason ? `: "${escHtml(s.voidReason)}"` : ""}</div>`
                        : ""
                    }
                  </div>
                  <div style="text-align:right;margin-left:8px">
                    <div style="font-weight:800;font-size:13px;${s.void ? 'text-decoration:line-through;color:var(--text-muted)' : 'color:#0F172A'}">
                      ${P(s.total)}
                    </div>
                    <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px">
                      ${escHtml(s.method || "Cash")}
                    </div>
                    <div style="display:flex;gap:4px;justify-content:flex-end">
                      <button type="button" class="btn g sm" onclick="openPosReceipt('${s.id}')" title="View receipt">Receipt</button>
                      ${
                        canVoid && !s.void
                          ? `<button type="button" class="btn g sm" style="color:var(--danger, #DC2626)" onclick="openPosVoidModal('${s.id}')" title="Void sale">Void</button>`
                          : ""
                      }
                    </div>
                  </div>
                </div>
              `;
            }).join("")
      }
    </div>
  `;
}

/**
 * Re-renders the Today's sales panel in the right column.
 */
function renderPosTodaySales() {
  if (posTab === "today") {
    renderPosRightPanel();
  }
}

/**
 * Toggles displaying all recorded sales versus today only.
 */
function togglePosShowOlderSales() {
  posShowOlderSales = !posShowOlderSales;
  renderPosTodaySales();
}

/**
 * Opens void modal for a specific sale.
 * @param {string} saleId - Sale ID.
 */
function openPosVoidModal(saleId) {
  const s = (Array.isArray(D.sales) ? D.sales : []).find((x) => x.id === saleId);
  if (!s) return;
  posVoidSaleId = saleId;

  const md = $("pos-void-md");
  if (!md) return;

  md.innerHTML = `
    <div style="padding:18px 20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px">
        <h3 id="pos-void-modal-title" style="margin:0;font-size:16px;color:#0F172A">⚠️ Void Sale ${escHtml(s.no)}</h3>
        <button type="button" class="search-clear visible" onclick="closePosVoidModal()" style="position:static" title="Close">✕</button>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;line-height:1.4">
        Are you sure you want to void this sale of <b>${P(s.total)}</b> (${escHtml(s.method || "Cash")})? Voided sales are excluded from sales revenue and performance reports.
      </p>
      <div style="margin-bottom:16px">
        <label for="pos-void-reason" style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--text-secondary)">Reason for voiding:</label>
        <input
          id="pos-void-reason"
          type="text"
          placeholder="e.g., Wrong item selected, Cash refund, Customer cancelled"
          style="width:100%;height:38px;border-radius:8px;border:1px solid #CBD5E1;padding:0 10px;box-sizing:border-box;font-size:13px"
        />
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button type="button" class="btn g" onclick="closePosVoidModal()">Cancel</button>
        <button type="button" class="btn" style="background:var(--danger, #DC2626);border-color:var(--danger, #DC2626)" onclick="confirmPosVoid()">Confirm Void</button>
      </div>
    </div>
  `;

  const ov = $("pos-void-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
}

/**
 * Closes the void confirmation modal.
 */
function closePosVoidModal() {
  const ov = $("pos-void-ov");
  if (ov) ov.classList.remove("on");
  posVoidSaleId = null;
}

/**
 * Confirms voiding of the active sale, persists change, and updates views.
 */
function confirmPosVoid() {
  if (!posVoidSaleId) return;
  const s = (Array.isArray(D.sales) ? D.sales : []).find((x) => x.id === posVoidSaleId);
  if (s) {
    const reasonInput = $("pos-void-reason");
    const reason = reasonInput ? reasonInput.value.trim() : "";
    s.void = true;
    s.voidReason = reason || "Voided by admin";
    s.voidAt = nowLocalString();
    save();
  }
  closePosVoidModal();
  renderPosTodaySales();
  updatePosHeaderStats();
  if (view === "reports") {
    const resEl = $("report-results-wrap");
    if (resEl) resEl.innerHTML = getReportResultsHtml();
  }
}

/**
 * Generates and displays digital printable receipt for a POS sale.
 * @param {string} saleId - Sale ID.
 */
function openPosReceipt(saleId) {
  const sale = (Array.isArray(D.sales) ? D.sales : []).find((x) => x.id === saleId);
  if (!sale) return;

  const md = $("rcpt-md");
  if (!md) return;

  const subtotal = (sale.items || []).reduce((s, i) => s + (Number(i.qty) || 1) * (Number(i.price) || 0), 0);

  md.innerHTML = `
    <div style="text-align:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:14px">
      <div style="font-size:28px">⚡</div>
      <h2 style="margin:4px 0 2px;font-size:22px;color:#0F172A">MotoShop</h2>
      <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">Quick Sale Receipt</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${formatPosDateTime(sale.at)}</div>
    </div>

    ${
      sale.void
        ? `
          <div style="background:#FEE2E2;border:1px solid #F87171;color:#991B1B;padding:10px 12px;border-radius:8px;font-size:12px;margin-bottom:14px;font-weight:700;text-align:center">
            ⚠️ THIS SALE WAS VOIDED${sale.voidAt ? ` ON ${formatPosDateTime(sale.voidAt)}` : ""}<br>
            <span style="font-weight:normal;font-size:11px">Reason: ${escHtml(sale.voidReason || "Voided")}</span>
          </div>
        `
        : ""
    }

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px;background:#F8FAFC;padding:10px 12px;border-radius:8px;border:1px solid var(--border)">
      <div>
        <span style="color:var(--text-muted)">Receipt No:</span>
        <b style="color:#0F172A;margin-left:4px">${escHtml(sale.no)}</b>
      </div>
      <div>
        <span style="color:var(--text-muted)">Cashier:</span>
        <b style="color:#0F172A;margin-left:4px">${escHtml(sale.by || "Cashier")}</b>
      </div>
      <div style="grid-column:1/-1">
        <span style="color:var(--text-muted)">Customer:</span>
        <b style="color:#0F172A;margin-left:4px">${escHtml(sale.customer || "Customer")}</b>
      </div>
    </div>

    <table style="width:100%;border-collapse:collapse;font-size:12px;margin-bottom:14px">
      <thead>
        <tr style="border-bottom:1px solid var(--border);color:var(--text-muted);text-align:left;font-size:11px;text-transform:uppercase">
          <th style="padding:4px 0">Item</th>
          <th style="padding:4px 8px;text-align:center">Qty</th>
          <th style="padding:4px 8px;text-align:right">Price</th>
          <th style="padding:4px 0;text-align:right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${(sale.items || []).map((it) => {
          const lineTotal = (Number(it.qty) || 1) * (Number(it.price) || 0);
          const isLabor = it.kind === "labor";
          return `
            <tr style="border-bottom:1px solid #F1F5F9">
              <td style="padding:6px 0">
                <span class="cat-badge ${it.kind}" style="margin-right:4px">${isLabor ? 'Labor' : 'Part'}</span>
                <b>${escHtml(it.name)}</b>
              </td>
              <td style="padding:6px 8px;text-align:center">${it.qty}</td>
              <td style="padding:6px 8px;text-align:right">${P(it.price)}</td>
              <td style="padding:6px 0;text-align:right;font-weight:700">${P(lineTotal)}</td>
            </tr>
          `;
        }).join("")}
      </tbody>
    </table>

    <div style="border-top:1px solid var(--border);padding-top:8px;font-size:13px">
      <div style="display:flex;justify-content:space-between;margin-bottom:3px">
        <span style="color:var(--text-secondary)">Subtotal</span>
        <span>${P(subtotal)}</span>
      </div>
      ${
        (Number(sale.discount) || 0) > 0
          ? `
            <div style="display:flex;justify-content:space-between;color:var(--success, #16A34A);margin-bottom:3px">
              <span>Discount</span>
              <span>-${P(sale.discount)}</span>
            </div>
          `
          : ""
      }
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;border-top:1px solid var(--border);padding-top:6px;margin-top:4px">
        <span>Total</span>
        <span style="${sale.void ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${P(sale.total)}</span>
      </div>
    </div>

    <div style="background:#F8FAFC;border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-top:14px;font-size:12px">
      <div style="display:flex;justify-content:space-between">
        <span>Payment Method:</span>
        <b>${escHtml(sale.method || "Cash")}${sale.ref ? ` (Ref: ${escHtml(sale.ref)})` : ""}</b>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:3px">
        <span>Amount Tendered:</span>
        <b>${P(sale.tendered !== undefined ? sale.tendered : sale.total)}</b>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:3px">
        <span>Change:</span>
        <b>${P(sale.change || 0)}</b>
      </div>
    </div>

    <div style="text-align:center;margin-top:18px;font-size:12px;color:var(--text-muted)">
      Thank you for choosing MotoShop! Ride safely.
    </div>

    <div class="rcpt-no-print" style="display:flex;justify-content:flex-end;gap:8px;margin-top:18px;border-top:1px solid var(--border);padding-top:14px">
      <button type="button" class="btn g" onclick="closeReceipt()">Close</button>
      <button type="button" class="btn" onclick="window.print()">🖨️ Print Receipt</button>
    </div>
  `;

  const ov = $("rcpt-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
}

/**
 * Opens mobile cart bottom sheet drawer.
 */
function openPosBottomSheet() {
  const col = $("pos-right-col");
  if (col) col.classList.add("bottom-sheet-open");
}

/**
 * Closes mobile cart bottom sheet drawer.
 */
function closePosBottomSheet() {
  const col = $("pos-right-col");
  if (col) col.classList.remove("bottom-sheet-open");
}

/**
 * Updates floating mobile bar checkout summary.
 */
function updatePosMobileBar() {
  const barEl = $("pos-mobile-bar");
  const total = getPosTotal();
  const count = getPosTotalItemsCount();
  if (barEl) {
    barEl.textContent = `View sale · ${count} item${count === 1 ? "" : "s"} · ${P(total)}`;
  }
}

/**
 * Main view renderer for the Quick Sales page.
 * @returns {string} Full HTML markup.
 */
function getPosViewHtml() {
  const total = getPosTotal();
  const totalItems = getPosTotalItemsCount();

  return `
    <div class="card top">
      <div>
        <h1>Quick Sales</h1>
        <p>Fast checkout for parts and fluids from the catalog.</p>
      </div>
    </div>

    <div class="pos-layout">
      <!-- Left Column: Search, Item Tiles & Custom Item Form -->
      <div class="pos-left-col">
        <div class="pos-search-wrap">
          <span class="search-icon" onclick="$('pos-search-input').focus()" title="Search">🔍</span>
          <input
            id="pos-search-input"
            type="text"
            class="pos-search-input"
            placeholder="Search parts and fluids (press Enter to quick-add)..."
            value="${escHtml(posSearch)}"
            oninput="onPosSearchInput(this.value)"
            onkeydown="if(event.key==='Enter'){event.preventDefault();addFirstPosMatchToCart();}"
          />
          <button
            id="pos-search-clear"
            class="search-clear ${posSearch ? "visible" : ""}"
            onclick="clearPosSearch()"
            type="button"
            aria-label="Clear search"
            title="Clear search"
          >✕</button>
        </div>

        <div id="pos-grid-wrap">
          ${getPosGridHtml()}
        </div>
      </div>

      <!-- Right Column: Sticky Cart Panel / Today's Sales -->
      <div class="pos-right-col" id="pos-right-col" onclick="if(event.target===this)closePosBottomSheet()">
        <div class="pos-cart-panel" id="pos-cart-panel">
          ${getPosRightPanelHtml()}
        </div>
      </div>
    </div>

    <!-- Mobile Floating Checkout Bar (<900px) -->
    <div class="pos-mobile-bar" id="pos-mobile-bar" onclick="openPosBottomSheet()">
      View sale · ${totalItems} item${totalItems === 1 ? "" : "s"} · ${P(total)}
    </div>
  `;
}




/* ==========================================================
   10. INIT
   ========================================================== */

/**
 * Bootstraps authentication state on page load.
 * Sets copyright year, and if a valid session exists, opens the app directly; otherwise shows only the login screen.
 */
function initAuth() {
  const yearEl = $("login-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const u = getCurrentUser();
  if (u) {
    document.body.classList.remove("logged-out");
    document.body.classList.add("logged-in");
    syncViewForRole();
  } else {
    document.body.classList.remove("logged-in");
    document.body.classList.add("logged-out");
    const emailEl = $("login-email");
    if (emailEl) {
      emailEl.focus();
      openLoginDropdown();
    }
  }
}

initAuth();
