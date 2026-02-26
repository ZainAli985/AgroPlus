import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import Notification from "../Notification.jsx";

const inputBase =
    "w-full px-3 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm";
const inputReadOnly = "bg-gray-50 border-gray-200 text-gray-700 cursor-default";

function Field({ label, name, value, onChange, readOnly, type = "text", placeholder }) {
    return (
        <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</label>
            <input
                type={type}
                name={name}
                value={value ?? ""}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`${inputBase} ${readOnly ? inputReadOnly : ""}`}
            />
        </div>
    );
}

export default function WeightBridgeForm() {
    const token = localStorage.getItem("token");
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        date: new Date().toLocaleString(),
        productId: "",
        vendorName: "",
        rate: "",
        vehicleType: "",
        mode: "Auto",
        firstWeight: "",
        firstWeightDriver: "With",
        secondWeight: "",
        secondWeightDriver: "With",
        netWeight: 0,
        netWeightMaund: 0,
        netWeightTon: 0,
    });

    const [notification, setNotification] = useState({ message: "", type: "info" });

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await authFetch(`${API_BASE_URL}/products`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json(); // ✅ MUST parse

                if (data.success) {
                    setProducts(data.products);
                } else {
                    console.error("Failed to fetch products:", data.message);
                }
            } catch (error) {
                console.error("Error loading products:", error);
            }
        };

        fetchProducts();
    }, []);
    // Auto calculate net weight
    useEffect(() => {
        const first = Number(form.firstWeight) || 0;
        const second = Number(form.secondWeight) || 0;
        const net = first - second;
        setForm(prev => ({
            ...prev,
            netWeight: net,
            netWeightMaund: +(net / 40).toFixed(2),
            netWeightTon: +(net / 1000).toFixed(2),
        }));
    }, [form.firstWeight, form.secondWeight]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/weight-bridge`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    ...form,
                    firstWeightWithDriver: form.firstWeightDriver === "With",
                    secondWeightWithDriver: form.secondWeightDriver === "With",
                }),
            });

            const data = await response.json();

            console.log("Weight bridge response:", data);

            if (data.success) {
                setNotification({
                    message: "Weight bridge entry saved!",
                    type: "success",
                });
            } else {
                setNotification({
                    message: data.message || "Something went wrong",
                    type: "error",
                });
            }
        } catch (err) {
            console.error(err);
            setNotification({ message: "Server error", type: "error" });
        }
    };

    return (
        <SidebarLayout>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification({ message: "", type: "info" })}
            />
            <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Weight Bridge Entry</h1>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                    {/* ===== Basic Info ===== */}
                    <section className="space-y-4 border border-gray-200 p-4 rounded-md bg-gray-50">
                        <h2 className="text-sm font-bold uppercase text-gray-600">Basic Information</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <Field label="Date & Time" name="date" value={form.date} readOnly />
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-gray-600 uppercase">Product</label>
                                <select name="productId" value={form.productId} onChange={handleChange} className={inputBase} required>
                                    <option value="">Select Product</option>
                                    {products.map(p => <option key={p._id} value={p._id}>{p.productName}</option>)}
                                </select>
                            </div>
                            <Field label="Vendor Name" name="vendorName" value={form.vendorName} onChange={handleChange} />
                            <Field label="Rate (Rs.)" name="rate" value={form.rate} onChange={handleChange} type="number" />
                            <div className="space-y-1">
                                <label className="block text-xs font-semibold text-gray-600 uppercase">Vehicle Type</label>
                                <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className={inputBase}>
                                    <option value="">Select Vehicle</option>
                                    <option value="Truck">Truck</option>
                                    <option value="Pickup">Pickup</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-4 mt-2">
                                <label className="text-xs font-semibold text-gray-600 uppercase">Mode:</label>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="mode" value="Auto" checked={form.mode === "Auto"} onChange={handleChange} /> Auto
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="mode" value="Manual" checked={form.mode === "Manual"} onChange={handleChange} /> Manual
                                </label>
                            </div>
                        </div>
                    </section>

                    {/* ===== Weights ===== */}
                    <section className="space-y-4 border border-gray-200 p-4 rounded-md bg-gray-50">
                        <h2 className="text-sm font-bold uppercase text-gray-600">Weights</h2>

                        {/* First Weight */}
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                            <Field label="First Weight (kg)" name="firstWeight" value={form.firstWeight} onChange={handleChange} type="number" />
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-gray-600">Driver:</span>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="firstWeightDriver" value="With" checked={form.firstWeightDriver === "With"} onChange={handleChange} /> With
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="firstWeightDriver" value="Without" checked={form.firstWeightDriver === "Without"} onChange={handleChange} /> Without
                                </label>
                            </div>
                        </div>

                        {/* Second Weight */}
                        <div className="grid md:grid-cols-3 gap-4 items-center">
                            <Field label="Second Weight (kg)" name="secondWeight" value={form.secondWeight} onChange={handleChange} type="number" />
                            <div className="flex items-center space-x-2">
                                <span className="text-xs font-semibold text-gray-600">Driver:</span>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="secondWeightDriver" value="With" checked={form.secondWeightDriver === "With"} onChange={handleChange} /> With
                                </label>
                                <label className="flex items-center space-x-1">
                                    <input type="radio" name="secondWeightDriver" value="Without" checked={form.secondWeightDriver === "Without"} onChange={handleChange} /> Without
                                </label>
                            </div>
                        </div>

                        {/* Net Weight */}
                        <div className="grid md:grid-cols-3 gap-4">
                            <Field label="Net Weight (kg)" name="netWeight" value={form.netWeight} readOnly />
                            <Field label="Net Weight (Maund)" name="netWeightMaund" value={form.netWeightMaund} readOnly />
                            <Field label="Net Weight (Ton)" name="netWeightTon" value={form.netWeightTon} readOnly />
                        </div>
                    </section>

                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 mt-2">
                        Save Entry
                    </button>
                </form>
            </div>
        </SidebarLayout>
    );
}