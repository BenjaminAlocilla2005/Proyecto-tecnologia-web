import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState(''); // ESTADO PARA EL BUSCADOR

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/productos`).then(res => res.json()),
      fetch(`${import.meta.env.VITE_API_URL}/api/categorias`).then(res => res.json())
    ])
      .then(([datosProductos, datosCategorias]) => {
        setProductos(datosProductos);
        setCategorias(datosCategorias);
        setCargando(false);
      })
      .catch(error => {
        console.error("Error conectando a la API:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <h2 className="section" style={{ textAlign: 'center', marginTop: '50px' }}>Cargando datos...</h2>;
  }

  // Filtramos los productos según lo que se escriba en el buscador
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );
  
  // Tomamos los primeros 3 productos filtrados para destacados
  const destacados = productosFiltrados.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PRODUCTOS LOCALES DE CHILOÉ</p>
          <h1>Descubre lo mejor de<span> nuestro territorio</span></h1>
          <p className="hero-description">
            Conoce productos, productores y emprendimientos locales de Chiloé en un solo lugar.
          </p>
          
          <div className="search-box">
            <div className="search-field">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              {/* INPUT CONECTADO AL ESTADO DE BÚSQUEDA */}
              <input 
                type="text" 
                placeholder="¿Qué producto estás buscando?" 
                aria-label="Buscar productos" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
            <button type="button">Buscar</button>
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="section" id="categorias">
        <div className="section-header">
          <div>
            <p className="eyebrow">EXPLORA CATEGORÍAS</p>
            <h2>Categorías</h2>
          </div>
        </div>
        <div className="categories">
          {categorias.map((c) => (
            <Link key={c.id} to={`/categoria/${c.id}`} className="category-card">
              <span className="category-icon">{c.icono || "📦"}</span>
              <span>{c.nombre}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="section" id="productos">
        <div className="section-header">
          <div>
            <p className="eyebrow">DESCUBRE</p>
            <h2>Productos destacados</h2>
          </div>
          <Link to="/productos" className="see-more">Ver todos</Link>
        </div>

        <div className="products">
          {destacados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            destacados.map((p) => (
              <article className="product-card" key={p.id}>
                <div className="product-image" style={{ padding: 0, overflow: 'hidden' }}>
                  <img 
                    src={new URL(`../assets/${p.imagen}`, import.meta.url).href} 
                    alt={p.nombre} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                
                <div className="product-info">
                  <p className="product-category">
                    {categorias.find((c) => c.id === p.categoria_id)?.nombre}
                  </p>
                  <h3>{p.nombre}</h3>
                  <p className="producer">{p.productor} · {p.lugar}</p>
                  <div className="product-bottom">
                    <strong>${p.precio ? p.precio.toLocaleString('es-CL') : '0'}</strong>
                    <span className="available">Disponible</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* PRODUCTORES */}
      <section className="producer-section" id="productores">
        <div>
          <p className="eyebrow">TERRITORIO</p>
          <h2>Conoce a quienes producen en Chiloé</h2>
          <p>
            VitrinaSur conecta a compradores con productores, artesanos y emprendedores locales, 
            dando visibilidad a sus productos y al territorio donde se originan.
          </p>
          <Link to="/productores" className="primary-button">Conocer productores</Link>
        </div>
      </section>
    </main>
  );
}