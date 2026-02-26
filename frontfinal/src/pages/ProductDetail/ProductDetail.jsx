import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useCartStore from '../../store/cartStore';
import useFavoritesStore from '../../store/favoritesStore';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart } = useCartStore();
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const isProductFavorite = product ? isFavorite(product._id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:4000/api/articulos/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error cargando producto:', error);
        toast.error('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Selecciona una talla');
      return;
    }

    const stockKey = `stock_${selectedSize.toLowerCase()}`;
    if (product[stockKey] === 0) {
      toast.error('Talla agotada');
      return;
    }

    addToCart(product, selectedSize, 1);
    toast.success('Añadido al carrito');
  };

  const handleFavoriteClick = () => {
    toggleFavorite(product);
    if (isProductFavorite) {
      toast.success('Eliminado de favoritos');
    } else {
      toast.success('Añadido a favoritos');
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/products')}>Volver a productos</button>
      </div>
    );
  }

  const tallas = [
    { nombre: 'S', stock: product.stock_s || 0 },
    { nombre: 'M', stock: product.stock_m || 0 },
    { nombre: 'L', stock: product.stock_l || 0 },
    { nombre: 'XL', stock: product.stock_xl || 0 }
  ];

  const stockTotal = (product.stock_s || 0) + (product.stock_m || 0) + (product.stock_l || 0) + (product.stock_xl || 0);

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {/* Imagen */}
        <div className="product-detail-image">
          <img 
            src={product.imagenUrl || product.imagen} 
            alt={product.nombre}
          />
          <button 
            className={`detail-favorite ${isProductFavorite ? 'detail-favorite-active' : ''}`}
            onClick={handleFavoriteClick}
          >
              {isProductFavorite ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#dc2626" stroke="none" style={{display:'block'}}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{display:'block'}}>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              )}
          </button>
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <h1 className="detail-name">{product.nombre}</h1>
          
          {product.marca && (
            <p className="detail-brand">{product.marca}</p>
          )}
          
          <p className="detail-category">{product.categoria}</p>
          
          <p className="detail-price">{product.precio}€</p>

          {product.descripcion && (
            <p className="detail-description">{product.descripcion}</p>
          )}

          {/* Selector de talla */}
          <div className="detail-sizes-section">
            <h3>Selecciona tu talla</h3>
            <div className="detail-sizes">
              {tallas.map((talla) => (
                <button
                  key={talla.nombre}
                  className={`detail-size ${selectedSize === talla.nombre ? 'size-selected' : ''} ${talla.stock === 0 ? 'size-disabled' : ''}`}
                  onClick={() => talla.stock > 0 && setSelectedSize(talla.nombre)}
                  disabled={talla.stock === 0}
                >
                  {talla.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Stock info */}
          {stockTotal === 0 ? (
            <p className="detail-stock-warning">Producto agotado</p>
          ) : stockTotal <= 2 ? (
            <p className="detail-stock-low">Solo quedan {stockTotal} unidades</p>
          ) : null}

          {/* Botón añadir */}
          <button 
            className="detail-add-btn"
            onClick={handleAddToCart}
            disabled={stockTotal === 0}
          >
            {stockTotal === 0 ? 'Agotado' : 'Añadir al carrito'}
          </button>

          {/* Botón volver */}
          <button 
            className="detail-back-btn"
            onClick={() => navigate('/products')}
          >
            Volver a productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
