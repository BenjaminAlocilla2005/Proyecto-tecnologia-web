<<<<<<< HEAD
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductores } from "../services/api";
import "../styles/productores.css";
import productoresImg from "../assets/productores/productores-chiloe.jpg";
import artesanasImg from "../assets/productores/artesanas-chiloe.jpg";
import emprendimientosImg from "../assets/productores/emprendimientos-locales.jpg";

const imagenesProductores = {
  1: productoresImg,
  2: artesanasImg,
  3: emprendimientosImg,
};

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
              {imagenesProductores[productor.id] ? (
                <img
                  src={imagenesProductores[productor.id]}
                  alt={productor.nombre}
                  loading="lazy"
                />
              ) : (
                <span>{productor.categoria}</span>
              )}
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
=======
import { useState, useEffect } from 'react'
import { getJSON } from '../api'

export default function Productores() {
  const [productores, setProductores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getJSON('/api/productores')
      .then(setProductores)
      .catch((err) => {
        console.error(err)
        setError('No pudimos cargar los productores. Intenta nuevamente en unos segundos.')
      })
      .finally(() => setCargando(false))
  }, [])

  return (
    <main className="section">
      <div className="section-header">
        <div>
          <p className="eyebrow">TERRITORIO</p>
          <h1 className="page-title">Productores</h1>
        </div>
      </div>

      {cargando && <div className="loader" role="status" aria-label="Cargando productores" />}
      {error && <p className="state-message error-text" role="alert">{error}</p>}

      {!cargando && !error && (
        <div className="products">
          {productores.length === 0 ? (
            <p>Aún no hay productores registrados.</p>
          ) : (
            productores.map((p) => (
              <article className="product-card" key={p.id}>
                <div className="product-info">
                  <p className="product-category">{p.rubro}</p>
                  <h3>{p.nombre}</h3>
                  <p className="producer">{p.lugar}</p>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </main>
  )
}
>>>>>>> Rama-Benjamin
