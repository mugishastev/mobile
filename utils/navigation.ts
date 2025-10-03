import { router } from 'expo-router';

/**
 * Navigation helper utilities to handle routing with better type safety
 * and error handling for admin routes and other custom routes
 */

// Define admin routes that we know exist
export const ADMIN_ROUTES = {
  DASHBOARD: '/admin',
  PRODUCTS: '/admin/products',
  ORDERS: '/admin/orders',
  CATEGORIES: '/admin/categories',
  SETTINGS: '/admin/settings',
  USERS: '/admin/users',
  ANALYTICS: '/admin/analytics',
  LOGS: '/admin/logs',
  HELP: '/admin/help',
  SECURITY: '/admin/security',
  PERMISSIONS: '/admin/permissions',
  STORE_SETTINGS: '/admin/store-settings',
  PAYMENTS: '/admin/payments',
  SHIPPING: '/admin/shipping',
  TAX: '/admin/tax',
} as const;

// Define main app routes
export const APP_ROUTES = {
  HOME: '/',
  WELCOME: '/welcome',
  LOGIN: '/auth/LoginScreen',
  REGISTER: '/auth/RegisterScreen',
  FORGOT_PASSWORD: '/auth/ForgotPasswordEmail',
  PROFILE: '/profile',
  CART: '/cart',
  SHOPPING: '/shopping',
  CATEGORY: '/category',
  ABOUT: '/about',
} as const;

/**
 * Safe navigation function that handles type assertions internally
 */
export function navigateTo(route: string, options?: { replace?: boolean }) {
  try {
    if (options?.replace) {
      router.replace(route as any);
    } else {
      router.push(route as any);
    }
  } catch (error) {
    console.error('Navigation error:', error);
    console.warn(`Failed to navigate to: ${route}`);
  }
}

/**
 * Navigate to admin routes safely
 */
export function navigateToAdmin(adminRoute: string) {
  navigateTo(adminRoute);
}

/**
 * Navigate back safely
 */
export function navigateBack() {
  try {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/');
    }
  } catch (error) {
    console.error('Navigate back error:', error);
    router.replace('/');
  }
}

/**
 * Check if a route exists in our defined routes
 */
export function isValidRoute(route: string): boolean {
  const allRoutes = { ...ADMIN_ROUTES, ...APP_ROUTES };
  return Object.values(allRoutes).includes(route as any);
}

/**
 * Get route with parameters
 */
export function getRouteWithParams(baseRoute: string, params: Record<string, string>): string {
  const searchParams = new URLSearchParams(params);
  return `${baseRoute}?${searchParams.toString()}`;
}

// Export route constants for easy access
export { ADMIN_ROUTES as AdminRoutes, APP_ROUTES as AppRoutes };