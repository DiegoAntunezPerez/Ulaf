import useFetch from '../../hooks/useFetch';
import { API_URL } from '../../utils/constants';
import './About.css';

const About = () => {
  // Usar hook personalizado para obtener estadísticas de productos
  const { data, loading } = useFetch(`${API_URL}/articulos?limit=1000`);
  
  const stats = data ? {
    totalProductos: data.articulos?.length || 0,
    categorias: [...new Set(data.articulos?.map(p => p.categoria))].length || 0,
    marcas: [...new Set(data.articulos?.map(p => p.marca))].length || 0
  } : null;

  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Sobre Nosotros</h1>
        
        {/* Estadísticas del catálogo */}
        {!loading && stats && (
          <section className="info-section stats-section">
            <h2>Nuestro Catálogo</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <strong>{stats.totalProductos}+</strong>
                <span>Productos disponibles</span>
              </div>
              <div className="stat-item">
                <strong>{stats.categorias}</strong>
                <span>Categorías diferentes</span>
              </div>
              <div className="stat-item">
                <strong>{stats.marcas}+</strong>
                <span>Marcas reconocidas</span>
              </div>
            </div>
          </section>
        )}
        
        <section className="info-section">
          <h2>Nuestra Historia</h2>
          <p>
            Desde nuestros inicios, nos hemos dedicado a ofrecer moda de calidad al mejor precio. 
            Nuestra pasión por el diseño y el compromiso con nuestros clientes nos han convertido en 
            una de las tiendas de moda más confiables del mercado.
          </p>
        </section>

        <section className="info-section">
          <h2>Nuestra Misión</h2>
          <p>
            Proporcionar a nuestros clientes las últimas tendencias en moda con la mejor relación 
            calidad-precio. Nos esforzamos por hacer que la moda sea accesible para todos, sin 
            sacrificar la calidad ni el estilo.
          </p>
        </section>

        <section className="info-section">
          <h2>Nuestros Valores</h2>
          <ul className="values-list">
            <li><strong>Calidad:</strong> Seleccionamos cuidadosamente cada producto que ofrecemos.</li>
            <li><strong>Atención al cliente:</strong> Tu satisfacción es nuestra prioridad.</li>
            <li><strong>Innovación:</strong> Siempre buscamos las últimas tendencias.</li>
            <li><strong>Sostenibilidad:</strong> Comprometidos con prácticas responsables.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>¿Por Qué Elegirnos?</h2>
          <p>
            Con años de experiencia en el sector, ofrecemos una amplia selección de productos de las 
            mejores marcas. Nuestro equipo trabaja constantemente para garantizar que encuentres exactamente 
            lo que buscas, con la comodidad de comprar desde casa.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
