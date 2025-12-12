import fs from "fs";
import path from "path";

// Load the JSON data
const inputFilePath = path.join(process.cwd(), "data", "SALES-INVOICES.json"); // adjust path
const rawData = JSON.parse(fs.readFileSync(inputFilePath, "utf-8"));

// Helper to safely convert to number
const toNumber = (val) => {
  if (val === undefined || val === null || val === "") return 0;
  const num = Number(val.toString().replace(/,/g, ""));
  return isNaN(num) ? 0 : num;
};

// Transform data
const transformed = rawData.map((entry) => ({
  date: entry["Date"] || "",
  vehicleNo: entry["Vehicle No."] || "",
  builtyNo: entry["Builty No."] || "",
  vendorName: entry["Vendor Name"] || "",
  brokerName: entry["Broker Name"] || "",
  paddyType: entry["Paddy Type"] || "",
  quantity: toNumber(entry["Quantity"]),
  weight: toNumber(entry["Weight"]),
  bagWeight: toNumber(entry["Bag Weight"]),
  netWeight: toNumber(entry["Net Weight"]),
  netWeight40: toNumber(entry["Net Weight/40Kg"]),
  rate40: toNumber(entry["Rate/ 40 kg"]),
  amount: toNumber(entry["Amount"]),
  sutliSilaiRate: toNumber(entry["Sutli Silai Rate"]),
  sutliSilaiAmount: toNumber(entry["Sutli Silai Amount"]),
  totalAmount: toNumber(entry["Total Amount"]),
  brokeryRate: toNumber(entry["Brokery Rate"]),
  brokery: toNumber(entry["Brokery"]),
  totalAmount2: toNumber(entry["Total Amount2"]),
}));

// Save the transformed JSON
const outputFilePath = path.join(process.cwd(), "data", "SALES-INVOICES-CLEAN.json");
fs.writeFileSync(outputFilePath, JSON.stringify(transformed, null, 2), "utf-8");

console.log(`Transformation complete! Output saved to ${outputFilePath}`);
