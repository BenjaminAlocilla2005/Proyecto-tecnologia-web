const pool = require("../config/db");

const obtenerPorEmail = async (email) => {
  const resultado = await pool.query(
    `SELECT id, nombre, email, password_hash, rol
     FROM usuarios
     WHERE LOWER(email) = LOWER($1)`,
    [email]
  );

  return resultado.rows[0];
};

const crear = async ({ nombre, email, passwordHash }) => {
  const resultado = await pool.query(
    `INSERT INTO usuarios (nombre, email, password_hash, rol)
     VALUES ($1, $2, $3, 'cliente')
     RETURNING id, nombre, email, rol`,
    [nombre, email, passwordHash]
  );

  return resultado.rows[0];
};

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    `SELECT id, nombre, email, rol
     FROM usuarios
     WHERE id = $1`,
    [id]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerPorEmail,
  obtenerPorId,
  crear,
};