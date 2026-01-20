import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(), // must be memoryStorage for XLSX.buffer
});

export default upload;
