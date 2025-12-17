import jwt from 'jsonwebtoken';
import { requireAuth } from '@clerk/express';
import { ENV } from '../config/env.js';
import { User } from '../models/userModel.js';

export const protect = [requireAuth(), async (req, res, next) => {
    try {
        const clerkId = req.auth.userId;
        if (!clerkId) {
            return res.status(401).json({ message: "Invalid User" })
        }
        const user = await User.findOne({ clerkId })
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}]

export const adminOnly = (req, res, next) => {
    if (req.user.email !== ENV.ADMIN_EMAIL) {
        return res.status(403).json({ message: "Forbidden not Admin" })
    }
    next()
}
