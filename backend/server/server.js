import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectMaster } from "../config/masterDB.js";
import router from "../routes/router.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Ensure uploads folder exists ──────────────────────────────
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/uploads", express.static(uploadsDir));

// ── API Routes ────────────────────────────────────────────────
app.use("/api", router);

// ── Health Check ─────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Agro Plus API", timestamp: new Date() });
});

// ── React Frontend ────────────────────────────────────────────
const distDir = path.join(__dirname, "..", "..", "frontend", "dist");
const distDirAlt = path.join(__dirname, "..", "..", "dist");
const frontendDir = fs.existsSync(distDir) ? distDir : fs.existsSync(distDirAlt) ? distDirAlt : null;

if (frontendDir) {
  app.use(express.static(frontendDir));

  // ✅ Correct catch-all using regex (Express v4 compatible)
  app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
    res.sendFile(path.join(frontendDir, "index.html"));
  });
} else {
  console.log("⚠️ Frontend build not found");
  app.get("/", (req, res) => {
    res.status(200).send(`
      <html>
        <body style="font-family:sans-serif;padding:40px;background:#0f172a;color:#e2e8f0;">
          <h2 style="color:#34d399;">Agro Plus API is running ✅</h2>
          <p>Frontend build not found.</p>
          <p>Run <code style="background:#1e293b;padding:4px 8px;border-radius:4px;">npm run build</code> inside your frontend folder.</p>
          <p style="color:#94a3b8;margin-top:16px;">API health → <a href="/health" style="color:#6366f1;">/health</a></p>
        </body>
      </html>
    `);
  });
}

// ── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectMaster();
    console.log("\n🌾 Agro Plus Backend Started");
    console.log(`🚀 Server:       http://127.0.0.1:${PORT}`);
    console.log(`🩺 Health:       http://127.0.0.1:${PORT}/health`);
    console.log(`🔑 Master Login: POST /api/login\n`);

    app.listen(PORT, () => {
      console.log(`✅ Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect database:", error);
    process.exit(1);
  }
}

startServer();