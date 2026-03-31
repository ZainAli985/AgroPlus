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

// ── Shared: auto-create linked employee account ───────────────────────────────
async function ensureEmployeeAccount(millId, employeeId, displayName) {
  const { Account } = getModels(millId);
  const lastAcc = await Account.findOne().sort({ createdAt: -1 });
  const lastN   = lastAcc?.autoAccountId ? parseInt(lastAcc.autoAccountId.split("-")[1]) || 0 : 0;
  const acc = await Account.create({
    autoAccountId:  "ACC-" + (lastN + 1).toString().padStart(6, "0"),
    manualAccountId: "",
    accountType:    "Liabilities",
    subAccountType: "Current Liabilities",
    accountName:    `${displayName} — Employee`,
    LedgerRef:      "",
    category:       "Employee",
    linkedEmployeeId: employeeId,
    totalDebit: 0, totalCredit: 0, balance: 0,
  });
  return acc;
}

// ── Upload helper: upload array of files to Cloudinary ───────────────────────
async function uploadFiles(files, millId, prefix) {
  if (!files?.length) return [];
  const results = await Promise.allSettled(
    files.map(f =>
      uploadToCloudinary(f.buffer, UPLOAD_CONTEXT.MILL_EMPLOYEE, millId, `${prefix}_${f.originalname}`)
        .then(r => ({ name: f.originalname, fileUrl: r.url, publicId: r.publicId }))
    )
  );
  return results.filter(r => r.status === "fulfilled").map(r => r.value);
}

// ── CREATE ────────────────────────────────────────────────────────────────────
export const createEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    let {
      firstName, lastName, cnic, address, mobile, email,
      role, allowedRoutes, password, notes, isStandard,
    } = req.body;

    firstName  = firstName?.trim();
    lastName   = lastName?.trim();
    cnic       = rawCnic(cnic || "");
    mobile     = mobile?.trim();
    email      = email?.trim();
    role       = role?.trim();
    notes      = notes?.trim() || "";
    isStandard = isStandard === "true" || isStandard === true || role === "Standard";

    if (typeof allowedRoutes === "string") {
      try { allowedRoutes = JSON.parse(allowedRoutes); } catch { allowedRoutes = []; }
    }
    if (!Array.isArray(allowedRoutes)) allowedRoutes = [];

    // Required for all employees
    if (!firstName || !lastName || !cnic || !email || !role)
      return res.status(400).json({ message: "First name, last name, CNIC, email and role are required." });
    if (!isValidCNIC(cnic))
      return res.status(400).json({ message: "Invalid CNIC — must be 13 digits." });
    if (mobile && !isValidPhone(mobile))
      return res.status(400).json({ message: "Invalid mobile number — use +923XXXXXXXXX format." });

    // Standard employees don't need a password
    if (!isStandard) {
      if (!password || password.length < 8)
        return res.status(400).json({ message: "Password must be at least 8 characters." });
    }

    // Uniqueness checks
    if (await Employee.findOne({ cnic }))
      return res.status(400).json({ message: "An employee with this CNIC already exists." });
    if (await Employee.findOne({ email }))
      return res.status(400).json({ message: "An employee with this email already exists." });

    // Employee ID
    const last   = await Employee.findOne().sort({ createdAt: -1 });
    const lastNum = last?.employeeId ? parseInt(last.employeeId.split("-")[1]) || 0 : 0;
    const employeeId = generateEmployeeId(lastNum);

    // Hash password only for non-standard employees
    const hashedPassword = (!isStandard && password)
      ? await bcrypt.hash(password, 10)
      : "";

    // ── Upload documents ──────────────────────────────────────────────────────
    // Files are sent as: professionalDocs[], profilePic (single), supportingDocs[]
    const professionalDocs = await uploadFiles(req.files?.professionalDocs || [], req.millId, "prof");
    const supportingDocs   = await uploadFiles(req.files?.supportingDocs   || [], req.millId, "supp");

    let profilePicUrl = "";
    if (req.files?.profilePic?.[0]) {
      try {
        const r = await uploadToCloudinary(
          req.files.profilePic[0].buffer,
          UPLOAD_CONTEXT.MILL_EMPLOYEE, req.millId,
          `pfp_${employeeId}`,
          { width: 400, height: 400, crop: "fill", gravity: "face" }
        );
        profilePicUrl = r.url;
      } catch (e) { console.warn("Profile pic upload failed:", e.message); }
    }

    const employee = new Employee({
      employeeId, firstName, lastName, cnic, address, mobile, email, role,
      isStandard,
      notes: isStandard ? notes : "",
      allowedRoutes: isStandard ? [] : allowedRoutes,
      password: hashedPassword,
      profilePicUrl,
      professionalDocs,
      supportingDocs,
      documents: [],  // keep legacy field empty (use typed arrays above)
    });
    await employee.save();

    // Auto-create employee ledger account
    try {
      const acc = await ensureEmployeeAccount(req.millId, employee._id, `${firstName} ${lastName}`);
      employee.linkedAccountId = acc._id;
      await employee.save();
    } catch (e) {
      console.warn("Employee account creation failed (non-fatal):", e.message);
    }

    const safe = employee.toObject();
    delete safe.password;
    res.status(201).json({ message: "Employee created successfully.", employee: safe });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ── READ ALL ──────────────────────────────────────────────────────────────────
export const getEmployees = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employees = await Employee.find()
      .select("-password")
      .populate("linkedAccountId", "accountName balance autoAccountId")
      .sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// ── READ ONE ──────────────────────────────────────────────────────────────────
export const getEmployeeById = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id)
      .select("-password")
      .populate("linkedAccountId", "accountName balance autoAccountId");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// ── UPDATE ────────────────────────────────────────────────────────────────────
export const updateEmployee = async (req, res) => {
  try {
    const { Employee, Account } = getModels(req.millId);
    const {
      firstName, lastName, cnic, address, mobile, email,
      role, allowedRoutes, password, notes,
    } = req.body;

    const existing = await Employee.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Employee not found" });

    const updateFields = {};
    if (firstName !== undefined) updateFields.firstName = firstName.trim();
    if (lastName  !== undefined) updateFields.lastName  = lastName.trim();
    if (address   !== undefined) updateFields.address   = address.trim();
    if (email     !== undefined) updateFields.email     = email.trim();
    if (role      !== undefined) {
      updateFields.role       = role.trim();
      updateFields.isStandard = role === "Standard";
    }
    if (notes !== undefined)         updateFields.notes         = notes.trim();
    if (allowedRoutes !== undefined) updateFields.allowedRoutes = typeof allowedRoutes === "string" ? JSON.parse(allowedRoutes) : allowedRoutes;

    if (cnic !== undefined) {
      const raw = rawCnic(cnic);
      if (!isValidCNIC(raw)) return res.status(400).json({ message: "Invalid CNIC" });
      updateFields.cnic = raw;
    }
    if (mobile !== undefined && mobile) {
      if (!isValidPhone(mobile)) return res.status(400).json({ message: "Invalid mobile number" });
      updateFields.mobile = mobile;
    }
    if (password && !existing.isStandard) {
      if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });
      updateFields.password = await bcrypt.hash(password, 10);
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updateFields, { new: true }).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Sync linked account name if name changed
    if ((firstName !== undefined || lastName !== undefined) && existing.linkedAccountId) {
      const newFirst = firstName?.trim() || existing.firstName;
      const newLast  = lastName?.trim()  || existing.lastName;
      await Account.findByIdAndUpdate(existing.linkedAccountId, {
        accountName: `${newFirst} ${newLast} — Employee`,
      });
    }

    res.json({ message: "Employee updated successfully.", employee });
  } catch (error) {
    console.error("Update Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ── DELETE ────────────────────────────────────────────────────────────────────
export const deleteEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    // Clean up Cloudinary docs (fire-and-forget)
    for (const doc of [...(employee.professionalDocs||[]), ...(employee.supportingDocs||[]), ...(employee.documents||[])]) {
      if (doc.publicId) deleteFromCloudinary(doc.publicId).catch(() => {});
    }
    if (employee.profilePicUrl) deleteFromCloudinary(extractPublicId(employee.profilePicUrl)).catch(() => {});
    res.json({ message: "Employee deleted successfully." });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// ── TOGGLE STATUS ─────────────────────────────────────────────────────────────
export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    employee.isActive = !employee.isActive;
    await employee.save();
    res.json({ message: "Status updated.", isActive: employee.isActive });
  } catch (error) { res.status(500).json({ message: error.message }); }
};