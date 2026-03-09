import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

/* ─── Fonts ─────────────────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');`;

/* ─── CSS ────────────────────────────────────────────────────────────────────── */
const CSS = `
  .pi-wrap *, .pi-wrap *::before, .pi-wrap *::after { box-sizing: border-box; }
  .pi-wrap {
    font-family: 'Barlow', sans-serif;
    color: #1a1a2e;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
  }

  /* ── Header ── */
  .pi-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .pi-header-left { display: flex; align-items: baseline; gap: 10px; }
  .pi-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800; letter-spacing: -.3px;
    color: #0f172a; line-height: 1;
  }
  .pi-invoice-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 500;
    background: #0f172a; color: #34d399;
    padding: 3px 9px; border-radius: 4px; letter-spacing: .03em;
  }
  .pi-fullscreen-btn {
    font-size: 11px; font-weight: 700; font-family: 'Barlow', sans-serif;
    padding: 5px 12px; border-radius: 6px;
    border: 1.5px solid #e2e8f0; background: #fff;
    color: #64748b; cursor: pointer; transition: all .15s;
    text-transform: uppercase; letter-spacing: .05em;
  }
  .pi-fullscreen-btn:hover { border-color: #94a3b8; color: #1e293b; }

  /* ── Grid layout ── */
  .pi-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr 0.95fr;
    gap: 10px;
    align-items: start;
  }

  /* ── Panel (card) ── */
  .pi-panel {
    background: #fff;
    border: 1.5px solid #e8eaf0;
    border-radius: 10px;
    overflow: hidden;
  }
  .pi-panel-head {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1.5px solid #e8eaf0;
  }
  .pi-panel-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .pi-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    color: #64748b;
  }
  .pi-panel-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }

  /* ── Field ── */
  .pi-field { display: flex; flex-direction: column; gap: 3px; }
  .pi-field-row { display: grid; gap: 8px; }
  .pi-field-row.col2 { grid-template-columns: 1fr 1fr; }
  .pi-field-row.col3 { grid-template-columns: 1fr 1fr 1fr; }

  .pi-label {
    font-size: 10px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: #94a3b8;
  }
  .pi-input, .pi-select {
    width: 100%; padding: 7px 9px;
    border: 1.5px solid #e2e8f0; border-radius: 7px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    color: #1e293b; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .pi-input::placeholder { color: #c4cad4; }
  .pi-input:focus, .pi-select:focus {
    border-color: #3b82f6; box-shadow: 0 0 0 2.5px rgba(59,130,246,.14);
  }
  .pi-input.ro {
    background: #f8fafc; color: #475569;
    border-color: #edf0f5; cursor: default;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
  }

  /* highlight computed amount */
  .pi-input.highlight {
    background: #f0fdf4; color: #16a34a; border-color: #bbf7d0;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500;
  }

  /* ── Select wrapper ── */
  .pi-select-wrap { position: relative; }
  .pi-select-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8;
  }

  /* ── Submit row ── */
  .pi-actions {
    display: flex; align-items: center; justify-content: flex-end;
    gap: 10px; margin-top: 4px;
  }
  .pi-submit {
    padding: 9px 22px; border-radius: 8px; border: none; cursor: pointer;
    background: #0f172a; color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: .05em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
    transition: background .15s, box-shadow .15s, transform .1s;
    box-shadow: 0 3px 10px rgba(15,23,42,.2);
  }
  .pi-submit:hover { background: #1e293b; box-shadow: 0 5px 16px rgba(15,23,42,.28); }
  .pi-submit:active { transform: scale(.99); }
  .pi-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  @keyframes pi-spin { to { transform: rotate(360deg); } }
  .pi-spin { animation: pi-spin .8s linear infinite; display: inline-block; }

  /* ── Divider ── */
  .pi-divider {
    height: 1px; background: #f1f5f9; margin: 2px 0;
  }

  /* fullscreen host */
  .pi-fullscreen {
    position: fixed; inset: 0; z-index: 50;
    background: #f1f5f9; overflow-y: auto; padding: 20px;
  }
`;

/* ─── Sub-components ─────────────────────────────────────────────────────────── */
function F({ label, name, value, onChange, readOnly, type = "text", placeholder, max, highlight }) {
  return (
    <div className="pi-field">
      <label className="pi-label">{label}</label>
      <input
        type={type} name={name} value={value ?? ""} onChange={onChange}
        readOnly={readOnly} max={max} placeholder={placeholder}
        className={`pi-input${readOnly ? " ro" : ""}${highlight ? " highlight" : ""}`}
      />
    </div>
  );
}

function Sel({ label, value, onChange, options }) {
  return (
    <div className="pi-field">
      <label className="pi-label">{label}</label>
      <div className="pi-select-wrap">
        <select value={value} onChange={onChange} className="pi-select">
          <option value="">Select…</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const AddPurchaseInvoice = () => {
  const today = new Date().toISOString().split("T")[0];

  const blank = {
    date: today, vehicleNumber: "", builtyNumber: "", vendorName: "",
    productId: "", paddyType: "", quantity: "", bagWeight: "",
    subtractWeight: "", finalWeight: "", moisturePercent: "",
    moistureAdjCal: "", netWeight: "", netWeight40KG: "",
    rate40kg: "", amountCal: "", amount: "", rentAdjustment: "",
  };

  const [form, setForm]               = useState(blank);
  const [products, setProducts]       = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [invoiceNumber, setInvoiceNumber]     = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const formRef = useRef(null);
  const token   = localStorage.getItem("token");

  /* Enter → next field */
  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const els = formRef.current?.querySelectorAll('input:not([type=submit]):not([readonly]), select');
    if (!els?.length) return;
    const i = [...els].indexOf(e.target);
    if (i >= 0 && i < els.length - 1) { e.preventDefault(); els[i + 1].focus(); }
  };

  /* Fetch products */
  useEffect(() => {
    authFetch(`${API_BASE_URL}/products`)
      .then(r => r.json())
      .then(d => { if (d.success) setProducts(d.products); })
      .catch(console.error);
  }, []);

  /* Fetch next invoice # */
  const fetchNextSr = () =>
    authFetch(`${API_BASE_URL}/purchase-invoice/next-sr`)
      .then(r => r.json())
      .then(d => { if (d.success && d.nextSr != null) setInvoiceNumber(String(d.nextSr)); })
      .catch(console.error);

  useEffect(() => { fetchNextSr(); }, []);

  /* Auto-calculations */
  useEffect(() => {
    const qty  = Number(form.quantity)      || 0;
    const bwt  = Number(form.bagWeight)     || 0;
    const mpc  = Number(form.moisturePercent) || 0;
    const rate = Number(form.rate40kg)      || 0;

    const gross   = qty * bwt;
    const mAdj    = (gross * mpc) / 100;
    const net     = gross - mAdj;
    const net40   = net / 40;
    const amount  = net40 * rate;

    setForm(p => ({
      ...p,
      subtractWeight: gross.toFixed(2),
      finalWeight:    gross.toFixed(2),
      moistureAdjCal: mAdj.toFixed(2),
      netWeight:      net.toFixed(2),
      netWeight40KG:  net40.toFixed(2),
      amountCal:      amount.toFixed(2),
      amount:         amount.toFixed(2),
    }));
  }, [form.quantity, form.bagWeight, form.moisturePercent, form.rate40kg]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productId || !form.date || !form.vehicleNumber || !form.vendorName || !form.builtyNumber) {
      return setNotification({ message: "Please fill all required fields", type: "error" });
    }
    setLoading(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/purchase-invoice/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sr: Number(invoiceNumber) }),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: "Purchase invoice saved!", type: "success" });
        setForm(blank);
        setSelectedProduct("");
        await fetchNextSr();
      } else {
        setNotification({ message: data.message || "Failed to save invoice", type: "error" });
      }
    } catch {
      setNotification({ message: "Server error — please try again", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* Escape exits fullscreen */
  useEffect(() => {
    const h = (e) => { if (e.key === "Escape" && isMaximized) setIsMaximized(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [isMaximized]);

  /* ── Render ── */
  const content = (
    <>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })} />

      <div className="pi-wrap">

        {/* Header */}
        <div className="pi-header">
          <div className="pi-header-left">
            <h1 className="pi-title">Purchase Invoice</h1>
            <span className="pi-invoice-tag">
              #{invoiceNumber ? String(invoiceNumber).padStart(4, "0") : "----"}
            </span>
          </div>
          <button className="pi-fullscreen-btn" type="button"
            onClick={() => setIsMaximized(p => !p)}>
            {isMaximized ? "⊠ Exit" : "⊞ Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="pi-grid">

            {/* ── PANEL 1: Basic Info ── */}
            <div className="pi-panel">
              <div className="pi-panel-head">
                <div className="pi-panel-dot" style={{ background: "#3b82f6" }} />
                <span className="pi-panel-label">Basic Information</span>
              </div>
              <div className="pi-panel-body">
                <div className="pi-field-row col2">
                  <F label="Date" name="date" type="date" value={form.date} onChange={handleChange} max={today} />
                  <F label="Invoice #" name="sr" value={invoiceNumber || "…"} readOnly />
                </div>
                <div className="pi-field-row col2">
                  <F label="Vehicle No." name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} placeholder="e.g. LEA-1234" />
                  <F label="Builty No." name="builtyNumber" value={form.builtyNumber} onChange={handleChange} placeholder="e.g. B-001" />
                </div>
                <F label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} placeholder="Supplier / Party name" />
                <div className="pi-field">
                  <label className="pi-label">Product</label>
                  <div className="pi-select-wrap">
                    <select value={selectedProduct} className="pi-select" required
                      onChange={(e) => {
                        const p = products.find(x => x._id === e.target.value);
                        setSelectedProduct(e.target.value);
                        setForm(prev => ({ ...prev, paddyType: p?.productName || "", productId: p?._id || "" }));
                      }}>
                      <option value="">Select product…</option>
                      {products.map(p => <option key={p._id} value={p._id}>{p.productName}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pi-field-row col2">
                  <F label="Bag Qty" name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="0" />
                  <F label="Bag Weight (kg)" name="bagWeight" type="number" value={form.bagWeight} onChange={handleChange} placeholder="0" />
                </div>
              </div>
            </div>

            {/* ── PANEL 2: Weight & Moisture ── */}
            <div className="pi-panel">
              <div className="pi-panel-head">
                <div className="pi-panel-dot" style={{ background: "#f59e0b" }} />
                <span className="pi-panel-label">Weight & Moisture</span>
              </div>
              <div className="pi-panel-body">
                <div className="pi-field-row col2">
                  <F label="Total Bag Wt (kg)" name="subtractWeight" value={form.subtractWeight} readOnly />
                  <F label="Gross Weight (kg)" name="finalWeight" value={form.finalWeight} readOnly />
                </div>
                <div className="pi-divider" />
                <F label="Moisture %" name="moisturePercent" type="number" value={form.moisturePercent} onChange={handleChange} placeholder="e.g. 2.5" />
                <div className="pi-field-row col2">
                  <F label="Moisture Adj (kg)" name="moistureAdjCal" value={form.moistureAdjCal} readOnly />
                  <F label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
                </div>
                <div className="pi-divider" />
                <F label="Net Weight (Maund / 40 kg)" name="netWeight40KG" value={form.netWeight40KG} readOnly />
              </div>
            </div>

            {/* ── PANEL 3: Pricing ── */}
            <div className="pi-panel">
              <div className="pi-panel-head">
                <div className="pi-panel-dot" style={{ background: "#10b981" }} />
                <span className="pi-panel-label">Pricing & Summary</span>
              </div>
              <div className="pi-panel-body">
                <F label="Rate / 40 kg (Rs.)" name="rate40kg" type="number" value={form.rate40kg} onChange={handleChange} placeholder="0" />
                <div className="pi-divider" />
                <F label="Calculated Amount (Rs.)" name="amountCal" value={form.amountCal} readOnly />
                <F label="Final Amount (Rs.)" name="amount" value={form.amount} readOnly highlight />
                <div className="pi-divider" />
                <F label="Rent Adjustment (Rs.)" name="rentAdjustment" type="number" value={form.rentAdjustment} onChange={handleChange} placeholder="0" />

                {/* summary strip */}
                <div style={{
                  marginTop: 4, padding: "9px 11px", borderRadius: 8,
                  background: "#f0fdf4", border: "1.5px solid #bbf7d0",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: ".06em" }}>
                      Net Payable
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: "#16a34a" }}>
                      Rs. {(
                        (Number(form.amount) || 0) - (Number(form.rentAdjustment) || 0)
                      ).toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* submit */}
                <div className="pi-actions">
                  <button type="submit" className="pi-submit" disabled={loading}
                    style={{ width: "100%", justifyContent: "center" }}>
                    {loading ? (
                      <>
                        <span className="pi-spin">
                          <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                          </svg>
                        </span>
                        Saving…
                      </>
                    ) : (
                      <>
                        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        Save Invoice
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );

  return isMaximized ? (
    <div className="pi-fullscreen">{content}</div>
  ) : (
    <SidebarLayout>{content}</SidebarLayout>
  );
};

export default AddPurchaseInvoice;