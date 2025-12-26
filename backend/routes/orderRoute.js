import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createOrder, getUsersOrders } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', protect, getUsersOrders);
router.post('/', protect, createOrder);

export default router;
