
import { useState } from "react";
import { Link } from "react-router-dom";

const productos = [
  {
    id: 1,
    nombre: "Mermelada artesanal",
    categoria: "Alimentos",
    productor: "Productora local",
    comuna: "Castro",
    precio: 5000,
  },
  {
    id: 2,
    nombre: "Tejido tradicional",
    categoria: "Artesanía",
    productor: "Artesana local",
    comuna: "Chonchi",
    precio: 15000,
  },
  {
    id: 3,
    nombre: "Producto del mar",
    categoria: "Alimentos",
    productor: "Productor local",
    comuna: "Quellón",
    precio: 8000,
  },
];

const categorias = ["Todos", "Alimentos", "Artesanía", "Gastronomía", "Ferias"];

function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todos");

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoria === "Todos" || producto.categoria === categoria;

    const coincideBusqueda =
      `${producto.nombre} ${producto.productor} ${producto.comuna}`
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  return (
    <main className="pagina-productos">
      <section className="catalogo-encabezado">
        <p className="eyebrow">PRODUCTOS LOCALES DE CHILOÉ</p>
        <h1>Descubre nuestros productos</h1>
        <p>
          Explora productos elaborados por emprendedores,
          artesanos y productores de nuestro territorio.
        </p>
      </section>

      <section className="catalogo-contenido">
        <div className="catalogo-filtros">
          
        <div className="search-box">
         <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
         >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
         </svg>

         <input
          type="search"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar productos"
         />
        </div>

          <div className="filtros-categorias">
            {categorias.map((item) => (
              <button
                key={item}
                type="button"
                className={categoria === item ? "filtro activo" : "filtro"}
                onClick={() => setCategoria(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <h2>Todos los productos</h2>

        <div className="products">
          {productosFiltrados.map((producto) => (
            <article className="product-card" key={producto.id}>
              <div className="product-image">
                Imagen del producto
              </div>

              <div className="product-info">
                <p className="product-category">{producto.categoria}</p>
                <h3>{producto.nombre}</h3>

                <p className="producer">
                  {producto.productor} · {producto.comuna}
                </p>

                <div className="product-bottom">
                  <strong>
                    ${producto.precio.toLocaleString("es-CL")}
                  </strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <p className="sin-resultados">
            No encontramos productos con esos filtros.
          </p>
        )}

        <Link to="/" className="volver-inicio">
          ← Volver al inicio
        </Link>
      </section>
    </main>
  );
}

export default Productos;
