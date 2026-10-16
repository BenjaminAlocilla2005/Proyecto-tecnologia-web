import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/Prepedido.css";

const productos = [
  { id: 1, nombre: "Mermelada artesanal", precio: 5000 },
  { id: 2, nombre: "Tejido tradicional", precio: 15000 },
  { id: 3, nombre: "Producto del mar", precio: 8000 },
];

function Prepedido() {
  const { id } = useParams();
  const producto = productos.find(
    (item) => item.id === Number(id)
  );

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [confirmado, setConfirmado] = useState(false);
  const [errores, setErrores] = useState({});

  if (!producto) {
    return (
      <main className="prepedido-contenedor">
        <h1>Producto no encontrado</h1>
        <Link to="/productos">Volver a productos</Link>
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
    setConfirmado(true);
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
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa tu nombre"
            minLength={2}
            required
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
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ej: +56912345678"
            pattern="\+?[0-9]{8,12}"
            title="Ingresa entre 8 y 12 dígitos, opcionalmente con + al inicio"
            required
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
            onChange={(e) => setCantidad(Number(e.target.value))}
            required
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
