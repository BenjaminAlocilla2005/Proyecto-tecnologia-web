import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductores } from "../services/api";
import "../styles/Productores.css";


function Productores() {
  const [productores, setProductores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarProductores = async () => {
      try {
        const datos = await obtenerProductores();
        setProductores(datos);
      } catch (error) {
        console.error("Error al cargar productores:", error);
        setError("No se pudieron cargar los productores.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductores();
  }, []);

  return (

    <main className="productores-page">
      <section className="productores-encabezado">
        <h1>Conoce a nuestros productores</h1>
        <p>
          Descubre los emprendimientos locales que mantienen
          viva la identidad y tradición de Chiloé.
        </p>
      </section>

      {cargando && (
        <p className="sin-resultados">
          Cargando productores...
        </p>
      )}

      {error && (
        <p className="sin-resultados" role="alert">
          {error}
        </p>
      )}

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

              
              <Link to={`/productos?categoria=${encodeURIComponent(productor.categoria)}`} className="productor-boton">
                Ver productos
              </Link>

            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Productores;
