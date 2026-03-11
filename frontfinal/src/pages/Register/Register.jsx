import './Register.css';
import { useForm } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';
import useAuthStore from '../../store/authStore';

const Register = () => {
  const { handleSubmit, register, formState, reset } = useForm();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const messageRef = useRef(null);
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  // Scroll automático al mensaje cuando aparece
  useEffect(() => {
    if ((serverError || success) && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [serverError, success]);

  const onSubmit = async (data) => {
    setServerError('');
    setSuccess(false);
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok) {
        // Mostrar mensaje de error específico del servidor
        const errorMessage = result?.msg || result?.message || result?.error || 'Error en el registro';
        // Si hay detalles adicionales (como campo específico), agregarlos
        const errorDetails = result?.errors ? `: ${Object.values(result.errors).join(', ')}` : '';
        setServerError(errorMessage + errorDetails);
      } else {
        setSuccess(true);
        reset(); // Limpiar el formulario
        
        // Login automático después del registro
        try {
          const loginResponse = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: data.email, password: data.password })
          });
          const loginResult = await loginResponse.json();
          if (loginResponse.ok) {
            // Guardar usuario y token
            setUser(loginResult.user);
            setIsAuthenticated(true);
            localStorage.setItem('token', loginResult.token);
            localStorage.setItem('user', JSON.stringify(loginResult.user));
            // Redirigir a productos tras 1.5 segundos (tiempo para ver mensaje)
            setTimeout(() => {
              navigate('/products');
            }, 1500);
          } else {
            // Si falla el login automático, redirigir a login
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        } catch {
          // Si falla el login automático, redirigir a login
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        }
      }
    } catch {
      setServerError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="register-page center-form">
      <div className="register-form-wrapper">
        <h2 className="register-title">Crea tu cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div ref={messageRef}>
            {serverError && (
              <p className="error" style={{
                padding: '12px',
                backgroundColor: '#ffebee',
                border: '1px solid #ef5350',
                marginBottom: '16px',
                borderRadius: '4px'
              }}>
                {serverError}
              </p>
            )}
            {success && (
              <p style={{
                color: '#2e7d32',
                backgroundColor: '#e8f5e9',
                padding: '12px',
                border: '1px solid #4caf50',
                marginBottom: '16px',
                textAlign: 'center',
                fontWeight: '500',
                borderRadius: '4px'
              }}>
                ✓ ¡Registro exitoso! Iniciando sesión...
              </p>
            )}
          </div>
          <label htmlFor="nombre">Nombre</label>
          <input
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' }
            })}
            type="text"
            id="nombre"
            autoComplete="name"
          />
          {formState.errors.nombre && <p className="error">{formState.errors.nombre.message}</p>}

          <label htmlFor="email">Email</label>
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

          <label htmlFor="password">Contraseña</label>
          <input
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: { value: 8, message: 'Mínimo 8 caracteres' }
            })}
            type="password"
            id="password"
            autoComplete="new-password"
          />
          {formState.errors.password && <p className="error">{formState.errors.password.message}</p>}

          <label htmlFor="telefono">Teléfono</label>
          <input
            {...register('telefono')}
            type="tel"
            id="telefono"
            autoComplete="tel"
          />

          <label htmlFor="direccion">Dirección</label>
          <input
            {...register('direccion')}
            type="text"
            id="direccion"
            autoComplete="street-address"
          />

          {/* El rol solo lo puede elegir un admin, pero lo dejamos oculto por defecto */}
          <input type="hidden" value="user" {...register('rol')} />

          {/* fotoId: solo si implementas subida de imagen, por ahora campo oculto */}
          <input
            {...register('fotoId')}
            type="hidden"
            id="fotoId"
          />

          <button type="submit" className="register-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
