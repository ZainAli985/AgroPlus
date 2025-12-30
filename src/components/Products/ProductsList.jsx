import React, { useEffect, useState } from "react";
import { FiBox, FiSearch } from "react-icons/fi";
import SidebarLayout from "../layout/SidebarLayout.jsx";
import API_BASE_URL from "../../../config/API_BASE_URL.js";

const TYPE_OPTIONS = {
  Peddy: ["Brown", "White"],
  Rice: ["Saila", "Basmati", "Steamed"],
  Polish: ["White"],
  Phukar: ["Brown"],
};

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [subType, setSubType] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
          setFiltered(data.products);
        }
      });
  }, []);

  useEffect(() => {
    let data = products;

    if (search) {
      data = data.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type) {
      data = data.filter((p) => p.type === type);
    }

    if (subType) {
      data = data.filter((p) => p.subType === subType);
    }

    setFiltered(data);
  }, [search, type, subType, products]);

  return (
    <SidebarLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiBox className="text-blue-600" />
          Products
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow border p-5 mb-6">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Search
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Product name..."
                className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Type
            </label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setSubType("");
              }}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Types</option>
              {Object.keys(TYPE_OPTIONS).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Type */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Sub Type
            </label>
            <select
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              disabled={!type}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                !type ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <option value="">All Sub Types</option>
              {type &&
                TYPE_OPTIONS[type].map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
            </select>
          </div>

          {/* Count */}
          <div className="flex items-end">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold">{filtered.length}</span>{" "}
              products
            </p>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Sub Type</th>
              <th className="px-4 py-3 text-right">Created</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-6 text-center text-gray-400"
                >
                  No products found
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr
                key={p._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">
                  {p.productName}
                </td>
                <td className="px-4 py-3">{p.type}</td>
                <td className="px-4 py-3">{p.subType}</td>
                <td className="px-4 py-3 text-right text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarLayout>
  );
}
