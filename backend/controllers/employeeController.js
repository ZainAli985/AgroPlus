// controllers/employeeController.js
import bcrypt      from "bcryptjs";
import { getModels } from "../config/millDB.js";
import {
  uploadToCloudinary, deleteFromCloudinary,
  extractPublicId,   UPLOAD_CONTEXT,
} from "../utils/cloudinaryUpload.js";

const generateEmployeeId = (n) => "EMP-" + (n + 1).toString().padStart(4, "0");
const rawCnic      = (c) => c.replace(/-/g, "").trim();
const isValidCNIC  = (cnic)  => /^\d{13}$/.test(rawCnic(cnic));
const isValidPhone = (phone) => /^\+92[3]\d{9}$/.test(phone);

export const createEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    let { firstName, lastName, cnic, address, mobile, email, role, allowedRoutes, password } = req.body;

    firstName = firstName?.trim();
    lastName  = lastName?.trim();
    cnic      = rawCnic(cnic || "");
    mobile    = mobile?.trim();
    email     = email?.trim();
    role      = role?.trim();

    if (typeof allowedRoutes === "string") {
      try { allowedRoutes = JSON.parse(allowedRoutes); } catch { allowedRoutes = []; }
    }
    if (!Array.isArray(allowedRoutes)) allowedRoutes = [];

    if (!firstName || !lastName || !cnic || !email || !role || !password)
      return res.status(400).json({ message: "Required fields are missing" });
    if (!isValidCNIC(cnic))             return res.status(400).json({ message: "Invalid CNIC" });
    if (mobile && !isValidPhone(mobile)) return res.status(400).json({ message: "Invalid mobile number" });
    if (password.length < 8)            return res.status(400).json({ message: "Password must be at least 8 characters" });

    const existingCnic  = await Employee.findOne({ cnic });
    if (existingCnic)  return res.status(400).json({ message: "An employee with this CNIC already exists" });
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "An employee with this email already exists" });

    const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastEmployee?.employeeId) lastNum = parseInt(lastEmployee.employeeId.split("-")[1]);
    const employeeId    = generateEmployeeId(lastNum);
    const hashedPassword = await bcrypt.hash(password, 10);

    // ── Upload employee documents to Cloudinary: agro-plus/mills/{millId}/employees/
    let documents = [];
    if (req.files?.length) {
      const uploadResults = await Promise.allSettled(
        req.files.map(f =>
          uploadToCloudinary(
            f.buffer,
            UPLOAD_CONTEXT.MILL_EMPLOYEE,
            req.millId,
            f.originalname
          ).then(result => ({
            name:     f.originalname,
            fileUrl:  result.url,
            publicId: result.publicId,
          }))
        )
      );
      documents = uploadResults
        .filter(r => r.status === "fulfilled")
        .map(r => r.value);
      // Log any failures without blocking the request
      uploadResults.filter(r => r.status === "rejected").forEach(r =>
        console.error("Employee doc upload failed:", r.reason?.message)
      );
    }

    const employee = new Employee({
      employeeId, firstName, lastName, cnic, address, mobile, email, role,
      allowedRoutes, password: hashedPassword, documents,
    });
    await employee.save();

    // Auto-create Employee account (Liabilities > Current Liabilities)
    try {
      const { Account } = getModels(req.millId);
      const lastAcc = await Account.findOne().sort({ createdAt: -1 });
      const lastN   = lastAcc?.autoAccountId ? parseInt(lastAcc.autoAccountId.split("-")[1]) || 0 : 0;
      await Account.create({
        autoAccountId:  "ACC-" + (lastN + 1).toString().padStart(6, "0"),
        manualAccountId: "",
        accountType:    "Liabilities",
        subAccountType: "Current Liabilities",
        accountName:    `${firstName} ${lastName} — Employee`,
        LedgerRef:      "",
        category:       "Employee",
        totalDebit: 0, totalCredit: 0, balance: 0,
      });
    } catch (accErr) {
      console.warn("Employee account creation failed (non-fatal):", accErr.message);
    }

    res.status(201).json({ message: "Employee created successfully", employee });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employees = await Employee.find().select("-password").sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const updateEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const { firstName, lastName, cnic, address, mobile, email, role, allowedRoutes, password } = req.body;
    const updateFields = {};

    if (firstName)     updateFields.firstName = firstName.trim();
    if (lastName)      updateFields.lastName  = lastName.trim();
    if (address)       updateFields.address   = address.trim();
    if (email)         updateFields.email     = email.trim();
    if (role)          updateFields.role      = role.trim();
    if (allowedRoutes) updateFields.allowedRoutes = typeof allowedRoutes === "string" ? JSON.parse(allowedRoutes) : allowedRoutes;
    if (cnic) {
      const raw = rawCnic(cnic);
      if (!isValidCNIC(raw)) return res.status(400).json({ message: "Invalid CNIC" });
      updateFields.cnic = raw;
    }
    if (mobile) {
      if (!isValidPhone(mobile)) return res.status(400).json({ message: "Invalid mobile number" });
      updateFields.mobile = mobile;
    }
    if (password) {
      if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateFields, { new: true }).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee updated successfully", employee });
  } catch (error) { res.status(500).json({ message: "Server error" }); }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    // Clean up Cloudinary documents (fire-and-forget)
    if (employee.documents?.length) {
      employee.documents.forEach(doc => {
        if (doc.publicId) deleteFromCloudinary(doc.publicId, "raw").catch(() => {});
      });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    employee.isActive = !employee.isActive;
    await employee.save();
    res.json({ message: "Status updated", isActive: employee.isActive });
  } catch (error) { res.status(500).json({ message: error.message }); }
};