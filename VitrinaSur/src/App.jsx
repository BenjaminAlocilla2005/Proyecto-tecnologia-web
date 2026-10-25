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