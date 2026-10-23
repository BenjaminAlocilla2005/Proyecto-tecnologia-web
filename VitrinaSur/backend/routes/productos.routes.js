const express = require("express");
const router = express.Router();

const {
  obtenerProductos,
  obtenerProductoPorId,
} = require("../controllers/productos.controller");

// Obtener todos los productos
router.get("/", obtenerProductos);

// Obtener un producto por ID
router.get("/:id", obtenerProductoPorId);

module.exports = router;