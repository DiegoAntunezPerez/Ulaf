import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      // Acciones de agregar, eliminar, alternar y limpiar favoritos
      addToFavorites: (product) => {
        const { favorites } = get();
        if (!favorites.find((item) => item._id === product._id)) {
          set({ favorites: [...favorites, product] });
        }
      },

      removeFromFavorites: (productId) => {
        set({
          favorites: get().favorites.filter((item) => item._id !== productId)
        });
      },

      toggleFavorite: (product) => {
        const { favorites } = get();
        const isFavorite = favorites.find((item) => item._id === product._id);
        
        if (isFavorite) {
          get().removeFromFavorites(product._id);
        } else {
          get().addToFavorites(product);
        }
      },

      clearFavorites: () => set({ favorites: [] }),

      // Lo tengo en favoritos?
      isFavorite: (productId) => {
        return get().favorites.some((item) => item._id === productId);
      },
      getFavoritesCount: () => {
        return get().favorites.length;
      }
    }),
    {
      name: 'favorites-storage' // guardado en localStorage
    }
  )
);

export default useFavoritesStore;
