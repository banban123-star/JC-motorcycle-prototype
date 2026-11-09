/**
 * Fixed Demo Data Seed for MotoShop prototype.
 * Loaded on every page load to provide consistent demo states across Active Repairs, POS, and Catalogs.
 */

const DEMO_DATA = (function () {
  const now = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const customers = [
    { id: "c1", name: "Juan Dela Cruz", phone: "0917 555 0101" },
    { id: "c2", name: "Maria Santos", phone: "0918 555 0142" },
    { id: "c3", name: "Pedro Reyes", phone: "0920 555 0177" },
    { id: "c4", name: "Antonio Luna", phone: "0922 555 0214" },
    { id: "c5", name: "Carlo Mendoza", phone: "0919 555 0356" },
    { id: "c6", name: "Grace Bautista", phone: "0927 555 0489" },
    { id: "c7", name: "Eduardo Ramos", phone: "0915 555 0562" },
    { id: "c8", name: "Josefina Garcia", phone: "0928 555 0633" },
    { id: "c9", name: "Roberto Dizon", phone: "0916 555 0741" },
    { id: "c10", name: "Angela Mercado", phone: "0926 555 0895" },
    { id: "c11", name: "Mark Villanueva", phone: "0917 555 0924" },
    { id: "c12", name: "Teresa Aquino", phone: "0921 555 1038" },
    { id: "c13", name: "Noel Pascual", phone: "0918 555 1172" },
    { id: "c14", name: "Patricia Cruz", phone: "0929 555 1256" },
    { id: "c15", name: "Gabriel Soriano", phone: "0919 555 1380" }
  ];

  const motorcycles = [
    { id: "b1", cid: "c1", make: "Yamaha", model: "Sniper 150 V2", year: 2021, plate: "ABC-1234", odo: 14500 },
    { id: "b2", cid: "c2", make: "Yamaha", model: "Sniper 155", year: 2022, plate: "XYZ-9876", odo: 9200 },
    { id: "b3", cid: "c3", make: "Honda", model: "Click 125", year: 2020, plate: "DEF-5678", odo: 23100 },
    { id: "b4", cid: "c4", make: "Suzuki", model: "Raider R150", year: 2021, plate: "GHI-3412", odo: 18400 },
    { id: "b5", cid: "c5", make: "Honda", model: "ADV 160", year: 2023, plate: "JKL-7821", odo: 6700 },
    { id: "b6", cid: "c6", make: "Yamaha", model: "Sniper 150 V2", year: 2020, plate: "MNO-9043", odo: 28900 },
    { id: "b7", cid: "c7", make: "Kawasaki", model: "Barako II 175", year: 2019, plate: "PQR-1156", odo: 34200 },
    { id: "b8", cid: "c8", make: "Honda", model: "Click 160", year: 2022, plate: "STU-6523", odo: 12300 },
    { id: "b9", cid: "c9", make: "Suzuki", model: "Burgman Street 125", year: 2021, plate: "VWX-4490", odo: 19800 },
    { id: "b10", cid: "c10", make: "Yamaha", model: "Sniper 155", year: 2023, plate: "YZA-8812", odo: 5400 },
    { id: "b11", cid: "c11", make: "Honda", model: "Winner X", year: 2022, plate: "BCD-3371", odo: 15600 },
    { id: "b12", cid: "c12", make: "Kawasaki", model: "Rouser NS200", year: 2021, plate: "EFG-7745", odo: 21400 },
    { id: "b13", cid: "c13", make: "Honda", model: "Beat", year: 2021, plate: "HIJ-2289", odo: 17800 },
    { id: "b14", cid: "c14", make: "Suzuki", model: "Smash 115", year: 2020, plate: "KLM-5534", odo: 26500 },
    { id: "b15", cid: "c15", make: "Yamaha", model: "Sniper 150 V2", year: 2022, plate: "NOP-9967", odo: 11100 }
  ];

  const jobOrders = [
    // 1-3: Awaiting Parts/Approval (3) - Unpaid, no advance paid
    {
      id: "w1",
      bid: "b1",
      mech: "Larpus",
      st: "Awaiting Parts/Approval",
      sv: ["s1"],
      odo: 14500,
      at: todayStr,
      note: "Engine noise and change oil needed",
      complaints: ["Engine noise", "Regular maintenance"],
      advances: [],
      items: [],
      extra: []
    },
    {
      id: "w2",
      bid: "b2",
      mech: "Hiyo",
      st: "Awaiting Parts/Approval",
      sv: ["s4"],
      odo: 9200,
      at: todayStr,
      note: "Squeaking front brake when stopping",
      complaints: ["Brake problem"],
      advances: [],
      items: [],
      extra: []
    },
    {
      id: "w3",
      bid: "b3",
      mech: "Larpus",
      st: "Awaiting Parts/Approval",
      sv: ["s5"],
      odo: 23100,
      at: todayStr,
      note: "Hard to start in the morning and rough idle",
      complaints: ["Hard to start"],
      advances: [],
      items: [],
      extra: []
    },

    // 4-6: In Progress (3) - Advance paid, Partially Paid
    {
      id: "w4",
      bid: "b4",
      mech: "Hiyo",
      st: "In Progress",
      sv: ["s1", "s5"],
      odo: 18400,
      at: todayStr,
      note: "Routine 18,000 km periodic maintenance",
      complaints: ["Regular maintenance"],
      advances: [
        { id: "adv-w4", amount: 500, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w5",
      bid: "b5",
      mech: "Larpus",
      st: "In Progress",
      sv: ["s3"],
      odo: 6700,
      at: todayStr,
      note: "Sluggish acceleration and CVT belt vibration",
      complaints: ["Poor acceleration", "Vibration"],
      advances: [
        { id: "adv-w5", amount: 300, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w6",
      bid: "b6",
      mech: "Hiyo",
      st: "In Progress",
      sv: ["s1", "s2"],
      odo: 28900,
      at: todayStr,
      note: "Engine tapping sound and valve clearance adjustment",
      complaints: ["Engine noise"],
      advances: [
        { id: "adv-w6", amount: 500, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },

    // 7-9: Checking (3) - Advance paid, Partially Paid
    {
      id: "w7",
      bid: "b7",
      mech: "Larpus",
      st: "Checking",
      sv: ["s1", "s3"],
      odo: 34200,
      at: todayStr,
      note: "Major transmission check and fluid replacement",
      complaints: ["Regular maintenance"],
      advances: [
        { id: "adv-w7", amount: 600, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w8",
      bid: "b8",
      mech: "Hiyo",
      st: "Checking",
      sv: ["s2", "s5"],
      odo: 12300,
      at: todayStr,
      note: "Engine tune-up and valve gap clearance adjustment",
      complaints: ["Hard to start", "Engine noise"],
      advances: [
        { id: "adv-w8", amount: 400, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w9",
      bid: "b9",
      mech: "Larpus",
      st: "Checking",
      sv: ["s4", "s5"],
      odo: 19800,
      at: todayStr,
      note: "Front brake overhaul and complete ignition tune-up",
      complaints: ["Brake problem", "Poor acceleration"],
      advances: [
        { id: "adv-w9", amount: 800, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },

    // 10-12: Ready for Billing / Ready for Pickup (3) - Advance paid, Partially Paid
    {
      id: "w10",
      bid: "b10",
      mech: "Hiyo",
      st: "Ready for Pickup",
      sv: ["s1", "s5"],
      odo: 5400,
      at: todayStr,
      note: "First 5,000 km checkup and oil replacement",
      complaints: ["Regular maintenance"],
      advances: [
        { id: "adv-w10", amount: 500, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w11",
      bid: "b11",
      mech: "Larpus",
      st: "Ready for Pickup",
      sv: ["s4"],
      odo: 15600,
      at: todayStr,
      note: "Brake pads replacement and caliper cleaning done",
      complaints: ["Brake problem"],
      advances: [
        { id: "adv-w11", amount: 500, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },
    {
      id: "w12",
      bid: "b12",
      mech: "Hiyo",
      st: "Ready for Pickup",
      sv: ["s1", "s3"],
      odo: 21400,
      at: todayStr,
      note: "Full CVT cleaning, belt inspection, oil change",
      complaints: ["Poor acceleration"],
      advances: [
        { id: "adv-w12", amount: 600, at: todayStr, method: "Cash", note: "Initial advance" }
      ],
      items: [],
      extra: []
    },

    // 13-15: Completed (3) - Fully Paid
    {
      id: "w13",
      bid: "b13",
      mech: "Larpus",
      st: "Completed",
      sv: ["s1"],
      odo: 17800,
      at: todayStr,
      done: `${todayStr}T10:30:00`,
      note: "Routine oil change and oil filter replacement",
      complaints: ["Regular maintenance"],
      advances: [
        { id: "adv-w13", amount: 300, at: todayStr, method: "Cash", note: "Advance deposit" }
      ],
      pay: {
        method: "Cash",
        paidAt: `${todayStr}T10:30:00`,
        amount: 750,
        cash: 750,
        change: 0
      },
      items: [],
      extra: []
    },
    {
      id: "w14",
      bid: "b14",
      mech: "Hiyo",
      st: "Completed",
      sv: ["s4"],
      odo: 26500,
      at: todayStr,
      done: `${todayStr}T11:45:00`,
      note: "Front brake overhaul and fluid bleed",
      complaints: ["Brake problem"],
      advances: [
        { id: "adv-w14", amount: 500, at: todayStr, method: "Cash", note: "Advance deposit" }
      ],
      pay: {
        method: "GCash",
        paidAt: `${todayStr}T11:45:00`,
        amount: 1150,
        cash: 1150,
        change: 0
      },
      items: [],
      extra: []
    },
    {
      id: "w15",
      bid: "b15",
      mech: "Larpus",
      st: "Completed",
      sv: ["s1", "s5"],
      odo: 11100,
      at: todayStr,
      done: `${todayStr}T14:15:00`,
      note: "Tune-up, spark plug change, and engine oil replacement",
      complaints: ["Regular maintenance", "Hard to start"],
      advances: [
        { id: "adv-w15", amount: 500, at: todayStr, method: "Cash", note: "Advance deposit" }
      ],
      pay: {
        method: "Cash",
        paidAt: `${todayStr}T14:15:00`,
        amount: 1360,
        cash: 1360,
        change: 0
      },
      items: [],
      extra: []
    }
  ];

  const transactions = [
    {
      id: "t1",
      txnId: "TXN-0001",
      type: "REPAIR SERVICE",
      jobId: "JO-0001",
      woId: "w1",
      date: todayStr,
      customerName: "Juan Dela Cruz",
      customerPhone: "0917 555 0101",
      plate: "ABC-1234",
      makeModel: "Yamaha Sniper 150 V2",
      odometer: 14500,
      mechanic: "Larpus",
      totalAmount: 750,
      advancePaid: 0,
      balanceDue: 750,
      paymentStatus: "Unpaid"
    },
    {
      id: "t2",
      txnId: "TXN-0002",
      type: "REPAIR SERVICE",
      jobId: "JO-0002",
      woId: "w2",
      date: todayStr,
      customerName: "Maria Santos",
      customerPhone: "0918 555 0142",
      plate: "XYZ-9876",
      makeModel: "Yamaha Sniper 155",
      odometer: 9200,
      mechanic: "Hiyo",
      totalAmount: 1150,
      advancePaid: 0,
      balanceDue: 1150,
      paymentStatus: "Unpaid"
    },
    {
      id: "t3",
      txnId: "TXN-0003",
      type: "REPAIR SERVICE",
      jobId: "JO-0003",
      woId: "w3",
      date: todayStr,
      customerName: "Pedro Reyes",
      customerPhone: "0920 555 0177",
      plate: "DEF-5678",
      makeModel: "Honda Click 125",
      odometer: 23100,
      mechanic: "Larpus",
      totalAmount: 610,
      advancePaid: 0,
      balanceDue: 610,
      paymentStatus: "Unpaid"
    },
    {
      id: "t4",
      txnId: "TXN-0004",
      type: "REPAIR SERVICE",
      jobId: "JO-0004",
      woId: "w4",
      date: todayStr,
      customerName: "Antonio Luna",
      customerPhone: "0922 555 0214",
      plate: "GHI-3412",
      makeModel: "Suzuki Raider R150",
      odometer: 18400,
      mechanic: "Hiyo",
      totalAmount: 1360,
      advancePaid: 500,
      balanceDue: 860,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t5",
      txnId: "TXN-0005",
      type: "REPAIR SERVICE",
      jobId: "JO-0005",
      woId: "w5",
      date: todayStr,
      customerName: "Carlo Mendoza",
      customerPhone: "0919 555 0356",
      plate: "JKL-7821",
      makeModel: "Honda ADV 160",
      odometer: 6700,
      mechanic: "Larpus",
      totalAmount: 750,
      advancePaid: 300,
      balanceDue: 450,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t6",
      txnId: "TXN-0006",
      type: "REPAIR SERVICE",
      jobId: "JO-0006",
      woId: "w6",
      date: todayStr,
      customerName: "Grace Bautista",
      customerPhone: "0927 555 0489",
      plate: "MNO-9043",
      makeModel: "Yamaha Sniper 150 V2",
      odometer: 28900,
      mechanic: "Hiyo",
      totalAmount: 1200,
      advancePaid: 500,
      balanceDue: 700,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t7",
      txnId: "TXN-0007",
      type: "REPAIR SERVICE",
      jobId: "JO-0007",
      woId: "w7",
      date: todayStr,
      customerName: "Eduardo Ramos",
      customerPhone: "0915 555 0562",
      plate: "PQR-1156",
      makeModel: "Kawasaki Barako II 175",
      odometer: 34200,
      mechanic: "Larpus",
      totalAmount: 1500,
      advancePaid: 600,
      balanceDue: 900,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t8",
      txnId: "TXN-0008",
      type: "REPAIR SERVICE",
      jobId: "JO-0008",
      woId: "w8",
      date: todayStr,
      customerName: "Josefina Garcia",
      customerPhone: "0928 555 0633",
      plate: "STU-6523",
      makeModel: "Honda Click 160",
      odometer: 12300,
      mechanic: "Hiyo",
      totalAmount: 1060,
      advancePaid: 400,
      balanceDue: 660,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t9",
      txnId: "TXN-0009",
      type: "REPAIR SERVICE",
      jobId: "JO-0009",
      woId: "w9",
      date: todayStr,
      customerName: "Roberto Dizon",
      customerPhone: "0916 555 0741",
      plate: "VWX-4490",
      makeModel: "Suzuki Burgman Street 125",
      odometer: 19800,
      mechanic: "Larpus",
      totalAmount: 1760,
      advancePaid: 800,
      balanceDue: 960,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t10",
      txnId: "TXN-0010",
      type: "REPAIR SERVICE",
      jobId: "JO-0010",
      woId: "w10",
      date: todayStr,
      customerName: "Angela Mercado",
      customerPhone: "0926 555 0895",
      plate: "YZA-8812",
      makeModel: "Yamaha Sniper 155",
      odometer: 5400,
      mechanic: "Hiyo",
      totalAmount: 1360,
      advancePaid: 500,
      balanceDue: 860,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t11",
      txnId: "TXN-0011",
      type: "REPAIR SERVICE",
      jobId: "JO-0011",
      woId: "w11",
      date: todayStr,
      customerName: "Mark Villanueva",
      customerPhone: "0917 555 0924",
      plate: "BCD-3371",
      makeModel: "Honda Winner X",
      odometer: 15600,
      mechanic: "Larpus",
      totalAmount: 1150,
      advancePaid: 500,
      balanceDue: 650,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t12",
      txnId: "TXN-0012",
      type: "REPAIR SERVICE",
      jobId: "JO-0012",
      woId: "w12",
      date: todayStr,
      customerName: "Teresa Aquino",
      customerPhone: "0921 555 1038",
      plate: "EFG-7745",
      makeModel: "Kawasaki Rouser NS200",
      odometer: 21400,
      mechanic: "Hiyo",
      totalAmount: 1500,
      advancePaid: 600,
      balanceDue: 900,
      paymentStatus: "Partially Paid"
    },
    {
      id: "t13",
      txnId: "TXN-0013",
      type: "REPAIR SERVICE",
      jobId: "JO-0013",
      woId: "w13",
      date: todayStr,
      customerName: "Noel Pascual",
      customerPhone: "0918 555 1172",
      plate: "HIJ-2289",
      makeModel: "Honda Beat",
      odometer: 17800,
      mechanic: "Larpus",
      totalAmount: 750,
      advancePaid: 300,
      balanceDue: 0,
      paymentStatus: "Paid"
    },
    {
      id: "t14",
      txnId: "TXN-0014",
      type: "REPAIR SERVICE",
      jobId: "JO-0014",
      woId: "w14",
      date: todayStr,
      customerName: "Patricia Cruz",
      customerPhone: "0929 555 1256",
      plate: "KLM-5534",
      makeModel: "Suzuki Smash 115",
      odometer: 26500,
      mechanic: "Hiyo",
      totalAmount: 1150,
      advancePaid: 500,
      balanceDue: 0,
      paymentStatus: "Paid"
    },
    {
      id: "t15",
      txnId: "TXN-0015",
      type: "REPAIR SERVICE",
      jobId: "JO-0015",
      woId: "w15",
      date: todayStr,
      customerName: "Gabriel Soriano",
      customerPhone: "0919 555 1380",
      plate: "NOP-9967",
      makeModel: "Yamaha Sniper 150 V2",
      odometer: 11100,
      mechanic: "Larpus",
      totalAmount: 1360,
      advancePaid: 500,
      balanceDue: 0,
      paymentStatus: "Paid"
    }
  ];

  return {
    customers: customers,
    motorcycles: motorcycles,
    jobOrders: jobOrders,
    transactions: transactions,
    // Shorthand aliases matching app database schema
    cu: customers,
    bk: motorcycles,
    wo: jobOrders
  };
})();

if (typeof window !== "undefined") {
  window.DEMO_DATA = DEMO_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = DEMO_DATA;
}
