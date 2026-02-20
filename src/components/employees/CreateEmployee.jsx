import React, { useState } from "react";
import SidebarLayout from "../../components/layout/SidebarLayout";
import API_BASE_URL from "../../../config/API_BASE_URL";
import Notification from "../../components/Notification";

export default function CreateEmployee() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    cnic: "",
    address: "",
    mobile: "+92",
    email: "",
    role: "",
    username: "",
    password: "",
    allowedRoutes: [],
  });

  const [documents, setDocuments] = useState([]);
  const [documentPreviews, setDocumentPreviews] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  const routesList = [
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
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // CNIC auto-format: xxxxx-xxxxxxx-x
    if (name === "cnic") {
      const digits = value.replace(/\D/g, "").slice(0, 13); // max 13 digits
      let formatted = digits;
      if (digits.length > 5 && digits.length <= 12)
        formatted = `${digits.slice(0, 5)}-${digits.slice(5)}`;
      if (digits.length > 12)
        formatted = `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
      setFormData({ ...formData, cnic: formatted });
      return;
    }

    // Mobile: ensure +92 prefix
    if (name === "mobile") {
      let digits = value.replace(/\D/g, ""); // remove non-digits
      if (digits.startsWith("92")) digits = digits.slice(2); // remove leading 92 if user types it
      if (digits.length > 10) digits = digits.slice(0, 10); // max 10 digits after country code
      setFormData({ ...formData, mobile: `+92${digits}` });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleRouteToggle = (route) => {
    const updatedRoutes = formData.allowedRoutes.includes(route)
      ? formData.allowedRoutes.filter((r) => r !== route)
      : [...formData.allowedRoutes, route];
    setFormData({ ...formData, allowedRoutes: updatedRoutes });
  };

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(files);

    // Previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setDocumentPreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate CNIC length
    const cnicDigits = formData.cnic.replace(/\D/g, "");
    if (cnicDigits.length !== 13) {
      setNotificationMessage("CNIC must be exactly 13 digits");
      setNotificationType("error");
      return;
    }

    // Validate mobile
    const mobileDigits = formData.mobile.replace(/\D/g, "").slice(2);
    if (mobileDigits.length !== 10) {
      setNotificationMessage("Mobile number must be 10 digits after +92");
      setNotificationType("error");
      return;
    }

    const token = localStorage.getItem("token");
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "allowedRoutes") data.append(key, JSON.stringify(formData[key]));
      else data.append(key, formData[key]);
    });

    documents.forEach((file) => data.append("documents", file));

    try {
      const res = await fetch(`${API_BASE_URL}/employees`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });
      const result = await res.json();

      if (res.ok) {
        setNotificationMessage("Employee Created Successfully");
        setNotificationType("success");
        setFormData({
          firstName: "",
          lastName: "",
          cnic: "",
          address: "",
          mobile: "+92",
          email: "",
          role: "",
          username: "",
          password: "",
          allowedRoutes: [],
        });
        setDocuments([]);
        setDocumentPreviews([]);
      } else {
        setNotificationMessage(result.message);
        setNotificationType("error");
      }
    } catch (error) {
      setNotificationMessage("Server Error");
      setNotificationType("error");
    }

    setTimeout(() => setNotificationMessage(""), 3000);
  };

  return (
    <SidebarLayout>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Create New Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="input"
              required
            />
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="input"
              required
            />
            <input
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              placeholder="CNIC (xxxxx-xxxxxxx-x)"
              className="input"
              required
            />
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile (+92xxxxxxxxxx)"
              className="input"
              required
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="input"
              required
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="input"
            />
          </div>

          {/* Role */}
          <div>
            <label className="font-semibold block mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select Role</option>
              <option value="Accountant">Accountant</option>
              <option value="Worker">Worker</option>
            </select>
          </div>

          {/* Username / Password */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="input"
              required
            />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="input"
              required
            />
          </div>

          {/* Allowed Routes */}
          <div>
            <label className="font-semibold block mb-3">
              Allowed Routes
            </label>
            <div className="grid md:grid-cols-3 gap-3 max-h-64 overflow-y-auto border p-4 rounded-lg">
              {routesList.map((route) => (
                <label key={route} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.allowedRoutes.includes(route)}
                    onChange={() => handleRouteToggle(route)}
                  />
                  <span className="text-sm">{route}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div>
            <label className="font-semibold block mb-2">
              Upload Documents
            </label>
            <input
              type="file"
              multiple
              onChange={handleFilesChange}
              className="input"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {documentPreviews.map((src, index) => (
                <div key={index} className="w-16 h-16 border p-1 rounded overflow-hidden">
                  <img src={src} alt={`preview-${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Create Employee
          </button>
        </form>
      </div>

      <Notification message={notificationMessage} type={notificationType} />
    </SidebarLayout>
  );
}