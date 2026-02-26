import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import useLocalStorage from '../../hooks/useLocalStorage';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Usar hook personalizado para persistir el tema
  const [temaOscuro, setTemaOscuro] = useLocalStorage('tema', false);
  const { isAuthenticated, logout, user } = useAuthStore();
  const cartCount = useCartStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0)
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (temaOscuro) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [temaOscuro]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const cambiarTema = () => {
    const nuevoTema = !temaOscuro;
    setTemaOscuro(nuevoTema);
    if (nuevoTema) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {/* Menu hamburguesa izquierda */}
          <button 
            className={`menu-btn ${isMenuOpen ? 'menu-btn-open' : ''}`}
            onClick={toggleMenu}
          >
            <img src="/hamburguesa.svg" alt="Menu" className="menu-icon" />
          </button>

          {/* Logo centrado */}
          <Link to="/" className="header-logo">
            <h1>ÜLAF</h1>
          </Link>

          {/* Sección derecha */}
          <div className="header-actions">
            {/* Búsqueda */}
            <button 
              className="search-btn"
              onClick={toggleSearch}
            >
              <img src="/lupa.svg" alt="Buscar" className="icon" />
              <span className="action-text">BUSCAR</span>
            </button>

            {/* Carrito */}
            <Link to="/cart" className="cart-btn">
              <img src="/cesta.svg" alt="Carrito" className="icon" />
              <span className="action-text">
                CESTA [{cartCount}]
              </span>
            </Link>

            {/* Login/Usuario */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button className="action-btn" onClick={toggleUserMenu}>
                  <img src="/user.svg" alt="Usuario" className="icon user-icon" />
                  <span className="action-text">
                    {user && user.nombre ? user.nombre.toUpperCase() : 'USUARIO'}
                  </span>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <Link to="/favorites" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                      Favoritos
                    </Link>
                    {user && user.rol === 'admin' && (
                      <Link to="/admin" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                        Panel Admin
                      </Link>
                    )}
                    <button onClick={handleLogout} className="dropdown-item">
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="action-btn">
                <img src="/user.svg" alt="Iniciar sesión" className="icon user-icon" />
                <span className="action-text">INICIAR SESIÓN</span>
              </Link>
            )}

            {/* Cambiar tema - ÚLTIMO */}
            <button className="action-btn theme-btn" onClick={cambiarTema}>
              <span className="theme-icon">{temaOscuro ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda expandible */}
        {isSearchOpen && (
          <div className="search-expanded">
            <SearchBar onClose={toggleSearch} />
          </div>
        )}
      </header>

      {/* Sidebar (menú lateral) para cerrar tras clicar */}
      <CategoryMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Header;
