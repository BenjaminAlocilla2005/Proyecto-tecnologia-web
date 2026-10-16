import { useParams } from 'react-router-dom'
import { productos, categorias } from '../data/datos'

export default function Categoria() {
  const { id } = useParams()
  const categoria = categorias.find((c) => c.id === id)
  const lista = productos.filter((p) => p.categoria === id)

  return (
    <section className="section">
      <h2>{categoria ? categoria.nombre : 'Categoría no encontrada'}</h2>
      <div className="products">
        {lista.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-image">Imagen del producto</div>
            <div className="product-info">
              <h3>{p.nombre}</h3>
              <p className="producer">{p.productor} · {p.lugar}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}