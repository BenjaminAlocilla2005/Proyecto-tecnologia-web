
const pool = require('../db');

// Obtener todos los productos
const getProductos = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM productos ORDER BY id ASC'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error.message);

    return res.status(500).json({
      error: 'No se pudieron obtener los productos.'
    });
  }
};

// Crear un producto
const createProducto = async (req, res) => {
  try {
    const {
      nombre,
      productor,
      lugar,
      precio,
      imagen,
      categoria_id
    } = req.body;

    // Validar los datos obligatorios
    if (
      typeof nombre !== 'string' ||
      !nombre.trim() ||
      precio === undefined ||
      precio === null ||
      precio === ''
    ) {
      return res.status(400).json({
        error: 'El nombre y el precio son obligatorios.'
      });
    }

    const precioNumerico = Number(precio);

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      return res.status(400).json({
        error: 'El precio debe ser un número mayor que cero.'
      });
    }

    if (
      categoria_id !== undefined &&
      categoria_id !== null &&
      (!Number.isInteger(Number(categoria_id)) ||
        Number(categoria_id) <= 0)
    ) {
      return res.status(400).json({
        error: 'La categoría seleccionada no es válida.'
      });
    }

    const result = await pool.query(
      `INSERT INTO productos
        (nombre, productor, lugar, precio, imagen, categoria_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        nombre.trim(),
        typeof productor === 'string' ? productor.trim() || null : null,
        typeof lugar === 'string' ? lugar.trim() || null : null,
        precioNumerico,
        typeof imagen === 'string' ? imagen.trim() || null : null,
        categoria_id == null || categoria_id === ''
          ? null
          : Number(categoria_id)
      ]
    );

    return res.status(201).json({
      mensaje: 'Producto creado correctamente.',
      producto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear producto:', error.message);

    // Violación de clave foránea en PostgreSQL
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'La categoría seleccionada no existe.'
      });
    }

    // Violación de una restricción de unicidad
    if (error.code === '23505') {
      return res.status(409).json({
        error: 'Ya existe un registro con esos datos.'
      });
    }

    return res.status(500).json({
      error: 'No se pudo crear el producto.'
    });
  }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'El identificador del producto no es válido.'
      });
    }

    const {
      nombre,
      productor,
      lugar,
      precio,
      imagen,
      categoria_id
    } = req.body;

    if (
      typeof nombre !== 'string' ||
      !nombre.trim() ||
      precio === undefined ||
      precio === null ||
      precio === ''
    ) {
      return res.status(400).json({
        error: 'El nombre y el precio son obligatorios.'
      });
    }

    const precioNumerico = Number(precio);

    if (!Number.isFinite(precioNumerico) || precioNumerico <= 0) {
      return res.status(400).json({
        error: 'El precio debe ser un número mayor que cero.'
      });
    }

    if (
      categoria_id !== undefined &&
      categoria_id !== null &&
      categoria_id !== '' &&
      (!Number.isInteger(Number(categoria_id)) ||
        Number(categoria_id) <= 0)
    ) {
      return res.status(400).json({
        error: 'La categoría seleccionada no es válida.'
      });
    }

    const result = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           productor = $2,
           lugar = $3,
           precio = $4,
           imagen = $5,
           categoria_id = $6
       WHERE id = $7
       RETURNING *`,
      [
        nombre.trim(),
        typeof productor === 'string' ? productor.trim() || null : null,
        typeof lugar === 'string' ? lugar.trim() || null : null,
        precioNumerico,
        typeof imagen === 'string' ? imagen.trim() || null : null,
        categoria_id == null || categoria_id === ''
          ? null
          : Number(categoria_id),
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado.'
      });
    }

    return res.status(200).json({
      mensaje: 'Producto actualizado correctamente.',
      producto: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);

    if (error.code === '23503') {
      return res.status(400).json({
        error: 'La categoría seleccionada no existe.'
      });
    }

    return res.status(500).json({
      error: 'No se pudo actualizar el producto.'
    });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'El identificador del producto no es válido.'
      });
    }

    const result = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado.'
      });
    }

    return res.status(200).json({
      mensaje: 'Producto eliminado correctamente.'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);

    return res.status(500).json({
      error: 'No se pudo eliminar el producto.'
    });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto
};
