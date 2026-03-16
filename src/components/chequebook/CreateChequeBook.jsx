import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');`;

const CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  .cb-wrap { font-family:'Plus Jakarta Sans',sans-serif; color:#111827; max-width:640px; margin:0 auto; }
  .cb-card { background:#fff; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden; box-shadow:0 2px 12px rgba(0,0,0,.06); }
  .cb-card-head { padding:20px 24px; border-bottom:1px solid #f3f4f6; background:#fafafa; display:flex; align-items:center; gap:12px; }
  .cb-card-icon { width:38px; height:38px; border-radius:11px; background:linear-gradient(135deg,#1e3a5f,#2563eb); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .cb-card-title { font-size:15px; font-weight:800; color:#111827; }
  .cb-card-sub   { font-size:12px; color:#9ca3af; margin-top:1px; }
  .cb-body { padding:24px; display:flex; flex-direction:column; gap:18px; }
  .cb-label { display:block; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.07em; color:#6b7280; margin-bottom:6px; }
  .cb-label em { color:#ef4444; font-style:normal; }
  .cb-input, .cb-select {
    width:100%; padding:11px 14px; border:1.5px solid #e5e7eb; border-radius:10px;
    font-size:14px; font-family:'Plus Jakarta Sans',sans-serif; color:#111827;
    background:#fff; outline:none; transition:.15s; appearance:none;
  }
  .cb-input::placeholder { color:#d1d5db; }
  .cb-input:focus, .cb-select:focus { border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,.1); }
  .cb-input.mono { font-family:'JetBrains Mono',monospace; font-size:13px; }
  .cb-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .cb-grid3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
  .cb-leaf-row { display:grid; grid-template-columns:1fr auto 1fr; gap:10px; align-items:end; }
  .cb-leaf-sep { padding-bottom:11px; color:#9ca3af; font-size:13px; font-weight:700; text-align:center; }
  .cb-leaf-preview { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:10px 14px; display:flex; align-items:center; justify-content:space-between; }
  .cb-leaf-preview-label { font-size:12px; color:#16a34a; font-weight:600; }
  .cb-leaf-preview-val   { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; color:#15803d; }
  .cb-footer { padding:16px 24px; border-top:1px solid #f3f4f6; background:#fafafa; display:flex; justify-content:flex-end; gap:10px; }
  .cb-btn-primary {
    padding:11px 24px; border-radius:11px; border:none; cursor:pointer;
    background:linear-gradient(135deg,#1e3a5f,#2563eb); color:#fff;
    font-size:13.5px; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif;
    box-shadow:0 4px 12px rgba(37,99,235,.3); transition:.15s; display:flex; align-items:center; gap:7px;
  }
  .cb-btn-primary:hover { opacity:.92; transform:translateY(-1px); }
  .cb-btn-primary:disabled { opacity:.55; cursor:not-allowed; transform:none; }
  .cb-btn-ghost {
    padding:11px 20px; border-radius:11px; border:1.5px solid #e5e7eb; cursor:pointer;
    background:#fff; color:#6b7280; font-size:13px; font-weight:600; font-family:'Plus Jakarta Sans',sans-serif; transition:.12s;
  }
  .cb-btn-ghost:hover { border-color:#9ca3af; color:#374151; }
  .cb-select-wrap { position:relative; }
  .cb-select-wrap::after { content:''; position:absolute; right:13px; top:50%; transform:translateY(-50%); pointer-events:none; border-left:4px solid transparent; border-right:4px solid transparent; border-top:5px solid #9ca3af; }
  @keyframes cb-spin { to { transform:rotate(360deg); } }
  .cb-spin { animation:cb-spin .8s linear infinite; display:inline-block; }
  @media(max-width:560px){ .cb-grid2,.cb-grid3{ grid-template-columns:1fr; } .cb-leaf-row{ grid-template-columns:1fr; } .cb-leaf-sep{ display:none; } }
`;

export default function CreateChequeBook() {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const [form, setForm] = useState({
    bankAccountId: "", bankAccountName: "",
    branchName: "", branchCode: "",
    accountNumber: "", iban: "", accountTitle: "",
    startLeaf: "00000001", endLeaf: "00000100",
  });

  useEffect(() => {
    (async () => {
      const res  = await authFetch(`${API_BASE_URL}/accounts`);
      const data = await res.json();
      if (res.ok) {
        const banks = Array.isArray(data) ? data.filter(a => a.accountType === "Assets" && !a.isProtected) : [];
        setBankAccounts(banks);
      }
    })();
  }, []);

  const digits   = Math.max(form.startLeaf.length, form.endLeaf.length, 8);
  const startNum = parseInt(form.startLeaf) || 0;
  const endNum   = parseInt(form.endLeaf) || 0;
  const leaves   = endNum > startNum ? endNum - startNum + 1 : 0;

  const handleBankChange = (e) => {
    const acc = bankAccounts.find(a => a._id === e.target.value);
    setForm(p => ({ ...p, bankAccountId: e.target.value, bankAccountName: acc?.accountName || "" }));
  };

  const handleLeafBlur = (field) => {
    const val = parseInt(form[field]);
    if (!isNaN(val)) setForm(p => ({ ...p, [field]: String(val).padStart(digits, "0") }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.bankAccountId)    return setNotification({ message: "Please select a bank account.", type: "error" });
    if (leaves <= 0)            return setNotification({ message: "End leaf must be greater than start leaf.", type: "error" });
    if (leaves > 500)           return setNotification({ message: "Maximum 500 leaves per cheque book.", type: "error" });

    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setNotification({ message: `Cheque book ${data.chequeBook.chequeBookId} created successfully!`, type: "success" });
      setTimeout(() => navigate("/cheque-book/view"), 1400);
    } else {
      setNotification({ message: data.message || "Failed to create cheque book.", type: "error" });
    }
  };

  return (
    <SidebarLayout>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "info" })}/>
      <ChequeTopNav active="create-book"/>

      <div className="cb-wrap">
        <form onSubmit={handleSubmit}>
          <div className="cb-card">
            <div className="cb-card-head">
              <div className="cb-card-icon">
                <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
              <div>
                <div className="cb-card-title">Create New Cheque Book</div>
                <div className="cb-card-sub">Link a bank account and define the cheque leaf range</div>
              </div>
            </div>

            <div className="cb-body">
              {/* Bank Account */}
              <div>
                <label className="cb-label">Bank Account <em>*</em></label>
                <div className="cb-select-wrap">
                  <select className="cb-select" value={form.bankAccountId} onChange={handleBankChange} required>
                    <option value="">Select bank account…</option>
                    {bankAccounts.map(a => (
                      <option key={a._id} value={a._id}>{a.accountName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch info */}
              <div className="cb-grid2">
                <div>
                  <label className="cb-label">Branch Name <em>*</em></label>
                  <input className="cb-input" placeholder="e.g. Main Branch Lahore" value={form.branchName}
                    onChange={e => setForm(p => ({...p, branchName: e.target.value}))} required/>
                </div>
                <div>
                  <label className="cb-label">Branch Code <em>*</em></label>
                  <input className="cb-input mono" placeholder="e.g. 0296" value={form.branchCode}
                    onChange={e => setForm(p => ({...p, branchCode: e.target.value}))} required/>
                </div>
              </div>

              {/* Account details */}
              <div>
                <label className="cb-label">Account Title <em>*</em></label>
                <input className="cb-input" placeholder="e.g. AL REHMAN RICE MILLS" value={form.accountTitle}
                  onChange={e => setForm(p => ({...p, accountTitle: e.target.value}))} required/>
              </div>

              <div className="cb-grid2">
                <div>
                  <label className="cb-label">Account Number <em>*</em></label>
                  <input className="cb-input mono" placeholder="e.g. 0296701869503" value={form.accountNumber}
                    onChange={e => setForm(p => ({...p, accountNumber: e.target.value}))} required/>
                </div>
                <div>
                  <label className="cb-label">IBAN <em>*</em></label>
                  <input className="cb-input mono" placeholder="e.g. PK36HABB0000296701869503" value={form.iban}
                    onChange={e => setForm(p => ({...p, iban: e.target.value}))} required/>
                </div>
              </div>

              {/* Cheque leaves */}
              <div>
                <label className="cb-label">Cheque Leaf Range <em>*</em></label>
                <div className="cb-leaf-row">
                  <div>
                    <input className="cb-input mono" placeholder="00000001" value={form.startLeaf}
                      onChange={e => setForm(p => ({...p, startLeaf: e.target.value}))}
                      onBlur={() => handleLeafBlur("startLeaf")}/>
                    <div style={{fontSize:10.5, color:"#9ca3af", marginTop:4}}>Start leaf no.</div>
                  </div>
                  <div className="cb-leaf-sep">→</div>
                  <div>
                    <input className="cb-input mono" placeholder="00000100" value={form.endLeaf}
                      onChange={e => setForm(p => ({...p, endLeaf: e.target.value}))}
                      onBlur={() => handleLeafBlur("endLeaf")}/>
                    <div style={{fontSize:10.5, color:"#9ca3af", marginTop:4}}>End leaf no.</div>
                  </div>
                </div>

                {leaves > 0 && (
                  <div className="cb-leaf-preview" style={{marginTop:10}}>
                    <span className="cb-leaf-preview-label">✓ Total Leaves</span>
                    <span className="cb-leaf-preview-val">{leaves} cheques</span>
                  </div>
                )}
              </div>
            </div>

            <div className="cb-footer">
              <button type="button" className="cb-btn-ghost" onClick={() => navigate("/cheque-book/view")}>Cancel</button>
              <button type="submit" className="cb-btn-primary" disabled={loading || leaves <= 0}>
                {loading ? <><span className="cb-spin">⟳</span> Creating…</> : <>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Create Cheque Book
                </>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}