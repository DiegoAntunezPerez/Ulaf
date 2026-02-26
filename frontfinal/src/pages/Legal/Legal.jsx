import './Legal.css';

const Legal = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Aviso Legal</h1>
        
        <section className="info-section">
          <p className="last-updated">Última actualización: Marzo 2026</p>
        </section>

        <section className="info-section">
          <h2>1. Datos de Identificación</h2>
          <p>
            Nombre comercial: ÜLAF<br/>
            Dirección: Calle Principal, 123, 28001 Madrid, España<br/>
            CIF: B-12345678<br/>
            Email: info@tienda.com<br/>
            Teléfono: +34 900 123 456
          </p>
        </section>

        <section className="info-section">
          <h2>2. Objeto</h2>
          <p>
            El presente aviso legal regula el uso del sitio web www.tienda.com. 
            La navegación por el sitio web atribuye la condición de usuario del mismo 
            e implica la aceptación plena de todas las condiciones incluidas en este aviso legal.
          </p>
        </section>

        <section className="info-section">
          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todos los contenidos, textos, imágenes y códigos fuente son propiedad de ÜLAF 
            o de terceros a los que se ha reconocido su derecho. Queda prohibida su reproducción 
            sin autorización expresa.
          </p>
        </section>

        <section className="info-section">
          <h2>4. Responsabilidad</h2>
          <p>
            El titular del sitio web no se hace responsable de los daños y perjuicios que 
            pudieran derivarse de la utilización de la información del sitio o de la 
            contenida en las redes sociales.
          </p>
        </section>

        <section className="info-section">
          <h2>5. Modificaciones</h2>
          <p>
            ÜLAF se reserva el derecho de efectuar sin previo aviso las modificaciones que 
            considere oportunas en su web, pudiendo cambiar, suprimir o añadir tanto los 
            contenidos y servicios que se presten a través de la misma.
          </p>
        </section>

        <section className="info-section">
          <h2>6. Legislación Aplicable</h2>
          <p>
            Las presentes condiciones se rigen por la legislación española vigente. 
            Para la resolución de cualquier conflicto, las partes se someterán a los 
            juzgados y tribunales del domicilio del usuario.
          </p>
        </section>

        <section className="info-section">
          <h2>7. Contacto</h2>
          <p>
            Para cualquier consulta relacionada con este aviso legal:<br/>
            Email: <a href="mailto:legal@tienda.com">legal@tienda.com</a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
