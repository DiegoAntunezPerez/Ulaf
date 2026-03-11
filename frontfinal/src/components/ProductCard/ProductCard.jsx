import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useFavoritesStore from '../../store/favoritesStore';
import useAuthStore from '../../store/authStore';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated, user } = useAuthStore();
  const isProductFavorite = isFavorite(product._id);
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Verificar si el usuario está autenticado
    if (!isAuthenticated) {
      // Mostrar alerta y redirigir a login
      if (window.confirm('Debes iniciar sesión para añadir productos a favoritos. ¿Quieres ir a la página de login?')) {
        navigate('/login');
      }
      return;
    }
    
    toggleFavorite(product);
  };

  // Calcular tallas disponibles
  const tallas = [
    { nombre: 'S', stock: product.stock_s || 0 },
    { nombre: 'M', stock: product.stock_m || 0 },
    { nombre: 'L', stock: product.stock_l || 0 },
    { nombre: 'XL', stock: product.stock_xl || 0 }
  ];

  const stockTotal = (product.stock_s || 0) + (product.stock_m || 0) + (product.stock_l || 0) + (product.stock_xl || 0);
  const stockBajo = stockTotal > 0 && stockTotal <= 2;
  const agotado = stockTotal === 0;

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image-wrapper">
          {!imageLoaded && (
            <div className="product-skeleton" />
          )}
          <img
            src={product.imagenUrl || product.imagen}
            alt={product.nombre}
            className={`product-image ${imageLoaded ? 'product-image-loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          
          {/* Botón favorito - oculto solo para admins */}
          {(user?.rol !== 'admin') && (
            <button
              className={`product-favorite ${isProductFavorite ? 'product-favorite-active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isProductFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              {/* SVG inline corazón */}
              {isProductFavorite ? (
                <svg className="favorite-icon" width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s-6.2-5.2-8.5-8C1.2 10.1 2.1 6.6 5.1 5.3c2.1-.9 4.3-.1 5.7 1.5C12.6 5.2 14.8 4.4 16.9 5.3c3 1.3 3.9 4.8 1.6 7.7-2.3 2.8-8.5 8-8.5 8z"/>
                </svg>
              ) : (
                <svg className="favorite-icon favorite-icon-outline" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21s-6.2-5.2-8.5-8C1.2 10.1 2.1 6.6 5.1 5.3c2.1-.9 4.3-.1 5.7 1.5C12.6 5.2 14.8 4.4 16.9 5.3c3 1.3 3.9 4.8 1.6 7.7-2.3 2.8-8.5 8-8.5 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          )}

          {/* Badges de stock */}
          {agotado && (
            <span className="product-badge product-badge-sold-out">AGOTADO</span>
          )}
          {!agotado && stockBajo && (
            <span className="product-badge product-badge-low-stock">ÚLTIMAS UNIDADES</span>
          )}
        </div>

        <div className="product-info">
          <h3 className="product-name">{product.nombre}</h3>
          {product.marca && (
            <p className="product-brand">{product.marca}</p>
          )}
          <p className="product-category">{product.categoria}</p>
          
          <div className="product-price-wrapper">
            <span className="product-price">{product.precio}€</span>
          </div>

          {/* Tallas disponibles */}
          <div className="product-sizes">
            {tallas.map((talla) => (
              <span 
                key={talla.nombre} 
                className={`product-size ${talla.stock === 0 ? 'product-size-disabled' : ''}`}
              >
                {talla.nombre}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default ProductCard;
