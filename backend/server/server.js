import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { connectMaster } from "../config/masterDB.js";
import router from "../routes/router.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ── Uploads directory ─────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsDir));

// ── API routes ────────────────────────────────────────────────────────────────
app.use("/api", router);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) =>
  res.json({ status: "ok", timestamp: new Date() })
);

// ── Serve React frontend ──────────────────────────────────────────────────────
const distDir = path.join(__dirname, "..", "..", "frontend", "dist");
const distDirAlt = path.join(__dirname, "..", "..", "dist");

const frontendDir = fs.existsSync(distDir)
  ? distDir
  : fs.existsSync(distDirAlt)
  ? distDirAlt
  : null;

if (frontendDir) {
  app.use(express.static(frontendDir));

  // Catch-all for React Router
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(frontendDir, "index.html"));
  });
} else {
  // If frontend not built
  app.use((req, res) => {
    res.status(200).send(`
      <html>
        <body style="font-family:sans-serif;padding:40px;background:#0f172a;color:#e2e8f0;">
          <h2 style="color:#34d399;">Agro Plus API is running ✅</h2>
          <p>Frontend not found. Run 
          <code style="background:#1e293b;padding:4px 8px;border-radius:4px;">
          npm run build
          </code> inside your frontend folder.</p>
          <p style="color:#94a3b8;margin-top:16px;">
          API health: <a href="/health" style="color:#6366f1;">/health</a>
          </p>
        </body>
      </html>
    `);
  });
}

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

connectMaster()
  .then(() => {
    console.log(`\n🌾 Agro Plus API running → http://127.0.0.1:${PORT}`);
    console.log(`   Frontend:     http://127.0.0.1:${PORT}`);
    console.log(`   Health check: http://127.0.0.1:${PORT}/health`);
    console.log(`   Master login: POST /api/login\n`);
  })
  .catch((err) => {
    console.error("❌ Failed to connect to database:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});