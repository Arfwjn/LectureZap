import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOADS_DIR = path.join(__dirname, "../../uploads");

// Ensure uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowed = ["video/mp4", "video/quicktime", "video/x-msvideo"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only MP4, MOV, and AVI video files are allowed"));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2 GB max
});
