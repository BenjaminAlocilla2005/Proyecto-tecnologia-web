import "./App.css";
import logo from "./assets/vitrinasur.svg";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <a href="/" className="logo">
          <img src={logo} alt="VitrinaSur" />
        </a>

        <nav className="nav">
          <a href="#productos">Productos</a>
          <a href="#categorias">Categorías</a>
          <a href="#productores">Productores</a>
        </nav>

        <button className="menu-button" aria-label="Abrir menú">
          ☰
        </button>
      </header>

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
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                aria-label="Buscar productos"
              />

              <button type="button">Buscar</button>
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

      {/* Footer */}
      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;