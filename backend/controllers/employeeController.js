// controllers/employeeController.js
// Auth change: employees no longer have a username.
// CNIC (raw 13 digits) is the unique login identifier.
import bcrypt from "bcryptjs";
import { getModels } from "../config/millDB.js";

const generateEmployeeId = (n) => "EMP-" + (n + 1).toString().padStart(4, "0");
const rawCnic   = (c) => c.replace(/-/g, "").trim();
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

    if (!firstName || !lastName || !cnic || !email || !role || !password) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    if (!isValidCNIC(cnic))                   return res.status(400).json({ message: "Invalid CNIC" });
    if (mobile && !isValidPhone(mobile))       return res.status(400).json({ message: "Invalid mobile number" });
    if (password.length < 8)                   return res.status(400).json({ message: "Password must be at least 8 characters" });

    // Check CNIC uniqueness in this mill
    const existingCnic = await Employee.findOne({ cnic });
    if (existingCnic) return res.status(400).json({ message: "An employee with this CNIC already exists" });

    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "An employee with this email already exists" });

    const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastEmployee?.employeeId) lastNum = parseInt(lastEmployee.employeeId.split("-")[1]);
    const employeeId = generateEmployeeId(lastNum);

    const hashedPassword = await bcrypt.hash(password, 10);

    let documents = [];
    if (req.files?.length) {
      documents = req.files.map((f) => ({ name: f.originalname, fileUrl: f.path }));
    }

    const employee = new Employee({
      employeeId,
      firstName, lastName, cnic, address, mobile, email, role,
      allowedRoutes: allowedRoutes || [],
      password: hashedPassword,
      documents,
    });
    await employee.save();

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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id).select("-password");
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
    if (allowedRoutes) {
      updateFields.allowedRoutes = typeof allowedRoutes === "string"
        ? JSON.parse(allowedRoutes) : allowedRoutes;
    }
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleEmployeeStatus = async (req, res) => {
  try {
    const { Employee } = getModels(req.millId);
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    employee.isActive = !employee.isActive;
    await employee.save();
    res.json({ message: "Status updated", isActive: employee.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};