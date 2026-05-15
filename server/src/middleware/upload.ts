import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Pastikan folder tujuan tersedia secara otomatis
const uploadDir = path.join(__dirname, '../../uploads/videos');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi engine penyimpanan lokal
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Format: timestamp-random-namaasli.mp4 (mencegah duplikasi nama)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `lecture-${uniqueSuffix}${ext}`);
  }
});

// Inisialisasi multer dengan filter dan batasan ukuran
export const upload = multer({ 
  storage,
  limits: {
    fileSize: 500 * 1024 * 1024, // Batas maksimal 500 MB per video
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Hanya file MP4 yang diperbolehkan!'));
    }
  }
});