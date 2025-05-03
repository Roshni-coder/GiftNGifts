import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Make sure 'uploads/' exists
const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // Save in uploads/ folder
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });
export default upload;
