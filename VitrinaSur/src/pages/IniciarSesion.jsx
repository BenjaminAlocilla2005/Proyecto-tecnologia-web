import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function IniciarSesion() {
  const navigate = useNavigate();
  const location = useLocation();
  const mensajeRegistro = location.state?.mensaje;
  const { iniciarSesion } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:3001/api/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || "No se pudo iniciar sesión"
        );
      }

      // Guardar únicamente datos no sensibles del usuario.
      // El token se mantiene en memoria durante esta etapa.
      iniciarSesion(datos.usuario, datos.token);

      // Implementaremos la gestión segura del token
      // antes de habilitar acciones autenticadas.
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p>Bienvenido nuevamente a VitrinaSur</p>

        {mensajeRegistro && (
          <p className="auth-success" role="status">
            {mensajeRegistro}
          </p>
        )}

        <form onSubmit={manejarEnvio}>
          <label htmlFor="login-email">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="login-password">
            Contraseña
          </label>
          <div className="password-container">
            <input
              id="login-password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarPassword(!mostrarPassword)}
              aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={mostrarPassword}
            >
              {mostrarPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p role="alert" className="auth-error">{error}</p>}

          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p>
          ¿No tienes una cuenta?{" "}
          <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </main>
  );
}

export default IniciarSesion;
