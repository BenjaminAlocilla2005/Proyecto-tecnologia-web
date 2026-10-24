import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");

    if (nombre.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return;
    }

    if (password !== confirmarPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 12) {
      setError("La contraseña debe tener al menos 12 caracteres");
      return;
    }

    if (new TextEncoder().encode(password).length > 72) {
      setError("La contraseña no puede superar 72 bytes");
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(
        "http://localhost:3001/api/auth/registro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: nombre.trim(),
            email: email.trim().toLowerCase(),
            password,
          }),
        }
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.mensaje || "No se pudo registrar el usuario"
        );
      }

      navigate("/login", {
        state: {
          mensaje: "Cuenta creada correctamente. Ya puedes iniciar sesión.",
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p>Regístrate para formar parte de VitrinaSur</p>

        <form onSubmit={manejarRegistro}>
          <label htmlFor="registro-nombre">
            Nombre completo
          </label>
          <input
            id="registro-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            minLength={2}
            maxLength={150}
            autoComplete="name"
            required
          />

          <label htmlFor="registro-email">
            Correo electrónico
          </label>
          <input
            id="registro-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            autoComplete="email"
            required
          />

          <label htmlFor="registro-password">
            Contraseña
          </label>
          <div className="password-container">
            <input
              id="registro-password"
              type={mostrarPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={12}
              autoComplete="new-password"
              required
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

          <label htmlFor="registro-confirmar">
            Confirmar contraseña
          </label>
          <div className="password-container">
            <input
              id="registro-confirmar"
              type={mostrarConfirmacion ? "text" : "password"}
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarConfirmacion(!mostrarConfirmacion)}
              aria-label={mostrarConfirmacion ? "Ocultar contraseña" : "Mostrar contraseña"}
              aria-pressed={mostrarConfirmacion}
            >
              {mostrarConfirmacion ? "🙈" : "👁️"}
            </button>
          </div>

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" disabled={cargando}>
            {cargando ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </main>
  );
}

export default Registro;
