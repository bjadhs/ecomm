import express from 'express';
import { addToCart, getCart, deleteFromCart, updateCartQuantity } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);

// Cart routes
router.post('/', addToCart);
router.get('/', getCart);
router.put('/:productId', updateCartQuantity);
router.delete('/:productId', deleteFromCart);


export default router;