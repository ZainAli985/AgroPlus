// middleware/upload.js
// ─────────────────────────────────────────────────────────────────────────────
// Multer configured with memoryStorage.
// Files live only in RAM (req.file.buffer / req.files[].buffer).
// Controllers pass the buffer directly to Cloudinary — zero disk I/O.
//
// ALLOWED TYPES:
//   images: jpg, jpeg, png, webp, gif
//   docs:   pdf, doc, docx, xls, xlsx
// ─────────────────────────────────────────────────────────────────────────────
import multer from "multer";

const ALLOWED_IMAGE = /jpeg|jpg|png|webp|gif/;
const ALLOWED_ANY   = /jpeg|jpg|png|webp|gif|pdf|doc|docx|xls|xlsx/;

function makeFilter(pattern) {
  return (req, file, cb) => {
    const ext  = file.originalname.split(".").pop().toLowerCase();
    const mime = file.mimetype.toLowerCase();
    if (pattern.test(ext) || pattern.test(mime)) return cb(null, true);
    cb(new Error(`File type not allowed: ${file.originalname}`));
  };
}

// Single image (logos, profile pictures, payment screenshots)
export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 },   // 5 MB
  fileFilter: makeFilter(ALLOWED_IMAGE),
});

// Single document (any allowed type)
export const uploadDoc = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 },  // 10 MB
  fileFilter: makeFilter(ALLOWED_ANY),
});

// Multiple documents (employee files, mill registration docs)
export const uploadMultiDocs = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024, files: 20 },
  fileFilter: makeFilter(ALLOWED_ANY),
});

// ── millDocFields: logo (1) + doc_0…doc_19 ───────────────────────────────────
export const millDocFields = [
  { name: "logo",       maxCount: 1 },
  ...Array.from({ length: 20 }, (_, i) => ({ name: `doc_${i}`, maxCount: 1 })),
];

export const uploadMillDocs = uploadMultiDocs.fields(millDocFields);