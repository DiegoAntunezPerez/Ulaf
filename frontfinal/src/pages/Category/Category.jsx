import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import './Category.css';

const Category = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/articulos?categoria=${categoryName}`);
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
