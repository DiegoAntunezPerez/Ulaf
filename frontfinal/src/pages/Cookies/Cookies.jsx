import './Cookies.css';

const Cookies = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Configuración de Cookies</h1>
        
        <section className="info-section">
          <h2>¿Qué son las Cookies?</h2>
          <p>
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
            cuando visitas un sitio web. Se utilizan para mejorar tu experiencia de navegación.
          </p>
        </section>

        <section className="info-section">
          <h2>Cookies que Utilizamos</h2>
          
          <div className="cookie-type">
            <h3>Cookies Técnicas (Necesarias)</h3>
            <p>
              Imprescindibles para el funcionamiento del sitio web. Permiten la navegación 
              y el uso de las diferentes opciones o servicios. Sin estas cookies, el sitio 
              no funcionaría correctamente.
            </p>
          </div>

          <div className="cookie-type">
            <h3>Cookies de Preferencias</h3>
            <p>
              Permiten recordar tus preferencias (idioma, tema oscuro/claro, etc.) para 
              ofrecerte una experiencia personalizada.
            </p>
          </div>

          <div className="cookie-type">
            <h3>Cookies de Análisis</h3>
            <p>
              Nos ayudan a entender cómo interactúas con el sitio web, qué páginas visitas 
              y cuánto tiempo permaneces en cada una. Esta información nos permite mejorar 
              el sitio.
            </p>
          </div>
        </section>

        <section className="info-section">
          <h2>Gestionar Cookies</h2>
          <p>
            Puedes configurar tu navegador para que rechace todas las cookies o te avise 
            cuando se envía una. Sin embargo, si desactivas las cookies, es posible que 
            algunas funciones del sitio no estén disponibles.
          </p>
        </section>

        <section className="info-section">
          <h2>Cómo Eliminar Cookies</h2>
          <ul className="values-list">
            <li><strong>Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Borrar datos de navegación</li>
            <li><strong>Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies y datos del sitio</li>
            <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Gestionar datos de sitios web</li>
            <li><strong>Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios &gt; Borrar datos de exploración</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Más Información</h2>
          <p>
            Si tienes dudas sobre nuestra política de cookies:<br/>
            Email: <a href="mailto:privacidad@tienda.com">privacidad@tienda.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Cookies;
