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
 * Preserved single-color line icons for non-sidebar elements (KPI cards, search bars, tables).
 */
const LINE_ICONS = {
  dash: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
  cust: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  insp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  rep: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`,
  pos: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  posMenu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
  ql: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path><line x1="2" y1="13" x2="22" y2="13"></line></svg>`,
  cat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
  bill: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
  his: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  reports: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
  users: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
};

/**
 * Global UI SVG icons (Sidebar nav items feature 22px two-tone Google Workspace style icons).
 */
const ICONS = {
  dash: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2" y="2" width="8" height="8" rx="2.5" fill="var(--nav-dash, #2563EB)"/><rect x="12" y="2" width="8" height="8" rx="2.5" fill="var(--nav-dash-tint, #BFDBFE)"/><rect x="2" y="12" width="8" height="8" rx="2.5" fill="var(--nav-dash-tint, #BFDBFE)"/><rect x="12" y="12" width="8" height="8" rx="2.5" fill="var(--nav-dash, #2563EB)"/></svg>`,
  cust: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="15.5" cy="7.5" r="3" fill="var(--nav-cust-tint, #DDD6FE)"/><path d="M11 19.5c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5" stroke="var(--nav-cust-tint, #DDD6FE)" stroke-width="3" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="3.5" fill="var(--nav-cust, #7C3AED)"/><path d="M2.5 20c0-3.3 2.2-5.5 5-5.5s5 2.2 5 5.5" stroke="var(--nav-cust, #7C3AED)" stroke-width="3.5" stroke-linecap="round"/></svg>`,
  insp: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="9.5" cy="9.5" r="7.5" fill="var(--nav-insp-tint, #A5F3FC)"/><circle cx="9.5" cy="9.5" r="7" stroke="var(--nav-insp, #0891B2)" stroke-width="2"/><path d="M6 10a3.5 3.5 0 0 1 6-2" stroke="var(--nav-insp, #0891B2)" stroke-width="1.6" stroke-linecap="round"/><circle cx="9.5" cy="9.5" r="1.8" fill="var(--nav-insp, #0891B2)"/><line x1="9.5" y1="9.5" x2="12.5" y2="7.5" stroke="var(--nav-insp, #0891B2)" stroke-width="1.8" stroke-linecap="round"/><path d="M15 15l4.8 4.8" stroke="var(--nav-insp, #0891B2)" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  rep: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="7" cy="15" r="4.5" fill="var(--nav-rep-tint, #FED7AA)"/><circle cx="7" cy="15" r="2" fill="var(--nav-rep, #EA580C)"/><path d="M14.8 3.2a4 4 0 0 0-3.6 5.8L4.7 15.5a1.8 1.8 0 0 0 2.5 2.5l6.5-6.5a4 4 0 0 0 5.8-3.6c0-.6-.1-1.1-.4-1.6l-2.6 2.6-1.8-1.8 2.6-2.6a3.9 3.9 0 0 0-2.6-.7z" fill="var(--nav-rep, #EA580C)"/><path d="M9.8 10.4l1.8 1.8" stroke="var(--nav-rep-tint, #FED7AA)" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  pos: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="var(--nav-pos-tint, #FDE68A)"/><path d="M12.5 3L5.5 12h5l-1.5 7L16.5 10h-5l1.5-7z" fill="var(--nav-pos, #D97706)" stroke="var(--nav-pos, #D97706)" stroke-width="0.8" stroke-linejoin="round"/></svg>`,
  posMenu: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="var(--nav-pos-tint, #FDE68A)"/><path d="M12.5 3L5.5 12h5l-1.5 7L16.5 10h-5l1.5-7z" fill="var(--nav-pos, #D97706)" stroke="var(--nav-pos, #D97706)" stroke-width="0.8" stroke-linejoin="round"/></svg>`,
  qlabor: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" fill="var(--nav-pos-tint, #FDE68A)"/><path d="M12.5 3L5.5 12h5l-1.5 7L16.5 10h-5l1.5-7z" fill="var(--nav-pos, #D97706)" stroke="var(--nav-pos, #D97706)" stroke-width="0.8" stroke-linejoin="round"/></svg>`,
  ql: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"></path><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path><line x1="2" y1="13" x2="22" y2="13"></line></svg>`,
  cat: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 2.2L19.5 6.8L11 11.4L2.5 6.8L11 2.2Z" fill="var(--nav-cat-tint, #A7F3D0)"/><path d="M2.5 7.4L11 12V20L2.5 15.4V7.4Z" fill="var(--nav-cat, #059669)"/><path d="M11 12L19.5 7.4V15.4L11 20V12Z" fill="var(--nav-cat, #059669)" opacity="0.85"/><path d="M8.2 10.1L11 11.6L13.8 10.1V7.8L11 9.2L8.2 7.8V10.1Z" fill="var(--nav-cat-tint, #A7F3D0)"/></svg>`,
  bill: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2" y="4" width="18" height="14" rx="3" fill="var(--nav-bill-tint, #BBF7D0)"/><rect x="2" y="7.5" width="18" height="3" fill="var(--nav-bill, #16A34A)"/><rect x="4.5" y="12" width="4.5" height="3.5" rx="1" fill="var(--nav-bill, #16A34A)"/><rect x="11" y="13" width="6.5" height="2" rx="1" fill="var(--nav-bill, #16A34A)"/></svg>`,
  his: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11.5" r="7.8" fill="var(--nav-his-tint, #C7D2FE)"/><path d="M11 4.5a7 7 0 1 1-5.8 3.1" stroke="var(--nav-his, #4F46E5)" stroke-width="2" stroke-linecap="round"/><polyline points="4 4 5.2 7.8 9 7.8" fill="none" stroke="var(--nav-his, #4F46E5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="11.5" r="1.5" fill="var(--nav-his, #4F46E5)"/><path d="M11 8v3.5l2.5 1.5" stroke="var(--nav-his, #4F46E5)" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  reports: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2.5" y="12" width="4.5" height="7.5" rx="1.8" fill="var(--nav-reports-tint, #FBCFE8)"/><rect x="8.8" y="7.5" width="4.5" height="12" rx="1.8" fill="var(--nav-reports, #DB2777)"/><rect x="15" y="3.5" width="4.5" height="16" rx="1.8" fill="var(--nav-reports-tint, #FBCFE8)"/><path d="M4.5 10.5L11 6L17.2 2.8" stroke="var(--nav-reports, #DB2777)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17.2" cy="2.8" r="1.8" fill="var(--nav-reports, #DB2777)"/></svg>`,
  audit: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 2.2L18.5 5.2v5.5c0 5-3.5 8.5-7.5 10-4-1.5-7.5-5-7.5-10V5.2L11 2.2z" fill="var(--nav-audit-tint, #99F6E4)" stroke="var(--nav-audit, #0F766E)" stroke-width="1.5" stroke-linejoin="round"/><polyline points="7.5 11 9.8 13.5 14.5 8.5" fill="none" stroke="var(--nav-audit, #0F766E)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  users: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 2.2L18.5 5.2v5.5c0 5-3.5 8.5-7.5 10-4-1.5-7.5-5-7.5-10V5.2L11 2.2z" fill="var(--nav-users-tint, #CBD5E1)" stroke="var(--nav-users, #475569)" stroke-width="1.5" stroke-linejoin="round"/><circle cx="11" cy="9.5" r="2.3" fill="var(--nav-users, #475569)"/><path d="M7.5 15.8c0-2 1.6-3.2 3.5-3.2s3.5 1.2 3.5 3.2" stroke="var(--nav-users, #475569)" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  lock24: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
  print: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>`,
  download: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  bell: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  userPlus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>`,
  clipboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`,
  alert: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  chat: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
  money: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
  bike: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="16" r="3"></circle><circle cx="19" cy="16" r="3"></circle><path d="M5 16l4-7h4l3 7"></path><path d="M12 9l3-4h3"></path></svg>`,
  cpu: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  crown: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"></path></svg>`,
  panelCollapse: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><path d="M14 9l-3 3 3 3"></path></svg>`,
  panelExpand: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><path d="M11 9l3 3-3 3"></path></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`
};

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
  "Completed",
  "Cancelled"
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
 */

/**
 * Generates initial demo data seed.
 * @returns {Object} Database object.
 */
function seed() {
  return initDatabase();
}


/* ==========================================================
   3. STORAGE (load / save)
   ========================================================== */

/**
 * Initializes the application database.
 * Every page reload, overwrites stored state with a fresh deep copy of DEMO_DATA.
 * Changes made during the session persist to localStorage via save(),
 * but reset cleanly to the demo seed on the next page reload.
 * @returns {Object} Fresh database object.
 */
function initDatabase() {
  const seedPt = [
    { id: "p1", sku: "OIL-10W40", name: "Engine oil 10W-40 (1L)", cost: 420 },
    { id: "p2", sku: "FLT-OIL", name: "Oil filter", cost: 180 },
    { id: "p3", sku: "BRK-PAD-F", name: "Front brake pads", cost: 650 },
    { id: "p4", sku: "CVT-BELT", name: "CVT drive belt", cost: 1450 },
    { id: "p5", sku: "SPK-PLG", name: "Spark plug", cost: 260 },
    { id: "p6", sku: "GRS-CVT", name: "CVT grease", cost: 150 }
  ];
  const seedSv = [
    { id: "s1", name: "Change oil", labor: 150, parts: ["p1", "p2"] },
    { id: "s2", name: "Valve clearance", labor: 450, parts: [] },
    { id: "s3", name: "CVT cleaning", labor: 600, parts: ["p6"] },
    { id: "s4", name: "Brake overhaul", labor: 500, parts: ["p3"] },
    { id: "s5", name: "Tune-up", labor: 350, parts: ["p5"] }
  ];

  let cu = [];
  let bk = [];
  let wo = [];
  let transactions = [];

  const sourceData = (typeof DEMO_DATA !== "undefined" && DEMO_DATA)
    ? DEMO_DATA
    : (typeof window !== "undefined" && window.DEMO_DATA ? window.DEMO_DATA : null);

  if (sourceData) {
    try {
      const raw = JSON.parse(JSON.stringify(sourceData));
      cu = raw.customers || raw.cu || [];
      bk = raw.motorcycles || raw.bk || [];
      wo = raw.jobOrders || raw.wo || [];
      transactions = raw.transactions || [];
    } catch (e) {}
  }

  // Cleanup any legacy stored odometer fields from existing localStorage data (NOT from audit entries)
  try {
    const rawSaved = typeof localStorage !== "undefined" ? localStorage.getItem("moto1") : null;
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved);
      if (parsed && typeof parsed === "object") {
        let changed = false;
        ["bk", "motorcycles", "wo", "jobOrders", "transactions", "history"].forEach((k) => {
          if (Array.isArray(parsed[k])) {
            parsed[k].forEach((rec) => {
              if (rec && typeof rec === "object") {
                if ("odo" in rec) { delete rec.odo; changed = true; }
                if ("odometer" in rec) { delete rec.odometer; changed = true; }
              }
            });
          }
        });
        if (changed) {
          localStorage.setItem("moto1", JSON.stringify(parsed));
        }
      }
    }
  } catch (e) {}

  // Clean in-memory records
  try {
    [bk, wo, transactions].forEach((arr) => {
      if (Array.isArray(arr)) {
        arr.forEach((rec) => {
          if (rec && typeof rec === "object") {
            delete rec.odo;
            delete rec.odometer;
          }
        });
      }
    });
  } catch (e) {}

  const db = {
    cu: cu,
    bk: bk,
    wo: wo,
    transactions: transactions,
    pt: seedPt,
    sv: seedSv,
    sales: [],
    audit: [],
    commission: {}
  };

  try {
    localStorage.setItem("moto1", JSON.stringify(db));
  } catch (e) {}

  return db;
}

let D = initDatabase();
if (typeof window !== "undefined") {
  window.D = D;
}

/**
 * Persists the entire database object D into localStorage under key "moto1".
 */
const save = () => {
  try {
    if (typeof window !== "undefined") {
      window.D = D;
    }
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
  admin:      ["dash", "cust", "insp", "rep", "pos", "ql", "cat", "bill", "his", "reports", "audit"],
  superadmin: ["dash", "cust", "insp", "rep", "pos", "ql", "cat", "bill", "his", "reports", "audit", "users"],
  mechanic:   ["dash", "insp", "rep", "pos", "ql", "bill"]
};
const ROLE_NAV = DEFAULT_ROLE_NAV;

/**
 * Returns allowed primary/admin navigation route keys for a role.
 * Reads custom permissions matrix from localStorage key "moto1_nav", falling back to defaults.
 * Automatically migrates legacy matrices:
 *   _v: 2 grants full primary nav to Super Admin once.
 *   _q: 1 migrated mechanic to dedicated "qlabor".
 *   _p: 1 grants full POS tabs ("pos", "ql", "bill") to Mechanic and removes "qlabor" once.
 *   _a: 1 grants "audit" to admin and superadmin once and ensures mechanic does not have it.
 * Super Admin always has "users" and "audit", Admin and Super Admin always have "dash", regardless of stored matrix.
 * Mechanic role is hard-coded to never have access to "audit".
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

  // Migration for _v: 2 (adds missing default pages to saved superadmin list once)
  if (matrix && typeof matrix === "object" && (!matrix._v || matrix._v < 2)) {
    try {
      if (!Array.isArray(matrix.superadmin)) {
        matrix.superadmin = [...DEFAULT_ROLE_NAV.superadmin];
      } else {
        DEFAULT_ROLE_NAV.superadmin.forEach((k) => {
          if (!matrix.superadmin.includes(k)) {
            matrix.superadmin.push(k);
          }
        });
      }
      matrix._v = 2;
      localStorage.setItem("moto1_nav", JSON.stringify(matrix));
    } catch (e) {}
  }

  // Migration for _q: 1 (adds "qlabor" to saved mechanic list once, replacing legacy "ql")
  if (matrix && typeof matrix === "object" && !matrix._q) {
    try {
      if (Array.isArray(matrix.mechanic)) {
        matrix.mechanic = matrix.mechanic.filter((k) => k !== "ql");
        if (!matrix.mechanic.includes("qlabor")) {
          matrix.mechanic.push("qlabor");
        }
      } else {
        matrix.mechanic = [...DEFAULT_ROLE_NAV.mechanic];
      }
      matrix._q = 1;
      localStorage.setItem("moto1_nav", JSON.stringify(matrix));
    } catch (e) {}
  }

  // Migration for _p: 1 (gives mechanic full POS tabs: "pos", "ql", "bill", removing "qlabor" once)
  if (matrix && typeof matrix === "object" && !matrix._p) {
    try {
      if (Array.isArray(matrix.mechanic)) {
        matrix.mechanic = matrix.mechanic.filter((k) => k !== "qlabor");
        ["pos", "ql", "bill"].forEach((k) => {
          if (!matrix.mechanic.includes(k)) {
            matrix.mechanic.push(k);
          }
        });
      } else {
        matrix.mechanic = [...DEFAULT_ROLE_NAV.mechanic];
      }
      matrix._p = 1;
      localStorage.setItem("moto1_nav", JSON.stringify(matrix));
    } catch (e) {}
  }

  // Migration for _a: 1 (adds "audit" to saved admin and superadmin lists once, ensures not in mechanic list)
  if (matrix && typeof matrix === "object" && !matrix._a) {
    try {
      if (Array.isArray(matrix.superadmin)) {
        if (!matrix.superadmin.includes("audit")) {
          const uIdx = matrix.superadmin.indexOf("users");
          if (uIdx !== -1) {
            matrix.superadmin.splice(uIdx, 0, "audit");
          } else {
            matrix.superadmin.push("audit");
          }
        }
      } else {
        matrix.superadmin = [...DEFAULT_ROLE_NAV.superadmin];
      }

      if (Array.isArray(matrix.admin)) {
        if (!matrix.admin.includes("audit")) {
          matrix.admin.push("audit");
        }
      } else {
        matrix.admin = [...DEFAULT_ROLE_NAV.admin];
      }

      if (Array.isArray(matrix.mechanic)) {
        matrix.mechanic = matrix.mechanic.filter((k) => k !== "audit");
      }

      matrix._a = 1;
      localStorage.setItem("moto1_nav", JSON.stringify(matrix));
    } catch (e) {}
  }

  let list = (matrix && Array.isArray(matrix[role]))
    ? [...matrix[role]]
    : [...(DEFAULT_ROLE_NAV[role] || [])];

  // Super Admin ALWAYS has access to User Management and Audit
  if (role === "superadmin") {
    if (!list.includes("users")) {
      list.push("users");
    }
    if (!list.includes("audit")) {
      list.push("audit");
    }
  }
  // Admin & Super Admin ALWAYS have access to Dashboard
  if ((role === "admin" || role === "superadmin") && !list.includes("dash")) {
    list.unshift("dash");
  }
  // Mechanic role is hard-coded to NEVER open or receive audit
  if (role === "mechanic") {
    list = list.filter((k) => k !== "audit");
  }

  const validKeys = V.map((x) => x[0]);
  return list.filter((k) => validKeys.includes(k));
}

/**
 * Checks whether the active role has permission to open a specific navigation page.
 * Hard-coded to refuse Mechanic from opening "audit".
 * @param {string} pageKey - Route key to check (e.g. "dash", "cust", "rep", "cat", "his", "reports", "audit", "users").
 * @returns {boolean} True if the active role can open the page.
 */
const canOpen = (pageKey) => {
  const u = getCurrentUser();
  if (!u) return false;
  if (pageKey === "audit" && u.activeRole === "mechanic") return false;
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
        list = parsed.filter((u) => u && typeof u === "object" && u.email);
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

/* ==========================================================
   AUDIT LOG & SHARED SUPER ADMIN HELPERS
   ========================================================== */

/**
 * Checks whether the current active user is Super Admin.
 * Follows account switching instantly without full reload.
 * @returns {boolean}
 */
function isSuper() {
  const u = getCurrentUser();
  return Boolean(u && (u.activeRole === "superadmin" || (!u.activeRole && u.role === "superadmin")));
}

/**
 * Returns a local audit timestamp "YYYY-MM-DD HH:MM:SS" built from local time parts.
 * Never uses toISOString().
 * @param {Date} [d=new Date()]
 * @returns {string} e.g. "2026-11-12 14:05:08"
 */
function nowLocalAuditTimestamp(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hr = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");
  return `${y}-${m}-${day} ${hr}:${min}:${sec}`;
}

/**
 * Category scopes and action-to-category mapping for the audit log.
 * Scopes: "ops" (visible to Admin and Super Admin) or "sensitive" (Super Admin only).
 */
const AUDIT_CATEGORIES = {
  // Category scope definitions
  "Jobs":              { scope: "ops" },
  "Payments":          { scope: "ops" },
  "Quick Sales":       { scope: "ops" },
  "Quick Labor":       { scope: "ops" },
  "Customers":         { scope: "ops" },
  "Sessions":          { scope: "ops" },
  "Voids & Reversals": { scope: "sensitive" },
  "Overrides":         { scope: "sensitive" },
  "Catalog":           { scope: "sensitive" },
  "Users & Access":    { scope: "sensitive" },
  "Deletions":         { scope: "sensitive" },
  "Other":             { scope: "sensitive" },

  // Action text -> Category mappings
  "Job created":               "Jobs",
  "Status moved":              "Jobs",
  "Marked by":                 "Jobs",
  "Assign mechanic":           "Jobs",
  "Item added":                "Jobs",
  "Extra item added":          "Jobs",
  "Advance payment":           "Payments",
  "Settle balance":            "Payments",
  "Paid and released":         "Payments",
  "Quick sale recorded":       "Quick Sales",
  "Quick labor recorded":      "Quick Labor",
  "Add customer":              "Customers",
  "Edit customer":             "Customers",
  "Customer added":            "Customers",
  "Customer edited":           "Customers",
  "Motorcycle added":          "Customers",
  "Motorcycle edited":         "Customers",
  "Login":                     "Sessions",
  "Logout":                    "Sessions",
  "Switch account":            "Sessions",
  "Export audit log":          "Sessions",
  "Void sale":                 "Voids & Reversals",
  "Void quick labor":          "Voids & Reversals",
  "Reverse transaction":       "Voids & Reversals",
  "Force-cancel repair":       "Voids & Reversals",
  "Reopen job":                "Voids & Reversals",
  "Price override":            "Overrides",
  "Edit diagnosis":            "Overrides",
  "Edit plate":                "Overrides",
  "Plate change":              "Overrides",
  "Add catalog item":          "Catalog",
  "Edit catalog item":         "Catalog",
  "Delete catalog item":       "Catalog",
  "Catalog import":            "Catalog",
  "Add user":                  "Users & Access",
  "Edit user":                 "Users & Access",
  "Deactivate user":           "Users & Access",
  "Reactivate user":           "Users & Access",
  "Role change":               "Users & Access",
  "Permissions matrix change": "Users & Access",
  "Permissions matrix reset":  "Users & Access",
  "Archive motorcycle":        "Deletions",
  "Restore motorcycle":        "Deletions",
  "Delete motorcycle":         "Deletions",
  "Hard delete":               "Deletions"
};

/**
 * Derives category from action text using AUDIT_CATEGORIES, defaulting to "Other".
 * @param {string} action
 * @returns {string} Category name.
 */
function getAuditCategory(action) {
  if (!action) return "Other";
  const mapped = AUDIT_CATEGORIES[action];
  if (typeof mapped === "string") return mapped;
  if (mapped && typeof mapped === "object" && mapped.scope) return action;
  return "Other";
}

/**
 * Returns category scope: "ops" (Admin & Super Admin) or "sensitive" (Super Admin only).
 * @param {string} cat - Category name.
 * @returns {"ops"|"sensitive"}
 */
function getAuditCategoryScope(cat) {
  const def = AUDIT_CATEGORIES[cat];
  if (def && typeof def === "object" && def.scope) return def.scope;
  return "sensitive";
}

/**
 * Appends an audit entry to D.audit and saves to localStorage.
 * Stamped with the active role and user at that moment.
 * Capped at newest 2000 entries (drops oldest beyond that).
 * Wrapped in try/catch to never throw or block actions.
 * @param {string} action - Action name (e.g. "Job created", "Void sale").
 * @param {string} ref - Target entity reference (job ID, plate, sale no, email).
 * @param {string} note - Detailed reason, amount, or notes.
 * @param {string} [customCat] - Explicit category override (optional).
 */
function logAudit(action, ref, note, customCat) {
  try {
    const u = getCurrentUser();
    const role = u ? (u.activeRole || u.role) : "";
    if (!Array.isArray(D.audit)) D.audit = [];
    const actionStr = String(action || "");
    const cat = customCat || getAuditCategory(actionStr);
    const entry = {
      id: uid(),
      at: nowLocalAuditTimestamp(),
      by: u ? u.name : "System",
      userId: u ? u.id : "system",
      role: role || "system",
      cat: cat,
      action: actionStr,
      ref: String(ref || ""),
      note: String(note || "")
    };
    D.audit.push(entry);
    if (D.audit.length > 2000) {
      D.audit.splice(0, D.audit.length - 2000);
    }
    save();
  } catch (e) {}
}

/**
 * Shared modal for requiring a reason on sensitive Super Admin actions.
 * @param {string} title
 * @param {string} confirmLabel
 * @param {(reason: string) => void} onConfirm
 * @param {object} [opts]
 */
let _askReasonCallback = null;
let _askReasonAlertOnly = false;
function askReason(title, confirmLabel, onConfirm, opts = {}) {
  _askReasonCallback = onConfirm;
  _askReasonAlertOnly = Boolean(opts.alertOnly);
  const md = $("pos-void-md");
  const ov = $("pos-void-ov");
  if (!md || !ov) return;

  const placeholder = opts.placeholder || "Enter reason...";
  const description = opts.description || "";
  const isDestructive = opts.destructive !== false;

  md.innerHTML = `
    <div style="padding:18px 20px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px">
        <h3 id="pos-void-modal-title" style="margin:0;font-size:16px;color:var(--text);display:flex;align-items:center;gap:6px">
          ${escHtml(title)}
        </h3>
        <button type="button" class="search-clear visible" onclick="closeReasonModal()" style="position:static" title="Close">✕</button>
      </div>
      ${description ? `<p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;line-height:1.4">${description}</p>` : ""}
      ${!_askReasonAlertOnly ? `
        <div style="margin-bottom:12px">
          <label for="modal-reason-input" style="display:block;font-size:12px;font-weight:600;margin-bottom:4px;color:var(--text-secondary)">Reason (required):</label>
          <input
            id="modal-reason-input"
            type="text"
            placeholder="${escHtml(placeholder)}"
            style="width:100%;height:40px;border-radius:8px;border:1px solid var(--border);padding:0 10px;box-sizing:border-box;font-size:13px;outline:none"
            onkeydown="if(event.key==='Enter'){event.preventDefault();submitReason();}"
          />
          <div id="modal-reason-err" style="color:var(--danger, #DC2626);font-size:12px;font-weight:600;margin-top:4px;display:none">Please enter a reason.</div>
        </div>
      ` : ""}
      <div style="display:flex;justify-content:flex-end;gap:8px">
        ${!_askReasonAlertOnly ? `<button type="button" class="btn g" onclick="closeReasonModal()" style="min-height:40px">Cancel</button>` : ""}
        <button type="button" class="btn ${isDestructive && !_askReasonAlertOnly ? "btn-destructive" : ""}" style="${isDestructive && !_askReasonAlertOnly ? "background:#ffffff;color:var(--danger, #dc2626);border:1px solid var(--danger-border, #fca5a5);min-height:40px;" : "min-height:40px;"}" onclick="submitReason()">${escHtml(confirmLabel || "Confirm")}</button>
      </div>
    </div>
  `;

  ov.classList.add("on");
  ov.focus();
  setTimeout(() => {
    const inp = $("modal-reason-input");
    if (inp) inp.focus();
  }, 50);
}

function closeReasonModal() {
  const ov = $("pos-void-ov");
  if (ov) ov.classList.remove("on");
  _askReasonCallback = null;
  _askReasonAlertOnly = false;
}

function submitReason() {
  if (_askReasonAlertOnly) {
    const cb = _askReasonCallback;
    closeReasonModal();
    if (cb) cb();
    return;
  }
  const inp = $("modal-reason-input");
  const err = $("modal-reason-err");
  const val = inp ? inp.value.trim() : "";
  if (!val) {
    if (err) err.style.display = "block";
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  const cb = _askReasonCallback;
  closeReasonModal();
  if (typeof cb === "function") {
    cb(val);
  }
}

/**
 * Checks whether a work order is countable (not reversed and not cancelled).
 * @param {object} o - Work order object.
 * @returns {boolean}
 */
function isCountableJob(o) {
  if (!o) return false;
  if (o.reversed || o.st === "Cancelled" || o.cancel) return false;
  return true;
}

/**
 * Checks whether an order object represents a Quick Labor record.
 * @param {object} o
 * @returns {boolean}
 */
function isQuickLaborRecord(o) {
  if (!o) return false;
  return o.type === "quicklabor" || o.type === "QUICK LABOR";
}

/**
 * Checks whether a Quick Labor record is countable (not reversed, cancelled, or void).
 * @param {object} o
 * @returns {boolean}
 */
function isCountableQuickLabor(o) {
  if (!isQuickLaborRecord(o)) return false;
  if (o.reversed || o.void || o.cancel || o.st === "Cancelled") return false;
  return true;
}

/**
 * Checks whether a sale record is countable (not voided).
 * @param {object} s - Sale object.
 * @returns {boolean}
 */
function isCountableSale(s) {
  if (!s) return false;
  if (s.void) return false;
  return true;
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
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polygon points="18 4 19 6.5 21.5 6.5 19.5 8 20.3 10.5 18 9 15.7 10.5 16.5 8 14.5 6.5 17 6.5"></polygon></svg>`;
  }
  if (role === "admin") {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M4 18l2-10 5 5 5-5 2 10H4z"></path></svg>`;
  }
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
}

/* ==========================================================
   SIDEBAR TOGGLE & DRAWER NAVIGATION
   ========================================================== */

/**
 * Desktop sidebar state ("open" or "collapsed"), loaded from localStorage "moto1_sidebar".
 * Default is "open".
 */
let desktopSidebarState = "open";
try {
  const savedSidebar = localStorage.getItem("moto1_sidebar");
  if (savedSidebar === "collapsed") {
    desktopSidebarState = "collapsed";
    if (typeof window !== "undefined" && window.innerWidth >= 900 && document.body) {
      document.body.classList.add("sidebar--collapsed");
    }
  } else {
    desktopSidebarState = "open";
  }
} catch (e) {}

/** Mobile drawer visibility state. Not saved to localStorage. */
let mobileDrawerOpen = false;

/**
 * Updates the sidebar toggle button icon, title, and aria attributes
 * depending on screen size and current collapsed/drawer state.
 */
function updateSidebarToggleUI() {
  const toggleBtn = $("btn-sidebar-toggle");
  if (!toggleBtn) return;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 900;
  if (isMobile) {
    toggleBtn.title = "Close menu";
    toggleBtn.setAttribute("aria-label", "Close menu");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.innerHTML = ICONS.close;
  } else {
    const isCollapsed = desktopSidebarState === "collapsed";
    toggleBtn.title = isCollapsed ? "Expand sidebar" : "Collapse sidebar";
    toggleBtn.setAttribute("aria-label", isCollapsed ? "Expand sidebar" : "Collapse sidebar");
    toggleBtn.setAttribute("aria-expanded", isCollapsed ? "false" : "true");
    toggleBtn.innerHTML = isCollapsed ? ICONS.panelExpand : ICONS.panelCollapse;
  }
}

/**
 * Toggles desktop sidebar between expanded and collapsed icon rail.
 * Saves preference to localStorage under key "moto1_sidebar".
 */
function toggleSidebar() {
  if (desktopSidebarState === "collapsed") {
    desktopSidebarState = "open";
    if (document.body) document.body.classList.remove("sidebar--collapsed");
  } else {
    desktopSidebarState = "collapsed";
    if (document.body) document.body.classList.add("sidebar--collapsed");
  }

  try {
    localStorage.setItem("moto1_sidebar", desktopSidebarState);
  } catch (e) {}

  updateSidebarToggleUI();
  adjustSidebarPopupPosition();
}

/**
 * Opens mobile/tablet slide-in drawer and locks page scrolling.
 */
function openSidebarDrawer() {
  if (mobileDrawerOpen) return;
  mobileDrawerOpen = true;

  if (document.body) {
    document.body.classList.add("drawer-open", "resp-scroll-locked");
    document.body.style.overflow = "hidden";
  }

  const menuBtn = $("btn-mobile-menu");
  if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");

  updateSidebarToggleUI();

  const toggleBtn = $("btn-sidebar-toggle");
  if (toggleBtn) {
    setTimeout(() => toggleBtn.focus(), 50);
  }
}

/**
 * Closes mobile/tablet slide-in drawer, unlocks page scrolling, and returns focus to menu button.
 */
function closeSidebarDrawer() {
  closeAccountSwitcher();
  if (!mobileDrawerOpen) return;
  mobileDrawerOpen = false;

  if (document.body) {
    document.body.classList.remove("drawer-open", "resp-scroll-locked");
    document.body.style.overflow = "";
  }

  const menuBtn = $("btn-mobile-menu");
  if (menuBtn) {
    menuBtn.setAttribute("aria-expanded", "false");
    try { menuBtn.focus(); } catch (e) {}
  }

  updateSidebarToggleUI();
}

/**
 * Handles click on sidebar toggle button (closes drawer on mobile; toggles rail on desktop).
 */
function handleSidebarToggleClick() {
  if (typeof window !== "undefined" && window.innerWidth < 900) {
    closeSidebarDrawer();
  } else {
    toggleSidebar();
  }
}

/**
 * Traps Tab focus inside the mobile drawer while it is open.
 * @param {KeyboardEvent} e
 */
function trapDrawerFocus(e) {
  if (!mobileDrawerOpen || typeof window === "undefined" || window.innerWidth >= 900) return;
  if (e.key !== "Tab") return;

  const sidebar = $("sidebar");
  if (!sidebar) return;

  const focusable = sidebar.querySelectorAll(
    'button:not([disabled]):not([style*="display: none"]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable || !focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  } else {
    if (document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

/**
 * Handles window resize across the 900px breakpoint.
 * Never leaves mobile drawer open or backdrop stuck on desktop resize.
 */
let lastWindowWidth = typeof window !== "undefined" ? window.innerWidth : 1024;
function handleWindowResize() {
  if (typeof window === "undefined") return;
  const currentWidth = window.innerWidth;
  if (currentWidth >= 900) {
    // Desktop breakpoint
    if (mobileDrawerOpen) {
      closeSidebarDrawer();
    }
    if (desktopSidebarState === "collapsed" && document.body) {
      document.body.classList.add("sidebar--collapsed");
    } else if (document.body) {
      document.body.classList.remove("sidebar--collapsed");
    }
    updateSidebarToggleUI();
  } else {
    // Mobile / Tablet breakpoint (< 900px)
    if (document.body) {
      document.body.classList.remove("sidebar--collapsed");
    }
    updateSidebarToggleUI();
  }
  lastWindowWidth = currentWidth;
  adjustSidebarPopupPosition();
}
if (typeof window !== "undefined") {
  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawerOpen) {
      closeSidebarDrawer();
    }
  });
  window.addEventListener("mousedown", (e) => {
    if (brandDropdownOpen) {
      const wrap = e.target.closest("#insp-brand-wrap");
      if (!wrap) closeBrandDropdown();
    }
    if (modelDropdownOpen) {
      const wrap = e.target.closest("#insp-model-wrap");
      if (!wrap) closeModelDropdown();
    }
    if (dtcComboboxOpen) {
      const wrap = e.target.closest(".dtc-combobox-wrap");
      if (!wrap) closeDtcDropdown();
    }
  });

  // matchMedia change listener: safely handles crossing breakpoint
  if (window.matchMedia) {
    const mql = window.matchMedia("(max-width: 899.98px)");
    const handleBreakpointCross = (e) => {
      if (!e.matches && mobileDrawerOpen) {
        closeSidebarDrawer();
      }
    };
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleBreakpointCross);
    } else if (typeof mql.addListener === "function") {
      mql.addListener(handleBreakpointCross);
    }
  }
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
 * Smart sidebar account switcher popup positioner.
 * Positions popup with position: fixed relative to the viewport.
 * Automatically chooses downward or upward opening depending on available space,
 * caps natural height at 320px, handles collapsed rail right-side alignment,
 * and sets popup--up / popup--down classes and data-popup-dir on the button.
 */
function adjustSidebarPopupPosition() {
  const popup = $("sidebar-account-popup");
  const btn = $("btn-switch-account");
  if (!popup || popup.style.display === "none" || !btn) return;

  const winW = typeof window !== "undefined" ? window.innerWidth : 1024;
  const winH = typeof window !== "undefined" ? window.innerHeight : 800;

  // Measure natural scroll height capped at 320px
  popup.style.maxHeight = "320px";
  const naturalH = Math.min(320, popup.scrollHeight || 260);

  // Desktop collapsed rail mode (>= 900px)
  if (typeof window !== "undefined" && document.body && document.body.classList.contains("sidebar--collapsed") && winW >= 900) {
    const rect = btn.getBoundingClientRect();
    const sidebarEl = $("sidebar");
    const measuredW = sidebarEl && sidebarEl.getBoundingClientRect ? sidebarEl.getBoundingClientRect().width : 0;
    const railWidth = Math.max(72, rect.right || 0, measuredW);
    popup.style.position = "fixed";
    popup.style.left = Math.round(railWidth + 8) + "px";
    popup.style.width = "260px";
    popup.style.zIndex = "260";

    const maxH = Math.min(320, winH - 24);
    popup.style.maxHeight = maxH + "px";
    popup.style.overflowY = "auto";

    let topPos = Math.round(rect.top);
    if (topPos + naturalH > winH - 12) {
      topPos = Math.max(12, winH - 12 - naturalH);
    }
    if (topPos < 12) topPos = 12;
    popup.style.top = topPos + "px";
    popup.style.bottom = "auto";

    popup.classList.remove("popup--up");
    popup.classList.add("popup--down");
    btn.setAttribute("data-popup-dir", "down");
    return;
  }

  // Expanded sidebar or mobile drawer mode
  const rect = btn.getBoundingClientRect();
  popup.style.position = "fixed";
  popup.style.left = Math.round(rect.left) + "px";
  popup.style.width = Math.round(rect.width) + "px";
  popup.style.zIndex = "260";

  // Available vertical space
  const spaceBelow = Math.max(0, winH - rect.bottom - 12);
  const spaceAbove = Math.max(0, rect.top - 12);

  let dir = "down";
  let availH = naturalH;

  if (spaceBelow >= naturalH) {
    dir = "down";
    availH = naturalH;
  } else if (spaceAbove >= naturalH) {
    dir = "up";
    availH = naturalH;
  } else if (spaceBelow >= spaceAbove) {
    dir = "down";
    availH = spaceBelow;
  } else {
    dir = "up";
    availH = spaceAbove;
  }

  if (dir === "down") {
    popup.style.top = Math.round(rect.bottom + 6) + "px";
    popup.style.bottom = "auto";
    popup.style.maxHeight = Math.max(80, Math.round(availH)) + "px";
    popup.style.overflowY = "auto";
    popup.classList.remove("popup--up");
    popup.classList.add("popup--down");
    btn.setAttribute("data-popup-dir", "down");
  } else {
    popup.style.bottom = Math.round(winH - rect.top + 6) + "px";
    popup.style.top = "auto";
    popup.style.maxHeight = Math.max(80, Math.round(availH)) + "px";
    popup.style.overflowY = "auto";
    popup.classList.remove("popup--down");
    popup.classList.add("popup--up");
    btn.setAttribute("data-popup-dir", "up");
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", adjustSidebarPopupPosition, true);
  window.addEventListener("orientationchange", adjustSidebarPopupPosition);
}

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
  if (popup) {
    popup.style.display = "none";
    if (popup.classList && popup.classList.remove) {
      popup.classList.remove("popup--up");
      popup.classList.remove("popup--down");
    }
  }
  if (btn) {
    btn.setAttribute("aria-expanded", "false");
    if (typeof btn.removeAttribute === "function") {
      btn.removeAttribute("data-popup-dir");
    } else {
      delete btn["data-popup-dir"];
    }
  }
}

/**
 * Keyboard navigation handler for the Switch Account button and popup listbox.
 * ArrowUp/ArrowDown cycle through accounts, Enter selects, Escape closes and returns focus to button.
 * @param {KeyboardEvent} e - Keyboard event.
 */
function handleAccountSwitcherKeydown(e) {
  const popup = $("sidebar-account-popup");
  const btn = $("btn-switch-account");
  const isOpen = popup && popup.style.display !== "none";

  if (e.key === "Escape") {
    if (isOpen) {
      e.preventDefault();
      closeAccountSwitcher();
      if (btn) btn.focus();
    }
    return;
  }

  if (!isOpen) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleAccountSwitcher();
      const items = popup ? popup.querySelectorAll(".sidebar-acc-item") : [];
      if (items.length > 0) {
        const active = popup.querySelector('.sidebar-acc-item[aria-selected="true"]') || items[0];
        active.focus();
      }
    }
    return;
  }

  const items = Array.from(popup ? popup.querySelectorAll(".sidebar-acc-item") : []);
  if (!items.length) return;
  const currentIdx = items.indexOf(document.activeElement);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIdx = currentIdx < items.length - 1 ? currentIdx + 1 : 0;
    items[nextIdx].focus();
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    const prevIdx = currentIdx > 0 ? currentIdx - 1 : items.length - 1;
    items[prevIdx].focus();
  } else if (e.key === "Home") {
    e.preventDefault();
    items[0].focus();
  } else if (e.key === "End") {
    e.preventDefault();
    items[items.length - 1].focus();
  } else if (e.key === "Enter" || e.key === " ") {
    if (currentIdx >= 0) {
      e.preventDefault();
      items[currentIdx].click();
    }
  } else if (e.key === "Tab") {
    closeAccountSwitcher();
  }
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
    .map((u, idx) => {
      const isCurrent = u.id === currentId;
      return `
        <div
          id="acc-opt-${idx}"
          class="sidebar-acc-item"
          role="option"
          aria-selected="${isCurrent ? "true" : "false"}"
          tabindex="0"
          onclick="switchAccount('${u.id}')"
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
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
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

  const prevUser = getCurrentUser();

  target.lastLogin = nowLocalTimestamp();
  saveUsers(users);

  const allowed = getRoleNav(target.role);
  const targetView = allowed.includes(view) ? view : (allowed.includes("dash") ? "dash" : (allowed[0] || ""));

  saveSession({
    userId: target.id,
    role: target.role,
    view: targetView,
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
  const allowed = getRoleNav(newRole);
  if (!allowed.includes(s.view)) {
    s.view = allowed.includes("dash") ? "dash" : (allowed[0] || "");
  }
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
    html += `<div class="login-dd-empty">No saved account matches. Press Sign In to try this email.</div>`;
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
 * Opens Dashboard (or first allowed page) directly.
 * @param {string} userId - User ID to sign in.
 */
function selectLoginUser(userId) {
  const users = loadUsers();
  const matched = users.find((u) => u.id === userId);
  if (!matched || matched.active === false) return;

  const errEl = $("login-err");
  if (errEl) {
    errEl.textContent = "";
    errEl.style.display = "none";
  }

  closeLoginDropdown();

  matched.lastLogin = nowLocalTimestamp();
  saveUsers(users);

  const allowed = getRoleNav(matched.role);
  const targetPage = allowed.includes("dash") ? "dash" : (allowed[0] || "");

  saveSession({
    userId: matched.id,
    role: matched.role,
    view: targetPage,
    at: Date.now()
  });

  logAudit("Login", matched.email, matched.role, "Sessions");

  if (document.documentElement) document.documentElement.classList.add("has-session");
  document.body.classList.remove("logged-out");
  document.body.classList.add("logged-in");

  renderSidebarUser();
  renderNav();

  if (targetPage) {
    go(targetPage);
  } else {
    view = "";
    $("main").innerHTML = renderNoAccess();
  }
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

  const allowed = getRoleNav(matched.role);
  const targetPage = allowed.includes("dash") ? "dash" : (allowed[0] || "");

  saveSession({
    userId: matched.id,
    role: matched.role,
    view: targetPage,
    at: Date.now()
  });

  logAudit("Login", matched.email, matched.role, "Sessions");

  if (document.documentElement) document.documentElement.classList.add("has-session");
  document.body.classList.remove("logged-out");
  document.body.classList.add("logged-in");

  renderSidebarUser();
  renderNav();

  if (targetPage) {
    go(targetPage);
  } else {
    view = "";
    $("main").innerHTML = renderNoAccess();
  }
}

/**
 * Logs out the current user, clears the active session, clears hash, and shows the login screen.
 */
function logout() {
  const u = getCurrentUser();
  if (u) {
    logAudit("Logout", u.email, u.activeRole || u.role, "Sessions");
  }
  clearSession();
  view = "dash";

  // Clear URL hash
  if (typeof window !== "undefined" && window.location && window.location.hash) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", (window.location.pathname || "") + (window.location.search || ""));
    } else {
      window.location.hash = "";
    }
  }

  hisSearch = "";
  hisDate = "all";
  hisMech = "all";
  hisFrom = "";
  hisTo = "";
  repSearch = "";
  repFilter = "all";
  if (typeof resetInspDraft === "function") {
    resetInspDraft();
  }
  if (typeof resetPosState === "function") {
    resetPosState();
  }
  if (typeof resetQuickLaborState === "function") {
    resetQuickLaborState();
  }

  if (document.documentElement) document.documentElement.classList.remove("has-session");
  document.body.classList.remove("logged-in");
  document.body.classList.add("logged-out");

  if (mobileDrawerOpen) {
    closeSidebarDrawer();
  }

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
  return `<div class="card no-access-card"><div style="display:flex;justify-content:center;margin-bottom:12px;color:var(--text-muted)">${ICONS.lock24}</div><h1 style="margin:0 0 8px;font-size:22px;font-weight:800;color:var(--text)">Welcome, ${name}</h1><p style="margin:0;font-size:14px;color:var(--text-muted);line-height:1.5">Your ${roleLabel} workspace isn't set up yet. Navigation for this role will be added soon.</p></div>`;
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
      if (view === "qlabor" && (allowed.includes("pos") || allowed.includes("ql"))) {
        go("pos");
      } else if (allowed.includes("dash")) {
        go("dash");
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
  const popup = $("sidebar-account-popup");
  if (
    popup &&
    popup.style.display !== "none" &&
    !popup.contains(e.target) &&
    (!switcher || !switcher.contains(e.target))
  ) {
    closeAccountSwitcher();
  }

  // Close item suggestion dropdowns when clicking outside
  if (!e.target.closest || !e.target.closest(".item-input-group.name-group")) {
    document.querySelectorAll(".item-suggestions-dropdown").forEach((el) => {
      el.style.display = "none";
    });
  }
});

// Global keydown listener for focus trap, Escape, and Ctrl+B / Cmd+B sidebar toggle
document.addEventListener("keydown", (e) => {
  trapDrawerFocus(e);

  if (e.key === "Escape") {
    if (mobileDrawerOpen) {
      closeSidebarDrawer();
      e.preventDefault();
      return;
    }
    const popup = $("sidebar-account-popup");
    if (popup && popup.style.display !== "none") {
      closeAccountSwitcher();
      const btn = $("btn-switch-account");
      if (btn) btn.focus();
      e.preventDefault();
      return;
    }
  }

  // Ctrl+B (or Cmd+B) toggles sidebar on desktop (>= 900px), ignored while typing
  if ((e.ctrlKey || e.metaKey) && (e.key === "b" || e.key === "B")) {
    const el = document.activeElement;
    const tag = el ? (el.tagName || "").toLowerCase() : "";
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    if (el && el.isContentEditable) return;
    if (typeof window !== "undefined" && window.innerWidth >= 900 && document.body && document.body.classList.contains("logged-in")) {
      e.preventDefault();
      toggleSidebar();
    }
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

/**
 * Checks if a motorcycle is properly registered:
 * Must have a valid plate (not empty, not "NO PLATE"),
 * a known make (not empty, not "Unknown"),
 * a known model (not empty, not "Unknown"),
 * and a valid customer/owner (not archived, not "Walk-in Customer").
 * @param {Object} b - Motorcycle object.
 * @returns {boolean}
 */
function isRegisteredBike(b) {
  if (!b || b.archived) return false;
  const plate = (b.plate || "").trim().toUpperCase();
  if (!plate || plate === "NO PLATE") return false;
  const make = (b.make || "").trim();
  if (!make || make.toLowerCase() === "unknown") return false;
  const model = (b.model || "").trim();
  if (!model || model.toLowerCase() === "unknown") return false;
  const c = own(b);
  if (!c || c.archived) return false;
  const cname = (c.name || "").trim();
  if (!cname || cname.toLowerCase() === "walk-in customer") return false;
  return true;
}

/**
 * Returns all properly registered motorcycles with active owners.
 * Filters out unregistered, unplated ("NO PLATE"), unknown make/model, or walk-in records.
 * @returns {Array<Object>}
 */
function getRegisteredBikes() {
  return (Array.isArray(D.bk) ? D.bk : []).filter(isRegisteredBike);
}


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
  if ((o.type === "QUICK LABOR" || o.type === "quicklabor") && typeof o.total === "number") {
    return {
      labor: Number(o.laborSubtotal) || 0,
      parts: Number(o.partsSubtotal) || 0,
      discount: 0,
      total: Number(o.total) || 0
    };
  }
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
  if (s === "Cancelled") {
    return `<span class="badge-cancelled">CANCELLED</span>`;
  }
  const label = s === "Ready for Pickup" ? "READY FOR BILLING" : (s || "").toUpperCase();
  return `<span class="bd ${cls(s)}">${escHtml(label)}</span>`;
};

/**
 * Helper to compute the authoritative total for a work order.
 * If the job has item rows, returns labor subtotal + parts subtotal.
 * If it has no item rows, returns the recorded job total.
 * @param {Object} job - Work order object.
 * @returns {number} Numeric total in PHP.
 */
function jobTotalOf(job) {
  if (!job) return 0;
  const items = getContextItems(job.id, "items");
  const extra = getContextItems(job.id, "extra");
  const all = [...items, ...extra];
  if (all.length > 0) {
    let laborSub = 0;
    let partsSub = 0;
    all.forEach((it) => {
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
 * Returns array of service names for a work order.
 * @param {Object} o - Work order object.
 * @returns {Array<string>}
 */
function getJobServicesList(o) {
  if (!o) return [];
  if (Array.isArray(o.sv) && o.sv.length) {
    return o.sv.map((i) => (g("sv", i) ? g("sv", i).name : i)).filter(Boolean);
  }
  if (Array.isArray(o.items) && o.items.length) {
    const labor = o.items.filter((i) => i.kind === "labor").map((i) => i.name).filter(Boolean);
    if (labor.length) return labor;
    return o.items.map((i) => i.name).filter(Boolean);
  }
  if (Array.isArray(o.complaints) && o.complaints.length) {
    return o.complaints.filter(Boolean);
  }
  return [];
}

/**
 * Formats services list: first 2 service names separated by commas, then "+N more" if more.
 * @param {Object} o - Work order object.
 * @returns {{ display: string, title: string }}
 */
function formatJobServicesSummary(o) {
  const list = getJobServicesList(o);
  if (!list.length) {
    return { display: "-", title: "" };
  }
  const title = list.join(", ");
  if (list.length <= 2) {
    return { display: list.join(", "), title };
  }
  const rem = list.length - 2;
  return { display: `${list.slice(0, 2).join(", ")}, +${rem} more`, title };
}

/**
 * Renders an HTML table and responsive mobile cards for work orders.
 * Shows ONLY: PLATE NO., STATUS, MECHANIC, SERVICES, TOTAL, and Job card button.
 * @param {Array<Object>} L - Array of work order objects.
 * @param {boolean} [full] - Unused legacy flag kept for signature compatibility.
 * @returns {string} HTML string of table and mobile cards.
 */
function tbl(L, full) {
  if (!L.length) {
    return `<div class="empty">No active jobs. Create a work order to get started.</div>`;
  }

  // Desktop Table Rows
  const tableRows = L.map((o) => {
    const b = bike(o.bid);
    const svc = formatJobServicesSummary(o);
    const tot = jobTotalOf(o);

    return `<tr>
      <td class="ar-col-plate">
        <b>${b ? escHtml(b.plate) : "NO PLATE"}</b>
        ${b ? `<br><small style="color:var(--mu)">${escHtml(b.make + " " + b.model)}</small>` : ""}
      </td>
      <td class="ar-col-status">${badge(o.st)}</td>
      <td class="ar-col-mech">${escHtml((o.mech && o.mech !== "Unassigned") ? o.mech : "-")}</td>
      <td class="ar-col-services" title="${escHtml(svc.title)}">${escHtml(svc.display)}</td>
      <td class="r ar-col-total" id="ar-row-total-${o.id}">${P(tot)}</td>
      <td class="r ar-col-action">
        <button type="button" class="btn g sm ar-btn-jobcard" onclick="openInspModal('${o.id}')">Job card</button>
      </td>
    </tr>`;
  }).join("");

  // Mobile / Narrow Cards
  const cards = L.map((o) => {
    const b = bike(o.bid);
    const svc = formatJobServicesSummary(o);
    const tot = jobTotalOf(o);

    return `
      <div class="ar-card">
        <div class="ar-card-row ar-card-row-top">
          <div class="ar-card-plate">
            <b>${b ? escHtml(b.plate) : "NO PLATE"}</b>
            ${b ? `<small class="ar-card-sub">${escHtml(b.make + " " + b.model)}</small>` : ""}
          </div>
          <div class="ar-card-badge">${badge(o.st)}</div>
        </div>
        <div class="ar-card-row ar-card-row-meta">
          <span class="ar-card-mech">${escHtml((o.mech && o.mech !== "Unassigned") ? o.mech : "-")}</span>
          <b class="ar-card-total" id="ar-card-total-${o.id}">${P(tot)}</b>
        </div>
        <div class="ar-card-row ar-card-services" title="${escHtml(svc.title)}">
          ${escHtml(svc.display)}
        </div>
        <button type="button" class="btn g ar-card-btn" onclick="openInspModal('${o.id}')">
          Job card
        </button>
      </div>
    `;
  }).join("");

  return `
    <div class="tw ar-table-wrap">
      <table>
        <thead>
          <tr>
            <th>PLATE NO.</th>
            <th>STATUS</th>
            <th>MARKED BY</th>
            <th>SERVICES</th>
            <th class="r">TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    </div>
    <div class="ar-cards" id="ar-cards">
      ${cards}
    </div>
  `;
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
  ["qlabor", "🧰", "Quick Labor"],
  ["pos", "⚡", "Quick Sales"],
  ["ql", "🧰", "Quick Labor"],
  ["cat", "📦", "Service & Parts Catalog"],
  ["bill", "💳", "Transactions & Billing"],
  ["his", "🕘", "Service History"],
  ["reports", "📊", "Reports"],
  ["audit", "📋", "Audit"],
  ["users", "🛡️", "User Management"]
];

/** Route keys placed under the ADMINISTRATION & SUPPORT section. */
const ADMIN_NAV_KEYS = ["reports", "audit", "users"];

/** Currently active view key. */
let view = "dash";

/** Currently selected motorcycle ID if navigated from Customers view. */
let hisBike = null;

/** Active search query string for Active Repairs page. */
let repSearch = "";

/** Active status filter for Active Repairs page ("all" or status string). */
let repFilter = "all";

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
  return POS_TABS.filter((tab) => canOpen(tab.id));
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
 * Never renders when on the dedicated Quick Labor view (key "qlabor").
 * @param {string} activeId - The active POS screen ID ("pos", "ql", or "bill").
 */
function renderPosSwitcher(activeId) {
  const existing = $("pos-switcher");
  if (existing) {
    existing.remove();
  }
  const existingTitle = $("pos-title");
  if (existingTitle) {
    existingTitle.remove();
  }

  if (view === "qlabor") {
    return;
  }

  const tabs = getPosTabsForRole();
  const mainEl = $("main-content-area") || $("main");
  if (!mainEl) return;

  if (tabs.length < 2) {
    const tabDef = POS_TABS.find((t) => t.id === activeId);
    const titleText = tabDef
      ? tabDef.label
      : activeId === "pos"
      ? "Quick Sales"
      : activeId === "ql"
      ? "Quick Labor"
      : activeId === "bill"
      ? "Transactions & Billing"
      : "";
    if (titleText) {
      const titleEl = document.createElement("div");
      titleEl.id = "pos-title";
      titleEl.className = "card top pos-fallback-title";
      titleEl.innerHTML = `<div><h1>${escHtml(titleText)}</h1></div>`;
      mainEl.insertBefore(titleEl, mainEl.firstChild);
    }
    return;
  }

  const switcher = document.createElement("div");
  switcher.id = "pos-switcher";
  switcher.setAttribute("role", "tablist");
  switcher.setAttribute("aria-label", "POS Section Switcher");

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
          <span>${ICONS[t.icon] || ""}</span>
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
  go(v);
}

/**
 * Renders the primary and administration navigation lists based on permissions of the active role.
 * Shows each section label only when at least one of its routes is accessible.
 * Shows "Quick Labor" right after Active Repairs for roles with "qlabor" permission.
 * Shows "POS" for roles with "pos" permission. If both are granted, shows both items.
 */
function renderNav() {
  const isPosActive = ["pos", "ql", "bill"].includes(view);
  const showPos = canOpen("pos");

  // Primary navigation: includes dedicated Quick Labor and consolidated POS
  const primaryItems = [
    { id: "dash",   icon: "dash",    label: "Dashboard",                allowed: canOpen("dash") },
    { id: "cust",   icon: "cust",    label: "Customers & Motorcycles",  allowed: canOpen("cust") },
    { id: "insp",   icon: "insp",    label: "Motorcycle Inspection",    allowed: canOpen("insp") },
    { id: "rep",    icon: "rep",     label: "Active Repairs",           allowed: canOpen("rep") },
    { id: "qlabor", icon: "qlabor",  label: "Quick Labor",              allowed: canOpen("qlabor") },
    { id: "pos",    icon: "posMenu", label: "POS", isPos: true,         allowed: showPos },
    { id: "cat",    icon: "cat",     label: "Service & Parts Catalog",  allowed: canOpen("cat") },
    { id: "his",    icon: "his",     label: "Service History",          allowed: canOpen("his") }
  ].filter((it) => it.allowed);

  const adminAllowed = V.filter((x) => ADMIN_NAV_KEYS.includes(x[0]) && canOpen(x[0]));

  const navEl = $("nav");
  const navLabelEl = $("nav-label");
  const adminNavEl = $("admin-nav");
  const adminNavLabelEl = $("admin-nav-label");

  // 1. PRIMARY NAVIGATION section
  if (!primaryItems.length) {
    if (navLabelEl) navLabelEl.style.display = "none";
    if (navEl) {
      navEl.innerHTML = "";
      navEl.style.display = "none";
    }
  } else {
    if (navLabelEl) navLabelEl.style.display = "";
    if (navEl) {
      navEl.style.display = "";
      navEl.innerHTML = primaryItems
        .map((x) => {
          if (x.isPos) {
            return `<button class="nav-pos-item ${isPosActive ? "on" : ""}" data-route="pos" onclick="const t = resolvePosTab(); if (t) loadView(t);" title="${x.label}" aria-label="${x.label}"><span>${ICONS[x.icon]}</span><span class="nav-text">${x.label}</span></button>`;
          }
          return `<button class="nav-${x.id} ${x.id == view ? "on" : ""}" data-route="${x.id}" onclick="go('${x.id}')" title="${x.label}" aria-label="${x.label}"><span>${ICONS[x.icon] || ""}</span><span class="nav-text">${x.label}</span></button>`;
        })
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
            `<button class="nav-${x[0]} ${x[0] == view ? "on" : ""}" data-route="${x[0]}" onclick="go('${x[0]}')" title="${x[2]}" aria-label="${x[2]}"><span>${ICONS[x[0]] || x[1]}</span><span class="nav-text">${x[2]}</span></button>`
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
  closeAccountSwitcher();
  // Close mobile drawer on navigation
  if (mobileDrawerOpen) {
    closeSidebarDrawer();
  }
  if (!canOpen(v)) return;
  if (v === "audit") {
    const u = getCurrentUser();
    if (!u || u.activeRole === "mechanic" || !canOpen("audit") || (!isSuper() && u.activeRole !== "admin")) return;
  }
  if (view !== v || v === "bill") {
    userMgmtTab = "directory";
    userSearch = "";
    repSearch = "";
    repFilter = "all";
    billSearch = "";
    billFilter = "all";
    catFilter = "all";
    custSearch = "";
    if (v === "audit") {
      auditSearch = "";
      auditPeriod = "7days";
      auditCategory = "all";
      auditUser = "all";
      auditPageLimit = 50;
    }
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
  const mainArea = $("main");
  if (mainArea) mainArea.scrollTop = 0;
  if (typeof window !== "undefined") window.scrollTo(0, 0);
  if (v === "insp") {
    if (inspDraftStep === 2) {
      inspDiagView = "inspection";
      autoGrowTextarea($("insp-diag-findings"));
    } else if (inspDraftStep === 3) {
      inspConfirmView = "summary";
    }
  }
  if (v === "pos") {
    posView = "parts";
  }
  if (v === "cat") {
    catFilter = "all";
  }
  if (["pos", "ql", "bill"].includes(v)) {
    posLastTab = v;
    renderPosSwitcher(v);
  } else {
    const existingSwitcher = $("pos-switcher");
    if (existingSwitcher) {
      existingSwitcher.remove();
    }
    const existingTitle = $("pos-title");
    if (existingTitle) {
      existingTitle.remove();
    }
  }

  // Persist current view in session immediately
  const s = getSession();
  if (s) {
    s.view = v;
    s.at = Date.now();
    saveSession(s);
  }

  // Update URL hash as plain #name without breaking history
  if (typeof window !== "undefined" && window.location) {
    const curHash = (window.location.hash || "").replace(/^#/, "").trim();
    if (curHash !== v) {
      window.location.hash = v;
    }
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
  // Base set: all active (non-completed, non-cancelled) work orders, or cancelled jobs when filter is Cancelled
  const base = (Array.isArray(D.wo) ? D.wo : []).filter((o) => {
    if (filter === "Cancelled") {
      return o.st === "Cancelled" || Boolean(o.cancel);
    }
    return o.st !== "Completed" && o.st !== "Cancelled" && !o.cancel;
  });
  const q = repSearch.trim().toLowerCase().replace(/\s+/g, " ");

  return base.filter((o) => {
    // 1. Status matching
    if (filter !== "all" && filter !== "Cancelled" && o.st !== filter) {
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
 * Displays the Cancelled chip for Super Admin only.
 * @returns {string} HTML string of filter chip buttons.
 */
function getRepChipsHtml() {
  const chips = [...REP_CHIPS];
  if (isSuper()) {
    chips.push({ id: "cancelled", label: "Cancelled", status: "Cancelled", cls: "chip-cancelled" });
  }
  return chips.map((chip) => {
    const isSelected = repFilter === chip.status;
    const count = getFilteredRepairs(chip.status).length;
    return `<button type="button" class="chip ${chip.cls} ${
      isSelected ? "on" : ""
    }" onclick="setRepFilter('${chip.status}')">${chip.label} (${count})</button>`;
  }).join("");
}

/**
 * Clears search and status filters for Active Repairs.
 */
function clearRepFilters() {
  repSearch = "";
  repFilter = "all";
  const inp = $("rep-search-input");
  if (inp) inp.value = "";
  const clr = $("rep-search-clear");
  if (clr) clr.classList.remove("visible");
  const chipsEl = $("rep-chips");
  if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();
  const resEl = $("rep-results");
  if (resEl) resEl.innerHTML = getRepResultsHtml();
}

/**
 * Renders a single active repair work order as a square card in the responsive grid.
 * Displays plate number, make/model, status badge, mechanic, services, total, and job card button.
 * Uses safe fallbacks for missing fields to support older saved records.
 * @param {Object} o - Work order object.
 * @returns {string} HTML card string.
 */
function renderRepCard(o) {
  if (!o) return "";
  const b = o.bid ? bike(o.bid) : null;
  const plate = b && b.plate ? escHtml(b.plate) : "NO PLATE";
  const makeModel = b ? `${b.make || ""} ${b.model || ""}`.trim() : "";
  const svcList = getJobServicesList(o);
  const fullServices = svcList.length ? svcList.join(", ") : "-";
  const rawTot = jobTotalOf(o);
  const totVal = (typeof rawTot === "number" && !isNaN(rawTot)) ? rawTot : (Number(rawTot) || 0);
  const totFormatted = P(totVal);
  const mechName = (o.mech && o.mech !== "Unassigned") ? escHtml(o.mech) : "-";

  return `
    <div class="rep-card" id="rep-card-${o.id}">
      <div class="rep-card-header">
        <div class="rep-card-plate-wrap">
          <b class="rep-card-plate">${plate}</b>
          ${makeModel ? `<div class="rep-card-sub">${escHtml(makeModel)}</div>` : ""}
        </div>
        <div class="rep-card-badge">${badge(o.st)}</div>
      </div>
      <div class="rep-card-divider"></div>
      <div class="rep-card-body">
        <div class="rep-card-row">
          <span class="rep-card-label">MARKED BY</span>
          <span class="rep-card-val">${mechName}</span>
        </div>
        <div class="rep-card-row">
          <span class="rep-card-label">SERVICES</span>
          <span class="rep-card-val rep-card-services" title="${escHtml(fullServices)}">${escHtml(fullServices)}</span>
        </div>
        <div class="rep-card-row">
          <span class="rep-card-label">TOTAL</span>
          <b class="rep-card-val rep-card-total" id="ar-card-total-${o.id}">${totFormatted}</b>
        </div>
      </div>
      <button
        type="button"
        class="btn g rep-card-btn"
        onclick="openInspModal('${o.id}')"
        aria-label="Open job card for ${plate}"
      >
        Job card
      </button>
    </div>
  `;
}

/**
 * Builds HTML for the repair results grid or friendly empty state.
 * @returns {string} HTML string.
 */
function getRepResultsHtml() {
  const list = getFilteredRepairs();
  if (!list.length) {
    const hasFilter = Boolean(repSearch || repFilter !== "all");
    const title = hasFilter ? "No repair jobs found." : "No active repairs found.";
    const sub = hasFilter ? "Try a different plate number, name, or status." : "Create a work order to get started.";
    return `
      <div class="empty rep-empty">
        <div style="font-weight:700;font-size:15px;color:var(--text-primary);margin-bottom:4px">${title}</div>
        <div style="margin-bottom:${hasFilter ? '12px' : '0'};color:var(--text-muted)">${sub}</div>
        ${hasFilter ? `<button type="button" class="btn g sm" onclick="clearRepFilters()">Clear filters</button>` : ""}
      </div>
    `;
  }
  return list.map((o) => renderRepCard(o)).join("");
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
          <th>MARKED BY</th>
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

          const isRev = Boolean(o.reversed);
          return `<tr>
            <td>
              <div style="font-weight:700;color:var(--text-primary)">${formatJobDate(dateVal)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${formatJobTime(dateVal)}</div>
              ${isRev ? `<div style="margin-top:4px"><span class="badge-reversed">REVERSED</span></div>` : ""}
            </td>
            <td>
              <button type="button" class="his-plate-btn" onclick="filterByPlate('${b.plate}')" title="Filter by plate ${b.plate}">
                <span>${b.plate}</span> <span class="his-plate-icon" style="display:inline-flex;align-items:center">${LINE_ICONS.his}</span>
              </button>
              <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">${b.make} ${b.model}</div>
              <div style="font-weight:600;font-size:13px;color:var(--text-primary);margin-top:2px">${c ? c.name : "—"}</div>
            </td>
            <td>
              <span style="font-weight:600;color:var(--text-primary)">${(o.mech && o.mech !== "Unassigned") ? escHtml(o.mech) : "-"}</span>
            </td>
            <td>
              <div style="font-weight:700;color:var(--text-primary)" title="${svcNames.replace(/"/g, '&quot;')}">${truncSvcNames}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(displayNote)}</div>
            </td>
            <td class="r" style="font-weight:700;color:var(--text-primary);font-size:14px">
              ${isRev ? `<span class="text-struck">${P(total(o))}</span>` : P(total(o))}
            </td>
            <td class="r" style="white-space:nowrap">
              <button type="button" class="btn-rec" onclick="openRecord('${o.id}')">View Full Record</button>
              ${isSuper() ? (isRev ? `
                <button type="button" class="btn g sm" style="margin-left:6px" onclick="reopenJob('${o.id}')">Reopen Job</button>
              ` : `
                <button type="button" class="btn sm btn-destructive" style="margin-left:6px" onclick="askReverseJob('${o.id}')">Void / Reverse</button>
              `) : ""}
            </td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>
  </div>`;
}

/**
 * Renders the dedicated Mechanic Dashboard view.
 * Features greeting, 3 mechanic KPI cards (Active Repairs, Awaiting Parts, Done Today), and Open Jobs table.
 * Excludes revenue, pending settlement, and links to inaccessible pages.
 * @returns {string} HTML string.
 */
function dashMechanic() {
  const u = getCurrentUser();
  const mechName = u ? (u.name || "").trim() : "";
  const isMyJob = (o) => {
    return Boolean(o.mech && o.mech.trim().toLowerCase() === mechName.toLowerCase());
  };

  // 1. ACTIVE REPAIRS: all open jobs, not Completed, Cancelled, or Ready for Pickup
  const openJobs = D.wo.filter((o) => o.st !== "Completed" && o.st !== "Cancelled" && !o.cancel && o.st !== "Ready for Pickup");

  // 2. AWAITING PARTS: all jobs with status "Awaiting Parts/Approval"
  const awaitingPartsJobs = D.wo.filter((o) => o.st === "Awaiting Parts/Approval" && !o.cancel);

  // 3. DONE TODAY: jobs where this mechanic's name is wo.mech and wo.doneAt or status change to Ready for Pickup or Completed is today
  const todayStr = today();
  const doneTodayJobs = D.wo.filter((o) => {
    if (!isMyJob(o)) return false;
    const isReadyOrDone = o.st === "Ready for Pickup" || o.st === "Completed";
    if (!isReadyOrDone) return false;
    const dateMatch = (o.doneAt && o.doneAt.slice(0, 10) === todayStr) ||
                      (o.readyAt && o.readyAt.slice(0, 10) === todayStr) ||
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

  const renderComplaintChips = (o) => {
    const list = Array.isArray(o.complaints) ? o.complaints.filter(Boolean) : [];
    if (!list.length) return "—";
    return list.slice(0, 2).map((c) =>
      `<span class="badge" style="background:var(--bg-subtle);color:var(--text-muted);font-size:11px;padding:2px 8px;border-radius:12px;margin-right:4px;display:inline-block;border:1px solid var(--border)">${escHtml(c)}</span>`
    ).join("");
  };

  const renderRow = (o) => {
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
          <button type="button" class="btn g sm" onclick="openInspModal('${o.id}')">Job card</button>
        </td>
      </tr>
    `;
  };

  return `
    <div class="card top">
      <div>
        <h1>Welcome back, ${escHtml(mechName || "Mechanic")}</h1>
        <p>Mechanic | ${d}</p>
      </div>
      <span class="pill">● Saved on this device</span>
    </div>

    <div class="stats">
      ${stat(LINE_ICONS.rep, "", "ACTIVE REPAIRS", openJobs.length, "All open repair jobs")}
      ${stat(LINE_ICONS.cat, "", "AWAITING PARTS", awaitingPartsJobs.length, "Waiting for parts or approval")}
      ${stat(ICONS.checkCircle, "", "DONE TODAY", doneTodayJobs.length, "Finished by you")}
    </div>

    <div style="display:flex;flex-direction:column;gap:20px">
      <!-- Open Jobs Card -->
      <div class="card">
        <div class="hd" style="display:flex;justify-content:space-between;align-items:center">
          <span style="display:inline-flex;align-items:center;gap:6px">${LINE_ICONS.rep} Open Jobs</span>
          <button type="button" class="btn g sm" onclick="go('rep')">View all</button>
        </div>
        ${openJobs.length ? `
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
                ${openJobs.map(renderRow).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No open repair jobs.</div>
        `}
      </div>
    </div>
  `;
}

/** State for Customers & Motorcycles view */
let custSearch = "";
const expandedCustIds = new Set();

function getCustomerBikes(cid) {
  return (Array.isArray(D.bk) ? D.bk : []).filter((b) => b.cid === cid && !b.archived);
}

function getCustomerJoinedDisplay(c) {
  if (c.joinedAt) {
    return `Joined: ${formatJobDate(c.joinedAt)}`;
  }
  const bikes = getCustomerBikes(c.id);
  const bikeIds = new Set(bikes.map((b) => b.id));
  const wos = (Array.isArray(D.wo) ? D.wo : []).filter((o) => (o.cid === c.id || bikeIds.has(o.bid)) && (o.at || o.date || o.created));
  if (wos.length > 0) {
    let earliest = null;
    for (const o of wos) {
      const dStr = (o.at || o.date || o.created || "").slice(0, 10);
      if (dStr && (!earliest || dStr < earliest)) {
        earliest = dStr;
      }
    }
    if (earliest) return `Joined: ${formatJobDate(earliest)}`;
  }
  return `Joined: ${formatJobDate(today())}`;
}

function customerMatchesSearch(c, q) {
  if (!q) return true;
  if ((c.name || "").toLowerCase().includes(q)) return true;
  if ((c.phone || "").toLowerCase().includes(q)) return true;
  const bikes = getCustomerBikes(c.id);
  for (const b of bikes) {
    if ((b.plate || "").toLowerCase().includes(q)) return true;
    if ((b.make || "").toLowerCase().includes(q)) return true;
    if ((b.model || "").toLowerCase().includes(q)) return true;
    if ((b.engine || "").toLowerCase().includes(q)) return true;
  }
  return false;
}

function onCustSearchInput(val) {
  custSearch = val;
  const clearBtn = $("cust-search-clear");
  if (clearBtn) {
    if (val) clearBtn.classList.add("visible");
    else clearBtn.classList.remove("visible");
  }
  const trimmed = val.trim().toLowerCase();
  if (trimmed) {
    const activeCustomers = (Array.isArray(D.cu) ? D.cu : []).filter((c) => !c.archived);
    for (const c of activeCustomers) {
      if (customerMatchesSearch(c, trimmed)) {
        expandedCustIds.add(c.id);
      }
    }
  }
  const wrap = $("cust-table-wrap");
  if (wrap) {
    wrap.innerHTML = renderCustTableHtml();
  }
}

function clearCustSearch() {
  custSearch = "";
  const inp = $("cust-search-input");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clearBtn = $("cust-search-clear");
  if (clearBtn) clearBtn.classList.remove("visible");
  const wrap = $("cust-table-wrap");
  if (wrap) {
    wrap.innerHTML = renderCustTableHtml();
  }
}

function toggleCustExpand(cid) {
  if (expandedCustIds.has(cid)) {
    expandedCustIds.delete(cid);
  } else {
    expandedCustIds.add(cid);
  }
  const wrap = $("cust-table-wrap");
  if (wrap) {
    wrap.innerHTML = renderCustTableHtml();
  }
}

function renderCustTableHtml() {
  const activeCustomers = (Array.isArray(D.cu) ? D.cu : []).filter((c) => !c.archived);
  activeCustomers.sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  const q = custSearch.trim().toLowerCase();

  const filtered = activeCustomers.filter((c) => {
    if (q && !customerMatchesSearch(c, q)) return false;
    return true;
  });

  return `
    <div class="card tw cust-table-card">
      <table>
        <thead>
          <tr>
            <th style="width:40px;text-align:center"></th>
            <th>CUSTOMER DETAILS</th>
            <th>REGISTERED VEHICLES</th>
            <th>CONTACT</th>
            <th class="r">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${!filtered.length ? `
            <tr>
              <td colspan="5" style="text-align:center;padding:48px 16px;color:var(--text-muted)">
                <div style="font-size:15px;font-weight:600;color:var(--text);margin-bottom:4px">No customers found.</div>
                <div style="font-size:13px">Try a different search.</div>
              </td>
            </tr>
          ` : filtered.map((c) => {
            const isExpanded = expandedCustIds.has(c.id);
            const bikes = getCustomerBikes(c.id);
            const joinedDisplay = getCustomerJoinedDisplay(c);

            return `
              <tr style="cursor:pointer" onclick="if(event.target.closest('button'))return;toggleCustExpand('${c.id}')">
                <td style="text-align:center">
                  <button
                    type="button"
                    class="cust-chevron-btn"
                    onclick="event.stopPropagation();toggleCustExpand('${c.id}')"
                    aria-expanded="${isExpanded ? "true" : "false"}"
                    title="${isExpanded ? "Collapse" : "Expand"}"
                  >
                    <svg class="cust-chevron ${isExpanded ? "expanded" : ""}" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </td>
                <td>
                  <div style="font-weight:700;color:var(--text)">${escHtml(c.name)}</div>
                  <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(joinedDisplay)}</div>
                </td>
                <td>
                  <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                    <span class="cust-pill-count">${bikes.length === 0 ? "No vehicles" : (bikes.length === 1 ? "1 Vehicle" : `${bikes.length} Vehicles`)}</span>
                  </div>
                </td>
                <td>
                  <span class="cust-mono">${escHtml(c.phone || "—")}</span>
                </td>
                <td class="r" style="white-space:nowrap">
                  <button type="button" class="btn g sm" onclick="event.stopPropagation();openEditCustomerModal('${c.id}')">Edit Profile</button>
                </td>
              </tr>
              ${isExpanded ? `
                <tr class="cust-sub-row">
                  <td colspan="5" style="padding:0">
                    <div class="cust-sub-panel">
                      ${!bikes.length ? `
                        <div class="cust-sub-empty">
                          <span>No vehicles registered for this customer yet.</span>
                          <button type="button" class="btn sm" onclick="openRegisterVehicleModal('${c.id}')">+ Register Vehicle</button>
                        </div>
                      ` : bikes.map((b) => {
                        return `
                          <div class="cust-bike-item">
                            <div style="display:flex;align-items:center;min-width:0">
                              <div class="cust-bike-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                                  <circle cx="5.5" cy="17.5" r="3.5"></circle>
                                  <circle cx="18.5" cy="17.5" r="3.5"></circle>
                                  <path d="M15 6h-3l-3 6.5h6l2-3.5h3"></path>
                                  <path d="M9 12.5l-3.5 5"></path>
                                  <path d="M18.5 14v3.5"></path>
                                </svg>
                              </div>
                              <div style="min-width:0">
                                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                                  <b style="color:var(--text)">${escHtml(b.make + " " + b.model)}${b.year ? ` (${b.year})` : ""}</b>
                                </div>
                                <div class="cust-mono" style="font-size:12px;color:var(--text-muted);margin-top:2px">
                                  Plate: ${escHtml(b.plate)}${b.engine ? ` | Engine/Chassis: ${escHtml(b.engine)}` : ""}
                                </div>
                              </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;margin-left:16px;flex:none">
                              <button type="button" class="btn g sm" onclick="hisBike='${b.id}';go('his')" title="View service history">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>View History
                              </button>
                              <button type="button" class="btn g sm" onclick="openEditBikeModal('${b.id}')">Edit</button>
                              <button type="button" class="btn sm cust-btn-new-wo" onclick="startNewInspectionWorkOrder('${b.id}')">New work order</button>
                            </div>
                          </div>
                        `;
                      }).join("")}
                    </div>
                  </td>
                </tr>
              ` : ""}
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
  `;
}

/**
 * View renderers registry containing HTML generator functions for each screen.
 */
const R = {
  /**
   * Dashboard view: shows KPI summary cards and priority repair queue.
   * @returns {string} HTML string.
   */
  dash() {
    const u = getCurrentUser();
    if (u && u.activeRole === "mechanic") {
      return dashMechanic();
    }

    const countableWos = (Array.isArray(D.wo) ? D.wo : []).filter(isCountableJob);
    // Active jobs: work orders not yet completed or ready for pickup
    const act = countableWos.filter((o) => o.st != "Completed" && o.st != "Ready for Pickup");
    // Ready jobs: work orders awaiting customer settlement and vehicle pickup
    const rdy = countableWos.filter((o) => o.st == "Ready for Pickup");
    // Services finished today: work orders with done date matching today
    const dn = countableWos.filter((o) => (o.done || "").slice(0, 10) == today());

    const d = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });

    const stat = (i, bg, l, n, t) =>
      `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${n}</b>${t}</div></div>`;

    const roleLabel = u ? (ROLES[u.activeRole]?.label || u.activeRole) : "Admin";

    return `<div class="card top"><div><h1>Welcome back</h1><p>${roleLabel} | ${d}</p></div><span class="pill">● Saved on this device</span></div>
 <div class="stats">${stat(LINE_ICONS.rep, "", "ACTIVE REPAIRS", act.length, "In progress")}${stat(ICONS.money, "", "PENDING PAYMENTS", rdy.length, "Ready for pickup")}${stat(ICONS.checkCircle, "", "TODAY’S SERVICES", dn.length, "Jobs finished")}</div>
 <div class="card"><div class="hd" style="display:flex;align-items:center;gap:8px"><span>${LINE_ICONS.rep}</span><span>Priority Repair Queue</span><button class="btn g sm" onclick="go('rep')" style="margin-left:auto">View all</button></div>${tbl(countableWos.filter((o) => o.st != "Completed"))}</div>`;
  },

  /**
   * Customers & Motorcycles view: lists customers with expandable registered motorcycles and quick actions.
   * @returns {string} HTML string.
   */
  cust() {
    return `
      <div class="cust-header">
        <h1 class="cust-title">Customers &amp; Motorcycles</h1>
        <p class="cust-subtitle">Manage customer profiles and registered motorcycles</p>
      </div>

      <div class="cust-toolbar">
        <div class="cust-search-wrap">
          <span class="cust-search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            id="cust-search-input"
            type="text"
            class="cust-search-input"
            placeholder="Search customers or plates..."
            value="${escHtml(custSearch)}"
            oninput="onCustSearchInput(this.value)"
          />
          <button
            type="button"
            id="cust-search-clear"
            class="cust-search-clear ${custSearch ? "visible" : ""}"
            onclick="clearCustSearch()"
            title="Clear search"
            aria-label="Clear search"
          >✕</button>
        </div>

        <div class="cust-toolbar-actions">
          <button type="button" class="btn" onclick="openNewCustomerModal()">+ New Customer</button>
          <button type="button" class="btn g" onclick="openRegisterVehicleModal()">+ Register Vehicle</button>
        </div>
      </div>

      <div id="cust-table-wrap">
        ${renderCustTableHtml()}
      </div>
    `;
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
    return `<div class="card top"><div><h1>Active Repairs</h1><p>Move each job through the work order lifecycle</p></div><button class="btn" onclick="startNewInspectionWorkOrder()">+ New work order</button></div>
<div class="rep-search-wrap">
  <span class="search-icon" onclick="$('rep-search-input').focus()" title="Search">${LINE_ICONS.insp}</span>
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
<div id="rep-results" class="rep-grid">${getRepResultsHtml()}</div>`;
  },

  /**
   * Quick Sales view: fast checkout for labor and parts catalog items.
   * @returns {string} HTML string.
   */
  pos() {
    return getPosViewHtml();
  },

  /**
   * Quick Labor view: fast-track logging and checkout for walk-in minor repairs and part replacements.
   * Preserves cart state across tab navigation.
   * @returns {string} HTML string.
   */
  ql() {
    return getQuickLaborViewHtml();
  },

  /**
   * Dedicated Quick Labor view for the Mechanic role.
   * Renders the existing Quick Labor tab content with the 3-tab POS switcher hidden.
   * Reuses the exact same getQuickLaborViewHtml() without code duplication.
   * @returns {string} HTML string.
   */
  qlabor() {
    return getQuickLaborViewHtml();
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
        <div style="display:flex;align-items:center;gap:8px">
          ${isSuper() ? `<button type="button" class="btn g" onclick="openCatCsvModal()">Import CSV</button>` : ""}
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
        <div id="cat-chips" class="cat-chips" role="group" aria-label="Filter by category">
          ${getCatChipsHtml()}
        </div>
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
    billFilter = "all";
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
      <span class="search-icon" onclick="$('his-search-input').focus()" title="Search">${LINE_ICONS.insp}</span>
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
        <option value="all" ${hisMech === "all" ? "selected" : ""}>All Staff</option>
        ${getUniqueMechanics().map((m) => `<option value="${m}" ${hisMech === m ? "selected" : ""}>${m}</option>`).join("")}
      </select>
      <button type="button" class="btn g his-btn-export" onclick="exportHisCsv()" title="Export filtered list to CSV">
        <span style="display:inline-flex;align-items:center">${ICONS.download}</span> Export List
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
   * Reports view: shop performance, sales, and job reports.
   * Accessible to Admin and Super Admin roles.
   * @returns {string} HTML string.
   */
  reports() {
    return getReportsViewHtml();
  },

  /**
   * Audit view: activity log and trail.
   * Accessible to Admin (operational activity only) and Super Admin (full log).
   * Refused to Mechanic role.
   * @returns {string} HTML string.
   */
  audit() {
    return getAuditViewHtml();
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
    "Status",
    "Completion Date",
    "Completion Time",
    "Plate Number",
    "Motorcycle",
    "Customer Name",
    "Customer Phone",
    "Marked By",
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
    const mech = (o.mech && o.mech !== "Unassigned") ? o.mech : "-";
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
      escapeCsv(o.reversed ? "Reversed" : "Completed"),
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

  const activeSum = list.reduce((sum, o) => o.reversed ? sum : sum + total(o), 0);
  const totalRow = [
    escapeCsv("TOTAL (active)"),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    escapeCsv(""),
    activeSum
  ].join(",");

  const csvContent = "\uFEFF" + [headers.join(","), ...rows, totalRow].join("\r\n");
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
    </div>

    <div class="rec-section-title">
      <span>This Job (#${o.id})</span>
      ${o.reversed ? `<span class="badge-reversed">REVERSED</span>` : `<span class="bd completed">COMPLETED</span>`}
    </div>

    ${o.reversed ? `
      <div style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:13px;color:#991B1B">
        <b>TRANSACTION REVERSED:</b> ${escHtml(o.reversed.reason || "Reversed")}
        <div style="font-size:11px;color:#7F1D1D;margin-top:2px">${escHtml(o.reversed.at)} · by ${escHtml(o.reversed.by || "Super Admin")}</div>
      </div>
    ` : ""}

    <div class="rec-job-meta">
      <div>
        <div class="rec-field-label">Completed On</div>
        <div class="rec-field-val">${formatJobDate(dateVal)}</div>
        <div style="font-size:11px;color:var(--text-muted)">${formatJobTime(dateVal)}</div>
      </div>
      <div>
        <div class="rec-field-label">Marked by</div>
        <div class="rec-field-val">${(o.mech && o.mech !== "Unassigned") ? escHtml(o.mech) : "-"}</div>
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
          <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
            ${recObdCodes.map((c) => getObdCodeSummaryDisplayHtml(c)).join("")}
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
      <span>${o.reversed ? `<span class="text-struck">${P(total(o))}</span>` : P(total(o))}</span>
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
                ${w.reversed ? `<span class="badge-reversed" style="margin-left:4px">REVERSED</span>` : ""}
              </div>
              <div class="rec-tl-tot">${w.reversed ? `<span class="text-struck">${P(total(w))}</span>` : P(total(w))}</div>
            </div>
            <div class="rec-tl-body">
              <div><b>Services:</b> ${wSvcs || "—"}</div>
              <div><b>Marked by:</b> ${(w.mech && w.mech !== "Unassigned") ? escHtml(w.mech) : "-"}</div>
              ${w.note ? `<div><b>Notes:</b> ${w.note}</div>` : ""}
            </div>
          </div>
        `;
      }).join("")}
    </div>

    <div class="rec-footer" style="display:flex;justify-content:flex-end;gap:8px;flex-wrap:wrap">
      ${isSuper() ? (o.reversed ? `
        <button type="button" class="btn g" onclick="closeRecord(); reopenJob('${o.id}')">Reopen Job</button>
      ` : `
        <button type="button" class="btn btn-destructive" onclick="closeRecord(); askReverseJob('${o.id}')">Void / Reverse</button>
      `) : ""}
      <button type="button" class="btn g" onclick="window.print()"><span style="display:inline-flex;align-items:center;margin-right:6px">${ICONS.print}</span>Print Record</button>
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
 * Prompts for required reason before reversing a completed work order (Super Admin only).
 * Sets wo.reversed and logs audit entry.
 * @param {string} woId - Work order ID.
 */
function askReverseJob(woId) {
  if (!isSuper()) return;
  const o = g("wo", woId);
  if (!o) return;
  askReason(`Void / Reverse Job #${o.id}`, "Reverse Transaction", (reason) => {
    const u = getCurrentUser();
    o.reversed = {
      reason,
      at: nowLocalTimestamp(),
      by: u ? u.name : "Super Admin"
    };
    save();
    if (view === "his") renderHisResults();
    else go(view);
  }, { description: `Reversing this completed transaction removes its revenue from reports and dashboard while preserving the audit record.` });
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
[
  ["ov", cm],
  ["rec-ov", closeRecord],
  ["insp-ov", closeInspModal],
  ["rcpt-ov", closeReceipt],
  ["adv-ov", closeAdvanceModal],
  ["settle-ov", closeSettleBalanceModal],
  ["pos-void-ov", closePosVoidModal]
].forEach(([id, fn]) => {
  const el = $(id);
  if (el) {
    el.onclick = (e) => {
      if (e.target.id === id) {
        fn();
      }
    };
  }
});

/**
 * Closes modal when user presses the Escape key.
 */
document.onkeydown = (e) => {
  if (e.key == "Escape") {
    if (mobileDrawerOpen) {
      closeSidebarDrawer();
      return;
    }
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
 * Opens the "New Customer" modal.
 */
let _newCustomerOnSaved = null;

/**
 * Opens the "New Customer" modal.
 * @param {(customer: object) => void} [onSaved] - Optional callback after successful save.
 */
function openNewCustomerModal(onSaved) {
  _newCustomerOnSaved = onSaved || null;
  M(`
    <div style="padding:10px 4px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h2 style="margin:0;font-size:18px;font-weight:700">New Customer</h2>
        <button type="button" class="search-clear visible" onclick="cm()" style="position:static" title="Close">✕</button>
      </div>
      <div style="margin-bottom:14px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Full Name *</label>
        <input id="new-c-name" placeholder="e.g. Juan dela Cruz" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box" />
        <div id="new-c-name-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Full name is required.</div>
      </div>
      <div style="margin-bottom:20px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Phone Number</label>
        <input id="new-c-phone" placeholder="e.g. 0917-123-4567" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box;font-family:ui-monospace,monospace" />
      </div>
      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button type="button" class="btn g" onclick="cm()">Cancel</button>
        <button type="button" class="btn" onclick="saveNewCustomer()">Save Customer</button>
      </div>
    </div>
  `);
  setTimeout(() => {
    const el = $("new-c-name");
    if (el) el.focus();
  }, 50);
}

/**
 * Saves a new customer profile.
 */
function saveNewCustomer() {
  const name = (v("new-c-name") || "").trim();
  const phone = (v("new-c-phone") || "").trim();
  const errEl = $("new-c-name-err");
  if (!name) {
    if (errEl) errEl.style.display = "block";
    const inp = $("new-c-name");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  const newC = {
    id: uid(),
    name: name,
    phone: phone,
    joinedAt: today()
  };
  D.cu.push(newC);
  save();

  if (_newCustomerOnSaved) {
    const cb = _newCustomerOnSaved;
    _newCustomerOnSaved = null;
    cb(newC);
  } else {
    cm();
    expandedCustIds.add(newC.id);
    go("cust");
  }
}

/** State for Register Vehicle searchable customer picker combobox */
let regSelectedCid = "";
let regCustHighlightIndex = -1;
let regCustMatches = [];
let regCustDropdownOpen = false;

/**
 * Filters active customers matching query across name, phone, or vehicle plate numbers (max 8).
 * @param {string} query
 * @returns {Array<object>}
 */
function getRegCustomerMatches(query) {
  const q = (query || "").trim().toLowerCase();
  const allCustomers = (Array.isArray(D.cu) ? D.cu : []).filter((c) => !c.archived);
  if (!q) {
    return allCustomers.slice(0, 8);
  }
  const allBikes = Array.isArray(D.bk) ? D.bk : [];
  const matches = [];
  for (let i = 0; i < allCustomers.length; i++) {
    const c = allCustomers[i];
    const nameMatch = (c.name || "").toLowerCase().includes(q);
    const phoneMatch = (c.phone || "").toLowerCase().includes(q);
    let plateMatch = false;
    if (!nameMatch && !phoneMatch) {
      const bikes = allBikes.filter((b) => b.cid === c.id && !b.archived);
      plateMatch = bikes.some((b) => (b.plate || "").toLowerCase().includes(q));
    }
    if (nameMatch || phoneMatch || plateMatch) {
      matches.push(c);
      if (matches.length >= 8) break;
    }
  }
  return matches;
}

/**
 * Builds HTML for Register Vehicle customer dropdown listbox options.
 * @param {string} query
 * @returns {string} HTML string
 */
function renderRegCustListboxHtml(query) {
  const matches = getRegCustomerMatches(query);
  regCustMatches = matches;
  const allBikes = Array.isArray(D.bk) ? D.bk : [];

  let html = "";
  if (matches.length === 0) {
    html += `<div style="padding:10px 14px;font-size:13px;color:var(--text-muted)">No matching customers found.</div>`;
  } else {
    matches.forEach((c, idx) => {
      const bikesCount = allBikes.filter((b) => b.cid === c.id && !b.archived).length;
      const isHighlighted = idx === regCustHighlightIndex;
      html += `
        <div
          id="reg-cust-opt-${idx}"
          role="option"
          aria-selected="${isHighlighted ? "true" : "false"}"
          class="brand-dropdown-item ${isHighlighted ? "active" : ""}"
          style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;cursor:pointer;gap:8px"
          onmousedown="selectRegCustomer('${c.id}')"
          onmouseenter="setRegCustHighlight(${idx})"
        >
          <div style="display:flex;align-items:center;min-width:0;gap:6px">
            <b>${escHtml(c.name || "Unnamed")}</b>
            ${c.phone ? `<span style="color:var(--text-muted);font-size:12px">(${escHtml(c.phone)})</span>` : ""}
          </div>
          <span style="color:var(--text-muted);font-size:12px;white-space:nowrap;flex-shrink:0">${bikesCount} vehicle${bikesCount === 1 ? "" : "s"}</span>
        </div>
      `;
    });
  }

  const isNewHighlighted = regCustHighlightIndex === matches.length;
  html += `
    <div
      id="reg-cust-opt-new"
      role="option"
      aria-selected="${isNewHighlighted ? "true" : "false"}"
      class="brand-dropdown-item ${isNewHighlighted ? "active" : ""}"
      style="display:flex;align-items:center;padding:10px 14px;cursor:pointer;color:var(--accent);font-weight:700;border-top:1px solid var(--border);gap:6px"
      onmousedown="onRegCustAddNewClick()"
      onmouseenter="setRegCustHighlight(${matches.length})"
    >
      <span>+ New customer</span>
    </div>
  `;

  return html;
}

/**
 * Opens customer picker dropdown listbox.
 */
function openRegCustDropdown() {
  regCustDropdownOpen = true;
  const inp = $("reg-cust-search");
  const listbox = $("reg-cust-listbox");
  if (inp) inp.setAttribute("aria-expanded", "true");
  if (listbox) {
    const q = inp ? inp.value : "";
    listbox.innerHTML = renderRegCustListboxHtml(q);
    listbox.style.display = "block";
  }
}

/**
 * Closes customer picker dropdown listbox.
 */
function closeRegCustDropdown() {
  regCustDropdownOpen = false;
  const inp = $("reg-cust-search");
  const listbox = $("reg-cust-listbox");
  if (inp) inp.setAttribute("aria-expanded", "false");
  if (listbox) listbox.style.display = "none";
  regCustHighlightIndex = -1;
}

/**
 * Live search handler for customer picker. Re-renders only the dropdown list to maintain focus.
 * @param {string} val
 */
function onRegCustSearchInput(val) {
  const err = $("reg-b-cid-err");
  if (err) err.style.display = "none";
  const inp = $("reg-cust-search");
  if (inp) inp.style.borderColor = "var(--border)";
  const clearBtn = $("reg-cust-clear");
  if (clearBtn) clearBtn.classList.toggle("visible", Boolean(val));

  // If input is modified, invalidate selected customer ID if text no longer matches
  if (regSelectedCid) {
    const c = g("cu", regSelectedCid);
    const expected = c ? `${c.name}${c.phone ? ` (${c.phone})` : ""}` : "";
    if (val !== expected) {
      regSelectedCid = "";
    }
  }

  regCustHighlightIndex = -1;
  regCustDropdownOpen = true;
  if (inp) inp.setAttribute("aria-expanded", "true");
  const listbox = $("reg-cust-listbox");
  if (listbox) {
    listbox.innerHTML = renderRegCustListboxHtml(val);
    listbox.style.display = "block";
  }
}

/**
 * Sets highlighted row index in the customer picker listbox.
 * @param {number} idx
 */
function setRegCustHighlight(idx) {
  regCustHighlightIndex = idx;
  updateRegCustHighlightDom();
}

/**
 * Updates CSS active class across customer picker listbox items without re-rendering.
 */
function updateRegCustHighlightDom() {
  const totalOptions = regCustMatches.length + 1;
  for (let i = 0; i < regCustMatches.length; i++) {
    const el = $("reg-cust-opt-" + i);
    if (el) {
      const active = i === regCustHighlightIndex;
      el.classList.toggle("active", active);
      el.setAttribute("aria-selected", active ? "true" : "false");
      if (active) el.scrollIntoView({ block: "nearest" });
    }
  }
  const newEl = $("reg-cust-opt-new");
  if (newEl) {
    const active = regCustHighlightIndex === regCustMatches.length;
    newEl.classList.toggle("active", active);
    newEl.setAttribute("aria-selected", active ? "true" : "false");
    if (active) newEl.scrollIntoView({ block: "nearest" });
  }
}

/**
 * Selects a customer from the dropdown list, fills input with "Name (phone)", and moves focus to Plate Number.
 * @param {string} cid - Customer ID.
 */
function selectRegCustomer(cid) {
  regSelectedCid = cid;
  const c = g("cu", cid);
  const text = c ? `${c.name}${c.phone ? ` (${c.phone})` : ""}` : "";
  const inp = $("reg-cust-search");
  if (inp) inp.value = text;
  const clearBtn = $("reg-cust-clear");
  if (clearBtn) clearBtn.classList.toggle("visible", Boolean(text));
  const err = $("reg-b-cid-err");
  if (err) err.style.display = "none";
  if (inp) inp.style.borderColor = "var(--border)";
  closeRegCustDropdown();

  const plateInp = $("reg-b-plate");
  if (plateInp) plateInp.focus();
}

/**
 * Clears selected customer and search text, then focuses the search input.
 */
function clearRegCustSearch() {
  regSelectedCid = "";
  const inp = $("reg-cust-search");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clearBtn = $("reg-cust-clear");
  if (clearBtn) clearBtn.classList.remove("visible");
  openRegCustDropdown();
}

/**
 * Keyboard handler for customer picker combobox (ArrowUp/Down, Enter, Escape, Tab).
 * @param {KeyboardEvent} e
 */
function handleRegCustKeydown(e) {
  const totalOptions = regCustMatches.length + 1;
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!regCustDropdownOpen) {
      openRegCustDropdown();
      regCustHighlightIndex = 0;
    } else {
      regCustHighlightIndex = (regCustHighlightIndex + 1) % totalOptions;
    }
    updateRegCustHighlightDom();
    return;
  }
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!regCustDropdownOpen) {
      openRegCustDropdown();
      regCustHighlightIndex = totalOptions - 1;
    } else {
      regCustHighlightIndex = (regCustHighlightIndex - 1 + totalOptions) % totalOptions;
    }
    updateRegCustHighlightDom();
    return;
  }
  if (e.key === "Enter") {
    if (regCustDropdownOpen && regCustHighlightIndex >= 0) {
      e.preventDefault();
      if (regCustHighlightIndex < regCustMatches.length) {
        selectRegCustomer(regCustMatches[regCustHighlightIndex].id);
      } else {
        onRegCustAddNewClick();
      }
    }
    return;
  }
  if (e.key === "Escape") {
    if (regCustDropdownOpen) {
      e.preventDefault();
      closeRegCustDropdown();
    }
    return;
  }
  if (e.key === "Tab") {
    closeRegCustDropdown();
    return;
  }
}

/**
 * Handles "+ New customer" selection: saves typed vehicle fields and opens the new customer modal.
 */
function onRegCustAddNewClick() {
  closeRegCustDropdown();
  const prevPlate = v("reg-b-plate") || "";
  const prevYear = v("reg-b-year") || "";
  const prevMake = v("reg-b-make") || "";
  const prevModel = v("reg-b-model") || "";
  const prevEngine = v("reg-b-engine") || "";

  openNewCustomerModal((newC) => {
    openRegisterVehicleModal(newC.id, {
      plate: prevPlate,
      year: prevYear,
      make: prevMake,
      model: prevModel,
      engine: prevEngine
    });
  });
}

// Global click-outside listener for register vehicle customer picker combobox
if (typeof document !== "undefined") {
  document.addEventListener("click", (e) => {
    if (!regCustDropdownOpen) return;
    const wrap = $("reg-cust-combobox-wrap");
    if (wrap && !wrap.contains(e.target)) {
      closeRegCustDropdown();
    }
  });
}

/**
 * Opens the "Register Vehicle" modal with searchable customer picker.
 * @param {string} [preselectedCid] - Optional customer ID to preselect.
 * @param {object} [initialFields] - Optional draft vehicle fields to restore.
 */
function openRegisterVehicleModal(preselectedCid, initialFields = {}) {
  let initialCustText = "";
  regSelectedCid = "";
  regCustHighlightIndex = -1;
  regCustDropdownOpen = false;

  if (preselectedCid) {
    const c = g("cu", preselectedCid);
    if (c && !c.archived) {
      regSelectedCid = c.id;
      initialCustText = `${c.name}${c.phone ? ` (${c.phone})` : ""}`;
    }
  }

  const plateVal = initialFields.plate || "";
  const yearVal = initialFields.year || "";
  const makeVal = initialFields.make || "";
  const modelVal = initialFields.model || "";
  const engineVal = initialFields.engine || "";

  M(`
    <div style="padding:10px 4px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h2 style="margin:0;font-size:18px;font-weight:700">Register Vehicle</h2>
        <button type="button" class="search-clear visible" onclick="cm()" style="position:static" title="Close">✕</button>
      </div>

      <div style="margin-bottom:14px;position:relative" id="reg-cust-picker-wrap">
        <label for="reg-cust-search" style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Owner / Customer *</label>
        <div class="brand-combobox-wrap" id="reg-cust-combobox-wrap">
          <input
            id="reg-cust-search"
            type="text"
            role="combobox"
            aria-expanded="false"
            aria-controls="reg-cust-listbox"
            aria-autocomplete="list"
            placeholder="Search customer by name or phone..."
            value="${escHtml(initialCustText)}"
            autocomplete="off"
            style="width:100%;height:40px;padding:0 38px 0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;background:var(--bg-surface);box-sizing:border-box"
            onfocus="openRegCustDropdown()"
            onclick="openRegCustDropdown()"
            oninput="onRegCustSearchInput(this.value)"
            onkeydown="handleRegCustKeydown(event)"
          />
          <button
            type="button"
            id="reg-cust-clear"
            class="brand-clear-btn ${initialCustText ? "visible" : ""}"
            onclick="clearRegCustSearch()"
            title="Clear customer"
            aria-label="Clear customer selection"
          >✕</button>
          <div
            id="reg-cust-listbox"
            role="listbox"
            class="brand-dropdown-list"
            style="display:none"
          ></div>
        </div>
        <div id="reg-b-cid-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Choose a customer.</div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Plate Number *</label>
          <input
            id="reg-b-plate"
            placeholder="e.g. ABC-1234"
            value="${escHtml(plateVal)}"
            style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box;text-transform:uppercase;font-family:ui-monospace,monospace"
            oninput="this.value=this.value.toUpperCase();if($('reg-b-plate-err')){$('reg-b-plate-err').style.display='none';this.style.borderColor='var(--border)';}"
          />
          <div id="reg-b-plate-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px"></div>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Year (Optional)</label>
          <input
            id="reg-b-year"
            type="number"
            placeholder="e.g. 2024"
            value="${escHtml(yearVal)}"
            style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box"
          />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Make / Brand *</label>
          <input
            id="reg-b-make"
            placeholder="e.g. Yamaha"
            value="${escHtml(makeVal)}"
            style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box"
            oninput="if($('reg-b-make-err')){$('reg-b-make-err').style.display='none';this.style.borderColor='var(--border)';}"
          />
          <div id="reg-b-make-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Make is required.</div>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Model *</label>
          <input
            id="reg-b-model"
            placeholder="e.g. NMAX 155"
            value="${escHtml(modelVal)}"
            style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box"
            oninput="if($('reg-b-model-err')){$('reg-b-model-err').style.display='none';this.style.borderColor='var(--border)';}"
          />
          <div id="reg-b-model-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Model is required.</div>
        </div>
      </div>

      <div style="margin-bottom:20px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Engine / Chassis No. (Optional)</label>
        <input
          id="reg-b-engine"
          placeholder="Optional engine or chassis serial"
          value="${escHtml(engineVal)}"
          style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box;font-family:ui-monospace,monospace"
        />
      </div>

      <div style="display:flex;justify-content:flex-end;gap:8px">
        <button type="button" class="btn g" onclick="cm()">Cancel</button>
        <button type="button" class="btn" onclick="saveRegisterVehicle()">Register Vehicle</button>
      </div>
    </div>
  `);

  setTimeout(() => {
    if (regSelectedCid) {
      const pl = $("reg-b-plate");
      if (pl) pl.focus();
    } else {
      const sc = $("reg-cust-search");
      if (sc) sc.focus();
    }
  }, 50);
}

/**
 * Validates and registers a new motorcycle linked to the chosen customer.
 */
function saveRegisterVehicle() {
  if (!regSelectedCid) {
    const err = $("reg-b-cid-err");
    if (err) err.style.display = "block";
    const inp = $("reg-cust-search");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }

  const cid = regSelectedCid;

  const plate = (v("reg-b-plate") || "").trim().toUpperCase();
  const plateErr = $("reg-b-plate-err");
  const plateInp = $("reg-b-plate");
  if (!plate) {
    if (plateErr) {
      plateErr.textContent = "Plate number is required.";
      plateErr.style.display = "block";
    }
    if (plateInp) {
      plateInp.style.borderColor = "var(--danger, #DC2626)";
      plateInp.focus();
    }
    return;
  }

  // Duplicate plate validation
  const isDup = (Array.isArray(D.bk) ? D.bk : []).some((b) => !b.archived && (b.plate || "").toUpperCase() === plate);
  if (isDup) {
    if (plateErr) {
      plateErr.textContent = "This plate number is already registered.";
      plateErr.style.display = "block";
    }
    if (plateInp) {
      plateInp.style.borderColor = "var(--danger, #DC2626)";
      plateInp.focus();
    }
    return;
  }

  const make = (v("reg-b-make") || "").trim();
  const model = (v("reg-b-model") || "").trim();
  if (!make) {
    const err = $("reg-b-make-err");
    if (err) err.style.display = "block";
    const inp = $("reg-b-make");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  if (!model) {
    const err = $("reg-b-model-err");
    if (err) err.style.display = "block";
    const inp = $("reg-b-model");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }

  const yearVal = v("reg-b-year");
  const engineVal = (v("reg-b-engine") || "").trim();

  const newBike = {
    id: uid(),
    cid: cid,
    plate: plate,
    make: make,
    model: model,
    year: yearVal ? +yearVal : "",
    engine: engineVal
  };

  D.bk.push(newBike);
  save();
  cm();
  expandedCustIds.add(cid);
  go("cust");
}

/**
 * Opens the Edit Customer Profile modal.
 * @param {string} cid - Customer ID.
 */
function openEditCustomerModal(cid) {
  const c = g("cu", cid);
  if (!c) return;

  M(`
    <div style="padding:10px 4px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h2 style="margin:0;font-size:18px;font-weight:700">Edit Customer Profile</h2>
        <button type="button" class="search-clear visible" onclick="cm()" style="position:static" title="Close">✕</button>
      </div>

      <div style="margin-bottom:14px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Full Name *</label>
        <input id="edit-c-name" value="${escHtml(c.name || "")}" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box" />
        <div id="edit-c-name-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Full name is required.</div>
      </div>

      <div style="margin-bottom:20px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Phone Number</label>
        <input id="edit-c-phone" value="${escHtml(c.phone || "")}" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box;font-family:ui-monospace,monospace" />
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          ${isSuper() ? `
            <button type="button" class="btn sm btn-destructive" onclick="deleteCustomer('${c.id}')">Delete Customer</button>
          ` : ""}
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn g" onclick="cm()">Cancel</button>
          <button type="button" class="btn" onclick="saveEditCustomer('${c.id}')">Save Changes</button>
        </div>
      </div>
    </div>
  `);
}

function saveEditCustomer(cid) {
  const c = g("cu", cid);
  if (!c) return;
  const name = (v("edit-c-name") || "").trim();
  const phone = (v("edit-c-phone") || "").trim();
  if (!name) {
    const err = $("edit-c-name-err");
    if (err) err.style.display = "block";
    const inp = $("edit-c-name");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  c.name = name;
  c.phone = phone;
  save();
  cm();
  go("cust");
}

function deleteCustomer(cid) {
  if (!isSuper()) return;
  const c = g("cu", cid);
  if (!c) return;
  const customerBikes = (Array.isArray(D.bk) ? D.bk : []).filter((b) => b.cid === cid);
  const bikeIds = new Set(customerBikes.map((b) => b.id));
  const hasWo = (Array.isArray(D.wo) ? D.wo : []).some((o) => o.cid === cid || bikeIds.has(o.bid));
  const hasSales = (Array.isArray(D.sales) ? D.sales : []).some((s) => s.cid === cid);

  if (hasWo || hasSales) {
    askReason("Cannot Delete Customer", "OK", () => {}, {
      description: "Has service history. It cannot be deleted.",
      alertOnly: true
    });
    return;
  }

  askReason(`Delete Customer "${c.name}"`, "Delete Customer", (reason) => {
    D.cu = (D.cu || []).filter((x) => x.id !== cid);
    D.bk = (D.bk || []).filter((x) => x.cid !== cid);
    save();
    cm();
    go("cust");
  });
}

/**
 * Opens the Edit Motorcycle modal.
 * Locks the plate number as read-only if motorcycle has existing work orders.
 * @param {string} bid - Motorcycle ID.
 */
function openEditBikeModal(bid) {
  const b = g("bk", bid);
  if (!b) return;
  const c = own(b);
  const hasJobs = (Array.isArray(D.wo) ? D.wo : []).some((o) => o.bid === b.id);
  const canEditPlate = isSuper() || !hasJobs;

  M(`
    <div style="padding:10px 4px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid var(--border);padding-bottom:12px">
        <h2 style="margin:0;font-size:18px;font-weight:700">Edit Motorcycle</h2>
        <button type="button" class="search-clear visible" onclick="cm()" style="position:static" title="Close">✕</button>
      </div>

      <div style="margin-bottom:14px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Owner</label>
        <div style="font-size:14px;font-weight:600;color:var(--text);padding:8px 12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px">
          ${escHtml(c ? c.name : "Unassigned")} ${c && c.phone ? `<span style="font-weight:400;color:var(--text-muted);margin-left:6px">(${escHtml(c.phone)})</span>` : ""}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Make / Brand *</label>
          <input id="edit-b-make" value="${escHtml(b.make || "")}" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box" />
          <div id="edit-b-make-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Make is required.</div>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Model *</label>
          <input id="edit-b-model" value="${escHtml(b.model || "")}" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box" />
          <div id="edit-b-model-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px">Model is required.</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Plate Number *</label>
          <input
            id="edit-b-plate"
            value="${escHtml(b.plate || "")}"
            ${!canEditPlate ? "readonly disabled style='width:100%;height:40px;padding:0 10px;background:var(--bg-subtle);color:var(--text-muted);border-radius:8px;border:1px solid var(--border);font-family:ui-monospace,monospace;box-sizing:border-box'" : "style='width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-family:ui-monospace,monospace;box-sizing:border-box'"}
          />
          ${!canEditPlate ? `<small style="display:block;color:var(--text-muted);margin-top:4px;font-style:italic">Plate is locked after the first job.</small>` : ""}
          <div id="edit-b-plate-err" style="display:none;color:var(--danger,#DC2626);font-size:12px;font-weight:600;margin-top:4px"></div>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Year (Optional)</label>
          <input id="edit-b-year" type="number" value="${b.year || ""}" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box" />
        </div>
      </div>

      <div style="margin-bottom:20px">
        <label style="display:block;font-size:12px;font-weight:600;color:var(--text-secondary);margin-bottom:6px">Engine / Chassis No. (Optional)</label>
        <input id="edit-b-engine" value="${escHtml(b.engine || "")}" placeholder="Optional engine or chassis serial" style="width:100%;height:40px;padding:0 10px;border-radius:8px;border:1px solid var(--border);font-size:13px;box-sizing:border-box;font-family:ui-monospace,monospace" />
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          ${isSuper() ? `
            <button type="button" class="btn sm btn-destructive" onclick="deleteBike('${b.id}')">Delete Motorcycle</button>
          ` : ""}
        </div>
        <div style="display:flex;gap:8px">
          <button type="button" class="btn g" onclick="cm()">Cancel</button>
          <button type="button" class="btn" onclick="saveEditBike('${b.id}')">Save Changes</button>
        </div>
      </div>
    </div>
  `);
}

/**
 * Saves edits to motorcycle records.
 * Prompts for audit reason if Super Admin changed a locked plate number.
 * @param {string} bid - Motorcycle ID.
 */
function saveEditBike(bid) {
  const b = g("bk", bid);
  if (!b) return;
  const c = own(b);
  const oldPlate = b.plate;
  const newPlate = (v("edit-b-plate") || "").trim().toUpperCase();
  const hasJobs = (Array.isArray(D.wo) ? D.wo : []).some((o) => o.bid === b.id);

  const make = (v("edit-b-make") || "").trim();
  const model = (v("edit-b-model") || "").trim();
  if (!make) {
    const err = $("edit-b-make-err");
    if (err) err.style.display = "block";
    const inp = $("edit-b-make");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  if (!model) {
    const err = $("edit-b-model-err");
    if (err) err.style.display = "block";
    const inp = $("edit-b-model");
    if (inp) {
      inp.style.borderColor = "var(--danger, #DC2626)";
      inp.focus();
    }
    return;
  }
  b.make = make;
  b.model = model;
  b.year = +v("edit-b-year") || "";
  b.engine = (v("edit-b-engine") || "").trim();

  if (newPlate && newPlate !== oldPlate) {
    const isDup = (Array.isArray(D.bk) ? D.bk : []).some((x) => x.id !== b.id && !x.archived && (x.plate || "").toUpperCase() === newPlate);
    if (isDup) {
      const err = $("edit-b-plate-err");
      if (err) {
        err.textContent = "This plate number is already registered.";
        err.style.display = "block";
      }
      return;
    }
    if (hasJobs) {
      if (!isSuper()) {
        cm();
        go("cust");
        return;
      }
      cm();
      askReason(`Edit Locked Plate ${oldPlate} → ${newPlate}`, "Confirm Plate Change", (reason) => {
        b.plate = newPlate;
        save();
        go("cust");
      });
      return;
    } else {
      b.plate = newPlate;
    }
  }

  save();
  cm();
  go("cust");
}

/**
 * Hard deletes a motorcycle record if it has NO history; refuses otherwise (Super Admin only).
 * @param {string} bid - Motorcycle ID.
 */
function deleteBike(bid) {
  if (!isSuper()) return;
  const b = g("bk", bid);
  if (!b) return;
  const hasHistory = (Array.isArray(D.wo) ? D.wo : []).some((o) => o.bid === b.id);
  if (hasHistory) {
    askReason("Cannot Delete Motorcycle", "OK", () => {}, {
      description: "Has service history. It cannot be deleted.",
      alertOnly: true
    });
    return;
  }
  askReason(`Delete Motorcycle ${b.plate}`, "Delete", (reason) => {
    D.bk = (D.bk || []).filter((x) => x.id !== b.id);
    save();
    cm();
    go("cust");
  });
}

/**
 * Legacy alias for vehicle registration.
 */
function mCust() {
  openRegisterVehicleModal();
}

/**
 * Legacy alias for adding customer/vehicle.
 */
function addC() {
  saveRegisterVehicle();
}

/**
 * Starts a new work order through the Motorcycle Inspection intake wizard at Step 1.
 * Optionally pre-populates details if a registered motorcycle ID is provided.
 * @param {string} [bid] - Optional motorcycle ID.
 */
function startNewInspectionWorkOrder(bid) {
  resetInspDraft();
  inspDraftStep = 1;
  if (bid) {
    selectIntakeSuggestion(bid);
  }
  go("insp");
}

/**
 * Legacy alias for starting a new work order; redirects to Motorcycle Inspection Step 1.
 * @param {string} [bid]
 */
function mWO(bid) {
  startNewInspectionWorkOrder(bid);
}



/**
 * Opens the Job Card detail modal for a specific work order.
 * Delegates directly to the 5-stage job order modal (openInspModal) at the job's current stage.
 * @param {string} id - Work order ID.
 */
function mCard(id) {
  openInspModal(id);
}

let catSearch = "";

/** Active category filter for Service & Parts Catalog: "all" | "labor" | "part". In-memory only. */
let catFilter = "all";

/** Category filter chip definitions for Service & Parts Catalog */
const CAT_CHIPS = [
  { id: "all",   label: "All" },
  { id: "labor", label: "Labor / Service" },
  { id: "part",  label: "Part / Fluid" }
];

/**
 * Generates HTML string for the category filter chips in the Catalog view.
 * @returns {string} HTML string.
 */
function getCatChipsHtml() {
  return CAT_CHIPS.map((chip) => {
    const isSelected = catFilter === chip.id;
    return `<button
      type="button"
      id="cat-chip-${chip.id}"
      class="chip ${isSelected ? "on" : ""}"
      role="button"
      aria-pressed="${isSelected ? "true" : "false"}"
      onclick="setCatFilter('${chip.id}')"
    >${chip.label}</button>`;
  }).join("");
}

/**
 * Filter chip selection handler for Service & Parts Catalog.
 * Re-renders only the filter chips and the table rows, preserving search input focus.
 * @param {"all"|"labor"|"part"} filter - Selected category filter.
 */
function setCatFilter(filter) {
  catFilter = filter;
  const hadFocus = document.activeElement && document.activeElement.closest && document.activeElement.closest("#cat-chips");
  const chipsEl = $("cat-chips");
  if (chipsEl) {
    chipsEl.innerHTML = getCatChipsHtml();
    if (hadFocus) {
      const activeChipBtn = $(`cat-chip-${filter}`);
      if (activeChipBtn) {
        try { activeChipBtn.focus(); } catch (e) {}
      }
    }
  }
  const wrap = $("cat-table-wrap");
  if (wrap) {
    wrap.innerHTML = getCatTableHtml();
  }
}
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
        price: Number(s.labor) || 0,
        costPrice: s.costPrice !== undefined ? s.costPrice : null
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
        sku: p.sku || "",
        costPrice: p.costPrice !== undefined ? p.costPrice : null
      });
    });
  }
  if (kindFilter === "all") return items;
  return items.filter((it) => it.kind === kindFilter);
}

/**
 * Returns HTML string for the unified catalog price menu table.
 * Filters by both typed search text and selected category filter chip.
 * Missing or unknown categories are shown under "All" only.
 * For Super Admin: adds Cost and Margin columns, and Delete action.
 * For Admin: Delete is hidden, and Cost/Margin columns are hidden.
 * @returns {string}
 */
function getCatTableHtml() {
  const q = catSearch.trim().toLowerCase();
  const all = getCatalogItems("all");
  const filtered = (Array.isArray(all) ? all : []).filter((it) => {
    if (!it) return false;
    if (catFilter === "labor") {
      if (it.kind !== "labor") return false;
    } else if (catFilter === "part") {
      if (it.kind !== "part") return false;
    }
    if (q) {
      const name = (it.name || "").toLowerCase();
      if (!name.includes(q)) return false;
    }
    return true;
  });
  const isSuperUser = isSuper();

  return `
    <div class="tw">
      <table>
        <thead>
          <tr>
            <th>ITEM / SERVICE NAME</th>
            <th>CATEGORY</th>
            <th class="r">PRICE</th>
            <th class="r" style="width:140px">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          ${
            !filtered.length
              ? `<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px">No menu items found.</td></tr>`
              : filtered.map((it) => {
                  return `
                    <tr>
                      <td><b>${escHtml(it.name || "")}</b></td>
                      <td>
                        <span class="cat-badge ${it.kind || ""}">
                          ${it.kind === "labor" ? "Labor / Service" : it.kind === "part" ? "Part / Fluid" : escHtml(it.kind || "-")}
                        </span>
                      </td>
                      <td class="r"><b>${P(it.price)}</b></td>
                      <td class="r" style="white-space:nowrap">
                        <button type="button" class="btn g sm" onclick="openEditCatalogModal('${it.type}', '${it.id}')">Edit</button>
                        ${isSuperUser ? `
                          <button type="button" class="btn sm btn-destructive" style="margin-left:6px" onclick="askDeleteCatalogItem('${it.type}', '${it.id}', '${escHtml(it.name || "")}')">Delete</button>
                        ` : ""}
                      </td>
                    </tr>
                  `;
                }).join("")
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
 * Includes optional Cost Price (₱) input for Super Admin only.
 * @param {"add"|"edit"} mode
 * @param {"sv"|"pt"} [type]
 * @param {string} [id]
 */
function renderCatalogModal(mode, type, id) {
  let item = null;
  if (mode === "edit") {
    if (type === "sv") {
      const s = g("sv", id);
      if (s) item = { id: s.id, type: "sv", kind: "labor", name: s.name, price: s.labor || 0, costPrice: s.costPrice };
    } else if (type === "pt") {
      const p = g("pt", id);
      if (p) item = { id: p.id, type: "pt", kind: "part", name: p.name, price: p.cost || 0, sku: p.sku || "", costPrice: p.costPrice };
    }
  }

  const kind = item ? item.kind : catModalKind;
  const name = item ? item.name : "";
  const price = item ? item.price : "";
  const cost = item && item.costPrice !== undefined && item.costPrice !== null ? item.costPrice : "";

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
      style="height:42px;font-size:14px;margin-bottom:12px;width:100%;box-sizing:border-box"
    />
    <label for="cat-modal-price">Price (₱)</label>
    <input
      id="cat-modal-price"
      type="number"
      step="any"
      min="0"
      placeholder="0.00"
      value="${price !== '' ? price : ''}"
      style="height:42px;font-size:14px;margin-bottom:16px;width:100%;box-sizing:border-box"
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
      if (s) {
        s.name = name;
        s.labor = price;
      }
    } else if (type === "pt" && targetKind === "part") {
      const p = g("pt", id);
      if (p) {
        p.name = name;
        p.cost = price;
      }
    } else if (type === "sv" && targetKind === "part") {
      const old = g("sv", id);
      const cp = old && old.costPrice !== undefined ? old.costPrice : undefined;
      D.sv = D.sv.filter((s) => s.id !== id);
      if (!Array.isArray(D.pt)) D.pt = [];
      const newPt = { id: uid(), sku: "", name, cost: price };
      if (cp !== undefined) newPt.costPrice = cp;
      D.pt.push(newPt);
    } else if (type === "pt" && targetKind === "labor") {
      const old = g("pt", id);
      const cp = old && old.costPrice !== undefined ? old.costPrice : undefined;
      D.pt = D.pt.filter((p) => p.id !== id);
      if (!Array.isArray(D.sv)) D.sv = [];
      const newSv = { id: uid(), name, labor: price, parts: [] };
      if (cp !== undefined) newSv.costPrice = cp;
      D.sv.push(newSv);
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
 * Prompts for required reason before deleting a catalog item (Super Admin only).
 * @param {"sv"|"pt"} type
 * @param {string} id
 * @param {string} name
 */
function askDeleteCatalogItem(type, id, name) {
  if (!isSuper()) return;
  askReason(`Delete Menu Item "${name}"`, "Delete Item", (reason) => {
    deleteCatalogItem(type, id);
  });
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

/** State container for live CSV import preview */
let catCsvParsed = { valid: [], skipped: [] };

/**
 * Opens CSV import modal for bulk loading catalog items (Super Admin only).
 */
function openCatCsvModal() {
  if (!isSuper()) return;
  catCsvParsed = { valid: [], skipped: [] };
  M(`
    <h2>Import Catalog Items (CSV)</h2>
    <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;line-height:1.4">
      Paste comma-separated rows in the format: <code>name, category, price</code>.<br>
      Category accepts <b>labor</b> or <b>part</b> (case-insensitive). Header row is optional.
    </p>
    <div style="margin-bottom:12px">
      <textarea
        id="cat-csv-input"
        rows="6"
        placeholder="e.g.&#10;Engine Oil 10W-40, part, 350&#10;Brake Pad Replacement, labor, 250"
        style="width:100%;box-sizing:border-box;border:1px solid var(--border);border-radius:6px;padding:8px;font-size:13px;font-family:monospace"
        oninput="onCatCsvInput(this.value)"
      ></textarea>
    </div>
    <div id="cat-csv-preview" style="font-size:13px;margin-bottom:16px;padding:10px;background:var(--bg-surface-alt, #F8FAFC);border:1px solid var(--border);border-radius:6px">
      <div style="color:var(--text-muted)">Paste CSV rows above to see live preview.</div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:8px">
      <button type="button" class="btn g" onclick="cm()">Cancel</button>
      <button type="button" class="btn" id="cat-csv-import-btn" disabled onclick="importCatCsv()">Import</button>
    </div>
  `);
}

/**
 * Parses pasted CSV text and provides live preview counts and skip reasons.
 * Accepts "name, category, price" format; ignores any 4th value if pasted.
 * @param {string} text - Raw CSV text.
 */
function onCatCsvInput(text) {
  const lines = (text || "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const existingNames = new Set(getCatalogItems("all").map((it) => it.name.trim().toLowerCase()));

  const valid = [];
  const skipped = [];

  lines.forEach((line, lineIdx) => {
    const lower = line.toLowerCase();
    if (lower.startsWith("name,") || lower.startsWith('"name",') || lower.startsWith("name,category,price")) {
      return;
    }

    const parts = line.split(",").map((p) => p.trim().replace(/^["']|["']$/g, ""));
    const name = parts[0] || "";
    const rawCat = (parts[1] || "").toLowerCase();
    const priceStr = parts[2] || "";

    if (!name) {
      skipped.push(`Row ${lineIdx + 1}: empty name`);
      return;
    }

    if (rawCat !== "labor" && rawCat !== "part" && rawCat !== "service" && rawCat !== "fluid") {
      skipped.push(`Row ${lineIdx + 1} ("${name}"): unknown category "${parts[1] || ''}"`);
      return;
    }

    const price = parseFloat(priceStr);
    if (isNaN(price) || price < 0) {
      skipped.push(`Row ${lineIdx + 1} ("${name}"): invalid price "${priceStr}"`);
      return;
    }

    if (existingNames.has(name.toLowerCase())) {
      skipped.push(`Row ${lineIdx + 1} ("${name}"): exact duplicate name in catalog`);
      return;
    }

    if (valid.some((v) => v.name.toLowerCase() === name.toLowerCase())) {
      skipped.push(`Row ${lineIdx + 1} ("${name}"): duplicate name in batch`);
      return;
    }

    const kind = (rawCat === "labor" || rawCat === "service") ? "labor" : "part";
    valid.push({ name, kind, price });
  });

  catCsvParsed = { valid, skipped };

  const prevEl = $("cat-csv-preview");
  const btn = $("cat-csv-import-btn");

  if (prevEl) {
    if (!lines.length) {
      prevEl.innerHTML = `<div style="color:var(--text-muted)">Paste CSV rows above to see live preview.</div>`;
    } else {
      let previewHtml = `<b>${valid.length} row${valid.length === 1 ? '' : 's'} ready</b>`;
      if (skipped.length > 0) {
        previewHtml += `, <span style="color:var(--danger, #DC2626)">${skipped.length} skipped</span>`;
        previewHtml += `<div style="margin-top:6px;max-height:80px;overflow-y:auto;font-size:12px;color:var(--danger, #DC2626)">${skipped.map((s) => `• ${escHtml(s)}`).join("<br>")}</div>`;
      }
      prevEl.innerHTML = previewHtml;
    }
  }

  if (btn) {
    btn.disabled = valid.length === 0;
  }
}

/**
 * Imports valid rows into catalog (Super Admin only).
 */
function importCatCsv() {
  if (!isSuper()) return;
  const { valid } = catCsvParsed;
  if (!valid || !valid.length) return;

  if (!Array.isArray(D.sv)) D.sv = [];
  if (!Array.isArray(D.pt)) D.pt = [];

  valid.forEach((item) => {
    if (item.kind === "labor") {
      D.sv.push({
        id: uid(),
        name: item.name,
        labor: item.price,
        parts: []
      });
    } else {
      D.pt.push({
        id: uid(),
        sku: "",
        name: item.name,
        cost: item.price
      });
    }
  });

  save();
  cm();
  if (view === "cat") {
    const wrap = $("cat-table-wrap");
    if (wrap) wrap.innerHTML = getCatTableHtml();
  }
}


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
 * Supported motorcycle brands for ECU/OBD scanner and Step 1 brand combobox.
 */
const OBD_BRANDS = ["Yamaha", "Honda", "Suzuki", "Kawasaki", "Rusi", "Motoposh", "Other"];

/**
 * Sample data from the Yamaha Sniper 150 V2 DTC reference.
 * Replace or extend later with real scan results and other models.
 */
// Sample data from the Yamaha Sniper 150 V2 DTC reference. Extend later with other models and codes.
const DTC_LIBRARY = [
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: true,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: false,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: false,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: false,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
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
    common: false,
    model: "Yamaha Sniper 150 V2",
    caution: "Verify first. Do not replace the part until the checks below are done."
  }
];

/**
 * Searches DTC_LIBRARY by code, variant, error text, component name, or description.
 * Case-insensitive, spaces and dashes ignored ("p122" matches P0122).
 * Returns up to 8 matches, with common codes first when query is empty.
 * @param {string} rawQuery - Search string.
 * @returns {Array<{ entry: Object, matchedCode: string }>} Matched items.
 */
function searchDtcLibrary(rawQuery) {
  const raw = (rawQuery || "").trim();
  const qClean = raw.toLowerCase().replace(/[\s\-_]/g, "");

  if (!qClean) {
    const list = [...DTC_LIBRARY];
    list.sort((a, b) => (b.common ? 1 : 0) - (a.common ? 1 : 0));
    return list.slice(0, 8).map((entry) => ({ entry, matchedCode: entry.code }));
  }

  const results = [];
  const qWords = raw.toLowerCase().split(/\s+/).filter(Boolean);

  for (const entry of DTC_LIBRARY) {
    let matchedCode = null;
    let score = 0;

    // 1. Check all DTC variants
    const variants = Array.isArray(entry.dtc) ? entry.dtc : [entry.code];
    for (const v of variants) {
      const nv = v.toLowerCase().replace(/[\s\-_]/g, "");
      const nvShort = nv.replace(/^([a-z])0+([0-9]+)$/, "$1$2");
      const qShort = qClean.replace(/^([a-z])0+([0-9]+)$/, "$1$2");

      if (nv === qClean || nvShort === qClean || nv === qShort || nvShort === qShort) {
        matchedCode = v;
        score = Math.max(score, 100);
        break;
      } else if (nv.includes(qClean) || nvShort.includes(qClean) || nv.includes(qShort)) {
        if (!matchedCode) matchedCode = v;
        score = Math.max(score, 85);
      }
    }

    // 2. Check error code (e.g. "Error 15")
    if (entry.err) {
      const ne = entry.err.toLowerCase().replace(/[\s\-_]/g, "");
      const errNumMatch = entry.err.match(/\d+/g);
      if (ne.includes(qClean) || qClean.includes(ne)) {
        score = Math.max(score, 80);
      } else if (errNumMatch && errNumMatch.includes(qClean)) {
        score = Math.max(score, 75);
      }
    }

    // 3. Check component / part name
    if (entry.part) {
      const partLower = entry.part.toLowerCase();
      if (partLower.includes(raw.toLowerCase()) || partLower.replace(/[\s\-_]/g, "").includes(qClean)) {
        score = Math.max(score, 70);
      } else if (qWords.length > 0 && qWords.some((w) => partLower.includes(w))) {
        score = Math.max(score, 55);
      }
    }

    // 4. Check description
    if (entry.desc) {
      const descLower = entry.desc.toLowerCase();
      if (descLower.includes(raw.toLowerCase())) {
        score = Math.max(score, 60);
      } else if (qWords.length > 0 && qWords.some((w) => descLower.includes(w))) {
        score = Math.max(score, 45);
      }
    }

    if (score > 0) {
      results.push({ entry, matchedCode: matchedCode || entry.code, score, common: Boolean(entry.common) });
    }
  }

  results.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.common ? 1 : 0) - (a.common ? 1 : 0);
  });

  return results.slice(0, 8).map((r) => ({ entry: r.entry, matchedCode: r.matchedCode }));
}

/**
 * Finds a DTC library entry by exact or variant code match.
 * @param {string} code - DTC code string (e.g. "P0122" or "P0123").
 * @returns {{ entry: Object, matchedCode: string }|null}
 */
function findDtcInLibrary(code) {
  if (!code) return null;
  const q = code.trim().toUpperCase().replace(/[\s\-_]/g, "");
  const qShort = q.replace(/^([A-Z])0+([0-9]+)$/, "$1$2");

  for (const entry of DTC_LIBRARY) {
    const variants = Array.isArray(entry.dtc) ? entry.dtc : [entry.code];
    for (const v of variants) {
      const nv = v.toUpperCase().replace(/[\s\-_]/g, "");
      const nvShort = nv.replace(/^([A-Z])0+([0-9]+)$/, "$1$2");
      if (nv === q || nvShort === q || nv === qShort || nvShort === qShort) {
        return { entry, matchedCode: v };
      }
    }
  }
  return null;
}

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

let selectedInspectionZone = null;
let cannedJobToastTimer = null;

/**
 * In-memory state for DTC combobox and selection.
 */
let dtcComboboxOpen = false;
let dtcComboboxHighlight = -1;
let dtcSelectedLibraryEntry = null;
let dtcSelectedVariantCode = null;

/**
 * In-memory map of auto-inserted OBD finding text by fault code: { [code]: { baseEntry: string, lastVerified: string } | string }.
 * Used to cleanly remove exact auto-inserted text and detect verified updates.
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
let inspDiagView = "inspection";
let inspConfirmView = "summary";
let selectedPhysRailCat = null;

/**
 * Resets the inspection draft to initial empty state.
 */
function resetInspDraft() {
  inspDraft = createFreshInspDraft();
  inspDraftStep = 1;
  inspDiagView = "inspection";
  inspConfirmView = "summary";
  brandDropdownOpen = false;
  brandHighlightIndex = -1;
  modelDropdownOpen = false;
  modelHighlightIndex = -1;
  dtcComboboxOpen = false;
  dtcComboboxHighlight = -1;
  dtcSelectedLibraryEntry = null;
  dtcSelectedVariantCode = null;
  syncDraftObdBike();
  selectedPhysRailCat = null;
  selectedInspectionZone = null;
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
  syncDraftObdBike();

  inspDraftStep = Math.max(1, Math.min(3, newStep));
  if (inspDraftStep === 2) {
    inspDiagView = "inspection";
  } else if (inspDraftStep === 3) {
    inspConfirmView = "summary";
  }

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

/** Active tab in Job Card modal ("cust" | "diag" | "items"). */
let jcActiveTab = "cust";

/** Previously focused element prior to opening Job Card modal. */
let lastActiveJobCardTrigger = null;

/**
 * Switches the active tab in the Job Card modal.
 * Preserves panel DOM so typed inputs survive switching tabs.
 * @param {"cust"|"diag"|"items"} tabKey
 */
function switchJobCardTab(tabKey) {
  jcActiveTab = tabKey;
  const tabs = ["cust", "diag", "items"];
  tabs.forEach((t) => {
    const btn = $(`jc-tab-${t}`);
    const panel = $(`jc-panel-${t}`);
    const isActive = t === tabKey;
    if (btn) {
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    if (panel) {
      if (isActive) {
        panel.removeAttribute("hidden");
        panel.style.display = "block";
      } else {
        panel.setAttribute("hidden", "");
        panel.style.display = "none";
      }
    }
  });
  const bodyEl = document.querySelector(".jc-body");
  if (bodyEl) bodyEl.scrollTop = 0;
}

/**
 * Handles Left and Right arrow key navigation across Job Card tabs.
 * @param {KeyboardEvent} e
 */
function handleJobCardTabKeydown(e) {
  const tabs = ["cust", "diag", "items"];
  const curIdx = tabs.indexOf(jcActiveTab);
  if (curIdx === -1) return;
  if (e.key === "ArrowRight") {
    e.preventDefault();
    const nextIdx = (curIdx + 1) % tabs.length;
    switchJobCardTab(tabs[nextIdx]);
    const nextBtn = $(`jc-tab-${tabs[nextIdx]}`);
    if (nextBtn) nextBtn.focus();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    const prevIdx = (curIdx - 1 + tabs.length) % tabs.length;
    switchJobCardTab(tabs[prevIdx]);
    const prevBtn = $(`jc-tab-${tabs[prevIdx]}`);
    if (prevBtn) prevBtn.focus();
  }
}

/**
 * Synchronizes Job Card tab item count, Accounting card numbers, footer total,
 * and background Active Repairs row/card totals in real time.
 * @param {string} woId - Work order ID.
 */
function syncJobCardTotals(woId) {
  if (!woId || woId === "draft") return;
  const o = g("wo", woId);
  if (!o) return;

  const items = getContextItems(woId, "items");
  const extra = getContextItems(woId, "extra");
  const all = [...items, ...extra];
  const count = all.length;

  const countEl = $("jc-tab-items-count");
  if (countEl) countEl.textContent = count;
  const countShortEl = $("jc-tab-items-count-short");
  if (countShortEl) countShortEl.textContent = count;

  let laborSub = 0;
  let partsSub = 0;
  all.forEach((it) => {
    const isLabor = it.kind === "labor";
    const qty = isLabor ? 1 : Math.max(1, Number(it.qty) || 1);
    if (it.src !== "own") {
      const price = Math.max(0, Number(it.price) || 0);
      if (isLabor) laborSub += qty * price;
      else partsSub += qty * price;
    }
  });

  const totVal = count > 0 ? (laborSub + partsSub) : jobTotalOf(o);

  const accLabor = $("jc-acc-labor-sub");
  if (accLabor) accLabor.textContent = P(laborSub);
  const accParts = $("jc-acc-parts-sub");
  if (accParts) accParts.textContent = P(partsSub);
  const accTotal = $("jc-acc-est-total");
  if (accTotal) accTotal.textContent = P(totVal);

  const accNote = $("jc-acc-stored-note");
  if (accNote) {
    accNote.style.display = (count === 0 && totVal > 0) ? "block" : "none";
  }

  const footerTot = $("jc-footer-total-val");
  if (footerTot) footerTot.textContent = P(totVal);

  const metaTot = $(`jobcard-meta-total-${woId}`);
  if (metaTot) metaTot.textContent = P(totVal);

  const listTotCell = $(`ar-row-total-${woId}`);
  if (listTotCell) listTotCell.textContent = P(totVal);
  const cardTotCell = $(`ar-card-total-${woId}`);
  if (cardTotCell) cardTotCell.textContent = P(totVal);
}

/**
 * Opens the Job Order modal for an active job or new intake.
 * Always resets active tab to Tab 1 (Customer & bike) and locks scroll.
 * @param {string|null} id - Work order ID.
 */
function openInspModal(id) {
  isStageTransitioning = false;
  lastActiveJobCardTrigger = document.activeElement;
  inspActiveWoId = id;
  jcActiveTab = "cust";
  renderInspModal(id);
  const ov = $("insp-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
  document.body.classList.add("jc-scroll-locked");
  document.body.style.overflow = "hidden";
}

/** Flag to prevent duplicate clicks while a job card stage transition is executing. */
let isStageTransitioning = false;

/**
 * Disables all action buttons in the stage bar to prevent duplicate clicks during transition.
 */
function disableStageActions() {
  const actionsEl = document.querySelector(".jobcard-stage-actions");
  if (actionsEl) {
    actionsEl.querySelectorAll("button").forEach((btn) => {
      btn.disabled = true;
    });
  }
}

/**
 * Closes the Job Order inspection modal and refreshes active view if needed.
 * Returns keyboard focus to the job's "Job card" button if it still exists in the list, otherwise to search input.
 */
function closeInspModal() {
  const ov = $("insp-ov");
  if (ov) ov.classList.remove("on");
  const closedWoId = inspActiveWoId;
  inspActiveWoId = null;
  document.body.classList.remove("jc-scroll-locked");
  document.body.style.overflow = "";

  if (view === "rep") {
    const resEl = $("rep-results");
    if (resEl) resEl.innerHTML = getRepResultsHtml();
    const chipsEl = $("rep-chips");
    if (chipsEl) chipsEl.innerHTML = getRepChipsHtml();

    let focused = false;
    if (closedWoId) {
      const cardBtn = document.querySelector(`#rep-card-${closedWoId} .rep-card-btn`);
      if (cardBtn) {
        try {
          cardBtn.focus();
          focused = true;
        } catch (e) {}
      }
    }
    if (!focused && lastActiveJobCardTrigger && document.body.contains(lastActiveJobCardTrigger)) {
      try {
        lastActiveJobCardTrigger.focus();
        focused = true;
      } catch (e) {}
    }
    if (!focused) {
      const searchInp = $("rep-search-input");
      if (searchInp) {
        try {
          searchInp.focus();
        } catch (e) {}
      }
    }
  } else if (view === "dash") {
    $("main").innerHTML = R.dash();
    if (lastActiveJobCardTrigger && document.body.contains(lastActiveJobCardTrigger)) {
      try {
        lastActiveJobCardTrigger.focus();
      } catch (e) {}
    }
  }

  lastActiveJobCardTrigger = null;
}

/**
 * Updates status of a work order directly from the Job Card modal.
 * Closes the Job Card modal upon successful move and returns to Active Repairs.
 * @param {string} woId - Work order ID.
 * @param {string} newStatus - New status from ST array.
 */
function setJobCardStatus(woId, newStatus) {
  if (isStageTransitioning) return;
  const o = g("wo", woId);
  if (!o) return;
  isStageTransitioning = true;
  disableStageActions();

  const oldStatus = o.st;
  o.st = newStatus;
  // Auto-stamp active logged-in user into wo.mech on Repair Done -> Checking (overwrites earlier value, any role)
  if (newStatus === "Checking" && oldStatus === "In Progress") {
    const u = getCurrentUser();
    const activeName = (u && u.name) ? u.name.trim() : "Staff";
    o.mech = activeName;
  }
  if (newStatus === "Ready for Pickup") {
    o.readyAt = nowLocalIso();
  }
  if (newStatus === "Completed" && !o.done) {
    o.done = nowLocalIso();
  }
  save();
  closeInspModal();
  setTimeout(() => {
    isStageTransitioning = false;
  }, 100);
}

/**
 * Renders the 3-tab Job Card modal for a work order.
 * Tabs: Customer & bike, Complaint & diagnosis, Items & accounting.
 * Stage bar and total footer remain persistent across all tabs.
 * @param {string|null} id - Work order ID.
 */
function renderInspModal(id) {
  const md = $("insp-md");
  if (!md) return;

  const o = id ? g("wo", id) : null;
  if (!o) {
    md.className = "insp-md jc-modal";
    md.innerHTML = `
      <div class="jc-head">
        <div class="jc-title-wrap">
          <div class="jc-title" id="insp-modal-title">Job Card</div>
          <div class="jc-subtitle">Job card</div>
        </div>
        <button type="button" class="jc-close-btn" onclick="closeInspModal()" title="Close" aria-label="Close">✕</button>
      </div>
      <div class="jc-body">
        <div class="empty" style="padding:24px">No work order selected.</div>
      </div>
      <div class="jc-foot">
        <div></div>
        <button type="button" class="btn g jc-btn-close" onclick="closeInspModal()">Close</button>
      </div>
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

  // Inspection check totals
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

  // Items and Accounting Subtotals
  const items = getContextItems(o.id, "items");
  const extraItems = getContextItems(o.id, "extra");
  const allItems = [...items, ...extraItems];
  const itemCount = allItems.length;

  let laborSub = 0;
  let partsSub = 0;
  allItems.forEach((it) => {
    const isLabor = it.kind === "labor";
    const qty = isLabor ? 1 : Math.max(1, Number(it.qty) || 1);
    if (it.src !== "own") {
      const price = Math.max(0, Number(it.price) || 0);
      if (isLabor) laborSub += qty * price;
      else partsSub += qty * price;
    }
  });

  const totAmount = itemCount > 0 ? (laborSub + partsSub) : jobTotalOf(o);
  const hasInspData = (okCount + watchCount + fixCount > 0) || obdCodes.length > 0 || Boolean(o.findings && o.findings.trim());
  const compStr = (o.complaints && o.complaints.length) ? o.complaints.map(escHtml).join(", ") : "None";
  const notesStr = o.notes ? escHtml(o.notes) : (o.note ? escHtml(o.note) : "None");

  // Ensure modal container has jc-modal class
  md.className = "insp-md jc-modal";

  md.innerHTML = `
    <!-- 1. Header (Always Visible) -->
    <div class="jc-head">
      <div class="jc-title-wrap">
        <div class="jc-title" id="insp-modal-title">
          <span>${b ? escHtml(b.plate) : "NO PLATE"} · ${b ? escHtml(b.make + " " + b.model + (b.year ? " " + b.year : "")) : "Unknown"}</span>
          <span class="jc-jo-chip">${escHtml(jo)}</span>
        </div>
        <div class="jc-subtitle">Job card</div>
      </div>
      <button type="button" class="jc-close-btn" onclick="closeInspModal()" title="Close dialog" aria-label="Close dialog">✕</button>
    </div>

    <!-- 2. Stage Bar (Always Visible) -->
    <div class="jc-stage">
      ${getJobCardStageControlHtml(o)}
    </div>

    <!-- 3. Tabs Navigation Row (Always Visible) -->
    <div class="jc-tabs" role="tablist" aria-label="Job Card Tabs" onkeydown="handleJobCardTabKeydown(event)">
      <button
        type="button"
        role="tab"
        id="jc-tab-cust"
        aria-selected="${jcActiveTab === "cust" ? "true" : "false"}"
        aria-controls="jc-panel-cust"
        class="jc-tab ${jcActiveTab === "cust" ? "active" : ""}"
        onclick="switchJobCardTab('cust')"
      >
        <span class="jc-tab-full">Customer &amp; bike</span>
        <span class="jc-tab-short">Customer</span>
      </button>

      <button
        type="button"
        role="tab"
        id="jc-tab-diag"
        aria-selected="${jcActiveTab === "diag" ? "true" : "false"}"
        aria-controls="jc-panel-diag"
        class="jc-tab ${jcActiveTab === "diag" ? "active" : ""}"
        onclick="switchJobCardTab('diag')"
      >
        <span class="jc-tab-full">Complaint &amp; diagnosis</span>
        <span class="jc-tab-short">Complaint</span>
      </button>

      <button
        type="button"
        role="tab"
        id="jc-tab-items"
        aria-selected="${jcActiveTab === "items" ? "true" : "false"}"
        aria-controls="jc-panel-items"
        class="jc-tab ${jcActiveTab === "items" ? "active" : ""}"
        onclick="switchJobCardTab('items')"
      >
        <span class="jc-tab-full">Items &amp; accounting (<span id="jc-tab-items-count">${itemCount}</span>)</span>
        <span class="jc-tab-short">Items (<span id="jc-tab-items-count-short">${itemCount}</span>)</span>
      </button>
    </div>

    <!-- 4. Tab Panels Container -->
    <div class="jc-body">
      <!-- Panel 1: Customer & bike -->
      <div
        id="jc-panel-cust"
        role="tabpanel"
        aria-labelledby="jc-tab-cust"
        ${jcActiveTab === "cust" ? "" : "hidden"}
        style="${jcActiveTab === "cust" ? "display:block" : "display:none"}"
      >
        <div class="jc-info-grid">
          <div class="jc-info-item">
            <span class="jc-info-label">Plate Number</span>
            <span class="jc-info-val"><b>${b ? escHtml(b.plate) : "NO PLATE"}</b></span>
          </div>
          <div class="jc-info-item">
            <span class="jc-info-label">Motorcycle</span>
            <span class="jc-info-val">${b ? escHtml(b.make + " " + b.model + (b.year ? " (" + b.year + ")" : "")) : "Unknown"}</span>
          </div>
          <div class="jc-info-item">
            <span class="jc-info-label">Customer</span>
            <span class="jc-info-val">${c ? escHtml(c.name + (c.phone ? " (" + c.phone + ")" : "")) : "Walk-in Customer"}</span>
          </div>
          <div class="jc-info-item">
            <span class="jc-info-label">Date In</span>
            <span class="jc-info-val">${formatJobDate(o.at)}</span>
          </div>
          <div class="jc-info-item">
            <span class="jc-info-label">Marked by</span>
            <span class="jc-info-val">${escHtml((o.mech && o.mech !== "Unassigned") ? o.mech : "-")}</span>
          </div>
          <div class="jc-info-item">
            <span class="jc-info-label">Current Status</span>
            <span class="jc-info-val">${badge(o.st)}</span>
          </div>
        </div>

        ${isReady ? `
          <div class="jc-card" style="padding:16px;text-align:center;background:var(--bg-surface-alt);border:1px solid var(--border)">
            <div style="display:flex;justify-content:center;margin-bottom:4px;color:var(--text-muted)">${ICONS.clipboard}</div>
            <h4 style="margin:0 0 4px">Vehicle Ready for Billing &amp; Pickup</h4>
            <p style="color:var(--text-muted);font-size:13px;margin:0 0 12px">All repairs finished. Vehicle awaiting settlement in Transactions &amp; Billing.</p>
            ${canOpen("bill")
              ? `<button type="button" class="btn sm" onclick="closeInspModal(); go('bill');">Go to Transactions &amp; Billing →</button>`
              : `<div style="font-size:13px;color:var(--text-muted);font-style:italic">Sent to billing. The Admin handles payment.</div>`
            }
          </div>
        ` : ""}
      </div>

      <!-- Panel 2: Complaint & diagnosis -->
      <div
        id="jc-panel-diag"
        role="tabpanel"
        aria-labelledby="jc-tab-diag"
        ${jcActiveTab === "diag" ? "" : "hidden"}
        style="${jcActiveTab === "diag" ? "display:block" : "display:none"}"
      >
        <!-- Customer Complaints & Requests Card -->
        <div class="jc-card">
          <div style="font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:10px">Customer Complaints &amp; Requests</div>
          <div style="font-size:13px;line-height:1.6">
            <div><b>Complaints:</b> ${compStr}</div>
            <div style="margin-top:4px"><b>Notes:</b> ${notesStr}</div>
          </div>
        </div>

        <!-- Inspection & Diagnosis Results Card -->
        <div class="jc-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <div style="display:flex;align-items:center;gap:8px">
              <div style="font-weight:700;font-size:14px;color:var(--text-primary)">Inspection &amp; Diagnosis Results</div>
              ${isSuper() && o.st !== "Completed" && o.st !== "Cancelled" ? `
                <button type="button" class="btn g sm" style="min-height:28px;padding:2px 8px;font-size:11px" onclick="openEditDiagnosisModal('${o.id}')">Edit diagnosis</button>
              ` : ""}
            </div>
            <div style="display:flex;gap:6px">
              <span class="phys-count-pill ok">OK ${okCount}</span>
              ${watchCount > 0 ? `<span class="phys-count-pill watch">Watch ${watchCount}</span>` : ""}
              <span class="phys-count-pill fix">Fix ${fixCount}</span>
            </div>
          </div>

          ${!hasInspData ? `
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:8px">All inspected items OK.</div>
            <div>
              <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Final Findings &amp; Diagnosis Verification:</div>
              <div style="font-size:13px;color:var(--text-muted)">-</div>
            </div>
          ` : `
            ${watchFixList.length > 0 ? `
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
            ` : `
              <div style="margin-bottom:12px">
                <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Physical Inspection:</div>
                <div style="font-size:13px;color:var(--text-muted)">All inspected items OK.</div>
              </div>
            `}

            ${obdCodes.length > 0 ? `
              <div style="margin-bottom:12px">
                <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:6px">ECU / OBD Diagnostic Codes:</div>
                <div style="display:flex;flex-direction:column;gap:6px">
                  ${obdCodes.map((c) => getObdCodeSummaryDisplayHtml(c)).join("")}
                </div>
              </div>
            ` : ""}

            <div style="margin-top:8px">
              <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Final Findings &amp; Diagnosis Verification:</div>
              ${o.findings && o.findings.trim()
                ? `<div style="font-size:13px;white-space:pre-wrap;background:#FFFFFF;border:1px solid var(--border);border-radius:6px;padding:8px 12px">${escHtml(o.findings)}</div>`
                : `<div style="font-size:13px;color:var(--text-muted)">-</div>`
              }
            </div>
          `}
        </div>

        ${o.remarks && o.remarks.trim() ? `
          <div class="jc-card">
            <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:4px">Mechanic Remarks:</div>
            <div style="font-size:13px;white-space:pre-wrap">${escHtml(o.remarks)}</div>
          </div>
        ` : ""}
      </div>

      <!-- Panel 3: Items & accounting -->
      <div
        id="jc-panel-items"
        role="tabpanel"
        aria-labelledby="jc-tab-items"
        ${jcActiveTab === "items" ? "" : "hidden"}
        style="${jcActiveTab === "items" ? "display:block" : "display:none"}"
      >
        <!-- Recommended Services & Allocated Items Card -->
        <div class="jc-card">
          <div style="font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:10px">
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

        <!-- Accounting Summary Card -->
        <div class="jc-card">
          <div style="font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:10px">
            Accounting Summary
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
            <div style="display:flex;justify-content:space-between;color:var(--text-secondary)">
              <span>Labor Subtotal:</span>
              <span id="jc-acc-labor-sub" style="font-weight:600;color:var(--text-primary)">${P(laborSub)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;color:var(--text-secondary)">
              <span>Parts Subtotal:</span>
              <span id="jc-acc-parts-sub" style="font-weight:600;color:var(--text-primary)">${P(partsSub)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:8px;margin-top:2px">
              <span style="font-weight:700;font-size:14px;color:var(--text-primary)">Estimated Total:</span>
              <b id="jc-acc-est-total" style="font-size:18px;font-weight:800;color:var(--text-primary)">${P(totAmount)}</b>
            </div>
            <div id="jc-acc-stored-note" style="font-size:12px;color:var(--text-muted);font-style:italic;display:${itemCount === 0 && totAmount > 0 ? "block" : "none"}">
              No itemized rows yet. Total comes from the job's recorded amount.
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 5. Footer (Always Visible) -->
    <div class="jc-foot">
      <div class="jc-foot-total">
        <span>Total</span>
        <b id="jc-footer-total-val">${P(totAmount)}</b>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
        ${isSuper() && o.st !== "Completed" && o.st !== "Cancelled" ? `
          <button type="button" class="btn sm btn-destructive" onclick="forceCancelJob('${o.id}')">Force-Cancel</button>
        ` : ""}
        ${isSuper() && (o.st === "Completed" || o.st === "Cancelled" || o.reversed) ? `
          <button type="button" class="btn g sm" onclick="reopenJob('${o.id}')">Reopen Job</button>
        ` : ""}
        ${isDone ? `
          <button type="button" class="btn sm" onclick="openReceipt('${o.id}')"><span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.print}</span>View Digital Receipt</button>
        ` : ""}
        <button type="button" class="btn g jc-btn-close" onclick="closeInspModal()">Close</button>
      </div>
    </div>
  `;
}

/**
 * Opens Edit Diagnosis modal for Super Admin to edit findings, fix items, and OBD codes.
 * @param {string} woId - Work order ID.
 */
function openEditDiagnosisModal(woId) {
  if (!isSuper()) return;
  const o = g("wo", woId);
  if (!o) return;

  const insp = o.inspection || {};
  const inspItems = insp.items || {};
  const obdCodes = (insp.obd && Array.isArray(insp.obd.codes)) ? insp.obd.codes : [];

  const fixItems = [];
  INSPECTION_CHECKLIST.forEach((cat) => {
    cat.items.forEach((item) => {
      const stateObj = inspItems[`${cat.key}.${item.key}`];
      if (stateObj && stateObj.s === "fix") {
        fixItems.push({
          key: `${cat.key}.${item.key}`,
          catName: cat.name,
          label: item.label,
          note: stateObj.note || ""
        });
      }
    });
  });

  M(`
    <h2>Edit Diagnosis — Job #${o.id}</h2>
    <div style="margin-bottom:14px">
      <label for="edit-diag-findings" style="font-size:12px;font-weight:700;display:block;margin-bottom:4px">Findings &amp; Diagnosis Verification</label>
      <textarea id="edit-diag-findings" rows="3" style="width:100%;box-sizing:border-box;border:1px solid var(--border);border-radius:6px;padding:8px;font-size:13px">${escHtml(o.findings || "")}</textarea>
    </div>

    <div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:700;margin-bottom:6px">Fix Items:</div>
      ${!fixItems.length ? `<div style="font-size:12px;color:var(--text-muted);font-style:italic">No Fix items recorded.</div>` : `
        <div style="display:flex;flex-direction:column;gap:8px;max-height:160px;overflow-y:auto">
          ${fixItems.map((fi) => {
            const safeKey = fi.key.replace(/\./g, "_");
            return `
              <div style="padding:6px 8px;border:1px solid var(--border);border-radius:6px;background:var(--bg-surface-alt, #F8FAFC);display:flex;flex-direction:column;gap:4px">
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;font-weight:700">${escHtml(fi.label)} <small style="color:var(--text-muted)">(${escHtml(fi.catName)})</small></span>
                  <label style="font-size:11px;display:flex;align-items:center;gap:4px;cursor:pointer">
                    <input type="checkbox" id="fix-toggle-${safeKey}" />
                    <span>Toggle to OK</span>
                  </label>
                </div>
                <input id="fix-note-${safeKey}" type="text" placeholder="Note" value="${escHtml(fi.note)}" style="height:30px;font-size:12px;padding:0 6px;border:1px solid var(--border);border-radius:4px" />
              </div>
            `;
          }).join("")}
        </div>
      `}
    </div>

    <div style="margin-bottom:16px">
      <div style="font-size:12px;font-weight:700;margin-bottom:6px">ECU / OBD Codes:</div>
      ${!obdCodes.length ? `<div style="font-size:12px;color:var(--text-muted);font-style:italic">No OBD trouble codes logged.</div>` : `
        <div id="edit-obd-codes-wrap" style="display:flex;flex-direction:column;gap:6px;max-height:140px;overflow-y:auto">
          ${obdCodes.map((code, idx) => `
            <div id="edit-obd-row-${idx}" data-idx="${idx}" class="edit-obd-entry" style="display:flex;align-items:center;justify-content:space-between;padding:4px 8px;border:1px solid var(--border);border-radius:4px;background:var(--bg-surface-alt, #F8FAFC);font-size:12px">
              <div>
                <b style="color:var(--danger, #DC2626)">${escHtml(code.code)}</b> ${escHtml(code.part ? code.part + ': ' : '')}${escHtml(code.desc || '')}
              </div>
              <button type="button" class="btn sm" style="padding:1px 6px;min-height:24px;color:var(--danger, #DC2626);background:#fff;border:1px solid var(--border)" onclick="document.getElementById('edit-obd-row-${idx}').remove()" title="Remove code">✕</button>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <div style="display:flex;justify-content:flex-end;gap:8px">
      <button type="button" class="btn g" onclick="cm()">Cancel</button>
      <button type="button" class="btn" onclick="saveEditDiagnosis('${o.id}')">Save Changes</button>
    </div>
  `);
}

/**
 * Saves diagnosis edits with required audit reason (Super Admin only).
 * @param {string} woId - Work order ID.
 */
function saveEditDiagnosis(woId) {
  if (!isSuper()) return;
  const o = g("wo", woId);
  if (!o) return;

  const newFindings = $("edit-diag-findings") ? $("edit-diag-findings").value : (o.findings || "");

  // Snapshot toggle and note state before closing modal
  const toggledKeys = [];
  const updatedNotes = {};
  if (o.inspection && o.inspection.items) {
    INSPECTION_CHECKLIST.forEach((cat) => {
      cat.items.forEach((item) => {
        const key = `${cat.key}.${item.key}`;
        const safeKey = key.replace(/\./g, "_");
        const toggleEl = $(`fix-toggle-${safeKey}`);
        const noteEl = $(`fix-note-${safeKey}`);
        if (toggleEl && toggleEl.checked) toggledKeys.push(key);
        if (noteEl) updatedNotes[key] = noteEl.value.trim();
      });
    });
  }

  // Snapshot remaining OBD codes
  let remainingCodes = null;
  const wrap = $("edit-obd-codes-wrap");
  if (wrap && o.inspection && o.inspection.obd && Array.isArray(o.inspection.obd.codes)) {
    remainingCodes = [];
    const entries = wrap.querySelectorAll(".edit-obd-entry");
    entries.forEach((el) => {
      const idx = parseInt(el.getAttribute("data-idx"), 10);
      if (!isNaN(idx) && o.inspection.obd.codes[idx]) {
        remainingCodes.push(o.inspection.obd.codes[idx]);
      }
    });
  }

  cm();
  askReason(`Edit Diagnosis for Job #${o.id}`, "Save Diagnosis", (reason) => {
    o.findings = newFindings;

    if (o.inspection && o.inspection.items) {
      toggledKeys.forEach((k) => {
        delete o.inspection.items[k];
      });
      Object.keys(updatedNotes).forEach((k) => {
        if (o.inspection.items[k]) {
          o.inspection.items[k].note = updatedNotes[k];
        }
      });
    }

    if (remainingCodes !== null && o.inspection && o.inspection.obd) {
      o.inspection.obd.codes = remainingCodes;
    }

    save();
    renderInspModal(o.id);
  }, { destructive: false });
}

/**
 * Force-cancels an active repair work order with required reason (Super Admin only).
 * @param {string} woId - Work order ID.
 */
function forceCancelJob(woId) {
  if (!isSuper()) return;
  const o = g("wo", woId);
  if (!o) return;
  askReason(`Force-Cancel Repair #${o.id}`, "Force-Cancel", (reason) => {
    o.st = "Cancelled";
    const u = getCurrentUser();
    o.cancel = {
      reason,
      at: nowLocalTimestamp(),
      by: u ? u.name : "Super Admin"
    };
    save();
    closeInspModal();
    if (view === "rep") {
      repFilter = "Cancelled";
      renderRepChips();
      renderRepResults();
    } else {
      go(view);
    }
  });
}

/**
 * Reopens a Completed or Cancelled repair work order with required reason (Super Admin only).
 * Completed -> "In Progress", previous payment saved to wo.prevPay, wo.pay and wo.done cleared.
 * Cancelled -> "Awaiting Parts/Approval", wo.cancel cleared.
 * @param {string} woId - Work order ID.
 */
function reopenJob(woId) {
  if (!isSuper()) return;
  const o = g("wo", woId);
  if (!o) return;

  askReason(`Reopen Job #${o.id}`, "Reopen Job", (reason) => {
    if (o.st === "Completed" || o.reversed) {
      o.st = "In Progress";
      if (o.pay) {
        o.prevPay = { ...o.pay };
      }
      delete o.pay;
      delete o.done;
      delete o.reversed;
    } else if (o.st === "Cancelled" || o.cancel) {
      o.st = "Awaiting Parts/Approval";
      delete o.cancel;
    }

    save();
    closeInspModal();
    closeRecord();
    go(view);
  }, { destructive: false });
}

/**
 * Global state for Step 1 Make / Brand combobox.
 */
let brandDropdownOpen = false;
let brandHighlightIndex = -1;

/**
 * Synchronizes draft vehicle fields into draft.inspection.obd.bike
 * for backward compatibility and Step 3 Scanned line display.
 */
function syncDraftObdBike() {
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
  inspDraft.inspection.obd.bike = {
    mode: "select",
    brand: (inspDraft.make || "").trim(),
    model: (inspDraft.model || "").trim(),
    plate: (inspDraft.plate || "").trim()
  };
}

/**
 * Returns brand options for the combobox given current query.
 * @param {string} val
 * @returns {Array<{label: string, value: string, isCustom: boolean}>}
 */
function getBrandOptions(val) {
  const q = (val || "").trim().toLowerCase();
  const known = OBD_BRANDS.filter((b) => b !== "Other");

  if (!q) {
    return [
      ...known.map((b) => ({ label: b, value: b, isCustom: false })),
      { label: "Other", value: "Other", isCustom: false }
    ];
  }

  const matches = known.filter((b) => b.toLowerCase().includes(q));
  const items = [];
  if (matches.length > 0) {
    matches.forEach((b) => items.push({ label: b, value: b, isCustom: false }));
  } else {
    items.push({
      label: `Use "${(val || "").trim()}"`,
      value: (val || "").trim(),
      isCustom: true
    });
  }
  items.push({ label: "Other", value: "Other", isCustom: false });
  return items;
}

/**
 * Opens the Step 1 brand dropdown listbox.
 */
function openBrandDropdown() {
  const listbox = $("insp-brand-listbox");
  const inp = $("insp-make");
  if (!listbox) return;
  renderBrandDropdownList();
  listbox.style.display = "block";
  brandDropdownOpen = true;
  if (inp) {
    inp.setAttribute("aria-expanded", "true");
  }
}

/**
 * Closes the Step 1 brand dropdown listbox.
 */
function closeBrandDropdown() {
  const listbox = $("insp-brand-listbox");
  const inp = $("insp-make");
  if (!listbox) return;
  listbox.style.display = "none";
  brandDropdownOpen = false;
  brandHighlightIndex = -1;
  if (inp) {
    inp.setAttribute("aria-expanded", "false");
    inp.removeAttribute("aria-activedescendant");
  }
}

/**
 * Re-renders the dropdown list without stealing focus from the input.
 */
function renderBrandDropdownList() {
  const listbox = $("insp-brand-listbox");
  const inp = $("insp-make");
  if (!listbox) return;

  const currentVal = inp ? inp.value : (inspDraft.make || "");
  const options = getBrandOptions(currentVal);

  listbox.innerHTML = options
    .map((opt, idx) => {
      const isHighlighted = idx === brandHighlightIndex;
      const isCustom = opt.isCustom;
      const isOther = opt.value === "Other";
      return `
        <div
          id="brand-opt-${idx}"
          class="brand-dropdown-item ${isHighlighted ? "highlighted" : ""} ${isCustom ? "custom-brand-item" : ""}"
          role="option"
          aria-selected="${isHighlighted ? "true" : "false"}"
          onmousedown="event.preventDefault(); selectBrandOptionByIndex(${idx})"
          style="${isOther ? "color:var(--text-muted);border-top:1px solid var(--border,#E2E8F0);margin-top:2px;" : ""}"
        >
          <span>${escHtml(opt.label)}</span>
          ${isCustom ? `<span class="brand-custom-tag">Custom</span>` : ""}
        </div>
      `;
    })
    .join("");

  updateBrandHighlight();
}

/**
 * Updates aria and classes for highlighted combobox option.
 */
function updateBrandHighlight() {
  const listbox = $("insp-brand-listbox");
  const inp = $("insp-make");
  if (!listbox) return;

  const items = listbox.querySelectorAll(".brand-dropdown-item");
  items.forEach((el, idx) => {
    const isHigh = idx === brandHighlightIndex;
    el.classList.toggle("highlighted", isHigh);
    el.setAttribute("aria-selected", isHigh ? "true" : "false");
    if (isHigh) {
      el.scrollIntoView({ block: "nearest" });
      if (inp) inp.setAttribute("aria-activedescendant", `brand-opt-${idx}`);
    }
  });

  if (brandHighlightIndex < 0 && inp) {
    inp.removeAttribute("aria-activedescendant");
  }
}

/**
 * Selects an option by index in the current option list.
 * @param {number} idx
 */
function selectBrandOptionByIndex(idx) {
  const inp = $("insp-make");
  const currentVal = inp ? inp.value : (inspDraft.make || "");
  const options = getBrandOptions(currentVal);
  if (idx >= 0 && idx < options.length) {
    selectBrandOption(options[idx]);
  }
}

/**
 * Selects a brand option object and applies behavior.
 * @param {{label: string, value: string, isCustom: boolean}} opt
 */
function selectBrandOption(opt) {
  const inp = $("insp-make");
  const known = OBD_BRANDS.filter((b) => b !== "Other");

  if (opt.value === "Other") {
    const curVal = inp ? inp.value.trim() : (inspDraft.make || "").trim();
    const isListed = known.some((b) => b.toLowerCase() === curVal.toLowerCase());
    if (isListed) {
      if (inp) inp.value = "";
      inspDraft.make = "";
    }
    closeBrandDropdown();
    if (inp) inp.focus();
    syncDraftObdBike();
    const clearBtn = $("insp-brand-clear");
    if (clearBtn) clearBtn.classList.toggle("visible", Boolean(inspDraft.make));
    return;
  }

  const chosenVal = opt.value;
  if (inp) inp.value = chosenVal;
  inspDraft.make = chosenVal;
  closeBrandDropdown();
  syncDraftObdBike();
  const clearBtn = $("insp-brand-clear");
  if (clearBtn) clearBtn.classList.toggle("visible", Boolean(chosenVal));
}

/**
 * Handles typing in the Step 1 brand combobox.
 * @param {string} val
 */
function onBrandInput(val) {
  const inp = $("insp-make");
  if (inp && inp.value !== val) {
    inp.value = val;
  }
  inspDraft.make = val;
  syncDraftObdBike();
  const clearBtn = $("insp-brand-clear");
  if (clearBtn) {
    clearBtn.classList.toggle("visible", Boolean(val));
  }
  brandHighlightIndex = -1;
  renderBrandDropdownList();
  openBrandDropdown();
}

/**
 * Clears the Step 1 brand input and re-opens the brand list.
 */
function clearBrandInput() {
  const inp = $("insp-make");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  inspDraft.make = "";
  syncDraftObdBike();
  const clearBtn = $("insp-brand-clear");
  if (clearBtn) clearBtn.classList.remove("visible");
  brandHighlightIndex = -1;
  renderBrandDropdownList();
  openBrandDropdown();
}

/**
 * Keyboard navigation handler for the Step 1 brand combobox.
 * @param {KeyboardEvent} e
 */
function handleBrandKeydown(e) {
  const listbox = $("insp-brand-listbox");
  const isOpen = brandDropdownOpen && listbox && listbox.style.display !== "none";
  const inp = $("insp-make");
  const currentVal = inp ? inp.value : (inspDraft.make || "");
  const options = getBrandOptions(currentVal);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!isOpen) {
      openBrandDropdown();
      brandHighlightIndex = 0;
      updateBrandHighlight();
    } else {
      brandHighlightIndex = Math.min(options.length - 1, brandHighlightIndex + 1);
      updateBrandHighlight();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (isOpen) {
      brandHighlightIndex = Math.max(0, brandHighlightIndex - 1);
      updateBrandHighlight();
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (isOpen && brandHighlightIndex >= 0 && brandHighlightIndex < options.length) {
      selectBrandOption(options[brandHighlightIndex]);
    } else {
      if (inp) inspDraft.make = inp.value;
      closeBrandDropdown();
      syncDraftObdBike();
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    closeBrandDropdown();
  } else if (e.key === "Tab") {
    closeBrandDropdown();
  }
}

/**
 * Global state for Step 1 Model combobox.
 */
let modelDropdownOpen = false;
let modelHighlightIndex = -1;

/**
 * Returns available motorcycle models based on selected brand or all brands if none selected.
 * Filters results by user input and offers custom values.
 * Reads from global MOTORCYCLE_MODELS (loaded via motorcycleModels.js).
 * @param {string} val - Current model input text
 * @returns {Array<{label: string, value: string, isCustom: boolean}>}
 */
function getModelOptions(val) {
  const currentMake = ((inspDraft.make || "").trim());
  const modelsCatalog = (typeof MOTORCYCLE_MODELS !== "undefined")
    ? MOTORCYCLE_MODELS
    : ((typeof window !== "undefined" && window.MOTORCYCLE_MODELS)
      ? window.MOTORCYCLE_MODELS
      : {});

  let modelList = [];
  if (currentMake) {
    const brandKey = Object.keys(modelsCatalog).find(
      (k) => k.toLowerCase() === currentMake.toLowerCase()
    );
    if (brandKey && Array.isArray(modelsCatalog[brandKey])) {
      modelList = [...modelsCatalog[brandKey]];
    }
  }

  // If no brand selected or brand has no registered models, combine models from all brands
  if (!modelList.length) {
    const all = [];
    Object.keys(modelsCatalog).forEach((b) => {
      (modelsCatalog[b] || []).forEach((m) => {
        if (!all.includes(m)) all.push(m);
      });
    });
    modelList = all;
  }

  const q = (val || "").trim().toLowerCase();
  if (!q) {
    return modelList.map((m) => ({ label: m, value: m, isCustom: false }));
  }

  const matches = modelList.filter((m) => m.toLowerCase().includes(q));
  const items = [];
  const exactMatch = modelList.some((m) => m.toLowerCase() === q);

  if (matches.length > 0) {
    matches.forEach((m) => items.push({ label: m, value: m, isCustom: false }));
    if (!exactMatch && (val || "").trim()) {
      items.push({
        label: `Use "${(val || "").trim()}"`,
        value: (val || "").trim(),
        isCustom: true
      });
    }
  } else if ((val || "").trim()) {
    items.push({
      label: `Use "${(val || "").trim()}"`,
      value: (val || "").trim(),
      isCustom: true
    });
  }
  return items;
}

/**
 * Opens the Step 1 model dropdown listbox.
 */
function openModelDropdown() {
  const listbox = $("insp-model-listbox");
  const inp = $("insp-model");
  if (!listbox) return;
  renderModelDropdownList();
  listbox.style.display = "block";
  modelDropdownOpen = true;
  if (inp) {
    inp.setAttribute("aria-expanded", "true");
  }
}

/**
 * Closes the Step 1 model dropdown listbox.
 */
function closeModelDropdown() {
  const listbox = $("insp-model-listbox");
  const inp = $("insp-model");
  if (!listbox) return;
  listbox.style.display = "none";
  modelDropdownOpen = false;
  modelHighlightIndex = -1;
  if (inp) {
    inp.setAttribute("aria-expanded", "false");
    inp.removeAttribute("aria-activedescendant");
  }
}

/**
 * Renders the model dropdown list with optional hint when no brand is selected.
 */
function renderModelDropdownList() {
  const listbox = $("insp-model-listbox");
  const inp = $("insp-model");
  if (!listbox) return;

  const currentVal = inp ? inp.value : (inspDraft.model || "");
  const currentMake = (inspDraft.make || "").trim();
  const options = getModelOptions(currentVal);

  let headerHtml = "";
  if (!currentMake) {
    headerHtml = `
      <div style="padding:6px 12px;font-size:11px;color:var(--text-muted);background:#F8FAFC;border-bottom:1px solid var(--border,#E2E8F0);font-weight:600">
        💡 Pick a brand first for brand-specific models, or choose below:
      </div>
    `;
  } else {
    headerHtml = `
      <div style="padding:6px 12px;font-size:11px;color:var(--primary,#2563EB);background:#EFF6FF;border-bottom:1px solid var(--border,#E2E8F0);font-weight:600">
        🏍️ ${escHtml(currentMake)} Models
      </div>
    `;
  }

  if (!options.length) {
    listbox.innerHTML = headerHtml + `
      <div style="padding:10px 14px;color:var(--text-muted);font-size:13px">
        No models found. Type your own to add.
      </div>
    `;
    return;
  }

  listbox.innerHTML = headerHtml + options
    .map((opt, idx) => {
      const isHighlighted = idx === modelHighlightIndex;
      const isCustom = opt.isCustom;
      return `
        <div
          id="model-opt-${idx}"
          class="brand-dropdown-item ${isHighlighted ? "highlighted" : ""} ${isCustom ? "custom-brand-item" : ""}"
          role="option"
          aria-selected="${isHighlighted ? "true" : "false"}"
          onmousedown="event.preventDefault(); selectModelOptionByIndex(${idx})"
        >
          <span>${escHtml(opt.label)}</span>
          ${isCustom ? `<span class="brand-custom-tag">Custom</span>` : ""}
        </div>
      `;
    })
    .join("");

  updateModelHighlight();
}

/**
 * Updates aria and classes for highlighted model combobox option.
 */
function updateModelHighlight() {
  const listbox = $("insp-model-listbox");
  const inp = $("insp-model");
  if (!listbox) return;

  const items = listbox.querySelectorAll(".brand-dropdown-item");
  items.forEach((el, idx) => {
    const isHigh = idx === modelHighlightIndex;
    el.classList.toggle("highlighted", isHigh);
    el.setAttribute("aria-selected", isHigh ? "true" : "false");
    if (isHigh) {
      el.scrollIntoView({ block: "nearest" });
      if (inp) inp.setAttribute("aria-activedescendant", `model-opt-${idx}`);
    }
  });

  if (modelHighlightIndex < 0 && inp) {
    inp.removeAttribute("aria-activedescendant");
  }
}

/**
 * Selects a model option by index in the current option list.
 * @param {number} idx
 */
function selectModelOptionByIndex(idx) {
  const inp = $("insp-model");
  const currentVal = inp ? inp.value : (inspDraft.model || "");
  const options = getModelOptions(currentVal);
  if (idx >= 0 && idx < options.length) {
    selectModelOption(options[idx]);
  }
}

/**
 * Selects a model option object and applies behavior.
 * @param {{label: string, value: string, isCustom: boolean}} opt
 */
function selectModelOption(opt) {
  const inp = $("insp-model");
  const chosenVal = opt.value;
  if (inp) inp.value = chosenVal;
  inspDraft.model = chosenVal;
  closeModelDropdown();
  syncDraftObdBike();
  const clearBtn = $("insp-model-clear");
  if (clearBtn) clearBtn.classList.toggle("visible", Boolean(chosenVal));
}

/**
 * Handles typing in the Step 1 model combobox.
 * @param {string} val
 */
function onModelInput(val) {
  const inp = $("insp-model");
  if (inp && inp.value !== val) {
    inp.value = val;
  }
  inspDraft.model = val;
  syncDraftObdBike();
  const clearBtn = $("insp-model-clear");
  if (clearBtn) {
    clearBtn.classList.toggle("visible", Boolean(val));
  }
  modelHighlightIndex = -1;
  renderModelDropdownList();
  openModelDropdown();
}

/**
 * Clears the Step 1 model input and re-opens the model list.
 */
function clearModelInput() {
  const inp = $("insp-model");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  inspDraft.model = "";
  syncDraftObdBike();
  const clearBtn = $("insp-model-clear");
  if (clearBtn) clearBtn.classList.remove("visible");
  modelHighlightIndex = -1;
  renderModelDropdownList();
  openModelDropdown();
}

/**
 * Keyboard navigation handler for the Step 1 model combobox.
 * @param {KeyboardEvent} e
 */
function handleModelKeydown(e) {
  const listbox = $("insp-model-listbox");
  const isOpen = modelDropdownOpen && listbox && listbox.style.display !== "none";
  const inp = $("insp-model");
  const currentVal = inp ? inp.value : (inspDraft.model || "");
  const options = getModelOptions(currentVal);

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!isOpen) {
      openModelDropdown();
      modelHighlightIndex = 0;
      updateModelHighlight();
    } else {
      modelHighlightIndex = Math.min(options.length - 1, modelHighlightIndex + 1);
      updateModelHighlight();
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (isOpen) {
      modelHighlightIndex = Math.max(0, modelHighlightIndex - 1);
      updateModelHighlight();
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (isOpen && modelHighlightIndex >= 0 && modelHighlightIndex < options.length) {
      selectModelOption(options[modelHighlightIndex]);
    } else {
      if (inp) inspDraft.model = inp.value;
      closeModelDropdown();
      syncDraftObdBike();
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    closeModelDropdown();
  } else if (e.key === "Tab") {
    closeModelDropdown();
  }
}

/**
 * Reads all current values from Step 1 Intake inputs into inspDraft.
 */
function readIntakeDomIntoDraft() {
  const p = $("insp-plate"); if (p) inspDraft.plate = p.value.trim();
  const m = $("insp-make"); if (m) inspDraft.make = m.value.trim();
  const mo = $("insp-model"); if (mo) inspDraft.model = mo.value.trim();
  const n = $("insp-notes"); if (n) inspDraft.notes = n.value.trim();
  syncDraftObdBike();
}

/**
 * Reads all current values from Step 2 Diagnosis inputs into inspDraft.
 */
function readDiagDomIntoDraft() {
  const f = $("insp-diag-findings");
  if (f) inspDraft.findings = f.value;
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

    const verifiedInputs = document.querySelectorAll(".dtc-verified-input");
    verifiedInputs.forEach((ta) => {
      const code = ta.dataset.code;
      if (code && inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes)) {
        const found = inspDraft.inspection.obd.codes.find((c) => c.code === code);
        if (found) found.verified = ta.value;
      }
    });

    const descInputs = document.querySelectorAll(".dtc-row-desc-input");
    descInputs.forEach((inp) => {
      const code = inp.dataset.code;
      if (code && inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes)) {
        const found = inspDraft.inspection.obd.codes.find((c) => c.code === code);
        if (found) found.desc = inp.value;
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

      <!-- Vehicle Inputs Grid: Row 1 = Plate (left) & Make/Brand (right); Row 2 = Model (full width) -->
      <div class="row">
        <div class="insp-field-group">
          <label for="insp-plate">Plate Number</label>
          <input
            id="insp-plate"
            type="text"
            placeholder="e.g. ABC-1234"
            value="${escHtml(inspDraft.plate)}"
            oninput="inspDraft.plate=this.value; syncDraftObdBike()"
          />
        </div>
        <div class="insp-field-group" id="insp-brand-wrap" style="position:relative">
          <label for="insp-make">MAKE / BRAND</label>
          <div class="brand-combobox-wrap">
            <input
              id="insp-make"
              type="text"
              role="combobox"
              aria-expanded="false"
              aria-controls="insp-brand-listbox"
              aria-autocomplete="list"
              autocomplete="off"
              placeholder="Type a brand or tap to choose (e.g. Honda, Yamaha, Suzuki)"
              value="${escHtml(inspDraft.make)}"
              oninput="onBrandInput(this.value)"
              onfocus="openBrandDropdown()"
              onclick="openBrandDropdown()"
              onkeydown="handleBrandKeydown(event)"
            />
            <button
              type="button"
              id="insp-brand-clear"
              class="brand-clear-btn ${inspDraft.make ? "visible" : ""}"
              onclick="clearBrandInput()"
              aria-label="Clear brand"
              tabindex="-1"
            >✕</button>
            <div
              id="insp-brand-listbox"
              class="brand-dropdown-list"
              role="listbox"
              style="display:none"
            ></div>
          </div>
          <div class="brand-field-helper" style="font-size:12px;color:var(--text-muted);margin-top:4px">
            Pick a brand or type your own.
          </div>
        </div>
        <div class="insp-field-group" id="insp-model-wrap" style="position:relative;grid-column:1 / -1">
          <label for="insp-model">Model</label>
          <div class="brand-combobox-wrap">
            <input
              id="insp-model"
              type="text"
              role="combobox"
              aria-expanded="false"
              aria-controls="insp-model-listbox"
              aria-autocomplete="list"
              autocomplete="off"
              placeholder="Choose a model or type your own"
              value="${escHtml(inspDraft.model)}"
              oninput="onModelInput(this.value)"
              onfocus="openModelDropdown()"
              onclick="openModelDropdown()"
              onkeydown="handleModelKeydown(event)"
            />
            <button
              type="button"
              id="insp-model-clear"
              class="brand-clear-btn ${inspDraft.model ? "visible" : ""}"
              onclick="clearModelInput()"
              aria-label="Clear model"
              tabindex="-1"
            >✕</button>
            <div
              id="insp-model-listbox"
              class="brand-dropdown-list"
              role="listbox"
              style="display:none"
            ></div>
          </div>
          <div class="brand-field-helper" style="font-size:12px;color:var(--text-muted);margin-top:4px">
            Pick a model or type your own.
          </div>
        </div>
      </div>

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
 * Only searches properly registered motorcycles (plate + make + model + customer).
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

  const regBikes = getRegisteredBikes();
  const matches = [];
  regBikes.forEach((b) => {
    const c = own(b);
    const plate = (b.plate || "").toLowerCase();
    const phone = c && c.phone ? c.phone.toLowerCase() : "";
    const name = c && c.name ? c.name.toLowerCase() : "";
    const vehicle = ((b.make || "") + " " + (b.model || "")).toLowerCase();
    if (plate.includes(q) || phone.includes(q) || name.includes(q) || vehicle.includes(q)) {
      matches.push({ b, c });
    }
  });

  if (!matches.length) {
    box.style.display = "block";
    box.innerHTML = `<div class="insp-suggest-item" style="color:var(--text-muted);cursor:default">No registered motorcycles found.</div>`;
    return;
  }

  box.style.display = "block";
  box.innerHTML = matches
    .map(
      (m) => `
      <div class="insp-suggest-item" onmousedown="selectIntakeSuggestion('${m.b.id}')">
        <b>${escHtml(m.b.plate)} · ${escHtml((m.b.make || "") + " " + (m.b.model || ""))}</b>
        <small>${escHtml(m.c ? m.c.name : "—")}${m.c && m.c.phone ? ` · ${escHtml(m.c.phone)}` : ""}</small>
      </div>
    `
    )
    .join("");
}

/**
 * Auto-fills Step 1 Intake editable inputs and stores owner details in draft.
 * Does not collapse into summary card; fields remain fully editable.
 * @param {string} bikeId - Motorcycle ID.
 */
function selectIntakeSuggestion(bikeId) {
  readIntakeDomIntoDraft();
  const b = bike(bikeId);
  if (!b) return;
  const c = own(b);

  inspDraft.selectedBikeId = bikeId;
  inspDraft.plate = (b.plate || "").trim();
  inspDraft.make = (b.make || "").trim();
  inspDraft.model = (b.model || "").trim();
  if (c) {
    inspDraft.custName = (c.name || "").trim();
    inspDraft.custPhone = (c.phone || "").trim();
  }
  syncDraftObdBike();

  // Clear search input and hide suggestions
  const searchInp = $("insp-intake-search");
  if (searchInp) searchInp.value = "";
  const box = $("insp-suggest-box");
  if (box) {
    box.style.display = "none";
    box.innerHTML = "";
  }

  // Populate editable DOM inputs immediately
  const plateInp = $("insp-plate");
  if (plateInp) plateInp.value = inspDraft.plate;
  const makeInp = $("insp-make");
  if (makeInp) makeInp.value = inspDraft.make;
  const modelInp = $("insp-model");
  if (modelInp) modelInp.value = inspDraft.model;

  const brandClear = $("insp-brand-clear");
  if (brandClear) brandClear.classList.toggle("visible", Boolean(inspDraft.make));
  const modelClear = $("insp-model-clear");
  if (modelClear) modelClear.classList.toggle("visible", Boolean(inspDraft.model));
}

/**
 * Legacy stub for clearing returning vehicle; no-op now that fields remain editable.
 */
function clearSelectedIntakeBike() {
  readIntakeDomIntoDraft();
  inspDraft.selectedBikeId = null;
  syncDraftObdBike();
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
    const card = $("ecu-obd-card") || $("obd-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return;
  }

  selectedInspectionZone = zoneKey;
  renderPhysicalInspectionWorkspace();
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
        <span style="display:inline-flex;align-items:center;color:var(--danger)">${ICONS.alert}</span>
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
 * Switches the active sub-view in Step 2 Diagnosis ("inspection" or "findings") without destroying DOM elements.
 * Updates class and aria attributes of both buttons from inspDiagView state.
 * @param {"inspection"|"findings"} viewName - Target sub-view.
 */
function setInspDiagView(viewName) {
  inspDiagView = viewName === "findings" ? "findings" : "inspection";
  readDiagDomIntoDraft();

  const isA = inspDiagView !== "findings";
  const panelA = $("insp-diag-panel-a");
  const panelB = $("insp-diag-panel-b");
  const tabA = $("insp-diag-tab-a");
  const tabB = $("insp-diag-tab-b");

  if (panelA) {
    panelA.hidden = !isA;
    panelA.style.display = isA ? "block" : "none";
  }
  if (panelB) {
    panelB.hidden = isA;
    panelB.style.display = isA ? "none" : "block";
    if (!isA) {
      autoGrowTextarea($("insp-diag-findings"));
    }
  }

  if (tabA) {
    if (isA) {
      tabA.classList.add("active");
      tabA.setAttribute("aria-selected", "true");
      tabA.setAttribute("aria-pressed", "true");
      tabA.setAttribute("tabindex", "0");
    } else {
      tabA.classList.remove("active");
      tabA.setAttribute("aria-selected", "false");
      tabA.setAttribute("aria-pressed", "false");
      tabA.setAttribute("tabindex", "-1");
    }
  }

  if (tabB) {
    if (!isA) {
      tabB.classList.add("active");
      tabB.setAttribute("aria-selected", "true");
      tabB.setAttribute("aria-pressed", "true");
      tabB.setAttribute("tabindex", "0");
    } else {
      tabB.classList.remove("active");
      tabB.setAttribute("aria-selected", "false");
      tabB.setAttribute("aria-pressed", "false");
      tabB.setAttribute("tabindex", "-1");
    }
  }

  scrollIntoViewIfAbove("insp-diag-toggle");
}

/**
 * Handles keyboard navigation (ArrowLeft/ArrowRight, Home/End, Enter/Space) for Diagnosis switch tabs.
 * @param {KeyboardEvent} e
 */
function handleInspDiagTabKeydown(e) {
  const tabA = $("insp-diag-tab-a");
  const tabB = $("insp-diag-tab-b");
  if (!tabA || !tabB) return;

  const key = e.key;
  if (key === "ArrowRight" || key === "ArrowLeft") {
    e.preventDefault();
    if (document.activeElement === tabA) {
      tabB.focus();
    } else {
      tabA.focus();
    }
  } else if (key === "Home") {
    e.preventDefault();
    tabA.focus();
  } else if (key === "End") {
    e.preventDefault();
    tabB.focus();
  } else if (key === "Enter" || key === " " || key === "Spacebar") {
    e.preventDefault();
    if (document.activeElement === tabB) {
      setInspDiagView("findings");
    } else if (document.activeElement === tabA) {
      setInspDiagView("inspection");
    }
  }
}

/**
 * Scrolls the page to the top of the given element if it starts above the current scroll position.
 * @param {string} id - Element ID.
 */
function scrollIntoViewIfAbove(id) {
  const el = $(id);
  if (!el) return;
  if (typeof el.getBoundingClientRect === "function") {
    const rect = el.getBoundingClientRect();
    if (rect.top < 0) {
      if (typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
        window.scrollTo(0, 0);
      }
    }
  }
}

/**
 * Generates HTML for Step 2 Diagnosis form.
 * Split into two views toggled by segmented switch buttons directly below stepper:
 * View A: "Inspection (1-3)" -> Sections 1, 2 (when enabled), 3 (when enabled), and shared add bar.
 * View B: "Findings & Services (4-5)" -> Sections 4 and 5.
 * @returns {string} HTML string.
 */
function getInspStep2Html() {
  sanitizeInspDraftInspectionItems();
  const insp = inspDraft.inspection;
  syncDraftObdBike();

  const isA = inspDiagView !== "findings";

  return `
    <div class="insp-stage-body">
      <!-- Segmented switch for Step 2 views -->
      <div
        class="tab-switch-bar"
        id="insp-diag-toggle"
        role="tablist"
        aria-label="Diagnosis sections"
        onkeydown="handleInspDiagTabKeydown(event)"
      >
        <button
          type="button"
          id="insp-diag-tab-a"
          class="tab-switch-btn ${isA ? "active" : ""}"
          role="tab"
          aria-selected="${isA ? "true" : "false"}"
          aria-pressed="${isA ? "true" : "false"}"
          aria-controls="insp-diag-panel-a"
          tabindex="${isA ? "0" : "-1"}"
          onclick="setInspDiagView('inspection')"
        >
          Inspection (1-3)
        </button>
        <button
          type="button"
          id="insp-diag-tab-b"
          class="tab-switch-btn ${!isA ? "active" : ""}"
          role="tab"
          aria-selected="${!isA ? "true" : "false"}"
          aria-pressed="${!isA ? "true" : "false"}"
          aria-controls="insp-diag-panel-b"
          tabindex="${!isA ? "0" : "-1"}"
          onclick="setInspDiagView('findings')"
        >
          Findings &amp; Services (4-5)
        </button>
      </div>

      <!-- View A Panel: Sections 1-3 -->
      <div
        id="insp-diag-panel-a"
        role="tabpanel"
        aria-labelledby="insp-diag-tab-a"
        ${isA ? "" : "hidden"}
        style="${isA ? "display:block" : "display:none"}"
      >
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

        <!-- Card 2: 2. ECU / OBD DIAGNOSTIC CODES -->
        ${insp.enableObd ? getEcuObdCardHtml() : ""}

        <!-- Card 3: 3. PHYSICAL INSPECTION LOG -->
        ${insp.enablePhysical ? getPhysicalInspectionLogCardHtml() : ""}

        <!-- Shared Add to Findings Bar -->
        ${getSharedAddToFindingsBarHtml()}

        <!-- Panel A Footer Buttons -->
        <div class="insp-footer" style="position:static;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:flex-start">
          <button type="button" class="btn g" onclick="setInspDraftStep(1)">← Back</button>
        </div>
      </div>

      <!-- View B Panel: Sections 4-5 -->
      <div
        id="insp-diag-panel-b"
        role="tabpanel"
        aria-labelledby="insp-diag-tab-b"
        ${!isA ? "" : "hidden"}
        style="${!isA ? "display:block" : "display:none"}"
      >
        <!-- Card 4. FINAL FINDINGS & DIAGNOSIS VERIFICATION -->
        <div class="insp-card" style="margin-bottom:16px">
          <div class="insp-diag-card-title">4. FINAL FINDINGS &amp; DIAGNOSIS VERIFICATION</div>
          <p style="font-size:12px;color:var(--text-muted);margin:-8px 0 12px">
            Codes you record appear here. Review, edit, and add anything else to finalize the diagnosis.
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

        <!-- Panel B Footer Buttons -->
        <div class="insp-footer" style="position:static;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:space-between">
          <button type="button" class="btn g" onclick="setInspDraftStep(1)">← Back</button>
          <button type="button" class="btn" onclick="setInspDraftStep(3)">Next: Confirmation →</button>
        </div>
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
 * Computes the reference string for the ECU card subtitle.
 * @returns {string} Reference string ("Unknown" when blank).
 */
function getObdReferenceText() {
  const brand = (inspDraft.make || "").trim();
  const model = (inspDraft.model || "").trim();
  const combined = [brand, model].filter(Boolean).join(" ");
  return combined || "Unknown";
}

/**
 * Formats local date and time as YYYY-MM-DD HH:MM.
 * @returns {string}
 */
function getNowLocalString() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${h}:${min}`;
}

/**
 * Builds HTML for Card 2 "2. ECU / OBD DIAGNOSTIC CODES".
 * Mechanic types or searches code read from scanner, system fills in description and steps.
 * @returns {string} HTML string.
 */
function getEcuObdCardHtml() {
  return `
    <div class="insp-card" id="ecu-obd-card" style="margin-bottom:16px">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:8px;margin-bottom:4px">
        <div class="insp-diag-card-title" style="margin:0">2. ECU / OBD DIAGNOSTIC CODES</div>
        <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:var(--text-muted);flex-wrap:wrap">
          <span id="ecu-reference-sub">Reference: ${escHtml(getObdReferenceText())}</span>
          <span>Library: Yamaha Sniper 150 V2</span>
        </div>
      </div>
      <p style="font-size:12px;color:var(--text-muted);margin:0 0 14px">
        Type the code you read on your scanner. We fill in the description and steps.
      </p>

      <!-- 3a. Add row -->
      ${getDtcAddRowHtml()}

      <!-- 3b. Recorded codes list -->
      <div id="dtc-recorded-codes-wrap" class="dtc-recorded-codes-wrap" style="margin-top:16px">
        ${getDtcRecordedCodesHtml()}
      </div>

      <!-- Decision support notice -->
      <div class="obd-notice-box" style="margin-top:16px">
        <span style="font-size:16px">ℹ️</span>
        <span>Diagnostic outputs are for reference and decision support only. Final diagnosis requires mechanic verification.</span>
      </div>
    </div>
  `;
}

/**
 * Builds HTML for 3a: Add row (combobox, stored description input, Add Code button).
 * @returns {string}
 */
function getDtcAddRowHtml() {
  return `
    <div class="dtc-add-section">
      <div class="dtc-add-row">
        <!-- DTC Code Combobox -->
        <div class="dtc-combobox-wrap">
          <input
            type="text"
            id="dtc-search-input"
            class="dtc-input"
            role="combobox"
            aria-expanded="false"
            aria-controls="dtc-dropdown-list"
            aria-autocomplete="list"
            placeholder="Type or search a code (e.g. P0122, Error 15, throttle)"
            autocomplete="off"
            onfocus="openDtcDropdown()"
            onclick="openDtcDropdown()"
            oninput="onDtcSearchInput(this.value)"
            onkeydown="onDtcSearchKeyDown(event)"
          />
          <button
            type="button"
            id="dtc-clear-btn"
            class="dtc-clear-btn"
            style="display:none"
            onclick="clearDtcSearchInput()"
            aria-label="Clear code input"
          >✕</button>
          <div id="dtc-dropdown-list" class="dtc-dropdown" role="listbox" style="display:none"></div>
        </div>

        <!-- Stored Description Input -->
        <input
          type="text"
          id="dtc-desc-input"
          class="dtc-desc-input"
          placeholder="Type the description (custom or manufacturer code)"
          onkeydown="if(event.key==='Enter'){event.preventDefault();addDtcCodeFromInputs();}"
        />

        <!-- Add Code Button -->
        <button
          type="button"
          id="btn-add-dtc-code"
          class="btn dtc-add-btn"
          onclick="addDtcCodeFromInputs()"
        >
          Add Code
        </button>
      </div>
      <div id="dtc-add-msg" class="dtc-add-msg" aria-live="polite"></div>
    </div>
  `;
}

/**
 * Opens the DTC combobox dropdown and filters by current input text.
 */
function openDtcDropdown() {
  dtcComboboxOpen = true;
  dtcComboboxHighlight = -1;
  const input = $("dtc-search-input");
  const val = input ? input.value : "";
  renderDtcDropdown(val);
  const dropdown = $("dtc-dropdown-list");
  if (dropdown) dropdown.style.display = "block";
  if (input) input.setAttribute("aria-expanded", "true");
}

/**
 * Closes the DTC combobox dropdown.
 */
function closeDtcDropdown() {
  dtcComboboxOpen = false;
  dtcComboboxHighlight = -1;
  const dropdown = $("dtc-dropdown-list");
  if (dropdown) dropdown.style.display = "none";
  const input = $("dtc-search-input");
  if (input) input.setAttribute("aria-expanded", "false");
}

/**
 * Renders options in the DTC combobox dropdown.
 * @param {string} query
 */
function renderDtcDropdown(query) {
  const dropdown = $("dtc-dropdown-list");
  if (!dropdown) return;

  const matches = searchDtcLibrary(query);
  const cleanQ = (query || "").trim();

  let html = "";
  if (matches.length > 0) {
    html = matches.map((item, idx) => {
      const isHigh = idx === dtcComboboxHighlight;
      return `
        <div
          class="dtc-option ${isHigh ? 'highlight' : ''}"
          role="option"
          id="dtc-opt-${idx}"
          aria-selected="${isHigh}"
          onmousedown="selectDtcOption(${idx}, '${escHtml(item.matchedCode)}')"
        >
          <div class="dtc-option-top">
            <b class="dtc-option-code">${escHtml(item.matchedCode)}</b>
            ${item.entry.err ? `<span class="dtc-err-pill">${escHtml(item.entry.err)}</span>` : ""}
            <span class="dtc-option-part">${escHtml(item.entry.part || "")}</span>
          </div>
          <div class="dtc-option-desc">${escHtml(item.entry.desc || "")}</div>
        </div>
      `;
    }).join("");
  } else if (cleanQ) {
    const isHigh = dtcComboboxHighlight === 0;
    html = `
      <div
        class="dtc-option custom ${isHigh ? 'highlight' : ''}"
        role="option"
        id="dtc-opt-0"
        aria-selected="${isHigh}"
        onmousedown="selectCustomDtcOption('${escHtml(cleanQ)}')"
      >
        <span class="dtc-option-custom-label">+ Add custom code "<b>${escHtml(cleanQ.toUpperCase())}</b>"</span>
      </div>
    `;
  } else {
    html = `<div style="padding:10px 12px;font-size:12px;color:var(--text-muted);font-style:italic">No matching codes found.</div>`;
  }

  dropdown.innerHTML = html;
  dropdown.style.display = "block";
}

/**
 * Handles typing in the DTC search combobox input.
 * @param {string} val
 */
function onDtcSearchInput(val) {
  const clearBtn = $("dtc-clear-btn");
  if (clearBtn) clearBtn.style.display = val ? "block" : "none";
  const msgEl = $("dtc-add-msg");
  if (msgEl) {
    msgEl.textContent = "";
    msgEl.className = "dtc-add-msg";
  }
  openDtcDropdown();
}

/**
 * Keyboard navigation for DTC combobox: ArrowUp/Down, Enter, Escape, Tab.
 * @param {KeyboardEvent} e
 */
function onDtcSearchKeyDown(e) {
  const dropdown = $("dtc-dropdown-list");
  const options = dropdown ? dropdown.querySelectorAll(".dtc-option") : [];
  const count = options.length;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!dtcComboboxOpen) {
      openDtcDropdown();
      return;
    }
    if (count > 0) {
      dtcComboboxHighlight = (dtcComboboxHighlight + 1) % count;
      updateDtcDropdownHighlight(options);
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!dtcComboboxOpen) {
      openDtcDropdown();
      return;
    }
    if (count > 0) {
      dtcComboboxHighlight = (dtcComboboxHighlight - 1 + count) % count;
      updateDtcDropdownHighlight(options);
    }
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (dtcComboboxOpen && dtcComboboxHighlight >= 0 && dtcComboboxHighlight < count) {
      options[dtcComboboxHighlight].dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    } else {
      addDtcCodeFromInputs();
    }
  } else if (e.key === "Escape" || e.key === "Tab") {
    closeDtcDropdown();
  }
}

/**
 * Visually updates the highlighted row in the DTC dropdown list.
 * @param {NodeList} options
 */
function updateDtcDropdownHighlight(options) {
  options.forEach((opt, idx) => {
    const isHigh = idx === dtcComboboxHighlight;
    opt.classList.toggle("highlight", isHigh);
    opt.setAttribute("aria-selected", isHigh ? "true" : "false");
    if (isHigh) {
      opt.scrollIntoView({ block: "nearest" });
    }
  });
}

/**
 * Clears the DTC search combobox and resets selections.
 */
function clearDtcSearchInput() {
  const input = $("dtc-search-input");
  const descInput = $("dtc-desc-input");
  const clearBtn = $("dtc-clear-btn");
  if (input) {
    input.value = "";
    input.focus();
  }
  if (descInput && dtcSelectedLibraryEntry) {
    descInput.value = "";
  }
  if (clearBtn) clearBtn.style.display = "none";
  dtcSelectedLibraryEntry = null;
  dtcSelectedVariantCode = null;
  const msgEl = $("dtc-add-msg");
  if (msgEl) {
    msgEl.textContent = "";
    msgEl.className = "dtc-add-msg";
  }
  closeDtcDropdown();
}

/**
 * Selects a library entry from the DTC dropdown.
 * Auto-fills code and description inputs so user can edit both before adding.
 * @param {number} idx
 * @param {string} matchedCode
 */
function selectDtcOption(idx, matchedCode) {
  const input = $("dtc-search-input");
  const descInput = $("dtc-desc-input");
  const clearBtn = $("dtc-clear-btn");

  const query = input ? input.value : "";
  const matches = searchDtcLibrary(query);
  const match = matches[idx];

  if (match) {
    dtcSelectedLibraryEntry = match.entry;
    dtcSelectedVariantCode = matchedCode || match.matchedCode;
    if (input) input.value = dtcSelectedVariantCode;
    if (descInput) {
      descInput.value = match.entry.desc || "";
      descInput.focus();
    }
  }
  if (clearBtn) clearBtn.style.display = "block";
  closeDtcDropdown();
}

/**
 * Selects custom code from the DTC dropdown.
 * Auto-fills code input and focuses description input for editing before adding.
 * @param {string} code
 */
function selectCustomDtcOption(code) {
  const input = $("dtc-search-input");
  const descInput = $("dtc-desc-input");
  const clearBtn = $("dtc-clear-btn");
  dtcSelectedLibraryEntry = null;
  dtcSelectedVariantCode = null;
  if (input) input.value = (code || "").trim().toUpperCase();
  if (clearBtn) clearBtn.style.display = "block";
  closeDtcDropdown();
  if (descInput) descInput.focus();
}

/**
 * Highlights an existing DTC code row when a duplicate is attempted.
 * @param {string} code
 */
function highlightExistingDtcRow(code) {
  const row = $("dtc-row-" + code) || $("dtc-card-" + code);
  if (row) {
    row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    row.classList.remove("dtc-row-pulse");
    void row.offsetWidth;
    row.classList.add("dtc-row-pulse");
    setTimeout(() => {
      row.classList.remove("dtc-row-pulse");
    }, 1800);
  }
}

/**
 * Adds a DTC code record from the input fields into draft.inspection.obd.codes.
 */
function addDtcCodeFromInputs() {
  const input = $("dtc-search-input");
  const descInput = $("dtc-desc-input");
  const msgEl = $("dtc-add-msg");
  const clearBtn = $("dtc-clear-btn");

  const rawCode = (input ? input.value : "").trim();
  const rawDesc = (descInput ? descInput.value : "").trim();

  if (!rawCode) {
    if (msgEl) {
      msgEl.textContent = "Enter a code first.";
      msgEl.className = "dtc-add-msg err";
    }
    return;
  }

  const normCode = rawCode.toUpperCase();

  if (!inspDraft.inspection) {
    inspDraft.inspection = { enablePhysical: true, enableObd: true, obd: { codes: [] } };
  }
  if (!inspDraft.inspection.obd) {
    inspDraft.inspection.obd = { codes: [] };
  }
  if (!Array.isArray(inspDraft.inspection.obd.codes)) {
    inspDraft.inspection.obd.codes = [];
  }

  const isDuplicate = inspDraft.inspection.obd.codes.some(
    (c) => (c.code || "").trim().toUpperCase() === normCode
  );
  if (isDuplicate) {
    if (msgEl) {
      msgEl.textContent = `${normCode} is already in the list.`;
      msgEl.className = "dtc-add-msg muted";
    }
    highlightExistingDtcRow(normCode);
    return;
  }

  // Lookup in library
  let entry = null;
  let codeToRecord = normCode;
  if (dtcSelectedLibraryEntry && dtcSelectedVariantCode === normCode) {
    entry = dtcSelectedLibraryEntry;
    codeToRecord = normCode;
  } else {
    const libMatch = findDtcInLibrary(normCode);
    if (libMatch) {
      entry = libMatch.entry;
      codeToRecord = libMatch.matchedCode || normCode;
    }
  }

  const nowAt = getNowLocalString();

  if (entry) {
    const otherVariants = Array.isArray(entry.dtc) ? entry.dtc.filter((v) => v !== codeToRecord) : [];
    const checks = Array.isArray(entry.checks) ? [...entry.checks] : [];
    const parts = Array.isArray(entry.parts) ? [...entry.parts] : [];
    const newRecord = {
      code: codeToRecord,
      desc: rawDesc || entry.desc || "",
      err: entry.err || "",
      part: entry.part || "",
      checks: checks,
      parts: parts,
      done: new Array(checks.length).fill(false),
      verified: "",
      custom: false,
      at: nowAt,
      model: entry.model || "Yamaha Sniper 150 V2",
      caution: entry.caution || "Verify first. Do not replace the part until the checks below are done.",
      variants: otherVariants,
      expanded: false
    };
    inspDraft.inspection.obd.codes.push(newRecord);
  } else {
    const newRecord = {
      code: normCode,
      desc: rawDesc || "",
      err: "",
      part: "",
      checks: [],
      parts: [],
      done: [],
      verified: "",
      custom: true,
      at: nowAt,
      expanded: false
    };
    inspDraft.inspection.obd.codes.push(newRecord);
  }

  // Clear inputs and dropdown for the next entry
  if (input) {
    input.value = "";
    input.focus();
  }
  if (descInput) descInput.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  if (msgEl) {
    msgEl.textContent = "";
    msgEl.className = "dtc-add-msg";
  }
  dtcSelectedLibraryEntry = null;
  dtcSelectedVariantCode = null;
  closeDtcDropdown();

  renderDtcRecordedCodes();
  updateSharedAddToFindingsBar();
  updateHotspotsAndTiles();
}

/**
 * Toggles expand/collapse of an individual DTC code card details.
 * @param {string} code
 */
function toggleDtcExpand(code) {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  const detailsEl = $("dtc-details-" + code);
  const btn = $("dtc-toggle-btn-" + code);
  if (!detailsEl) return;
  const isHidden = detailsEl.style.display === "none";
  detailsEl.style.display = isHidden ? "block" : "none";
  if (c) c.expanded = isHidden;
  if (btn) {
    btn.innerHTML = isHidden ? "▲ Hide Details" : "▼ Details";
    btn.setAttribute("aria-expanded", isHidden ? "true" : "false");
    btn.title = isHidden ? "Hide details" : "View details";
  }
}

/**
 * Builds HTML for 3b: Recorded codes list (compact rows with collapsed details by default).
 * @returns {string}
 */
function getDtcRecordedCodesHtml() {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];

  if (codes.length === 0) {
    return `<div class="dtc-empty-placeholder" style="padding:16px;text-align:center;color:var(--text-muted);font-size:13px;border:1px dashed var(--border);border-radius:10px;background:var(--bg-surface-alt,#F8FAFC)">No codes recorded yet. Type or search a code from your scanner above.</div>`;
  }

  return codes.map((c) => {
    const code = escHtml(c.code || "");
    const errPill = c.err ? `<span class="dtc-err-pill">${escHtml(c.err)}</span>` : "";
    const otherVariants = Array.isArray(c.variants) && c.variants.length > 0
      ? `<span class="dtc-also-text" style="font-size:12px;color:var(--text-muted)">Also: ${escHtml(c.variants.join(", "))}</span>`
      : "";
    const actionBtnHtml = getDtcCardActionBtnHtml(c);

    const checks = Array.isArray(c.checks) ? c.checks : [];
    const parts = Array.isArray(c.parts) ? c.parts : [];
    const doneList = Array.isArray(c.done) ? c.done : [];
    const isExpanded = Boolean(c.expanded);

    return `
      <div class="dtc-code-card" id="dtc-row-${code}" data-code="${code}">
        <!-- Top compact row -->
        <div class="dtc-card-top-row">
          <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:240px;flex-wrap:wrap">
            <span class="dtc-code-pill">${code}</span>
            ${errPill}
            <input
              type="text"
              class="dtc-row-desc-input"
              data-code="${code}"
              value="${escHtml(c.desc || "")}"
              placeholder="Code description..."
              oninput="updateDtcDesc('${code}', this.value)"
              title="Edit code description"
            />
          </div>
          <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
            <span id="dtc-btn-wrap-${code}">
              ${actionBtnHtml}
            </span>
            <button
              type="button"
              class="btn g sm dtc-toggle-btn"
              id="dtc-toggle-btn-${code}"
              onclick="toggleDtcExpand('${code}')"
              aria-expanded="${isExpanded ? 'true' : 'false'}"
              title="${isExpanded ? 'Hide details' : 'View details'}"
            >
              ${isExpanded ? '▲ Hide Details' : '▼ Details'}
            </button>
            <button
              type="button"
              class="btn g sm dtc-remove-btn"
              onclick="removeDtcCode('${code}')"
              title="Remove code"
              aria-label="Remove ${code}"
              style="padding:2px 8px;font-size:12px;min-height:36px"
            >✕</button>
          </div>
        </div>

        <!-- Collapsible details section (troubleshooting, suggested parts, verified findings) -->
        <div
          id="dtc-details-${code}"
          class="dtc-details-collapse"
          style="display:${isExpanded ? 'block' : 'none'};margin-top:12px;padding-top:12px;border-top:1px solid var(--border)"
        >
          ${otherVariants ? `
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px">
              ${otherVariants}
            </div>
          ` : ""}

          ${c.caution ? `
            <div class="dtc-caution-line" style="margin-bottom:10px">
              ${escHtml(c.caution)}
            </div>
          ` : ""}

          <!-- Troubleshooting Steps -->
          <div class="dtc-card-section" style="margin-bottom:12px">
            <div class="dtc-section-title" style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">
              TROUBLESHOOTING STEPS
            </div>
            ${checks.length > 0 ? `
              <div class="dtc-steps-list" style="display:flex;flex-direction:column;gap:6px">
                ${checks.map((chk, sIdx) => {
                  const isDone = Boolean(doneList[sIdx]);
                  return `
                    <label class="dtc-step-item">
                      <input
                        type="checkbox"
                        class="dtc-step-checkbox"
                        ${isDone ? "checked" : ""}
                        onchange="toggleDtcStepDone('${code}', ${sIdx}, this.checked)"
                      />
                      <span class="dtc-step-num">${sIdx + 1}.</span>
                      <span class="dtc-step-text">${escHtml(chk)}</span>
                    </label>
                  `;
                }).join("")}
              </div>
            ` : `
              <div style="font-size:12px;color:var(--text-muted);font-style:italic">
                No steps in the library. Add your own checks in the notes below.
              </div>
            `}
          </div>

          <!-- Suggested Parts -->
          <div class="dtc-card-section" style="margin-bottom:12px">
            <div class="dtc-section-title" style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px">
              SUGGESTED PARTS
            </div>
            ${parts.length > 0 ? `
              <div class="dtc-parts-chips-wrap" style="display:flex;flex-wrap:wrap;gap:6px">
                ${parts.map((pt) => {
                  const fromId = `dtc.${c.code}|${pt}`;
                  const isAdded = Array.isArray(inspDraft.items) && inspDraft.items.some((it) => it.from === fromId);
                  return `
                    <button
                      type="button"
                      class="dtc-part-chip ${isAdded ? 'added' : ''}"
                      aria-pressed="${isAdded ? 'true' : 'false'}"
                      onclick="toggleDtcPartChip('${code}', '${escHtml(pt)}')"
                    >
                      ${isAdded ? '✓ Added: ' + escHtml(pt) : '+ ' + escHtml(pt)}
                    </button>
                  `;
                }).join("")}
              </div>
            ` : `
              <div style="font-size:12px;color:var(--text-muted);font-style:italic">
                No suggested parts listed.
              </div>
            `}
          </div>

          <!-- Mechanic's verified findings * -->
          <div class="dtc-verified-section">
            <label class="dtc-verified-label" for="dtc-verified-${code}" style="display:block;font-size:12px;font-weight:600;color:var(--text-primary);margin-bottom:4px">
              Mechanic's verified findings <span style="color:var(--text-muted)">*</span>
            </label>
            <textarea
              id="dtc-verified-${code}"
              class="dtc-verified-input"
              data-code="${code}"
              rows="2"
              placeholder="What did you actually confirm? e.g. Checked sensor wiring; found loose connector pin, sensor itself is good."
              oninput="updateDtcVerified('${code}', this.value)"
            >${escHtml(c.verified || "")}</textarea>
            <div
              id="dtc-verified-reminder-${code}"
              class="dtc-soft-reminder"
              style="font-size:12px;color:var(--text-muted);margin-top:4px;${(c.verified || '').trim() ? 'display:none;' : ''}"
            >
              Add what you verified before finalizing.
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Re-renders only the recorded codes list.
 */
function renderDtcRecordedCodes() {
  const wrap = $("dtc-recorded-codes-wrap");
  if (wrap) {
    wrap.innerHTML = getDtcRecordedCodesHtml();
  }
}

/**
 * Toggles a troubleshooting step checkbox.
 * @param {string} code
 * @param {number} stepIdx
 * @param {boolean} checked
 */
function toggleDtcStepDone(code, stepIdx, checked) {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  if (c) {
    if (!Array.isArray(c.done)) c.done = [];
    c.done[stepIdx] = checked;
  }
}

/**
 * Toggles a suggested part chip, linking to Recommended Services & Items.
 * @param {string} code
 * @param {string} partName
 */
function toggleDtcPartChip(code, partName) {
  readDiagDomIntoDraft();
  const fromId = `dtc.${code}|${partName}`;
  if (!Array.isArray(inspDraft.items)) inspDraft.items = [];

  const isAdded = inspDraft.items.some((it) => it.from === fromId);
  if (isAdded) {
    inspDraft.items = inspDraft.items.filter((it) => it.from !== fromId);
  } else {
    const price = resolveCannedJobPrice("part", partName, 0);
    inspDraft.items.push({
      id: uid(),
      kind: "part",
      name: partName,
      src: "shop",
      qty: 1,
      price: price,
      from: fromId,
      done: false
    });
  }

  renderDtcRecordedCodes();
  renderItemsManager("draft");
}

/**
 * Live updates mechanic's verified findings textarea value for a code.
 * Keeps textarea focused and updates reminders and findings button without re-rendering card.
 * @param {string} code
 * @param {string} val
 */
function updateDtcVerified(code, val) {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  if (c) {
    c.verified = val;
  }
  const rem = $("dtc-verified-reminder-" + code);
  if (rem) {
    rem.style.display = (val || "").trim() ? "none" : "block";
  }
  renderDtcCardActionBtn(code);
  updateSharedAddToFindingsBar();
}

/**
 * Toggles between plain text view and textarea edit mode for stored description.
 * @param {string} code
 */
function toggleEditDtcDesc(code) {
  const wrap = $("dtc-desc-edit-wrap-" + code);
  const viewEl = $("dtc-desc-view-" + code);
  if (!wrap || !viewEl) return;
  const isHidden = wrap.style.display === "none";
  wrap.style.display = isHidden ? "block" : "none";
  viewEl.style.display = isHidden ? "none" : "inline";
  if (isHidden) {
    const inp = $("dtc-desc-edit-input-" + code);
    if (inp) inp.focus();
  }
}

/**
 * Updates stored description value for a code.
 * @param {string} code
 * @param {string} val
 */
function updateDtcDesc(code, val) {
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  if (c) {
    c.desc = val;
  }
}

/**
 * Removes a recorded DTC code, its linked items in draft.items, and its untouched auto-inserted findings.
 * @param {string} code
 */
function removeDtcCode(code) {
  readDiagDomIntoDraft();
  if (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes)) {
    inspDraft.inspection.obd.codes = inspDraft.inspection.obd.codes.filter((x) => x.code !== code);
  }

  // Remove linked parts added from its chips
  const prefix = `dtc.${code}|`;
  if (Array.isArray(inspDraft.items)) {
    inspDraft.items = inspDraft.items.filter((it) => !(it.from && it.from.startsWith(prefix)));
    renderItemsManager("draft");
  }

  // Remove untouched auto-inserted findings entry
  const inserted = obdFindingText[code];
  if (inserted) {
    const ta = $("insp-diag-findings");
    const curVal = ta ? ta.value : (inspDraft.findings || "");
    const baseEntry = typeof inserted === "object" ? inserted.baseEntry : inserted;
    const cleaned = removeExactInsertedEntry(curVal, baseEntry);
    if (cleaned !== null) {
      let finalVal = cleaned;
      if (finalVal.trim() === "ECU/OBD CODES" || finalVal.trim() === "ECU/OBD SCAN") {
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

  renderDtcRecordedCodes();
  updateSharedAddToFindingsBar();
  updateHotspotsAndTiles();
}

/**
 * Formats a recorded DTC code entry for auto-insertion into final findings.
 * Format:
 * Code [(err)] - Component: Description
 * Verified: {verified findings, or "Not yet verified"}
 * @param {Object} c - Recorded code object.
 * @returns {string} Plain text entry block.
 */
function formatDtcFindingEntry(c) {
  const codePart = c.code || "";
  const errPart = c.err ? ` (${c.err})` : "";
  const component = c.part || "";
  let desc = c.desc || "";
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

  const verText = (c.verified && c.verified.trim()) ? c.verified.trim() : "Not yet verified";
  const line2 = `Verified: ${verText}`;

  return `${line1}\n${line2}`;
}

/**
 * Generates action button HTML for an individual code card: "Add to findings", "✓ Added", or "Add update".
 * @param {Object} c
 * @returns {string}
 */
function getDtcCardActionBtnHtml(c) {
  const f = $("insp-diag-findings");
  const curVal = f ? f.value : (inspDraft.findings || "");
  const inserted = obdFindingText[c.code];
  const isInserted = inserted && (typeof inserted === "object" ? curVal.includes(inserted.baseEntry) : curVal.includes(inserted));

  if (!isInserted) {
    return `
      <button type="button" class="obd-btn-add" onclick="addSingleDtcToFindings('${escHtml(c.code)}')">
        Add to findings
      </button>
    `;
  }

  const lastVer = typeof inserted === "object" ? (inserted.lastVerified || "") : "";
  const curVer = (c.verified || "").trim();

  if (curVer && curVer !== lastVer) {
    return `
      <button type="button" class="obd-btn-add update" onclick="addSingleDtcToFindings('${escHtml(c.code)}')">
        Add update
      </button>
    `;
  }

  return `
    <span class="obd-btn-added" role="status" aria-label="Fault code added to findings">✓ Added</span>
  `;
}

/**
 * Re-renders only the action button on a single code card.
 * @param {string} code
 */
function renderDtcCardActionBtn(code) {
  const wrap = $("dtc-btn-wrap-" + code);
  if (!wrap) return;
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  if (c) {
    wrap.innerHTML = getDtcCardActionBtnHtml(c);
  }
}

/**
 * Adds an individual DTC code or verified update into the findings textarea under "ECU/OBD CODES".
 * @param {string} code
 */
function addSingleDtcToFindings(code) {
  readDiagDomIntoDraft();
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];
  const c = codes.find((x) => x.code === code);
  if (!c) return;

  const ta = $("insp-diag-findings");
  let curVal = ta ? ta.value : (inspDraft.findings || "");

  const inserted = obdFindingText[code];
  const isInserted = inserted && (typeof inserted === "object" ? curVal.includes(inserted.baseEntry) : curVal.includes(inserted));

  let blockToInsert = "";
  if (!isInserted) {
    const entryText = formatDtcFindingEntry(c);
    obdFindingText[code] = { baseEntry: entryText, lastVerified: (c.verified || "").trim() };
    const headingNeeded = !curVal.includes("ECU/OBD CODES");
    blockToInsert = headingNeeded ? `ECU/OBD CODES\n${entryText}` : entryText;
  } else {
    const curVer = (c.verified || "").trim();
    const updateText = `Verified update (${c.code}): ${curVer || "Not yet verified"}`;
    if (!curVal.includes(updateText)) {
      blockToInsert = updateText;
    }
    if (typeof inserted === "object") {
      inserted.lastVerified = curVer;
    }
  }

  if (blockToInsert) {
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

    if (ta) {
      ta.classList.add("ta-highlight-green");
      if (taHighlightTimer) clearTimeout(taHighlightTimer);
      taHighlightTimer = setTimeout(() => {
        if (ta) ta.classList.remove("ta-highlight-green");
        taHighlightTimer = null;
      }, 1500);
    }
  }

  renderDtcCardActionBtn(code);
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
 * Counts recorded DTC codes not yet added or with modified verified text,
 * and physical items (Fix) whose current entry differs from physFindingText and is not in text.
 * @returns {{ dtc: number, physical: number, total: number }} Pending findings counts.
 */
function getPendingFindingsCounts() {
  const f = $("insp-diag-findings");
  const curVal = f ? f.value : (inspDraft.findings || "");

  // DTC codes count
  let dtcCount = 0;
  const codes = (inspDraft.inspection && inspDraft.inspection.obd && Array.isArray(inspDraft.inspection.obd.codes))
    ? inspDraft.inspection.obd.codes
    : [];

  codes.forEach((c) => {
    const inserted = obdFindingText[c.code];
    const isInserted = inserted && (typeof inserted === "object" ? curVal.includes(inserted.baseEntry) : curVal.includes(inserted));
    if (!isInserted) {
      dtcCount++;
    } else {
      const lastVer = typeof inserted === "object" ? (inserted.lastVerified || "") : "";
      const curVer = (c.verified || "").trim();
      if (curVer && curVer !== lastVer) {
        dtcCount++;
      }
    }
  });

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

  return { dtc: dtcCount, physical: physCount, total: dtcCount + physCount };
}

/**
 * Formats the summary line for the shared "Add to findings" bar.
 * Handles singular and plural rules correctly without "scan results" wording.
 * @param {{ dtc: number, physical: number, total: number }} counts
 * @returns {string} Summary string.
 */
function getSharedFindingsSummaryText(counts) {
  const dtcCount = counts.dtc;
  const physCount = counts.physical;

  if (dtcCount === 0 && physCount === 0) {
    return "Nothing new to add yet.";
  }

  const dtcPart = dtcCount > 0 ? `${dtcCount} DTC code${dtcCount === 1 ? "" : "s"}` : "";
  const physPart = physCount > 0 ? `${physCount} inspection fault${physCount === 1 ? "" : "s"}` : "";

  if (dtcCount > 0 && physCount > 0) {
    return `${dtcPart} and ${physPart} ready to add`;
  }
  if (dtcCount > 0) {
    return `${dtcPart} ready to add`;
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
 * Adds unadded DTC codes and physical inspection faults into the findings textarea.
 * Order:
 * 1. ECU/OBD codes (with "ECU/OBD CODES" heading if not already in text)
 * 2. Physical faults: Fix items in category order (with "PHYSICAL INSPECTION" heading if not in text)
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

  // 1. Gather pending DTC items
  const dtcBlocks = [];
  const codes = inspDraft.inspection.obd.codes;
  codes.forEach((c) => {
    const inserted = obdFindingText[c.code];
    const isInserted = inserted && (typeof inserted === "object" ? curVal.includes(inserted.baseEntry) : curVal.includes(inserted));

    if (!isInserted) {
      const entryText = formatDtcFindingEntry(c);
      obdFindingText[c.code] = { baseEntry: entryText, lastVerified: (c.verified || "").trim() };
      if (!curVal.includes(entryText)) {
        dtcBlocks.push(entryText);
      }
    } else {
      const lastVer = typeof inserted === "object" ? (inserted.lastVerified || "") : "";
      const curVer = (c.verified || "").trim();
      if (curVer && curVer !== lastVer) {
        const updateText = `Verified update (${c.code}): ${curVer}`;
        if (!curVal.includes(updateText)) {
          dtcBlocks.push(updateText);
        }
        if (typeof inserted === "object") {
          inserted.lastVerified = curVer;
        }
      }
    }
  });

  // 2. Gather pending physical items: Fix items in category order
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
  if (dtcBlocks.length === 0 && pendingPhysItems.length === 0) {
    showSharedBarFeedback("Nothing new to add.", 2000);
    return;
  }

  // Build blocks to append
  let textToAppend = "";

  // 1. DTC blocks
  if (dtcBlocks.length > 0) {
    const headingNeeded = !curVal.includes("ECU/OBD CODES");
    if (headingNeeded) {
      textToAppend += (textToAppend ? "\n\n" : "") + "ECU/OBD CODES\n" + dtcBlocks.join("\n\n");
    } else {
      textToAppend += (textToAppend ? "\n\n" : "") + dtcBlocks.join("\n\n");
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

  // Update card buttons
  codes.forEach((c) => renderDtcCardActionBtn(c.code));
  updateAllItemFindingsButtons();
  updateSharedAddToFindingsBar();
  showSharedBarFeedback("Added to Final Findings (Findings & Services tab)", 2500);
}

/**
 * Builds HTML for displaying an OBD code summary row/card in Step 3, Job Card, and Service History.
 * Displays: code, error code (if any), component, description, verified findings, and "n of m steps done" when steps exist.
 * Fully compatible with legacy { code, desc } objects.
 * @param {Object} c - OBD code object.
 * @returns {string} HTML string.
 */
function getObdCodeSummaryDisplayHtml(c) {
  if (!c || !c.code) return "";
  const code = escHtml(c.code);
  const errPill = c.err ? `<span class="dtc-err-pill">${escHtml(c.err)}</span>` : "";
  const partText = c.part ? `<b>${escHtml(c.part)}</b>` : "";
  let descText = c.desc || "";
  if (c.part && descText.startsWith(c.part + ": ")) {
    descText = descText.slice(c.part.length + 2).trim();
  }
  const cleanDesc = escHtml(descText);

  let compAndDesc = "";
  if (partText && cleanDesc) {
    compAndDesc = `${partText}: ${cleanDesc}`;
  } else if (partText) {
    compAndDesc = partText;
  } else if (cleanDesc) {
    compAndDesc = cleanDesc;
  }

  let stepsDoneBadge = "";
  if (Array.isArray(c.checks) && c.checks.length > 0) {
    const total = c.checks.length;
    const doneCount = Array.isArray(c.done) ? c.done.filter(Boolean).length : 0;
    stepsDoneBadge = `<span class="obd-steps-badge" style="font-size:11px;color:var(--text-muted);background:var(--bg-subtle, #F1F5F9);padding:1px 6px;border-radius:4px;border:1px solid var(--border)">${doneCount} of ${total} steps done</span>`;
  }

  const verifiedRaw = typeof c.verified === "string" ? c.verified.trim() : "";
  const verifiedVal = verifiedRaw ? escHtml(verifiedRaw) : "Not recorded";

  return `
    <div class="obd-summary-entry" style="font-size:12px;padding:8px 10px;border:1px solid var(--border);border-radius:6px;background:var(--bg-surface-alt, #F8FAFC);display:flex;flex-direction:column;gap:4px">
      <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
        <span class="dtc-code-pill">${code}</span>
        ${errPill}
        ${compAndDesc ? `<span style="color:var(--text-primary)">${compAndDesc}</span>` : ""}
        ${stepsDoneBadge}
      </div>
      <div style="font-size:12px;color:var(--text-secondary);margin-top:2px">
        <span style="font-weight:600;color:var(--text-primary)">Verified:</span>
        <span style="white-space:pre-wrap;color:${verifiedRaw ? 'inherit' : 'var(--text-muted)'}">${verifiedVal}</span>
      </div>
    </div>
  `;
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
  closeItemSuggestions(context);
  renderItemsManager(context);
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
      priceInp.disabled = true;
      priceInp.readOnly = true;
      priceInp.classList.add("locked");
    } else {
      priceInp.disabled = false;
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
  const qty = kind === "labor" ? 1 : (qtyInp ? Math.max(1, parseInt(qtyInp.value, 10) || 1) : 1);
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
    item.qty = item.kind === "labor" ? 1 : Math.max(1, parseInt(val, 10) || 1);
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
  if (context !== "draft") {
    syncJobCardTotals(context);
  }
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
  const isLaborTab = formState.kind === "labor";
  const items = getContextItems(context, "items");
  const extraItems = context !== "draft" ? getContextItems(context, "extra") : [];
  const allItems = [...items, ...extraItems.map((x) => ({ ...x, _isExtra: true }))];

  let laborSub = 0;
  let partsSub = 0;
  let ownCount = 0;
  let hasWaiting = false;

  allItems.forEach((it) => {
    const isLabor = it.kind === "labor";
    const qty = isLabor ? 1 : Math.max(1, Number(it.qty) || 1);
    if (it.src === "own") {
      ownCount++;
    } else {
      const price = Math.max(0, Number(it.price) || 0);
      const lineTot = qty * price;
      if (isLabor) laborSub += lineTot;
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
              class="item-cat-btn ${isLaborTab ? 'active' : ''}"
              onclick="setItemFormKind('${context}', 'labor')"
            >
              Labor / Service
            </button>
            <button
              type="button"
              class="item-cat-btn ${!isLaborTab ? 'active' : ''}"
              onclick="setItemFormKind('${context}', 'part')"
            >
              Part / Fluid Used
            </button>
          </div>

          <div class="item-add-inputs-row">
            <!-- Name with Custom Suggestion Dropdown -->
            <div class="item-input-group name-group" style="position:relative;flex:2;min-width:200px">
              <label class="item-field-label">${isLaborTab ? "SERVICE NAME" : "ITEM NAME"}</label>
              <input
                type="text"
                id="${context}-item-name"
                class="item-field-input"
                placeholder="${isLaborTab ? 'e.g. Change oil, CVT cleaning' : 'e.g. Engine oil 10W-40, Drive Belt'}"
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
              style="flex:2;min-width:220px;display:${isLaborTab ? 'none' : 'flex'}"
            >
              <label class="item-field-label">Part Availability / Source</label>
              <select id="${context}-item-src" class="item-field-input" style="width:100%;min-width:200px" onchange="onItemSourceChange('${context}', this.value)">
                <option value="shop" ${formState.src === 'shop' || !formState.src ? 'selected' : ''}>Ready / Shop Provided</option>
                <option value="waiting" ${formState.src === 'waiting' ? 'selected' : ''}>Waiting for Part (Buy Outside / Order)</option>
                <option value="own" ${formState.src === 'own' ? 'selected' : ''}>Customer Brought Own Part</option>
              </select>
            </div>

            <!-- Qty (visible only when Part) -->
            ${!isLaborTab ? `
              <div class="item-input-group qty-group" id="${context}-qty-group" style="width:75px;flex:0 0 75px">
                <label class="item-field-label">Qty</label>
                <input
                  type="number"
                  id="${context}-item-qty"
                  class="item-field-input"
                  min="1"
                  value="1"
                />
              </div>
            ` : ""}

            <!-- Price (₱) -->
            <div class="item-input-group price-group" style="width:120px;flex:0 0 120px">
              <label class="item-field-label">Price (₱)</label>
              <input
                type="number"
                id="${context}-item-price"
                class="item-field-input ${(!isLaborTab && formState.src === 'own') ? 'locked' : ''}"
                min="0"
                step="any"
                placeholder="0.00"
                ${(!isLaborTab && formState.src === 'own') ? 'disabled readonly value="0"' : ''}
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
  const itemColLabel = readOnly ? "ITEM / SERVICE" : (isLaborTab ? "SERVICE" : "ITEM");
  const showTableQty = readOnly ? true : !isLaborTab;

  html += `
    <div class="items-table-wrap">
      <table class="items-table">
        <thead>
          <tr>
            ${showLaborDone ? `<th class="c" style="width:50px">DONE</th>` : ""}
            <th style="width:110px">CATEGORY</th>
            <th>${itemColLabel}</th>
            <th style="width:200px">SOURCE</th>
            ${showTableQty ? `<th class="r" style="width:75px">QTY</th>` : ""}
            <th class="r" style="width:100px">PRICE</th>
            <th class="r" style="width:110px">LINE TOTAL</th>
            ${!readOnly ? `<th class="c" style="width:45px"></th>` : ""}
          </tr>
        </thead>
        <tbody>
  `;

  if (!allItems.length) {
    const colCount = (showLaborDone ? 1 : 0) + (showTableQty ? 1 : 0) + 5 + (!readOnly ? 1 : 0);
    html += `<tr><td colspan="${colCount}" style="text-align:center;color:var(--text-muted);padding:24px">No items added yet.</td></tr>`;
  } else {
    allItems.forEach((it) => {
      const isOwn = it.src === "own";
      const isWaiting = it.src === "waiting";
      const isLabor = it.kind === "labor";
      const qty = isLabor ? 1 : Math.max(1, Number(it.qty) || 1);
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
        else if (isOwn) srcBadgeHtml = `<span class="src-badge own">Customer Brought Own Part</span>`;
        html += `<td>${srcBadgeHtml}</td>`;
      } else {
        html += `
          <td>
            <select
              class="item-inline-select"
              style="width:100%;min-width:180px;box-sizing:border-box"
              onchange="updateItemRow('${context}', '${it.id}', 'src', this.value)"
            >
              <option value="shop" ${it.src === 'shop' || !it.src ? 'selected' : ''}>Ready / Shop Provided</option>
              <option value="waiting" ${it.src === 'waiting' ? 'selected' : ''}>Waiting for Part</option>
              <option value="own" ${it.src === 'own' ? 'selected' : ''}>Customer Brought Own Part</option>
            </select>
          </td>
        `;
      }

      // Qty
      if (showTableQty) {
        if (readOnly) {
          html += `<td class="r">${isLabor ? "—" : qty}</td>`;
        } else {
          if (isLabor) {
            html += `<td class="r" style="color:var(--text-muted)">—</td>`;
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
        }
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
 * Closes the Job Card modal upon successful move and returns to Active Repairs.
 * @param {string} woId
 */
function startRepairFromAwaiting(woId) {
  if (isStageTransitioning) return;
  const o = g("wo", woId);
  if (!o) return;
  isStageTransitioning = true;
  disableStageActions();

  const oldSt = o.st;
  o.st = "In Progress";
  // Auto-stamp active logged-in user into wo.mech on Start Repair only if empty (any role)
  const u = getCurrentUser();
  const activeName = (u && u.name) ? u.name.trim() : "Staff";
  if (!o.mech || o.mech === "Unassigned") {
    o.mech = activeName;
  }
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
  closeInspModal();
  setTimeout(() => {
    isStageTransitioning = false;
  }, 100);
}

/**
 * Returns work order from Checking back to In Progress with optional remark.
 * Closes the Job Card modal upon successful move and returns to Active Repairs.
 * @param {string} woId
 */
function returnJobToRepair(woId) {
  if (isStageTransitioning) return;
  const o = g("wo", woId);
  if (!o) return;
  isStageTransitioning = true;
  disableStageActions();

  const reasonInp = $("qc-reason-" + woId);
  const reason = reasonInp ? reasonInp.value.trim() : "";
  if (reason) {
    o.remarks = (o.remarks ? o.remarks + "\n" : "") + "Returned from checking: " + reason;
  }
  const oldSt = o.st;
  o.st = "In Progress";
  save();
  closeInspModal();
  setTimeout(() => {
    isStageTransitioning = false;
  }, 100);
}

/**
 * Passes checking stage and sends work order to Ready for Pickup (Ready for Billing).
 * Closes the Job Card modal upon successful move and returns to Active Repairs.
 * @param {string} woId
 */
function passJobChecking(woId) {
  if (isStageTransitioning) return;
  const o = g("wo", woId);
  if (!o) return;
  isStageTransitioning = true;
  disableStageActions();

  const oldSt = o.st;
  o.st = "Ready for Pickup";
  o.readyAt = nowLocalIso();
  save();
  closeInspModal();
  setTimeout(() => {
    isStageTransitioning = false;
  }, 100);
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
 * Switches the active sub-view in Step 3 Confirmation ("summary" or "customer") without destroying DOM elements.
 * Updates class and aria attributes of both buttons from inspConfirmView state.
 * @param {"summary"|"customer"} viewName - Target sub-view.
 */
function setInspConfirmView(viewName) {
  inspConfirmView = viewName === "customer" ? "customer" : "summary";
  readConfirmDomIntoDraft();

  const isA = inspConfirmView !== "customer";
  const panelA = $("insp-confirm-panel-a");
  const panelB = $("insp-confirm-panel-b");
  const tabA = $("insp-confirm-tab-a");
  const tabB = $("insp-confirm-tab-b");

  if (panelA) {
    panelA.hidden = !isA;
    panelA.style.display = isA ? "block" : "none";
  }
  if (panelB) {
    panelB.hidden = isA;
    panelB.style.display = isA ? "none" : "block";
  }

  if (tabA) {
    if (isA) {
      tabA.classList.add("active");
      tabA.setAttribute("aria-selected", "true");
      tabA.setAttribute("aria-pressed", "true");
      tabA.setAttribute("tabindex", "0");
    } else {
      tabA.classList.remove("active");
      tabA.setAttribute("aria-selected", "false");
      tabA.setAttribute("aria-pressed", "false");
      tabA.setAttribute("tabindex", "-1");
    }
  }

  if (tabB) {
    if (!isA) {
      tabB.classList.add("active");
      tabB.setAttribute("aria-selected", "true");
      tabB.setAttribute("aria-pressed", "true");
      tabB.setAttribute("tabindex", "0");
    } else {
      tabB.classList.remove("active");
      tabB.setAttribute("aria-selected", "false");
      tabB.setAttribute("aria-pressed", "false");
      tabB.setAttribute("tabindex", "-1");
    }
  }

  scrollIntoViewIfAbove("insp-confirm-toggle");
}

/**
 * Handles keyboard navigation (ArrowLeft/ArrowRight, Home/End, Enter/Space) for Confirmation switch tabs.
 * @param {KeyboardEvent} e
 */
function handleInspConfirmTabKeydown(e) {
  const tabA = $("insp-confirm-tab-a");
  const tabB = $("insp-confirm-tab-b");
  if (!tabA || !tabB) return;

  const key = e.key;
  if (key === "ArrowRight" || key === "ArrowLeft") {
    e.preventDefault();
    if (document.activeElement === tabA) {
      tabB.focus();
    } else {
      tabA.focus();
    }
  } else if (key === "Home") {
    e.preventDefault();
    tabA.focus();
  } else if (key === "End") {
    e.preventDefault();
    tabB.focus();
  } else if (key === "Enter" || key === " " || key === "Spacebar") {
    e.preventDefault();
    if (document.activeElement === tabB) {
      setInspConfirmView("customer");
    } else if (document.activeElement === tabA) {
      setInspConfirmView("summary");
    }
  }
}

/**
 * Generates HTML for Step 3 Confirmation form.
 * Split into two views toggled by segmented switch buttons directly below title/subtitle:
 * View A: "Summary" -> 5 review cards (and ECU/OBD diagnostic card if present) plus Accounting Total card.
 * View B: "Customer" -> Customer Details panel with customer inputs, totals, and confirm buttons.
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

  const physParts = [];
  if (counts.fix > 0) physParts.push(`${counts.fix} Fix`);
  if (counts.watch > 0) physParts.push(`${counts.watch} Watch`);
  const physText = physParts.length > 0 ? physParts.join(" · ") : "All inspected items OK.";
  const countsText = `${physText} · ${obdCodes.length} code${obdCodes.length === 1 ? "" : "s"}`;

  const isA = inspConfirmView !== "customer";

  return `
    <div class="insp-stage-body">
      <div style="margin-bottom:16px">
        <h3 style="margin:0 0 4px">Confirmation</h3>
        <p style="margin:0;color:var(--text-muted);font-size:13px">Review the details, add the customer, then send this job to Active Repairs.</p>
      </div>

      <!-- Segmented switch for Step 3 views -->
      <div
        class="tab-switch-bar"
        id="insp-confirm-toggle"
        role="tablist"
        aria-label="Confirmation sections"
        onkeydown="handleInspConfirmTabKeydown(event)"
      >
        <button
          type="button"
          id="insp-confirm-tab-a"
          class="tab-switch-btn ${isA ? "active" : ""}"
          role="tab"
          aria-selected="${isA ? "true" : "false"}"
          aria-pressed="${isA ? "true" : "false"}"
          aria-controls="insp-confirm-panel-a"
          tabindex="${isA ? "0" : "-1"}"
          onclick="setInspConfirmView('summary')"
        >
          Summary
        </button>
        <button
          type="button"
          id="insp-confirm-tab-b"
          class="tab-switch-btn ${!isA ? "active" : ""}"
          role="tab"
          aria-selected="${!isA ? "true" : "false"}"
          aria-pressed="${!isA ? "true" : "false"}"
          aria-controls="insp-confirm-panel-b"
          tabindex="${!isA ? "0" : "-1"}"
          onclick="setInspConfirmView('customer')"
        >
          Customer
        </button>
      </div>

      <!-- View A Panel: Summary Review Cards -->
      <div
        id="insp-confirm-panel-a"
        role="tabpanel"
        aria-labelledby="insp-confirm-tab-a"
        ${isA ? "" : "hidden"}
        style="${isA ? "display:block" : "display:none"}"
      >
        <!-- 1. Vehicle & Complaints Card -->
        <div class="confirm-summary-card">
          <div class="confirm-card-header">
            <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Vehicle &amp; Complaints</span>
            <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(1)">Edit</a>
          </div>
          <div style="font-size:13px;line-height:1.6">
            <div><b>Plate:</b> ${escHtml(inspDraft.plate || "NO PLATE")}</div>
            <div><b>Make &amp; Model:</b> ${escHtml([inspDraft.make, inspDraft.model].filter(Boolean).join(" ") || "Unknown")}</div>
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

        <!-- 3. ECU / OBD Diagnostic Codes Card (Hidden when none) -->
        ${obdCodes.length > 0 ? `
          <div class="confirm-summary-card">
            <div class="confirm-card-header">
              <span style="font-weight:700;font-size:13px;color:var(--text-primary)">ECU / OBD Diagnostic Codes (${obdCodes.length})</span>
              <a href="javascript:void(0)" class="insp-edit-link" onclick="setInspDraftStep(2)">Edit</a>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px">
              ${obdCodes.map((c) => getObdCodeSummaryDisplayHtml(c)).join("")}
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

        <!-- 6. Accounting Total Card -->
        <div class="confirm-summary-card">
          <div class="confirm-card-header">
            <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Accounting Total</span>
          </div>
          <div class="ticket-totals-block" style="margin-bottom:0">
            <div class="ticket-totals-row">
              <span>Labor Subtotal</span>
              <span style="font-weight:600">${P(draftTotals.labor || 0)}</span>
            </div>
            <div class="ticket-totals-row">
              <span>Parts Subtotal</span>
              <span style="font-weight:600">${P(draftTotals.parts || 0)}</span>
            </div>
            <div class="ticket-totals-divider"></div>
            <div class="ticket-totals-row total">
              <span>Estimated Total</span>
              <span class="ticket-total-val">${P(draftTotals.total || 0)}</span>
            </div>
          </div>
        </div>

        <!-- Summary Footer Buttons -->
        <div class="insp-footer" style="position:static;padding-top:20px;border-top:1px solid var(--border);display:flex;justify-content:space-between">
          <button type="button" class="btn g" onclick="setInspDraftStep(2)">← Back</button>
          <button type="button" class="btn" onclick="setInspConfirmView('customer')">Next: Customer →</button>
        </div>
      </div>

      <!-- View B Panel: Customer -->
      <div
        id="insp-confirm-panel-b"
        role="tabpanel"
        aria-labelledby="insp-confirm-tab-b"
        ${!isA ? "" : "hidden"}
        style="${!isA ? "display:block" : "display:none"}"
      >
        <div class="confirm-sticky-ticket" style="max-width:640px;position:static">
          <div class="confirm-card-header" style="margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #F1F5F9">
            <span style="font-weight:700;font-size:13px;color:var(--text-primary)">Customer Details</span>
          </div>

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
            </div>
          </div>

          <div class="ticket-cust-fields">
            <div>
              <label class="ticket-label" for="insp-cust-name">
                CUSTOMER NAME <span style="font-size:10px;font-weight:400;color:var(--text-muted);text-transform:none">(optional)</span>
              </label>
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
              <label class="ticket-label" for="insp-cust-phone">
                CONTACT NUMBER <span style="font-size:10px;font-weight:400;color:var(--text-muted);text-transform:none">(optional)</span>
              </label>
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
            ${countsText}
          </div>

          <!-- Totals Block -->
          <div class="ticket-totals-block" style="margin-bottom:0">
            <div class="ticket-totals-row">
              <span>Labor Subtotal</span>
              <span style="font-weight:600">${P(draftTotals.labor || 0)}</span>
            </div>
            <div class="ticket-totals-row">
              <span>Parts Subtotal</span>
              <span style="font-weight:600">${P(draftTotals.parts || 0)}</span>
            </div>
            <div class="ticket-totals-divider"></div>
            <div class="ticket-totals-row total">
              <span>Estimated Total</span>
              <span class="ticket-total-val">${P(draftTotals.total || 0)}</span>
            </div>
          </div>

          <div class="ticket-send-note">
            Confirming sends this job to Active Repairs with status Awaiting Parts/Approval.
          </div>

          <!-- Actions -->
          <div style="margin-top:16px">
            <button
              type="button"
              class="btn"
              id="btn-confirm-job-order"
              style="width:100%;min-height:44px;justify-content:center;margin-bottom:8px;font-weight:700"
              onclick="confirmInspectionJobOrder()"
            >
              Confirm &amp; Send to Active Repairs
            </button>
            <button
              type="button"
              class="btn g"
              id="btn-back-to-diagnosis"
              style="width:100%;min-height:40px;justify-content:center"
              onclick="setInspDraftStep(2)"
            >
              ← Back
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
  syncDraftObdBike();

  const rawPlate = (inspDraft.plate || "").trim();
  const rawMake = (inspDraft.make || "").trim();
  const rawModel = (inspDraft.model || "").trim();
  const rawCustName = (inspDraft.custName || "").trim();
  const rawCustPhone = (inspDraft.custPhone || "").trim();

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
      year: "",
      plate: plate
    };
    D.bk.push(b);
  } else {
    b.cid = c.id;
    if (rawMake) b.make = rawMake;
    if (rawModel) b.model = rawModel;
  }

  // 3. Work order object
  const complaints = Array.isArray(inspDraft.complaints) ? [...inspDraft.complaints] : [];
  const notes = (inspDraft.notes || "").trim();
  const compText = complaints.join(", ");
  const combinedNotes = compText + (notes ? (compText ? " · " : "") + notes : "");
  const wo = {
    id: uid(),
    bid: b.id,
    mech: "", // New jobs start with an empty mech for every role
    st: "Awaiting Parts/Approval", // per Part 5
    sv: [],
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
  const name = c && c.name ? c.name.toLowerCase() : (o.customer ? o.customer.toLowerCase() : "");
  const phone = c && c.phone ? c.phone.toLowerCase() : "";
  const txnId = getTxnId(o).toLowerCase();
  const jo = (o.type === "QUICK LABOR" || o.type === "quicklabor") ? "" : getJobNumber(o).toLowerCase();
  const wid = o.id ? o.id.toLowerCase() : "";
  const model = b ? `${b.make || ""} ${b.model || ""}`.toLowerCase() : (o.vehicleLine ? o.vehicleLine.toLowerCase() : "");
  const mech = o.mech ? o.mech.toLowerCase() : "";

  return (
    plate.includes(q) ||
    name.includes(q) ||
    phone.includes(q) ||
    txnId.includes(q) ||
    jo.includes(q) ||
    wid.includes(q) ||
    model.includes(q) ||
    mech.includes(q)
  );
}

/**
 * Filters all work orders for Transactions & Billing based on active filter and search text.
 * @param {string} [filter=billFilter] - "all", "adv", "final", "done" (also accepts legacy "advances", "settlement", "completed").
 * @returns {Array<Object>} Filtered list of work orders.
 */
function getFilteredBillOrders(filter = billFilter) {
  const q = billSearch.trim().toLowerCase().replace(/\s+/g, " ");
  return D.wo.filter((o) => {
    if (filter === "all") {
      if (o.st === "Completed") return false;
    } else if (filter === "adv" || filter === "advances") {
      const advTotal = getAdvancesTotal(o);
      if (o.st === "Completed" || o.st === "Ready for Pickup" || advTotal > 0) return false;
    } else if (filter === "final" || filter === "settlement") {
      if (o.st !== "Ready for Pickup") return false;
    } else if (filter === "done" || filter === "completed") {
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
    <h1 class="sr-only">Transactions &amp; Billing</h1>

    <!-- Live Search Toolbar -->
    <div class="rep-search-wrap">
      <span class="search-icon" onclick="$('bill-search-input').focus()" title="Search">${LINE_ICONS.insp}</span>
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
    <div id="bill-chips" class="bill-chips">${getBillChipsHtml()}</div>

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
  updateBillChipsDom();
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
  updateBillChipsDom();
  const resEl = $("bill-results");
  if (resEl) resEl.innerHTML = getBillResultsHtml();
}

/** Configuration for Transactions & Billing filter chips. */
const BILL_CHIPS = [
  { key: "all", label: "All Active", modifier: "all" },
  { key: "adv", label: "Pending Advances", modifier: "adv" },
  { key: "final", label: "Pending Final Settlement", modifier: "final" },
  { key: "done", label: "Completed Transactions", modifier: "done" }
];

/**
 * Updates class, aria-pressed, checkmark, and count on all four Transactions & Billing filter chips by filter key.
 */
function updateBillChipsDom() {
  let allFound = true;
  BILL_CHIPS.forEach((c) => {
    const el = $(`bill-chip-${c.modifier}`);
    if (!el) {
      allFound = false;
      return;
    }
    const isSelected = billFilter === c.key ||
      (c.key === "adv" && billFilter === "advances") ||
      (c.key === "final" && billFilter === "settlement") ||
      (c.key === "done" && billFilter === "completed");
    const count = getFilteredBillOrders(c.key).length;
    const checkMark = isSelected ? `<span class="bill-chip-check" aria-hidden="true">✓ </span>` : "";

    el.className = `bill-chip bill-chip--${c.modifier}${isSelected ? " is-selected" : ""}`;
    el.setAttribute("aria-pressed", isSelected ? "true" : "false");
    el.innerHTML = `${checkMark}${c.label} <span class="bill-chip-count">(${count})</span>`;
  });

  if (!allFound) {
    const chipsEl = $("bill-chips");
    if (chipsEl) chipsEl.innerHTML = getBillChipsHtml();
  }
}

/**
 * Sets active filter chip tab in Transactions & Billing.
 * Updates the chip row (including counts) and the results container, but never the search input.
 * @param {string} f - Filter key ("all" | "adv" | "final" | "done").
 */
function setBillFilter(f) {
  if (f === "advances") f = "adv";
  if (f === "settlement") f = "final";
  if (f === "completed") f = "done";
  billFilter = f;
  updateBillChipsDom();
  const resEl = $("bill-results");
  if (resEl) resEl.innerHTML = getBillResultsHtml();
}

/**
 * Refreshes dynamic chips and table in Transactions & Billing if currently active.
 */
function refreshBillView() {
  if (view === "bill") {
    updateBillChipsDom();
    const resEl = $("bill-results");
    if (resEl) resEl.innerHTML = getBillResultsHtml();
  }
}

/**
 * Builds HTML for Transactions & Billing filter chips with dynamic counts.
 * @returns {string} HTML string.
 */
function getBillChipsHtml() {
  return BILL_CHIPS
    .map((c) => {
      const isSelected = billFilter === c.key ||
        (c.key === "adv" && billFilter === "advances") ||
        (c.key === "final" && billFilter === "settlement") ||
        (c.key === "done" && billFilter === "completed");
      const count = getFilteredBillOrders(c.key).length;
      const checkMark = isSelected ? `<span class="bill-chip-check" aria-hidden="true">✓ </span>` : "";
      return `<button type="button" id="bill-chip-${c.modifier}" class="bill-chip bill-chip--${c.modifier}${
        isSelected ? " is-selected" : ""
      }" aria-pressed="${isSelected ? "true" : "false"}" onclick="setBillFilter('${c.key}')">${checkMark}${c.label} <span class="bill-chip-count">(${count})</span></button>`;
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

              const isQuickLabor = o.type === "QUICK LABOR" || o.type === "quicklabor";
              const typeBadge = isQuickLabor ? `QUICK LABOR · ${getQuickLaborSubtypeLabel(o)}` : "REPAIR SERVICE";
              const typeClass = isQuickLabor ? "badge-txn-type ql" : "badge-txn-type";
              const dateLine = isQuickLabor
                ? formatJobDate(o.done || o.at)
                : `${jo} · ${formatJobDate(o.done || o.at)}`;

              return `
                <tr>
                  <td>
                    <b>${txnId}</b>
                    <br><span class="${typeClass}">${typeBadge}</span>
                    <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${dateLine}</div>
                  </td>
                  <td>
                    <b>${c ? escHtml(c.name) : (o.customer ? escHtml(o.customer) : "Walk-in Customer")}</b>
                    <div style="font-size:12px;color:var(--text-secondary)">${c && c.phone ? escHtml(c.phone) : "—"}</div>
                    <div style="font-size:12px;font-weight:600;margin-top:2px">${b ? escHtml(b.plate) : (o.vehicleLine ? escHtml(o.vehicleLine) : "Walk-in Motorcycle")}${b ? ` · ${escHtml(b.make + " " + b.model)}` : ""}</div>
                    ${(o.mech && o.mech !== "Unassigned") ? `<div style="font-size:11px;color:var(--text-muted)">Marked by: ${escHtml(o.mech)}</div>` : ""}
                  </td>
                  <td>
                    <div style="font-weight:700;font-size:14px">${P(brk.total)} <span style="font-size:11px;font-weight:500;color:var(--text-muted)">${totalLabel}</span></div>
                    ${advances > 0 ? `<div style="font-size:11px;color:var(--success)">Advances: ${P(advances)}</div>` : ""}
                    ${o.st !== "Completed" ? `<div style="font-size:12px;font-weight:700;color:${balanceDue > 0 ? "var(--text)" : "var(--success)"};margin-top:2px">Due: ${P(balanceDue)}</div>` : ""}
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
        <div><b>Previous Advances:</b> <span style="color:var(--success);font-weight:700">${P(advancesTotal)}</span></div>
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
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:var(--success)">
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
                  style="flex:1;${method === m ? "background:var(--accent);color:#FFFFFF;border-color:var(--accent);font-weight:700" : ""}"
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
          <div id="settle-change-display" style="padding:12px;border-radius:8px;background:${isSufficient ? "var(--success-soft)" : "var(--danger-soft)"};border:1px solid ${isSufficient ? "var(--success-border)" : "var(--danger-border)"};margin-top:12px">
            ${
              isSufficient
                ? `<div style="color:var(--success);font-size:14px;font-weight:700">Change: <b>${P(diff)}</b></div>`
                : `<div style="color:var(--danger);font-size:14px;font-weight:700">Short by ${P(Math.abs(diff))}</div>`
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
            <span style="display:inline-flex;align-items:center;margin-right:6px">${ICONS.print}</span>Print / View Digital Receipt
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
    displayEl.style.background = isSufficient ? "var(--success-soft)" : "var(--danger-soft)";
    displayEl.style.borderColor = isSufficient ? "var(--success-border)" : "var(--danger-border)";
    displayEl.innerHTML = isSufficient
      ? `<div style="color:var(--success);font-size:14px;font-weight:700">Change: <b>${P(diff)}</b></div>`
      : `<div style="color:var(--danger);font-size:14px;font-weight:700">Short by ${P(Math.abs(diff))}</div>`;
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
    ${o.reversed ? `
      <div style="background:#FEF2F2;border:2px solid #EF4444;border-radius:8px;padding:12px;margin-bottom:16px;text-align:center">
        <div style="color:#DC2626;font-size:16px;font-weight:900;letter-spacing:0.08em;margin-bottom:4px">*** REVERSED ***</div>
        <div style="font-size:12px;color:#991B1B"><b>Reason:</b> ${escHtml(o.reversed.reason || "Transaction reversed")}</div>
        <div style="font-size:11px;color:#7F1D1D;margin-top:2px">${escHtml(o.reversed.at)} · by ${escHtml(o.reversed.by || "Super Admin")}</div>
      </div>
    ` : ""}
    <div style="text-align:center;margin-bottom:20px;border-bottom:1px solid var(--border);padding-bottom:16px">
      <div style="display:flex;justify-content:center;margin-bottom:4px;color:var(--text)">${ICONS.bike}</div>
      <h2 style="margin:4px 0 2px;font-size:22px;color:var(--text)">MotoShop</h2>
      <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">${(o.type === "QUICK LABOR" || o.type === "quicklabor") ? `Quick Fix Receipt · ${escHtml(getQuickLaborSubtypeLabel(o))}` : "Official Repair &amp; Service Receipt"}</div>
      <div style="font-size:13px;font-weight:700;color:var(--accent);margin-top:6px">${(o.type === "QUICK LABOR" || o.type === "quicklabor") ? (o.no || o.txnId || getTxnId(o)) : jo}</div>
      <div style="font-size:11px;color:var(--text-muted)">${formatJobDate(pay.paidAt || today())} · ${formatJobTime(pay.paidAt || "")}</div>
    </div>

    <!-- Vehicle & Customer Meta -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;font-size:12px;background:var(--bg-subtle);padding:12px;border-radius:8px;border:1px solid var(--border)">
      <div>
        <div style="color:var(--text-muted);font-weight:600">CUSTOMER</div>
        <div style="font-weight:700;color:var(--text-primary)">${c ? escHtml(c.name) : (o.customer ? escHtml(o.customer) : "Walk-in Customer")}</div>
        <div style="color:var(--text-secondary)">${c ? escHtml(c.phone) : "—"}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">MOTORCYCLE</div>
        <div style="font-weight:700;color:var(--text-primary)">${b ? escHtml(b.plate) : (o.vehicleLine ? escHtml(o.vehicleLine) : "Walk-in Motorcycle")}</div>
        <div style="color:var(--text-secondary)">${b ? escHtml(b.make + " " + b.model) : ""}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">MARKED BY</div>
        <div style="font-weight:700;color:var(--text-primary)">${escHtml((o.mech && o.mech !== "Unassigned") ? o.mech : "-")}</div>
      </div>
      <div>
        <div style="color:var(--text-muted);font-weight:600">STATUS</div>
        <div>
          ${badge(o.st)}
          ${(o.type === "QUICK LABOR" || o.type === "quicklabor") ? `<span class="badge" style="font-size:10px;font-weight:700;margin-left:4px">${escHtml(getQuickLaborSubtypeLabel(o))}</span>` : ""}
        </div>
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
          ? `<div style="display:flex;justify-content:space-between;color:var(--success)">
              <span>Discount</span>
              <span>-${P(brk.discount)}</span>
            </div>`
          : ""
      }
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;border-top:1px solid var(--border);padding-top:6px;margin-top:4px">
        <span>Total Paid</span>
        <span>${o.reversed ? `<span class="text-struck">${P(brk.total)}</span>` : P(brk.total)}</span>
      </div>
    </div>

    <div style="background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-top:14px;font-size:12px">
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
      <button type="button" class="btn" onclick="window.print()"><span style="display:inline-flex;align-items:center;margin-right:6px">${ICONS.print}</span>Print Receipt</button>
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
 * Returns filtered user accounts matching search query.
 * @returns {Array<Object>} Filtered list of user accounts.
 */
function getFilteredUsers() {
  const users = loadUsers();
  const q = (userSearch || "").trim().toLowerCase();
  if (!q) return users;
  return users.filter((u) => {
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
    return `<span class="um-role-badge superadmin"><span style="display:inline-flex;align-items:center">${LINE_ICONS.users}</span> SUPER ADMIN</span>`;
  }
  if (role === "admin") {
    return `<span class="um-role-badge admin"><span style="display:inline-flex;align-items:center">${ICONS.crown}</span> ADMIN</span>`;
  }
  return `<span class="um-role-badge mechanic"><span style="display:inline-flex;align-items:center">${LINE_ICONS.rep}</span> MECHANIC</span>`;
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
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="22" y1="11" x2="16" y2="11"></line></svg>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><polyline points="16 11 18 13 22 9"></polyline></svg>`
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
      <div id="user-form-error" style="display:none;color:var(--danger);font-size:13px;background:var(--danger-soft);border:1px solid var(--danger-border);padding:8px 12px;border-radius:8px"></div>

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
    const oldRole = target.role;
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

            const isSuperLocked = key === "users" || key === "dash" || key === "audit";
            const isAdminLocked = key === "dash";
            const isMechLocked = key === "audit";

            const hasSuper = superNav.includes(key);
            const hasAdmin = adminNav.includes(key);
            const hasMech = mechNav.includes(key);

            return `
              <tr>
                <td>
                  <div style="display:flex;align-items:center;gap:10px;font-weight:700">
                    <span style="display:inline-flex;align-items:center;color:var(--text)">${ICONS[key] || icon}</span>
                    <span>${label}</span>
                  </div>
                </td>
                <td>
                  <label class="matrix-check-wrap" title="${isSuperLocked ? (key === "users" ? "Super Admin must always have access to User Management." : key === "audit" ? "Super Admin must always have access to Audit." : "Super Admin must always have access to Dashboard.") : ""}">
                    <input
                      type="checkbox"
                      class="matrix-check"
                      ${hasSuper ? "checked" : ""}
                      ${isSuperLocked ? "disabled" : ""}
                      onchange="toggleMatrixPermission('superadmin', '${key}', this.checked)"
                    />
                    ${isSuperLocked ? `<span style="display:inline-flex;align-items:center;color:var(--text-muted)" title="Locked permission">${ICONS.lock}</span>` : ""}
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
                    ${isAdminLocked ? `<span style="display:inline-flex;align-items:center;color:var(--text-muted)" title="Locked permission">${ICONS.lock}</span>` : ""}
                  </label>
                </td>
                <td>
                  <label class="matrix-check-wrap" title="${isMechLocked ? "Audit is not available to Mechanics." : ""}">
                    <input
                      type="checkbox"
                      class="matrix-check"
                      ${hasMech && !isMechLocked ? "checked" : ""}
                      ${isMechLocked ? "disabled" : ""}
                      onchange="toggleMatrixPermission('mechanic', '${key}', this.checked)"
                    />
                    ${isMechLocked ? `<span style="display:inline-flex;align-items:center;color:var(--text-muted)" title="Audit is not available to Mechanics.">${ICONS.lock}</span>` : ""}
                  </label>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>

      <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div>
          <p style="margin:0 0 4px;font-size:13px;color:var(--text-muted);font-style:italic">
            POS includes Quick Sales, Quick Labor, and Transactions &amp; Billing. The 'Quick Labor' row opens the Quick Labor tab only.
          </p>
          <p style="margin:0;font-size:13px;color:var(--text-muted);font-style:italic">
            This controls which pages each role can open. It hides pages in the browser only and is not real security.
          </p>
        </div>
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
  if (role === "superadmin" && (pageKey === "users" || pageKey === "dash" || pageKey === "audit")) return;
  if (role === "admin" && pageKey === "dash") return;
  if (role === "mechanic" && pageKey === "audit") return;

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
  currentNav._q = 1;
  currentNav._p = 1;
  currentNav._a = 1;

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
        <span style="display:inline-flex;align-items:center">${LINE_ICONS.cust}</span> User Directory
      </button>
      <button
        type="button"
        role="tab"
        id="um-tab-matrix"
        class="um-tab ${!isDirectory ? "active" : ""}"
        aria-selected="${!isDirectory ? "true" : "false"}"
        onclick="setUserMgmtTab('matrix')"
      >
        <span style="display:inline-flex;align-items:center">${LINE_ICONS.users}</span> Permissions Matrix
      </button>
    </div>

    ${isDirectory ? `
      <!-- Toolbar -->
      <div class="um-toolbar">
        <div class="um-toolbar-left">
          <div class="um-search-wrap">
            <span class="um-search-icon" style="display:inline-flex;align-items:center">${LINE_ICONS.insp}</span>
            <input
              id="user-search-input"
              class="um-search-input"
              type="text"
              placeholder="Search by Name or Username..."
              value="${escHtml(userSearch)}"
              oninput="onUserSearchInput(this.value)"
            />
          </div>
        </div>

        <button type="button" class="btn-add-user" onclick="openAddUserModal()">
          <span style="display:inline-flex;align-items:center">${ICONS.userPlus}</span> Add New User
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
   REPORTS
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
 * Ignores reversed, cancelled, and void records.
 * Incorporates job orders, Quick Sales, and Quick Labor records.
 * @param {string} period - Active filter period.
 * @returns {Object} Calculated metrics.
 */
function getReportMetrics(period = reportPeriod) {
  const completedJobs = (Array.isArray(D.wo) ? D.wo : []).filter(
    (o) => isCountableJob(o) && !isQuickLaborRecord(o) && o.st === "Completed" && inDateRange(o.done || o.at, period)
  );

  const quickLaborInPeriod = (Array.isArray(D.wo) ? D.wo : []).filter(
    (o) => isCountableQuickLabor(o) && inDateRange(o.doneAt || o.done || o.markedAt || o.at || "", period)
  );

  let jobRevenue = 0;
  let jobLabor = 0;
  let jobParts = 0;

  completedJobs.forEach((o) => {
    jobRevenue += total(o);
    const orderLines = lines(o);
    orderLines.forEach((l) => {
      if (l.kind === "labor") {
        jobLabor += (l.a || 0);
      } else if (l.kind === "part") {
        jobParts += (l.a || 0);
      }
    });
  });

  let qlRevenue = 0;
  let qlLabor = 0;
  let qlParts = 0;

  quickLaborInPeriod.forEach((o) => {
    qlRevenue += (Number(o.total) || total(o) || 0);
    const orderLines = lines(o);
    orderLines.forEach((l) => {
      if (l.kind === "labor") {
        qlLabor += (l.a || 0);
      } else if (l.kind === "part") {
        qlParts += (l.a || 0);
      }
    });
  });

  const jobsCompletedCount = completedJobs.length;
  const avgJobValue = jobsCompletedCount > 0 ? (jobRevenue / jobsCompletedCount) : 0;

  return {
    revenue: jobRevenue + qlRevenue,
    labor: jobLabor + qlLabor,
    parts: jobParts + qlParts,
    completed: jobsCompletedCount,
    avgValue: avgJobValue,
    completedJobs: completedJobs,
    quickLaborRecords: quickLaborInPeriod,
    quickLaborTotal: qlRevenue,
    quickLaborCount: quickLaborInPeriod.length
  };
}

/**
 * Exports report summary numbers and completed jobs into a clean CSV file with UTF-8 BOM.
 * For Super Admin: includes Gross Profit and Mechanic Commission breakdown.
 * Excludes reversed, cancelled, and void records.
 */
function exportReportCsv() {
  const metrics = getReportMetrics(reportPeriod);
  const periodLabel = getReportPeriodLabel(reportPeriod);
  const todayStr = today();

  const periodSales = (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => isCountableSale(s) && inDateRange(s.at ? s.at.slice(0, 10) : "", reportPeriod)
  );
  const posSalesTotal = periodSales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const posSalesCount = periodSales.length;

  const escapeCsv = (str) => `"${String(str || "").replace(/"/g, '""')}"`;

  const summaryLines = [
    ["Reports", ""],
    ["Period", periodLabel],
    ["Generated On", todayStr],
    ["Total Revenue (PHP)", metrics.revenue],
    ["Labor Earnings (PHP)", metrics.labor],
    ["Parts Billed (PHP)", metrics.parts],
    ["Quick Sales Total", posSalesTotal],
    ["Quick Sales Count", posSalesCount],
    ["Quick Labor Total", metrics.quickLaborTotal],
    ["Quick Labor Count", metrics.quickLaborCount],
    ["Jobs Completed", metrics.completed],
    ["Average Job Value (PHP)", Math.round(metrics.avgValue)]
  ];

  // Top 8 Most Labor Done for CSV
  const laborCountsForCsv = {};
  const allLaborOrdersForCsv = [...metrics.completedJobs, ...(metrics.quickLaborRecords || [])];
  allLaborOrdersForCsv.forEach((o) => {
    const orderLines = lines(o);
    orderLines.forEach((l) => {
      if (l.kind === "labor") {
        const rawName = (l.rawName || l.n || l.name || "").replace(/\s*\(labor\)$/i, "").trim();
        if (rawName) {
          const key = rawName.toLowerCase();
          const qty = Math.max(1, Number(l.qty) || 1);
          const rev = Number(l.a) || 0;
          if (!laborCountsForCsv[key]) {
            laborCountsForCsv[key] = { name: rawName, count: 0, revenue: 0 };
          }
          laborCountsForCsv[key].count += qty;
          laborCountsForCsv[key].revenue += rev;
        }
      }
    });
  });
  const topLaborForCsv = Object.values(laborCountsForCsv)
    .sort((a, b) => b.count - a.count || b.revenue - a.revenue)
    .slice(0, 8);

  topLaborForCsv.forEach((item) => {
    summaryLines.push(["Most Labor Done", item.name, item.count, item.revenue]);
  });

  const encodedSummary = summaryLines.map((row) => row.map(escapeCsv).join(","));

  const jobHeaders = [
    "Job ID",
    "Job Number",
    "Completion Date",
    "Completion Time",
    "Plate Number",
    "Motorcycle",
    "Customer Name",
    "Customer Phone",
    "Marked By",
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
    const mech = (o.mech && o.mech !== "Unassigned") ? o.mech : "-";
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
    ...encodedSummary,
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
 * Builds HTML for report KPI cards, mechanic table, top complaints, and fault codes.
 * For Super Admin: includes GROSS PROFIT KPI card and Mechanic Commission card.
 * @returns {string} HTML string.
 */
function getReportResultsHtml() {
  const metrics = getReportMetrics(reportPeriod);

  // 1. Staff Performance calculation (includes Admin, Super Admin, and any account that marked work)
  const users = loadUsers();
  const activeMechs = users.filter((u) => u.role === "mechanic" && u.active !== false);
  const qlRecords = Array.isArray(metrics.quickLaborRecords) ? metrics.quickLaborRecords : [];

  // Collect distinct staff names: active mechanics plus any account that marked work in period
  const staffNamesMap = new Map();
  activeMechs.forEach((m) => {
    const trimmed = (m.name || "").trim();
    if (trimmed) staffNamesMap.set(trimmed.toLowerCase(), trimmed);
  });
  metrics.completedJobs.forEach((o) => {
    const rawMech = (o.mech || "").trim();
    if (rawMech && rawMech.toLowerCase() !== "unassigned") {
      if (!staffNamesMap.has(rawMech.toLowerCase())) {
        staffNamesMap.set(rawMech.toLowerCase(), rawMech);
      }
    }
  });
  qlRecords.forEach((o) => {
    const rawMech = (o.mech || "").trim();
    if (rawMech && rawMech.toLowerCase() !== "unassigned") {
      if (!staffNamesMap.has(rawMech.toLowerCase())) {
        staffNamesMap.set(rawMech.toLowerCase(), rawMech);
      }
    }
  });

  const mechRows = Array.from(staffNamesMap.values()).map((name) => {
    const lowerName = name.toLowerCase();
    const compJobs = metrics.completedJobs.filter((o) => o.mech && o.mech.trim().toLowerCase() === lowerName);
    const compQl = qlRecords.filter((o) => o.mech && o.mech.trim().toLowerCase() === lowerName);
    const jobRev = compJobs.reduce((sum, o) => sum + total(o), 0);
    const qlRev = compQl.reduce((sum, o) => sum + (Number(o.total) || total(o) || 0), 0);
    return {
      name: name,
      completed: compJobs.length + compQl.length,
      revenue: jobRev + qlRev
    };
  });

  // Not recorded row for unassigned/empty names
  const unassignedCompJobs = metrics.completedJobs.filter((o) => !o.mech || !o.mech.trim() || o.mech.trim().toLowerCase() === "unassigned");
  const unassignedQl = qlRecords.filter((o) => !o.mech || !o.mech.trim() || o.mech.trim().toLowerCase() === "unassigned");
  const unassignedJobRev = unassignedCompJobs.reduce((sum, o) => sum + total(o), 0);
  const unassignedQlRev = unassignedQl.reduce((sum, o) => sum + (Number(o.total) || total(o) || 0), 0);

  mechRows.push({
    name: "Not recorded",
    completed: unassignedCompJobs.length + unassignedQl.length,
    revenue: unassignedJobRev + unassignedQlRev
  });

  mechRows.sort((a, b) => b.completed - a.completed || b.revenue - a.revenue);

  // 2. Most Labor Done (top 8 across completed jobs and quick labor records)
  const laborCounts = {};
  const allLaborOrders = [...metrics.completedJobs, ...qlRecords];
  allLaborOrders.forEach((o) => {
    const orderLines = lines(o);
    orderLines.forEach((l) => {
      if (l.kind === "labor") {
        const rawName = (l.rawName || l.n || l.name || "").replace(/\s*\(labor\)$/i, "").trim();
        if (rawName) {
          const key = rawName.toLowerCase();
          const qty = Math.max(1, Number(l.qty) || 1);
          const rev = Number(l.a) || 0;
          if (!laborCounts[key]) {
            laborCounts[key] = { name: rawName, count: 0, revenue: 0 };
          }
          laborCounts[key].count += qty;
          laborCounts[key].revenue += rev;
        }
      }
    });
  });

  const topLabor = Object.values(laborCounts)
    .sort((a, b) => b.count - a.count || b.revenue - a.revenue)
    .slice(0, 8);
  const maxLaborCount = Math.max(...topLabor.map((x) => x.count), 1);

  // 3. Top Customer Complaints
  const jobsCreatedInPeriod = D.wo.filter((o) => isCountableJob(o) && inDateRange(o.at, reportPeriod));
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

  const periodSales = (Array.isArray(D.sales) ? D.sales : []).filter(
    (s) => isCountableSale(s) && inDateRange(s.at ? s.at.slice(0, 10) : "", reportPeriod)
  );
  const posSalesTotal = periodSales.reduce((acc, s) => acc + (Number(s.total) || 0), 0);
  const posSalesCount = periodSales.length;

  const stat = (i, bg, l, n, t) =>
    `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${n}</b>${t}</div></div>`;

  return `
    <!-- KPI Row -->
    <div class="reports-kpi-grid">
      ${stat(ICONS.money, "", "REVENUE", P(metrics.revenue), "Paid in period")}
      ${stat(LINE_ICONS.rep, "", "LABOR EARNINGS", P(metrics.labor), "From services")}
      ${stat(LINE_ICONS.cat, "", "PARTS BILLED", P(metrics.parts), "From items/fluids")}
      ${stat(LINE_ICONS.pos, "", "QUICK SALES", P(posSalesTotal), `${posSalesCount} sale${posSalesCount === 1 ? "" : "s"}`)}
      ${stat(LINE_ICONS.ql, "", "QUICK LABOR", P(metrics.quickLaborTotal), `${metrics.quickLaborCount} record${metrics.quickLaborCount === 1 ? "" : "s"}`)}
      ${stat(ICONS.checkCircle, "", "JOBS COMPLETED", metrics.completed, "In period")}
      ${stat(LINE_ICONS.reports, "", "AVERAGE JOB VALUE", P(Math.round(metrics.avgValue)), "Per completed job")}
    </div>

    <!-- Analytics Cards Grid -->
    <div class="reports-grid">
      <!-- Staff Performance (spans full width of 2-col grid) -->
      <div class="card reports-grid-wide">
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span>${LINE_ICONS.rep}</span><span>Staff Performance</span></div>
        ${mechRows.some((r) => r.completed > 0 || r.revenue > 0) ? `
          <div class="tw">
            <table>
              <thead>
                <tr>
                  <th>Marked by</th>
                  <th>JOBS COMPLETED</th>
                  <th class="r">REVENUE</th>
                </tr>
              </thead>
              <tbody>
                ${mechRows.map((r) => `
                  <tr>
                    <td><b>${escHtml(r.name)}</b></td>
                    <td><b>${r.completed}</b></td>
                    <td class="r" style="font-weight:700">${P(r.revenue)}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty">No staff activity yet.</div>
        `}
      </div>

      <!-- Most Labor Done (spans full width of 2-col grid) -->
      <div class="card reports-grid-wide">
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
          <span>${LINE_ICONS.rep}</span>
          <span>Most Labor Done</span>
        </div>
        ${topLabor.length ? `
          <div style="display:flex;flex-direction:column;gap:12px">
            ${topLabor.map((item, idx) => {
              const pct = Math.round((item.count / maxLaborCount) * 100);
              const countLabel = `${item.count} time${item.count === 1 ? "" : "s"}`;
              return `
                <div class="report-bar-row" style="margin-bottom:0">
                  <div class="report-bar-header" style="display:flex;align-items:center;justify-content:space-between;gap:8px">
                    <div style="display:flex;align-items:center;gap:8px;min-width:0">
                      <span style="font-size:12px;font-weight:700;color:var(--text-muted);min-width:20px">#${idx + 1}</span>
                      <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><b>${escHtml(item.name)}</b></span>
                    </div>
                    <div style="display:flex;align-items:center;gap:12px;flex-shrink:0">
                      <span style="font-size:13px;color:var(--text-secondary)">${countLabel}</span>
                      <b style="font-size:13px">${P(item.revenue)}</b>
                    </div>
                  </div>
                  <div class="report-bar-track" style="margin-top:6px">
                    <div class="report-bar-fill" style="width:${pct}%;background:var(--accent)"></div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        ` : `
          <div class="empty">No labor recorded in this period.</div>
        `}
      </div>

      <!-- Top Customer Complaints -->
      <div class="card">
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span>${ICONS.chat}</span><span>Top Customer Complaints</span></div>
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
                    <div class="report-bar-fill" style="width:${pct}%;background:var(--accent)"></div>
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
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span>${LINE_ICONS.pos}</span><span>Most Frequent Fault Codes</span></div>
        ${topCodes.length ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${topCodes.map((c) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="display:inline-block;padding:2px 6px;border-radius:4px;background:var(--danger-soft);color:var(--danger);border:1px solid var(--danger-border);font-weight:700;font-size:11px">${escHtml(c.code)}</span>
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
    </div>

      <!-- Top Customer Complaints -->
      <div class="card">
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span>${ICONS.chat}</span><span>Top Customer Complaints</span></div>
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
                    <div class="report-bar-fill" style="width:${pct}%;background:var(--accent)"></div>
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
        <div class="hd" style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><span>${LINE_ICONS.pos}</span><span>Most Frequent Fault Codes</span></div>
        ${topCodes.length ? `
          <div style="display:flex;flex-direction:column;gap:8px">
            ${topCodes.map((c) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px">
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="display:inline-block;padding:2px 6px;border-radius:4px;background:var(--danger-soft);color:var(--danger);border:1px solid var(--danger-border);font-weight:700;font-size:11px">${escHtml(c.code)}</span>
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
    </div>
  `;
}

/**
 * Generates the full HTML markup for the Reports view.
 * @returns {string} HTML markup string.
 */
function getReportsViewHtml() {
  return `
    <div class="card top">
      <div>
        <h1>Reports</h1>
        <p>Sales and job reports for the selected period.</p>
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
        <span style="display:inline-flex;align-items:center">${ICONS.download}</span> Export Report
      </button>
    </div>

    <!-- Report Results Container -->
    <div id="report-results-wrap">
      ${getReportResultsHtml()}
    </div>
  `;
}


/* ==========================================================
   AUDIT
   ========================================================== */

/** Active search query for Audit view. */
let auditSearch = "";

/** Active period filter for Audit view (default "7days"). */
let auditPeriod = "7days";

/** Active category filter for Audit view ("all" or category name). */
let auditCategory = "all";

/** Active user filter for Audit view ("all" or user name). */
let auditUser = "all";

/** Pagination row limit for Audit view (default 50). */
let auditPageLimit = 50;

/**
 * Evaluates whether an audit entry was performed by an auditable actor (Admin or Mechanic).
 * Actions performed while logged in as Super Admin are strictly excluded from display and export.
 * Supports legacy entries without explicit role via fallback user lookup.
 * @param {Object} entry - Audit log entry.
 * @returns {boolean} True if entry belongs to an auditable actor (not Super Admin).
 */
function isAuditedActor(entry) {
  if (!entry || typeof entry !== "object") return false;
  if (entry.action === "Login" || entry.action === "Logout") return true;
  const role = String(entry.role || "").toLowerCase().trim();
  if (role === "superadmin") return false;
  if (role === "admin" || role === "mechanic") return true;

  // Fallback for older entries lacking explicit role: lookup user by userId or by name
  if (entry.userId && entry.userId !== "system") {
    try {
      const users = loadUsers();
      const match = users.find((u) => u.id === entry.userId);
      if (match) return match.role !== "superadmin";
    } catch (e) {}
  }
  if (entry.by && entry.by !== "System") {
    try {
      const users = loadUsers();
      const match = users.find((u) => (u.name || "").trim().toLowerCase() === String(entry.by).trim().toLowerCase());
      if (match) return match.role !== "superadmin";
    } catch (e) {}
  }
  return true;
}

/**
 * Returns all auditable entries from D.audit (Admin and Mechanic activity only).
 * Read-only accessor: never mutates, rewrites, or deletes entries from D.audit.
 * @returns {Array<Object>}
 */
function getAuditableEntries() {
  const raw = Array.isArray(D.audit) ? D.audit : [];
  return raw.filter(isAuditedActor);
}

/**
 * Returns allowed audit entries based on the active role:
 * - Super Admin: all entries across all periods and categories.
 * - Admin: entries with category scope "ops" within the last 90 days only.
 * - Mechanic / unauthenticated: empty array.
 * Never exposes counts, names, or metadata of hidden entries.
 * @returns {Array<Object>} Entries sorted newest first.
 */
function getAuditEntries() {
  const u = getCurrentUser();
  if (!u || u.activeRole === "mechanic" || !canOpen("audit")) {
    return [];
  }
  const isSuperUser = isSuper();
  const isAdminUser = u.activeRole === "admin";
  if (!isSuperUser && !isAdminUser) {
    return [];
  }

  const raw = getAuditableEntries();
  let adminCutoff = null;
  if (!isSuperUser) {
    const todayObj = getLocalToday();
    adminCutoff = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate() - 89, 0, 0, 0, 0);
  }

  const result = [];
  for (let i = 0; i < raw.length; i++) {
    const entry = raw[i];
    if (!entry || typeof entry !== "object") continue;

    const actionText = String(entry.action || "");
    const cat = entry.cat || getAuditCategory(actionText);
    const scope = getAuditCategoryScope(cat);

    if (!isSuperUser) {
      if (scope !== "ops") continue;
      if (adminCutoff) {
        const dateStr = entry.at ? String(entry.at).split(/[ T]/)[0] : "";
        const d = parseLocalDate(dateStr);
        if (!d || d.getTime() < adminCutoff.getTime()) continue;
      }
    }

    result.push({
      ...entry,
      cat
    });
  }

  return result.reverse();
}

/**
 * Filters visible audit entries by period, category, user, and search query.
 * @returns {Array<Object>} Filtered entries.
 */
function getFilteredAuditEntries() {
  const entries = getAuditEntries();
  return entries.filter((entry) => {
    // 1. Period
    const dateStr = entry.at ? String(entry.at).split(/[ T]/)[0] : "";
    if (!inDateRange(dateStr, auditPeriod)) return false;

    // 2. User
    if (auditUser !== "all" && (entry.by || "").trim() !== auditUser) return false;

    // 3. Search
    if (auditSearch) {
      const q = auditSearch;
      const userMatch = (entry.by || "").toLowerCase().includes(q);
      const actionMatch = (entry.action || "").toLowerCase().includes(q);
      const refMatch = (entry.ref || "").toLowerCase().includes(q);
      const noteMatch = (entry.note || "").toLowerCase().includes(q);
      if (!userMatch && !actionMatch && !refMatch && !noteMatch) return false;
    }

    return true;
  });
}

/**
 * Formats a timestamp into local date and time strings.
 * e.g. "Nov 11, 2026" and "02:15:08 PM"
 * @param {string} atStr - Stored local timestamp ("YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD HH:MM")
 * @returns {{ date: string, time: string }} Formatted date and time.
 */
function formatAuditTime(atStr) {
  if (!atStr) return { date: "—", time: "" };
  const parts = String(atStr).split(/[ T]/);
  const datePart = parts[0] || "";
  const timePart = parts[1] || "";

  let dateFormatted = datePart;
  const dTokens = datePart.split("-");
  if (dTokens.length === 3) {
    const y = parseInt(dTokens[0], 10);
    const m = parseInt(dTokens[1], 10) - 1;
    const day = parseInt(dTokens[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(day)) {
      const d = new Date(y, m, day);
      dateFormatted = d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  }

  let timeFormatted = timePart;
  if (timePart) {
    const tTokens = timePart.split(":");
    const hr = parseInt(tTokens[0], 10);
    const min = parseInt(tTokens[1] || "0", 10);
    const sec = tTokens[2] !== undefined && tTokens[2] !== "" ? parseInt(tTokens[2], 10) : null;
    if (!isNaN(hr)) {
      const ampm = hr >= 12 ? "PM" : "AM";
      const hr12 = hr % 12 || 12;
      const pad = (n) => String(n).padStart(2, "0");
      if (sec !== null && !isNaN(sec)) {
        timeFormatted = `${pad(hr12)}:${pad(min)}:${pad(sec)} ${ampm}`;
      } else {
        timeFormatted = `${pad(hr12)}:${pad(min)} ${ampm}`;
      }
    }
  }
  return { date: dateFormatted, time: timeFormatted };
}

/**
 * Generates the full HTML markup for the Audit view.
 * Accessible to Admin and Super Admin roles.
 * @returns {string} HTML string.
 */
function getAuditViewHtml() {
  const u = getCurrentUser();
  if (!u || u.activeRole === "mechanic" || !canOpen("audit") || (!isSuper() && u.activeRole !== "admin")) {
    return renderNoAccess();
  }

  const isSuperUser = isSuper();
  const subtitle = "Login and logout activity.";

  const visibleEntries = getAuditEntries();
  const distinctUsers = Array.from(new Set(visibleEntries.map((e) => (e.by || "").trim()).filter(Boolean))).sort();

  return `
    <div class="card top">
      <div>
        <h1>Audit</h1>
        <p>${subtitle}</p>
      </div>
    </div>

    ${!isSuperUser ? `
      <div class="audit-notice-card" role="note">
        <span style="display:inline-flex;align-items:center;color:var(--text-muted)">${ICONS.alert || "ℹ"}</span>
        <span>You are viewing the operational audit. User, access, override, catalog, and void records are visible to Super Admin only.</span>
      </div>
    ` : ""}

    <!-- Toolbar card -->
    <div class="reports-toolbar audit-toolbar">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex:1 1 auto">
        <div style="position:relative;flex:1 1 240px;min-width:200px">
          <input
            type="text"
            id="audit-search"
            class="audit-input"
            placeholder="Search user, action, reference, or note..."
            value="${escHtml(auditSearch)}"
            oninput="onAuditSearchInput(this.value)"
            aria-label="Search audit entries"
          />
        </div>

        <div style="display:flex;align-items:center;gap:6px">
          <label for="audit-period-select" style="font-size:13px;font-weight:700;color:var(--text-secondary)">Period:</label>
          <select id="audit-period-select" class="audit-select" onchange="setAuditPeriod(this.value)">
            <option value="today" ${auditPeriod === "today" ? "selected" : ""}>Today</option>
            <option value="7days" ${auditPeriod === "7days" ? "selected" : ""}>Last 7 Days</option>
            <option value="month" ${auditPeriod === "month" ? "selected" : ""}>This Month</option>
            <option value="lastMonth" ${auditPeriod === "lastMonth" ? "selected" : ""}>Last Month</option>
            <option value="year" ${auditPeriod === "year" ? "selected" : ""}>This Year</option>
            <option value="all" ${auditPeriod === "all" ? "selected" : ""}>All Time</option>
          </select>
        </div>

        <div style="display:flex;align-items:center;gap:6px">
          <label for="audit-user-select" style="font-size:13px;font-weight:700;color:var(--text-secondary)">User:</label>
          <select id="audit-user-select" class="audit-select" onchange="setAuditUser(this.value)">
            <option value="all" ${auditUser === "all" ? "selected" : ""}>All users</option>
            ${distinctUsers.map((uName) => `<option value="${escHtml(uName)}" ${auditUser === uName ? "selected" : ""}>${escHtml(uName)}</option>`).join("")}
          </select>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:10px">
        ${isSuperUser ? `
          <button type="button" class="btn g his-btn-export" onclick="exportAuditCsv()" title="Export filtered rows to CSV">
            <span style="display:inline-flex;align-items:center">${ICONS.download}</span> Export CSV
          </button>
          <span id="audit-export-feedback" style="display:none;font-size:12px;color:var(--text-muted);font-weight:600">Nothing to export.</span>
        ` : ""}
      </div>
    </div>

    <!-- Results wrap (re-rendered on filter changes to keep search focus) -->
    <div id="audit-results-wrap">
      ${getAuditResultsHtml()}
    </div>
  `;
}

/**
 * Generates the HTML for summary cards, count line, table, and pagination.
 * @returns {string} HTML string.
 */
function getAuditResultsHtml() {
  const u = getCurrentUser();
  if (!u || u.activeRole === "mechanic" || !canOpen("audit") || (!isSuper() && u.activeRole !== "admin")) {
    return "";
  }

  const isSuperUser = isSuper();
  const filtered = getFilteredAuditEntries();

  // Summary card stats for the filtered rows in this period
  const totalEntries = filtered.length;
  let loginsCount = 0;
  let logoutsCount = 0;
  filtered.forEach((e) => {
    if (e.action === "Login") loginsCount++;
    else if (e.action === "Logout") logoutsCount++;
  });

  const stat = (i, bg, l, n, t) =>
    `<div class="card st"><div class="ic" style="background:${bg}">${i}</div><div><small>${l}</small><b>${n}</b>${t}</div></div>`;

  const displayedRows = filtered.slice(0, auditPageLimit);
  const countLineText = `Showing ${displayedRows.length} of ${totalEntries} entries`;

  return `
    <!-- Summary Cards -->
    <div class="reports-kpi-grid audit-kpi-grid">
      ${stat(ICONS.clipboard, "", "TOTAL ENTRIES", totalEntries, "In period")}
      ${stat(LINE_ICONS.cust, "", "LOGINS", loginsCount, "In period")}
      ${stat(LINE_ICONS.cust, "", "LOGOUTS", logoutsCount, "In period")}
    </div>

    <!-- Count line -->
    <div style="margin: 0 0 10px 4px;font-size:13px;color:var(--text-muted);font-weight:600">
      ${countLineText}
    </div>

    <!-- Table -->
    <div class="um-table-wrap audit-table-wrap">
      ${filtered.length > 0 ? `
        <table class="um-table audit-table">
          <thead>
            <tr>
              <th style="width:160px">TIME</th>
              <th style="width:170px">USER</th>
              <th style="width:150px">CATEGORY</th>
              <th style="width:170px">ACTION</th>
              <th style="width:150px">REFERENCE</th>
              <th>DETAILS / REASON</th>
            </tr>
          </thead>
          <tbody>
            ${displayedRows.map((entry) => {
              const timeObj = formatAuditTime(entry.at);
              const isDanger = entry.cat === "Voids & Reversals" || entry.cat === "Deletions";
              const roleLabel = getUserRoleLabel(entry.role) || entry.role || "user";
              return `
                <tr>
                  <td>
                    <div style="font-weight:700;color:var(--text)">${escHtml(timeObj.date)}</div>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:2px">${escHtml(timeObj.time)}</div>
                  </td>
                  <td>
                    <div style="font-weight:700;color:var(--text)">${escHtml(entry.by || "System")}</div>
                    <div style="margin-top:4px">
                      <span class="audit-role-badge">${escHtml(roleLabel)}</span>
                    </div>
                  </td>
                  <td>
                    <span class="audit-badge ${isDanger ? "danger" : ""}">${escHtml(entry.cat || "Other")}</span>
                  </td>
                  <td>
                    <span style="font-weight:700;color:var(--text)">${escHtml(entry.action || "")}</span>
                  </td>
                  <td>
                    <code class="audit-ref">${escHtml(entry.ref || "—")}</code>
                  </td>
                  <td>
                    <div style="white-space:pre-wrap;word-break:break-word;font-size:13px;color:var(--text)">${escHtml(entry.note || "—")}</div>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      ` : `
        <div style="padding:48px 20px;text-align:center">
          <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:6px">No audit entries found.</div>
          <div style="font-size:13px;color:var(--text-muted)">Try a different period, user, or search.</div>
        </div>
      `}
    </div>

    ${filtered.length > displayedRows.length ? `
      <div style="display:flex;justify-content:center;margin-top:20px">
        <button type="button" class="btn g" onclick="loadMoreAuditRows()" style="padding:10px 24px">
          Show 50 more
        </button>
      </div>
    ` : ""}
  `;
}

/**
 * Updates the user select options to reflect visible users.
 */
function updateAuditUserSelectOptions() {
  const sel = $("audit-user-select");
  if (!sel) return;
  const currentVal = auditUser;
  const entries = getAuditEntries();
  const usersSet = new Set();
  entries.forEach((e) => {
    if (e.by && e.by.trim()) usersSet.add(e.by.trim());
  });
  const usersList = Array.from(usersSet).sort();
  let html = `<option value="all">All users</option>`;
  usersList.forEach((uName) => {
    html += `<option value="${escHtml(uName)}" ${currentVal === uName ? "selected" : ""}>${escHtml(uName)}</option>`;
  });
  sel.innerHTML = html;
  if (!usersSet.has(currentVal) && currentVal !== "all") {
    auditUser = "all";
  }
}

/**
 * Live search input handler for Audit page.
 * Keeps search input focused by re-rendering only the results container.
 * @param {string} val
 */
function onAuditSearchInput(val) {
  auditSearch = String(val || "").trim().toLowerCase();
  auditPageLimit = 50;
  renderAuditResults();
}

/**
 * Period filter select handler for Audit page.
 * @param {string} val
 */
function setAuditPeriod(val) {
  auditPeriod = val;
  auditPageLimit = 50;
  updateAuditUserSelectOptions();
  renderAuditResults();
}

/**
 * Category filter select handler for Audit page.
 * @param {string} val
 */
function setAuditCategory(val) {
  auditCategory = val;
  auditPageLimit = 50;
  renderAuditResults();
}

/**
 * User filter select handler for Audit page.
 * @param {string} val
 */
function setAuditUser(val) {
  auditUser = val;
  auditPageLimit = 50;
  renderAuditResults();
}

/**
 * Loads 50 more rows into the Audit table.
 */
function loadMoreAuditRows() {
  auditPageLimit += 50;
  renderAuditResults();
}

/**
 * Re-renders only the audit results container without touching the toolbar.
 */
function renderAuditResults() {
  const u = getCurrentUser();
  if (!u || u.activeRole === "mechanic" || !canOpen("audit") || (!isSuper() && u.activeRole !== "admin")) return;
  const wrap = $("audit-results-wrap");
  if (wrap) {
    wrap.innerHTML = getAuditResultsHtml();
  }
}

/**
 * Exports currently filtered audit rows to a CSV file (Super Admin only).
 */
function exportAuditCsv() {
  if (!isSuper()) return;
  const u = getCurrentUser();
  if (!u || u.activeRole !== "superadmin") return;

  const filtered = getFilteredAuditEntries();
  if (!filtered.length) {
    const feedback = $("audit-export-feedback");
    if (feedback) {
      feedback.style.display = "inline";
      setTimeout(() => { if (feedback) feedback.style.display = "none"; }, 3000);
    }
    return;
  }

  const escapeCsv = (str) => `"${String(str ?? "").replace(/"/g, '""')}"`;
  const headers = ["Date", "Time", "User", "Role", "Category", "Action", "Reference", "Details"];

  const rows = filtered.map((entry) => {
    const timeObj = formatAuditTime(entry.at);
    const roleLabel = getUserRoleLabel(entry.role) || entry.role || "user";
    return [
      timeObj.date,
      timeObj.time,
      entry.by || "System",
      roleLabel,
      entry.cat || "Other",
      entry.action || "",
      entry.ref || "",
      entry.note || ""
    ].map(escapeCsv).join(",");
  });

  const fullContent = "\uFEFF" + [
    headers.map(escapeCsv).join(","),
    ...rows
  ].join("\r\n");

  const todayStr = today();
  const blob = new Blob([fullContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `moto-audit-${todayStr}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


/* ==========================================================
   9.5 QUICK SALES
   ========================================================== */

/** In-memory cart items for active Quick Sales sale. */
let posCart = [];

/** In-memory active sub-view for Quick Sales: "parts" or "cart". Never persisted to localStorage. */
let posView = "parts";

/** Optional customer name or phone for active sale. */
let posCustomer = "";

/** Selected payment method: "Cash" | "GCash" | "Maya". */
let posMethod = "Cash";

/** Amount tendered by customer for cash transactions. */
let posTendered = 0;

/** Flag indicating whether tendered was explicitly entered by cashier. */
let posTenderedManual = false;

/** Payment reference number for GCash/Maya transactions. */
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
  posView = "parts";
  posCustomer = "";
  posMethod = "Cash";
  posTendered = 0;
  posTenderedManual = false;
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
 * Returns final total of active POS cart.
 * @returns {number} Total in PHP.
 */
function getPosTotal() {
  return getPosSubtotal();
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
      <div class="pos-tiles-grid pos-catalog-grid">
        ${customTileHtml}
      </div>
      <div class="empty" style="padding:40px 16px;text-align:center;background:#FFFFFF;border:1px dashed var(--border);border-radius:12px;margin-top:12px">
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
    <div class="pos-tiles-grid pos-catalog-grid">
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
      origPrice: Number(it.price) || 0,
      qty: 1
    });
  }

  renderPosGrid();
  renderPosCart();
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
    return `<span>Change:</span><b style="color:var(--success);font-size:14px">${P(diff)}</b>`;
  }
  return `<span style="color:var(--danger);font-weight:600">Short by:</span><b style="color:var(--danger);font-size:14px">${P(Math.abs(diff))}</b>`;
}

/**
 * Returns short muted explanation when POS charge button is disabled.
 * @param {number} total - Current cart total.
 * @returns {string} Reason text or empty string.
 */
function getPosChargeReason(total) {
  if (posCart.length === 0) return "Cart is empty";
  if (posMethod === "Cash" && (Number(posTendered) || 0) < total) {
    const diff = total - (Number(posTendered) || 0);
    return `Short by ${P(diff)}`;
  }
  return "";
}

/**
 * Generates full HTML for the right column panel (Cart tab or Today's Sales tab).
 * @returns {string} HTML string.
 */
function getPosRightPanelHtml() {
  const total = getPosTotal();
  const totalItems = getPosTotalItemsCount();
  const isCashShort = posMethod === "Cash" && (Number(posTendered) || 0) < total;
  const isChargeDisabled = posCart.length === 0 || isCashShort;

  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:15px;font-weight:800;color:var(--text-primary)">Current Sale</span>
          <span id="pos-cart-count-badge" class="badge" style="font-size:11px;font-weight:700;background:var(--bg-subtle);color:var(--text-primary);padding:2px 8px;border-radius:999px;border:1px solid var(--border)">
            ${totalItems} item${totalItems === 1 ? "" : "s"}
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button
            type="button"
            class="btn g sm"
            id="pos-btn-clear-cart"
            onclick="handlePosClearCart()"
            style="${posClearConfirmActive ? 'color:var(--danger, #DC2626);font-weight:700' : ''}"
            title="Empty current cart"
          >
            ${posClearConfirmActive ? "Tap again to clear" : "Clear all"}
          </button>
        </div>
      </div>

      <!-- Customer / Plate -->
      <div style="background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:12px;font-size:12px">
        <input
          id="pos-customer-input"
          type="text"
          placeholder="Customer or plate (optional)"
          value="${escHtml(posCustomer || '')}"
          oninput="posCustomer = this.value"
          style="width:100%;height:34px;box-sizing:border-box;border-radius:6px;border:1px solid var(--border);padding:0 8px;font-size:12px;background:var(--bg-surface);color:var(--text)"
        />
      </div>

      <div class="pos-cart-list" id="pos-cart-list">
        ${
          posCart.length === 0
            ? `<div class="empty" style="padding:32px 16px;text-align:center;font-size:13px;color:var(--text-muted)">Cart is empty.<br>Tap catalog items in Parts & Fluids to add.</div>`
            : posCart.map((item) => {
                const lineTotal = (Number(item.qty) || 1) * (Number(item.price) || 0);
                const isLabor = item.kind === "labor";
                const isOverridden = item.ref && item.origPrice !== undefined && Number(item.price) !== Number(item.origPrice);
                const isPriceReadOnly = !isSuper() && Boolean(item.ref);
                return `
                  <div class="pos-cart-line" id="pos-cart-line-${item.id}">
                    <div class="pos-cart-line-top">
                      <div style="flex:1;min-width:0;display:flex;align-items:center;flex-wrap:wrap;gap:4px">
                        <span class="cat-badge ${item.kind}">${isLabor ? 'Labor' : 'Part'}</span>
                        <b style="font-size:13px;color:var(--text-primary)">${escHtml(item.name)}</b>
                        <span id="pos-override-tag-${item.id}" class="badge-override" style="font-size:10px;padding:1px 4px;${isOverridden ? '' : 'display:none'}">OVERRIDE</span>
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
                        <span style="font-size:11px;color:var(--text-muted)">@ \u20B1</span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          class="pos-price-input"
                          value="${item.price}"
                          ${isPriceReadOnly ? "readonly disabled style='background:var(--bg-surface-alt, #F8FAFC);color:var(--text-muted)'" : ""}
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
        <div class="pos-totals-row grand-total">
          <span>Total</span>
          <span id="pos-total-val">${P(total)}</span>
        </div>
      </div>

      <!-- Payment Method Toggle -->
      <div style="margin-top:14px">
        <label style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;display:block;margin-bottom:6px">Payment Method</label>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px">
          <button type="button" class="btn g sm ${posMethod === 'Cash' ? 'on' : ''}" style="${posMethod === 'Cash' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}" onclick="setPosMethod('Cash')"><span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.money}</span>Cash</button>
          <button type="button" class="btn g sm ${posMethod === 'GCash' ? 'on' : ''}" style="${posMethod === 'GCash' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}" onclick="setPosMethod('GCash')"><span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.phone}</span>GCash</button>
          <button type="button" class="btn g sm ${posMethod === 'Maya' ? 'on' : ''}" style="${posMethod === 'Maya' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}" onclick="setPosMethod('Maya')"><span style="display:inline-flex;align-items:center;margin-right:4px">${LINE_ICONS.bill}</span>Maya</button>
        </div>
      </div>

      <!-- Method Specific Fields -->
      ${
        posMethod === "Cash"
          ? `
            <div style="margin-top:12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <label for="pos-tendered-input" style="font-size:12px;font-weight:700;color:var(--text-secondary)">Amount Received (PHP):</label>
                <input
                  id="pos-tendered-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value="${posTendered > 0 ? posTendered : ''}"
                  oninput="onPosTenderedInput(this.value)"
                  style="width:100px;height:32px;border-radius:6px;border:1px solid var(--border);padding:0 8px;text-align:right;font-size:13px;font-weight:700"
                />
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px" id="pos-cash-calc-row">
                ${getCashCalcHtml(total, posTendered)}
              </div>
            </div>
          `
          : `
            <div style="margin-top:12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px">
              <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">
                Digital payment via <b>${escHtml(posMethod)}</b>. Exact amount (${P(total)}) billed.
              </div>
              <label for="pos-ref-input" style="font-size:11px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px">Reference No. (optional):</label>
              <input
                id="pos-ref-input"
                type="text"
                placeholder="e.g. 1002938472"
                value="${escHtml(posRef)}"
                oninput="posRef=this.value"
                style="width:100%;height:32px;border-radius:6px;border:1px solid var(--border);padding:0 8px;font-size:13px;box-sizing:border-box"
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
      <div id="pos-charge-reason" style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:4px;min-height:16px">${getPosChargeReason(total)}</div>
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
  updatePosCartTabCount();
}

/**
 * Synchronizes DOM summary elements without destroying input focus.
 */
function syncPosCartSummaryDom() {
  const total = getPosTotal();
  const count = getPosTotalItemsCount();

  const totalEl = $("pos-total-val");
  if (totalEl) totalEl.textContent = P(total);

  const countBadge = $("pos-cart-count-badge");
  if (countBadge) {
    countBadge.textContent = `${count} item${count === 1 ? "" : "s"}`;
  }

  const cashCalcRow = $("pos-cash-calc-row");
  if (cashCalcRow && posMethod === "Cash") {
    cashCalcRow.innerHTML = getCashCalcHtml(total, posTendered);
  }

  const isCashShort = posMethod === "Cash" && (Number(posTendered) || 0) < total;
  const isChargeDisabled = posCart.length === 0 || isCashShort;
  const chargeBtn = $("pos-charge-btn");
  if (chargeBtn) {
    chargeBtn.disabled = isChargeDisabled;
    chargeBtn.textContent = `Charge ${P(total)}`;
  }

  const reasonEl = $("pos-charge-reason");
  if (reasonEl) {
    reasonEl.textContent = getPosChargeReason(total);
  }

  updatePosCartTabCount();
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

  const tag = $(`pos-override-tag-${lineId}`);
  if (tag) {
    const isOverridden = line.ref && line.origPrice !== undefined && Number(line.price) !== Number(line.origPrice);
    tag.style.display = isOverridden ? "inline-flex" : "none";
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
  posTendered = 0;
  posTenderedManual = false;
  posRef = "";
  renderPosGrid();
  renderPosCart();
}

/**
 * Sets payment method for active sale ("Cash", "GCash", or "Maya").
 * @param {string} m - Method name.
 */
function setPosMethod(m) {
  if (m !== "Cash" && m !== "GCash" && m !== "Maya") return;
  posMethod = m;
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
 * Finalizes sale, persists to D.sales, prints receipt, and resets cart.
 */
function chargePosSale() {
  const total = getPosTotal();
  if (posCart.length === 0) return;
  if (posMethod === "Cash" && (Number(posTendered) || 0) < total) return;

  const u = getCurrentUser();
  const tendered = posMethod === "Cash" ? (Number(posTendered) || 0) : total;
  const change = posMethod === "Cash" ? Math.max(0, tendered - total) : 0;

  const overrides = [];
  const items = posCart.map((it) => {
    const isOverridden = it.ref && it.origPrice !== undefined && Number(it.price) !== Number(it.origPrice);
    if (isOverridden) {
      overrides.push({ name: it.name, origPrice: it.origPrice, price: it.price });
    }
    return {
      id: it.id || uid(),
      kind: it.kind || "part",
      name: it.name || "Item",
      qty: Number(it.qty) || 1,
      price: Number(it.price) || 0,
      ref: it.ref || "",
      origPrice: it.origPrice !== undefined ? it.origPrice : Number(it.price) || 0,
      override: Boolean(isOverridden)
    };
  });

  const newSale = {
    id: uid(),
    no: generatePosNumber(),
    at: nowLocalTimestamp(),
    by: u ? u.name : "Cashier",
    customer: (posCustomer || "").trim() || "Walk-in",
    items: items,
    discount: 0,
    method: posMethod,
    ref: ((posMethod === "GCash" || posMethod === "Maya") && posRef) ? posRef.trim() : "",
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
  posTendered = 0;
  posTenderedManual = false;
  posRef = "";
  posClearConfirmActive = false;
  if (posClearConfirmTimer) clearTimeout(posClearConfirmTimer);

  renderPosGrid();
  renderPosCart();
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

  const canVoid = isSuper();

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
 * Opens void modal for a specific sale (Super Admin only).
 * Requires audit reason and excludes voided sale from all totals.
 * @param {string} saleId - Sale ID.
 */
function openPosVoidModal(saleId) {
  if (!isSuper()) return;
  const s = (Array.isArray(D.sales) ? D.sales : []).find((x) => x.id === saleId);
  if (!s) return;
  askReason(`Void Sale ${s.no}`, "Confirm Void", (reason) => {
    s.void = true;
    s.voidReason = reason;
    s.voidAt = nowLocalTimestamp();
    const u = getCurrentUser();
    s.voidBy = u ? u.name : "Super Admin";
    save();
    renderPosTodaySales();
    updatePosHeaderStats();
    if (view === "reports") {
      const resEl = $("report-results-wrap");
      if (resEl) resEl.innerHTML = getReportResultsHtml();
    }
  }, { description: `Are you sure you want to void this sale of <b>${P(s.total)}</b> (${escHtml(s.method || "Cash")})? Voided sales are excluded from sales revenue and performance reports.` });
}

/**
 * Closes the void confirmation modal.
 */
function closePosVoidModal() {
  closeReasonModal();
  posVoidSaleId = null;
}

/**
 * Confirms voiding of the active sale.
 */
function confirmPosVoid() {
  submitReason();
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
      <div style="display:flex;justify-content:center;margin-bottom:4px;color:var(--text)">${LINE_ICONS.pos}</div>
      <h2 style="margin:4px 0 2px;font-size:22px;color:var(--text)">MotoShop</h2>
      <div style="font-size:12px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em">Quick Sale Receipt</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${formatPosDateTime(sale.at)}</div>
    </div>

    ${
      sale.void
        ? `
          <div style="background:var(--danger-soft);border:1px solid var(--danger-border);color:var(--danger);padding:10px 12px;border-radius:8px;font-size:12px;margin-bottom:14px;font-weight:700;text-align:center">
            <span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.alert}</span> THIS SALE WAS VOIDED${sale.voidAt ? ` ON ${formatPosDateTime(sale.voidAt)}` : ""}<br>
            <span style="font-weight:normal;font-size:11px">Reason: ${escHtml(sale.voidReason || "Voided")}</span>
          </div>
        `
        : ""
    }

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;font-size:12px;background:var(--bg-subtle);padding:10px 12px;border-radius:8px;border:1px solid var(--border)">
      <div>
        <span style="color:var(--text-muted)">Receipt No:</span>
        <b style="color:var(--text);margin-left:4px">${escHtml(sale.no)}</b>
      </div>
      <div>
        <span style="color:var(--text-muted)">Cashier:</span>
        <b style="color:var(--text);margin-left:4px">${escHtml(sale.by || "Cashier")}</b>
      </div>
      <div style="grid-column:1/-1">
        <span style="color:var(--text-muted)">Customer:</span>
        <b style="color:var(--text);margin-left:4px">${escHtml(sale.customer || "Customer")}</b>
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
            <tr style="border-bottom:1px solid var(--border)">
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
      ${
        (Number(sale.discount) || 0) > 0
          ? `
            <div style="display:flex;justify-content:space-between;margin-bottom:3px">
              <span style="color:var(--text-secondary)">Subtotal</span>
              <span>${P(subtotal)}</span>
            </div>
            <div style="display:flex;justify-content:space-between;color:var(--success);margin-bottom:3px">
              <span>Discount</span>
              <span>-${P(sale.discount)}</span>
            </div>
          `
          : ""
      }
      <div style="display:flex;justify-content:space-between;font-size:16px;font-weight:800;${(Number(sale.discount) || 0) > 0 ? 'border-top:1px solid var(--border);padding-top:6px;margin-top:4px' : ''}">
        <span>Total</span>
        <span style="${sale.void ? 'text-decoration:line-through;color:var(--text-muted)' : ''}">${P(sale.total)}</span>
      </div>
    </div>

    <div style="background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-top:14px;font-size:12px">
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
      <button type="button" class="btn" onclick="window.print()"><span style="display:inline-flex;align-items:center;margin-right:6px">${ICONS.print}</span>Print Receipt</button>
    </div>
  `;

  const ov = $("rcpt-ov");
  if (ov) {
    ov.classList.add("on");
    ov.focus();
  }
}

/**
 * Synchronizes the Cart & Payment tab button count and aria-label in the DOM without re-rendering other buttons.
 */
function updatePosCartTabCount() {
  const tabB = $("pos-tab-cart");
  if (!tabB) return;
  const cnt = getPosTotalItemsCount();
  tabB.textContent = `Cart & Payment (${cnt})`;
  tabB.setAttribute("aria-label", `Cart and payment, ${cnt} item${cnt === 1 ? "" : "s"}`);
}

/**
 * Switches the active sub-view in Quick Sales ("parts" or "cart") without destroying DOM elements.
 * Updates class and aria attributes of both buttons from posView state.
 * @param {"parts"|"cart"} viewName - Target sub-view.
 */
function setPosView(viewName) {
  posView = viewName === "cart" ? "cart" : "parts";
  const isA = posView !== "cart";

  const panelA = $("pos-panel-parts");
  const panelB = $("pos-panel-cart");
  const tabA = $("pos-tab-parts");
  const tabB = $("pos-tab-cart");

  if (panelA) {
    panelA.hidden = !isA;
    panelA.style.display = isA ? "block" : "none";
  }
  if (panelB) {
    panelB.hidden = isA;
    panelB.style.display = isA ? "none" : "block";
  }

  if (tabA) {
    if (isA) {
      tabA.classList.add("active");
      tabA.setAttribute("aria-selected", "true");
      tabA.setAttribute("aria-pressed", "true");
      tabA.setAttribute("tabindex", "0");
    } else {
      tabA.classList.remove("active");
      tabA.setAttribute("aria-selected", "false");
      tabA.setAttribute("aria-pressed", "false");
      tabA.setAttribute("tabindex", "-1");
    }
  }

  if (tabB) {
    if (!isA) {
      tabB.classList.add("active");
      tabB.setAttribute("aria-selected", "true");
      tabB.setAttribute("aria-pressed", "true");
      tabB.setAttribute("tabindex", "0");
    } else {
      tabB.classList.remove("active");
      tabB.setAttribute("aria-selected", "false");
      tabB.setAttribute("aria-pressed", "false");
      tabB.setAttribute("tabindex", "-1");
    }
  }

  updatePosCartTabCount();
  scrollIntoViewIfAbove("pos-view-toggle");
}

/**
 * Handles keyboard navigation (ArrowLeft/ArrowRight, Home/End, Enter/Space) for Quick Sales switch tabs.
 * @param {KeyboardEvent} e
 */
function handlePosTabKeydown(e) {
  const tabA = $("pos-tab-parts");
  const tabB = $("pos-tab-cart");
  if (!tabA || !tabB) return;

  const key = e.key;
  if (key === "ArrowRight" || key === "ArrowLeft") {
    e.preventDefault();
    if (document.activeElement === tabA) {
      tabB.focus();
    } else {
      tabA.focus();
    }
  } else if (key === "Home") {
    e.preventDefault();
    tabA.focus();
  } else if (key === "End") {
    e.preventDefault();
    tabB.focus();
  } else if (key === "Enter" || key === " " || key === "Spacebar") {
    e.preventDefault();
    if (document.activeElement === tabB) {
      setPosView("cart");
    } else if (document.activeElement === tabA) {
      setPosView("parts");
    }
  }
}

/**
 * Main view renderer for the Quick Sales page.
 * @returns {string} Full HTML markup.
 */
function getPosViewHtml() {
  const total = getPosTotal();
  const totalItems = getPosTotalItemsCount();
  const isA = (posView !== "cart");
  const posCartTabAriaLabel = `Cart and payment, ${totalItems} item${totalItems === 1 ? "" : "s"}`;

  return `
    <h1 class="sr-only">Quick Sales</h1>

    <!-- Segmented switch for Quick Sales views -->
    <div
      class="tab-switch-bar"
      id="pos-view-toggle"
      role="tablist"
      aria-label="Quick Sales sections"
      onkeydown="handlePosTabKeydown(event)"
    >
      <button
        type="button"
        id="pos-tab-parts"
        class="tab-switch-btn ${isA ? "active" : ""}"
        role="tab"
        aria-selected="${isA ? "true" : "false"}"
        aria-pressed="${isA ? "true" : "false"}"
        aria-controls="pos-panel-parts"
        tabindex="${isA ? "0" : "-1"}"
        onclick="setPosView('parts')"
      >
        Parts &amp; Fluids
      </button>
      <button
        type="button"
        id="pos-tab-cart"
        class="tab-switch-btn ${!isA ? "active" : ""}"
        role="tab"
        aria-selected="${!isA ? "true" : "false"}"
        aria-pressed="${!isA ? "true" : "false"}"
        aria-controls="pos-panel-cart"
        aria-label="${posCartTabAriaLabel}"
        tabindex="${!isA ? "0" : "-1"}"
        onclick="setPosView('cart')"
      >
        Cart &amp; Payment (${totalItems})
      </button>
    </div>

    <div class="pos-layout pos-split-layout">
      <!-- View A: Parts & Fluids Panel -->
      <div
        id="pos-panel-parts"
        role="tabpanel"
        aria-labelledby="pos-tab-parts"
        style="${isA ? "display:block" : "display:none"}"
        ${isA ? "" : "hidden"}
      >
        <div class="pos-search-wrap">
          <span class="search-icon" onclick="$('pos-search-input').focus()" title="Search">${LINE_ICONS.insp}</span>
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

      <!-- View B: Cart & Payment Panel -->
      <div
        id="pos-panel-cart"
        role="tabpanel"
        aria-labelledby="pos-tab-cart"
        style="${!isA ? "display:block" : "display:none"}"
        ${!isA ? "" : "hidden"}
      >
        <div class="pos-cart-panel" id="pos-cart-panel">
          ${getPosRightPanelHtml()}
        </div>
      </div>
    </div>
  `;
}





/* ==========================================================
   9.6 QUICK LABOR
   ========================================================== */

/** In-memory cart items for active Quick Labor ticket. */
let quickLaborCart = [];

/** Active job type: "labor" (Labor Only) | "laborparts" (Labor + Parts). Default is "labor". */
let qlJobType = "labor";

/** Two-step inline confirmation flag when switching to "Labor Only" with parts in cart. */
let qlLaborOnlyConfirmActive = false;
let qlLaborOnlyConfirmTimer = null;

/** Search queries for Step 1 (labor) and Step 2 (parts). */
let quickLaborSearchLabor = "";
let quickLaborSearchPart = "";

/** Optional Customer or bike plate string. */
let quickLaborCustomer = "";

/** Checkbox state for "Work is finished" in Step 3/4 and Summary panel. */
let qlWorkFinished = false;

/** Payment method: "Cash" | "GCash" | "Maya". */
let quickLaborMethod = "Cash";

/** Payment reference number for GCash or Maya. */
let quickLaborRef = "";

/** Cash amount received/tendered from cashier. */
let quickLaborTendered = 0;

/** Two-step inline confirmation flag for "Clear all" button. */
let quickLaborClearConfirmActive = false;
let quickLaborClearConfirmTimer = null;

/** Toggle state for custom labor and custom part inline forms. */
let quickLaborCustomLaborOpen = false;
let quickLaborCustomPartOpen = false;

/**
 * Resets all Quick Labor working state to defaults.
 */
function resetQuickLaborState() {
  quickLaborCart = [];
  qlJobType = "labor";
  qlLaborOnlyConfirmActive = false;
  if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);
  quickLaborSearchLabor = "";
  quickLaborSearchPart = "";
  quickLaborCustomer = "";
  qlWorkFinished = false;
  quickLaborMethod = "Cash";
  quickLaborRef = "";
  quickLaborTendered = 0;
  quickLaborClearConfirmActive = false;
  if (quickLaborClearConfirmTimer) clearTimeout(quickLaborClearConfirmTimer);
  quickLaborCustomLaborOpen = false;
  quickLaborCustomPartOpen = false;
}

/**
 * Calculates sum of labor fees in active Quick Labor cart.
 * @returns {number} Labor subtotal in PHP.
 */
function getQuickLaborLaborSubtotal() {
  return quickLaborCart.reduce((sum, item) => {
    if (item.kind === "labor") {
      return sum + (Number(item.price) || 0);
    }
    return sum;
  }, 0);
}

/**
 * Calculates sum of parts and fluids line amounts in active Quick Labor cart.
 * @returns {number} Parts subtotal in PHP.
 */
function getQuickLaborPartsSubtotal() {
  return quickLaborCart.reduce((sum, item) => {
    if (item.kind === "part") {
      return sum + (Number(item.price) || 0) * (Number(item.qty) || 1);
    }
    return sum;
  }, 0);
}

/**
 * Calculates grand total for active Quick Labor ticket.
 * @returns {number} Grand total in PHP.
 */
function getQuickLaborTotal() {
  const labor = getQuickLaborLaborSubtotal();
  const parts = qlJobType === "laborparts" ? getQuickLaborPartsSubtotal() : 0;
  return labor + parts;
}

/**
 * Returns formatted label for Quick Labor subtype.
 * New subtypes: "labor" -> "Labor Only", "laborparts" -> "Labor + Parts".
 * Old subtypes (preserved for display): "fix" -> "Fix + Parts", "parts" -> "Parts Only".
 * @param {Object|string} oOrSubtype
 * @returns {string} Formatted subtype label.
 */
function getQuickLaborSubtypeLabel(oOrSubtype) {
  let st = typeof oOrSubtype === "string" ? oOrSubtype : (oOrSubtype && oOrSubtype.subtype);
  if (!st && typeof oOrSubtype === "object" && oOrSubtype) {
    const hasParts = Array.isArray(oOrSubtype.items) && oOrSubtype.items.some((it) => it.kind === "part");
    const hasLabor = Array.isArray(oOrSubtype.items) && oOrSubtype.items.some((it) => it.kind === "labor");
    if (hasLabor && hasParts) st = "fix";
    else if (hasParts && !hasLabor) st = "parts";
    else st = "labor";
  }
  if (st === "labor") return "Labor Only";
  if (st === "laborparts") return "Labor + Parts";
  if (st === "fix") return "Fix + Parts";
  if (st === "parts") return "Parts Only";
  return "Labor Only";
}

/**
 * Returns total count of items in the active Quick Labor cart.
 * @returns {number} Total item count.
 */
function getQuickLaborTotalItemsCount() {
  return quickLaborCart.reduce((acc, item) => acc + (item.kind === "labor" ? 1 : (Number(item.qty) || 1)), 0);
}

/**
 * Returns current quantity of a catalog item in active Quick Labor cart.
 * @param {string} catId - Catalog item ID.
 * @param {string} kind - "labor" | "part"
 * @returns {number} Quantity in cart.
 */
function getQuickLaborInCartQty(catId, kind) {
  const line = quickLaborCart.find((x) => !x.custom && x.id === catId && x.kind === kind);
  if (!line) return 0;
  return line.kind === "labor" ? 1 : (Number(line.qty) || 0);
}

/**
 * Switches active Quick Labor job type with two-step inline confirmation if parts exist.
 * Switching to "Labor Only" asks confirmation before removing parts lines.
 * Switching to "Labor + Parts" keeps all labor lines.
 * @param {"labor"|"laborparts"} type - Target job type.
 */
function setQuickLaborJobType(type) {
  if (type === "labor") {
    if (qlJobType === "laborparts") {
      const hasParts = quickLaborCart.some((it) => it.kind === "part");
      if (hasParts) {
        if (!qlLaborOnlyConfirmActive) {
          qlLaborOnlyConfirmActive = true;
          renderQuickLaborTypeBar();
          if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);
          qlLaborOnlyConfirmTimer = setTimeout(() => {
            qlLaborOnlyConfirmActive = false;
            renderQuickLaborTypeBar();
          }, 3000);
          return;
        }
        // Confirmed second tap: strip part lines from cart
        quickLaborCart = quickLaborCart.filter((it) => it.kind !== "part");
        qlLaborOnlyConfirmActive = false;
        if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);
      }
    }
    qlJobType = "labor";
    qlLaborOnlyConfirmActive = false;
    if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);
  } else {
    // Target: "laborparts"
    qlJobType = "laborparts";
    qlLaborOnlyConfirmActive = false;
    if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);
  }
  renderQuickLaborTypeBar();
  renderQuickLaborLeftCol();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Generates HTML for the Job Type segmented control bar.
 * Two options: "Labor Only" (default) and "Labor + Parts".
 * @returns {string} HTML string.
 */
function getQuickLaborTypeBarHtml() {
  return `
    <button
      type="button"
      id="ql-type-btn-labor"
      class="ql-type-btn ${qlJobType === 'labor' ? 'active' : ''} ${qlLaborOnlyConfirmActive ? 'confirm-remove' : ''}"
      onclick="setQuickLaborJobType('labor')"
      aria-pressed="${qlJobType === 'labor' ? 'true' : 'false'}"
    >
      ${qlLaborOnlyConfirmActive ? "Tap again to remove parts" : "Labor Only"}
    </button>
    <button
      type="button"
      id="ql-type-btn-laborparts"
      class="ql-type-btn ${qlJobType === 'laborparts' ? 'active' : ''}"
      onclick="setQuickLaborJobType('laborparts')"
      aria-pressed="${qlJobType === 'laborparts' ? 'true' : 'false'}"
    >
      Labor + Parts
    </button>
  `;
}

/**
 * Re-renders only the job type segmented control bar.
 */
function renderQuickLaborTypeBar() {
  const barWrap = $("ql-type-bar-wrap");
  if (barWrap) barWrap.innerHTML = getQuickLaborTypeBarHtml();
}


/**
 * Retrieves catalog labor items matching active Step 2 search query.
 * @returns {Array<Object>} Filtered labor items.
 */
function getFilteredQuickLaborServices() {
  const items = typeof getCatalogItems === "function" ? getCatalogItems("labor") : [];
  const q = quickLaborSearchLabor.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => (it.name || "").toLowerCase().includes(q));
}

/**
 * Live typing handler for Step 2 labor search input.
 * Preserves focus by updating only the labor tiles grid.
 * @param {string} val - Input query.
 */
function onQuickLaborSearchLaborInput(val) {
  quickLaborSearchLabor = val || "";
  const clr = $("ql-search-labor-clear");
  if (clr) {
    if (quickLaborSearchLabor.trim()) clr.classList.add("visible");
    else clr.classList.remove("visible");
  }
  renderQuickLaborLaborTiles();
}

/**
 * Clears Step 2 labor search.
 */
function clearQuickLaborSearchLabor() {
  quickLaborSearchLabor = "";
  const inp = $("ql-search-labor");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("ql-search-labor-clear");
  if (clr) clr.classList.remove("visible");
  renderQuickLaborLaborTiles();
}

/**
 * Generates HTML for catalog labor tiles in Step 2.
 * @returns {string} HTML string.
 */
function getQuickLaborLaborTilesHtml() {
  const items = getFilteredQuickLaborServices();

  const customTileHtml = `
    <button type="button" class="pos-tile pos-tile-custom" onclick="openQuickLaborCustomLaborForm()" title="Add custom labor">
      <div class="pos-custom-plus">+</div>
      <div class="pos-custom-text">+ Custom Labor</div>
    </button>
  `;

  if (items.length === 0) {
    return `
      <div class="pos-tiles-grid">
        ${customTileHtml}
      </div>
      <div class="empty" style="padding:24px 16px;text-align:center;background:#FFFFFF;border:1px dashed var(--border);border-radius:12px;margin-top:8px">
        No labor services matched "<b>${escHtml(quickLaborSearchLabor)}</b>". Add custom labor above.
      </div>
    `;
  }

  const tiles = items.map((it) => {
    const inCart = getQuickLaborInCartQty(it.id, "labor");
    return `
      <button
        type="button"
        class="pos-tile ${inCart > 0 ? "in-cart" : ""}"
        onclick="addCatalogLaborToQuickLabor('${it.id}')"
        title="Tap to add: ${escHtml(it.name)}"
      >
        ${inCart > 0 ? `<span class="pos-tile-badge">${inCart}</span>` : ""}
        <div>
          <span class="cat-badge labor" style="background:#F5F3FF;color:#7C3AED;border-color:#DDD6FE">Labor</span>
          <div class="pos-tile-name">${escHtml(it.name)}</div>
        </div>
        <div class="pos-tile-price">${P(it.price)}</div>
      </button>
    `;
  }).join("");

  return `
    <div class="pos-tiles-grid">
      ${customTileHtml}
      ${tiles}
    </div>
  `;
}

/**
 * Re-renders only the labor tiles grid in Step 2.
 */
function renderQuickLaborLaborTiles() {
  const wrap = $("ql-labor-tiles-grid-wrap");
  if (wrap) wrap.innerHTML = getQuickLaborLaborTilesHtml();
}

/**
 * Adds catalog labor to quickLaborCart. Labor items exist at most once.
 * @param {string} catId - Catalog service ID.
 */
function addCatalogLaborToQuickLabor(catId) {
  const items = typeof getCatalogItems === "function" ? getCatalogItems("labor") : [];
  const it = items.find((x) => x.id === catId);
  if (!it) return;

  const existing = quickLaborCart.find((x) => !x.custom && x.id === it.id && x.kind === "labor");
  if (!existing) {
    quickLaborCart.push({
      key: uid(),
      id: it.id,
      kind: "labor",
      name: it.name,
      price: Number(it.price) || 0,
      origPrice: Number(it.price) || 0,
      qty: 1,
      custom: false,
      override: false
    });
  }

  renderQuickLaborLaborTiles();
  renderQuickLaborChosenLabor();
  renderQuickLaborStep2Badge();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Generates HTML for chosen labor lines list in Step 2.
 * @returns {string} HTML string.
 */
function getQuickLaborChosenLaborHtml() {
  const laborLines = quickLaborCart.filter((it) => it.kind === "labor");
  if (laborLines.length === 0) {
    return `<div class="ql-empty-hint">No labor added yet. Choose a labor service or add custom labor above.</div>`;
  }

  const isSuperUser = typeof isSuper === "function" && isSuper();

  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px">
      Chosen Labor (${laborLines.length})
    </div>
    <div class="pos-cart-list">
      ${laborLines.map((item) => {
        const isOverridden = !item.custom && item.origPrice !== undefined && Number(item.price) !== Number(item.origPrice);
        const isPriceReadOnly = !isSuperUser && !item.custom;

        return `
          <div class="pos-cart-line" id="ql-chosen-labor-line-${item.key}">
            <div class="pos-cart-line-top">
              <div style="flex:1;min-width:0;display:flex;align-items:center;flex-wrap:wrap;gap:4px">
                <span class="cat-badge labor" style="background:#F5F3FF;color:#7C3AED;border-color:#DDD6FE">Labor</span>
                <b style="font-size:13px;color:var(--text-primary)">${escHtml(item.name)}</b>
                <span id="ql-override-tag-${item.key}" class="badge-override" style="font-size:10px;padding:1px 4px;${isOverridden ? '' : 'display:none'}">OVERRIDE</span>
              </div>
              <button type="button" class="pos-line-del-btn" onclick="removeQuickLaborLine('${item.key}')" title="Remove labor">✕</button>
            </div>
            <div class="pos-cart-line-bottom" style="justify-content:space-between">
              <div style="display:flex;align-items:center;gap:4px">
                <span style="font-size:12px;font-weight:600;color:var(--text-secondary)">Fee: ₱</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  class="pos-price-input"
                  value="${item.price}"
                  ${isPriceReadOnly ? "readonly disabled style='background:var(--bg-subtle);color:var(--text-muted)'" : ""}
                  oninput="updateQuickLaborLinePrice('${item.key}', this.value)"
                  style="width:90px;height:28px;border-radius:4px;border:1px solid var(--border);padding:0 6px;font-size:13px;font-weight:700;text-align:right"
                />
              </div>
              <b style="font-size:13px;color:var(--text);min-width:60px;text-align:right" id="ql-chosen-tot-${item.key}">
                ${P(item.price)}
              </b>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/**
 * Re-renders only the chosen labor lines list in Step 2.
 */
function renderQuickLaborChosenLabor() {
  const wrap = $("ql-chosen-labor-wrap");
  if (wrap) wrap.innerHTML = getQuickLaborChosenLaborHtml();
}

/**
 * Updates Step 2 badge done/active status.
 */
function renderQuickLaborStep2Badge() {
  const badge = $("ql-step-2-badge");
  const isDone = quickLaborCart.some((it) => it.kind === "labor");
  if (badge) {
    badge.className = `ql-step-badge ${isDone ? "done" : "active"}`;
    badge.textContent = isDone ? "✓" : "1";
  }
}

/**
 * Retrieves catalog part items matching active Step 3 search query.
 * @returns {Array<Object>} Filtered part items.
 */
function getFilteredQuickLaborParts() {
  const items = typeof getCatalogItems === "function" ? getCatalogItems("part") : [];
  const q = quickLaborSearchPart.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => {
    const matchName = (it.name || "").toLowerCase().includes(q);
    const matchSku = (it.sku || "").toLowerCase().includes(q);
    return matchName || matchSku;
  });
}

/**
 * Live typing handler for Step 3 parts search input.
 * Preserves focus by updating only the part tiles grid.
 * @param {string} val - Input query.
 */
function onQuickLaborSearchPartInput(val) {
  quickLaborSearchPart = val || "";
  const clr = $("ql-search-part-clear");
  if (clr) {
    if (quickLaborSearchPart.trim()) clr.classList.add("visible");
    else clr.classList.remove("visible");
  }
  renderQuickLaborPartTiles();
}

/**
 * Clears Step 3 parts search.
 */
function clearQuickLaborSearchPart() {
  quickLaborSearchPart = "";
  const inp = $("ql-search-part");
  if (inp) {
    inp.value = "";
    inp.focus();
  }
  const clr = $("ql-search-part-clear");
  if (clr) clr.classList.remove("visible");
  renderQuickLaborPartTiles();
}

/**
 * Generates HTML for catalog part tiles in Step 3.
 * @returns {string} HTML string.
 */
function getQuickLaborPartTilesHtml() {
  const items = getFilteredQuickLaborParts();

  const customTileHtml = `
    <button type="button" class="pos-tile pos-tile-custom" onclick="openQuickLaborCustomPartForm()" title="Add custom part / consumable">
      <div class="pos-custom-plus">+</div>
      <div class="pos-custom-text">+ Custom Part / Consumable</div>
    </button>
  `;

  if (items.length === 0) {
    return `
      <div class="pos-tiles-grid">
        ${customTileHtml}
      </div>
      <div class="empty" style="padding:24px 16px;text-align:center;background:#FFFFFF;border:1px dashed var(--border);border-radius:12px;margin-top:8px">
        No parts matched "<b>${escHtml(quickLaborSearchPart)}</b>". Add custom part or consumable above.
      </div>
    `;
  }

  const tiles = items.map((it) => {
    const inCart = getQuickLaborInCartQty(it.id, "part");
    return `
      <button
        type="button"
        class="pos-tile ${inCart > 0 ? "in-cart" : ""}"
        onclick="addCatalogPartToQuickLabor('${it.id}')"
        title="Tap to add: ${escHtml(it.name)}"
      >
        ${inCart > 0 ? `<span class="pos-tile-badge">${inCart}</span>` : ""}
        <div>
          <span class="cat-badge part">Part</span>
          <div class="pos-tile-name">${escHtml(it.name)}</div>
        </div>
        <div class="pos-tile-price">${P(it.price)}</div>
      </button>
    `;
  }).join("");

  return `
    <div class="pos-tiles-grid">
      ${customTileHtml}
      ${tiles}
    </div>
  `;
}

/**
 * Re-renders only the part tiles grid in Step 3.
 */
function renderQuickLaborPartTiles() {
  const wrap = $("ql-part-tiles-grid-wrap");
  if (wrap) wrap.innerHTML = getQuickLaborPartTilesHtml();
}

/**
 * Adds catalog part to quickLaborCart or increments its quantity.
 * @param {string} catId - Catalog part ID.
 */
function addCatalogPartToQuickLabor(catId) {
  const items = typeof getCatalogItems === "function" ? getCatalogItems("part") : [];
  const it = items.find((x) => x.id === catId);
  if (!it) return;

  const existing = quickLaborCart.find((x) => !x.custom && x.id === it.id && x.kind === "part");
  if (existing) {
    existing.qty = (Number(existing.qty) || 1) + 1;
  } else {
    quickLaborCart.push({
      key: uid(),
      id: it.id,
      kind: "part",
      name: it.name,
      price: Number(it.price) || 0,
      origPrice: Number(it.price) || 0,
      qty: 1,
      custom: false,
      override: false
    });
  }

  renderQuickLaborPartTiles();
  renderQuickLaborChosenParts();
  renderQuickLaborStep3Badge();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Generates HTML for chosen parts list in Step 3.
 * @returns {string} HTML string.
 */
function getQuickLaborChosenPartsHtml() {
  const partLines = quickLaborCart.filter((it) => it.kind === "part");
  if (partLines.length === 0) {
    return `<div class="ql-empty-hint">Add the parts replaced.</div>`;
  }

  const isSuperUser = typeof isSuper === "function" && isSuper();

  return `
    <div style="font-size:12px;font-weight:700;color:var(--text-secondary);margin-bottom:8px">
      Chosen Parts (${partLines.length})
    </div>
    <div class="pos-cart-list">
      ${partLines.map((item) => {
        const lineTotal = (Number(item.qty) || 1) * (Number(item.price) || 0);
        const isOverridden = !item.custom && item.origPrice !== undefined && Number(item.price) !== Number(item.origPrice);
        const isPriceReadOnly = !isSuperUser && !item.custom;

        return `
          <div class="pos-cart-line" id="ql-chosen-part-line-${item.key}">
            <div class="pos-cart-line-top">
              <div style="flex:1;min-width:0;display:flex;align-items:center;flex-wrap:wrap;gap:4px">
                <span class="cat-badge part">Part</span>
                <b style="font-size:13px;color:var(--text-primary)">${escHtml(item.name)}</b>
                <span id="ql-override-tag-${item.key}" class="badge-override" style="font-size:10px;padding:1px 4px;${isOverridden ? '' : 'display:none'}">OVERRIDE</span>
              </div>
              <button type="button" class="pos-line-del-btn" onclick="removeQuickLaborLine('${item.key}')" title="Remove part">✕</button>
            </div>
            <div class="pos-cart-line-bottom">
              <div class="pos-qty-stepper">
                <button type="button" class="pos-qty-btn" onclick="updateQuickLaborCartQty('${item.key}', -1)" title="Decrease quantity">−</button>
                <span class="pos-qty-val" id="ql-chosen-qty-${item.key}">${item.qty}</span>
                <button type="button" class="pos-qty-btn" onclick="updateQuickLaborCartQty('${item.key}', 1)" title="Increase quantity">+</button>
              </div>
              <div style="display:flex;align-items:center;gap:4px">
                <span style="font-size:11px;color:var(--text-muted)">@ ₱</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  class="pos-price-input"
                  value="${item.price}"
                  ${isPriceReadOnly ? "readonly disabled style='background:var(--bg-subtle);color:var(--text-muted)'" : ""}
                  oninput="updateQuickLaborLinePrice('${item.key}', this.value)"
                  style="width:80px;height:28px;border-radius:4px;border:1px solid var(--border);padding:0 6px;font-size:13px;font-weight:700;text-align:right"
                />
              </div>
              <b style="font-size:13px;color:var(--text);min-width:60px;text-align:right" id="ql-chosen-tot-${item.key}">
                ${P(lineTotal)}
              </b>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

/**
 * Re-renders only the chosen parts lines list in Step 3.
 */
function renderQuickLaborChosenParts() {
  const wrap = $("ql-chosen-part-wrap");
  if (wrap) wrap.innerHTML = getQuickLaborChosenPartsHtml();
}

/**
 * Updates Step 3 badge done/active status.
 */
function renderQuickLaborStep3Badge() {
  const badge = $("ql-step-3-badge");
  const isDone = quickLaborCart.some((it) => it.kind === "part");
  if (badge) {
    badge.className = `ql-step-badge ${isDone ? "done" : "active"}`;
    badge.textContent = isDone ? "✓" : "2";
  }
}

/**
 * Adds the first matching catalog item to cart when Enter key is pressed in search inputs.
 * @param {"labor"|"part"} kind - Step kind.
 */
function addFirstQuickLaborMatch(kind) {
  if (kind === "labor") {
    const items = getFilteredQuickLaborServices();
    if (items.length > 0) {
      addCatalogLaborToQuickLabor(items[0].id);
      quickLaborSearchLabor = "";
      const inp = $("ql-search-labor");
      if (inp) {
        inp.value = "";
        inp.focus();
      }
      const clr = $("ql-search-labor-clear");
      if (clr) clr.classList.remove("visible");
      renderQuickLaborLaborTiles();
    }
  } else {
    const items = getFilteredQuickLaborParts();
    if (items.length > 0) {
      addCatalogPartToQuickLabor(items[0].id);
      quickLaborSearchPart = "";
      const inp = $("ql-search-part");
      if (inp) {
        inp.value = "";
        inp.focus();
      }
      const clr = $("ql-search-part-clear");
      if (clr) clr.classList.remove("visible");
      renderQuickLaborPartTiles();
    }
  }
}

/**
 * Opens custom labor form in Step 2.
 */
function openQuickLaborCustomLaborForm() {
  quickLaborCustomLaborOpen = true;
  const wrap = $("ql-custom-labor-wrap");
  if (wrap) {
    wrap.innerHTML = `
      <div class="pos-custom-form-card" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div class="pos-custom-form-title">Add Custom Labor</div>
          <button type="button" class="search-clear visible" onclick="closeQuickLaborCustomLaborForm()" style="position:static" title="Cancel">✕</button>
        </div>
        <div class="pos-custom-row">
          <div class="pos-custom-field" style="flex:2;min-width:180px">
            <label for="ql-custom-labor-name">Work Description</label>
            <input id="ql-custom-labor-name" type="text" placeholder="e.g. Exhaust bracket re-weld, Minor wiring fix" onkeydown="if(event.key==='Enter')submitQuickLaborCustomLabor()" />
          </div>
          <div class="pos-custom-field" style="flex:1;min-width:100px">
            <label for="ql-custom-labor-price">Labor Fee (PHP)</label>
            <input id="ql-custom-labor-price" type="number" min="0" step="1" placeholder="0" onkeydown="if(event.key==='Enter')submitQuickLaborCustomLabor()" />
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn g sm" onclick="closeQuickLaborCustomLaborForm()">Cancel</button>
          <button type="button" class="btn sm" onclick="submitQuickLaborCustomLabor()">Add</button>
        </div>
      </div>
    `;
    setTimeout(() => {
      const inp = $("ql-custom-labor-name");
      if (inp) inp.focus();
    }, 50);
  }
}

/**
 * Closes custom labor form in Step 2.
 */
function closeQuickLaborCustomLaborForm() {
  quickLaborCustomLaborOpen = false;
  const wrap = $("ql-custom-labor-wrap");
  if (wrap) wrap.innerHTML = "";
}

/**
 * Submits custom labor form and adds line to cart.
 */
function submitQuickLaborCustomLabor() {
  const nameInp = $("ql-custom-labor-name");
  const priceInp = $("ql-custom-labor-price");
  const name = nameInp ? nameInp.value.trim() : "";
  const price = priceInp ? Math.max(0, parseFloat(priceInp.value) || 0) : 0;

  quickLaborCart.push({
    key: uid(),
    id: null,
    kind: "labor",
    name: name || "Custom Labor",
    price: price,
    origPrice: price,
    qty: 1,
    custom: true,
    override: false
  });

  closeQuickLaborCustomLaborForm();
  renderQuickLaborChosenLabor();
  renderQuickLaborStep2Badge();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Opens custom part form in Step 3.
 */
function openQuickLaborCustomPartForm() {
  quickLaborCustomPartOpen = true;
  const wrap = $("ql-custom-part-wrap");
  if (wrap) {
    wrap.innerHTML = `
      <div class="pos-custom-form-card" style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <div class="pos-custom-form-title">Add Custom Part / Consumable</div>
          <button type="button" class="search-clear visible" onclick="closeQuickLaborCustomPartForm()" style="position:static" title="Cancel">✕</button>
        </div>
        <div class="pos-custom-row">
          <div class="pos-custom-field" style="flex:2;min-width:180px">
            <label for="ql-custom-part-name">Part Name</label>
            <input id="ql-custom-part-name" type="text" placeholder="e.g. Bolt, Zip ties, Gasket sealant" onkeydown="if(event.key==='Enter')submitQuickLaborCustomPart()" />
          </div>
          <div class="pos-custom-field" style="flex:1;min-width:80px">
            <label for="ql-custom-part-qty">Qty</label>
            <input id="ql-custom-part-qty" type="number" min="1" step="1" value="1" onkeydown="if(event.key==='Enter')submitQuickLaborCustomPart()" />
          </div>
          <div class="pos-custom-field" style="flex:1;min-width:100px">
            <label for="ql-custom-part-price">Unit Price (PHP)</label>
            <input id="ql-custom-part-price" type="number" min="0" step="1" placeholder="0" onkeydown="if(event.key==='Enter')submitQuickLaborCustomPart()" />
          </div>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
          <button type="button" class="btn g sm" onclick="closeQuickLaborCustomPartForm()">Cancel</button>
          <button type="button" class="btn sm" onclick="submitQuickLaborCustomPart()">Add</button>
        </div>
      </div>
    `;
    setTimeout(() => {
      const inp = $("ql-custom-part-name");
      if (inp) inp.focus();
    }, 50);
  }
}

/**
 * Closes custom part form in Step 3.
 */
function closeQuickLaborCustomPartForm() {
  quickLaborCustomPartOpen = false;
  const wrap = $("ql-custom-part-wrap");
  if (wrap) wrap.innerHTML = "";
}

/**
 * Submits custom part form and adds line to cart.
 */
function submitQuickLaborCustomPart() {
  const nameInp = $("ql-custom-part-name");
  const qtyInp = $("ql-custom-part-qty");
  const priceInp = $("ql-custom-part-price");
  const name = nameInp ? nameInp.value.trim() : "";
  const qty = qtyInp ? Math.max(1, parseInt(qtyInp.value, 10) || 1) : 1;
  const price = priceInp ? Math.max(0, parseFloat(priceInp.value) || 0) : 0;

  quickLaborCart.push({
    key: uid(),
    id: null,
    kind: "part",
    name: name || "Custom Part",
    price: price,
    origPrice: price,
    qty: qty,
    custom: true,
    override: false
  });

  closeQuickLaborCustomPartForm();
  renderQuickLaborChosenParts();
  renderQuickLaborStep3Badge();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Updates quantity of a part item in the cart.
 * @param {string} key - Line key.
 * @param {number} delta - +1 or -1.
 */
function updateQuickLaborCartQty(key, delta) {
  const idx = quickLaborCart.findIndex((x) => x.key === key);
  if (idx === -1) return;
  const newQty = (Number(quickLaborCart[idx].qty) || 1) + delta;
  if (newQty <= 0) {
    quickLaborCart.splice(idx, 1);
  } else {
    quickLaborCart[idx].qty = newQty;
  }

  renderQuickLaborPartTiles();
  renderQuickLaborChosenParts();
  renderQuickLaborStep3Badge();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Updates unit price / labor fee for a line item.
 * Preserves input focus.
 * @param {string} key - Line key.
 * @param {string|number} newPrice - New price.
 */
function updateQuickLaborLinePrice(key, newPrice) {
  const line = quickLaborCart.find((x) => x.key === key);
  if (!line) return;
  const num = parseFloat(newPrice);
  line.price = isNaN(num) || num < 0 ? 0 : num;

  const lineTot = (line.kind === "labor" ? 1 : (Number(line.qty) || 1)) * line.price;
  const chosenTot = $(`ql-chosen-tot-${key}`);
  if (chosenTot) chosenTot.textContent = P(lineTot);

  const summaryTot = $(`ql-summary-tot-${key}`);
  if (summaryTot) summaryTot.textContent = P(lineTot);

  const isOverridden = !line.custom && line.origPrice !== undefined && Number(line.price) !== Number(line.origPrice);
  line.override = isOverridden;

  const tag1 = $(`ql-override-tag-${key}`);
  if (tag1) tag1.style.display = isOverridden ? "inline-flex" : "none";

  const tag2 = $(`ql-summary-override-${key}`);
  if (tag2) tag2.style.display = isOverridden ? "inline-flex" : "none";

  syncQuickLaborSummaryDom();
}

/**
 * Removes a line item from the active cart.
 * @param {string} key - Line key.
 */
function removeQuickLaborLine(key) {
  const idx = quickLaborCart.findIndex((x) => x.key === key);
  if (idx !== -1) {
    const kind = quickLaborCart[idx].kind;
    quickLaborCart.splice(idx, 1);
    if (kind === "labor") {
      renderQuickLaborLaborTiles();
      renderQuickLaborChosenLabor();
      renderQuickLaborStep2Badge();
    } else {
      renderQuickLaborPartTiles();
      renderQuickLaborChosenParts();
      renderQuickLaborStep3Badge();
    }
    renderQuickLaborRightPanel();
    updateQuickLaborMobileBar();
  }
}

/** Backward compatibility alias */
function removeQuickLaborCartLine(key) {
  removeQuickLaborLine(key);
}

/** Backward compatibility alias */
function updateQuickLaborCartFee(key, newFee) {
  updateQuickLaborLinePrice(key, newFee);
}

/**
 * Toggles work finished state and synchronizes both checkboxes.
 * @param {boolean} checked - Checked state.
 */
function setQuickLaborWorkFinished(checked) {
  qlWorkFinished = Boolean(checked);
  const c1 = $("ql-work-finished-step");
  if (c1) c1.checked = qlWorkFinished;
  const c2 = $("ql-work-finished-panel");
  if (c2) c2.checked = qlWorkFinished;

  renderQuickLaborStep4Badge();
  syncQuickLaborSummaryDom();
}

/**
 * Updates Step 4 badge done/active status.
 */
function renderQuickLaborStep4Badge() {
  const badge = $("ql-step-4-badge");
  const stepNum = qlJobType === "laborparts" ? "3" : "2";
  if (badge) {
    badge.className = `ql-step-badge ${qlWorkFinished ? "done" : "active"}`;
    badge.textContent = qlWorkFinished ? "✓" : stepNum;
  }
}

/**
 * Generates Change (green) or Short by (red) HTML string.
 * @param {number} total - Grand total.
 * @param {number} tendered - Tendered amount.
 * @returns {string} HTML string.
 */
function getQuickLaborCashCalcHtml(total, tendered) {
  const diff = (Number(tendered) || 0) - total;
  if (diff >= 0) {
    return `<span>Change:</span><b style="color:var(--success);font-size:14px">${P(diff)}</b>`;
  }
  return `<span style="color:var(--danger);font-weight:600">Short by:</span><b style="color:var(--danger);font-size:14px">${P(Math.abs(diff))}</b>`;
}

/**
 * Computes disabled reason text for the Record Quick Fix button.
 * Reasons (checked in priority order):
 * 1. "Add at least one labor"
 * 2. "Add at least one part" (Labor + Parts only)
 * 3. "Confirm the work is finished"
 * @param {number} total - Grand total.
 * @returns {string} Reason string or empty if enabled.
 */
function getQuickLaborRecordReason(total = getQuickLaborTotal()) {
  if (!quickLaborCart.some((it) => it.kind === "labor")) {
    return "Add at least one labor";
  }
  if (qlJobType === "laborparts" && !quickLaborCart.some((it) => it.kind === "part")) {
    return "Add at least one part";
  }
  if (!qlWorkFinished) {
    return "Confirm the work is finished";
  }
  if (quickLaborMethod === "Cash" && (Number(quickLaborTendered) || 0) < total) {
    const diff = total - (Number(quickLaborTendered) || 0);
    return `Short by ${P(diff)}`;
  }
  return "";
}

/**
 * Handles cashier input into cash amount received field.
 * Preserves input focus.
 * @param {string} val - Amount entered.
 */
function onQuickLaborTenderedInput(val) {
  const num = parseFloat(val);
  quickLaborTendered = isNaN(num) || num < 0 ? 0 : num;
  syncQuickLaborSummaryDom();
}

/**
 * Sets payment method for Quick Labor ("Cash", "GCash", or "Maya").
 * @param {"Cash"|"GCash"|"Maya"} m - Method name.
 */
function setQuickLaborMethod(m) {
  if (m !== "Cash" && m !== "GCash" && m !== "Maya") return;
  quickLaborMethod = m;
  renderQuickLaborRightPanel();
}

/**
 * Synchronizes DOM summary elements without destroying input focus.
 */
function syncQuickLaborSummaryDom() {
  const total = getQuickLaborTotal();
  const laborSubtotal = getQuickLaborLaborSubtotal();
  const partsSubtotal = qlJobType === "laborparts" ? getQuickLaborPartsSubtotal() : 0;

  const laborEl = $("ql-labor-subtotal");
  if (laborEl) laborEl.textContent = P(laborSubtotal);

  const partsEl = $("ql-parts-subtotal");
  if (partsEl) partsEl.textContent = P(partsSubtotal);

  const totalEl = $("ql-total-val");
  if (totalEl) totalEl.textContent = P(total);

  const cashCalcRow = $("ql-cash-calc-row");
  if (cashCalcRow && quickLaborMethod === "Cash") {
    cashCalcRow.innerHTML = getQuickLaborCashCalcHtml(total, quickLaborTendered);
  }

  const reason = getQuickLaborRecordReason(total);
  const isDisabled = Boolean(reason);

  const chargeBtn = $("ql-charge-btn");
  if (chargeBtn) {
    chargeBtn.disabled = isDisabled;
    chargeBtn.textContent = `Record Quick Fix · ${P(total)}`;
  }

  const reasonEl = $("ql-record-reason");
  if (reasonEl) {
    reasonEl.textContent = reason;
  }

  updateQuickLaborMobileBar();
}

/**
 * Two-step inline confirmation handler for "Clear all" button.
 */
function handleQuickLaborClearAll() {
  const btn = $("ql-btn-clear-all");
  if (!quickLaborClearConfirmActive) {
    quickLaborClearConfirmActive = true;
    if (btn) {
      btn.textContent = "Tap again to clear";
      btn.style.color = "var(--danger, #DC2626)";
      btn.style.fontWeight = "700";
    }
    if (quickLaborClearConfirmTimer) clearTimeout(quickLaborClearConfirmTimer);
    quickLaborClearConfirmTimer = setTimeout(() => {
      quickLaborClearConfirmActive = false;
      const b = $("ql-btn-clear-all");
      if (b) {
        b.textContent = "Clear all";
        b.style.color = "";
        b.style.fontWeight = "";
      }
    }, 3000);
    return;
  }

  quickLaborClearConfirmActive = false;
  if (quickLaborClearConfirmTimer) clearTimeout(quickLaborClearConfirmTimer);
  resetQuickLaborState();
  renderQuickLaborTypeBar();
  renderQuickLaborLeftCol();
  renderQuickLaborRightPanel();
  updateQuickLaborMobileBar();
}

/**
 * Opens mobile bottom sheet summary drawer.
 */
function openQuickLaborBottomSheet() {
  const col = $("ql-right-panel");
  if (col) col.classList.add("bottom-sheet-open");
}

/**
 * Closes mobile bottom sheet summary drawer.
 */
function closeQuickLaborBottomSheet() {
  const col = $("ql-right-panel");
  if (col) col.classList.remove("bottom-sheet-open");
}

/**
 * Updates floating mobile bar checkout summary.
 */
function updateQuickLaborMobileBar() {
  const barEl = $("ql-mobile-bar");
  const total = getQuickLaborTotal();
  const count = getQuickLaborTotalItemsCount();
  if (barEl) {
    barEl.textContent = `View summary · ${count} item${count === 1 ? "" : "s"} · ${P(total)}`;
  }
}

/**
 * Finalizes quick fix ticket, persists to D.wo with type "quicklabor",
 * logs any price overrides to audit trail, opens receipt, and resets to Step 1.
 */
function recordQuickFix() {
  const total = getQuickLaborTotal();

  // Validate all conditions
  const reason = getQuickLaborRecordReason(total);
  if (reason) return;

  const tendered = quickLaborMethod === "Cash" ? (Number(quickLaborTendered) || 0) : total;
  const change = quickLaborMethod === "Cash" ? Math.max(0, tendered - total) : 0;

  const overrides = [];
  const items = quickLaborCart.map((it) => {
    const isOverridden = !it.custom && it.origPrice !== undefined && Number(it.price) !== Number(it.origPrice);
    if (isOverridden) {
      overrides.push({ name: it.name, origPrice: it.origPrice, price: it.price });
    }
    return {
      id: it.id || uid(),
      kind: it.kind,
      name: it.name,
      qty: it.kind === "labor" ? 1 : (Number(it.qty) || 1),
      price: Number(it.price) || 0,
      origPrice: it.origPrice !== undefined ? it.origPrice : Number(it.price) || 0,
      override: Boolean(isOverridden),
      custom: !!it.custom
    };
  });

  // Number format: continue highest existing number
  let maxNum = 0;
  (D.wo || []).forEach((w) => {
    const numStr = (w.no || w.txnId || "").replace(/^TXN-?/i, "");
    const n = parseInt(numStr, 10);
    if (!isNaN(n) && n > maxNum) maxNum = n;
  });
  if (maxNum === 0) maxNum = (D.wo || []).length;
  const nextNum = maxNum + 1;
  const txnId = "TXN-" + String(nextNum).padStart(4, "0");

  const laborSubtotal = getQuickLaborLaborSubtotal();
  const partsSubtotal = qlJobType === "laborparts" ? getQuickLaborPartsSubtotal() : 0;

  const curUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
  const activeName = (curUser && curUser.name && curUser.name.trim()) ? curUser.name.trim() : "Staff";

  const newFix = {
    id: "w" + uid(),
    no: txnId,
    txnId: txnId,
    type: "quicklabor",
    subtype: qlJobType,
    st: "Completed",
    done: nowLocalString(),
    doneAt: nowLocalString(),
    markedAt: nowLocalString(),
    at: today(),
    customer: (quickLaborCustomer && quickLaborCustomer.trim()) ? quickLaborCustomer.trim() : "Walk-in Customer",
    vehicleLine: (quickLaborCustomer && quickLaborCustomer.trim()) ? quickLaborCustomer.trim() : "Walk-in Motorcycle",
    mech: activeName,
    items: items,
    laborSubtotal: laborSubtotal,
    partsSubtotal: partsSubtotal,
    total: total,
    pay: {
      method: quickLaborMethod,
      paidAt: nowLocalString(),
      tendered: tendered,
      change: change,
      ref: (quickLaborMethod === "GCash" || quickLaborMethod === "Maya") && quickLaborRef ? quickLaborRef.trim() : ""
    }
  };

  if (!Array.isArray(D.wo)) D.wo = [];
  D.wo.push(newFix);
  save();

  // Reset page state
  quickLaborCart = [];
  quickLaborCustomer = "";
  qlWorkFinished = false;
  quickLaborTendered = 0;
  quickLaborRef = "";
  quickLaborClearConfirmActive = false;
  if (quickLaborClearConfirmTimer) clearTimeout(quickLaborClearConfirmTimer);
  qlLaborOnlyConfirmActive = false;
  if (qlLaborOnlyConfirmTimer) clearTimeout(qlLaborOnlyConfirmTimer);

  closeQuickLaborBottomSheet();
  renderQuickLaborView();
  if (typeof openReceipt === "function") {
    openReceipt(newFix.id);
  }
}

/** Backward compatibility alias */
function logQuickFix() {
  recordQuickFix();
}

/**
 * Generates HTML for the left column: segmented control + 4 stacked step cards.
 * @returns {string} HTML string.
 */
function getQuickLaborLeftColHtml() {
  const isLaborParts = qlJobType === "laborparts";

  return `
    <!-- STEP 1: Labor done (Required for both Labor Only and Labor + Parts) -->
    <div class="ql-step-card" id="ql-step-2">
      <div class="ql-step-header">
        <div class="ql-step-badge ${quickLaborCart.some((it) => it.kind === 'labor') ? 'done' : 'active'}" id="ql-step-2-badge">
          ${quickLaborCart.some((it) => it.kind === 'labor') ? '✓' : '1'}
        </div>
        <div>
          <div class="ql-step-title">Labor done</div>
          <div class="ql-step-subtitle">Select catalog service or add custom labor (required)</div>
        </div>
      </div>

      <!-- Search bar with live filter and Enter quick-add -->
      <div class="rep-search-wrap" style="margin-bottom:12px">
        <span class="search-icon" onclick="$('ql-search-labor').focus()" title="Search">${LINE_ICONS.insp}</span>
        <input
          id="ql-search-labor"
          type="text"
          placeholder="Search labor (press Enter to quick-add)..."
          value="${escHtml(quickLaborSearchLabor)}"
          autocomplete="off"
          oninput="onQuickLaborSearchLaborInput(this.value)"
          onkeydown="if(event.key==='Enter'){event.preventDefault();addFirstQuickLaborMatch('labor');}"
        />
        <button
          id="ql-search-labor-clear"
          class="search-clear ${quickLaborSearchLabor ? 'visible' : ''}"
          onclick="clearQuickLaborSearchLabor()"
          type="button"
          aria-label="Clear search"
          title="Clear search"
        >✕</button>
      </div>

      <!-- Custom labor inline form container -->
      <div id="ql-custom-labor-wrap"></div>

      <!-- Labor catalog tiles grid container -->
      <div id="ql-labor-tiles-grid-wrap">
        ${getQuickLaborLaborTilesHtml()}
      </div>

      <!-- Chosen labor lines box -->
      <div class="ql-chosen-box" id="ql-chosen-labor-wrap">
        ${getQuickLaborChosenLaborHtml()}
      </div>
    </div>

    <!-- STEP 2: Parts replaced (Labor + Parts only) -->
    ${
      isLaborParts
        ? `
          <div class="ql-step-card" id="ql-step-3">
            <div class="ql-step-header">
              <div class="ql-step-badge ${quickLaborCart.some((it) => it.kind === 'part') ? 'done' : 'active'}" id="ql-step-3-badge">
                ${quickLaborCart.some((it) => it.kind === 'part') ? '✓' : '2'}
              </div>
              <div>
                <div class="ql-step-title">Parts replaced</div>
                <div class="ql-step-subtitle">Parts replaced or consumables used (required)</div>
              </div>
            </div>

            <!-- Search bar with live filter and Enter quick-add -->
            <div class="rep-search-wrap" style="margin-bottom:12px">
              <span class="search-icon" onclick="$('ql-search-part').focus()" title="Search">${LINE_ICONS.insp}</span>
              <input
                id="ql-search-part"
                type="text"
                placeholder="Search parts (press Enter to quick-add)..."
                value="${escHtml(quickLaborSearchPart)}"
                autocomplete="off"
                oninput="onQuickLaborSearchPartInput(this.value)"
                onkeydown="if(event.key==='Enter'){event.preventDefault();addFirstQuickLaborMatch('part');}"
              />
              <button
                id="ql-search-part-clear"
                class="search-clear ${quickLaborSearchPart ? 'visible' : ''}"
                onclick="clearQuickLaborSearchPart()"
                type="button"
                aria-label="Clear search"
                title="Clear search"
              >✕</button>
            </div>

            <!-- Custom part inline form container -->
            <div id="ql-custom-part-wrap"></div>

            <!-- Part catalog tiles grid container -->
            <div id="ql-part-tiles-grid-wrap">
              ${getQuickLaborPartTilesHtml()}
            </div>

            <!-- Chosen parts lines box -->
            <div class="ql-chosen-box" id="ql-chosen-part-wrap">
              ${getQuickLaborChosenPartsHtml()}
            </div>
          </div>
        `
        : ""
    }

    <!-- STEP 3/4: Confirm work is finished -->
    <div class="ql-step-card" id="ql-step-4">
      <div class="ql-step-header">
        <div class="ql-step-badge ${qlWorkFinished ? 'done' : 'active'}" id="ql-step-4-badge">
          ${qlWorkFinished ? '✓' : (isLaborParts ? '3' : '2')}
        </div>
        <div>
          <div class="ql-step-title">Confirm work is finished</div>
          <div class="ql-step-subtitle">Must be checked before logging fix</div>
        </div>
      </div>
      <div>
        <label style="display:inline-flex;align-items:center;gap:10px;cursor:pointer;font-size:14px;font-weight:700;color:var(--text-primary);padding:6px 0;user-select:none">
          <input
            type="checkbox"
            id="ql-work-finished-step"
            style="width:20px;height:20px;accent-color:var(--accent);cursor:pointer"
            ${qlWorkFinished ? "checked" : ""}
            onchange="setQuickLaborWorkFinished(this.checked)"
          />
          <span>Work is finished</span>
        </label>
      </div>
    </div>

    <div class="ql-steps-footer-note">
      ${isLaborParts
        ? "Steps 1 and 2 can be done in any order, but the job is recorded only after the work is done."
        : "The job is recorded after the work is done."}
    </div>
  `;
}

/**
 * Re-renders only the left column steps container.
 */
function renderQuickLaborLeftCol() {
  const col = $("ql-left-col");
  if (col) col.innerHTML = getQuickLaborLeftColHtml();
}

/**
 * Generates full HTML for the right column "Quick Fix Summary" panel.
 * @returns {string} HTML string.
 */
function getQuickLaborRightPanelHtml() {
  const total = getQuickLaborTotal();
  const laborSubtotal = getQuickLaborLaborSubtotal();
  const partsSubtotal = qlJobType === "laborparts" ? getQuickLaborPartsSubtotal() : 0;
  const reason = getQuickLaborRecordReason(total);
  const isDisabled = Boolean(reason);
  const isSuperUser = typeof isSuper === "function" && isSuper();

  return `
    <div class="pos-cart-panel" style="padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:15px;font-weight:800;color:var(--text-primary)">Quick Fix Summary</span>
          <span class="badge" style="font-size:11px;font-weight:700;background:var(--bg-subtle);color:var(--text-primary);padding:2px 8px;border-radius:999px;border:1px solid var(--border)">
            ${qlJobType === 'laborparts' ? 'Labor + Parts' : 'Labor Only'}
          </span>
        </div>
        <div style="display:flex;align-items:center;gap:6px">
          <button
            type="button"
            class="btn g sm"
            id="ql-btn-clear-all"
            onclick="handleQuickLaborClearAll()"
            style="${quickLaborClearConfirmActive ? 'color:var(--danger, #DC2626);font-weight:700' : ''}"
            title="Clear all"
          >
            ${quickLaborClearConfirmActive ? 'Tap again to clear' : 'Clear all'}
          </button>
          <button type="button" class="pos-sheet-close" onclick="closeQuickLaborBottomSheet()" aria-label="Close summary">✕</button>
        </div>
      </div>

      <!-- Customer / Plate -->
      <div style="background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px;margin-bottom:12px;font-size:12px">
        <div>
          <input
            id="ql-customer-input"
            type="text"
            placeholder="Customer or plate (optional)"
            value="${escHtml(quickLaborCustomer)}"
            oninput="quickLaborCustomer = this.value"
            style="width:100%;height:34px;box-sizing:border-box;border-radius:6px;border:1px solid var(--border);padding:0 8px;font-size:12px;background:var(--bg-surface);color:var(--text)"
          />
        </div>
      </div>

      <!-- Itemized Cart List in Summary -->
      <div class="pos-cart-list" id="ql-summary-cart-list">
        ${
          quickLaborCart.length === 0
            ? `<div class="empty" style="padding:24px 16px;text-align:center;font-size:13px;color:var(--text-muted)">No items yet.<br>Add labor or parts from the steps on the left.</div>`
            : quickLaborCart.map((item) => {
                const isLabor = item.kind === "labor";
                const lineTotal = isLabor ? (Number(item.price) || 0) : ((Number(item.qty) || 1) * (Number(item.price) || 0));
                const isOverridden = !item.custom && item.origPrice !== undefined && Number(item.price) !== Number(item.origPrice);
                const isPriceReadOnly = !isSuperUser && !item.custom;

                return `
                  <div class="pos-cart-line" id="ql-summary-line-${item.key}">
                    <div class="pos-cart-line-top">
                      <div style="flex:1;min-width:0;display:flex;align-items:center;flex-wrap:wrap;gap:4px">
                        <span class="cat-badge ${item.kind}" ${isLabor ? 'style="background:#F5F3FF;color:#7C3AED;border-color:#DDD6FE"' : ''}>${isLabor ? 'Labor' : 'Part'}</span>
                        <b style="font-size:13px;color:var(--text-primary)">${escHtml(item.name)}</b>
                        <span id="ql-summary-override-${item.key}" class="badge-override" style="font-size:10px;padding:1px 4px;${isOverridden ? '' : 'display:none'}">OVERRIDE</span>
                      </div>
                      <button type="button" class="pos-line-del-btn" onclick="removeQuickLaborLine('${item.key}')" title="Remove item">✕</button>
                    </div>

                    ${
                      isLabor
                        ? `
                          <div class="pos-cart-line-bottom" style="justify-content:space-between">
                            <div style="display:flex;align-items:center;gap:4px">
                              <span style="font-size:12px;font-weight:600;color:var(--text-secondary)">Fee: ₱</span>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                class="pos-price-input"
                                value="${item.price}"
                                ${isPriceReadOnly ? "readonly disabled style='background:var(--bg-subtle);color:var(--text-muted)'" : ""}
                                oninput="updateQuickLaborLinePrice('${item.key}', this.value)"
                                style="width:90px;height:28px;border-radius:4px;border:1px solid var(--border);padding:0 6px;font-size:13px;font-weight:700;text-align:right"
                              />
                            </div>
                            <b style="font-size:13px;color:var(--text);min-width:60px;text-align:right" id="ql-summary-tot-${item.key}">
                              ${P(lineTotal)}
                            </b>
                          </div>
                        `
                        : `
                          <div class="pos-cart-line-bottom">
                            <div class="pos-qty-stepper">
                              <button type="button" class="pos-qty-btn" onclick="updateQuickLaborCartQty('${item.key}', -1)" title="Decrease quantity">−</button>
                              <span class="pos-qty-val">${item.qty}</span>
                              <button type="button" class="pos-qty-btn" onclick="updateQuickLaborCartQty('${item.key}', 1)" title="Increase quantity">+</button>
                            </div>
                            <div style="display:flex;align-items:center;gap:4px">
                              <span style="font-size:11px;color:var(--text-muted)">@ ₱</span>
                              <input
                                type="number"
                                min="0"
                                step="1"
                                class="pos-price-input"
                                value="${item.price}"
                                ${isPriceReadOnly ? "readonly disabled style='background:var(--bg-subtle);color:var(--text-muted)'" : ""}
                                oninput="updateQuickLaborLinePrice('${item.key}', this.value)"
                                style="width:80px;height:28px;border-radius:4px;border:1px solid var(--border);padding:0 6px;font-size:13px;font-weight:700;text-align:right"
                              />
                            </div>
                            <b style="font-size:13px;color:var(--text);min-width:60px;text-align:right" id="ql-summary-tot-${item.key}">
                              ${P(lineTotal)}
                            </b>
                          </div>
                        `
                    }
                  </div>
                `;
              }).join("")
        }
      </div>

      <!-- Totals Block -->
      <div class="pos-totals-block" style="margin-top:12px">
        <div class="pos-totals-row" style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-bottom:4px">
          <span>Labor Subtotal</span>
          <span id="ql-labor-subtotal">${P(laborSubtotal)}</span>
        </div>
        ${
          qlJobType === "laborparts"
            ? `
              <div class="pos-totals-row" style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-secondary);margin-bottom:6px">
                <span>Parts Subtotal</span>
                <span id="ql-parts-subtotal">${P(partsSubtotal)}</span>
              </div>
            `
            : ""
        }
        <div class="pos-totals-row grand-total" style="display:flex;justify-content:space-between;border-top:1px solid var(--border);padding-top:8px">
          <span style="font-size:14px;font-weight:700">Total</span>
          <span id="ql-total-val" style="font-size:16px;font-weight:800;color:var(--text)">${P(total)}</span>
        </div>
      </div>

      <!-- Required Checkbox: Work is finished -->
      <div style="margin-top:14px;padding:8px 10px;background:var(--bg-subtle);border-radius:8px;border:1px solid var(--border)">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;font-weight:700;color:var(--text-primary);user-select:none">
          <input
            type="checkbox"
            id="ql-work-finished-panel"
            style="width:18px;height:18px;accent-color:var(--accent);cursor:pointer"
            ${qlWorkFinished ? "checked" : ""}
            onchange="setQuickLaborWorkFinished(this.checked)"
          />
          <span>Work is finished <span style="color:var(--danger)">*</span></span>
        </label>
      </div>

      <!-- Payment Method Toggle: Cash, GCash, Maya -->
      <div style="margin-top:14px">
        <label style="font-size:11px;font-weight:700;color:var(--text-muted);text-transform:uppercase;display:block;margin-bottom:6px">Payment Method</label>
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:6px">
          <button
            type="button"
            class="btn g sm ${quickLaborMethod === 'Cash' ? 'on' : ''}"
            style="${quickLaborMethod === 'Cash' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}"
            onclick="setQuickLaborMethod('Cash')"
          >
            <span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.money}</span>Cash
          </button>
          <button
            type="button"
            class="btn g sm ${quickLaborMethod === 'GCash' ? 'on' : ''}"
            style="${quickLaborMethod === 'GCash' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}"
            onclick="setQuickLaborMethod('GCash')"
          >
            <span style="display:inline-flex;align-items:center;margin-right:4px">${ICONS.phone}</span>GCash
          </button>
          <button
            type="button"
            class="btn g sm ${quickLaborMethod === 'Maya' ? 'on' : ''}"
            style="${quickLaborMethod === 'Maya' ? 'background:var(--accent);color:#FFF;border-color:var(--accent);font-weight:700' : ''}"
            onclick="setQuickLaborMethod('Maya')"
          >
            <span style="display:inline-flex;align-items:center;margin-right:4px">${LINE_ICONS.bill}</span>Maya
          </button>
        </div>
      </div>

      <!-- Amount received and Change breakdown -->
      ${
        quickLaborMethod === "Cash"
          ? `
            <div style="margin-top:12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
                <label for="ql-tendered-input" style="font-size:12px;font-weight:700;color:var(--text-secondary)">Amount Received (PHP):</label>
                <input
                  id="ql-tendered-input"
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value="${quickLaborTendered > 0 ? quickLaborTendered : ''}"
                  oninput="onQuickLaborTenderedInput(this.value)"
                  style="width:100px;height:32px;border-radius:6px;border:1px solid var(--border);padding:0 8px;text-align:right;font-size:13px;font-weight:700;background:var(--bg-surface);color:var(--text)"
                />
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:12px" id="ql-cash-calc-row">
                ${getQuickLaborCashCalcHtml(total, quickLaborTendered)}
              </div>
            </div>
          `
          : `
            <div style="margin-top:12px;background:var(--bg-subtle);border:1px solid var(--border);border-radius:8px;padding:10px 12px">
              <div style="font-size:12px;color:var(--text-secondary);margin-bottom:6px">
                Digital payment via <b>${escHtml(quickLaborMethod)}</b>. Exact amount (${P(total)}) billed.
              </div>
              <label for="ql-ref-input" style="font-size:11px;font-weight:600;color:var(--text-muted);display:block;margin-bottom:4px">Reference No. (optional):</label>
              <input
                id="ql-ref-input"
                type="text"
                placeholder="e.g. 1002938472"
                value="${escHtml(quickLaborRef)}"
                oninput="quickLaborRef = this.value"
                style="width:100%;height:32px;border-radius:6px;border:1px solid var(--border);padding:0 8px;font-size:13px;box-sizing:border-box;background:var(--bg-surface);color:var(--text)"
              />
            </div>
          `
      }

      <!-- Primary Action Button: Record Quick Fix -->
      <button
        type="button"
        class="pos-charge-btn"
        id="ql-charge-btn"
        onclick="recordQuickFix()"
        ${isDisabled ? 'disabled' : ''}
        style="margin-top:14px"
      >
        Record Quick Fix · ${P(total)}
      </button>
      <div id="ql-record-reason" style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:6px;min-height:16px">
        ${reason}
      </div>
    </div>
  `;
}

/**
 * Re-renders only the right panel summary in the DOM.
 */
function renderQuickLaborRightPanel() {
  const panel = $("ql-right-panel");
  if (panel) panel.innerHTML = getQuickLaborRightPanelHtml();
}

/**
 * Re-renders both columns of the Quick Labor view.
 */
function renderQuickLaborView() {
  renderQuickLaborLeftCol();
  renderQuickLaborRightPanel();
}

/**
 * Generates the full HTML markup for the Quick Labor page view.
 * @returns {string} HTML markup string.
 */
function getQuickLaborViewHtml() {
  return `
    <h1 class="sr-only">Quick Labor</h1>

    <div class="ql-mode-bar ql-type-bar" id="ql-type-bar-wrap" role="group" aria-label="Job Type">
      ${getQuickLaborTypeBarHtml()}
    </div>

    <div class="pos-layout">
      <!-- Left Column: Step Cards stacked -->
      <div class="pos-left-col" id="ql-left-col">
        ${getQuickLaborLeftColHtml()}
      </div>

      <!-- Right Column: Quick Fix Summary Panel -->
      <div class="pos-right-col" id="ql-right-panel">
        ${getQuickLaborRightPanelHtml()}
      </div>
    </div>

    <!-- Mobile Floating Checkout Bar (<900px) -->
    <div class="pos-mobile-bar" id="ql-mobile-bar" onclick="openQuickLaborBottomSheet()">
      View summary · ${getQuickLaborTotalItemsCount()} items · ${P(getQuickLaborTotal())}
    </div>
  `;
}





/* ==========================================================
   10. INIT
   ========================================================== */

/**
 * Bootstraps authentication and application state on page load.
 * Restores session, active role, and active view with zero flash.
 */
function initAuth() {
  const yearEl = $("login-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. Read sidebar state & UI state
  updateSidebarToggleUI();
  if (desktopSidebarState === "collapsed" && typeof window !== "undefined" && window.innerWidth >= 900) {
    if (document.body) document.body.classList.add("sidebar--collapsed");
  }

  // Read users & session
  const users = loadUsers();
  const session = getSession();

  let validUser = null;
  if (session && session.userId) {
    const found = users.find((u) => u.id === session.userId);
    if (found && found.active !== false) {
      validUser = found;
    }
  }

  // 2. If session is valid
  if (validUser) {
    const activeRole = session.role && ROLES[session.role] ? session.role : validUser.role;

    // Render sidebar user profile and navigation
    renderSidebarUser();
    renderNav();

    // 3. Choose the page in order:
    // a. URL hash if valid page key and canOpen() allows it
    // b. session.view if allowed
    // c. First allowed page (dash if allowed, else allowed[0])
    // d. renderNoAccess()
    const allowed = getRoleNav(activeRole);
    const hashKey = (typeof window !== "undefined" && window.location && window.location.hash
      ? window.location.hash.replace(/^#/, "").trim()
      : "");

    let targetPage = null;
    if (hashKey && canOpen(hashKey)) {
      targetPage = hashKey;
    } else if (session.view && canOpen(session.view)) {
      targetPage = session.view;
    } else if ((hashKey === "qlabor" || session.view === "qlabor") && canOpen("pos")) {
      targetPage = "pos";
    } else if (allowed.length > 0) {
      targetPage = allowed.includes("dash") ? "dash" : allowed[0];
    }

    if (targetPage) {
      go(targetPage);
    } else {
      view = "";
      $("main").innerHTML = renderNoAccess();
    }

    // Show the app shell
    document.body.classList.remove("logged-out");
    document.body.classList.add("logged-in");
  } else {
    // 4. If no valid session, corrupted, or user deactivated/deleted:
    clearSession();
    if (typeof window !== "undefined" && window.location && window.location.hash) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", (window.location.pathname || "") + (window.location.search || ""));
      } else {
        window.location.hash = "";
      }
    }
    if (document.documentElement) document.documentElement.classList.remove("has-session");
    document.body.classList.remove("logged-in");
    document.body.classList.add("logged-out");

    const emailEl = $("login-email");
    if (emailEl) {
      emailEl.value = "";
      emailEl.focus();
      openLoginDropdown();
    }
  }
}

// Listen to browser Back and Forward hash changes
if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => {
    const u = getCurrentUser();
    if (!u) return;
    const hashKey = (window.location && window.location.hash ? window.location.hash : "").replace(/^#/, "").trim();
    if (hashKey && hashKey !== view) {
      if (canOpen(hashKey)) {
        go(hashKey);
      } else if (hashKey === "qlabor" && canOpen("pos")) {
        go("pos");
      }
    }
  });
}

initAuth();
