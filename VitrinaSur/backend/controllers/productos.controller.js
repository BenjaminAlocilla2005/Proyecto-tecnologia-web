const Producto = require("../models/productos.model");

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  const productos = Producto.obtenerTodos();
  res.json(productos);
};

// Obtener un producto específico
const obtenerProductoPorId = (req, res) => {
  const producto = Producto.obtenerPorId(req.params.id);

  if (!producto) {
    return res.status(404).json({
      mensaje: "Producto no encontrado",
    });
  }

  res.json(producto);
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
};