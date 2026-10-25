<<<<<<< HEAD
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Productores from "./pages/Productores";
import Categorias from "./pages/Categorias";
import DetalleProducto from "./pages/DetalleProducto";
import Prepedido from "./pages/Prepedido";
import "./App.css";
import IniciarSesion from "./pages/IniciarSesion";
import Registro from "./pages/Registro";
import "./styles/Auth.css";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/prepedido/:id" element={<Prepedido />} />
        <Route path="/login" element={<IniciarSesion />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="*"
          element={
            <main style={{ textAlign: "center", padding: "80px 20px" }}>
              <h1>Página no encontrada</h1>
              <p>La página que buscas no existe.</p>
              <Link to="/">Volver al inicio</Link>
            </main>
          }
        />
      </Routes>

      <footer className="footer">
        <strong>VitrinaSur</strong>
        <p>Vitrina comercial territorial de Chiloé</p>
      </footer>
    </div>
  );
}

export default App;
=======
import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Categoria from './pages/Categoria'
import Productores from './pages/Productores'
import AgregarProducto from './pages/AgregarProducto'

// Sube al inicio al cambiar de página y baja a #seccion cuando la ruta lleva hash
function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // la sección puede aparecer después de que cargue la API: reintenta hasta 4 s
    let intentos = 0
    const timer = setInterval(() => {
      const el = document.getElementById(hash.slice(1))
      intentos += 1
      if (el) {
        el.scrollIntoView()
        clearInterval(timer)
      } else if (intentos >= 40) {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [pathname, hash, key])

  return null
}

function NoEncontrada() {
  return (
    <main className="section">
      <h1 className="page-title">Página no encontrada</h1>
      <p><Link to="/">Volver al inicio</Link></p>
    </main>
  )
}

export default function App() {
  return (
    <div className="app">
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categoria/:id" element={<Categoria />} />
        <Route path="/productores" element={<Productores />} />
        <Route path="/agregar" element={<AgregarProducto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Routes>
      <Footer />
    </div>
  )
}
>>>>>>> Rama-Benjamin
