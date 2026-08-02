import { clerkClient } from '@clerk/express';
import { getPrimaryEmail, isAllowlistedAdmin, resolveRole } from '../middleware/authMiddleware.js';

export const getMe = async (req, res) => {
    try {
        const email = getPrimaryEmail(req.user);
        return res.status(200).json({
            id: req.user.id,
            email,
            role: resolveRole(req.user),
            locked: isAllowlistedAdmin(email),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// DEMO ONLY: any signed-in user can promote themselves to admin.
export const setMyRole = async (req, res) => {
    try {
        const { role } = req.body;

        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ message: "role must be 'admin' or 'user'" });
        }

        const email = getPrimaryEmail(req.user);

        if (role === 'user' && isAllowlistedAdmin(email)) {
            return res.status(400).json({
                message: "This account is a permanent admin via ADMIN_EMAIL and cannot be demoted",
            });
        }

        const updated = await clerkClient.users.updateUserMetadata(req.user.id, {
            publicMetadata: { ...req.user.publicMetadata, role },
        });

        return res.status(200).json({
            id: updated.id,
            email,
            role: resolveRole(updated),
            locked: isAllowlistedAdmin(email),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
