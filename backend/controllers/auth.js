import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/admin-model.js";
import Employee from "../models/Employee.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are required",
      });
    }

    /* ===============================
       1️⃣ CHECK ADMIN
    ================================== */
    const admin = await Admin.findOne({ username });

    if (admin) {
      // ⚠️ If your admin password is plain text:
      if (password !== admin.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: admin._id, role: "Admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        role: "Admin",
        name: admin.name || "Admin",
        allowedRoutes: ["*"], // Admin full access
      });
    }

    /* ===============================
       2️⃣ CHECK EMPLOYEE
    ================================== */
    const employee = await Employee.findOne({ username });

    if (!employee) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!employee.isActive) {
      return res.status(403).json({
        message: "Account is deactivated. Contact Admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, employee.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: employee.role,
      name: employee.firstName,
      allowedRoutes: employee.allowedRoutes || [],
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};