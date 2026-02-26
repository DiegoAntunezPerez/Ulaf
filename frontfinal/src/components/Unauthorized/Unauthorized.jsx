import { Link } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-container">
        <h1 className='tittle'>CESTA</h1>
        <p className="unauthorized-message">
          Para acceder a esta sección necesitas iniciar sesión o crear una cuenta.
        </p>
        <div className="unauthorized-actions">
          <Link to="/login" className="btn-primary">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="btn-secondary">
            Crear Cuenta
          </Link>
        </div>
        <Link to="/" className="back-link">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
