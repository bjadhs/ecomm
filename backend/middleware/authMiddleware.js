import jwt from 'jsonwebtoken';
import { requireAuth, clerkClient, getAuth } from '@clerk/express';
import { ENV } from '../config/env.js';
import { User } from '../models/userModel.js';

export const protect = [requireAuth(), async (req, res, next) => {
    try {
        const { userId } = getAuth(req);
        console.log(`User ID: ${userId}`);

        const user = await clerkClient.users.getUser(userId);

        console.log(`User: ${user}`);

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


export const adminOnly = (req, res, next) => {
    const adminEmail = req.user.emailAddresses?.find(
        (email) => email.id === req.user.primaryEmailAddressId
    )?.emailAddress;

    if (adminEmail !== ENV.ADMIN_EMAIL) {
        return res.status(403).json({ message: "Forbidden not Admin" })
    }
    next()
}


