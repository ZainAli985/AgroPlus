import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import ChequeTopNav from "./ChequeTopNav";
import API_BASE_URL from "../../../config/API_BASE_URL";
import { authFetch } from "../../utils/authFetch";
import Notification from "../Notification";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&display=swap');`;

/* ─── Amount to words ──────────────────────────────────────── */
function amountToWords(amount) {
  const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
  const tens = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];
  function conv(n) {
    if (n===0) return "";
    if (n<20)  return ones[n]+" ";
    if (n<100) return tens[Math.floor(n/10)]+" "+(n%10?ones[n%10]+" ":"");
    if (n<1000) return ones[Math.floor(n/100)]+" Hundred "+conv(n%100);
    if (n<100000) return conv(Math.floor(n/1000))+"Thousand "+conv(n%1000);
    if (n<10000000) return conv(Math.floor(n/100000))+"Lakh "+conv(n%100000);
    return conv(Math.floor(n/10000000))+"Crore "+conv(n%10000000);
  }
  if (!amount||isNaN(amount)) return "";
  const [ip,dp] = parseFloat(amount).toFixed(2).split(".");
  let w = conv(parseInt(ip)).trim()||"Zero";
  w += " Rupees";
  if (parseInt(dp)>0) w += " and "+conv(parseInt(dp)).trim()+" Paisa";
  return w+" Only";
}

/* ─── Bank identity ────────────────────────────────────────── */
const BANK_META = {
  hbl:    {abbr:"HBL", accent:"#006633"},
  ubl:    {abbr:"UBL", accent:"#003087"},
  mcb:    {abbr:"MCB", accent:"#c8102e"},
  nbp:    {abbr:"NBP", accent:"#007940"},
  meezan: {abbr:"MBL", accent:"#1a3c6e"},
  allied: {abbr:"ABL", accent:"#92700d"},
  bop:    {abbr:"BOP", accent:"#1a237e"},
  askari: {abbr:"ASK", accent:"#004225"},
  faysal: {abbr:"FAY", accent:"#7b3f00"},
  js:     {abbr:"JSB", accent:"#c43309"},
  soneri: {abbr:"SNR", accent:"#8b0000"},
  default:{abbr:"BNK", accent:"#1e293b"},
};
function getBankMeta(name) {
  if (!name) return BANK_META.default;
  const n = name.toLowerCase();
  for (const [k,m] of Object.entries(BANK_META)) {
    if (k!=="default" && n.includes(k)) return m;
  }
  const initials = name.replace(/[^A-Z]/g,"").slice(0,3) || name.slice(0,3).toUpperCase();
  return {...BANK_META.default, abbr:initials};
}

/* ─── QR code via free public API ──────────────────────────── */
function QRCode({ data, size=72 }) {
  if (!data) return null;
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size*2}x${size*2}&data=${encodeURIComponent(data)}&bgcolor=f8f9fa&color=1e293b&margin=2`;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
      <img src={url} alt="IBAN QR" width={size} height={size}
        style={{ borderRadius:6, border:"1px solid #e2e8f0", display:"block" }}
        onError={e=>e.currentTarget.style.display="none"}/>
      <span style={{ fontSize:8.5, color:"#94a3b8", fontFamily:"'JetBrains Mono',monospace",
        letterSpacing:".05em", textTransform:"uppercase" }}>Scan IBAN</span>
    </div>
  );
}

/* ─── Searchable payee picker ───────────────────────────────── */
function AccountPicker({ accounts, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ]       = useState("");
  const ref = useRef(null);
  const inp = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);

  const filtered = accounts.filter(a => a.accountName.toLowerCase().includes(q.toLowerCase()));
  const sel = accounts.find(a => a._id === value);

  return (
    <div ref={ref} style={{ position:"relative", flex:1 }}>
      <button type="button" onClick={() => setOpen(o=>!o)} style={{
        width:"100%", textAlign:"left", padding:"5px 2px 4px",
        border:"none", borderBottom:"1.5px solid #94a3b8",
        background:"transparent", cursor:"pointer",
        fontFamily:"'Cormorant Garamond',serif",
        fontSize:17, fontWeight:600,
        color: sel ? "#1e293b" : "#94a3b8",
        display:"flex", alignItems:"center", justifyContent:"space-between", gap:8,
      }}>
        <span style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1,
          fontStyle: sel ? "normal" : "italic" }}>
          {sel ? sel.accountName : "Select payee…"}
        </span>
        <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ position:"absolute", left:0, top:"calc(100% + 4px)",
          width:"max(100%,300px)", zIndex:400,
          background:"#fff", border:"1px solid #e2e8f0", borderRadius:12,
          boxShadow:"0 16px 40px rgba(0,0,0,.13)", overflow:"hidden" }}>
          <div style={{ padding:10, borderBottom:"1px solid #f1f5f9" }}>
            <input ref={inp} value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search accounts…"
              style={{ width:"100%", padding:"8px 11px", border:"1px solid #e2e8f0",
                borderRadius:8, fontSize:13, outline:"none",
                fontFamily:"'Plus Jakarta Sans',sans-serif" }}/>
          </div>
          <ul style={{ maxHeight:210, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"12px", fontSize:13, color:"#94a3b8", textAlign:"center" }}>No accounts found</li>
              : filtered.map(a => (
                <li key={a._id} onClick={() => { onChange(a); setOpen(false); setQ(""); }}
                  style={{ padding:"10px 14px", fontSize:13.5, cursor:"pointer",
                    background: a._id===value ? "#f8fafc" : "transparent",
                    fontWeight: a._id===value ? 600 : 400, color:"#1e293b",
                    borderBottom:"1px solid #f8fafc", transition:"background .1s" }}
                  onMouseEnter={e => { if (a._id!==value) e.currentTarget.style.background="#f8fafc"; }}
                  onMouseLeave={e => { if (a._id!==value) e.currentTarget.style.background="transparent"; }}>
                  <div>{a.accountName}</div>
                  <div style={{ fontSize:11, color:"#94a3b8", marginTop:1 }}>{a.accountType}</div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Book selector with search ────────────────────────────── */
function BookSelector({ books, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [q, setQ]       = useState("");
  const ref = useRef(null);
  const inp = useRef(null);

  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { if (open) setTimeout(() => inp.current?.focus(), 0); }, [open]);

  const filtered = books.filter(b =>
    (b.bankAccountName+b.chequeBookId+b.branchName).toLowerCase().includes(q.toLowerCase())
  );
  const sel = books.find(b => b._id === value);
  const bm  = sel ? getBankMeta(sel.bankAccountName) : null;

  return (
    <div ref={ref} style={{ position:"relative", flex:"1 1 300px" }}>
      <button type="button" onClick={() => setOpen(o=>!o)} style={{
        width:"100%", padding:"10px 14px",
        border:"1.5px solid #e2e8f0", borderRadius:12,
        background:"#fff", cursor:"pointer",
        fontFamily:"'Plus Jakarta Sans',sans-serif",
        fontSize:14, color: sel ? "#111827" : "#9ca3af",
        display:"flex", alignItems:"center", gap:10, transition:".15s",
        borderColor: open ? "#475569" : "#e2e8f0",
        boxShadow: open ? "0 0 0 3px rgba(71,85,105,.1)" : "none",
      }}>
        {sel ? (
          <>
            <div style={{ width:28, height:28, borderRadius:7, flexShrink:0,
              background:bm?.accent||"#1e293b", color:"#fff",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:9.5, fontWeight:800, fontFamily:"'JetBrains Mono',monospace" }}>
              {bm?.abbr?.slice(0,3)||"BNK"}
            </div>
            <span style={{ flex:1, textAlign:"left", fontWeight:600,
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {sel.chequeBookId} — {sel.bankAccountName}
            </span>
          </>
        ) : (
          <span style={{ flex:1, textAlign:"left", fontStyle:"italic" }}>Select a cheque book…</span>
        )}
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="#9ca3af" strokeWidth={2.5}
          style={{ flexShrink:0, transition:".15s", transform:open?"rotate(180deg)":"none" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ position:"absolute", left:0, top:"calc(100% + 4px)",
          width:"max(100%,380px)", zIndex:300,
          background:"#fff", border:"1px solid #e2e8f0", borderRadius:14,
          boxShadow:"0 12px 36px rgba(0,0,0,.12)", overflow:"hidden" }}>
          <div style={{ padding:10, borderBottom:"1px solid #f1f5f9", background:"#f8fafc" }}>
            <input ref={inp} value={q} onChange={e=>setQ(e.target.value)}
              placeholder="Search by bank, ID or branch…"
              style={{ width:"100%", padding:"8px 11px", border:"1px solid #e2e8f0",
                borderRadius:8, fontSize:13, outline:"none" }}/>
          </div>
          <ul style={{ maxHeight:220, overflowY:"auto", margin:0, padding:0, listStyle:"none" }}>
            {filtered.length === 0
              ? <li style={{ padding:"12px", fontSize:13, color:"#94a3b8", textAlign:"center" }}>No books found</li>
              : filtered.map(b => {
                  const m = getBankMeta(b.bankAccountName);
                  const issued = b.lastIssuedLeaf ? parseInt(b.lastIssuedLeaf)-parseInt(b.startLeaf)+1 : 0;
                  const rem = b.totalLeaves - issued;
                  return (
                    <li key={b._id} onClick={() => { onChange(b); setOpen(false); setQ(""); }}
                      style={{ padding:"10px 14px", cursor:"pointer",
                        borderBottom:"1px solid #f8fafc",
                        background: b._id===value ? "#f8fafc" : "transparent",
                        transition:"background .1s" }}
                      onMouseEnter={e => { if (b._id!==value) e.currentTarget.style.background="#f8fafc"; }}
                      onMouseLeave={e => { if (b._id!==value) e.currentTarget.style.background="transparent"; }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:8, background:m.accent,
                          color:"#fff", display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:10, fontWeight:800, fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>
                          {m.abbr.slice(0,3)}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontWeight:700, fontSize:13.5, color:"#1e293b" }}>
                            {b.chequeBookId} — {b.bankAccountName}
                          </div>
                          <div style={{ fontSize:11.5, color:"#94a3b8", marginTop:1 }}>
                            {b.branchName} · {rem} leaves left
                          </div>
                        </div>
                        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11,
                          color: rem>10 ? "#16a34a" : "#d97706", fontWeight:700, flexShrink:0 }}>
                          {rem} left
                        </div>
                      </div>
                    </li>
                  );
                })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Divider line ──────────────────────────────────────────── */
function Line({ style }) {
  return <div style={{ height:"1px", background:"#cbd5e1", ...style }}/>;
}

/* ══════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════ */
export default function CreateChequeEntry() {
  const navigate = useNavigate();
  const [books,      setBooks]      = useState([]);
  const [accounts,   setAccounts]   = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [nextNo,     setNextNo]     = useState("");
  const [loading,    setLoading]    = useState(false);
  const [notification, setNotification] = useState({ message:"", type:"info" });

  const todayStr = new Date().toISOString().slice(0,10);
  const [form, setForm] = useState({
    chequeBookId:"", chequeNo:"", date:todayStr,
    payeeAccountId:"", payeeAccountName:"", amount:"", remarks:"",
  });

  const words = amountToWords(parseFloat(form.amount) || 0);
  const bm    = selectedBook ? getBankMeta(selectedBook.bankAccountName) : null;
  const issued    = selectedBook?.lastIssuedLeaf
    ? parseInt(selectedBook.lastIssuedLeaf) - parseInt(selectedBook.startLeaf) + 1 : 0;
  const remaining = selectedBook ? selectedBook.totalLeaves - issued : 0;

  /* Fetch on mount */
  useEffect(() => {
    Promise.all([
      authFetch(`${API_BASE_URL}/cheque-books`).then(r=>r.json()),
      authFetch(`${API_BASE_URL}/accounts`).then(r=>r.json()),
    ]).then(([bd, ad]) => {
      setBooks(bd.chequeBooks || []);
      const arr = Array.isArray(ad) ? ad : (ad.accounts||[]);
      setAccounts(arr.filter(a => !a.isProtected));
    });
  }, []);

  /* When book changes, fetch next cheque no */
  const handleBookChange = b => {
    setForm(p => ({...p, chequeBookId:b._id}));
    authFetch(`${API_BASE_URL}/cheque-books/${b._id}/next-cheque-no`)
      .then(r => r.json())
      .then(d => {
        if (d.nextChequeNo) {
          setNextNo(d.nextChequeNo);
          setForm(p => ({...p, chequeNo:d.nextChequeNo}));
          setSelectedBook(d.book);
        } else {
          setSelectedBook(b);
          setNotification({ message:d.message||"All leaves exhausted.", type:"error" });
        }
      });
  };

  const handleSubmit = async () => {
    if (!form.chequeBookId)   return setNotification({ message:"Select a cheque book.", type:"error" });
    if (!form.payeeAccountId) return setNotification({ message:"Select a payee.", type:"error" });
    if (!form.amount || parseFloat(form.amount)<=0) return setNotification({ message:"Enter a valid amount.", type:"error" });
    if (parseFloat(form.amount)>100000000000) return setNotification({ message:"Amount exceeds 1000 Crore.", type:"error" });

    setLoading(true);
    const res  = await authFetch(`${API_BASE_URL}/cheque-entries`, {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setNotification({ message:`Cheque No. ${form.chequeNo} issued successfully!`, type:"success" });
      setForm(p => ({...p, payeeAccountId:"", payeeAccountName:"", amount:"", remarks:"", chequeNo:""}));
      authFetch(`${API_BASE_URL}/cheque-books/${form.chequeBookId}/next-cheque-no`)
        .then(r=>r.json())
        .then(d => { if (d.nextChequeNo) { setNextNo(d.nextChequeNo); setForm(p=>({...p,chequeNo:d.nextChequeNo})); setSelectedBook(d.book); }});
    } else {
      setNotification({ message:data.message||"Failed.", type:"error" });
    }
  };

  /* ── Styles for the cheque paper ── */
  const accentColor = bm?.accent || "#1e293b";

  return (
    <SidebarLayout>
      <style>{FONTS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({message:"",type:"info"})}/>
      <ChequeTopNav active="create-entry"/>

      <div style={{ maxWidth:820, margin:"0 auto", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>

        {/* ── Book selector bar ── */}
        <div style={{ background:"#fff", border:"1px solid #e2e8f0", borderRadius:14,
          padding:"14px 18px", marginBottom:22,
          boxShadow:"0 1px 4px rgba(0,0,0,.05)",
          display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
          <BookSelector books={books} value={form.chequeBookId} onChange={handleBookChange}/>
          {selectedBook && (
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", flexShrink:0 }}>
              {[
                ["Next No.", form.chequeNo||nextNo||"—", accentColor],
                ["Remaining", `${remaining} leaves`, remaining>10?"#16a34a":"#d97706"],
              ].map(([k,v,c]) => (
                <div key={k} style={{ background:"#f8fafc", border:"1px solid #e2e8f0",
                  borderRadius:9, padding:"7px 13px" }}>
                  <div style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700,
                    textTransform:"uppercase", letterSpacing:".07em" }}>{k}</div>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13.5,
                    fontWeight:800, color:c, marginTop:1 }}>{v}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══════════════════ THE CHEQUE ═══════════════════════════════════════ */}
        {selectedBook ? (
          <div style={{
            position:"relative", borderRadius:16, overflow:"hidden",
            boxShadow:"0 12px 48px rgba(0,0,0,.14), 0 2px 8px rgba(0,0,0,.08)",
            border:"1px solid #d1d5db",
          }}>

            {/* ── Paper background: clean off-white with very subtle grain ── */}
            <div style={{ position:"absolute", inset:0, zIndex:0,
              background:"linear-gradient(175deg, #fafafa 0%, #f4f4f5 40%, #f9f9fa 100%)" }}/>

            {/* ── Top accent strip (bank colour) ── */}
            <div style={{ position:"absolute", top:0, left:0, right:0, height:5, zIndex:3,
              background:`linear-gradient(90deg, ${accentColor}, ${accentColor}aa)` }}/>

            {/* ── Subtle vertical watermark pattern ── */}
            <div style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none", opacity:.04,
              backgroundImage:`repeating-linear-gradient(90deg,#1e293b 0,#1e293b 1px,transparent 1px,transparent 28px)`,
            }}/>

            {/* ── Large watermark text ── */}
            <div style={{ position:"absolute", inset:0, zIndex:2, display:"flex",
              alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
              <div style={{ fontSize:110, fontWeight:900, letterSpacing:"6px",
                color:"rgba(30,41,59,.032)", fontFamily:"'Cormorant Garamond',serif",
                transform:"rotate(-22deg)", whiteSpace:"nowrap", userSelect:"none" }}>
                CHEQUE
              </div>
            </div>

            {/* ── Right edge accent ── */}
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:4, zIndex:3,
              background:`linear-gradient(180deg, ${accentColor}55, ${accentColor}22)` }}/>

            {/* ── Content ── */}
            <div style={{ position:"relative", zIndex:4, padding:"28px 28px 0" }}>

              {/* ROW 1 — Bank name + cheque no + date */}
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", marginBottom:20, gap:16 }}>

                {/* Left: bank badge + bank info */}
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{
                    width:50, height:50, borderRadius:12, flexShrink:0,
                    background:accentColor,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:`0 4px 12px ${accentColor}55`,
                  }}>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13,
                      fontWeight:900, color:"#fff", letterSpacing:".04em" }}>
                      {bm?.abbr?.slice(0,3)||"BNK"}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                      fontSize:21, fontWeight:600, color:"#0f172a", lineHeight:1.1,
                      letterSpacing:"-.2px" }}>
                      {selectedBook.bankAccountName}
                    </div>
                    <div style={{ fontSize:11.5, color:"#64748b", marginTop:4,
                      fontFamily:"'JetBrains Mono',monospace", letterSpacing:".02em" }}>
                      {selectedBook.branchName} &nbsp;·&nbsp; Code: {selectedBook.branchCode}
                    </div>
                    <div style={{ fontSize:10.5, color:"#94a3b8", marginTop:2,
                      fontFamily:"'JetBrains Mono',monospace" }}>
                      A/C: {selectedBook.accountNumber}
                    </div>
                  </div>
                </div>

                {/* Right: cheque no + date */}
                <div style={{ textAlign:"right", flexShrink:0 }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:6,
                    background:"#f1f5f9", border:"1px solid #cbd5e1",
                    borderRadius:8, padding:"5px 14px", marginBottom:12 }}>
                    <span style={{ fontSize:10, fontWeight:700, color:"#64748b",
                      textTransform:"uppercase", letterSpacing:".1em" }}>No.</span>
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14,
                      fontWeight:800, color:"#0f172a", letterSpacing:".06em" }}>
                      {form.chequeNo||nextNo||"—"}
                    </span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:2 }}>
                    <span style={{ fontSize:9.5, fontWeight:700, color:"#64748b",
                      textTransform:"uppercase", letterSpacing:".1em" }}>Date</span>
                    <input type="date" value={form.date}
                      onChange={e => setForm(p=>({...p, date:e.target.value}))}
                      style={{ border:"none", borderBottom:"1.5px solid #94a3b8",
                        background:"transparent", fontFamily:"'JetBrains Mono',monospace",
                        fontSize:13.5, fontWeight:700, color:"#0f172a",
                        outline:"none", width:144, cursor:"pointer", textAlign:"right" }}/>
                  </div>
                </div>
              </div>

              <Line style={{ marginBottom:16 }}/>

              {/* ROW 2 — PAY line */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:9.5, fontWeight:700, color:"#64748b",
                  textTransform:"uppercase", letterSpacing:".12em", marginBottom:6 }}>
                  Pay to the Order of
                </div>
                <div style={{ display:"flex", alignItems:"flex-end", gap:12 }}>
                  <span style={{ fontSize:12, fontWeight:800, color:"#334155",
                    whiteSpace:"nowrap", paddingBottom:4, letterSpacing:".06em",
                    textTransform:"uppercase" }}>PAY</span>
                  <AccountPicker accounts={accounts} value={form.payeeAccountId}
                    onChange={a => setForm(p=>({...p, payeeAccountId:a._id, payeeAccountName:a.accountName}))}/>
                  <span style={{ fontSize:10.5, fontWeight:600, color:"#64748b",
                    whiteSpace:"nowrap", paddingBottom:4, letterSpacing:".05em",
                    flexShrink:0 }}>OR BEARER</span>
                </div>
              </div>

              <Line style={{ marginBottom:16 }}/>

              {/* ROW 3 — Amount in words + PKR box */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:16 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:9.5, fontWeight:700, color:"#64748b",
                    textTransform:"uppercase", letterSpacing:".12em", marginBottom:6 }}>
                    The Sum of Rupees
                  </div>
                  <div style={{ minHeight:34 }}>
                    {words ? (
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:19,
                        fontWeight:600, color:"#0f172a", lineHeight:1.35, letterSpacing:".01em" }}>
                        {words}
                      </div>
                    ) : (
                      <div style={{ borderBottom:"1px dashed #cbd5e1", paddingBottom:4 }}>
                        <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                          fontSize:17, color:"#94a3b8" }}>
                          Amount in words will appear here
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* PKR amount box */}
                <div style={{ flexShrink:0, minWidth:165,
                  border:`1.5px solid #cbd5e1`,
                  borderRadius:8, padding:"7px 13px 5px",
                  background:"#fff",
                  boxShadow:"0 1px 4px rgba(0,0,0,.05)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between",
                    alignItems:"center", marginBottom:3 }}>
                    <span style={{ fontSize:9.5, fontWeight:800, color:"#64748b",
                      textTransform:"uppercase", letterSpacing:".1em" }}>PKR</span>
                    <span style={{ fontSize:8.5, color:"#94a3b8", fontWeight:600 }}>Figures</span>
                  </div>
                  <input type="number" min="1" max="100000000000" step="0.01"
                    placeholder="0.00" value={form.amount}
                    onChange={e => setForm(p=>({...p, amount:e.target.value}))}
                    style={{ width:"100%", border:"none", background:"transparent",
                      fontFamily:"'JetBrains Mono',monospace", fontSize:20, fontWeight:800,
                      color:accentColor, outline:"none", textAlign:"right", letterSpacing:".02em" }}/>
                </div>
              </div>

              <Line style={{ marginBottom:16 }}/>

              {/* ROW 4 — A/C payee stamp + remarks + QR + signature + button */}
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-end", gap:20 }}>

                {/* Left: stamp + account title + narration */}
                <div style={{ flex:1 }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:5,
                    background:"#f1f5f9", border:"1px solid #cbd5e1",
                    borderRadius:5, padding:"3px 9px", marginBottom:6 }}>
                    <span style={{ fontSize:9.5, fontWeight:800, color:"#475569",
                      textTransform:"uppercase", letterSpacing:".1em" }}>
                      A/C Payee Only
                    </span>
                  </div>
                  <div style={{ fontSize:11, color:"#64748b", marginBottom:8,
                    fontFamily:"'JetBrains Mono',monospace", letterSpacing:".01em" }}>
                    {selectedBook.accountTitle}
                  </div>
                  <input placeholder="Narration / remarks (optional)" value={form.remarks}
                    onChange={e => setForm(p=>({...p, remarks:e.target.value}))}
                    style={{ width:"100%", border:"none",
                      borderBottom:"1px dashed #cbd5e1",
                      background:"transparent",
                      fontFamily:"'Plus Jakarta Sans',sans-serif",
                      fontSize:12.5, color:"#374151",
                      outline:"none", padding:"3px 0" }}/>
                </div>

                {/* Center: QR code */}
                <QRCode data={selectedBook.iban} size={72}/>

                {/* Right: signature area + button */}
                <div style={{ flexShrink:0, textAlign:"center", minWidth:165 }}>
                  <div style={{ height:40, marginBottom:4,
                    borderBottom:"1.5px solid #94a3b8",
                    display:"flex", alignItems:"flex-end",
                    justifyContent:"center", paddingBottom:3 }}>
                    <span style={{ fontFamily:"'Cormorant Garamond',serif", fontStyle:"italic",
                      fontSize:22, color:"rgba(30,41,59,.18)", userSelect:"none",
                      letterSpacing:".04em" }}>Authorised</span>
                  </div>
                  <div style={{ fontSize:9, color:"#94a3b8", letterSpacing:".1em",
                    textTransform:"uppercase", fontWeight:700, marginBottom:12 }}>
                    Authorised Signatory
                  </div>
                  <button type="button" onClick={handleSubmit}
                    disabled={loading||!form.payeeAccountId||!form.amount}
                    style={{
                      width:"100%", padding:"11px 0", borderRadius:9,
                      background: loading||!form.payeeAccountId||!form.amount
                        ? "#f1f5f9"
                        : accentColor,
                      border: "none",
                      color: loading||!form.payeeAccountId||!form.amount ? "#94a3b8" : "#fff",
                      fontSize:13.5, fontWeight:700, cursor: loading||!form.payeeAccountId||!form.amount ? "not-allowed" : "pointer",
                      fontFamily:"'Plus Jakarta Sans',sans-serif", letterSpacing:".03em",
                      transition:".15s",
                      boxShadow: loading||!form.payeeAccountId||!form.amount
                        ? "none" : `0 6px 18px ${accentColor}55`,
                    }}>
                    {loading ? "Issuing…" : "✓  Issue Cheque"}
                  </button>
                </div>
              </div>

              {/* ── MICR BAND ── */}
              <div style={{
                margin:"20px -28px 0",
                padding:"11px 28px",
                background:"#f1f5f9",
                borderTop:"1px solid #e2e8f0",
                display:"flex", justifyContent:"space-between", alignItems:"center",
              }}>
                {/* MICR line: cheque no | branch code | IBAN */}
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:13,
                  fontWeight:700, color:"#475569", letterSpacing:"3px",
                  display:"flex", alignItems:"center", gap:0 }}>
                  <span style={{ color:"#94a3b8", marginRight:6 }}>⑆</span>
                  {form.chequeNo||nextNo||"00000000"}
                  <span style={{ color:"#94a3b8", margin:"0 6px" }}>⑆</span>
                  {selectedBook.branchCode}
                  <span style={{ color:"#94a3b8", margin:"0 6px" }}>⑆</span>
                  <span style={{ letterSpacing:"1.5px", fontSize:11.5, color:"#64748b" }}>
                    {selectedBook.iban}
                  </span>
                  <span style={{ color:"#94a3b8", marginLeft:6 }}>⑆</span>
                </div>
                {/* Right: small accent dot + label */}
                <div style={{ display:"flex", alignItems:"center", gap:7, flexShrink:0 }}>
                  <div style={{ width:16, height:16, borderRadius:4, background:accentColor, opacity:.7 }}/>
                  <span style={{ fontSize:9.5, color:"#94a3b8", fontWeight:700,
                    textTransform:"uppercase", letterSpacing:".1em" }}>
                    Agro Plus · {new Date().getFullYear()}
                  </span>
                </div>
              </div>

            </div>{/* /content */}
          </div>
        ) : (
          <div style={{ background:"#fff", border:"2px dashed #e2e8f0", borderRadius:16,
            padding:"56px 24px", textAlign:"center" }}>
            <div style={{ width:64, height:64, borderRadius:16, background:"#f8fafc",
              border:"1px solid #e2e8f0",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 16px" }}>
              <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#94a3b8" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <div style={{ fontSize:16, fontWeight:700, color:"#374151" }}>Select a Cheque Book</div>
            <div style={{ fontSize:13, color:"#9ca3af", marginTop:6 }}>
              Choose from the dropdown above to begin issuing a cheque
            </div>
            {books.length === 0 && (
              <button onClick={() => navigate("/cheque-book/create")} style={{
                marginTop:16, padding:"9px 22px", borderRadius:10, border:"none",
                cursor:"pointer", background:"#1e293b", color:"#fff",
                fontSize:13, fontWeight:700, fontFamily:"'Plus Jakarta Sans',sans-serif",
              }}>+ Create First Cheque Book</button>
            )}
          </div>
        )}

      </div>
    </SidebarLayout>
  );
}