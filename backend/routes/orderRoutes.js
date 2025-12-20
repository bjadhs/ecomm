import express from 'express';
import { createOrder, getUsersOrders } from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/orders', protect, createOrder);
router.get('/orders', protect, getUsersOrders);
