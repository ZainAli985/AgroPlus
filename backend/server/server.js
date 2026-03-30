import express from "express";
import cors    from "cors";
import dotenv  from "dotenv";
import path    from "path";
import fs      from "fs";
import { fileURLToPath } from "url";
import { connectMaster } from "../config/masterDB.js";
import router  from "../routes/router.js";

dotenv.config();

const app        = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

console.log(`📂  server.js __dirname: ${__dirname}`);

// ── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── API Routes ─────────────────────────────────────────────────────────────
app.use("/api", router);

// ── Health check ───────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "Agro Plus API", timestamp: new Date() });
});

// ── React Frontend ─────────────────────────────────────────────────────────
//
// YOUR LAYOUT:
//   main-project-folder/          ← project root
//     src/                        ← React source
//     dist/                       ← Vite build output  ← WE NEED THIS
//     vite.config.js
//     package.json
//     backend/
//       server/
//         server.js               ← __dirname is HERE
//       package.json
//
// From __dirname (.../backend/server):
//   ../..  = project root  →  ../../dist  ✅
//
// Set FRONTEND_DIST in .env to override all auto-detection.

function findDistDir() {
  const envPath = process.env.FRONTEND_DIST;
  const here    = __dirname;  // .../backend/server

  const candidates = [
    ...(envPath ? [path.resolve(envPath)] : []),
    path.join(here, "..", "..", "dist"),          // ✅ YOUR LAYOUT: backend/server → ../../dist
    path.join(here, "..", "dist"),                // backend/dist
    path.join(here, "..", "..", "..", "dist"),     // one more level up (just in case)
    path.join(here, "..", "frontend", "dist"),    // sibling frontend/
    path.join(here, "..", "..", "frontend", "dist"),
    path.join(here, "dist"),
  ];

  console.log("\n🔍  Searching for frontend dist/:");
  for (const dir of candidates) {
    const abs    = path.resolve(dir);
    const exists = fs.existsSync(path.join(abs, "index.html"));
    console.log(`     ${exists ? "✅" : "❌"} ${abs}`);
    if (exists) {
      console.log(`\n📦  Serving frontend from: ${abs}\n`);
      return abs;
    }
  }

  console.error("\n❌  dist/index.html not found in any candidate.");
  console.error("   Run `npm run build` from your project root first.");
  console.error("   Or add FRONTEND_DIST=/absolute/path/to/dist in .env\n");
  return null;
}

const frontendDir = findDistDir();

if (frontendDir) {
  // ── Static file serving ──────────────────────────────────────────────────
  // express.static serves:  /assets/*.js  /sw.js  /manifest.json  /logo.png  /1.png  etc.
  // Must come BEFORE the SPA catch-all middleware.
  // index: false → we serve index.html manually below (so cache headers apply).
  app.use(
    express.static(frontendDir, {
      index: false,
      setHeaders(res, filePath) {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-store");
        } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else {
          res.setHeader("Cache-Control", "public, max-age=3600");
        }
      },
    })
  );

  // ── SPA catch-all ────────────────────────────────────────────────────────
  // Written as app.use() middleware — compatible with Express 4 AND Express 5.
  // (Express 5 broke regex literal routes like app.get(/regex/, ...) )
  //
  //   → /              serve index.html
  //   → /dashboard     serve index.html
  //   → /cheque-book/create  serve index.html  ← reload works
  //   → /assets/App.js       express.static already handled it (or 404 below)
  //   → /sw.js               express.static served it
  //   → /manifest.json       express.static served it
  app.use((req, res, next) => {
    // Let API and upload routes fall through to their own handlers
    if (req.path.startsWith("/api/") || req.path.startsWith("/uploads/")) {
      return next();
    }

    // Paths with a file extension (.js .css .png .json etc.) that weren't
    // served by express.static above don't exist → return 404.
    // This prevents index.html being returned for missing .js chunks
    // (which causes the "MIME type text/html" error).
    if (/\.[^/]+$/.test(req.path)) {
      return res.status(404).send(`Not found: ${req.path}`);
    }

    // Everything else is a SPA route → serve the React shell
    res.setHeader("Cache-Control", "no-store");
    res.sendFile(path.join(frontendDir, "index.html"), err => {
      if (err) {
        console.error("sendFile error:", err);
        res.status(500).send("Error serving index.html");
      }
    });
  });

} else {
  // dist/ not found — show a helpful page for all non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.status(503).send(`
      <!DOCTYPE html>
      <html><body style="font-family:sans-serif;padding:48px;background:#0f172a;color:#e2e8f0;max-width:600px;margin:auto;">
        <h2 style="color:#f87171;margin-bottom:16px;">⚠️ Frontend not built</h2>
        <p style="color:#94a3b8;margin-bottom:24px;">Run this from your project root:</p>
        <div style="background:#1e293b;border-radius:8px;padding:16px 20px;font-family:monospace;font-size:14px;color:#4ade80;">
          npm run build
        </div>
        <p style="color:#64748b;margin-top:20px;font-size:13px;">
          Then restart: <code>node backend/server/server.js</code><br>
          API is live → <a href="/health" style="color:#6366f1;">/health</a>
        </p>
      </body></html>
    `);
  });
}

// ── Start ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectMaster();
    console.log("🌾  Agro Plus API");
    console.log(`🚀  http://127.0.0.1:${PORT}`);
    console.log(`🩺  http://127.0.0.1:${PORT}/health`);
    if (frontendDir) {
      console.log(`🖥️   http://127.0.0.1:${PORT}/  ← open this in browser\n`);
    }
    app.listen(PORT, () => console.log(`✅  Listening on port ${PORT}`));
  } catch (err) {
    console.error("❌  DB connection failed:", err);
    process.exit(1);
  }
}

startServer();