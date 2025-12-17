import express from 'express';
import { getAllProducts } from '../controllers/adminController.js';
import { getProductById } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/products/:id', getAllProducts)
router.get('/products/:id', getProductById)

export default router;

