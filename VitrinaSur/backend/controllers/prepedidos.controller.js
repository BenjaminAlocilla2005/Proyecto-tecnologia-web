const Prepedido = require("../models/prepedidos.model");
const Producto = require("../models/productos.model");

const crearPrepedido = async (req, res) => {
  try {
    const { productoId, nombre, telefono, cantidad } = req.body || {};

    const id = Number(productoId);

    if (!Number.isSafeInteger(id) || id < 1) {
      return res.status(400).json({
        mensaje: "Selecciona un producto válido.",
      });
    }

    if (
      typeof nombre !== "string" ||
      nombre.trim().length < 2 ||
      nombre.trim().length > 150
    ) {
      return res.status(400).json({
        mensaje: "Ingresa un nombre válido de 2 a 150 caracteres.",
      });
    }

    if (
      typeof telefono !== "string" ||
      !/^\+?[0-9]{8,12}$/.test(
        telefono.replace(/\s/g, "")
      )
    ) {
      return res.status(400).json({
        mensaje: "Ingresa un teléfono válido.",
      });
    }

    if (
      typeof cantidad !== "number" ||
      !Number.isSafeInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > 100
    ) {
      return res.status(400).json({
        mensaje: "La cantidad debe ser un entero entre 1 y 100.",
      });
    }

    const producto = await Producto.obtenerPorId(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado.",
      });
    }

    const precioUnitario = Number(producto.precio);

    if (!Number.isFinite(precioUnitario) || precioUnitario < 0) {
      throw new Error("Precio del producto inválido.");
    }

    const nuevoPrepedido = await Prepedido.crear({
      productoId: producto.id,
      nombre: nombre.trim(),
      telefono: telefono.replace(/\s/g, ""),
      cantidad,
      precioUnitario,
      total: precioUnitario * cantidad,
    });

    return res.status(201).json({
      mensaje: "Prepedido registrado correctamente.",
      prepedido: nuevoPrepedido,
    });
  } catch (error) {
    console.error("Error al registrar prepedido:", error);

    return res.status(500).json({
      mensaje: "No se pudo registrar el prepedido.",
    });
  }
};

const obtenerPrepedidos = async (req, res) => {
  try {
    const prepedidos = await Prepedido.obtenerTodos();
    return res.json(prepedidos);
  } catch (error) {
    console.error("Error al obtener prepedidos:", error);

    return res.status(500).json({
      mensaje: "No se pudieron obtener los prepedidos.",
    });
  }
};

module.exports = {
  crearPrepedido,
  obtenerPrepedidos,
};