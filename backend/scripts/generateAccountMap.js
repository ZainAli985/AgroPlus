import fs from "fs";

// Load your exported accounts JSON
const accounts = JSON.parse(
  fs.readFileSync("al-rehman-rice-mill.accounts.json", "utf8")
);

const map = {};

for (const acc of accounts) {
  if (!acc._id || !acc._id.$oid || !acc.accountName) {
    console.log("❌ Missing _id or accountName in:", acc);
    continue;
  }

  // MongoDB _id is inside { $oid: "..." }
  const id = acc._id.$oid;

  map[acc.accountName.trim()] = id;
}

// Save map into file
fs.writeFileSync("accountMap.json", JSON.stringify(map, null, 2));

console.log("✅ accountMap.json generated successfully!");
