// ============================================================
// ADMIN CONFIG
// Replace the email below with YOUR admin email address.
// Later you can replace isAdmin() with: user?.role === 'admin'
// ============================================================

export const ADMIN_EMAIL = 'rounaks135@gmail.com' // 🔴 CHANGE THIS

/**
 * Check if a Firebase user object has admin privileges.
 * @param {object|null} user - Firebase Auth user object
 * @returns {boolean}
 */
export function isAdmin(user) {
    return !!user && user.email === ADMIN_EMAIL
}
