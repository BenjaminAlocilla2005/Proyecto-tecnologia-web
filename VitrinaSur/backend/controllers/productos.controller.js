const Producto = require("../models/productos.model");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.obtenerTodos();
    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({
      mensaje: "Error al obtener los productos",
    });
  }
};

// Obtener un producto por su ID
const obtenerProductoPorId = async (req, res, next) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    const producto = await Producto.obtenerPorId(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
};

// Validar datos de un producto
const validarProducto = (datos) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    categoria_id,
    productor_id,
  } = datos;

  if (
    typeof nombre !== "string" ||
    !nombre.trim() ||
    nombre.length > 150
  ) {
    return "El nombre es obligatorio y debe tener máximo 150 caracteres";
  }

  if (
    typeof precio !== "number" ||
    !Number.isSafeInteger(precio) ||
    precio < 0 ||
    precio > 2147483647
  ) {
    return "El precio debe ser un número entero entre 0 y 2147483647";
  }

  if (
    descripcion != null &&
    typeof descripcion !== "string"
  ) {
    return "La descripción debe ser texto";
  }

  if (
    imagen != null &&
    typeof imagen !== "string"
  ) {
    return "La imagen debe ser una URL o ruta de texto";
  }

  if (
    categoria_id != null &&
    (!Number.isSafeInteger(categoria_id) || categoria_id <= 0)
  ) {
    return "La categoría debe tener un ID entero positivo";
  }

  if (
    productor_id != null &&
    (!Number.isSafeInteger(productor_id) || productor_id <= 0)
  ) {
    return "El productor debe tener un ID entero positivo";
  }

  return null;
};

// Validar ID de la URL
const validarId = (id) => {
  return /^[1-9]\d*$/.test(id) &&
    Number.isSafeInteger(Number(id)) &&
    Number(id) <= 2147483647;
};

// Crear producto
const crearProducto = async (req, res, next) => {
  try {
    const errorValidacion = validarProducto(req.body);

    if (errorValidacion) {
      return res.status(400).json({
        mensaje: errorValidacion,
      });
    }

    const producto = await Producto.crear(req.body);

    return res.status(201).json({
      mensaje: "Producto creado correctamente",
      producto,
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar producto
const actualizarProducto = async (req, res, next) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    const errorValidacion = validarProducto(req.body);

    if (errorValidacion) {
      return res.status(400).json({
        mensaje: errorValidacion,
      });
    }

    const producto = await Producto.actualizar(
      req.params.id,
      req.body
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Producto actualizado correctamente",
      producto,
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar producto
const eliminarProducto = async (req, res, next) => {
  try {
    if (!validarId(req.params.id)) {
      return res.status(400).json({
        mensaje: "ID de producto inválido",
      });
    }

    const producto = await Producto.eliminar(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Producto eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};