import api from './api';
import { API_ROUTES } from '../utils/constants';

// Obtener todos los productos
export const getAllProducts = async (params = {}) => {
  const { data } = await api.get(API_ROUTES.PRODUCTS, { params });
  return data;
};

// Obtener producto por ID
export const getProductById = async (id) => {
  const { data } = await api.get(API_ROUTES.PRODUCT_DETAIL + id);
  return data;
};

// Buscar productos
export const searchProducts = async (searchParams) => {
  const { data } = await api.get(API_ROUTES.PRODUCT_SEARCH, {
    params: searchParams
  });
  return data;
};

// Crear producto (admin)
export const createProduct = async (formData) => {
  const { data } = await api.post(API_ROUTES.PRODUCT_CREATE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

// Actualizar producto (admin)
export const updateProduct = async (id, formData) => {
  const { data } = await api.put(API_ROUTES.PRODUCT_UPDATE + id, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

// Eliminar producto (admin)
export const deleteProduct = async (id) => {
  const { data } = await api.delete(API_ROUTES.PRODUCT_DELETE + id);
  return data;
};

// Filtrar por categoría
export const getProductsByCategory = async (categoria) => {
  return await searchProducts({ categoria });
};
