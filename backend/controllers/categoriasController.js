const categoriasService = require('../services/categoriasService');

const getCategorias = async (req, res) => {
  const categorias = await categoriasService.listar();
  return res.status(200).json(categorias);
};

module.exports = { getCategorias };