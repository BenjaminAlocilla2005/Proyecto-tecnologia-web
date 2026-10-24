import { useState, useEffect } from 'react';

export default function Productores() {
  const [productores, setProductores] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/productores`)
      .then(res => res.json())
      .then(data => setProductores(data))
      .catch(err => console.error("Error cargando productores:", err));
  }, []);

  return (
    <section className="section">
      <h2>Productores</h2>
      <div className="products">
        {productores.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-info">
              <p className="product-category">{p.rubro}</p>
              <h3>{p.nombre}</h3>
              <p className="producer">{p.lugar}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}