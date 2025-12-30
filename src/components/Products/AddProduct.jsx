import React, { useState } from "react";
import { FiBox } from "react-icons/fi";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";
import Notification from "../../components/Notification.jsx";

const TYPE_OPTIONS = {
  Peddy: ["Brown", "White"],
  Rice: ["Saila", "Basmati", "Steamed"],
  Polish: ["White"],
  Phukar: ["Brown"],
};

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  const [notification, setNotification] = useState({
    message: "",
    type: "info",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productName, type, subType }),
      });

      const data = await res.json();

      if (data.success) {
        setNotification({
          message: "Product created successfully",
          type: "success",
        });

        setProductName("");
        setType("");
        setSubType("");
      } else {
        setNotification({
          message: data.message || "Failed to create product",
          type: "error",
        });
      }
    } catch (err) {
      setNotification({
        message: "Server error. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <SidebarLayout>
      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "info" })}
      />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiBox className="text-blue-600" />
          Add New Product
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Create A New Product
        </p>
      </div>

      {/* Form Card */}
      <div className="max-w-xl mx-auto mt-12">

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
        >
          {/* Card Header */}
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-700">
              Product Information
            </h2>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Eeri 06"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setSubType("");
                }}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Type</option>
                {Object.keys(TYPE_OPTIONS).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub Type
              </label>
              <select
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  !type ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                required
                disabled={!type}
              >
                <option value="">Select Sub Type</option>
                {type &&
                  TYPE_OPTIONS[type].map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </SidebarLayout>
  );
}
