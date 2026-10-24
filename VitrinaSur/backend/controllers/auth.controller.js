const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarios.model");

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );
};

const registrar = async (req, res, next) => {
  try {
    const { nombre, email, password } = req.body || {};

    if (
      typeof nombre !== "string" ||
      nombre.trim().length < 2 ||
      nombre.trim().length > 150
    ) {
      return res.status(400).json({
        mensaje: "El nombre debe tener entre 2 y 150 caracteres",
      });
    }

    if (
      typeof email !== "string" ||
      email.trim().length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return res.status(400).json({
        mensaje: "Correo electrónico inválido",
      });
    }

    if (
      typeof password !== "string" ||
      password.length < 12 ||
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 12 caracteres y no superar 72 bytes",
      });
    }

    const correo = email.trim().toLowerCase();

    const existente = await Usuario.obtenerPorEmail(correo);

    if (existente) {
      return res.status(409).json({
        mensaje: "El correo ya está registrado",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const usuario = await Usuario.crear({
      nombre: nombre.trim(),
      email: correo,
      passwordHash,
    });

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario,
    });
  } catch (error) {
    next(error);
  }
};

const iniciarSesion = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        mensaje: "Correo y contraseña obligatorios",
      });
    }

    const usuario = await Usuario.obtenerPorEmail(
      email.trim().toLowerCase()
    );

    const passwordValida = usuario
      ? await bcrypt.compare(password, usuario.password_hash)
      : false;

    if (!usuario || !passwordValida) {
      return res.status(401).json({
        mensaje: "Credenciales incorrectas",
      });
    }

    const token = generarToken(usuario);

  res.cookie("vitrinasur_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 2 * 60 * 60 * 1000,
    path: "/",
  });

  return res.json({
    mensaje: "Inicio de sesión correcto",
    token,
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
};

module.exports = {
  registrar,
  iniciarSesion,
};