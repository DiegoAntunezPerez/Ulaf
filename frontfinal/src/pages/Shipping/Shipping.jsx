import './Shipping.css';

const Shipping = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Envíos y Devoluciones</h1>
        
        <section className="info-section">
          <h2>Información de Envíos</h2>
          
          <div className="shipping-option">
            <h3>Envío Estándar</h3>
            <p><strong>Plazo:</strong> 3-5 días laborables</p>
            <p><strong>Coste:</strong> 4,95€ (Gratis en pedidos superiores a 50€)</p>
            <p>Recibirás tu pedido en la dirección indicada en un plazo de 3 a 5 días laborables desde la confirmación del pedido.</p>
          </div>

          <div className="shipping-option">
            <h3>Envío Express</h3>
            <p><strong>Plazo:</strong> 24-48 horas</p>
            <p><strong>Coste:</strong> 9,95€</p>
            <p>Recibe tu pedido en 24-48 horas. Pedidos realizados antes de las 14:00h se procesan el mismo día.</p>
          </div>

          <div className="shipping-option">
            <h3>Recogida en Tienda</h3>
            <p><strong>Plazo:</strong> 2-3 días laborables</p>
            <p><strong>Coste:</strong> Gratuito</p>
            <p>Recoge tu pedido en cualquiera de nuestras tiendas físicas sin coste adicional.</p>
          </div>
        </section>

        <section className="info-section">
          <h2>Política de Devoluciones</h2>
          
          <div className="faq-item">
            <h3>¿Cuánto tiempo tengo para devolver un producto?</h3>
            <p>
              Dispones de 30 días desde la recepción del pedido para realizar una devolución. 
              El producto debe estar sin usar, con todas sus etiquetas y en su embalaje original.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Cómo inicio una devolución?</h3>
            <p>
              Accede a tu cuenta, ve a "Mis Pedidos" y selecciona el artículo que deseas devolver. 
              Sigue las instrucciones para imprimir la etiqueta de devolución. También puedes 
              contactarnos y te ayudaremos con el proceso.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Cuándo recibiré mi reembolso?</h3>
            <p>
              Una vez recibamos y procesemos tu devolución (generalmente 2-3 días laborables), 
              procesaremos el reembolso al método de pago original. El tiempo de reflejo en tu 
              cuenta depende de tu entidad bancaria (hasta 14 días).
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Puedo cambiar un producto por otra talla o color?</h3>
            <p>
              Sí, puedes realizar un cambio contactando con nuestro servicio de atención al cliente. 
              Alternativamente, puedes hacer una devolución y realizar un nuevo pedido con la talla 
              o color deseados.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Las devoluciones tienen coste?</h3>
            <p>
              Las devoluciones son gratuitas si utilizas nuestra etiqueta de devolución. 
              Si devuelves el producto en una tienda física, también es gratuito.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>Condiciones</h2>
          <ul className="values-list">
            <li>El producto debe estar sin usar y con todas sus etiquetas.</li>
            <li>Debe conservarse el embalaje original en buen estado.</li>
            <li>No se aceptan devoluciones de productos personalizados.</li>
            <li>Los productos en oferta o rebajados también pueden devolverse.</li>
            <li>Conserva el justificante de envío hasta recibir la confirmación del reembolso.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Shipping;
