import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import useFavoritesStore from '../../store/favoritesStore';
import useAuthStore from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  const handleFavoriteClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      if (window.confirm('Debes iniciar sesión para añadir productos a favoritos. ¿Quieres ir a la página de login?')) {
        navigate('/login');
      }
      return;
    }
    
    toggleFavorite(product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/articulos?categoria=${categoryName}&limit=1000`);
        const data = await res.json();
        setProducts(data.articulos || []);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="category-page">
      <h1 className="category-title">{categoryName?.toUpperCase()}</h1>
      {loading ? (
        <div className="category-loading">Cargando...</div>
      ) : (
        <div className="category-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link to={`/products/${product._id}`} className="category-product" key={product._id}>
                <div className="category-product-img-wrapper">
                  <img src={product.imagenUrl || product.imagen} alt={product.nombre} className="category-product-img" />
                  
                  {/* Botón favorito - oculte para admins */}
                  {(user?.rol !== 'admin') && (
                    <button
                      className={`category-favorite-btn ${isFavorite(product._id) ? 'category-favorite-active' : ''}`}
                      onClick={(e) => handleFavoriteClick(e, product)}
                      aria-label={isFavorite(product._id) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    >
                      {isFavorite(product._id) ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21s-6.2-5.2-8.5-8C1.2 10.1 2.1 6.6 5.1 5.3c2.1-.9 4.3-.1 5.7 1.5C12.6 5.2 14.8 4.4 16.9 5.3c3 1.3 3.9 4.8 1.6 7.7-2.3 2.8-8.5 8-8.5 8z"/>
                        </svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21s-6.2-5.2-8.5-8C1.2 10.1 2.1 6.6 5.1 5.3c2.1-.9 4.3-.1 5.7 1.5C12.6 5.2 14.8 4.4 16.9 5.3c3 1.3 3.9 4.8 1.6 7.7-2.3 2.8-8.5 8-8.5 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  )}
                </div>
                <div className="category-product-info">
                  <div className="category-product-name">{product.nombre}</div>
                  <div className="category-product-brand">{product.marca}</div>
                  <div className="category-product-price">{product.precio}€</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="category-empty">No hay productos en esta categoría.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
