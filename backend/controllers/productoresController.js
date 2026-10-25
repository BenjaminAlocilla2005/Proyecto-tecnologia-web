const productoresService = require('../services/productoresService');

async function getProductores(req, res) {
  const productores = await productoresService.listar();
  res.status(200).json(productores);
}

async function createProductor(req, res) {
  const nuevo = await productoresService.crear(req.body);
  res.status(201).json(nuevo);
}

module.exports = { getProductores, createProductor };