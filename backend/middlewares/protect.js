import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";
import Admin from "../models/admin-model.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If Admin
    if (decoded.role === "Admin") {
      req.user = decoded;
      return next();
    }

    // If Employee
    const employee = await Employee.findById(decoded.id).select("-password");

    if (!employee || !employee.isActive) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.user = employee;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

/* ===============================
   ROLE AUTHORIZATION
================================== */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }
    next();
  };
};