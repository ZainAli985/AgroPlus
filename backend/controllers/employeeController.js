import Employee from "../models/Employee.js";
import bcrypt from "bcryptjs";
// import { sendEmployeeCredentials } from "../middlewares/mailer.js";

/* ===============================
   🔹 AUTO EMPLOYEE ID GENERATOR
================================== */
const generateEmployeeId = (lastNumber) => {
  return "EMP-" + (lastNumber + 1).toString().padStart(4, "0");
};

/* ===============================
   🔹 VALIDATION HELPERS
================================== */
const isValidCNIC = (cnic) => {
  const cnicDigits = cnic.replace(/-/g, ""); // remove dashes
  return /^\d{13}$/.test(cnicDigits);
};

const isValidPhone = (phone) => {
  return /^\+92[3]\d{9}$/.test(phone);
};

/* ===============================
   🔹 CREATE EMPLOYEE
   POST /api/employees
================================== */
export const createEmployee = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      cnic,
      address,
      mobile,
      email,
      role,
      allowedRoutes,
      username,
      password,
    } = req.body;

    // Trim inputs
    firstName = firstName?.trim();
    lastName = lastName?.trim();
    cnic = cnic?.trim();
    mobile = mobile?.trim();
    email = email?.trim();
    username = username?.trim();
    role = role?.trim();

    if (
      !firstName ||
      !lastName ||
      !cnic ||
      !email ||
      !role ||
      !username ||
      !password
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // Validate CNIC
    if (!isValidCNIC(cnic)) {
      return res.status(400).json({
        message: "Invalid CNIC. Must be 13 digits (xxxxx-xxxxxxx-x)",
      });
    }

    // Validate Phone
    if (mobile && !isValidPhone(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number. Must start with +923XXXXXXXXX",
      });
    }

    // 🔹 Check for existing username or email
    const existingUser = await Employee.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({
        message: "Username or Email already exists",
      });
    }

    // 🔹 Check for CNIC duplicates for same role
    const existingCnic = await Employee.findOne({ cnic, role });
    if (existingCnic) {
      return res.status(400).json({
        message: `Employee with CNIC ${cnic} already exists with the same role`,
      });
    }

    // 🔹 Generate Employee ID
    const lastEmployee = await Employee.findOne().sort({ createdAt: -1 });
    let lastNum = 0;
    if (lastEmployee?.employeeId) {
      lastNum = parseInt(lastEmployee.employeeId.split("-")[1]);
    }
    const employeeId = generateEmployeeId(lastNum);

    // 🔹 Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔹 Handle Documents
    let documents = [];
    if (req.files && req.files.length > 0) {
      documents = req.files.map((file) => ({
        name: file.originalname,
        fileUrl: file.path,
      }));
    }

    const employee = new Employee({
      employeeId,
      firstName,
      lastName,
      cnic,
      address,
      mobile,
      email,
      role,
      allowedRoutes: allowedRoutes || [],
      username,
      password: hashedPassword,
      documents,
    });

    await employee.save();

    // 📧 Send Email (disabled for now)
    // sendEmployeeCredentials(email, firstName, username, password, role);

    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.error("Create Employee Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   🔹 Other Controllers
   (getEmployees, getEmployeeById, update, delete, toggle)
================================== */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      cnic,
      address,
      mobile,
      email,
      role,
      allowedRoutes,
      password,
    } = req.body;

    const updateFields = {};

    if (firstName) updateFields.firstName = firstName.trim();
    if (lastName) updateFields.lastName = lastName.trim();
    if (address) updateFields.address = address.trim();
    if (email) updateFields.email = email.trim();
    if (role) updateFields.role = role.trim();
    if (allowedRoutes) {
      updateFields.allowedRoutes =
        typeof allowedRoutes === "string"
          ? JSON.parse(allowedRoutes)
          : allowedRoutes;
    }

    if (cnic) {
      if (!/^\d{13}$/.test(cnic.replace(/-/g, ""))) {
        return res.status(400).json({ message: "Invalid CNIC" });
      }
      updateFields.cnic = cnic.trim();
    }

    if (mobile) {
      if (!/^\+92[3]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number" });
      }
      updateFields.mobile = mobile.trim();
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(password, salt);
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true },
    ).select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleEmployeeStatus = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    employee.isActive = !employee.isActive;
    await employee.save();

    res.json({ message: "Status updated", isActive: employee.isActive });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
