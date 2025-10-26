export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  PRODUCTS: '/products',
  COLORS: '/colors',
  ADMIN: '/admin',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  NOT_FOUND: '*',
} as const;

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER] as const;

export const PROTECTED_ROUTES = [
  ROUTES.DASHBOARD,
  ROUTES.PROFILE,
  ROUTES.PRODUCTS,
  ROUTES.COLORS,
] as const;

export const ADMIN_ROUTES = [
  ROUTES.ADMIN,
  ROUTES.ADMIN_ANALYTICS,
  ROUTES.ADMIN_USERS,
  ROUTES.ADMIN_SETTINGS,
] as const;
