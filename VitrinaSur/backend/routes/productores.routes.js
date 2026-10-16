const express = require("express");
const router = express.Router();

const {
  obtenerProductores,
} = require("../controllers/productores.controller");

// Ruta para obtener todos los productores
router.get("/", obtenerProductores);

module.exports = router;
