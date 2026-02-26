import { useForm } from 'react-hook-form';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const { register, handleSubmit, formState, reset } = useForm();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    // Aquí podrías enviar el mensaje a tu backend
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Contacto</h1>
        
        <section className="info-section">
          <h2>¿Tienes alguna pregunta?</h2>
          <p>
            Estamos aquí para ayudarte. Completa el formulario a continuación y 
            nos pondremos en contacto contigo lo antes posible.
          </p>
        </section>

        <section className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>contacto@tienda.com</p>
          </div>
          <div className="contact-item">
            <h3>Teléfono</h3>
            <p>+34 900 123 456</p>
          </div>
          <div className="contact-item">
            <h3>Horario</h3>
            <p>Lunes a Viernes: 9:00 - 18:00h</p>
          </div>
        </section>

        {success && (
          <div className="alert alert-success">
            ¡Mensaje enviado correctamente! Te responderemos pronto.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre *</label>
            <input
              {...register('nombre', { required: 'El nombre es obligatorio' })}
              type="text"
              id="nombre"
              placeholder="Tu nombre"
            />
            {formState.errors.nombre && (
              <span className="error-msg">{formState.errors.nombre.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              {...register('email', {
                required: 'El email es obligatorio',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email no válido'
                }
              })}
              type="email"
              id="email"
              placeholder="tu@email.com"
            />
            {formState.errors.email && (
              <span className="error-msg">{formState.errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto *</label>
            <input
              {...register('asunto', { required: 'El asunto es obligatorio' })}
              type="text"
              id="asunto"
              placeholder="¿En qué podemos ayudarte?"
            />
            {formState.errors.asunto && (
              <span className="error-msg">{formState.errors.asunto.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje *</label>
            <textarea
              {...register('mensaje', {
                required: 'El mensaje es obligatorio',
                minLength: { value: 10, message: 'Mínimo 10 caracteres' }
              })}
              id="mensaje"
              rows="6"
              placeholder="Escribe tu mensaje aquí..."
            />
            {formState.errors.mensaje && (
              <span className="error-msg">{formState.errors.mensaje.message}</span>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
