import React, { useEffect, useState } from "react";
import { FiBox, FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
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

  const [editingProduct, setEditingProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    productName: "",
    type: "",
    subType: "",
  });

  // Fetch products
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

  // Filters
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

  // Open edit modal
  const openEdit = (product) => {
    setEditingProduct(product);
    setEditForm({
      productName: product.productName,
      type: product.type,
      subType: product.subType,
    });
  };

  // Update product
  const updateProduct = async () => {
    if (!editForm.productName || !editForm.type || !editForm.subType) {
      alert("All fields are required");
      return;
    }

    const res = await fetch(
      `${API_BASE_URL}/products/${editingProduct._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message || "Update failed");
      return;
    }

    const updated = products.map((p) =>
      p._id === data.product._id ? data.product : p
    );

    setProducts(updated);
    setFiltered(updated);
    setEditingProduct(null);
  };


  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
      setFiltered(updated);
    }
  };

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
            <label className="block text-sm font-medium mb-1">Search</label>
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
            <label className="block text-sm font-medium mb-1">Type</label>
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
            <label className="block text-sm font-medium mb-1">Sub Type</label>
            <select
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
              disabled={!type}
              className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${!type ? "bg-gray-100 cursor-not-allowed" : ""
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
              Showing <span className="font-semibold">{filtered.length}</span>{" "}
              products
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 border-b text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Sub Type</th>
              <th className="px-4 py-3 text-right">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            )}

            {filtered.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium">{p.productName}</td>
                <td className="px-4 py-3">{p.type}</td>
                <td className="px-4 py-3">{p.subType}</td>
                <td className="px-4 py-3 text-right text-gray-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right flex justify-end gap-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-lg font-semibold">Edit Product</h3>

            <input
              value={editForm.productName}
              onChange={(e) =>
                setEditForm({ ...editForm, productName: e.target.value })
              }
              className="input"
              placeholder="Product Name"
            />

            <select
              value={editForm.type}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  type: e.target.value,
                  subType: "",
                })
              }
              className="input"
            >
              {Object.keys(TYPE_OPTIONS).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <select
              value={editForm.subType}
              onChange={(e) =>
                setEditForm({ ...editForm, subType: e.target.value })
              }
              className="input"
            >
              {TYPE_OPTIONS[editForm.type]?.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 pt-3">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={updateProduct}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
