import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// 1. Importamos la imagen
import imagenMiel from '../assets/miel-ulmo.jpg';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setCargando(false);
      });
  }, []);

  if (cargando) return <p className="section">Cargando productos...</p>;

  return (
    <section className="section">
      <div className="section-header" style={{ marginBottom: '30px' }}>
        <div>
          <p className="eyebrow">CATÁLOGO COMPLETO</p>
          <h2>Todos los productos</h2>
        </div>
      </div>

      <div className="products">
        {productos.map((p) => (
          <article className="product-card" key={p.id}>
            
                          {/* 2. AQUÍ SE RENDERIZA LA IMAGEN REAL */}
              <div className="product-image" style={{ padding: 0, overflow: 'hidden' }}>
                {p.imagen ? (
                  <img 
                    src={new URL(`../assets/${p.imagen}`, import.meta.url).href} 
                    alt={p.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>

            <div className="product-info">
              <h3>{p.nombre}</h3>
              <p className="producer">{p.productor} · {p.lugar}</p>
              <div className="product-bottom">
                <strong>${p.precio ? p.precio.toLocaleString('es-CL') : '0'}</strong>
                <span className="available">Disponible</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}