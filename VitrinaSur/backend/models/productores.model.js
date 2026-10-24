const pool = require("../config/db");

// Obtener todos los productores desde PostgreSQL
const obtenerTodos = async () => {
  const resultado = await pool.query(
    `SELECT id, nombre, comuna, descripcion, categoria
     FROM productores
     ORDER BY id`
  );

  return resultado.rows;
};

module.exports = {
  obtenerTodos,
};