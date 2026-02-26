import './Payment.css';

const Payment = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Formas de Pago</h1>
        
        <section className="info-section">
          <h2>Métodos de Pago Aceptados</h2>
          <p>
            Aceptamos diferentes métodos de pago para tu comodidad. Todos nuestros pagos 
            están protegidos con encriptación SSL para garantizar la seguridad de tus datos.
          </p>
        </section>

        <section className="payment-methods">
          <div className="payment-method">
            <h3>💳 Tarjeta de Crédito/Débito</h3>
            <p>Visa, Mastercard, American Express</p>
            <ul className="values-list">
              <li>Pago instantáneo y seguro</li>
              <li>Sistema de verificación 3D Secure</li>
              <li>No almacenamos tus datos bancarios</li>
            </ul>
          </div>

          <div className="payment-method">
            <h3>🏦 Transferencia Bancaria</h3>
            <p>Transferencia directa a nuestra cuenta</p>
            <ul className="values-list">
              <li>Envío tras la confirmación del pago</li>
              <li>Plazo de procesamiento: 1-2 días laborables</li>
              <li>Recibirás los datos bancarios por email</li>
            </ul>
          </div>

          <div className="payment-method">
            <h3>📱 PayPal</h3>
            <p>Paga de forma rápida y segura</p>
            <ul className="values-list">
              <li>No necesitas compartir tus datos bancarios</li>
              <li>Protección al comprador de PayPal</li>
              <li>Pago instantáneo</li>
            </ul>
          </div>

          <div className="payment-method">
            <h3>💰 Contra Reembolso</h3>
            <p>Paga al recibir tu pedido</p>
            <ul className="values-list">
              <li>Paga en efectivo al mensajero</li>
              <li>Coste adicional: 3€</li>
              <li>Solo disponible en envíos a España peninsular</li>
            </ul>
          </div>

          <div className="payment-method">
            <h3>🎁 Tarjeta Regalo</h3>
            <p>Utiliza tu tarjeta regalo</p>
            <ul className="values-list">
              <li>Introduce el código en el proceso de compra</li>
              <li>Combínala con otros métodos de pago</li>
              <li>Sin fecha de caducidad</li>
            </ul>
          </div>
        </section>

        <section className="info-section">
          <h2>Seguridad en los Pagos</h2>
          <p>
            La seguridad de tus datos es nuestra prioridad. Todas las transacciones se realizan 
            a través de pasarelas de pago seguras con certificado SSL. Nunca almacenamos 
            información sensible de tus tarjetas en nuestros servidores.
          </p>
        </section>

        <section className="info-section">
          <h2>Preguntas Frecuentes</h2>
          
          <div className="faq-item">
            <h3>¿Es seguro pagar con tarjeta?</h3>
            <p>
              Sí, todos los pagos están protegidos con encriptación SSL y sistemas de 
              verificación 3D Secure. Tus datos bancarios nunca se almacenan en nuestros servidores.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Puedo pagar en cuotas?</h3>
            <p>
              Actualmente no ofrecemos financiación, pero puedes utilizar los servicios de 
              pago aplazado de tu tarjeta bancaria si tu entidad lo permite.
            </p>
          </div>

          <div className="faq-item">
            <h3>¿Cuándo se cargará el importe en mi tarjeta?</h3>
            <p>
              El cargo se realiza en el momento de confirmar el pedido. En caso de devolución, 
              se reembolsará el importe completo según nuestra política de devoluciones.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Payment;
