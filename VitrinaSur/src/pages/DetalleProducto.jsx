import { Link, useParams } from "react-router-dom";
import "../styles/DetalleProducto.css";

const productos = [
  {
    id: 1,
    nombre: "Mermelada artesanal",
    categoria: "Alimentos",
    productor: "Productora local",
    comuna: "Castro",
    precio: 5000,
    descripcion:
      "Mermelada artesanal elaborada por productores locales de Chiloé.",
  },
  {
    id: 2,
    nombre: "Tejido tradicional",
    categoria: "Artesanía",
    productor: "Artesana local",
    comuna: "Chonchi",
    precio: 15000,
    descripcion:
      "Tejido tradicional inspirado en la identidad y artesanía chilota.",
  },
  {
    id: 3,
    nombre: "Producto del mar",
    categoria: "Alimentos",
    productor: "Productor local",
    comuna: "Quellón",
    precio: 8000,
    descripcion:
      "Producto del mar ofrecido por emprendedores locales de Chiloé.",
  },
];

function DetalleProducto() {
  const { id } = useParams();

  const producto = productos.find(
    (item) => item.id === Number(id)
  );

  if (!producto) {
    return (
      <main className="detalle-contenedor">
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver a productos</Link>
      </main>
    );
  }

  return (
    <main className="detalle-contenedor">
      <Link to="/productos" className="volver-inicio">
        ← Volver a productos
      </Link>

      <div className="detalle-grid">
        <div className="detalle-imagen">
          Imagen del producto
        </div>

        <div className="detalle-info">
          <p className="product-category">
            {producto.categoria}
          </p>

          <h1>{producto.nombre}</h1>

          <p className="producer">
            {producto.productor} · {producto.comuna}
          </p>

          <p className="detalle-descripcion">
            {producto.descripcion}
          </p>

          <strong className="detalle-precio">
            ${producto.precio.toLocaleString("es-CL")}
          </strong>

          <p className="available">Disponible</p>

          <Link
            to={`/prepedido/${producto.id}`}
            className="detalle-boton"
          >
            Realizar prepedido
          </Link>
        </div>
      </div>
    </main>
  );
}

export default DetalleProducto;
