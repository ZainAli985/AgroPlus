// utils/cloudinaryUpload.js
// ─────────────────────────────────────────────────────────────────────────────
// Single helper for all Cloudinary uploads.
//
// FOLDER STRUCTURE (auto-created by Cloudinary from public_id):
//   agro-plus/
//     mills/
//       {millId}/
//         admin/          ← mill logo + admin personal profile picture
//         employees/      ← employee documents & photos
//         payments/       ← payment docs uploaded by mill
//     master-portal/
//       mill-logs/        ← registration documents uploaded by master
//       payment-proofs/   ← payment screenshots
//
// HOW CLOUDINARY FOLDERS WORK:
//   Cloudinary creates folders automatically from slashes in public_id.
//   e.g. public_id = "agro-plus/mills/mill_xyz/admin/logo_ts"
//   automatically creates the full folder path in Cloudinary dashboard.
//
// NOTE: eager transforms (thumbnail pre-generation) are REMOVED.
//   They require a paid Cloudinary plan and fail silently on free accounts.
//   Use on-the-fly transformations via URL params instead.
// ─────────────────────────────────────────────────────────────────────────────
import cloudinary from "../config/cloudinary.js";

// ── Context → folder mapping ─────────────────────────────────────────────────
const ROOT = "agro-plus";

export const UPLOAD_CONTEXT = {
  MILL_ADMIN:     "mill-admin",     // mill logo / admin personal pfp
  MILL_EMPLOYEE:  "mill-employee",  // employee documents & photos
  MILL_PAYMENT:   "mill-payment",   // payment docs uploaded by mill admin
  MASTER_LOGS:    "master-logs",    // mill registration docs (master portal)
  MASTER_PROOF:   "master-proof",   // payment screenshots sent to master
  MASTER_PFP:     "master-pfp",     // master admin profile pictures
};

function resolveFolder(context, millId = null) {
  switch (context) {
    case UPLOAD_CONTEXT.MILL_ADMIN:    return `${ROOT}/mills/${millId}/admin`;
    case UPLOAD_CONTEXT.MILL_EMPLOYEE: return `${ROOT}/mills/${millId}/employees`;
    case UPLOAD_CONTEXT.MILL_PAYMENT:  return `${ROOT}/mills/${millId}/payments`;
    case UPLOAD_CONTEXT.MASTER_LOGS:   return `${ROOT}/master-portal/mill-logs`;
    case UPLOAD_CONTEXT.MASTER_PROOF:  return `${ROOT}/master-portal/payment-proofs`;
    case UPLOAD_CONTEXT.MASTER_PFP:    return `${ROOT}/master-portal/admin-pfps`;
    default:                           return `${ROOT}/misc`;
  }
}

// ── Core upload function ─────────────────────────────────────────────────────
/**
 * Upload a file buffer to Cloudinary.
 * Folders are auto-created from the public_id path.
 *
 * @param {Buffer}  buffer      File buffer from multer memoryStorage
 * @param {string}  context     One of UPLOAD_CONTEXT values
 * @param {string}  [millId]    Required for mill-scoped contexts
 * @param {string}  [filename]  Optional base filename (used in public_id)
 * @param {object}  [options]   Extra cloudinary upload options (transformations etc.)
 * @returns {Promise<{url: string, publicId: string, thumbnailUrl: string}>}
 */
export async function uploadToCloudinary(buffer, context, millId = null, filename = "", options = {}) {
  const folder   = resolveFolder(context, millId);
  const ts       = Date.now();
  const safeName = filename
    ? filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40)
    : "file";

  // public_id = full path including folder → Cloudinary auto-creates the folder
  const publicId = `${folder}/${safeName}_${ts}`;

  const uploadOptions = {
    public_id:      publicId,
    resource_type:  "auto",   // handles images, PDFs, docs
    overwrite:      false,    // timestamp ensures uniqueness; false = safer
    use_filename:   false,    // use our public_id exactly as given
    unique_filename: false,   // don't append random chars to public_id
    ...options,
  };

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) {
        console.error(`Cloudinary upload failed [${context}/${millId}]:`, err.message || err);
        return reject(err);
      }
      console.log(`✅ Cloudinary upload: ${result.public_id} (${result.bytes} bytes)`);
      resolve({
        url:          result.secure_url,
        publicId:     result.public_id,
        thumbnailUrl: result.secure_url,  // caller can append transformation params to URL
        format:       result.format,
        bytes:        result.bytes,
      });
    });
    stream.end(buffer);
  });
}

// ── Delete helper ────────────────────────────────────────────────────────────
/**
 * Delete a file from Cloudinary by its public_id.
 * Safe to call with null/undefined (no-op).
 */
export async function deleteFromCloudinary(publicId, resourceType = "image") {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    console.log(`🗑 Cloudinary delete: ${publicId} → ${result.result}`);
  } catch (e) {
    console.warn(`Cloudinary delete failed for ${publicId}:`, e.message);
  }
}

// ── Extract public_id from a Cloudinary URL ──────────────────────────────────
/**
 * Given a Cloudinary secure_url, extract the public_id for deletion.
 * Returns null if the URL is not a Cloudinary URL.
 *
 * URL pattern: https://res.cloudinary.com/{cloud}/image/upload/v{ver}/{public_id}.{ext}
 * The public_id may contain slashes (folder separators).
 */
export function extractPublicId(cloudinaryUrl) {
  if (!cloudinaryUrl || !cloudinaryUrl.includes("cloudinary.com")) return null;
  // Strip version prefix (v1234567/) and file extension
  const match = cloudinaryUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
  return match ? match[1] : null;
}