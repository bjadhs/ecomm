import express from 'express';
import { getAllProducts, getProductById } from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

router.get('/', getAllProducts)
router.get('/:id', getProductById)

export default router;

