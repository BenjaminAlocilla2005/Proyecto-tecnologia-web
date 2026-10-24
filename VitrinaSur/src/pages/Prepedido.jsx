import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  obtenerProductoPorId,
  registrarPrepedido,
} from "../services/api";
import "../styles/Prepedido.css";

function Prepedido() {
  const { id } = useParams();

  const [producto, setProducto] = useState(null);
  const [cargandoProducto, setCargandoProducto] = useState(true);
  const [errorProducto, setErrorProducto] = useState("");

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [prepedidoRegistrado, setPrepedidoRegistrado] = useState(null);

  const enviandoRef = useRef(false);

  useEffect(() => {
    let activo = true;

    const cargarProducto = async () => {
      setCargandoProducto(true);
      setErrorProducto("");
      setProducto(null);
      setConfirmado(false);
      setMostrarResumen(false);
      setErrorEnvio("");
      setPrepedidoRegistrado(null);
      setNombre("");
      setTelefono("");
      setCantidad(1);
      setErrores({});

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

  const obtenerError = (campo, valor) => {
    if (campo === "nombre") {
      if (valor.trim().length < 2) {
        return "Ingresa un nombre de al menos 2 caracteres.";
      }
    }

    if (campo === "telefono") {
      const telefonoLimpio = valor.replace(/\s/g, "");

      if (!/^\+?[0-9]{8,12}$/.test(telefonoLimpio)) {
        return "Ingresa un teléfono válido de 8 a 12 dígitos.";
      }
    }

    if (campo === "cantidad") {
      if (
        !Number.isSafeInteger(valor) ||
        valor < 1 ||
        valor > 100
      ) {
        return "La cantidad debe ser un entero entre 1 y 100.";
      }
    }

    return "";
  };

  const validarCampo = (campo, valor) => {
    setErrores((anteriores) => ({
      ...anteriores,
      [campo]: obtenerError(campo, valor),
    }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {
      nombre: obtenerError("nombre", nombre),
      telefono: obtenerError("telefono", telefono),
      cantidad: obtenerError("cantidad", cantidad),
    };

    setErrores(nuevosErrores);

    return !Object.values(nuevosErrores).some(Boolean);
  };

  const enviarPrepedido = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setErrorEnvio("");
    setMostrarResumen(true);
  };

  const confirmarPrepedido = async () => {
    if (enviandoRef.current || !producto) {
      return;
    }

    if (!validarFormulario()) {
      setMostrarResumen(false);
      return;
    }

    enviandoRef.current = true;
    setCargando(true);
    setErrorEnvio("");

    try {
      const resultado = await registrarPrepedido({
        productoId: producto.id,
        nombre: nombre.trim(),
        telefono: telefono.replace(/\s/g, ""),
        cantidad,
      });

      setPrepedidoRegistrado(resultado.prepedido);
      setConfirmado(true);
      setMostrarResumen(false);
    } catch (error) {
      setErrorEnvio(
        error.message || "No se pudo registrar el prepedido."
      );
    } finally {
      enviandoRef.current = false;
      setCargando(false);
    }
  };

  if (cargandoProducto) {
    return (
      <main className="prepedido-contenedor">
        <p role="status">
          Cargando información del producto...
        </p>
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
          {errorProducto ||
            "El producto solicitado no está disponible."}
        </p>

        <Link to="/productos" className="volver-inicio">
          ← Volver a productos
        </Link>
      </main>
    );
  }

  const total = producto.precio * cantidad;

  return (
    <main className="prepedido-contenedor">
      <Link
        to={`/productos/${id}`}
        className="volver-inicio"
      >
        ← Volver al producto
      </Link>

      <h1>Realizar prepedido</h1>

      <p>
        Completa tus datos para solicitar este producto
        de emprendedores locales de Chiloé.
      </p>

      {mostrarResumen && !confirmado && (
        <div
          className="prepedido-resumen"
          role="region"
          aria-label="Resumen del prepedido"
        >
          <h2>Revisa tu prepedido</h2>

          <p>
            <strong>Producto:</strong> {producto.nombre}
          </p>
          <p>
            <strong>Nombre:</strong> {nombre.trim()}
          </p>
          <p>
            <strong>Teléfono:</strong> {telefono}
          </p>
          <p>
            <strong>Cantidad:</strong> {cantidad}
          </p>

          <p className="resumen-total">
            <strong>
              Total: ${total.toLocaleString("es-CL")}
            </strong>
          </p>

          {errorEnvio && (
            <p className="campo-error" role="alert">
              {errorEnvio}
            </p>
          )}

          <div className="resumen-acciones">
            <button
              type="button"
              className="resumen-volver"
              disabled={cargando}
              onClick={() => {
                setErrorEnvio("");
                setMostrarResumen(false);
              }}
            >
              Modificar datos
            </button>

            <button
              type="button"
              className="prepedido-boton"
              disabled={cargando}
              aria-busy={cargando}
              onClick={confirmarPrepedido}
            >
              {cargando
                ? "Registrando prepedido..."
                : "Confirmar prepedido"}
            </button>
          </div>
        </div>
      )}

      {confirmado ? (
        <div
          className="prepedido-confirmacion"
          role="status"
        >
          <h2>¡Prepedido registrado!</h2>

          <p>
            Tu solicitud fue registrada correctamente.
          </p>

          {prepedidoRegistrado && (
            <>
              <p>
                <strong>Número de solicitud:</strong>{" "}
                {prepedidoRegistrado.id}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                {prepedidoRegistrado.estado}
              </p>
              <p>
                <strong>Total:</strong> $
                {prepedidoRegistrado.total.toLocaleString("es-CL")}
              </p>
            </>
          )}

          <Link
            to="/productos"
            className="prepedido-boton"
          >
            Volver a productos
          </Link>
        </div>
      ) : (
        <form
          onSubmit={enviarPrepedido}
          noValidate
          className="prepedido-formulario"
        >
          <h2>{producto.nombre}</h2>

          <p>
            Precio unitario:{" "}
            <strong>
              ${producto.precio.toLocaleString("es-CL")}
            </strong>
          </p>

          <label htmlFor="nombre">
            Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            disabled={mostrarResumen}
            onChange={(e) => {
              const valor = e.target.value;
              setNombre(valor);
              validarCampo("nombre", valor);
            }}
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

          <label htmlFor="telefono">
            Teléfono de contacto
          </label>
          <input
            id="telefono"
            type="tel"
            value={telefono}
            disabled={mostrarResumen}
            onChange={(e) => {
              const valor = e.target.value;
              setTelefono(valor);
              validarCampo("telefono", valor);
            }}
            placeholder="Ej: +56912345678"
            required
            aria-invalid={Boolean(errores.telefono)}
          />

          {errores.telefono && (
            <p className="campo-error" role="alert">
              {errores.telefono}
            </p>
          )}

          <label htmlFor="cantidad">
            Cantidad
          </label>
          <input
            id="cantidad"
            type="number"
            min="1"
            max="100"
            step="1"
            value={cantidad}
            disabled={mostrarResumen}
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
            <strong>
              ${total.toLocaleString("es-CL")}
            </strong>
          </div>

          <button
            type="submit"
            className="prepedido-boton"
            disabled={mostrarResumen || cargando}
          >
            Revisar prepedido
          </button>
        </form>
      )}
    </main>
  );
}

export default Prepedido;