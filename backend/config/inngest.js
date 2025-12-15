import { ENV } from './env.js';
import { v2 as cloudinary } from 'cloudinary';

const CLOUDINARY_URL = `cloudinary://${ENV.CLOUDINARY_API_KEY}:${ENV.CLOUDINARY_SECRET_KEY}@${ENV.CLOUDINARY_CLOUD_NAME}`;

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_SECRET_KEY
})

export default cloudinary;