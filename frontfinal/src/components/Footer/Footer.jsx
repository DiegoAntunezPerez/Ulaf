import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/*Información */}
        <div className="footer-column">
          <h3 className="footer-title">INFORMACIÓN</h3>
          <ul className="footer-links">
            <li>
              <Link to="/sobre-nosotros" className="footer-link">
                Sobre nosotros
              </Link>
            </li>
            <li>
              <Link to="/ayuda" className="footer-link">
                Ayuda
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="footer-link">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/trabaja-con-nosotros" className="footer-link">
                Trabaja con nosotros
              </Link>
            </li>
          </ul>
        </div>

        {/*Compra */}
        <div className="footer-column">
          <h3 className="footer-title">COMPRA</h3>
          <ul className="footer-links">
            <li>
              <Link to="/envios-devoluciones" className="footer-link">
                Envíos y devoluciones
              </Link>
            </li>
            <li>
              <Link to="/formas-pago" className="footer-link">
                Formas de pago
              </Link>
            </li>
            <li>
              <Link to="/seguimiento-pedido" className="footer-link">
                Seguimiento de pedido
              </Link>
            </li>
            <li>
              <Link to="/tarjeta-regalo" className="footer-link">
                Tarjeta regalo
              </Link>
            </li>
          </ul>
        </div>

        {/*Legal */}
        <div className="footer-column">
          <h3 className="footer-title">LEGAL</h3>
          <ul className="footer-links">
            <li>
              <Link to="/politica-privacidad" className="footer-link">
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/condiciones-compra" className="footer-link">
                Condiciones de compra
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="footer-link">
                Configuración de cookies
              </Link>
            </li>
            <li>
              <Link to="/aviso-legal" className="footer-link">
                Aviso legal
              </Link>
            </li>
          </ul>
        </div>

        {/*Síguenos */}
        <div className="footer-column">
          <h3 className="footer-title">SÍGUENOS</h3>
          <div className="footer-social">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src="/instagram.png" alt="Instagram" className="social-icon" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src="/facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src="/gorjeo.png" alt="X" className="social-icon" />
            </a>
            <a 
              href="https://pinterest.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
            >
              <img src="/pinterest.png" alt="Pinterest" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyrigth */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2026 DIEGO ANTÚNEZ. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
