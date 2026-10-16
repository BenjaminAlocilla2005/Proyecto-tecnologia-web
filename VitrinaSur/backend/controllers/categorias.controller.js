const Categoria = require("../models/categorias.model");

// Obtener todas las categorías
const obtenerCategorias = (req, res) => {
  const categorias = Categoria.obtenerTodos();
  res.json(categorias);
};

module.exports = {
  obtenerCategorias,
};
