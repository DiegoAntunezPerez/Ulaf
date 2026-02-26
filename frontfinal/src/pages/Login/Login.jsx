import './Login.css';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const { handleSubmit, register, formState } = useForm();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError('');
    setSuccess(false);
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        setServerError(result?.message || 'Error al iniciar sesión');
      } else {
        setSuccess(true);
        // Guardar usuario y token en Zustand y localStorage
        setUser(result.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        // Redirigir a home tras 1 segundo
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    }
  };
  return (
    <div className="register-page">
      <div className="register-form-wrapper">
        <h2 className="register-title">Inicia sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {serverError && <p className="error">{serverError}</p>}
          {success && <p style={{color: 'green'}}>¡Login correcto!</p>}
          <label htmlFor="email">EMAIL</label>
          <input
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Email inválido' }
            })}
            type="email"
            id="email"
            autoComplete="email"
          />
          {formState.errors.email && <p className="error">{formState.errors.email.message}</p>}

          <label htmlFor="password">CONTRASEÑA</label>
          <input
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 6, message: 'Mínimo 6 caracteres' }
            })}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {formState.errors.password && <p className="error">{formState.errors.password.message}</p>}

          <button type="submit" className="register-btn">INICIAR SESIÓN</button>
        </form>

        <div className="login-links-centered">
          <Link to="/register" className="login-link-create">¿No tienes cuenta? <b>Crear cuenta</b></Link>
          <span className="login-link-help">¿Olvidaste tu contraseña?</span>
        </div>
      </div>
      <div className="register-side-image">
        {/* Imagen de fondo opcional */}
      </div>
    </div>
  );
};

export default Login;
