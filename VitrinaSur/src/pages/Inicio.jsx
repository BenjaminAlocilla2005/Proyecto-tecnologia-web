import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="app">
      {/* Contenido principal */}
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">PRODUCTOS LOCALES DE CHILOÉ</p>

            <h1>
              Descubre lo mejor de
              <span> nuestro territorio</span>
            </h1>

            <p className="hero-description">
              Conoce productos, productores y emprendimientos locales
              de Chiloé en un solo lugar.
            </p>

            {/* Buscador */}
            <div className="search-box">
              <svg
                className="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>

              <input
                type="search"
                placeholder="Buscar productos..."
                aria-label="Buscar productos"
              />
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="section" id="categorias">
          <div className="section-header">
            <div>
              <p className="eyebrow">EXPLORA</p>
              <h2>Categorías</h2>
            </div>
          </div>

          <div className="categories">
              <Link to="/productos?categoria=Alimentos" className="category-card category-link">
                <span className="category-icon">🍎</span>
                <span>Alimentos</span>
              </Link>

              <Link to="/productos?categoria=Artesanía" className="category-card category-link">
                <span className="category-icon">🧶</span>
                <span>Artesanía</span>
              </Link>

              <Link to="/productos?categoria=Gastronomía" className="category-card category-link">
                <span className="category-icon">🍲</span>
                <span>Gastronomía</span>
              </Link>

              <Link to="/productos?categoria=Ferias" className="category-card category-link">
                <span className="category-icon">📍</span>
                <span>Ferias</span>
              </Link>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="section" id="productos">
          <div className="section-header">
            <div>
              <p className="eyebrow">DESCUBRE</p>
              <h2>Productos destacados</h2>
            </div>

            <Link to="/productos" className="see-more">
              Ver todos
            </Link>
          </div>

          <div className="products">
            <Link to="/productos/1" className="product-card product-card-link">
              <div className="product-image">
                Imagen del producto
              </div>

              <div className="product-info">
                <p className="product-category">Alimentos</p>

                <h3>Mermelada artesanal</h3>

                <p className="producer">
                  Productora local · Castro
                </p>

                <div className="product-bottom">
                  <strong>$5.000</strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </Link>

            <Link to="/productos/2" className="product-card product-card-link">
              <div className="product-image">
                Imagen del producto
              </div>

              <div className="product-info">
                <p className="product-category">Artesanía</p>

                <h3>Tejido tradicional</h3>

                <p className="producer">
                  Artesana local · Chonchi
                </p>

                <div className="product-bottom">
                  <strong>$15.000</strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </Link>

            <Link to="/productos/3" className="product-card product-card-link">
              <div className="product-image">
                Imagen del producto
              </div>

              <div className="product-info">
                <p className="product-category">Alimentos</p>

                <h3>Producto del mar</h3>

                <p className="producer">
                  Productor local · Quellón
                </p>

                <div className="product-bottom">
                  <strong>$8.000</strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Productores */}
        <section className="producer-section" id="productores">
          <div>
            <p className="eyebrow">TERRITORIO</p>

            <h2>Conoce a quienes producen en Chiloé</h2>

            <p>
              VitrinaSur conecta a compradores con productores,
              artesanos y emprendedores locales, dando visibilidad
              a sus productos y al territorio donde se originan.
            </p>

            <Link to="/productores" className="primary-button">
             Conocer productores
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Inicio;