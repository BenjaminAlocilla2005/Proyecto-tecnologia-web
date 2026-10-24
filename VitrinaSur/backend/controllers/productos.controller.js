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
const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await Producto.obtenerPorId(req.params.id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado",
      });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    res.status(500).json({
      mensaje: "Error al obtener el producto",
    });
  }
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
};