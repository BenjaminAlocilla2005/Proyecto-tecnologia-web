const express = require("express");
const router = express.Router();

const {
  crearPrepedido,
  obtenerPrepedidos,
} = require("../controllers/prepedidos.controller");

router.post("/", crearPrepedido);

// Solo para pruebas locales. No publicar sin autenticación.
if (process.env.NODE_ENV !== "production") {
  router.get("/", obtenerPrepedidos);
}

module.exports = router;