import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname || '').toLowerCase();
        const safeExt = [".jpeg", ".jpg", ".png", ".gif", ".webp"].includes(extname) ? extname : "";
        cb(null, Date.now() + safeExt)
    }
})
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (extname && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error("Invalid file type only jpeg, jpg, png, gif, webp are allowed"));
    }
}

export const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } })
