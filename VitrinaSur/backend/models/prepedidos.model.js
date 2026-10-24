const pool = require("../config/db");

const crear = async (datos) => {
  const consulta = `
    INSERT INTO prepedidos (
      producto_id,
      nombre,
      telefono,
      cantidad,
      precio_unitario,
      total
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      producto_id AS "productoId",
      nombre,
      telefono,
      cantidad,
      precio_unitario::float8 AS "precioUnitario",
      total::float8 AS total,
      estado,
      fecha
  `;

  const valores = [
    datos.productoId,
    datos.nombre,
    datos.telefono,
    datos.cantidad,
    datos.precioUnitario,
    datos.total,
  ];

  const resultado = await pool.query(consulta, valores);

  return resultado.rows[0];
};

const obtenerTodos = async () => {
  const resultado = await pool.query(`
    SELECT
      id,
      producto_id AS "productoId",
      nombre,
      telefono,
      cantidad,
      precio_unitario::float8 AS "precioUnitario",
      total::float8 AS total,
      estado,
      fecha
    FROM prepedidos
    ORDER BY id DESC
  `);

  return resultado.rows;
};

module.exports = {
  crear,
  obtenerTodos,
};