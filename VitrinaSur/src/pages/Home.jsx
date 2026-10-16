import { Link } from 'react-router-dom'
import { categorias, productos } from '../data/datos'

export default function Home() {
  const destacados = productos.slice(0, 3)

  return (
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
            <div className="search-field">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                aria-label="Buscar productos"
              />
            </div>

            <button type="button">Buscar</button>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="section" id="categorias">
        <div className="section-header">
          <div>
            <p className="eyebrow">EXPLORA CATEGORÍAS</p>
            <h2>Categorías</h2>
          </div>
        </div>

        <div className="categories">
          {categorias.map((c) => (
            <Link key={c.id} to={`/categoria/${c.id}`} className="category-card">
              <span className="category-icon">{c.icono}</span>
              <span>{c.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      <section className="section" id="productos">
        <div className="section-header">
          <div>
            <p className="eyebrow">DESCUBRE</p>
            <h2>Productos destacados</h2>
          </div>

          <Link to="/productos" className="see-more">Ver todos</Link>
        </div>

        <div className="products">
          {destacados.map((p) => (
            <article className="product-card" key={p.id}>
              <div className="product-image">Imagen del producto</div>

              <div className="product-info">
                <p className="product-category">
                  {categorias.find((c) => c.id === p.categoria)?.nombre}
                </p>
                <h3>{p.nombre}</h3>
                <p className="producer">{p.productor} · {p.lugar}</p>

                <div className="product-bottom">
                  <strong>${p.precio.toLocaleString('es-CL')}</strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </article>
          ))}
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
  )
}