import fs from "fs";
import path from "path";

/* ========= FILE PATHS ========= */
const inputFile = path.resolve(
  "D:/REHMAN-RICE-MILL/backend/data/RAW_PURCHASE_INVOICES.json"
);

const outputFile = path.resolve(
  "D:/REHMAN-RICE-MILL/backend/data/CLEAN_PURCHASE_INVOICES.json"
);

/* ========= HELPERS ========= */
const toNumber = (val) => {
  if (val === null || val === undefined || val === "") return 0;
  const n = Number(val);
  return isNaN(n) ? 0 : n;
};

const generateBuilty = (sr) => `AUTO-${sr}`;

/* ========= READ RAW DATA ========= */
const rawData = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

/* ========= CLEAN & NORMALIZE ========= */
const cleanData = rawData.map((entry, index) => {
  const sr = toNumber(entry["Sr."]) || index + 1;

  const emptyVehicleWeight = toNumber(entry.EmptyVehicleWeight);
  const filledVehicleWeight = toNumber(entry.FilledVehicleWeight);

  const subtractWeight =
    toNumber(entry.SubtractWeight) ||
    filledVehicleWeight - emptyVehicleWeight;

  const bagWeight = toNumber(entry.BagWeight);
  const moistureAdjustment = toNumber(entry["Moisture Adjustment"]);

  const finalWeight =
    toNumber(entry.FinalWeight) || subtractWeight - bagWeight;

  const netWeight =
    toNumber(entry.NetWeight) ||
    finalWeight - moistureAdjustment;

  const netWeight40KG =
    toNumber(entry.NetWeight_40KG) || netWeight / 40;

  const weightKG =
    toNumber(entry.Weight_KG) ||
    (netWeight40KG > 0 ? netWeight40KG * 0.188 : 0);

  return {
    /* ===== REQUIRED ===== */
    sr,
    date: entry.Date || "N/A",

    /* ===== PARTIES ===== */
    vendorName: entry.VendorName || "UNKNOWN",
    brokerName: entry.BrokerName || "",

    /* ===== TRANSPORT ===== */
    vehicleNumber: entry.VehicleNumber || "UNKNOWN",
    builtyNumber: entry.BuiltyNumber || generateBuilty(sr),

    /* ===== PRODUCT ===== */
    paddyType: entry.PaddyType || "",
    quantity: toNumber(entry.Quantity),

    /* ===== WEIGHTS ===== */
    emptyVehicleWeight,
    filledVehicleWeight,
    subtractWeight,
    bagWeight,
    finalWeight,

    moisturePercent: toNumber(entry["Moisture %"]),
    moistureAdjCal: toNumber(entry["Moisture Adj. Cal."]),
    moistureAdjustment,

    netWeightCal: finalWeight,
    netWeight,
    netWeight40KG,
    weightKG,

    /* ===== RATE & AMOUNT ===== */
    rate40kg: toNumber(entry["Rate/ 40 kg"]),
    amountCal: toNumber(entry.AmountCal || entry["AmountCal."]),
    amount: toNumber(entry.Amount),

    /* ===== ADJUSTMENTS ===== */
    difference: toNumber(entry.Difference),
    rentAdjustment: toNumber(entry.RentAdjustment),

    /* ===== REFERENCE ===== */
    ledgerReference: entry.LedgerReference || "",
  };
});

/* ========= WRITE CLEAN FILE ========= */
fs.writeFileSync(outputFile, JSON.stringify(cleanData, null, 2), "utf-8");

console.log(`✅ Cleaned ${cleanData.length} invoices`);
console.log(`📁 Output file created at:\n${outputFile}`);
