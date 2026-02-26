import './Terms.css';

const Terms = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Condiciones de Compra</h1>
        
        <section className="info-section">
          <p className="last-updated">Última actualización: Marzo 2026</p>
        </section>

        <section className="info-section">
          <h2>1. Información General</h2>
          <p>
            Al realizar un pedido en nuestra tienda, aceptas estas condiciones de compra. 
            Te recomendamos leerlas detenidamente antes de finalizar tu compra.
          </p>
        </section>

        <section className="info-section">
          <h2>2. Proceso de Compra</h2>
          
          <div className="faq-item">
            <h3>2.1 Realización del Pedido</h3>
            <p>
              Para realizar un pedido, debes añadir los productos deseados al carrito y completar 
              el proceso de compra proporcionando la información solicitada. Al confirmar el pedido, 
              recibirás un email de confirmación.
            </p>
          </div>

          <div className="faq-item">
            <h3>2.2 Confirmación del Pedido</h3>
            <p>
              La aceptación de tu pedido quedará condicionada a la disponibilidad de los productos. 
              Si algún producto no está disponible, te contactaremos para ofrecerte alternativas o 
              proceder con el reembolso.
            </p>
          </div>

          <div className="faq-item">
            <h3>2.3 Disponibilidad y Stock</h3>
            <p>
              Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de 
              limitar las cantidades de cualquier producto que ofrezcamos.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>3. Precios y Pago</h2>
          
          <div className="faq-item">
            <h3>3.1 Precios</h3>
            <p>
              Todos los precios están expresados en euros (€) e incluyen IVA. Los precios pueden 
              cambiar sin previo aviso, pero se aplicará el precio vigente en el momento de tu pedido.
            </p>
          </div>

          <div className="faq-item">
            <h3>3.2 Gastos de Envío</h3>
            <p>
              Los gastos de envío se calcularán en función del método de envío seleccionado y 
              se mostrarán antes de finalizar la compra.
            </p>
          </div>

          <div className="faq-item">
            <h3>3.3 Formas de Pago</h3>
            <p>
              Aceptamos tarjetas de crédito/débito, PayPal, transferencia bancaria y contra reembolso. 
              El pago se procesará en el momento de realizar el pedido (excepto transferencia bancaria).
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>4. Envío y Entrega</h2>
          
          <div className="faq-item">
            <h3>4.1 Plazos de Entrega</h3>
            <p>
              Los plazos de entrega varían según el método de envío seleccionado:
            </p>
            <ul className="values-list">
              <li>Envío estándar: 3-5 días laborables</li>
              <li>Envío express: 24-48 horas</li>
              <li>Recogida en tienda: 2-3 días laborables</li>
            </ul>
          </div>

          <div className="faq-item">
            <h3>4.2 Zona de Envío</h3>
            <p>
              Realizamos envíos a toda España peninsular e islas. Para otros destinos, 
              consulta con nuestro servicio de atención al cliente.
            </p>
          </div>

          <div className="faq-item">
            <h3>4.3 Recepción del Pedido</h3>
            <p>
              Es responsabilidad del destinatario revisar el paquete en presencia del mensajero. 
              Si observas daños visibles, debes hacerlo constar en el albarán de entrega.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>5. Derecho de Desistimiento</h2>
          <p>
            Dispones de 30 días desde la recepción del pedido para ejercer tu derecho de 
            desistimiento sin necesidad de justificación. Los productos deben estar sin usar, 
            con sus etiquetas originales y en su embalaje original.
          </p>
          <p>
            Para ejercer este derecho, contacta con nuestro servicio de atención al cliente 
            o utiliza la opción en tu cuenta de usuario.
          </p>
        </section>

        <section className="info-section">
          <h2>6. Garantías</h2>
          <p>
            Todos nuestros productos cuentan con la garantía legal de conformidad de 2 años 
            establecida por la normativa europea. Si un producto presenta un defecto, puedes 
            solicitar su reparación, sustitución, rebaja del precio o resolución del contrato.
          </p>
        </section>

        <section className="info-section">
          <h2>7. Responsabilidad</h2>
          <p>
            Nos esforzamos por mantener la información de nuestro sitio web actualizada y precisa. 
            Sin embargo, no garantizamos que esté libre de errores. No nos hacemos responsables de 
            errores tipográficos en descripciones o precios.
          </p>
        </section>

        <section className="info-section">
          <h2>8. Propiedad Intelectual</h2>
          <p>
            Todo el contenido de este sitio web, incluyendo textos, imágenes, logotipos y diseño, 
            está protegido por derechos de propiedad intelectual. Queda prohibida su reproducción 
            sin autorización expresa.
          </p>
        </section>

        <section className="info-section">
          <h2>9. Protección de Datos</h2>
          <p>
            El tratamiento de tus datos personales se realiza conforme a nuestra 
            <a href="/politica-privacidad"> Política de Privacidad</a> y la normativa 
            aplicable de protección de datos (RGPD).
          </p>
        </section>

        <section className="info-section">
          <h2>10. Legislación Aplicable</h2>
          <p>
            Estas condiciones se rigen por la legislación española. Para cualquier controversia, 
            las partes se someterán a los juzgados y tribunales que correspondan según la ley.
          </p>
        </section>

        <section className="info-section">
          <h2>11. Contacto</h2>
          <p>
            Para cualquier consulta sobre estas condiciones:<br/>
            Email: <a href="mailto:info@tienda.com">info@tienda.com</a><br/>
            Teléfono: +34 900 123 456<br/>
            Horario: Lunes a Viernes, 9:00 - 18:00h
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
