const express = require("express");
const router = express.Router();

const {
  registrar,
  iniciarSesion,
} = require("../controllers/auth.controller");

router.post("/registro", registrar);
router.post("/login", iniciarSesion);

module.exports = router;