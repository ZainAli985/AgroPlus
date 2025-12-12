import fs from "fs";
import path from "path";

// Input and output files
const inputFile = path.join("./data", "RAW_PURCHASE_INVOICES.json"); // your raw JSON
const outputFile = path.join("./data", "CLEAN_PURCHASE_INVOICES.json");

// Function to safely convert to number
const toNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? 0 : num;
};

// Read raw JSON
const rawData = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

const cleanData = rawData.map((entry) => ({
  date: entry.Date || "",
  ledgerReference: entry.LedgerReference || "",
  vehicleNumber: entry.VehicleNumber || "",
  builtyNumber: entry.BuiltyNumber || "",
  vendorName: entry.VendorName || "",
  brokerName: entry.BrokerName || "",
  paddyType: entry.PaddyType || "",
  quantity: toNumber(entry.Quantity),
  emptyVehicleWeight: toNumber(entry.EmptyVehicleWeight),
  filledVehicleWeight: toNumber(entry.FilledVehicleWeight),
  subtractWeight: toNumber(entry.SubtractWeight),
  bagWeight: toNumber(entry.BagWeight),
  finalWeight: toNumber(entry.FinalWeight),
  moisturePercent: toNumber(entry["Moisture %"]),
  moistureAdjCal: toNumber(entry["Moisture Adj. Cal."]),
  moistureAdjustment: toNumber(entry["Moisture Adjustment"]),
  netWeight: toNumber(entry.NetWeight),
  netWeight40KG: toNumber(entry.NetWeight_40KG),
  weightKG: toNumber(entry.Weight_KG),
  rate40kg: toNumber(entry["Rate/ 40 kg"]),
  amountCal: toNumber(entry["AmountCal."]),
  amount: toNumber(entry.Amount),
  difference: toNumber(entry.Difference),
  rentAdjustment: toNumber(entry.RentAdjustment),
}));

// Write clean JSON
fs.writeFileSync(outputFile, JSON.stringify(cleanData, null, 2), "utf-8");

console.log(`✅ Cleaned data written to ${outputFile}`);
