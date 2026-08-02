import express from 'express';
import { getMe, setMyRole } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.patch('/role', setMyRole);

export default router;
