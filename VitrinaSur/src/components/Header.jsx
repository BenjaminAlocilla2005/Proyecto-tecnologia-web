import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo-vitrinasur.png'

export default function Header() {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={cerrar}>
        <img src={logo} alt="VitrinaSur, ir al inicio" className="logo-img" />
      </Link>

      <nav
        id="menu-principal"
        className={`nav ${abierto ? 'open' : ''}`}
        aria-label="Navegación principal"
      >
        <NavLink to="/productos" onClick={cerrar}>Productos</NavLink>
        <Link to="/#categorias" onClick={cerrar}>Categorías</Link>
        <NavLink to="/productores" onClick={cerrar}>Productores</NavLink>
        <NavLink to="/agregar" onClick={cerrar}>Agregar Producto</NavLink>
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