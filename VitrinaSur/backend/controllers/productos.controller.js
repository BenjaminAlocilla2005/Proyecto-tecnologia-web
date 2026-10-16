const Producto = require("../models/productos.model");

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  const productos = Producto.obtenerTodos();
  res.json(productos);
};

module.exports = {
  obtenerProductos,
};
