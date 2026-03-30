// utils/bankMeta.js
// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH for all Pakistani bank metadata.
//
// This file is imported by:
//   - accountController.js   (store bankName on create/update)
//   - frontend Dashboard.jsx (display bank name in bank section)
//   - frontend CreateChequeBook.jsx (dropdown search)
//
// LOGO INDEX: bankLogoIndex (1–26) maps to /public/1.png … /26.png.
// The array index + 1 = logoIndex, so BANKS[0] = logo 1, BANKS[1] = logo 2, etc.
//
// SEARCH KEYS: each bank has `keys` for fuzzy name matching and
//              `searchTerms` for frontend search (abbr + full name words).
//
// HOW BANK DETECTION WORKS (priority order):
//   1. logoIndex match (most reliable — user explicitly chose the bank logo)
//   2. keyword match on accountName (fallback)
// ─────────────────────────────────────────────────────────────────────────────

export const BANKS = [
  // id = logoIndex (1-26)
  { id:1,  abbr:"NBP",   fullName:"National Bank of Pakistan",                  color:"#007940", bg:"#e6f4ec",
    keys:["national bank","nbp"], searchTerms:["nbp","national","national bank"] },
  { id:2,  abbr:"BOP",   fullName:"The Bank of Punjab",                         color:"#1a237e", bg:"#e8eaf6",
    keys:["bank of punjab","bop"], searchTerms:["bop","punjab","bank of punjab"] },
  { id:3,  abbr:"BOK",   fullName:"The Bank of Khyber",                         color:"#2e4057", bg:"#eaecf0",
    keys:["bank of khyber","bok"], searchTerms:["bok","khyber","bank of khyber"] },
  { id:4,  abbr:"SBL",   fullName:"Sindh Bank Limited",                         color:"#374151", bg:"#f3f4f6",
    keys:["sindh bank","sbl"], searchTerms:["sbl","sindh"] },
  { id:5,  abbr:"FWBL",  fullName:"First Women Bank Limited",                   color:"#7c3aed", bg:"#f5f3ff",
    keys:["first women","fwbl"], searchTerms:["fwbl","first women"] },
  { id:6,  abbr:"HBL",   fullName:"Habib Bank Limited",                         color:"#006633", bg:"#e6f4ed",
    keys:["habib bank","hbl"], searchTerms:["hbl","habib","habib bank"] },
  { id:7,  abbr:"UBL",   fullName:"United Bank Limited",                        color:"#003087", bg:"#e8eef8",
    keys:["united bank","ubl"], searchTerms:["ubl","united","united bank"] },
  { id:8,  abbr:"MCB",   fullName:"MCB Bank Limited",                           color:"#c8102e", bg:"#fce8ec",
    keys:["mcb bank","mcb"], searchTerms:["mcb","mcb bank"] },
  { id:9,  abbr:"ABL",   fullName:"Allied Bank Limited",                        color:"#b8860b", bg:"#fdf6e3",
    keys:["allied bank","abl"], searchTerms:["abl","allied","allied bank"] },
  { id:10, abbr:"BAFL",  fullName:"Bank Alfalah Limited",                       color:"#c8102e", bg:"#fce8ec",
    keys:["bank alfalah","alfalah","bafl"], searchTerms:["bafl","alfalah","bank alfalah"] },
  { id:11, abbr:"BAHL",  fullName:"Bank Al Habib Limited",                      color:"#00703c", bg:"#e6f4ed",
    keys:["bank al habib","bahl"], searchTerms:["bahl","al habib","bank al habib"] },
  { id:12, abbr:"AKBL",  fullName:"Askari Bank Limited",                        color:"#004225", bg:"#e6f0ea",
    keys:["askari","akbl"], searchTerms:["akbl","askari","askari bank"] },
  { id:13, abbr:"HMB",   fullName:"Habib Metropolitan Bank Limited",            color:"#1a3c6e", bg:"#eaf0f8",
    keys:["habib metropolitan","hmb","habibmetro"], searchTerms:["hmb","habib metropolitan","metro","habibmetro"] },
  { id:14, abbr:"SNBL",  fullName:"Soneri Bank Limited",                        color:"#8b0000", bg:"#fce8e8",
    keys:["soneri","snbl"], searchTerms:["snbl","soneri"] },
  { id:15, abbr:"JSBL",  fullName:"JS Bank Limited",                            color:"#d4380d", bg:"#fff2ed",
    keys:["js bank","jsbl"], searchTerms:["jsbl","js bank","js"] },
  { id:16, abbr:"SAMB",  fullName:"Samba Bank Limited",                         color:"#d4001c", bg:"#fce8e8",
    keys:["samba","samb"], searchTerms:["samb","samba"] },
  { id:17, abbr:"SILK",  fullName:"Silkbank Limited",                           color:"#7c3aed", bg:"#f5f3ff",
    keys:["silkbank","silk"], searchTerms:["silk","silkbank"] },
  { id:18, abbr:"SMBL",  fullName:"Summit Bank Limited",                        color:"#374151", bg:"#f3f4f6",
    keys:["summit","smbl"], searchTerms:["smbl","summit"] },
  { id:19, abbr:"MEBL",  fullName:"Meezan Bank Limited",                        color:"#1a5276", bg:"#eaf0f8",
    keys:["meezan","mebl"], searchTerms:["mebl","meezan"] },
  { id:20, abbr:"FABL",  fullName:"Faysal Bank Limited",                        color:"#7b3f00", bg:"#f5ece4",
    keys:["faysal","fabl"], searchTerms:["fabl","faysal"] },
  { id:21, abbr:"BIPL",  fullName:"BankIslami Pakistan Limited",                color:"#065f46", bg:"#f0fdf4",
    keys:["bankislami","bipl"], searchTerms:["bipl","bankislami","bank islami"] },
  { id:22, abbr:"DIBPL", fullName:"Dubai Islamic Bank Pakistan Limited",        color:"#c8102e", bg:"#fce8ec",
    keys:["dubai islamic","dibpl","dib"], searchTerms:["dibpl","dubai islamic","dib"] },
  { id:23, abbr:"ABPL",  fullName:"Al Baraka Bank (Pakistan) Limited",          color:"#2d6a4f", bg:"#e6f4ed",
    keys:["al baraka","abpl"], searchTerms:["abpl","al baraka","baraka"] },
  { id:24, abbr:"MIBL",  fullName:"MCB Islamic Bank Limited",                   color:"#c8102e", bg:"#fce8ec",
    keys:["mcb islamic","mibl"], searchTerms:["mibl","mcb islamic"] },
  { id:25, abbr:"SCBPL", fullName:"Standard Chartered Bank (Pakistan) Limited", color:"#0e5c96", bg:"#e8f0f8",
    keys:["standard chartered","scbpl","scb"], searchTerms:["scbpl","standard chartered","scb"] },
  { id:26, abbr:"BML",   fullName:"Bank Makramah Limited",                      color:"#374151", bg:"#f3f4f6",
    keys:["bank makramah","bml"], searchTerms:["bml","makramah"] },
];

// Index for O(1) logoIndex lookup
const BY_LOGO_INDEX = Object.fromEntries(BANKS.map(b => [b.id, b]));

// ── Core: resolve a bank from logoIndex OR accountName ────────────────────────
/**
 * Returns the full bank metadata object, or a fallback with initials.
 *
 * @param {number|null} logoIndex  - bankLogoIndex stored on the Account (1–26)
 * @param {string}      name       - accountName or any bank name string
 */
export function resolveBankMeta(logoIndex, name = "") {
  // 1. Logo index is the most reliable — user explicitly chose it
  if (logoIndex && BY_LOGO_INDEX[logoIndex]) {
    return BY_LOGO_INDEX[logoIndex];
  }

  // 2. Keyword match on name
  if (name) {
    const n = name.toLowerCase().trim();
    for (const bank of BANKS) {
      if (bank.keys.some(k => n.includes(k))) return bank;
    }
  }

  // 3. Unknown — derive initials as fallback (does NOT represent a real bank)
  return null;
}

/**
 * Returns full bank name string, or "" if not detected.
 * Used by accountController to store bankName on Account documents.
 */
export function detectBankName(logoIndex, accountName = "") {
  const meta = resolveBankMeta(logoIndex, accountName);
  return meta ? meta.fullName : "";
}

/**
 * Returns bank abbr string, or "" if not detected.
 */
export function detectBankAbbr(logoIndex, accountName = "") {
  const meta = resolveBankMeta(logoIndex, accountName);
  return meta ? meta.abbr : "";
}

// ── Frontend helper: check if a query string matches any bank field ────────────
/**
 * Returns true if `query` matches any of:
 *   - bankName (stored full name)
 *   - abbr (HBL, UBL, etc.)
 *   - searchTerms (all synonyms)
 *   - accountName (user's custom name)
 *   - remarkNote
 *
 * Used by CreateChequeBook dropdown search.
 */
export function accountMatchesQuery(account, query) {
  if (!query?.trim()) return true;
  const q = query.toLowerCase().trim();

  // Search bankName and abbr first (bank-level search)
  const bankName = (account.bankName || "").toLowerCase();
  if (bankName.includes(q)) return true;

  // Try detecting from logoIndex
  const meta = resolveBankMeta(account.bankLogoIndex, account.accountName);
  if (meta) {
    if (meta.fullName.toLowerCase().includes(q)) return true;
    if (meta.abbr.toLowerCase().includes(q)) return true;
    if (meta.searchTerms.some(t => t.includes(q))) return true;
  }

  // Account-level fields (custom name + remark)
  if ((account.accountName || "").toLowerCase().includes(q)) return true;
  if ((account.remarkNote  || "").toLowerCase().includes(q)) return true;

  return false;
}

export default BANKS;