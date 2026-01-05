
const ADMIN_EMAILS = [
    'bijayadhs@gmail.com',
    'bijayadhikari107@gmail.com'
];

export const isAdmin = (email?: string | null): boolean => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
};
