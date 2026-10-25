const pool = require('../db');

async function listar() {
  const { rows } = await pool.query(
    'SELECT id, nombre, lugar, rubro FROM productores ORDER BY nombre'
  );
  return rows;
}

async function crear({ nombre, lugar, rubro }) {
  const { rows } = await pool.query(
    `INSERT INTO productores (nombre, lugar, rubro)
     VALUES ($1, $2, $3)
     RETURNING id, nombre, lugar, rubro`,
    [nombre, lugar, rubro]
  );
  return rows[0];
}

// Devuelve el id del productor; lo crea si no existe (nombre + lugar).
async function buscarOCrear(nombre, lugar) {
  const { rows } = await pool.query(
    `INSERT INTO productores (nombre, lugar)
     VALUES ($1, $2)
     ON CONFLICT (nombre, lugar) DO UPDATE SET nombre = EXCLUDED.nombre
     RETURNING id`,
    [nombre, lugar]
  );
  return rows[0].id;
}

module.exports = { listar, crear, buscarOCrear };