import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/vitrinasur.png";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { usuario, cerrarSesion } = useAuth();

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  const manejarCerrarSesion = () => {
    cerrarSesion();
    cerrarMenu();
  };

  return (
    <header className="header">
      <Link
        to="/"
        className="logo"
        onClick={cerrarMenu}
      >
        <img src={logo} alt="VitrinaSur" />
      </Link>

      <nav className={`nav ${menuAbierto ? "nav-open" : ""}`}>
        <Link to="/" onClick={cerrarMenu}>
          Inicio
        </Link>

        <Link to="/productos" onClick={cerrarMenu}>
         Productos
        </Link>

        <Link
          to="/categorias"
          onClick={cerrarMenu}
        >
          Categorías
        </Link>

        <Link to="/productores" onClick={cerrarMenu}>
          Productores
        </Link>

        
        {usuario ? (
          <>
            <span className="nav-usuario">
              Hola, {usuario.nombre}
            </span>

            <button
              type="button"
              className="nav-cerrar-sesion"
              onClick={manejarCerrarSesion}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={cerrarMenu}>
              Iniciar sesión
            </Link>

            <Link to="/registro" onClick={cerrarMenu}>
              Registrarse
            </Link>
          </>
        )}

      </nav>

      <button
        type="button"
        className="menu-button"
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
