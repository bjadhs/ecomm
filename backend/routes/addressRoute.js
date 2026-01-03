import express from 'express';
import { addAddress, getAddress, updateAddress, deleteAddress } from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(protect);


//Address routes
router.post('/', addAddress);
router.get('/', getAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);


export default router;