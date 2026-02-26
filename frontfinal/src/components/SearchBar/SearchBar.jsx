import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import './SearchBar.css';

const SearchBar = ({ onClose }) => {
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();
  const debouncedBusqueda = useDebounce(busqueda, 800);

  // Buscar automáticamente cuando el usuario deja de escribir
  useEffect(() => {
    if (debouncedBusqueda.trim()) {
      navigate('/products?search=' + debouncedBusqueda);
      if (onClose) {
        onClose();
      }
    }
  }, [debouncedBusqueda, navigate, onClose]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate('/products?search=' + busqueda);
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={manejarEnvio} className="search-form">
        <div className="search-input-wrapper">
          <img src="/lupa.svg" alt="Buscar" className="search-icon" />
          
          <input
            type="text"
            className="search-input"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
          />

          {busqueda && (
            <button
              type="button"
              className="search-clear"
              onClick={() => setBusqueda('')}
            >
              <img src="/cerrar.svg" alt="Limpiar" className="clear-icon" />
            </button>
          )}
        </div>

        {onClose && (
          <button
            type="button"
            className="search-close-btn"
            onClick={onClose}
          >
            Cancelar
          </button>
        )}
      </form>

      {busqueda && (
        <div className="search-suggestions">
          <p className="search-suggestions-text">
            Buscando "{busqueda}"...
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
