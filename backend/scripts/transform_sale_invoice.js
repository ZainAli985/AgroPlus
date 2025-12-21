import fs from "fs";
import path from "path";

/* ========= FILE PATHS ========= */
const inputFilePath = path.resolve(
  "D:/REHMAN-RICE-MILL/backend/data/SALES-INVOICES.json"
);

const outputFilePath = path.resolve(
  "D:/REHMAN-RICE-MILL/backend/data/SALES-INVOICES-CLEAN.json"
);

/* ========= HELPERS ========= */
const toNumber = (val) => {
  if (val === undefined || val === null || val === "") return 0;
  const n = Number(val.toString().replace(/,/g, ""));
  return isNaN(n) ? 0 : n;
};

const generateBuilty = (sr) => `AUTO-${sr}`;

/* ========= LOAD DATA ========= */
const rawData = JSON.parse(fs.readFileSync(inputFilePath, "utf-8"));

/* ========= TRANSFORM ========= */
const cleanData = rawData.map((entry, index) => {
  const sr = toNumber(entry["Sr."]) || index + 1;

  const weight = toNumber(entry.Weight);
  const bagWeight = toNumber(entry["Bag Weight"]);

  const netWeight =
    toNumber(entry["Net Weight"]) || weight - bagWeight;

  const netWeight40 =
    toNumber(entry["Net Weight/40Kg"]) || netWeight / 40;

  const rate40 = toNumber(entry["Rate/ 40 kg"]);
  const amount =
    toNumber(entry.Amount) || netWeight40 * rate40;

  const sutliSilaiRate = toNumber(entry["Sutli Silai Rate"]);
  const sutliSilaiAmount =
    toNumber(entry["Sutli Silai Amount"]) ||
    sutliSilaiRate * toNumber(entry.Quantity);

  const totalAmount =
    toNumber(entry["Total Amount"]) ||
    amount + sutliSilaiAmount;

  return {
    /* ===== OPTIONAL (BUT USEFUL) ===== */
    sr,

    /* ===== BASIC INFO ===== */
    date: entry.Date || "",
    vehicleNo: entry["Vehicle No."] || "",
    builtyNo: entry["Builty No."] || generateBuilty(sr),

    /* ===== PARTIES ===== */
    vendorName: entry["Vendor Name"] || "",
    brokerName: entry["Broker Name"] || "",

    /* ===== PRODUCT ===== */
    paddyType: entry["Paddy Type"] || "",
    quantity: toNumber(entry.Quantity),

    /* ===== WEIGHTS ===== */
    weight,
    bagWeight,
    netWeight,
    netWeight40,

    /* ===== RATE & AMOUNTS ===== */
    rate40,
    amount,

    sutliSilaiRate,
    sutliSilaiAmount,

    totalAmount,

    /* ===== BROKERY ===== */
    brokeryRate: toNumber(entry["Brokery Rate"]),
    brokery: toNumber(entry["Brokery"]),
    totalAmount2: toNumber(entry["Total Amount2"]) || totalAmount,
  };
});

/* ========= SAVE ========= */
fs.writeFileSync(
  outputFilePath,
  JSON.stringify(cleanData, null, 2),
  "utf-8"
);

console.log(`✅ Cleaned ${cleanData.length} sales invoices`);
console.log(`📁 Output file created at:\n${outputFilePath}`);
