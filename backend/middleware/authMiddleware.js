import jwt from 'jsonwebtoken';
import { requireAuth, clerkClient, getAuth } from '@clerk/express';
import { ENV } from '../config/env.js';
import { User } from '../models/userModel.js';

export const protect = [requireAuth(), async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        const user = await clerkClient.users.getUser(userId);

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }

}
]


export const getPrimaryEmail = (user) =>
    user?.emailAddresses?.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress
    || user?.emailAddresses?.[0]?.emailAddress
    || null;

export const isAllowlistedAdmin = (email) => {
    if (!email) return false;
    const allowedEmails = ENV.ADMIN_EMAIL?.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean) || [];
    return allowedEmails.includes(email.toLowerCase());
};

export const resolveRole = (user) =>
    isAllowlistedAdmin(getPrimaryEmail(user)) || user?.publicMetadata?.role === 'admin'
        ? 'admin'
        : 'user';

export const adminOnly = (req, res, next) => {
    if (resolveRole(req.user) !== 'admin') {
        return res.status(403).json({ message: "Forbidden: Admin access required" })
    }
    next()
}


