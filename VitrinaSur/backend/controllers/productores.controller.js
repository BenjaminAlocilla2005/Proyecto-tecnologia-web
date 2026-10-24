const Productor = require("../models/productores.model");

// Obtener todos los productores desde PostgreSQL
const obtenerProductores = async (req, res) => {
  try {
    const productores = await Productor.obtenerTodos();

    res.json(productores);
  } catch (error) {
    console.error("Error al obtener productores:", error);

    res.status(500).json({
      mensaje: "Error al obtener los productores",
    });
  }
};

module.exports = {
  obtenerProductores,
};