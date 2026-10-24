import { useState, useEffect } from 'react'
import { getJSON } from '../api'
import ProductCard from '../components/ProductCard'

export default function Productos() {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([getJSON('/api/productos'), getJSON('/api/categorias')])
      .then(([datosProductos, datosCategorias]) => {
        setProductos(datosProductos)
        setCategorias(datosCategorias)
      })
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar los productos. Intenta nuevamente en unos segundos.')
      })
      .finally(() => setCargando(false))
  }, [])

  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre

  return (
    <main className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">CATÁLOGO COMPLETO</p>
          <h1 className="page-title">Todos los productos</h1>
        </div>
      </div>

      {cargando && <div className="loader" role="status" aria-label="Cargando productos" />}
      {error && <p className="state-message error-text" role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="products">
          {productos.length === 0 ? (
            <p>Aún no hay productos publicados.</p>
          ) : (
            productos.map((p) => (
              <ProductCard key={p.id} producto={p} categoria={nombreCategoria(p.categoria_id)} />
            ))
          )}
        </div>
      )}
    </main>
  )
}