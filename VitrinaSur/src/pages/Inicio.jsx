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
            <button className="category-card">
              <span className="category-icon">🍎</span>
              <span>Alimentos</span>
            </button>

            <button className="category-card">
              <span className="category-icon">🧶</span>
              <span>Artesanía</span>
            </button>

            <button className="category-card">
              <span className="category-icon">🍲</span>
              <span>Gastronomía</span>
            </button>

            <button className="category-card">
              <span className="category-icon">📍</span>
              <span>Ferias</span>
            </button>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="section" id="productos">
          <div className="section-header">
            <div>
              <p className="eyebrow">DESCUBRE</p>
              <h2>Productos destacados</h2>
            </div>

            <button className="see-more">Ver todos</button>
          </div>

          <div className="products">
            <article className="product-card">
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
            </article>

            <article className="product-card">
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
            </article>

            <article className="product-card">
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
            </article>
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

            <button className="primary-button">
              Conocer productores
            </button>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Inicio;