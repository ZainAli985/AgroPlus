import React, { useEffect, useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";

export default function ViewEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const [selectedEmployee, setSelectedEmployee] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const token = localStorage.getItem("token");

  /* ===============================
     FETCH EMPLOYEES
  ================================== */
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      setNotificationMessage("Failed to load employees");
      setNotificationType("error");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  /* ===============================
     FILTERING LOGIC
  ================================== */
  useEffect(() => {
    let filtered = [...employees];
    if (search) {
      filtered = filtered.filter((emp) =>
        `${emp.firstName} ${emp.lastName} ${emp.email} ${emp.username}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }
    if (roleFilter) filtered = filtered.filter((emp) => emp.role === roleFilter);
    if (statusFilter) {
      const isActive = statusFilter === "Active";
      filtered = filtered.filter((emp) => emp.isActive === isActive);
    }
    setFilteredEmployees(filtered);
  }, [search, roleFilter, statusFilter, employees]);

  /* ===============================
     RESTRICT / ENABLE EMPLOYEE
  ================================== */
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
    setTimeout(() => setNotificationMessage(""), 3000);
  };

  /* ===============================
     DELETE EMPLOYEE
  ================================== */
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
    setTimeout(() => setNotificationMessage(""), 3000);
  };

  /* ===============================
     OPEN DETAILS MODAL
  ================================== */
  const viewDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setShowModal(false);
  };

  /* ===============================
     FILE URL HELPER
  ================================== */
  const getFileUrl = (filePath) => {
    return `${API_BASE_URL}/${filePath.replace(/^\/?/, "")}`;
  };

  /* ===============================
     HANDLE OUTSIDE CLICK FOR MODAL
  ================================== */
  const modalClickHandler = (e) => {
    if (e.target.id === "modalOverlay") closeModal();
  };

  return (
    <SidebarLayout>
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Employee Management
        </h2>

        {/* FILTER SECTION */}
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
            className="bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Reset Filters
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
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
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((emp) => (
                  <tr
                    key={emp._id}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3">{emp.employeeId}</td>
                    <td className="p-3">
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.role}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          emp.isActive
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
                        onClick={() => viewDetails(emp)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                      >
                        View Details
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
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===============================
            EMPLOYEE DETAILS MODAL
        ================================== */}
        {showModal && selectedEmployee && (
          <div
            id="modalOverlay"
            onClick={modalClickHandler}
            className="fixed inset-0 flex items-center justify-center z-50 bg-transparent"
          >
            <div className="bg-white rounded-2xl w-11/12 max-w-3xl p-6 overflow-y-auto max-h-[90vh] shadow-xl border relative">
              {/* Cross button */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                onClick={closeModal}
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Employee Details
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>ID:</strong> {selectedEmployee.employeeId}
                </p>
                <p>
                  <strong>Name:</strong> {selectedEmployee.firstName} {selectedEmployee.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedEmployee.email}
                </p>
                <p>
                  <strong>Username:</strong> {selectedEmployee.username}
                </p>
                <p>
                  <strong>Role:</strong> {selectedEmployee.role}
                </p>
                <p>
                  <strong>Status:</strong> {selectedEmployee.isActive ? "Active" : "Inactive"}
                </p>
                <p>
                  <strong>Mobile:</strong> {selectedEmployee.mobile}
                </p>
                <p>
                  <strong>CNIC:</strong> {selectedEmployee.cnic}
                </p>
                <p>
                  <strong>Address:</strong> {selectedEmployee.address}
                </p>

                <div>
                  <strong>Documents:</strong>
                  <div className="flex flex-wrap mt-2 gap-3">
                    {selectedEmployee.documents && selectedEmployee.documents.length > 0 ? (
                      selectedEmployee.documents.map((doc, idx) => {
                        const url = getFileUrl(doc.fileUrl);
                        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(doc.name);
                        return isImage ? (
                          <img
                            key={idx}
                            src={url}
                            alt={doc.name}
                            className="w-24 h-24 object-cover rounded-lg border shadow-sm"
                          />
                        ) : (
                          <a
                            key={idx}
                            href={url}
                            download
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm shadow-sm"
                          >
                            {doc.name}
                          </a>
                        );
                      })
                    ) : (
                      <p className="text-gray-500">No documents uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===============================
            DELETE CONFIRMATION DIALOG
        ================================== */}
        {showDeleteDialog && (
          <div
            id="deleteOverlay"
            onClick={cancelDelete}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-20"
          >
            <div
              className="bg-white p-6 rounded-xl shadow-lg w-80 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
              <p className="mb-4">Are you sure you want to delete this employee?</p>
              <div className="flex justify-between">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteEmployee}
                  className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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