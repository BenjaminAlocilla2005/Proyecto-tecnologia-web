import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Categoria() {
  const { id } = useParams();
  const [lista, setLista] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('Cargando categoría...');

  useEffect(() => {
    // 1. Traemos los productos de la API
    fetch(`${import.meta.env.VITE_API_URL}/api/productos`)
      .then(res => res.json())
      .then(data => {
        // 2. Filtramos los que coincidan con el ID de la URL (categoria_id o categoria)
        const filtrados = data.filter((p) => p.categoria == id || p.categoria_id == id);
        setLista(filtrados);
      })
      .catch(err => console.error("Error cargando productos:", err));

    // 3. (Opcional pero recomendado) Traemos las categorías para mostrar el nombre real
    fetch(`${import.meta.env.VITE_API_URL}/api/categorias`)
      .then(res => res.json())
      .then(data => {
        const cat = data.find(c => c.id == id);
        if (cat) setNombreCategoria(cat.nombre);
        else setNombreCategoria('Categoría no encontrada');
      })
      .catch(() => setNombreCategoria('Categoría'));
  }, [id]);

  return (
    <section className="section">
      <h2>{nombreCategoria}</h2>
      <div className="products">
        {lista.length === 0 ? <p>No hay productos en esta categoría.</p> : 
          lista.map((p) => (
            <div className="product-card" key={p.id}>
              <div className="product-image" style={{ padding: 0, overflow: 'hidden' }}>
                <img 
                  src={new URL(`../assets/${p.imagen}`, import.meta.url).href} 
                  alt={p.nombre} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <div className="product-info">
                <h3>{p.nombre}</h3>
                <p className="producer">{p.productor} · {p.lugar}</p>
              </div>
            </div>
          ))
        }
      </div>
    </section>
  );
}