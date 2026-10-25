import { useState, useEffect } from 'react'
import { getJSON } from '../api'

export default function Productores() {
  const [productores, setProductores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getJSON('/api/productores')
      .then(setProductores)
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar los productores. Intenta nuevamente en unos segundos.')
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <main className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">TERRITORIO</p>
          <h1 className="page-title">Productores</h1>
        </div>
      </div>

      {cargando && <div className="loader" role="status" aria-label="Cargando productores" />}
      {error && <p className="state-message error-text" role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="products">
          {productores.length === 0 ? (
            <p>Aún no hay productores registrados.</p>
          ) : (
            productores.map((p) => (
              <article className="product-card" key={p.id}>
                <div className="product-info">
                  <p className="product-category">{p.rubro}</p>
                  <h3>{p.nombre}</h3>
                  <p className="producer">{p.lugar}</p>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  )
}