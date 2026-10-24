const pool = require("../config/db");

const obtenerTodos = async () => {
  const resultado = await pool.query(
    "SELECT id, nombre, descripcion FROM categorias ORDER BY id"
  );
  return resultado.rows;
};

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT id, nombre, descripcion FROM categorias WHERE id = $1",
    [id]
  );
  return resultado.rows[0];
};

const crear = async ({ nombre, descripcion }) => {
  const resultado = await pool.query(
    `INSERT INTO categorias (nombre, descripcion)
     VALUES ($1, $2)
     RETURNING *`,
    [nombre, descripcion ?? null]
  );
  return resultado.rows[0];
};

const actualizar = async (id, { nombre, descripcion }) => {
  const resultado = await pool.query(
    `UPDATE categorias
     SET nombre = $1, descripcion = $2
     WHERE id = $3
     RETURNING *`,
    [nombre, descripcion ?? null, id]
  );
  return resultado.rows[0];
};

const eliminar = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM categorias WHERE id = $1 RETURNING *",
    [id]
  );
  return resultado.rows[0];
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};