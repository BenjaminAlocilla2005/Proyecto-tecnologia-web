const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios.model");

const verificarToken = async (req, res, next) => {
  try {
    const autorizacion = req.headers.authorization;

    if (!autorizacion || !autorizacion.startsWith("Bearer ")) {
      return res.status(401).json({
        mensaje: "Debes iniciar sesión",
      });
    }

    const token = autorizacion.slice(7);

    const datos = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.obtenerPorId(datos.id);

    if (!usuario) {
      return res.status(401).json({
        mensaje: "Usuario no válido",
      });
    }

    req.usuario = {
      id: usuario.id,
      rol: usuario.rol,
    };

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return res.status(401).json({
        mensaje: "Sesión inválida o expirada",
      });
    }

    next(error);
  }
};

const soloAdministrador = (req, res, next) => {
  if (req.usuario?.rol !== "administrador") {
    return res.status(403).json({
      mensaje: "No tienes permisos para realizar esta operación",
    });
  }

  next();
};

module.exports = {
  verificarToken,
  soloAdministrador,
};