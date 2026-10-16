const Productor = require("../models/productores.model");

// Obtener todos los productores
const obtenerProductores = (req, res) => {
  const productores = Productor.obtenerTodos();
  res.json(productores);
};

module.exports = {
  obtenerProductores,
};
