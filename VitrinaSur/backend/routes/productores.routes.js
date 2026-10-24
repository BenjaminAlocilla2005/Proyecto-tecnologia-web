const express = require("express");
const router = express.Router();

const {
  obtenerProductores,
  obtenerProductorPorId,
  crearProductor,
  actualizarProductor,
  eliminarProductor,
} = require("../controllers/productores.controller");

const {
  verificarToken,
  soloAdministrador,
} = require("../middleware/auth.middleware");

router.get("/", obtenerProductores);
router.get("/:id", obtenerProductorPorId);

router.post("/", verificarToken, soloAdministrador, crearProductor);
router.put("/:id", verificarToken, soloAdministrador, actualizarProductor);
router.delete("/:id", verificarToken, soloAdministrador, eliminarProductor);

module.exports = router;