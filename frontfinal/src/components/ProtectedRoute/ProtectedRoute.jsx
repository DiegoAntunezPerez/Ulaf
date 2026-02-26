import useAuthStore from '../../store/authStore';
import Unauthorized from '../Unauthorized/Unauthorized';

// Componente para proteger rutas y permitir acceso solo a usuarios autenticados o administradores
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Unauthorized />;
  }

  if (adminOnly && user?.rol !== 'admin') {
    return <Unauthorized />;
  }
  return children;
};

export default ProtectedRoute;
