import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  obtenerProductos,
  obtenerCategorias,
  obtenerProductores,
} from "../services/api";
import mielImg from "../assets/productos/miel.jpg";
import chalecoImg from "../assets/productos/chaleco.jpg";
import mermeladaImg from "../assets/productos/mermelada.jpg";

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

const imagenesProductos = {
  "Miel de Chiloé": mielImg,
  "Chaleco de lana": chalecoImg,
  "Mermelada artesanal": mermeladaImg,
};

function Productos() {
  const [busqueda, setBusqueda] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [productosAPI, setProductosAPI] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [categoriasAPI, setCategoriasAPI] = useState([]);
  const [productoresAPI, setProductoresAPI] = useState([]);

  
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductosAPI(datos);
      } catch (error) {
        console.error("Error al cargar productos:", error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const datos = await obtenerCategorias();
        setCategoriasAPI(datos);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setError((anterior) =>
          anterior || "No se pudieron cargar las categorías."
        );
      }
    };

    cargarCategorias();
  }, []);

  
  useEffect(() => {
    const cargarProductores = async () => {
      try {
        const datos = await obtenerProductores();
        setProductoresAPI(datos);
      } catch (error) {
        console.error("Error al cargar productores:", error);
        setError((anterior) =>
          anterior || "No se pudieron cargar los productores."
        );
      }
    };

    cargarProductores();
  }, []);


  const categorias = [
    "Todos",
    ...categoriasAPI.map((categoria) => categoria.nombre),
  ];

  const categoriaURL = searchParams.get("categoria");
  const categoria = categorias.includes(categoriaURL)
    ? categoriaURL
    : "Todos";

  const setCategoria = (nuevaCategoria) => {
    if (nuevaCategoria === "Todos") {
      setSearchParams({});
    } else {
      setSearchParams({ categoria: nuevaCategoria });
    }
  };


  const productosFiltrados = productosAPI.filter((producto) => {
    const categoriaSeleccionada = categoriasAPI.find(
      (item) => item.nombre === categoria
    );

    const coincideCategoria =
      categoria === "Todos" ||
      producto.categoria_id === categoriaSeleccionada?.id;

    const coincideBusqueda =
      producto.nombre
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

        <h2 className="titulo-todos-productos">
          Todos los productos
        </h2>
        {cargando && (
          <p className="sin-resultados">
            Cargando productos...
          </p>
        )}

        {error && (
          <p className="sin-resultados" role="alert">
            {error}
          </p>
        )}

        <div className="products">
          {productosFiltrados.map((producto) => (
            <Link to={`/productos/${producto.id}`} className="product-card product-card-link" key={producto.id}>
              <div className="product-image">
                {imagenesProductos[producto.nombre] ? (
                  <img
                    src={imagenesProductos[producto.nombre]}
                    alt={producto.nombre}
                    loading="lazy"
                  />
                ) : (
                  <span>Imagen no disponible</span>
                )}
              </div>

              <div className="product-info">                
                <p className="product-category">
                  {categoriasAPI.find(
                    (categoria) => categoria.id === producto.categoria_id
                  )?.nombre || "Sin categoría"}
                </p>

                <h3>{producto.nombre}</h3>
                
                <p className="producer">
                  {(() => {
                    const productor = productoresAPI.find(
                      (item) => item.id === producto.productor_id
                    );

                    return productor
                      ? `${productor.nombre}${productor.comuna ? ` · ${productor.comuna}` : ""}`
                      : "Productor no disponible";
                  })()}
                </p>


                <div className="product-bottom">
                  <strong>
                    ${producto.precio.toLocaleString("es-CL")}
                  </strong>
                  <span className="available">Disponible</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {!cargando && !error && productosFiltrados.length === 0 && (
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
