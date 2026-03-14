// controllers/auth.js
// ─────────────────────────────────────────────────────────────────────────────
// Login via CNIC + Password only.
//
// Special case: Master admin CNIC/password → redirects to master portal
//   MASTER_CNIC and MASTER_PASSWORD are set in .env
//
// Mill admin login: checks approvalStatus — pending/restricted mills are blocked
// Employee login:   checks mill isActive before allowing entry
// ─────────────────────────────────────────────────────────────────────────────
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getModels } from "../config/millDB.js";
import { getMasterModels } from "../config/masterDB.js";
import { rawCnic } from "./registrationcontroller.js";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/login
// ─────────────────────────────────────────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { cnic, password } = req.body;

    if (!cnic || !password) {
      return res.status(400).json({ message: "CNIC and password are required." });
    }

    const normalizedCnic = rawCnic(cnic);
    if (!/^\d{13}$/.test(normalizedCnic)) {
      return res.status(400).json({ message: "Invalid CNIC format." });
    }

    /* ── 0. Master Admin check ───────────────────────────────────────────── */
    const masterCnic = rawCnic(process.env.MASTER_CNIC || "");
    if (normalizedCnic === masterCnic) {
      const isMatch = password === process.env.MASTER_PASSWORD;
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

      const token = jwt.sign(
        { id: "master", role: "Master", millId: "master" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        message:   "Welcome to Master Portal",
        token,
        role:      "Master",
        name:      "ORCA TECH",
        portal:    "master",   // frontend uses this to redirect to master dashboard
        millId:    "master",
        allowedRoutes: ["*"],
      });
    }

    const { Mill } = getMasterModels();

    /* ── 1. Mill Admin check ─────────────────────────────────────────────── */
    const mill = await Mill.findOne({ adminCnic: normalizedCnic });

    if (mill) {
      // Approval gate
      if (mill.approvalStatus === "pending") {
        return res.status(403).json({
          message: "Your account is pending approval. You will receive an email once it is activated.",
        });
      }
      if (mill.approvalStatus === "restricted") {
        return res.status(403).json({
          message: "Your account has been restricted. Please contact support.",
        });
      }
      if (!mill.isActive) {
        return res.status(403).json({ message: "This mill account is not active." });
      }

      const isMatch = await bcrypt.compare(password, mill.adminPassword);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

      const token = jwt.sign(
        { id: mill._id, role: "Admin", millId: mill.millId },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      // Use package-based allowedRoutes; fall back to ["*"] for legacy mills
      const adminRoutes = (mill.allowedRoutes && mill.allowedRoutes.length > 0)
        ? mill.allowedRoutes
        : ["*"];

      return res.status(200).json({
        message:      "Login successful",
        token,
        role:         "Admin",
        name:         mill.ownerName,
        millId:       mill.millId,
        businessName: mill.businessName,
        logoUrl:      mill.logoUrl,
        plan:         mill.plan || "enterprise",
        allowedRoutes: adminRoutes,
      });
    }

    /* ── 2. Employee check across all active mills ───────────────────────── */
    const activeMills = await Mill.find({
      isActive: true,
      approvalStatus: "approved",
    }).select("millId businessName logoUrl");

    for (const m of activeMills) {
      try {
        const { Employee } = getModels(m.millId);
        const employee = await Employee.findOne({ cnic: normalizedCnic });
        if (!employee) continue;

        if (!employee.isActive) {
          return res.status(403).json({ message: "Account deactivated. Contact your Admin." });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

        const token = jwt.sign(
          { id: employee._id, role: employee.role, millId: m.millId },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          message:      "Login successful",
          token,
          role:         employee.role,
          name:         employee.firstName,
          millId:       m.millId,
          businessName: m.businessName,
          logoUrl:      m.logoUrl,
          allowedRoutes: employee.allowedRoutes || [],
        });
      } catch {
        continue;
      }
    }

    return res.status(404).json({ message: "No account found with this CNIC." });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error." });
  }
};