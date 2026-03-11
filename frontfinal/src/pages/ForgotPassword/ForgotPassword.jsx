import './ForgotPassword.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { API_URL } from '../../utils/constants';

const ForgotPassword = () => {
  const { handleSubmit, register, formState } = useForm();
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setServerError('');
    setSuccess(false);
    
    // Por ahora, simular envío (necesitarías un endpoint en backend)
    try {
      // Aquí iría la llamada al backend para enviar email de recuperación
      // const response = await fetch(`${API_URL}/users/forgot-password`, {...});
      
      // Simulación de éxito
      setTimeout(() => {
        setSuccess(true);
      }, 1000);
      
    } catch {
      setServerError('Error al enviar el email de recuperación');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-wrapper">
        <h2 className="forgot-password-title">Recuperar contraseña</h2>
        <p className="forgot-password-text">
          Introduce tu email y te enviaremos instrucciones para restablecer tu contraseña.
        </p>
        
        {!success ? (
          <form onSubmit={handleSubmit(onSubmit)} className="forgot-password-form">
            {serverError && <p className="error">{serverError}</p>}
            
            <label htmlFor="email">EMAIL</label>
            <input
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Email inválido' }
              })}
              type="email"
              id="email"
              autoComplete="email"
              placeholder="tu@email.com"
            />
            {formState.errors.email && <p className="error">{formState.errors.email.message}</p>}

            <button type="submit" className="forgot-password-btn">ENVIAR INSTRUCCIONES</button>
          </form>
        ) : (
          <div className="success-message">
            <p style={{color: 'green', fontSize: '16px', textAlign: 'center', marginTop: '20px'}}>
              ✓ Se han enviado las instrucciones a tu email.
            </p>
            <p style={{fontSize: '14px', textAlign: 'center', color: '#666', marginTop: '10px'}}>
              Revisa tu bandeja de entrada y sigue los pasos para restablecer tu contraseña.
            </p>
          </div>
        )}

        <div className="forgot-password-links">
          <Link to="/login" className="back-to-login">← Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
