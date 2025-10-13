export const PERMISSIONS = {
  USER: {
    VIEW_PROFILE: 'user:view_profile',
    EDIT_PROFILE: 'user:edit_profile',
    VIEW_PRODUCTS: 'user:view_products',
  },
  ADMIN: {
    VIEW_DASHBOARD: 'admin:view_dashboard',
    MANAGE_USERS: 'admin:manage_users',
    MANAGE_PRODUCTS: 'admin:manage_products',
    VIEW_ANALYTICS: 'admin:view_analytics',
    MANAGE_SETTINGS: 'admin:manage_settings',
  },
} as const;

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
