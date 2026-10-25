import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getJSON } from '../api'
import ProductCard from '../components/ProductCard'

export default function Categoria() {
  const { id } = useParams()
  const [productos, setProductos] = useState([])
  const [nombreCategoria, setNombreCategoria] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)

    Promise.all([getJSON('/api/productos'), getJSON('/api/categorias')])
      .then(([datosProductos, datosCategorias]) => {
        const categoria = datosCategorias.find((c) => String(c.id) === String(id))
        setNombreCategoria(categoria ? categoria.nombre : 'Categoría no encontrada')
        setProductos(
          datosProductos.filter((p) => String(p.categoria_id) === String(id))
        )
      })
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar esta categoría. Intenta nuevamente en unos segundos.')
      })
      .finally(() => setCargando(false))
  }, [id])

  return (
    <main className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">CATEGORÍA</p>
          <h1 className="page-title">{cargando ? 'Cargando...' : nombreCategoria}</h1>
        </div>
      </div>

      {cargando && <div className="loader" role="status" aria-label="Cargando productos" />}
      {error && <p className="state-message error-text" role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="products">
          {productos.length === 0 ? (
            <p>No hay productos en esta categoría.</p>
          ) : (
            productos.map((p) => (
              <ProductCard key={p.id} producto={p} categoria={nombreCategoria} />
            ))
          )}
        </div>
      )}
    </main>
  )
}