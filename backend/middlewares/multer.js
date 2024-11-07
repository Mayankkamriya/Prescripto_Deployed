
import multer from "multer";

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');  // specify the directory for storing images
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, uniqueSuffix + '-' + file.originalname);  // properly use file object here
  }
});

const upload = multer({ storage: storage });
export default upload;
