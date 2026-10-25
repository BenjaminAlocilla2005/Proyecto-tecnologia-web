const pool = require('../db');

const SELECT_BASE = `
  SELECT p.id, p.nombre, pr.nombre AS productor, pr.lugar,
         p.precio, p.imagen, p.categoria_id, c.nombre AS categoria
  FROM productos p
  JOIN categorias c ON c.id = p.categoria_id
  LEFT JOIN productores pr ON pr.id = p.productor_id`;

// Filtros opcionales: q (texto en el nombre) y categoriaId.
async function listar({ q = null, categoriaId = null } = {}) {
  const { rows } = await pool.query(
    `${SELECT_BASE}
     WHERE ($1::text IS NULL OR p.nombre ILIKE '%' || $1 || '%')
       AND ($2::int IS NULL OR p.categoria_id = $2)
     ORDER BY p.id ASC`,
    [q, categoriaId]
  );
  return rows;
}

async function obtenerPorId(id) {
  const { rows } = await pool.query(`${SELECT_BASE} WHERE p.id = $1`, [id]);
  return rows[0] || null;
}

async function crear({ nombre, precio, imagen, categoriaId, productorId }) {
  const { rows } = await pool.query(
    `INSERT INTO productos (nombre, precio, imagen, categoria_id, productor_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [nombre, precio, imagen, categoriaId, productorId]
  );
  return rows[0].id;
}

async function actualizar(id, { nombre, precio, imagen, categoriaId, productorId }) {
  const { rows } = await pool.query(
    `UPDATE productos
     SET nombre = $1, precio = $2, imagen = $3,
         categoria_id = $4, productor_id = $5
     WHERE id = $6
     RETURNING id`,
    [nombre, precio, imagen, categoriaId, productorId, id]
  );
  return rows[0] ? rows[0].id : null;
}

async function eliminar(id) {
  const { rows } = await pool.query(
    'DELETE FROM productos WHERE id = $1 RETURNING id',
    [id]
  );
  return rows.length > 0;
}

module.exports = { listar, obtenerPorId, crear, actualizar, eliminar };