const express = require("express");
const router = express.Router();

const {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias.controller");

const {
  verificarToken,
  soloAdministrador,
} = require("../middleware/auth.middleware");

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);

router.post("/", verificarToken, soloAdministrador, crearCategoria);
router.put("/:id", verificarToken, soloAdministrador, actualizarCategoria);
router.delete("/:id", verificarToken, soloAdministrador, eliminarCategoria);

module.exports = router;