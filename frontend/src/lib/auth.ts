
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

export type AppRole = "admin" | "user";

// Structural shape of Clerk's UserResource — avoids a @clerk/types dep.
export interface RoleUser {
    publicMetadata?: Record<string, unknown> | null;
    primaryEmailAddress?: { emailAddress: string } | null;
    emailAddresses?: { emailAddress: string }[];
}

export const primaryEmail = (user?: RoleUser | null): string | undefined =>
    user?.primaryEmailAddress?.emailAddress ?? user?.emailAddresses?.[0]?.emailAddress;

export const isAllowlistedAdmin = (email?: string | null): boolean => {
    if (!email) return false;
    return ADMIN_EMAILS.includes(email.toLowerCase());
};

// Mirrors the backend resolveRole. Hides UI only; adminOnly is the real gate.
export const isAdmin = (user?: RoleUser | null): boolean => {
    if (!user) return false;
    if (isAllowlistedAdmin(primaryEmail(user))) return true;
    return user.publicMetadata?.role === "admin";
};
