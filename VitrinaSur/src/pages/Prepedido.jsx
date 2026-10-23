import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/api";
import "../styles/Prepedido.css";

function Prepedido() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargandoProducto, setCargandoProducto] = useState(true);
  const [errorProducto, setErrorProducto] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargandoProducto(true);
      setErrorProducto("");
      setProducto(null);

      try {
        const datos = await obtenerProductoPorId(id);

        if (activo) {
          setProducto(datos);
        }
      } catch (error) {
        if (activo) {
          setErrorProducto(error.message);
        }
      } finally {
        if (activo) {
          setCargandoProducto(false);
        }
      }
    };

    cargarProducto();

    return () => {
      activo = false;
    };
  }, [id]);


  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const validarCampo = (campo, valor) => {
    let mensaje = "";

    if (campo === "nombre") {
      if (valor.trim().length < 2) {
        mensaje = "Ingresa un nombre de al menos 2 caracteres.";
      }
    }

    if (campo === "telefono") {
      const telefonoLimpio = valor.replace(/\s/g, "");

      if (!/^\+?[0-9]{8,12}$/.test(telefonoLimpio)) {
        mensaje = "Ingresa un teléfono válido de 8 a 12 dígitos.";
      }
    }

    if (campo === "cantidad") {
      if (!Number.isInteger(valor) || valor < 1) {
        mensaje = "La cantidad debe ser un entero mayor a cero.";
      }
    }

    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: mensaje,
    }));
  };


  if (cargandoProducto) {
    return (
      <main className="prepedido-contenedor">
        <p role="status">Cargando información del producto...</p>
      </main>
    );
  }

  if (errorProducto || !producto) {
    return (
      <main className="prepedido-contenedor">
        <h1>
          {errorProducto === "Producto no encontrado"
            ? "Producto no encontrado"
            : "No se pudo cargar el producto"}
        </h1>

        <p role="alert">
          {errorProducto || "El producto solicitado no está disponible."}
        </p>

        <Link to="/productos" className="volver-inicio">
          ← Volver a productos
        </Link>
      </main>
    );
  }

  const total = producto.precio * cantidad;

  
  const enviarPrepedido = (e) => {
    e.preventDefault();

    const nuevosErrores = {};
    const telefonoLimpio = telefono.replace(/\s/g, "");

    if (nombre.trim().length < 2) {
      nuevosErrores.nombre =
        "Ingresa un nombre de al menos 2 caracteres.";
    }

    if (!/^\+?[0-9]{8,12}$/.test(telefonoLimpio)) {
      nuevosErrores.telefono =
        "Ingresa un teléfono válido de 8 a 12 dígitos.";
    }

    if (
      !Number.isInteger(cantidad) ||
      cantidad < 1
    ) {
      nuevosErrores.cantidad =
        "La cantidad debe ser un número entero mayor a cero.";
    }

    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length > 0) {
      return;
    }

    // Demostración: todavía no existe envío al backend.
    setMostrarResumen(true);
  };


  return (
    <main className="prepedido-contenedor">
      <Link to={`/productos/${id}`} className="volver-inicio">
        ← Volver al producto
      </Link>

      <h1>Realizar prepedido</h1>
      <p>
        Completa tus datos para solicitar este producto
        de emprendedores locales de Chiloé.
      </p>
      
      {mostrarResumen && !confirmado && (
        <div className="prepedido-resumen" role="region" aria-label="Resumen del prepedido">
          <h2>Revisa tu prepedido</h2>

          <p><strong>Producto:</strong> {producto.nombre}</p>
          <p><strong>Nombre:</strong> {nombre.trim()}</p>
          <p><strong>Teléfono:</strong> {telefono}</p>
          <p><strong>Cantidad:</strong> {cantidad}</p>

          <p className="resumen-total">
            <strong>
              Total: ${total.toLocaleString("es-CL")}
            </strong>
          </p>

          <p className="resumen-aviso">
            Esta es una demostración. No se enviará
            ninguna solicitud al productor.
          </p>

          <div className="resumen-acciones">
            <button
              type="button"
              className="resumen-volver"
              onClick={() => setMostrarResumen(false)}
            >
              Modificar datos
            </button>

            <button
              type="button"
              className="prepedido-boton"
              disabled={cargando}
              aria-busy={cargando}
              onClick={() => {
                if (cargando) return;

                setCargando(true);

                // Simulación local: no se envían datos.
                setTimeout(() => {
                  setConfirmado(true);
                  setMostrarResumen(false);
                  setCargando(false);
                }, 1500);
              }}
            >
              {cargando ? "Preparando solicitud..." : "Confirmar demostración"}
            </button>
          </div>
        </div>
      )}

      {confirmado ? (
        <div className="prepedido-confirmacion" role="status">
          <h2>¡Solicitud preparada!</h2>
          <p>
            Este es un prepedido de demostración.
            Aún no se ha enviado ni guardado.
          </p>
          <Link to="/productos" className="prepedido-boton">
            Volver a productos
          </Link>
        </div>
      ) : (
        <form onSubmit={enviarPrepedido} noValidate className="prepedido-formulario">
          <h2>{producto.nombre}</h2>

          <p>
            Precio unitario:
            <strong>
              {" "}${producto.precio.toLocaleString("es-CL")}
            </strong>
          </p>

          <label htmlFor="nombre">Nombre completo</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => {const valor = e.target.value;setNombre(valor);validarCampo("nombre", valor);}}
            placeholder="Ingresa tu nombre"
            minLength={2}
            required
            aria-invalid={Boolean(errores.nombre)}
          />
          {errores.nombre && (
            <p className="campo-error" role="alert">
              {errores.nombre}
            </p>
          )}

          <label htmlFor="telefono">Teléfono de contacto</label>
          <input
            id="telefono"
            type="tel"
            value={telefono}
            onChange={(e) => {const valor = e.target.value;setTelefono(valor);validarCampo("telefono", valor);}}
            placeholder="Ej: +56912345678"
            pattern="\+?[0-9]{8,12}"
            title="Ingresa entre 8 y 12 dígitos, opcionalmente con + al inicio"
            required
            aria-invalid={Boolean(errores.telefono)}
          />
          {errores.telefono && (
            <p className="campo-error" role="alert">
              {errores.telefono}
            </p>
          )}

          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            step="1"
            value={cantidad}
            onChange={(e) => {
              const valor = Number(e.target.value);
              
              setCantidad(valor);
              validarCampo("cantidad", valor);
            }}
            required
            aria-invalid={Boolean(errores.cantidad)}
          />
          {errores.cantidad && (
            <p className="campo-error" role="alert">
              {errores.cantidad}
            </p>
          )}

          <div className="prepedido-total">
            <span>Total estimado</span>
            <strong>${total.toLocaleString("es-CL")}</strong>
          </div>

          <button type="submit" className="prepedido-boton">
            Confirmar prepedido
          </button>
        </form>
      )}
    </main>
  );
}

export default Prepedido;
