import { productos } from '../data/datos'

export default function Productos() {
  return (
    <section className="section">
      <h2>Todos los productos</h2>
      <div className="products">
        {productos.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-image">Imagen del producto</div>
            <div className="product-info">
              <h3>{p.nombre}</h3>
              <p className="producer">{p.productor} · {p.lugar}</p>
              <div className="product-bottom">
                <strong>${p.precio.toLocaleString('es-CL')}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}