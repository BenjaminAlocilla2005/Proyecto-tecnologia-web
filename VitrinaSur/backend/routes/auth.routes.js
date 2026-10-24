const express = require("express");
const router = express.Router();

const { verificarToken } = require("../middleware/auth.middleware");
const Usuario = require("../models/usuarios.model");

router.get("/me", verificarToken, async (req, res, next) => {
  try {
    const usuario = await Usuario.obtenerPorId(req.usuario.id);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no válido",
      });
    }

    res.json({
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
});

const {
  registrar,
  iniciarSesion,
} = require("../controllers/auth.controller");

router.post("/registro", registrar);
router.post("/login", iniciarSesion);

router.post("/logout", (req, res) => {
  res.clearCookie("vitrinasur_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.json({
    mensaje: "Sesión cerrada correctamente",
  });
});

module.exports = router;