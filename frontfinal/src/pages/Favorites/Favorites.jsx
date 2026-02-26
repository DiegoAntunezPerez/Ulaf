import { Link } from 'react-router-dom';
import useFavoritesStore from '../../store/favoritesStore';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Favorites.css';

const Favorites = () => {
  const { favorites, clearFavorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No tienes productos favoritos</h2>
        <p>Explora nuestros productos y añade tus favoritos</p>
        <Link to="/products" className="btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Mis Favoritos</h1>
        <button onClick={clearFavorites} className="btn-clear">
          Limpiar favoritos
        </button>
      </div>
      <div className="favorites-grid">
        {favorites.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
