const productosService = require('../services/productosService');

const getProductos = async (req, res) => {
  const productos = await productosService.listar(req.query);
  return res.status(200).json(productos);
};

const createProducto = async (req, res) => {
  const producto = await productosService.crear(req.body);
  return res.status(201).json({
    mensaje: 'Producto creado correctamente.',
    producto
  });
};

const updateProducto = async (req, res) => {
  const producto = await productosService.actualizar(req.params.id, req.body);
  return res.status(200).json({
    mensaje: 'Producto actualizado correctamente.',
    producto
  });
};

const deleteProducto = async (req, res) => {
  await productosService.eliminar(req.params.id);
  return res.status(200).json({ mensaje: 'Producto eliminado correctamente.' });
};

module.exports = { getProductos, createProducto, updateProducto, deleteProducto };