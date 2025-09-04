// utils/upload.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'Magical Calligraphy', // Cloudinary folder
        allowed_formats: ['jpg', 'png', 'jpeg'],
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
        files: 5, // max 5 files at a time
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(png|jpeg|jpg)/)) {
            return cb(new Error('Only PNG, JPG, JPEG images are allowed (max 5MB each)'));
        }
        cb(null, true);
    },
});

export default upload;
