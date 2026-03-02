import React, { useEffect, useState } from "react";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import { authFetch } from "../../utils/authFetch.js";
import Notification from "../Notification.jsx";

export default function ViewGeneralEntries() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "info" });

  const safeJsonParse = async (res) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return null;
    }
  };

  const fetchEntries = async () => {
    try {
      const res = await authFetch(`${API_BASE_URL}/get-journal-entries`);
      const data = await safeJsonParse(res);

      if (!res.ok) throw new Error(data?.message || "Failed to fetch entries");
      setEntries(data);
    } catch (err) {
      setNotification({ message: err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const safeDate = (val) => {
    if (!val) return "-";
    const d = new Date(val);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  };

  return (
    <SidebarLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">General Journal Entries</h1>

        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        ) : entries.length === 0 ? (
          <p className="text-center text-gray-600 py-10">No entries found.</p>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white shadow rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">{safeDate(entry.entryDate)}</h2>
                  <p className="text-gray-600">
                    Opening Balance: <span className="font-semibold">{entry.openingBalance?.toLocaleString() || 0}</span>
                  </p>
                </div>

                <table className="w-full border-collapse border border-gray-200 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-3 py-2 text-left">Account</th>
                      <th className="border px-3 py-2 text-left">Description</th>
                      <th className="border px-3 py-2 text-right">Debit</th>
                      <th className="border px-3 py-2 text-right">Credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Debit row */}
                    <tr className="bg-gray-50 font-medium">
                      <td className="border px-3 py-2">{entry.debitAccount?.accountName || "-"}</td>
                      <td className="border px-3 py-2">{entry.debitLineDesc || "-"}</td>
                      <td className="border px-3 py-2 text-right">{entry.debitAmount?.toLocaleString() || 0}</td>
                      <td className="border px-3 py-2 text-right">-</td>
                    </tr>

                    {/* Credit rows */}
                    {entry.creditEntries?.map((credit, i) => (
                      <tr key={i}>
                        <td className="border px-3 py-2 pl-6">{credit.account?.accountName || "-"}</td>
                        <td className="border px-3 py-2">{credit.description || "-"}</td>
                        <td className="border px-3 py-2 text-right">-</td>
                        <td className="border px-3 py-2 text-right">{credit.amount?.toLocaleString() || 0}</td>
                      </tr>
                    ))}

                    {/* Optional narration */}
                    {entry.comments && (
                      <tr>
                        <td colSpan={4} className="border px-3 py-2 italic text-gray-600 bg-gray-50">
                          <span className="font-semibold">Comments:</span> {entry.comments}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "info" })}
        />
      </div>
    </SidebarLayout>
  );
}