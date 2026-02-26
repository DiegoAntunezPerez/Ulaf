import './Help.css';

const Help = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Centro de Ayuda</h1>
        
        <section className="info-section">
          <h2>Preguntas Frecuentes</h2>
          
          <div className="faq-item">
            <h3>¿Cómo realizo un pedido?</h3>
            <p>
              Para realizar un pedido, simplemente navega por nuestro catálogo, añade los productos 
              que desees a tu carrito y procede al pago. Te guiaremos paso a paso durante todo el proceso.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Puedo modificar mi pedido después de realizarlo?</h3>
            <p>
              Una vez confirmado el pedido, no es posible modificarlo. Sin embargo, puedes contactarnos 
              inmediatamente y haremos todo lo posible por ayudarte antes de que se procese el envío.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Cómo puedo rastrear mi pedido?</h3>
            <p>
              Recibirás un email con el número de seguimiento una vez que tu pedido sea enviado. 
              Podrás rastrear tu paquete a través del enlace proporcionado en el correo.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Qué hago si recibo un producto defectuoso?</h3>
            <p>
              Si recibes un producto con defectos, contáctanos dentro de las primeras 48 horas 
              desde la recepción. Te enviaremos un reemplazo o procesaremos un reembolso completo.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Cuál es la política de tallas?</h3>
            <p>
              Cada producto incluye una guía de tallas detallada. Si tienes dudas, consulta 
              nuestras tablas de medidas o contáctanos para asesoramiento personalizado.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Ofrecen descuentos para compradores frecuentes?</h3>
            <p>
              Sí, tenemos un programa de fidelización donde acumulas puntos con cada compra. 
              Además, enviamos ofertas exclusivas a nuestros suscriptores.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>¿Necesitas Más Ayuda?</h2>
          <p>
            Si no encuentras la respuesta que buscas, no dudes en contactarnos. Nuestro equipo 
            de atención al cliente está disponible de lunes a viernes de 9:00 a 18:00h.
          </p>
          <p>
            Email: <a href="mailto:ayuda@tienda.com">ayuda@tienda.com</a><br/>
            Teléfono: +34 900 123 456
          </p>
        </section>
      </div>
    </div>
  );
};

export default Help;
