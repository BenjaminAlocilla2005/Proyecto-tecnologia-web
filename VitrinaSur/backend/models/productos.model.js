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

// Crear un nuevo producto
const crear = async (datos) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    categoria_id,
    productor_id
  } = datos;

  const resultado = await pool.query(
    `INSERT INTO productos
      (nombre, descripcion, precio, imagen, categoria_id, productor_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      nombre,
      descripcion,
      precio,
      imagen,
      categoria_id,
      productor_id
    ]
  );

  return resultado.rows[0];
};

// Actualizar un producto existente
const actualizar = async (id, datos) => {
  const {
    nombre,
    descripcion,
    precio,
    imagen,
    categoria_id,
    productor_id,
  } = datos;

  const resultado = await pool.query(
    `UPDATE productos
     SET nombre = $1,
         descripcion = $2,
         precio = $3,
         imagen = $4,
         categoria_id = $5,
         productor_id = $6
     WHERE id = $7
     RETURNING *`,
    [
      nombre,
      descripcion,
      precio,
      imagen,
      categoria_id,
      productor_id,
      id,
    ]
  );

  return resultado.rows[0];
};

// Eliminar un producto
const eliminar = async (id) => {
  const resultado = await pool.query(
    "DELETE FROM productos WHERE id = $1 RETURNING *",
    [id]
  );

  return resultado.rows[0];
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
};