import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../Notification.jsx";
import JournalNav from "../layout/JournalTopNav.jsx";
import { authFetch } from "../../utils/authFetch.js";

// ── Helpers ───────────────────────────────────────────────────────────────────
const fmt = (n) =>
  Number(n || 0).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const safeDate = (val) => {
  if (!val) return "—";
  const d = new Date(val);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-PK", { day: "2-digit", month: "short", year: "numeric" });
};

// ── Sub-components ────────────────────────────────────────────────────────────
function AccountDropdown({ label, accounts, value, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = accounts.filter(
    (a) =>
      a.accountName.toLowerCase().includes(query.toLowerCase()) ||
      a.accountType.toLowerCase().includes(query.toLowerCase())
  );
  const selected = accounts.find((a) => a._id === value);

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm hover:border-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <span className={selected ? "text-slate-800" : "text-slate-400"}>
          {selected ? selected.accountName : "Select account"}
        </span>
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[220px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
          <div className="p-2 border-b border-slate-100 bg-slate-50">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search accounts..."
              className="w-full text-sm px-3 py-1.5 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-400">No results</li>
            ) : (
              filtered.map((a) => (
                <li
                  key={a._id}
                  onClick={() => { onSelect(a._id); setOpen(false); setQuery(""); }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 flex items-center justify-between ${
                    value === a._id ? "bg-blue-100 font-medium" : ""
                  }`}
                >
                  <span>{a.accountName}</span>
                  <span className="text-xs text-slate-400 ml-2">{a.accountType}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ViewGeneralEntries() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "", account: "" });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const [editingEntry, setEditingEntry] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deleteModal, setDeleteModal] = useState({ open: false, entryId: null });

  // ── Data fetching ─────────────────────────────────────────────────────────
  const safeJsonParse = async (res) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch { return null; }
  };

  const fetchEntries = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/get-journal-entries`);
      const data = await safeJsonParse(res);
      if (!res.ok) throw new Error(data?.message || "Failed to fetch entries");
      setEntries(data);
      setFilteredEntries(data);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAccounts = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/accounts`);
      const data = await safeJsonParse(res);
      if (!Array.isArray(data)) throw new Error("Failed to fetch accounts");
      setAccounts(data);
    } catch {
      setNotification({ message: "Error fetching accounts", type: "error" });
    }
  };

  useEffect(() => { fetchEntries(); fetchAccounts(); }, []);

  // ── Filtering ─────────────────────────────────────────────────────────────
  useEffect(() => {
    let temp = [...entries];
    if (filters.startDate) temp = temp.filter((e) => new Date(e.entryDate) >= new Date(filters.startDate));
    if (filters.endDate) temp = temp.filter((e) => new Date(e.entryDate) <= new Date(filters.endDate));
    if (filters.account) {
      const s = filters.account.toLowerCase();
      temp = temp.filter((e) => {
        const dn = typeof e.debitAccount === "string" ? e.debitAccount : e.debitAccount?.accountName || "";
        const cm = (e.creditEntries || []).some((c) => {
          const cn = typeof c.account === "string" ? c.account : c.account?.accountName || "";
          return cn.toLowerCase().includes(s);
        });
        return dn.toLowerCase().includes(s) || cm;
      });
    }
    setFilteredEntries(temp);
  }, [entries, filters]);

  // ── Edit form sync ────────────────────────────────────────────────────────
  useEffect(() => {
    if (editingEntry) {
      setEditForm({
        debitAccount: editingEntry.debitAccount?._id || editingEntry.debitAccount || "",
        debitAmount: editingEntry.debitAmount || 0,
        debitLineDesc: editingEntry.debitLineDesc || "",
        creditEntries: editingEntry.creditEntries?.map((c) => ({
          account: c.account?._id || c.account || "",
          amount: c.amount || 0,
          description: c.description || "",
        })) || [],
        entryDate: editingEntry.entryDate?.split("T")[0] || "",
        comments: editingEntry.comments || "",
      });
    }
  }, [editingEntry]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const totalDebit = filteredEntries.reduce((s, e) => s + (e.debitAmount || 0), 0);
  const totalCredit = filteredEntries.reduce(
    (s, e) => s + (e.creditEntries || []).reduce((cs, c) => cs + (c.amount || 0), 0), 0
  );

  return (
    <SidebarLayout>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        .gjv-root { font-family: 'DM Sans', sans-serif; }
        .gjv-title { font-family: 'Cormorant Garamond', serif; }
        .gjv-mono  { font-family: 'DM Mono', monospace; }
        .entry-block { animation: slideIn 0.2s ease both; }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .row-hover:hover { background: #f8fafc; }
      `}</style>

      <div className="gjv-root min-h-screen bg-slate-50 pb-16">

        {/* ── Delete Modal ── */}
        {deleteModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl p-7 w-full max-w-sm shadow-2xl border border-slate-100">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="gjv-title text-xl text-center text-slate-800 mb-2">Delete Entry?</h3>
              <p className="text-sm text-slate-500 text-center mb-6">
                This journal entry will be permanently removed. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteModal({ open: false, entryId: null })}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      const res = await authFetch(
                        `${API_BASE_URL}/delete-journal-entry/${deleteModal.entryId}`,
                        { method: "DELETE" }
                      );
                      const data = await safeJsonParse(res);
                      if (!res.ok) throw new Error(data?.message || "Delete failed");
                      setEntries((prev) => prev.filter((e) => e._id !== deleteModal.entryId));
                      setFilteredEntries((prev) => prev.filter((e) => e._id !== deleteModal.entryId));
                      setNotification({ message: "Entry deleted successfully!", type: "success" });
                    } catch (err) {
                      setNotification({ message: err.message, type: "error" });
                    } finally {
                      setDeleteModal({ open: false, entryId: null });
                    }
                  }}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Edit Modal ── */}
        {editingEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
              {/* Modal Header */}
              <div style={{padding:"16px 28px",borderBottom:"1px solid #ECECEC",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,background:"#fff",zIndex:10,borderTop:"3px solid #929183"}}>
                <div>
                  <h3 className="gjv-title" style={{fontSize:20,fontWeight:700,color:"#0B0C0D"}}>Edit Journal Entry</h3>
                  <p style={{fontSize:11,color:"#A5A8A6",marginTop:2,fontFamily:"DM Mono,monospace"}}>{safeDate(editingEntry.entryDate)}</p>
                </div>
                <button
                  onClick={() => setEditingEntry(null)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 transition text-slate-400"
                >
                  ✕
                </button>
              </div>

              <div className="px-7 py-6 space-y-6">
                {/* Row 1: Date + Comments */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      value={editForm.entryDate}
                      onChange={(e) => setEditForm({ ...editForm, entryDate: e.target.value })}
                      style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Comments / Narration</label>
                    <input
                      type="text"
                      value={editForm.comments}
                      onChange={(e) => setEditForm({ ...editForm, comments: e.target.value })}
                      style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                    />
                  </div>
                </div>

                {/* Debit Section */}
                <div style={{background:"#F5F5F5",border:"1.5px solid #E3E3E3",borderRadius:10,padding:14,display:"flex",flexDirection:"column",gap:10,borderLeft:"3px solid #212A37"}}>
                  <p style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em",color:"#334455",fontFamily:"DM Sans,sans-serif",marginBottom:10}}>Debit Side</p>
                  <div className="grid grid-cols-2 gap-4">
                    <AccountDropdown
                      label="Debit Account"
                      accounts={accounts}
                      value={editForm.debitAccount}
                      onSelect={(id) => setEditForm({ ...editForm, debitAccount: id })}
                    />
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Debit Amount</label>
                      <input
                        type="number"
                        value={editForm.debitAmount}
                        onChange={(e) => setEditForm({ ...editForm, debitAmount: Number(e.target.value) })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm gjv-mono focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Debit Description</label>
                    <input
                      type="text"
                      value={editForm.debitLineDesc}
                      onChange={(e) => setEditForm({ ...editForm, debitLineDesc: e.target.value })}
                      style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                    />
                  </div>
                </div>

                {/* Credit Section */}
                <div style={{background:"#F5F5F5",border:"1.5px solid #E3E3E3",borderRadius:10,padding:14,display:"flex",flexDirection:"column",gap:10,borderLeft:"3px solid #b91c1c"}}>
                  <p style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em",color:"#b91c1c",fontFamily:"DM Sans,sans-serif",marginBottom:10}}>Credit Side</p>
                  {(editForm.creditEntries || []).map((c, i) => (
                    <div key={i} className="grid grid-cols-3 gap-3">
                      <AccountDropdown
                        accounts={accounts}
                        value={c.account}
                        onSelect={(id) => {
                          const nc = [...editForm.creditEntries];
                          nc[i].account = id;
                          setEditForm({ ...editForm, creditEntries: nc });
                        }}
                      />
                      <input
                        type="number"
                        value={c.amount || 0}
                        onChange={(e) => {
                          const nc = [...editForm.creditEntries];
                          nc[i].amount = Number(e.target.value);
                          setEditForm({ ...editForm, creditEntries: nc });
                        }}
                        placeholder="Amount"
                        className="border border-slate-200 rounded-lg px-3 py-2 text-sm gjv-mono focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <input
                        type="text"
                        value={c.description || ""}
                        onChange={(e) => {
                          const nc = [...editForm.creditEntries];
                          nc[i].description = e.target.value;
                          setEditForm({ ...editForm, creditEntries: nc });
                        }}
                        placeholder="Description"
                        style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                      />
                    </div>
                  ))}

                  {/* Balance check */}
                  {(() => {
                    const tc = (editForm.creditEntries || []).reduce((s, c) => s + Number(c.amount || 0), 0);
                    const balanced = tc === editForm.debitAmount;
                    return (
                      <div className={`text-xs font-semibold gjv-mono px-3 py-2 rounded-lg ${balanced ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {balanced
                          ? `✓ Balanced — ${fmt(editForm.debitAmount)}`
                          : `⚠ Difference: ${fmt(Math.abs(editForm.debitAmount - tc))} (Dr: ${fmt(editForm.debitAmount)} | Cr: ${fmt(tc)})`
                        }
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-7 py-5 border-t border-slate-100 flex justify-end gap-3">
                <button
                  onClick={() => setEditingEntry(null)}
                  style={{padding:"9px 18px",borderRadius:9,border:"1.5px solid #DADADA",background:"#fff",color:"#6E7170",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const totalCredit = (editForm.creditEntries || []).reduce(
                      (sum, c) => sum + Number(c.amount || 0), 0
                    );
                    if (editForm.debitAmount !== totalCredit) {
                      return setNotification({ message: "Debit and credit amounts must be equal!", type: "error" });
                    }
                    try {
                      const res = await authFetch(
                        `${API_BASE_URL}/update-journal-entry/${editingEntry._id}`,
                        {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(editForm),
                        }
                      );
                      const data = await res.json();
                      if (!res.ok) throw new Error(data?.message || "Update failed");
                      setEntries((prev) => prev.map((e) => e._id === data.entry._id ? data.entry : e));
                      setFilteredEntries((prev) => prev.map((e) => e._id === data.entry._id ? data.entry : e));
                      setNotification({ message: "Entry updated successfully!", type: "success" });
                      setEditingEntry(null);
                    } catch (err) {
                      setNotification({ message: err.message, type: "error" });
                    }
                  }}
                  style={{padding:"9px 22px",borderRadius:9,background:"#212A37",color:"#fff",fontSize:12.5,fontWeight:700,border:"none",cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        <JournalNav />

        <div className="space-y-5">
          {/* ── Page Header ── */}
          <div style={{background:"#141A1F",color:"#fff",borderRadius:14,padding:"24px 32px",display:"flex",alignItems:"flex-end",justifyContent:"space-between",boxShadow:"0 4px 24px rgba(11,12,13,.25)",borderBottom:"3px solid #929183"}}>
            <div>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.2em] mb-1">
                Accounting Module
              </p>
              <h1 className="gjv-title text-3xl">General Journal</h1>
              <p className="text-slate-400 text-sm mt-1">
                {filteredEntries.length} entr{filteredEntries.length !== 1 ? "ies" : "y"} shown
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs mb-1">Total Debit / Credit</p>
              <p className="gjv-mono text-lg text-emerald-400">{fmt(totalDebit)}</p>
              <p className="gjv-mono text-sm text-rose-400">{fmt(totalCredit)}</p>
            </div>
          </div>

          {/* ── Filters ── */}
          <div style={{background:"#fff",borderRadius:12,boxShadow:"0 1px 4px rgba(11,12,13,.04)",border:"1.5px solid #E3E3E3",padding:"14px 20px"}}>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Filter Entries</p>
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">From</label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">To</label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Account Search</label>
                <input
                  type="text"
                  placeholder="Filter by debit or credit account..."
                  value={filters.account}
                  onChange={(e) => setFilters({ ...filters, account: e.target.value })}
                  style={{border:"1.5px solid #E3E3E3",borderRadius:8,padding:"7px 10px",fontSize:12.5,outline:"none",fontFamily:"DM Sans,sans-serif",color:"#141A1F"}}
                />
              </div>
              {(filters.startDate || filters.endDate || filters.account) && (
                <button
                  onClick={() => setFilters({ startDate: "", endDate: "", account: "" })}
                  style={{padding:"7px 14px",borderRadius:8,background:"#fef2f2",color:"#dc2626",border:"1.5px solid #fecaca",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* ── Journal Entries Table ── */}
          <div style={{background:"#fff",borderRadius:14,boxShadow:"0 2px 8px rgba(11,12,13,.05)",border:"1.5px solid #E3E3E3",overflow:"hidden"}}>
            {loading ? (
              <div className="p-8 space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-10 bg-slate-100 rounded-lg w-full" />
                    <div className="h-8 bg-slate-50 rounded-lg w-5/6 ml-8" />
                    <div className="h-7 bg-slate-50 rounded-lg w-3/4 ml-8" />
                  </div>
                ))}
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-3xl">📒</div>
                <p className="text-sm font-semibold text-slate-500">No journal entries found</p>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr style={{borderBottom:"2px solid #E3E3E3",background:"#F5F5F5"}}>
                      <th style={{padding:"9px 18px",textAlign:"left",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".1em",width:130,whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif"}}>Date</th>
                      <th style={{padding:"9px 18px",textAlign:"left",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"DM Sans,sans-serif"}}>Particulars</th>
                      <th style={{padding:"9px 18px",textAlign:"left",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"DM Sans,sans-serif"}}>Description</th>
                      <th style={{padding:"9px 18px",textAlign:"right",fontSize:9.5,fontWeight:700,color:"#929183",textTransform:"uppercase",letterSpacing:".1em"}}>Debit</th>
                      <th style={{padding:"9px 18px",textAlign:"right",fontSize:9.5,fontWeight:700,color:"#ef4444",textTransform:"uppercase",letterSpacing:".1em"}}>Credit</th>
                      <th style={{padding:"9px 18px",textAlign:"center",fontSize:9.5,fontWeight:700,color:"#A5A8A6",textTransform:"uppercase",letterSpacing:".1em"}}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntries.map((entry, entryIdx) => (
                      <React.Fragment key={entry._id}>
                        {/* ── Debit Row ── */}
                        <tr className={`border-t ${entryIdx > 0 ? "border-t-2 border-slate-200" : "border-slate-100"} row-hover entry-block`}>
                          <td className="px-5 py-3 align-top">
                            <span className="gjv-mono text-xs text-slate-500 whitespace-nowrap">
                              {safeDate(entry.entryDate)}
                            </span>
                          </td>
                          <td className="px-5 py-3 align-top">
                            <span className="font-semibold text-slate-800 text-sm">
                              {entry.debitAccount?.accountName || "—"}
                            </span>
                            <span style={{marginLeft:6,fontSize:8.5,fontWeight:700,padding:"1px 5px",borderRadius:4,background:"#F5F5F5",color:"#334455",border:"1px solid #DADADA",letterSpacing:".06em",fontFamily:"DM Mono,monospace"}}>
                              DR
                            </span>
                          </td>
                          <td className="px-5 py-3 text-slate-500 text-xs align-top">
                            {entry.debitLineDesc || "—"}
                          </td>
                          <td style={{padding:"9px 18px",textAlign:"right",verticalAlign:"top",fontFamily:"DM Mono,monospace",fontWeight:600,color:"#929183",fontSize:12.5}}>
                            {fmt(entry.debitAmount)}
                          </td>
                          <td className="px-5 py-3 text-right align-top text-slate-200 text-xs gjv-mono">—</td>
                          <td
                            className="px-5 py-3 text-center align-top"
                            rowSpan={entry.creditEntries.length + 2}
                          >
                            <div className="flex flex-col gap-1.5">
                              <button
                                onClick={() => {
                                  if (
                                    entry.description === "Opening Balance" ||
                                    entry.debitLineDesc === "Opening Balance"
                                  ) {
                                    setNotification({
                                      message: "Opening Balance entry is locked and cannot be modified.",
                                      type: "error",
                                    });
                                    return;
                                  }
                                  setEditingEntry(entry);
                                }}
                                style={{fontSize:10.5,fontWeight:700,padding:"4px 10px",borderRadius:7,background:"#fefce8",color:"#92400e",border:"1px solid #fde68a",cursor:"pointer",whiteSpace:"nowrap",fontFamily:"DM Sans,sans-serif"}}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    entry.description === "Opening Balance" ||
                                    entry.debitLineDesc === "Opening Balance"
                                  ) {
                                    setNotification({
                                      message: "Opening Balance entry is locked and cannot be modified.",
                                      type: "error",
                                    });
                                    return;
                                  }
                                  setDeleteModal({ open: true, entryId: entry._id });
                                }}
                                style={{fontSize:10.5,fontWeight:700,padding:"4px 10px",borderRadius:7,background:"#fef2f2",color:"#dc2626",border:"1px solid #fecaca",cursor:"pointer",fontFamily:"DM Sans,sans-serif"}}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* ── Credit Rows ── */}
                        {(entry.creditEntries || []).map((credit, i) => (
                          <tr key={i} className="border-t border-slate-50 row-hover">
                            <td className="px-5 py-2.5" />
                            <td className="px-5 py-2.5 pl-10">
                              <span className="text-slate-700 text-sm">
                                {credit.account?.accountName || "—"}
                              </span>
                              <span style={{marginLeft:6,fontSize:8.5,fontWeight:700,padding:"1px 5px",borderRadius:4,background:"#fef2f2",color:"#b91c1c",border:"1px solid #fecaca",letterSpacing:".06em",fontFamily:"DM Mono,monospace"}}>
                                CR
                              </span>
                            </td>
                            <td className="px-5 py-2.5 text-slate-400 text-xs">{credit.description || "—"}</td>
                            <td className="px-5 py-2.5 text-right text-slate-200 text-xs gjv-mono">—</td>
                            <td style={{padding:"7px 18px",textAlign:"right",fontFamily:"DM Mono,monospace",fontWeight:600,color:"#b91c1c",fontSize:12.5}}>
                              {fmt(credit.amount)}
                            </td>
                          </tr>
                        ))}

                        {/* ── Narration Row ── */}
                        <tr className="border-t border-slate-50 bg-slate-50/60">
                          <td className="px-5 py-2" />
                          <td colSpan={4} className="px-5 py-2 text-xs italic text-slate-400">
                            <span className="not-italic font-semibold text-slate-500 mr-1">Narration:</span>
                            {entry.description || "—"}
                            {entry.comments && (
                              <span className="ml-2 text-slate-400">· {entry.comments}</span>
                            )}
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>

                  {/* ── Totals Footer ── */}
                  <tfoot>
                    <tr style={{borderTop:"2px solid #E3E3E3",background:"#F5F5F5"}}>
                      <td colSpan={3} style={{padding:"10px 18px",fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"#6E7170",fontFamily:"DM Sans,sans-serif"}}>
                        Totals — {filteredEntries.length} entries
                      </td>
                      <td style={{padding:"10px 18px",textAlign:"right",fontFamily:"DM Mono,monospace",fontWeight:700,color:"#929183",fontSize:13}}>
                        {fmt(totalDebit)}
                      </td>
                      <td style={{padding:"10px 18px",textAlign:"right",fontFamily:"DM Mono,monospace",fontWeight:700,color:"#b91c1c",fontSize:13}}>
                        {fmt(totalCredit)}
                      </td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />
    </SidebarLayout>
  );
}