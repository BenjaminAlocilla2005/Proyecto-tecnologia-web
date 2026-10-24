import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  obtenerProductoPorId,
  obtenerCategorias,
  obtenerProductores,
} from "../services/api";
import "../styles/DetalleProducto.css";
import mielImg from "../assets/productos/miel.jpg";
import chalecoImg from "../assets/productos/chaleco.jpg";
import mermeladaImg from "../assets/productos/mermelada.jpg";

const imagenesProductos = {
  "Miel de Chiloé": mielImg,
  "Chaleco de lana": chalecoImg,
  "Mermelada artesanal": mermeladaImg,
};

function DetalleProducto() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [productores, setProductores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarDetalle = async () => {
      setCargando(true);
      setError("");
      setProducto(null);

      try {
        const [datosProducto, datosCategorias, datosProductores] =
          await Promise.all([
            obtenerProductoPorId(id),
            obtenerCategorias(),
            obtenerProductores(),
          ]);

        if (!activo) return;

        setProducto(datosProducto);
        setCategorias(datosCategorias);
        setProductores(datosProductores);
      } catch (err) {
        if (!activo) return;

        setError(
          err.message || "No se pudo cargar el producto."
        );
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarDetalle();

    return () => {
      activo = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <main className="detalle-contenedor">
        <p>Cargando producto...</p>
      </main>
    );
  }


  if (error || !producto) {
    return (
      <main className="detalle-contenedor">
        <div className="detalle-error">
          <h1>
            {error === "Producto no encontrado"
              ? "Producto no encontrado"
              : "No se pudo cargar el producto"}
          </h1>

          <p>{error}</p>

          <Link
            to="/productos"
            className="detalle-volver-boton"
          >
            ← Volver a productos
          </Link>
        </div>
      </main>
    );
  }


  const categoria = categorias.find(
    (item) => Number(item.id) === Number(producto.categoria_id)
  );

  const productor = productores.find(
    (item) => Number(item.id) === Number(producto.productor_id)
  );

  return (
    <main className="detalle-contenedor">
      <Link to="/productos" className="volver-inicio">
        ← Volver a productos
      </Link>

      <div className="detalle-grid">
        <div className="detalle-imagen">
          {imagenesProductos[producto.nombre] || producto.imagen ? (
            <img
              src={imagenesProductos[producto.nombre] || producto.imagen}
              alt={producto.nombre}
            />
          ) : (
            "Imagen del producto"
          )}
        </div>

        <div className="detalle-info">
          <p className="product-category">
            {categoria?.nombre || "Sin categoría"}
          </p>

          <h1>{producto.nombre}</h1>

          <p className="producer">
            {productor
              ? `${productor.nombre}${
                  productor.comuna
                    ? ` · ${productor.comuna}`
                    : ""
                }`
              : "Productor no disponible"}
          </p>

          <p className="detalle-descripcion">
            {producto.descripcion}
          </p>

          <strong className="detalle-precio">
            ${Number(producto.precio).toLocaleString("es-CL")}
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