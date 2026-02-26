import './Privacy.css';

const Privacy = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Política de Privacidad</h1>
        
        <section className="info-section">
          <p className="last-updated">Última actualización: Marzo 2026</p>
        </section>

        <section className="info-section">
          <h2>1. Información que Recopilamos</h2>
          <p>
            Recopilamos información que nos proporcionas directamente cuando creas una cuenta, 
            realizas un pedido o te comunicas con nosotros:
          </p>
          <ul className="values-list">
            <li><strong>Datos de identificación:</strong> Nombre, apellidos, dirección de email</li>
            <li><strong>Datos de contacto:</strong> Teléfono, dirección de envío</li>
            <li><strong>Datos de pago:</strong> Información necesaria para procesar tu compra (procesada de forma segura)</li>
            <li><strong>Historial de compras:</strong> Productos adquiridos, fechas y preferencias</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>2. Uso de la Información</h2>
          <p>Utilizamos tu información para:</p>
          <ul className="values-list">
            <li>Procesar y gestionar tus pedidos</li>
            <li>Comunicarnos contigo sobre tu cuenta o pedidos</li>
            <li>Personalizar tu experiencia de compra</li>
            <li>Mejorar nuestros productos y servicios</li>
            <li>Enviar promociones y ofertas (solo si has dado tu consentimiento)</li>
            <li>Cumplir con obligaciones legales</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>3. Compartir Información</h2>
          <p>
            No vendemos ni alquilamos tu información personal. Podemos compartir tu información con:
          </p>
          <ul className="values-list">
            <li><strong>Proveedores de servicios:</strong> Empresas de mensajería, procesadores de pago</li>
            <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
            <li><strong>Transferencias empresariales:</strong> En caso de fusión, venta o transferencia de activos</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>4. Cookies y Tecnologías Similares</h2>
          <p>
            Utilizamos cookies para mejorar tu experiencia de navegación, analizar el tráfico del sitio 
            y personalizar contenido. Puedes gestionar tus preferencias de cookies en la configuración 
            de tu navegador.
          </p>
        </section>

        <section className="info-section">
          <h2>5. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información 
            personal contra acceso no autorizado, pérdida o destrucción. Esto incluye:
          </p>
          <ul className="values-list">
            <li>Encriptación SSL para todas las transacciones</li>
            <li>Almacenamiento seguro de contraseñas (hash)</li>
            <li>Acceso limitado a datos personales solo al personal autorizado</li>
            <li>Auditorías de seguridad regulares</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>6. Tus Derechos</h2>
          <p>Tienes derecho a:</p>
          <ul className="values-list">
            <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
            <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
            <li><strong>Supresión:</strong> Solicitar la eliminación de tu información</li>
            <li><strong>Portabilidad:</strong> Recibir tus datos en un formato estructurado</li>
            <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
            <li><strong>Limitación:</strong> Solicitar la limitación del procesamiento</li>
          </ul>
          <p>
            Para ejercer estos derechos, contáctanos en: <a href="mailto:privacidad@tienda.com">privacidad@tienda.com</a>
          </p>
        </section>

        <section className="info-section">
          <h2>7. Menores de Edad</h2>
          <p>
            Nuestros servicios no están dirigidos a menores de 16 años. No recopilamos 
            intencionadamente información personal de menores sin el consentimiento parental.
          </p>
        </section>

        <section className="info-section">
          <h2>8. Cambios en esta Política</h2>
          <p>
            Podemos actualizar esta política periódicamente. Te notificaremos cualquier cambio 
            significativo publicando la nueva política en esta página y actualizando la fecha 
            de "última actualización".
          </p>
        </section>

        <section className="info-section">
          <h2>9. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, contáctanos:<br/>
            Email: <a href="mailto:privacidad@tienda.com">privacidad@tienda.com</a><br/>
            Teléfono: +34 900 123 456
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
