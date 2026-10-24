import { Link } from "react-router-dom";
import "../styles/Categorias.css";
import artesaniaImg from "../assets/categorias/artesania.jpg";
import gastronomiaImg from "../assets/categorias/gastronomia.jpg";
import alimentosLocalesImg from "../assets/categorias/alimentos-locales.jpg";
import textilesImg from "../assets/categorias/textiles.jpg";

const categorias = [
  {
    id: 1,
    nombre: "Artesanía",
    descripcion: "Creaciones artesanales con identidad chilota.",
    imagen: artesaniaImg,
    filtro: "Artesanía",
  },
  {
    id: 2,
    nombre: "Gastronomía",
    descripcion: "Sabores y preparaciones tradicionales.",
    imagen: gastronomiaImg,
    filtro: "Gastronomía",
  },
  {
    id: 3,
    nombre: "Alimentos locales",
    descripcion: "Productos de origen local.",
    imagen: alimentosLocalesImg,
    filtro: "Alimentos",
  },
  {
    id: 4,
    nombre: "Textiles",
    descripcion: "Tejidos y prendas artesanales.",
    imagen: textilesImg,
    filtro: "Artesanía",
  },
];

function Categorias() {
  return (
    <main className="categorias-page">
      <section className="categorias-encabezado">
        <h1>Explora nuestras categorías</h1>
        <p>
          Descubre productos únicos de los emprendedores
          y productores del archipiélago de Chiloé.
        </p>
      </section>

      <section className="categorias-grid">
        {categorias.map((categoria) => (
          <Link to={`/productos?categoria=${encodeURIComponent(categoria.filtro)}`}
            className="categoria-card categoria-card-link"
            key={categoria.id}
          >
            <div className="categoria-imagen">
              <img
                src={categoria.imagen}
                alt={`Categoría ${categoria.nombre}`}
                loading="lazy"
              />
            </div>

            <h2>{categoria.nombre}</h2>
            <p>{categoria.descripcion}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Categorias;
