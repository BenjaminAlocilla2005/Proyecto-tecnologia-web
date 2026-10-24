import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);

  useEffect(() => {
    let activo = true;

    const recuperarSesion = async () => {
      try {
        const respuesta = await fetch(
          "http://localhost:3001/api/auth/me",
          {
            credentials: "include",
          }
        );

        if (!respuesta.ok) {
          throw new Error("No hay sesión activa");
        }

        const datos = await respuesta.json();

        if (activo) {
          setSesion({
            usuario: datos.usuario,
            token: null,
          });
        }
      } catch {
        if (activo) {
          setSesion(null);
        }
      } finally {
        if (activo) {
          setCargandoSesion(false);
        }
      }
    };

    recuperarSesion();

    return () => {
      activo = false;
    };
  }, []);

  const iniciarSesion = (usuario, token) => {
    setSesion({ usuario, token });
  };

  const cerrarSesion = async () => {
    try {
      const respuesta = await fetch(
        "http://localhost:3001/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo cerrar la sesión");
      }

      setSesion(null);
      sessionStorage.removeItem("usuario");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar la sesión. Inténtalo nuevamente.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        usuario: sesion?.usuario ?? null,
        token: sesion?.token ?? null,
        cargandoSesion,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);

  if (!contexto) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return contexto;
}