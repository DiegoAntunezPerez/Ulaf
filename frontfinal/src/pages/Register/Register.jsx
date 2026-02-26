import './Register.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { API_URL } from '../../utils/constants';

const Register = () => {
  const { handleSubmit, register, formState } = useForm();

  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

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
        setServerError(result?.msg || 'Error en el registro');
      } else {
        setSuccess(true);
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
          {serverError && <p className="error">{serverError}</p>}
          {success && <p style={{color: 'green'}}>¡Registro exitoso! Ya puedes iniciar sesión.</p>}
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
