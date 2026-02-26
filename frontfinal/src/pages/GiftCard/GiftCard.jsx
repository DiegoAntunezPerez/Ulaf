import './GiftCard.css';

const GiftCard = () => {
  return (
    <div className="info-page">
      <div className="info-container">
        <h1>Tarjeta Regalo</h1>
        
        <section className="info-section">
          <h2>El Regalo Perfecto</h2>
          <p>
            ¿No sabes qué regalar? Con nuestra tarjeta regalo, la persona que quieres 
            podrá elegir exactamente lo que desea de todo nuestro catálogo.
          </p>
        </section>

        <section className="info-section">
          <h2>¿Cómo Funciona?</h2>
          <ul className="values-list">
            <li>Elige el importe de la tarjeta (disponibles desde 25€ hasta 500€)</li>
            <li>Recibirás un código único por email</li>
            <li>Comparte el código con la persona que quieras</li>
            <li>Se puede usar en cualquier compra online</li>
            <li>Sin fecha de caducidad</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Canjear tu Tarjeta Regalo</h2>
          <p>
            Para usar tu tarjeta regalo, introduce el código durante el proceso de compra. 
            Si el importe de la compra es menor que el valor de la tarjeta, el saldo restante 
            quedará disponible para futuras compras.
          </p>
        </section>

        <section className="info-section">
          <h2>Importes Disponibles</h2>
          <p>25€ | 50€ | 75€ | 100€ | 150€ | 200€ | 500€</p>
        </section>

        <section className="info-section">
          <h2>¿Necesitas Ayuda?</h2>
          <p>
            Para comprar una tarjeta regalo o cualquier consulta:<br/>
            Email: <a href="mailto:regalos@tienda.com">regalos@tienda.com</a><br/>
            Teléfono: +34 900 123 456
          </p>
        </section>
      </div>
    </div>
  );
};

export default GiftCard;
