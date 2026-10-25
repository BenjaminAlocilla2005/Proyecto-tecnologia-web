const pool = require('../db');

async function listar() {
  const { rows } = await pool.query(
    'SELECT id, nombre, icono FROM categorias ORDER BY id ASC'
  );
  return rows;
}

module.exports = { listar };