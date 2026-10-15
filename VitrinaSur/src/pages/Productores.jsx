import "../styles/Productores.css";

const productores = [
  {
    id: 1,
    nombre: "Artesanías de Chiloé",
    comuna: "Castro",
    categoria: "Artesanía",
    descripcion:
      "Productos artesanales inspirados en la identidad chilota.",
  },
  {
    id: 2,
    nombre: "Sabores del Sur",
    comuna: "Ancud",
    categoria: "Gastronomía",
    descripcion:
      "Alimentos y preparaciones tradicionales de Chiloé.",
  },
  {
    id: 3,
    nombre: "Tejidos del Archipiélago",
    comuna: "Dalcahue",
    categoria: "Textiles",
    descripcion:
      "Tejidos artesanales elaborados con lana.",
  },
];

function Productores() {
  return (
    <main className="productores-page">
      <section className="productores-encabezado">
        <h1>Conoce a nuestros productores</h1>
        <p>
          Descubre los emprendimientos locales que mantienen
          viva la identidad y tradición de Chiloé.
        </p>
      </section>

      <section className="productores-grid">
        {productores.map((productor) => (
          <article
            className="productor-card"
            key={productor.id}
          >
            <div className="productor-imagen">
              <span>{productor.categoria}</span>
            </div>

            <div className="productor-info">
              <h2>{productor.nombre}</h2>

              <p className="productor-comuna">
                📍 {productor.comuna}
              </p>

              <p>{productor.descripcion}</p>

              <button type="button" disabled>
                Próximamente
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Productores;
