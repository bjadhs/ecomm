import express from 'express';
import { registerUser, loginUser, getUserProfile, getUsers, addAddress, getAddress, updateAddress, deleteAddress, addToWishlist, getWishlist, deleteFromWishlist } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);
// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/', getUsers);

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