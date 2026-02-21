import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import router from "../routes/router.js";
import connectDB from "../config/MONGODB.js";
import logger from "../middlewares/logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(logger);

// Handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve built React frontend
const distPath = path.resolve(__dirname, "../../dist");
app.use(express.static(distPath));

// API routes FIRST
app.use("/api", router);

// React entry
app.get("/", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// 🔥 Catch-all for React routes using regex
app.get(/.*/, (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Connect DB
connectDB();

app.listen(PORT, () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
});
