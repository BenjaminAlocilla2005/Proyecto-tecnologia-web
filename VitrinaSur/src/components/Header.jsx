import { Link } from 'react-router-dom'
import logo from '../assets/logo-vitrinasur.png'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="VitrinaSur" className="logo-img" />
      </Link>

      <nav className="nav">
        <Link to="/productos">Productos</Link>
        <a href="/#categorias">Categorías</a>
        <Link to="/productores">Productores</Link>
      </nav>

      <button className="menu-button" aria-label="Abrir menú">
        ☰
      </button>
    </header>
  )
}