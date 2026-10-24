const express = require("express");
const router = express.Router();

const {
  crearPrepedido,
  obtenerPrepedidos,
} = require("../controllers/prepedidos.controller");

router.post("/", crearPrepedido);

// Ruta de consulta para pruebas locales.
// Proteger o eliminar antes de publicar el proyecto.
router.get("/", obtenerPrepedidos);

module.exports = router;
