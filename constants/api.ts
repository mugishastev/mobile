export const BASE_URL = 'https://backend-ahjc.onrender.com';

// Centralized API paths (adjust here if your backend routes differ)
export const API = {
  products: {
    all: `${BASE_URL}/api/products/all`,
    byId: (id: string) => `${BASE_URL}/api/products/${id}`,
    create: `${BASE_URL}/api/products/create`,
    update: (id: string) => `${BASE_URL}/api/products/update/${id}`,
    delete: (id: string) => `${BASE_URL}/api/products/delete/${id}`,
    search: (q: string) => `${BASE_URL}/api/products/search?query=${encodeURIComponent(q)}`,
  },
  cart: {
    my: `${BASE_URL}/api/cart/my-cart`,
    add: `${BASE_URL}/api/cart/add`,
    update: `${BASE_URL}/api/cart/update`,
    remove: (productId: string) => `${BASE_URL}/api/cart/remove/${productId}`,
  },
  orders: {
    create: `${BASE_URL}/api/orders/create`,
    mine: `${BASE_URL}/api/orders/my`,
  },
  users: {
    login: `${BASE_URL}/api/users/login`,
    register: `${BASE_URL}/api/users/register`,
    requestReset: `${BASE_URL}/api/users/request-reset`,
    resetPassword: `${BASE_URL}/api/users/reset-password`,
  },
};
