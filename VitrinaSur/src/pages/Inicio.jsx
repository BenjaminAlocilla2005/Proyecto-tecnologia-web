import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerProductos,
  obtenerCategorias,
  obtenerProductores,
} from "../services/api";

import mermeladaDestacada from "../assets/destacados/mermelada-destacada.jpg";
import tejidoDestacado from "../assets/destacados/tejido-destacado.jpg";
import mielImg from "../assets/productos/miel.jpg";
import alimentosImg from "../assets/categorias/alimentos.jpg";
import artesaniaImg from "../assets/categorias/artesania.jpg";
import gastronomiaImg from "../assets/categorias/gastronomia.jpg";
import feriasImg from "../assets/categorias/ferias.jpg";

const imagenesDestacadas = {
  1: mielImg,
  2: tejidoDestacado,
  3: mermeladaDestacada,
};


function Inicio() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [productores, setProductores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarDestacados = async () => {
      try {
        const [datosProductos, datosCategorias, datosProductores] =
          await Promise.all([
            obtenerProductos(),
            obtenerCategorias(),
            obtenerProductores(),
          ]);

        if (!activo) return;

        setProductos(
          datosProductos.filter((producto) =>
            [1, 2, 3].includes(Number(producto.id))
          )
        );

        setCategorias(datosCategorias);
        setProductores(datosProductores);
      } catch (err) {
        if (activo) {
          setError("No se pudieron cargar los productos destacados.");
        }
      } finally {
        if (activo) setCargando(false);
      }
    };

    cargarDestacados();

    return () => {
      activo = false;
    };
  }, []);

  return (

    <div className="app">
      {/* Contenido principal */}
      <main>
        {/* Hero */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">PRODUCTOS LOCALES DE CHILOÉ</p>

            <h1>
              Descubre lo mejor de
              <span> nuestro territorio</span>
            </h1>

            <p className="hero-description">
              Conoce productos, productores y emprendimientos locales
              de Chiloé en un solo lugar.
            </p>

            {/* Buscador */}
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
                aria-label="Buscar productos"
              />
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="section" id="categorias">
          <div className="section-header">
            <div>
              <p className="eyebrow">EXPLORA</p>
              <h2>Categorías</h2>
            </div>
          </div>

          <div className="categories">
            <Link
              to="/productos?categoria=Alimentos"
              className="category-card category-link"
            >
              <img
                src={alimentosImg}
                alt="Alimentos de Chiloé"
                className="category-photo"
              />
              <span>Alimentos</span>
            </Link>

            <Link
              to="/productos?categoria=Artesanía"
              className="category-card category-link"
            >
              <img
                src={artesaniaImg}
                alt="Artesanía de Chiloé"
                className="category-photo"
              />
              <span>Artesanía</span>
            </Link>

            <Link
              to="/productos?categoria=Gastronomía"
              className="category-card category-link"
            >
              <img
                src={gastronomiaImg}
                alt="Gastronomía de Chiloé"
                className="category-photo"
              />
              <span>Gastronomía</span>
            </Link>

            <Link
              to="/productos?categoria=Ferias"
              className="category-card category-link"
            >
              <img
                src={feriasImg}
                alt="Ferias de Chiloé"
                className="category-photo"
              />
              <span>Ferias</span>
            </Link>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="section" id="productos">
          <div className="section-header">
            <div>
              <p className="eyebrow">DESCUBRE</p>
              <h2>Productos destacados</h2>
            </div>

            <Link to="/productos" className="see-more">
              Ver todos
            </Link>
          </div>

          
          <div className="products">
            {cargando && <p>Cargando productos destacados...</p>}

            {error && <p role="alert">{error}</p>}

            {!cargando && !error && productos.map((producto) => {
              const categoria = categorias.find(
                (item) => Number(item.id) === Number(producto.categoria_id)
              );

              const productor = productores.find(
                (item) => Number(item.id) === Number(producto.productor_id)
              );

              return (
                <Link
                  to={`/productos/${producto.id}`}
                  className="product-card product-card-link"
                  key={producto.id}
                >
                  <div className="product-image">
                    {imagenesDestacadas[producto.id] ? (
                      <img
                        src={imagenesDestacadas[producto.id]}
                        alt={producto.nombre}
                        loading="lazy"
                      />
                    ) : (
                      <span>Imagen no disponible</span>
                    )}
                  </div>

                  <div className="product-info">
                    <p className="product-category">
                      {categoria?.nombre || "Sin categoría"}
                    </p>

                    <h3>{producto.nombre}</h3>

                    <p className="producer">
                      {productor
                        ? `${productor.nombre}${productor.comuna ? ` · ${productor.comuna}` : ""}`
                        : "Productor no disponible"}
                      </p>

                    <div className="product-bottom">
                      <strong>
                        ${Number(producto.precio).toLocaleString("es-CL")}
                      </strong>
                      <span className="available">Disponible</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </section>

        {/* Productores */}
        <section className="producer-section" id="productores">
          <div>
            <p className="eyebrow">TERRITORIO</p>

            <h2>Conoce a quienes producen en Chiloé</h2>

            <p>
              VitrinaSur conecta a compradores con productores,
              artesanos y emprendedores locales, dando visibilidad
              a sus productos y al territorio donde se originan.
            </p>

            <Link to="/productores" className="primary-button">
             Conocer productores
            </Link>
          </div>
        </section>
      </main>

    </div>
  );
}

export default Inicio;