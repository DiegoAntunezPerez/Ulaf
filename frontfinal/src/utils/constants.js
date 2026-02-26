// Configuración de categorías/pages 
export const CATEGORIES = [
  'Abrigos',
  'Camisas',
  'Camisetas',
  'Cazadoras',
  'Conjuntos',
  'Pantalones',
  'Punto',
  'Sudaderas',
  'Tops',
  'Vestidos'
];

// URL base del API (ajusta según tu backend)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Rutas del API
export const API_ROUTES = {
  LOGIN: '/users/login',
  REGISTER: '/users/register',
  VERIFY: '/users/verify',
  // Productos
  PRODUCTS: '/articulos',
  PRODUCT_DETAIL: '/articulos/',
  PRODUCT_SEARCH: '/articulos/search',
  PRODUCT_CREATE: '/articulos',
  PRODUCT_UPDATE: '/articulos/',
  PRODUCT_DELETE: '/articulos/',
  // Usuarios
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_UPDATE: '/users/',
};

// Tallas disponibles
export const SIZES = ['S', 'M', 'L', 'XL'];

// Estados de producto
export const PRODUCT_STATUS = {
  AVAILABLE: 'Disponible',
  OUT_OF_STOCK: 'Agotado'
};

// Roles de usuario
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin'
};

// Límites
export const LIMITS = {
  PRODUCTS_PER_PAGE: 10,
  SEARCH_MIN_CHARS: 2,
  MAX_CART_QUANTITY: 20
};
