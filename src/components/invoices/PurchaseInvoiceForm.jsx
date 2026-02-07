import React, { useState, useEffect } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const PurchaseInvoiceForm = () => {
  const [form, setForm] = useState({
    date: "",
    ledgerReference: "",
    vehicleNumber: "",
    builtyNumber: "",
    vendorName: "",
    brokerName: "",
    paddyType: "",
    quantity: "",
    emptyVehicleWeight: "",
    filledVehicleWeight: "",
    subtractWeight: "",
    bagWeight: "",
    finalWeight: "",
    moisturePercent: "",
    moistureAdjCal: "",
    moistureAdjustment: "",
    netWeightCal: "",
    netWeight: "",
    netWeight40KG: "",
    weightKG: "",
    rate40kg: "",
    amountCal: "",
    amount: "",
    difference: "",
    rentAdjustment: ""
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");


  const [notification, setNotification] = useState({ message: "", type: "info" });

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
      })
      .catch(console.error);
  }, []);

  // Today's date in YYYY-MM-DD format for max attribute
  const today = new Date().toISOString().split("T")[0];

  // Auto calculations whenever relevant fields change
  useEffect(() => {
    const subtractWeight =
      form.filledVehicleWeight !== "" && form.emptyVehicleWeight !== ""
        ? Number(form.filledVehicleWeight) - Number(form.emptyVehicleWeight)
        : 0;

    const finalWeight =
      subtractWeight !== "" && form.bagWeight !== ""
        ? subtractWeight - Number(form.bagWeight)
        : subtractWeight;


    const moistureAdjCal =
      finalWeight && form.moisturePercent
        ? (finalWeight * form.moisturePercent) / 100
        : 0;

    const netWeight = finalWeight - moistureAdjCal;
    const netWeight40KG = netWeight ? netWeight / 40 : 0;
    const amount = netWeight40KG && form.rate40kg ? netWeight40KG * form.rate40kg : 0;

    setForm((prev) => ({
      ...prev,
      subtractWeight,
      finalWeight,
      moistureAdjCal,
      moistureAdjustment: moistureAdjCal,
      netWeight,
      netWeight40KG,
      amountCal: amount,
      amount
    }));
  }, [
    form.emptyVehicleWeight,
    form.filledVehicleWeight,
    form.bagWeight,
    form.moisturePercent,
    form.rate40kg
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.productId || !form.date || !form.vehicleNumber || !form.vendorName || !form.builtyNumber) {
      return setNotification({ message: "Please fill required fields", type: "error" });
    }
    try {
      const response = await fetch(`${API_BASE_URL}/purchase-invoice/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.success) {
        setNotification({ message: "Purchase invoice saved successfully!", type: "success" });
        setForm({
          date: "",
          ledgerReference: "",
          vehicleNumber: "",
          builtyNumber: "",
          vendorName: "",
          brokerName: "",
          productId: "",
          paddyType: "",
          quantity: "",
          emptyVehicleWeight: "",
          filledVehicleWeight: "",
          subtractWeight: "",
          bagWeight: "",
          finalWeight: "",
          moisturePercent: "",
          moistureAdjCal: "",
          moistureAdjustment: "",
          netWeightCal: "",
          netWeight: "",
          netWeight40KG: "",
          weightKG: "",
          rate40kg: "",
          amountCal: "",
          amount: "",
          difference: "",
          rentAdjustment: ""
        });
        setSelectedProduct("");

      } else {
        setNotification({ message: data.message || "Failed to save invoice", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setNotification({ message: "Server error!", type: "error" });
    }
  };

  return (
    <SidebarLayout>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold border-b pb-3">Purchase Invoice Entry</h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
          <input
            type="date"
            name="date"
            max={today} // Limit date to today or earlier
            value={form.date}
            onChange={handleChange}
            className="input"
            placeholder="Date"
          />
          <input name="ledgerReference" value={form.ledgerReference} onChange={handleChange} className="input" placeholder="Ledger Reference" />
          <input name="vehicleNumber" value={form.vehicleNumber} onChange={handleChange} className="input" placeholder="Vehicle Number" />
          <input name="builtyNumber" value={form.builtyNumber} onChange={handleChange} className="input" placeholder="Builty Number" />
          <input name="vendorName" value={form.vendorName} onChange={handleChange} className="input" placeholder="Vendor Name" />
          <input name="brokerName" value={form.brokerName} onChange={handleChange} className="input" placeholder="Broker Name" />
          {/* <input name="paddyType" value={form.paddyType} onChange={handleChange} className="input" placeholder="Paddy Type" /> */}
          <select
            value={selectedProduct}
            onChange={(e) => {
              const product = products.find(p => p._id === e.target.value);
              setSelectedProduct(e.target.value);
              setForm(prev => ({
                ...prev,
                paddyType: product?.productName || "",
                productId: product?._id || "",
              }));
            }}
            className="input"
            required
          >

            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>
                {p.productName}
              </option>
            ))}

          </select>

          <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="input" placeholder="Quantity" />
          <input type="number" name="emptyVehicleWeight" value={form.emptyVehicleWeight} onChange={handleChange} className="input" placeholder="Empty Vehicle Weight" />
          <input type="number" name="filledVehicleWeight" value={form.filledVehicleWeight} onChange={handleChange} className="input" placeholder="Filled Vehicle Weight" />
          <input type="number" name="subtractWeight" value={form.subtractWeight} readOnly className="input bg-gray-100" placeholder="Subtract Weight" />
          <input type="number" name="bagWeight" value={form.bagWeight} onChange={handleChange} className="input" placeholder="Bag Weight" />
          <input type="number" name="finalWeight" value={form.finalWeight} readOnly className="input bg-gray-100" placeholder="Final Weight" />
          <input type="number" name="moisturePercent" value={form.moisturePercent} onChange={handleChange} className="input" placeholder="Moisture %" />
          <input type="number" name="moistureAdjCal" value={form.moistureAdjCal} readOnly className="input bg-gray-100" placeholder="Moisture Adj. Cal." />
          <input type="number" name="moistureAdjustment" value={form.moistureAdjustment} readOnly className="input bg-gray-100" placeholder="Moisture Adjustment" />
          <input type="number" name="netWeight" value={form.netWeight} readOnly className="input bg-gray-100" placeholder="Net Weight" />
          <input type="number" name="netWeight40KG" value={form.netWeight40KG} readOnly className="input bg-gray-100" placeholder="Net Weight / 40Kg" />
          <input type="number" name="rate40kg" value={form.rate40kg} onChange={handleChange} className="input" placeholder="Rate / 40kg" />
          <input type="number" name="amountCal" value={form.amountCal} readOnly className="input bg-gray-100" placeholder="Amount Cal." />
          <input type="number" name="amount" value={form.amount} readOnly className="input bg-gray-100" placeholder="Amount" />
          <input type="number" name="difference" value={form.difference} onChange={handleChange} className="input" placeholder="Difference" />
          <input type="number" name="rentAdjustment" value={form.rentAdjustment} onChange={handleChange} className="input" placeholder="Rent Adjustment" />

          <button type="submit" className="col-span-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Save Purchase Invoice
          </button>
        </form>
      </div>
    </SidebarLayout>
  );
};

export default PurchaseInvoiceForm;
// import React, { useMemo, useState } from "react";
// import SidebarLayout from "../layout/SidebarLayout.jsx";
// import Notification from "../Notification.jsx";
// import API_BASE_URL from "../../../config/API_BASE_URL.js";

// export default function PurchaseInvoiceForm() {
//   const today = new Date().toISOString().split("T")[0];

//   const [form, setForm] = useState({
//     date: today,
//     ledgerReference: "",
//     vehicleNumber: "",
//     builtyNumber: "",
//     vendorName: "",
//     brokerName: "",
//     emptyVehicleWeight: "",
//     filledVehicleWeight: "",
//     bagWeight: "",
//     moisturePercent: "",
//     rate40kg: ""
//   });

//   const [errors, setErrors] = useState({});
//   const [notification, setNotification] = useState({ message: "", type: "info" });

//   /* ================= DERIVED CALCULATIONS ================= */
//   const calculations = useMemo(() => {
//     const empty = Number(form.emptyVehicleWeight) || 0;
//     const filled = Number(form.filledVehicleWeight) || 0;
//     const bag = Number(form.bagWeight) || 0;
//     const moisture = Number(form.moisturePercent) || 0;
//     const rate = Number(form.rate40kg) || 0;

//     const gross = filled - empty;
//     const finalWeight = gross - bag;
//     const moistureAdj = (finalWeight * moisture) / 100;
//     const netWeight = finalWeight - moistureAdj;
//     const net40 = netWeight / 40;
//     const amount = net40 * rate;

//     return {
//       gross,
//       finalWeight,
//       moistureAdj,
//       netWeight,
//       net40,
//       amount
//     };
//   }, [
//     form.emptyVehicleWeight,
//     form.filledVehicleWeight,
//     form.bagWeight,
//     form.moisturePercent,
//     form.rate40kg
//   ]);

//   /* ================= HANDLERS ================= */
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((p) => ({ ...p, [name]: value }));
//     setErrors((p) => ({ ...p, [name]: "" }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.date) e.date = "Required";
//     if (!form.vehicleNumber) e.vehicleNumber = "Required";
//     if (!form.vendorName) e.vendorName = "Required";
//     if (!form.builtyNumber) e.builtyNumber = "Required";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await fetch(`${API_BASE_URL}/purchase-invoice/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, ...calculations })
//       });

//       const data = await res.json();

//       setNotification({
//         message: data.success
//           ? "Purchase invoice saved successfully"
//           : "Failed to save invoice",
//         type: data.success ? "success" : "error"
//       });
//     } catch {
//       setNotification({ message: "Server error", type: "error" });
//     }
//   };

//   /* ================= FIELD ================= */
//   const Field = ({ label, name, value, readOnly, type = "text" }) => (
//     <div className="space-y-1">
//       <label className="text-xs font-semibold text-gray-600">{label}</label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={handleChange}
//         readOnly={readOnly}
//         className={`w-full px-3 py-2 rounded-lg border text-sm
//           ${readOnly ? "bg-gray-100 text-gray-700" : "bg-white"}
//           ${errors[name] ? "border-red-400" : "border-gray-300"}
//           focus:ring-2 focus:ring-blue-500 focus:outline-none`}
//       />
//       {errors[name] && <p className="text-xs text-red-500">{errors[name]}</p>}
//     </div>
//   );

//   return (
//     <SidebarLayout>
//       <Notification {...notification} onClose={() => setNotification({ message: "", type: "info" })} />

//       <form onSubmit={handleSubmit} className="max-w-7xl mx-auto pb-40 space-y-8">

//         {/* BASIC INFO */}
//         <section className="bg-white rounded-2xl shadow p-6">
//           <h3 className="font-bold text-lg mb-6">Basic Information</h3>
//           <div className="grid md:grid-cols-4 gap-5">
//             <Field label="Date" name="date" value={form.date} type="date" />
//             <Field label="Ledger Reference" name="ledgerReference" value={form.ledgerReference} />
//             <Field label="Vehicle Number" name="vehicleNumber" value={form.vehicleNumber} />
//             <Field label="Builty Number" name="builtyNumber" value={form.builtyNumber} />
//             <Field label="Vendor Name" name="vendorName" value={form.vendorName} />
//             <Field label="Broker Name" name="brokerName" value={form.brokerName} />
//           </div>
//         </section>

//         {/* WEIGHTS */}
//         <section className="bg-blue-50 rounded-2xl p-6">
//           <h3 className="font-bold text-lg mb-6">Vehicle Weights</h3>
//           <div className="grid md:grid-cols-5 gap-5">
//             <Field label="Empty Weight" name="emptyVehicleWeight" value={form.emptyVehicleWeight} />
//             <Field label="Filled Weight" name="filledVehicleWeight" value={form.filledVehicleWeight} />
//             <Field label="Gross Weight" value={calculations.gross} readOnly />
//             <Field label="Bag Weight" name="bagWeight" value={form.bagWeight} />
//             <Field label="Final Weight" value={calculations.finalWeight} readOnly />
//           </div>
//         </section>

//         {/* AMOUNT */}
//         <section className="bg-green-50 rounded-2xl p-6">
//           <h3 className="font-bold text-lg mb-6">Amount</h3>
//           <div className="grid md:grid-cols-4 gap-5">
//             <Field label="Rate / 40kg" name="rate40kg" value={form.rate40kg} />
//             <Field label="Total Amount" value={calculations.amount} readOnly />
//           </div>
//         </section>

//         {/* STICKY FOOTER */}
//         <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t shadow-lg z-40">
//           <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//             <div className="text-sm">
//               <p>Net Weight: <strong>{calculations.netWeight}</strong></p>
//               <p>Total: <strong className="text-green-700">₨ {calculations.amount}</strong></p>
//             </div>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
//               Save Purchase Invoice
//             </button>
//           </div>
//         </div>

//       </form>
//     </SidebarLayout>
//   );
// }

