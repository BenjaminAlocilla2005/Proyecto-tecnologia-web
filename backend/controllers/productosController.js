const pool = require('../db');

// 1. Obtener todos (GET) - Ya lo tenías
const getProductos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// 2. Crear un producto (POST) - Validación y código 201
const createProducto = async (req, res) => {
  try {
    const { nombre, productor, lugar, precio, imagen, categoria_id } = req.body;
    
    // Validación básica (Rúbrica pide validación)
    if (!nombre || !precio) {
      return res.status(400).json({ error: 'El nombre y el precio son obligatorios' });
    }

    const result = await pool.query(
      'INSERT INTO productos (nombre, productor, lugar, precio, imagen, categoria_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, productor, lugar, precio, imagen, categoria_id]
    );
    res.status(201).json(result.rows[0]); // 201 = Created
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// 3. Actualizar un producto (PUT) - Código 200
const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
      return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }

    const result = await pool.query(
      'UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *',
      [nombre, precio, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// 4. Eliminar un producto (DELETE) - Código 200 o 204
const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };