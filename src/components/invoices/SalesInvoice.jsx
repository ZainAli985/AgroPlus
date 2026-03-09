import React, { useState, useEffect, useRef } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

/* ─── Fonts ─────────────────────────────────────────────────────────────────── */
const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');`;

/* ─── CSS ────────────────────────────────────────────────────────────────────── */
const CSS = `
  .si-wrap *, .si-wrap *::before, .si-wrap *::after { box-sizing: border-box; }
  .si-wrap {
    font-family: 'Barlow', sans-serif;
    color: #1a1a2e;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px;
  }

  /* ── Header ── */
  .si-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 14px;
  }
  .si-header-left { display: flex; align-items: baseline; gap: 10px; }
  .si-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px; font-weight: 800; letter-spacing: -.3px;
    color: #0f172a; line-height: 1;
  }
  .si-invoice-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 500;
    background: #0f172a; color: #818cf8;
    padding: 3px 9px; border-radius: 4px; letter-spacing: .03em;
  }
  .si-fullscreen-btn {
    font-size: 11px; font-weight: 700; font-family: 'Barlow', sans-serif;
    padding: 5px 12px; border-radius: 6px;
    border: 1.5px solid #e2e8f0; background: #fff;
    color: #64748b; cursor: pointer; transition: all .15s;
    text-transform: uppercase; letter-spacing: .05em;
  }
  .si-fullscreen-btn:hover { border-color: #94a3b8; color: #1e293b; }

  /* ── Grid layout ── */
  .si-grid {
    display: grid;
    grid-template-columns: 1.05fr 1fr 0.95fr;
    gap: 10px;
    align-items: start;
  }

  /* ── Panel ── */
  .si-panel {
    background: #fff;
    border: 1.5px solid #e8eaf0;
    border-radius: 10px;
    overflow: hidden;
  }
  .si-panel-head {
    display: flex; align-items: center; gap: 7px;
    padding: 8px 12px;
    background: #f8fafc;
    border-bottom: 1.5px solid #e8eaf0;
  }
  .si-panel-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .si-panel-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px; font-weight: 700;
    text-transform: uppercase; letter-spacing: .1em;
    color: #64748b;
  }
  .si-panel-body { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }

  /* ── Fields ── */
  .si-field { display: flex; flex-direction: column; gap: 3px; }
  .si-field-row { display: grid; gap: 8px; }
  .si-field-row.col2 { grid-template-columns: 1fr 1fr; }
  .si-field-row.col3 { grid-template-columns: 1fr 1fr 1fr; }

  .si-label {
    font-size: 10px; font-weight: 700; letter-spacing: .07em;
    text-transform: uppercase; color: #94a3b8;
  }
  .si-input, .si-select {
    width: 100%; padding: 7px 9px;
    border: 1.5px solid #e2e8f0; border-radius: 7px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    color: #1e293b; background: #fff; outline: none;
    transition: border-color .12s, box-shadow .12s;
    appearance: none;
  }
  .si-input::placeholder { color: #c4cad4; }
  .si-input:focus, .si-select:focus {
    border-color: #6366f1; box-shadow: 0 0 0 2.5px rgba(99,102,241,.14);
  }
  .si-input.ro {
    background: #f8fafc; color: #475569;
    border-color: #edf0f5; cursor: default;
    font-family: 'JetBrains Mono', monospace; font-size: 12px;
  }
  .si-input.highlight {
    background: #faf5ff; color: #7c3aed; border-color: #ddd6fe;
    font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 500;
  }

  /* ── Select wrapper ── */
  .si-select-wrap { position: relative; }
  .si-select-wrap::after {
    content: ''; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
    pointer-events: none;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid #94a3b8;
  }

  /* ── Divider ── */
  .si-divider { height: 1px; background: #f1f5f9; margin: 2px 0; }

  /* ── Submit ── */
  .si-submit {
    width: 100%; padding: 9px 22px; border-radius: 8px; border: none; cursor: pointer;
    background: #4f46e5; color: #fff;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: .05em;
    text-transform: uppercase;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .15s, box-shadow .15s, transform .1s;
    box-shadow: 0 3px 10px rgba(79,70,229,.25);
  }
  .si-submit:hover { background: #4338ca; box-shadow: 0 5px 16px rgba(79,70,229,.35); }
  .si-submit:active { transform: scale(.99); }
  .si-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
  @keyframes si-spin { to { transform: rotate(360deg); } }
  .si-spin { animation: si-spin .8s linear infinite; display: inline-block; }

  /* fullscreen */
  .si-fullscreen {
    position: fixed; inset: 0; z-index: 50;
    background: #f1f5f9; overflow-y: auto; padding: 20px;
  }
`;

/* ─── Sub-components ─────────────────────────────────────────────────────────── */
function F({ label, name, value, onChange, readOnly, type = "text", placeholder, max, highlight }) {
  return (
    <div className="si-field">
      <label className="si-label">{label}</label>
      <input
        type={type} name={name} value={value ?? ""} onChange={onChange}
        readOnly={readOnly} max={max} placeholder={placeholder}
        className={`si-input${readOnly ? " ro" : ""}${highlight ? " highlight" : ""}`}
      />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────────── */
const AddSalesInvoice = () => {
  const today = new Date().toISOString().split("T")[0];

  const blank = {
    date: today, vehicleNo: "", builtyNo: "", vendorName: "", brokerName: "",
    productId: "", paddyType: "", quantity: "", weight: "", bagWeight: "",
    netWeight: "", netWeight40: "", rate40: "", amount: "",
    sutliSilaiRate: "", sutliSilaiAmount: "", totalAmount: "",
    brokeryRate: "", brokery: "", totalAmount2: "",
  };

  const [form, setForm]             = useState(blank);
  const [products, setProducts]     = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "info" });
  const formRef = useRef(null);

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

  /* Auto-calculations */
  useEffect(() => {
    const qty    = Number(form.quantity)       || 0;
    const wt     = Number(form.weight)         || 0;
    const bagWt  = Number(form.bagWeight)      || 0;
    const rate   = Number(form.rate40)         || 0;
    const sutli  = Number(form.sutliSilaiRate) || 0;
    const brokPc = Number(form.brokeryRate)    || 0;

    const netWeight      = wt - (bagWt * qty);
    const netWeight40    = netWeight > 0 ? (netWeight / 40).toFixed(2) : "";
    const amount         = netWeight40 ? (netWeight40 * rate).toFixed(2) : "";
    const sutliAmount    = qty > 0 ? (sutli * qty).toFixed(2) : "";
    const totalAmount    = amount
      ? (parseFloat(amount) + parseFloat(sutliAmount || 0)).toFixed(2)
      : "";
    const brokery        = totalAmount && brokPc
      ? ((parseFloat(totalAmount) * brokPc) / 100).toFixed(2)
      : "";
    const totalAmount2   = totalAmount
      ? (parseFloat(totalAmount) - parseFloat(brokery || 0)).toFixed(2)
      : "";

    setForm(p => ({
      ...p,
      netWeight: netWeight > 0 ? netWeight.toFixed(2) : "",
      netWeight40, amount, sutliSilaiAmount: sutliAmount,
      totalAmount, brokery, totalAmount2,
    }));
  }, [form.weight, form.bagWeight, form.quantity, form.rate40, form.sutliSilaiRate, form.brokeryRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productId || !form.date || !form.vehicleNo || !form.vendorName || !form.builtyNo) {
      return setNotification({ message: "Please fill all required fields", type: "error" });
    }
    setLoading(true);
    try {
      const res  = await authFetch(`${API_BASE_URL}/sales-invoice/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setNotification({ message: "Sales invoice saved!", type: "success" });
        setForm(blank);
        setSelectedProduct("");
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

  /* derived display values */
  const netWt   = Number(form.netWeight) || 0;
  const maund   = netWt > 0 ? (netWt / 40).toFixed(2)   : "—";
  const ton     = netWt > 0 ? (netWt / 1000).toFixed(3) : "—";

  /* ── Render ── */
  const content = (
    <>
      <style>{FONTS}{CSS}</style>
      <Notification message={notification.message} type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })} />

      <div className="si-wrap">

        {/* Header */}
        <div className="si-header">
          <div className="si-header-left">
            <h1 className="si-title">Sales Invoice</h1>
            <span className="si-invoice-tag">SALES</span>
          </div>
          <button className="si-fullscreen-btn" type="button"
            onClick={() => setIsMaximized(p => !p)}>
            {isMaximized ? "⊠ Exit" : "⊞ Full Screen"}
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          <div className="si-grid">

            {/* ── PANEL 1: Basic Info ── */}
            <div className="si-panel">
              <div className="si-panel-head">
                <div className="si-panel-dot" style={{ background: "#6366f1" }} />
                <span className="si-panel-label">Basic Information</span>
              </div>
              <div className="si-panel-body">
                <div className="si-field-row col2">
                  <F label="Date" name="date" type="date" value={form.date} onChange={handleChange} max={today} />
                  <F label="Vehicle No." name="vehicleNo" value={form.vehicleNo} onChange={handleChange} placeholder="e.g. LEA-1234" />
                </div>
                <div className="si-field-row col2">
                  <F label="Builty No." name="builtyNo" value={form.builtyNo} onChange={handleChange} placeholder="e.g. B-001" />
                  <F label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} placeholder="Party name" />
                </div>
                <F label="Broker Name" name="brokerName" value={form.brokerName} onChange={handleChange} placeholder="Optional" />
                <div className="si-field">
                  <label className="si-label">Product</label>
                  <div className="si-select-wrap">
                    <select value={selectedProduct} className="si-select" required
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
                <div className="si-field-row col3">
                  <F label="Quantity (Bags)" name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="0" />
                  <F label="Total Wt (kg)" name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="0" />
                  <F label="Bag Wt (kg)" name="bagWeight" type="number" value={form.bagWeight} onChange={handleChange} placeholder="0" />
                </div>
              </div>
            </div>

            {/* ── PANEL 2: Weight & Rates ── */}
            <div className="si-panel">
              <div className="si-panel-head">
                <div className="si-panel-dot" style={{ background: "#f59e0b" }} />
                <span className="si-panel-label">Weight & Rates</span>
              </div>
              <div className="si-panel-body">
                <div className="si-field-row col2">
                  <F label="Net Weight (kg)" name="netWeight" value={form.netWeight || "—"} readOnly />
                  <F label="Net (Maund)" name="_maund" value={maund} readOnly />
                </div>
                <F label="Net Weight (Ton)" name="_ton" value={ton} readOnly />
                <div className="si-divider" />
                <F label="Rate / 40 kg (Rs.)" name="rate40" type="number" value={form.rate40} onChange={handleChange} placeholder="0" />
                <div className="si-field-row col2">
                  <F label="Amount (Rs.)" name="amount" value={form.amount || "—"} readOnly />
                  <F label="Sutli Rate (Rs.)" name="sutliSilaiRate" type="number" value={form.sutliSilaiRate} onChange={handleChange} placeholder="0" />
                </div>
                <div className="si-field-row col2">
                  <F label="Sutli Amount" name="sutliSilaiAmount" value={form.sutliSilaiAmount || "—"} readOnly />
                  <F label="Total w/ Sutli" name="totalAmount" value={form.totalAmount || "—"} readOnly />
                </div>
              </div>
            </div>

            {/* ── PANEL 3: Brokery & Summary ── */}
            <div className="si-panel">
              <div className="si-panel-head">
                <div className="si-panel-dot" style={{ background: "#10b981" }} />
                <span className="si-panel-label">Brokery & Summary</span>
              </div>
              <div className="si-panel-body">
                <F label="Brokery %" name="brokeryRate" type="number" value={form.brokeryRate} onChange={handleChange} placeholder="e.g. 1.5" />
                <div className="si-field-row col2">
                  <F label="Brokery Amt (Rs.)" name="brokery" value={form.brokery || "—"} readOnly />
                  <F label="Net after Brokery" name="totalAmount2" value={form.totalAmount2 || "—"} readOnly highlight />
                </div>
                <div className="si-divider" />

                {/* summary strip */}
                <div style={{
                  padding: "9px 11px", borderRadius: 8,
                  background: "#f5f3ff", border: "1.5px solid #ddd6fe",
                }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em" }}>Gross Amount</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#475569" }}>
                        Rs. {Number(form.totalAmount || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: ".06em" }}>Brokery Deduct</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "#ef4444" }}>
                        − Rs. {Number(form.brokery || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div style={{ height: 1, background: "#ddd6fe" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#6d28d9", textTransform: "uppercase", letterSpacing: ".06em" }}>Net Payable</span>
                      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: "#6d28d9" }}>
                        Rs. {Number(form.totalAmount2 || 0).toLocaleString("en-PK", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* submit */}
                <button type="submit" className="si-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="si-spin">
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
        </form>
      </div>
    </>
  );

  return isMaximized ? (
    <div className="si-fullscreen">{content}</div>
  ) : (
    <SidebarLayout>{content}</SidebarLayout>
  );
};

export default AddSalesInvoice;