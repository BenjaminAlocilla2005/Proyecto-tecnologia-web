const Prepedido = require("../models/prepedidos.model");
const Producto = require("../models/productos.model");

const crearPrepedido = (req, res) => {
  const { productoId, nombre, telefono, cantidad } = req.body || {};

  const id = Number(productoId);
  const cantidadNumero = Number(cantidad);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      mensaje: "Selecciona un producto válido.",
    });
  }

  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    return res.status(400).json({
      mensaje: "Ingresa un nombre válido.",
    });
  }

  if (
    typeof telefono !== "string" ||
    !/^\+?[0-9]{8,12}$/.test(telefono.replace(/\s/g, ""))
  ) {
    return res.status(400).json({
      mensaje: "Ingresa un teléfono válido.",
    });
  }

  if (
    typeof cantidad !== "number" ||
    !Number.isSafeInteger(cantidadNumero) ||
    cantidadNumero < 1 ||
    cantidadNumero > 100
  ) {
    return res.status(400).json({
      mensaje: "La cantidad debe ser un entero entre 1 y 100.",
    });
  }

  const producto = Producto.obtenerPorId(id);

  if (!producto) {
    return res.status(404).json({
      mensaje: "Producto no encontrado.",
    });
  }

  const nuevoPrepedido = Prepedido.crear({
    productoId: producto.id,
    producto: producto.nombre,
    nombre: nombre.trim(),
    telefono: telefono.replace(/\s/g, ""),
    cantidad: cantidadNumero,
    precioUnitario: producto.precio,
    total: producto.precio * cantidadNumero,
  });

  return res.status(201).json({
    mensaje: "Prepedido registrado correctamente.",
    prepedido: nuevoPrepedido,
  });
};

const obtenerPrepedidos = (req, res) => {
  res.json(Prepedido.obtenerTodos());
};

module.exports = { crearPrepedido, obtenerPrepedidos };
