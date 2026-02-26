import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";

export default function WeightBridgeReport() {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authFetch(`${API_BASE_URL}/weight-bridge`);
                const data = await res.json(); // ✅ THIS WAS MISSING

                console.log("Weight bridge report data:", data);

                if (data.success) {
                    setEntries(data.entries);
                } else {
                    console.error("Failed:", data.message);
                }
            } catch (err) {
                console.error("Error loading report:", err);
            }
        };

        fetchData();
    }, []);

    return (
        <SidebarLayout>
            <h1 className="text-xl font-bold mb-4">Weight Bridge Report</h1>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-2 py-1">Date/Time</th>
                        <th className="border px-2 py-1">Product</th>
                        <th className="border px-2 py-1">Vendor</th>
                        <th className="border px-2 py-1">Vehicle</th>
                        <th className="border px-2 py-1">Mode</th>
                        <th className="border px-2 py-1">Net Weight (kg)</th>
                        <th className="border px-2 py-1">Maunds</th>
                        <th className="border px-2 py-1">Tons</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center py-4 text-gray-500">
                                No entries found
                            </td>
                        </tr>
                    )}
                    {entries.map(e => (
                        <tr key={e._id}>
                            <td className="border px-2 py-1">{new Date(e.date).toLocaleString()}</td>
                            <td className="border px-2 py-1">{e.productName}</td>
                            <td className="border px-2 py-1">{e.vendorName}</td>
                            <td className="border px-2 py-1">{e.vehicleType}</td>
                            <td className="border px-2 py-1">{e.mode}</td>
                            <td className="border px-2 py-1">{e.netWeight}</td>
                            <td className="border px-2 py-1">{e.netWeightMaund.toFixed(2)}</td>
                            <td className="border px-2 py-1">{e.netWeightTon.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SidebarLayout>
    );
}