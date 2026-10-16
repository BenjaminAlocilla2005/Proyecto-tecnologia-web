import { Link } from "react-router-dom";
import "../styles/Categorias.css";


const categorias = [
  {
    id: 1,
    nombre: "Artesanía",
    descripcion: "Creaciones artesanales con identidad chilota.",
    icono: "🧶",
    filtro: "Artesanía",
  },
  {
    id: 2,
    nombre: "Gastronomía",
    descripcion: "Sabores y preparaciones tradicionales.",
    icono: "🍲",
    filtro: "Gastronomía",
  },
  {
    id: 3,
    nombre: "Alimentos locales",
    descripcion: "Productos de origen local.",
    icono: "🥔",
    filtro: "Alimentos",
  },
  {
    id: 4,
    nombre: "Textiles",
    descripcion: "Tejidos y prendas artesanales.",
    icono: "🧣",
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
            <div className="categoria-icono">
              {categoria.icono}
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
