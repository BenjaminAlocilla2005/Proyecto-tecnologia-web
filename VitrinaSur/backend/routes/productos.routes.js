const express = require("express");
const router = express.Router();

const {
  obtenerProductos,
} = require("../controllers/productos.controller");

// Ruta para obtener todos los productos
router.get("/", obtenerProductos);

module.exports = router;
