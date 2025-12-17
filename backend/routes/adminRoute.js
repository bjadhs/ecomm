import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/products', createProduct)
router.get('/products', protect, adminOnly, getAllProducts)
router.get('/products/:id', protect, adminOnly, getProductById)
router.put('/products/:id', protect, adminOnly, updateProduct)
router.delete('/products/:id', protect, adminOnly, deleteProduct)

export default router;

