import express from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct, getAllOrders, updateOrderStatus, getAllCustomers } from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/multerMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(adminOnly);

router.post("/products", upload.array('images', 3), createProduct);
router.get('/products', getAllProducts);
router.put('/products/:id', upload.array('images', 3), updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getAllOrders);
router.patch('/order/:orderId/status', updateOrderStatus);
router.get('/customers', getAllCustomers);

export default router;

