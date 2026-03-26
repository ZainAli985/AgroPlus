// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import path   from "path";
import { fileURLToPath } from "url";

// Resolve .env from project root regardless of where this file is imported from
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });  // fallback

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

// Validate at startup — surfaces missing credentials immediately
const cfg = cloudinary.config();
if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
  console.error(
    "❌ Cloudinary config missing. Check .env:\n" +
    `   CLOUDINARY_CLOUD_NAME = ${cfg.cloud_name || "⚠ NOT SET"}\n` +
    `   CLOUDINARY_API_KEY    = ${cfg.api_key    || "⚠ NOT SET"}\n` +
    `   CLOUDINARY_API_SECRET = ${cfg.api_secret ? "✓ set" : "⚠ NOT SET"}`
  );
}

export default cloudinary;