import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/vitrinasur.png";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={cerrarMenu}>
        <img src={logo} alt="VitrinaSur" />
      </Link>

      <nav className={`nav ${menuAbierto ? "nav-open" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        <Link to="/#productos" onClick={cerrarMenu}>
          Productos
        </Link>

        <Link to="/categorias/alimentos" onClick={cerrarMenu}>
          Categorías
        </Link>

        <Link to="/productores" onClick={cerrarMenu}>
          Productores
        </Link>
      </nav>

      <button
        className="menu-button"
        type="button"
        aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuAbierto}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        {menuAbierto ? "✕" : "☰"}
      </button>
    </header>
  );
}

export default Navbar;
