import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct, getAllOrders, updateOrderStatus } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly)

router.post('/products', createProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getAllOrders);
router.patch('/order/:id', updateOrderStatus);

export default router;

