import express from 'express';
import { addAddress, getAddress, updateAddress, deleteAddress, addToWishlist, getWishlist, deleteFromWishlist } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { addToCart, getCart, deleteFromCart, updateCartQuantity } from '../controllers/userController.js';

const router = express.Router();
router.use(protect);

// Cart routes
router.post('/cart', addToCart);
router.get('/cart', getCart);
router.put('/cart/:productId', updateCartQuantity);
router.delete('/cart/:productId', deleteFromCart);

//Address routes
router.post('/address', addAddress);
router.get('/address', getAddress);
router.put('/address', updateAddress);
router.delete('/address', deleteAddress);

//Wishlist routes
router.post('/wishlist', addToWishlist);
router.get('/wishlist', getWishlist);
router.delete('/wishlist', deleteFromWishlist);

export default router;