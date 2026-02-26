import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/productService';
import ProductCard from '../../components/ProductCard/ProductCard';
import { CATEGORIES } from '../../utils/constants';

// Mapeo de imágenes por categoría (ajusta los nombres de archivo según tus imágenes en public)
const CATEGORY_IMAGES = {
  Abrigos: '/categorias/abrigos.jpg',
  Camisas: '/categorias/camisas.jpg',
  Camisetas: '/categorias/camisetas.jpg',
  Cazadoras: '/categorias/cazadoras.jpg',
  Conjuntos: '/categorias/conjuntos.jpg',
  Pantalones: '/categorias/pantalones.jpg',
  Punto: '/categorias/punto.jpg',
  Sudaderas: '/categorias/sudaderas.jpg',
  Tops: '/categorias/tops.jpg',
  Vestidos: '/categorias/vestidos.jpg',
};
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryImages, setCategoryImages] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Obtener productos destacados (primeros 8)
        const response = await getAllProducts({ limit: 100 });
        const productsData = response.articulos || [];

        // Dividir en destacados y nuevos
        setFeaturedProducts(productsData.slice(0, 8));
        setNewProducts(productsData.slice(8, 16));

        // Obtener la primera imagen de cada categoría
        const imagesByCategory = {};
        CATEGORIES.forEach((cat) => {
          const prod = productsData.find((p) => p.categoria === cat && (p.imagenUrl || p.imagen));
          imagesByCategory[cat] = prod ? (prod.imagenUrl || prod.imagen) : null;
        });
        setCategoryImages(imagesByCategory);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-video-wrapper">
          <video
            src="/UlafBanner.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">NUEVA COLECCIÓN</h1>
          <p className="hero-subtitle">Descubre la nueva colección en moda femenina</p>
          <Link to="/products" className="hero-cta">
            Explorar ahora
          </Link>
        </div>
      </section>

      {/* Categorías destacadas */}
      <section className="home-categories">
        <div className="home-container">
          <h2 className="section-title">Comprar por categoría</h2>
          <div className="categories-grid categories-scroll">
            {CATEGORIES.map((category) => (
              <Link
                key={category}
                to={`/category/${category}`}
                className="category-card"
              >
                <div className="category-image">
                  <img
                    src={categoryImages[category] || CATEGORY_IMAGES[category] || '/category-default.jpg'}
                    alt={category}
                    className="category-img"
                    loading="lazy"
                  />
                </div>
                <h3 className="category-name">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="home-section">
        <div className="home-container">
          <div className="section-header">
            <h2 className="section-title">Productos destacados</h2>
            <Link to="/products" className="section-link">
              Ver todo
            </Link>
          </div>

          {loading ? (
            <div className="home-loading">
              <div className="home-spinner" />
            </div>
          ) : (
            <div className="products-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner promocional */}
      <section className="home-banner">
        <div className="banner-content">
          <h2 className="banner-title">ENVÍO GRATUITO</h2>
          <p className="banner-text">En pedidos superiores a 50€</p>
        </div>
      </section>

      {/* Nuevos productos */}
      <section className="home-section">
        <div className="home-container">
          <div className="section-header">
            <h2 className="section-title">Recién llegados</h2>
            <Link to="/products?collection=new" className="section-link">
              Ver todo
            </Link>
          </div>

          {loading ? (
            <div className="home-loading">
              <div className="home-spinner" />
            </div>
          ) : (
            <div className="products-grid">
              {newProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="home-newsletter">
        <div className="home-container">
          <h2 className="newsletter-title">Únete a nuestra newsletter</h2>
          <p className="newsletter-text">
            Recibe las últimas novedades y ofertas exclusivas
          </p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Introduce tu email"
              className="newsletter-input"
              required
            />
            <button type="submit" className="newsletter-btn">
              Suscribirse
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
