const Categoria = require("../models/categorias.model");

// Obtener todas las categorías desde PostgreSQL
const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.obtenerTodos();

    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);

    res.status(500).json({
      mensaje: "Error al obtener las categorías",
    });
  }
};

module.exports = {
  obtenerCategorias,
};