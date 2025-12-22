// middleware/clerkMiddleware.js
import { clerkMiddleware, createAuth } from '@clerk/clerk-express';

const auth = createAuth({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
});

export default clerkMiddleware(auth, {
    // Log ALL auth attempts
    afterAuth: (auth, req) => {
        console.log('🔐 CLERK AUTH:', {
            userId: auth.userId || 'anonymous',
            sessionId: auth.sessionId?.slice(-8) || 'none',
            action: req.path,
            method: req.method,
            ip: req.ip
        });
    },
    afterAuthError: (err, req) => {
        console.error('🚫 CLERK AUTH ERROR:', {
            message: err.message,
            code: err.code,
            path: req.path,
            ip: req.ip,
            userAgent: req.get('User-Agent')
        });
    }
});
