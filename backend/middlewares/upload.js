// middleware/upload.js
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

export const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 },
  fileFilter: makeFilter(ALLOWED_IMAGE),
});

export const uploadDoc = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 },
  fileFilter: makeFilter(ALLOWED_ANY),
});

export const uploadMultiDocs = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024, files: 20 },
  fileFilter: makeFilter(ALLOWED_ANY),
});

// ── Mill registration docs: logo + doc_0…doc_19 ───────────────────────────────
export const millDocFields = [
  { name: "logo", maxCount: 1 },
  ...Array.from({ length: 20 }, (_, i) => ({ name: `doc_${i}`, maxCount: 1 })),
];
export const uploadMillDocs = uploadMultiDocs.fields(millDocFields);

// ── Employee docs: 3 named buckets ───────────────────────────────────────────
export const uploadEmployeeDocs = uploadMultiDocs.fields([
  { name: "professionalDocs", maxCount: 10 },
  { name: "profilePic",       maxCount: 1  },
  { name: "supportingDocs",   maxCount: 10 },
]);