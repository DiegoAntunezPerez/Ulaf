import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      // Añadir, eliminar, actualizar cantidad y limpiar carrito
      addToCart: (product, size, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item._id === product._id && item.selectedSize === size
        );
      // Incremento 
        if (existingItem) {
          set({
            items: items.map((item) =>
              item._id === product._id && item.selectedSize === size
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
      // + nuevo item
          set({
            items: [
              ...items,
              {
                ...product,
                selectedSize: size,
                quantity
              }
            ]
          });
        }
      },
      removeFromCart: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item._id === productId && item.selectedSize === size)
          )
        });
      },
      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, size);
          return;
        }
        // Actualizo
        set({
          items: get().items.map((item) =>
            item._id === productId && item.selectedSize === size
              ? { ...item, quantity }
              : item
          )
        });
      },
      //Limpio carrito
      clearCart: () => set({ items: [] }),
      // Totales del carrito
      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      //Costes
      getCartTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.precio * item.quantity,
          0
        );
      },
      //Check de producto talla y duplicados
      isInCart: (productId, size) => {
        return get().items.some(
          (item) => item._id === productId && item.selectedSize === size
        );
      }
    }),
    {
      name: 'cart-storage' // guardado en localStorage
    }
  )
);

export default useCartStore;
