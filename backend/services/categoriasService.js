const categoriasModel = require('../models/categoriasModel');

async function listar() {
  return categoriasModel.listar();
}

module.exports = { listar };