const pool = require("../config/db");

// Obtener todas las categorías desde PostgreSQL
const obtenerTodos = async () => {
  const resultado = await pool.query(
    "SELECT id, nombre, descripcion FROM categorias ORDER BY id"
  );

  return resultado.rows;
};

module.exports = {
  obtenerTodos,
};