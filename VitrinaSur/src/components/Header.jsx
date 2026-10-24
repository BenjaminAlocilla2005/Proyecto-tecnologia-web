import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo-vitrinasur.png'

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={cerrar}>
        <img src={logo} alt="VitrinaSur" className="logo-img" />
      </Link>

      <nav
        id="menu-principal"
        className={`nav ${abierto ? 'open' : ''}`}
        aria-label="Navegación principal"
      >
        <Link to="/productos" onClick={cerrar}>Productos</Link>
        <a href="/#categorias" onClick={cerrar}>Categorías</a>
        <Link to="/productores" onClick={cerrar}>Productores</Link>
        <Link to="/agregar" onClick={cerrar}>Agregar Producto</Link>
      </nav>

      <button
        type="button"
        className="menu-button"
        aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={abierto}
        aria-controls="menu-principal"
        onClick={() => setAbierto(!abierto)}
      >
        ☰
      </button>
    </header>
  )
}