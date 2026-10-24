const pool = require("../config/db");

const obtenerTodos = async () => {
  const resultado = await pool.query(
    `SELECT id, nombre, comuna, descripcion, categoria
     FROM productores ORDER BY id`
  );
  return resultado.rows;
};

const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    `SELECT id, nombre, comuna, descripcion, categoria
     FROM productores WHERE id = $1`,
    [id]
  );
  return resultado.rows[0];
};

const crear = async (datos) => {
  const resultado = await pool.query(
    `INSERT INTO productores
     (nombre, comuna, descripcion, categoria)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nombre, comuna, descripcion, categoria`,
    [
      datos.nombre,
      datos.comuna ?? null,
      datos.descripcion ?? null,
      datos.categoria ?? null,
    ]
  );
  return resultado.rows[0];
};

const actualizar = async (id, datos) => {
  const resultado = await pool.query(
    `UPDATE productores
     SET nombre = $1,
         comuna = $2,
         descripcion = $3,
         categoria = $4
     WHERE id = $5
     RETURNING id, nombre, comuna, descripcion, categoria`,
    [
      datos.nombre,
      datos.comuna ?? null,
      datos.descripcion ?? null,
      datos.categoria ?? null,
      id,
    ]
  );
  return resultado.rows[0];
};

const eliminar = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM productores WHERE id = $1 RETURNING id",
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