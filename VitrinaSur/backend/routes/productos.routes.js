const express = require("express");
const router = express.Router();

const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require("../controllers/productos.controller");

const {
  verificarToken,
  soloAdministrador,
} = require("../middleware/auth.middleware");

// Obtener todos los productos
router.get("/", obtenerProductos);

// Obtener producto por ID
router.get("/:id", obtenerProductoPorId);

// Crear producto
router.post("/", verificarToken, soloAdministrador, crearProducto);

// Actualizar producto
router.put("/:id", verificarToken, soloAdministrador, actualizarProducto);

// Eliminar producto
router.delete("/:id", verificarToken, soloAdministrador, eliminarProducto);

module.exports = router;