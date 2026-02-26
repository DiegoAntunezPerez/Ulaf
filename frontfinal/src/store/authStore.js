import { create } from 'zustand';
import { login as loginService, register as registerService, logout as logoutService, getCurrentUser, isAuthenticated } from '../services/authService';
import useCartStore from './cartStore';

const useAuthStore = create((set) => ({
  user: getCurrentUser(),
  isAuthenticated: isAuthenticated(),
  isLoading: false,
  error: null,

  // Acciones/comprobaciones de login, register y logout
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const data = await loginService(credentials);
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: (error.response && error.response.data && error.response.data.message) || 'Error al iniciar sesión', 
        isLoading: false 
      });
      throw error;
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const data = await registerService(userData);
      set({ 
        user: data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      return data;
    } catch (error) {
      set({ 
        error: (error.response && error.response.data && error.response.data.message) || 'Error al registrarse', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: () => {
    logoutService();
    // Limpiamos el carrito al cerrar sesión
    useCartStore.getState().clearCart();
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    });
  },

  clearError: () => set({ error: null }),

  // Setters para login manual
  setUser: (user) => set({ user }),
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  // Verificar si es admin
  isAdmin: () => {
    const state = useAuthStore.getState();
    return state.user && state.user.rol === 'admin';
  }
}));

export default useAuthStore;
