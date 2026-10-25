// Carga explícita de las imágenes de src/assets (igual en desarrollo y en el build).
// Si algún archivo tiene extensión en mayúsculas (.JPG), agrégala al patrón.
const imagenes = import.meta.glob('../assets/*.{jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export default function ProductCard({ producto, categoria }) {
  const imagenSrc = producto.imagen
    ? imagenes[`../assets/${producto.imagen}`]
    : undefined

  // PostgreSQL puede devolver NUMERIC como string
  const precio = Number(producto.precio) || 0
  const disponible = producto.disponible !== false

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
          <span className={`available ${disponible ? '' : 'agotado'}`}>
            {disponible ? 'Disponible' : 'Agotado'}
          </span>
        </div>
      </div>
    </article>
  )
}