// utils/cloudinaryUpload.js
// ─────────────────────────────────────────────────────────────────────────────
// Single helper for all Cloudinary uploads.
//
// FOLDER STRUCTURE:
//   agro-plus/
//     mills/
//       {millId}/
//         admin/          ← mill logo, admin profile picture
//         employees/      ← employee documents & photos
//         payment-plans/  ← installment / payment proof docs uploaded by mill
//     master-portal/
//       mill-logs/        ← documents submitted during mill registration
//       payment-proofs/   ← payment screenshots from mills
//       admin-pfps/       ← master admin profile pictures (future)
//
// OPTIMISATIONS:
//   • Memory storage in multer → buffer passed directly → no disk write
//   • quality:"auto", fetch_format:"auto" → Cloudinary CDN serves WebP/AVIF
//   • Logos / avatars get eager 200×200 thumbnail pre-generated at upload time
//   • Public IDs include a short timestamp suffix to avoid cache collisions
// ─────────────────────────────────────────────────────────────────────────────
import cloudinary from "../config/cloudinary.js";

// ── Context → folder mapping ─────────────────────────────────────────────────
const ROOT = "agro-plus";

export const UPLOAD_CONTEXT = {
  MILL_ADMIN:     "mill-admin",     // mill logo / admin pfp
  MILL_EMPLOYEE:  "mill-employee",  // employee docs
  MILL_PAYMENT:   "mill-payment",   // payment docs uploaded by mill admin
  MASTER_LOGS:    "master-logs",    // mill registration docs
  MASTER_PROOF:   "master-proof",   // payment proofs sent to master
  MASTER_PFP:     "master-pfp",     // master portal profile pictures
};

function resolveFolder(context, millId = null) {
  switch (context) {
    case UPLOAD_CONTEXT.MILL_ADMIN:    return `${ROOT}/mills/${millId}/admin`;
    case UPLOAD_CONTEXT.MILL_EMPLOYEE: return `${ROOT}/mills/${millId}/employees`;
    case UPLOAD_CONTEXT.MILL_PAYMENT:  return `${ROOT}/mills/${millId}/payment-plans`;
    case UPLOAD_CONTEXT.MASTER_LOGS:   return `${ROOT}/master-portal/mill-logs`;
    case UPLOAD_CONTEXT.MASTER_PROOF:  return `${ROOT}/master-portal/payment-proofs`;
    case UPLOAD_CONTEXT.MASTER_PFP:    return `${ROOT}/master-portal/admin-pfps`;
    default:                           return `${ROOT}/misc`;
  }
}

// ── Core upload function ─────────────────────────────────────────────────────
/**
 * Upload a file buffer to Cloudinary.
 *
 * @param {Buffer}  buffer      - File buffer from multer memoryStorage
 * @param {string}  context     - One of UPLOAD_CONTEXT values
 * @param {string}  [millId]    - Required for mill-scoped contexts
 * @param {string}  [filename]  - Optional base filename (used in public_id)
 * @param {object}  [options]   - Extra cloudinary upload options
 * @returns {Promise<{url: string, publicId: string, thumbnailUrl?: string}>}
 */
export async function uploadToCloudinary(buffer, context, millId = null, filename = "", options = {}) {
  const folder   = resolveFolder(context, millId);
  const ts       = Date.now();
  const safeName = filename
    ? filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40)
    : "file";
  const publicId = `${folder}/${safeName}_${ts}`;

  // Determine if this is an image context (logos, pfps, proofs)
  const isImageCtx = [
    UPLOAD_CONTEXT.MILL_ADMIN,
    UPLOAD_CONTEXT.MASTER_PFP,
    UPLOAD_CONTEXT.MASTER_PROOF,
  ].includes(context);

  const uploadOptions = {
    public_id:     publicId,
    resource_type: "auto",          // handles images, PDFs, docs
    overwrite:     false,
    // CDN delivery optimisations — applied to images only
    ...(isImageCtx && {
      quality:      "auto",         // Cloudinary picks best quality/size tradeoff
      fetch_format: "auto",         // serves WebP/AVIF to supported browsers
      // Pre-generate a 200×200 thumbnail at upload time so first load is instant
      eager: [
        { width: 200, height: 200, crop: "fill", gravity: "face", quality: "auto", fetch_format: "auto" },
      ],
      eager_async: false,           // wait for thumbnail before returning
    }),
    ...options,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) return reject(err);
      resolve({
        url:          result.secure_url,
        publicId:     result.public_id,
        thumbnailUrl: result.eager?.[0]?.secure_url || result.secure_url,
        format:       result.format,
        bytes:        result.bytes,
      });
    });
    stream.end(buffer);
  });
}

// ── Delete helper (for cleanup / logo replacement) ───────────────────────────
/**
 * Delete a file from Cloudinary by its public_id.
 * Safe to call with null/undefined (no-op).
 */
export async function deleteFromCloudinary(publicId, resourceType = "image") {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (e) {
    console.warn(`Cloudinary delete failed for ${publicId}:`, e.message);
  }
}

// ── Extract public_id from a Cloudinary URL ──────────────────────────────────
/**
 * Given a Cloudinary secure_url, extract the public_id for deletion.
 * Returns null if the URL is not a Cloudinary URL.
 */
export function extractPublicId(cloudinaryUrl) {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) return null;
  // URL pattern: https://res.cloudinary.com/{cloud}/image/upload/v{ver}/{public_id}.{ext}
  const match = cloudinaryUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
  return match ? match[1] : null;
}