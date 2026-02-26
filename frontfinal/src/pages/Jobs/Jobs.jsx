import './Jobs.css';

const Jobs = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Trabaja con Nosotros</h1>
        
        <section className="info-section">
          <h2>Únete a Nuestro Equipo</h2>
          <p>
            Actualmente no tenemos posiciones abiertas, pero siempre estamos buscando 
            talento apasionado por la moda. Si crees que puedes aportar valor a nuestro 
            equipo, envíanos tu CV.
          </p>
        </section>

        <section className="info-section">
          <h2>¿Cómo Aplicar?</h2>
          <p>
            Envía tu currículum y carta de presentación a: 
            <a href="mailto:rrhh@tienda.com"> rrhh@tienda.com</a>
          </p>
          <p>
            Incluye en el asunto el puesto al que aplicas y te contactaremos 
            si tu perfil se ajusta a nuestras necesidades.
          </p>
        </section>

        <section className="info-section">
          <h2>Lo que Valoramos</h2>
          <ul className="values-list">
            <li>Pasión por la moda y las tendencias</li>
            <li>Excelente atención al cliente</li>
            <li>Trabajo en equipo</li>
            <li>Proactividad e iniciativa</li>
            <li>Flexibilidad horaria</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Jobs;
