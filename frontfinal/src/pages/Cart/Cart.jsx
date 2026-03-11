import { Link } from 'react-router-dom';
import { useState } from 'react';
import useCartStore from '../../store/cartStore';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCartStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckout = () => {
    // Mostrar modal de éxito ANTES de limpiar
    setShowSuccessModal(true);
    // Limpiar carrito después de un pequeño delay
    setTimeout(() => {
      clearCart();
    }, 100);
    // Cerrar modal después de 3 segundos
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  // Mostrar carrito vacío solo si no hay items Y no hay modal activo
  if (items.length === 0 && !showSuccessModal) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Explora nuestros productos y añade algo increíble</p>
        <Link to="/products" className="btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* mockup de compra exitosa */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-icon">✓</div>
            <h2>¡Compra realizada con éxito!</h2>
            <p>Tu pedido ha sido procesado correctamente.</p>
            <p className="order-number">Número de pedido: #{Math.floor(Math.random() * 1000000)}</p>
            <p className="success-message">Recibirás un email de confirmación en breve.</p>
            <Link to="/products" className="btn-success-continue">Seguir comprando</Link>
          </div>
        </div>
      )}

      {/* Solo mostrar el carrito si hay items */}
      {items.length > 0 && (
        <div className="cart-page">
        <div className="cart-header">
          <h1>Tu carrito</h1>
          <button onClick={clearCart} className="btn-clear">
            Vaciar carrito
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
            <div key={`${item._id}-${item.selectedSize}`} className="cart-item">
              <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.nombre}</h3>
                <p className="cart-item-brand">{item.marca}</p>
                <p className="cart-item-size">Talla: {item.selectedSize}</p>
              </div>
              <div className="cart-item-quantity">
                <button
                  onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity - 1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.selectedSize, item.quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
              <div className="cart-item-price">
                <p className="price">{(item.precio * item.quantity).toFixed(2)}€</p>
                <p className="unit-price">({item.precio.toFixed(2)}€ c/u)</p>
              </div>
              <button
                onClick={() => removeFromCart(item._id, item.selectedSize)}
                className="btn-remove"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Resumen del pedido</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{getCartTotal().toFixed(2)}€</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span>Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>{getCartTotal().toFixed(2)}€</span>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">Proceder al pago</button>
          <Link to="/products" className="btn-continue">
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
      )}
    </>
  );
};

export default Cart;
