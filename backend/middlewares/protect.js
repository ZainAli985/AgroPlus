// middlewares/protect.js
// ─────────────────────────────────────────────────────────────────────────────
// KEY CHANGE vs the old version:
//   JWT now carries { id, role, millId }
//   protect() attaches req.millId so every controller knows which DB to use.
//
//   For mill admins: decoded directly from token (no DB lookup needed).
//   For employees:   looked up in the MILL'S OWN database via getModels(millId).
// ─────────────────────────────────────────────────────────────────────────────
import jwt from "jsonwebtoken";
import { getModels } from "../config/millDB.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, role, millId, iat, exp }

    req.millId = decoded.millId; // ← THIS is the key addition

    if (decoded.role === "Admin") {
      // Mill admin — trust the token, no DB lookup needed
      req.user = decoded;
      return next();
    }

    // Employee — verify they're still active in the mill's own DB
    const { Employee } = getModels(decoded.millId);
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

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

// ─── Master portal guard ──────────────────────────────────────────────────────
// Only allows through tokens with role === "Master"
export const protectMaster = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "Master") {
      return res.status(403).json({ message: "Master access only" });
    }
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};