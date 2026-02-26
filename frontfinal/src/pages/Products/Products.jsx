import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CATEGORIES } from '../../utils/constants';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const url = category 
        ? `http://localhost:4000/api/articulos?categoria=${category}&limit=100`
        : 'http://localhost:4000/api/articulos?limit=100';
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.articulos || []);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    const nombre = product.nombre?.toLowerCase() || '';
    const marca = product.marca?.toLowerCase() || '';
    const categoria = product.categoria?.toLowerCase() || '';
    const subcategoria = product.subcategoria?.toLowerCase() || '';
    
    return nombre.includes(query) || 
           marca.includes(query) || 
           categoria.includes(query) ||
           subcategoria.includes(query);
  });

  return (
    <div className="products-page">
      <div className="products-container">
        <h1 className="products-title">Productos</h1>

        {/* Filtros */}
        {/* Filtros en dos filas: 6 arriba, 5 abajo */}
        <div className="products-filters-group">
          <div className="products-filters-row">
            <button 
              className={category === '' ? 'filter-active' : ''}
              onClick={() => setCategory('')}
            >
              Todos
            </button>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'filter-active' : ''}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="products-filters-row">
            {CATEGORIES.slice(5, 11).map((cat) => (
              <button
                key={cat}
                className={category === cat ? 'filter-active' : ''}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mostrar término de búsqueda si existe */}
        {searchQuery && (
          <div className="search-info">
            <p>Buscando: "{searchQuery}" - {filteredProducts.length} resultados</p>
          </div>
        )}

        {/* Grid de productos */}
        {loading ? (
          <div className="products-loading">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="products-empty">
                {searchQuery 
                  ? `No se encontraron productos para "${searchQuery}"`
                  : 'No hay productos disponibles'
                }
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
