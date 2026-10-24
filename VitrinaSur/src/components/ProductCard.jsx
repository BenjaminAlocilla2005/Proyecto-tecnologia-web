export default function ProductCard({ producto, categoria }) {
  const imagenSrc = producto.imagen
    ? new URL(`../assets/${producto.imagen}`, import.meta.url).href
    : null

  // PostgreSQL puede devolver NUMERIC como string
  const precio = Number(producto.precio) || 0

  return (
    <article className="product-card">
      <div className="product-image">
        {imagenSrc ? (
          <img src={imagenSrc} alt={producto.nombre} loading="lazy" />
        ) : (
          <span className="no-image">Sin imagen</span>
        )}
      </div>

      <div className="product-info">
        {categoria && <p className="product-category">{categoria}</p>}
        <h3>{producto.nombre}</h3>
        <p className="producer">
          {producto.productor} · {producto.lugar}
        </p>
        <div className="product-bottom">
          <strong>${precio.toLocaleString('es-CL')}</strong>
          <span className="available">Disponible</span>
        </div>
      </div>
    </article>
  )
}