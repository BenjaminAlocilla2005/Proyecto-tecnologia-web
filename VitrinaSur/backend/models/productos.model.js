const pool = require("../config/db");

// Obtener todos los productos
const obtenerTodos = async () => {
  const resultado = await pool.query(
    "SELECT * FROM productos ORDER BY id ASC"
  );

  return resultado.rows;
};

// Obtener un producto por su ID
const obtenerPorId = async (id) => {
  const resultado = await pool.query(
    "SELECT * FROM productos WHERE id = $1",
    [id]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
};