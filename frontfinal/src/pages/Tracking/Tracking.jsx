import './Tracking.css';

const Tracking = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Seguimiento de Pedido</h1>
        
        <section className="info-section">
          <h2>Rastrea tu Pedido</h2>
          <p>
            Una vez que tu pedido haya sido enviado, recibirás un email con el 
            número de seguimiento y un enlace para rastrear tu envío.
          </p>
        </section>

        <section className="info-section">
          <h2>¿Cómo Rastrear?</h2>
          <ul className="values-list">
            <li>Revisa tu correo electrónico para encontrar el número de seguimiento</li>
            <li>Haz clic en el enlace proporcionado en el email</li>
            <li>También puedes acceder a tu cuenta &gt; Mis Pedidos</li>
            <li>Introduce el número de seguimiento en la web de la empresa de transporte</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Estados del Pedido</h2>
          <p><strong>Procesando:</strong> Tu pedido está siendo preparado.</p>
          <p><strong>Enviado:</strong> Tu pedido está en camino.</p>
          <p><strong>En reparto:</strong> El mensajero está cerca de tu dirección.</p>
          <p><strong>Entregado:</strong> Tu pedido ha sido entregado con éxito.</p>
        </section>

        <section className="info-section">
          <h2>¿Problemas con tu Envío?</h2>
          <p>
            Si tienes algún problema con tu pedido, contáctanos:<br/>
            Email: <a href="mailto:envios@tienda.com">envios@tienda.com</a><br/>
            Teléfono: +34 900 123 456
          </p>
        </section>
      </div>
    </div>
  );
};

export default Tracking;
