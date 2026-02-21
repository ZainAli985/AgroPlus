import React, { useEffect, useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";

export default function ViewEmployees() {
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editData, setEditData] = useState({});
  const [showModal, setShowModal] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      setEmployees(data);
      setFilteredEmployees(data);
    } catch {
      setNotificationMessage("Failed to load employees");
      setNotificationType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ================= FILTER ================= */

  useEffect(() => {
    let filtered = [...employees];

    if (search) {
      filtered = filtered.filter((emp) =>
        `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.username}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (roleFilter)
      filtered = filtered.filter((emp) => emp.role === roleFilter);

    if (statusFilter) {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((emp) => emp.isActive === isActive);
    }

    setFilteredEmployees(filtered);
  }, [search, roleFilter, statusFilter, employees]);

  /* ================= EDIT MODAL ================= */

  const openEditModal = (emp) => {
    setSelectedEmployee(emp);
    setEditData(emp);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    /* ===== MOBILE FORMAT (+92xxxxxxxxxx) ===== */
    if (name === "mobile") {
      let digits = value.replace(/\D/g, "");

      // Remove 92 if user types it
      if (digits.startsWith("92")) {
        digits = digits.slice(2);
      }

      // Limit to 10 digits after +92
      if (digits.length > 10) {
        digits = digits.slice(0, 10);
      }

      setEditData({
        ...editData,
        mobile: `+92${digits}`,
      });

      return;
    }

    /* ===== CNIC FORMAT (xxxxx-xxxxxxx-x) ===== */
    if (name === "cnic") {
      const digits = value.replace(/\D/g, "").slice(0, 13);

      let formatted = digits;

      if (digits.length > 5 && digits.length <= 12) {
        formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      }

      if (digits.length > 12) {
        formatted = `${digits.slice(0, 5)}-${digits.slice(
          5,
          12
        )}-${digits.slice(12)}`;
      }

      setEditData({
        ...editData,
        cnic: formatted,
      });

      return;
    }

    setEditData({ ...editData, [name]: value });
  };

  const updateEmployee = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/employees/${selectedEmployee._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setNotificationMessage("Employee updated successfully");
      setNotificationType("success");
      fetchEmployees();
      closeModal();
    } catch (err) {
      setNotificationMessage(err.message);
      setNotificationType("error");
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleRestrict = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/employees/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEmployees();
      setNotificationMessage("Employee status updated");
      setNotificationType("success");
    } catch {
      setNotificationMessage("Failed to update status");
      setNotificationType("error");
    }
  };

  /* ================= DELETE ================= */

  const confirmDelete = (id) => {
    setDeleteTargetId(id);
    setShowDeleteDialog(true);
  };

  const cancelDelete = () => {
    setDeleteTargetId(null);
    setShowDeleteDialog(false);
  };

  const deleteEmployee = async () => {
    try {
      await fetch(`${API_BASE_URL}/employees/${deleteTargetId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchEmployees();
      setNotificationMessage("Employee deleted");
      setNotificationType("success");
    } catch {
      setNotificationMessage("Delete failed");
      setNotificationType("error");
    }

    setShowDeleteDialog(false);
    setDeleteTargetId(null);
  };

  /* ================= FILE URL ================= */

  const getFileUrl = (filePath) => {
    if (!filePath) return "";
    const base = API_BASE_URL.replace("/api", "");
    return `${base}/${filePath.replace(/\\/g, "/")}`;
  };

  /* ================= UI ================= */

  return (
    <SidebarLayout>
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6">Employee Management</h2>

        {/* FILTERS */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search employee..."
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="input"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Accountant">Accountant</option>
            <option value="Worker">Worker</option>
          </select>

          <select
            className="input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setRoleFilter("");
              setStatusFilter("");
            }}
            className="bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Reset
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(6)].map((_, index) => (
                  <tr key={index} className="animate-pulse border-b">
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-40"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="p-3">
                      <div className="h-4 bg-gray-300 rounded w-28 mx-auto"></div>
                    </td>
                  </tr>
                ))
              ) : filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No employees found
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => (
                  <tr key={emp._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{emp.employeeId}</td>
                    <td className="p-3">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${emp.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {emp.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => toggleRestrict(emp._id)}
                        className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 text-sm"
                      >
                        {emp.isActive ? "Restrict" : "Enable"}
                      </button>

                      <button
                        onClick={() => openEditModal(emp)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => confirmDelete(emp._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= EDIT MODAL ================= */}
        {showModal && selectedEmployee && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-11/12 max-w-3xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

              <div className="grid md:grid-cols-2 gap-4">

                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    name="firstName"
                    value={editData.firstName || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    name="lastName"
                    value={editData.lastName || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    name="email"
                    value={editData.email || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    name="username"
                    value={editData.username || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-sm font-medium mb-1">Mobile</label>
                  <input
                    name="mobile"
                    value={editData.mobile || "+92"}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* CNIC */}
                <div>
                  <label className="block text-sm font-medium mb-1">CNIC</label>
                  <input
                    name="cnic"
                    value={editData.cnic || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    name="address"
                    value={editData.address || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                {/* 🔥 ROLE DROPDOWN */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={editData.role || ""}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Worker">Worker</option>
                  </select>
                </div>

              </div>

              {/* 🔥 ROUTE ACCESS */}
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Allowed Routes</h4>

                <div className="grid md:grid-cols-3 gap-3 max-h-60 overflow-y-auto border p-4 rounded-lg bg-gray-50">
                  {[
                    "/dashboard",
                    "/create-account",
                    "/view-accounts",
                    "/ledger",
                    "/general-entries",
                    "/products",
                    "/products/new",
                    "/add-invoice-purchase",
                    "/view-purchase-invoices",
                    "/add-invoice-sales",
                    "/view-sales-invoices",
                    "/stock-management",
                    "/trialbalance",
                    "/balancesheet",
                    "/incomestatement",
                  ].map((route) => (
                    <label key={route} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={editData.allowedRoutes?.includes(route)}
                        onChange={() => {
                          const updatedRoutes =
                            editData.allowedRoutes?.includes(route)
                              ? editData.allowedRoutes.filter((r) => r !== route)
                              : [...(editData.allowedRoutes || []), route];

                          setEditData({ ...editData, allowedRoutes: updatedRoutes });
                        }}
                      />
                      {route}
                    </label>
                  ))}
                </div>
              </div>
              {/* DOCUMENTS */}
              <div className="mt-6">
                <h4 className="font-semibold mb-2">Documents</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedEmployee.documents?.map((doc, idx) => {
                    const url = getFileUrl(doc.fileUrl);

                    return (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={url}
                          alt={doc.name}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300 hover:scale-105 hover:shadow-lg transition cursor-pointer"
                        />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={updateEmployee}
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= DELETE MODAL ================= */}
        {showDeleteDialog && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-80"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">
                Confirm Delete
              </h3>
              <p className="mb-4">
                Are you sure you want to delete this employee?
              </p>
              <div className="flex justify-between">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteEmployee}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Notification message={notificationMessage} type={notificationType} />
    </SidebarLayout>
  );
}