import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../utils/constants';
import './CategoryMenu.css';

const CategoryMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="menu-overlay" onClick={onClose} />

      {/* Menu lateral */}
      <aside className={`category-menu ${isOpen ? 'category-menu-open' : ''}`}>
        <div className="category-menu-header">
          <button 
            className="category-menu-close" 
            onClick={onClose}
          >
            <img src="/cerrar.svg" alt="Cerrar" className="close-icon" />
          </button>
        </div>

        <nav className="category-menu-nav">
          {/* Solo New Collection y categorías */}
          <div className="menu-section">
            <span className="menu-subtitle">NEW COLLECTION</span>
            <ul className="menu-list">
              {CATEGORIES.map((category) => (
                <li key={category}>
                  <Link 
                    to={`/category/${category}`} 
                    className="menu-link"
                    onClick={onClose}
                  >
                    {category.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Información y enlaces adicionales */}
          <div className="menu-section menu-section-info">
            <h3 className="menu-subtitle">INFORMACIÓN</h3>
            <ul className="menu-list">
              <li>
                <Link to="/sobre-nosotros" className="menu-link" onClick={onClose}>
                  SOBRE NOSOTROS
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidad" className="menu-link" onClick={onClose}>
                  POLÍTICA DE PRIVACIDAD
                </Link>
              </li>
              <li>
                <Link to="/envios-devoluciones" className="menu-link" onClick={onClose}>
                  ENVÍOS Y DEVOLUCIONES
                </Link>
              </li>
              <li>
                <Link to="/ayuda" className="menu-link" onClick={onClose}>
                  AYUDA
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="menu-link" onClick={onClose}>
                  CONTACTO
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
        </>
      )}
    </>
  );
};

export default CategoryMenu;
