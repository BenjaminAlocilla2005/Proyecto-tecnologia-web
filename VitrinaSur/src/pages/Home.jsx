import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getJSON } from '../api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    Promise.all([getJSON('/api/productos'), getJSON('/api/categorias')])
      .then(([datosProductos, datosCategorias]) => {
        setProductos(datosProductos)
        setCategorias(datosCategorias)
      })
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar los datos. Intenta nuevamente en unos segundos.')
      })
      .finally(() => setCargando(false))
  }, [])

  const destacados = productos
    .filter((p) => p.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .slice(0, 3)

  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PRODUCTOS LOCALES DE CHILOÉ</p>
          <h1>
            Descubre lo mejor de<span> nuestro territorio</span>
          </h1>
          <p className="hero-description">
            Conoce productos, productores y emprendimientos locales de Chiloé en un solo lugar.
          </p>

          <form className="search-box" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="search-field">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="¿Qué producto estás buscando?"
                aria-label="Buscar productos"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button type="submit">Buscar</button>
          </form>
        </div>
      </section>

      {cargando && <div className="loader" role="status" aria-label="Cargando datos" />}

      {error && <p className="state-message error-text" role="alert">{error}</p>}

      {!cargando && !error && (
        <>
          {/* CATEGORÍAS */}
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
                  <span className="category-icon" aria-hidden="true">{c.icono || '📦'}</span>
                  <span>{c.nombre}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* PRODUCTOS DESTACADOS */}
          <section className="section" id="productos">
            <div className="section-header">
              <div>
                <p className="eyebrow">DESCUBRE</p>
                <h2>Productos destacados</h2>
              </div>
              <Link to="/productos" className="see-more">Ver todos</Link>
            </div>

            <div className="products">
              {destacados.length === 0 ? (
                <p>No se encontraron productos.</p>
              ) : (
                destacados.map((p) => (
                  <ProductCard key={p.id} producto={p} categoria={nombreCategoria(p.categoria_id)} />
                ))
              )}
            </div>
          </section>
        </>
      )}

      {/* PRODUCTORES */}
      <section className="producer-section" id="productores">
        <div>
          <p className="eyebrow">TERRITORIO</p>
          <h2>Conoce a quienes producen en Chiloé</h2>
          <p>
            VitrinaSur conecta a compradores con productores, artesanos y emprendedores locales,
            dando visibilidad a sus productos y al territorio donde se originan.
          </p>
          <Link to="/productores" className="primary-button">Conocer productores</Link>
        </div>
      </section>
    </main>
  )
}