import api from './api';
import { API_ROUTES } from '../utils/constants';

// Login
export const login = async (credentials) => {
  const { data } = await api.post(API_ROUTES.LOGIN, credentials);
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

// Register
export const register = async (userData) => {
  const { data } = await api.post(API_ROUTES.REGISTER, userData);
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Verifico si tiene token sino lo deslogueo
export const verifyToken = async () => {
  try {
    const { data } = await api.get(API_ROUTES.VERIFY);
    return data;
  } catch (error) {
    logout();
    throw error;
  }
};

// Obtengo el usuario actual
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Verifico si está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Verifico si es admin
export const isAdmin = () => {
  const user = getCurrentUser();
  return user && user.rol === 'admin';
};
