const AppError = require('../utils/AppError');
const productoresModel = require('../models/productoresModel');

function textoValido(valor) {
  return typeof valor === 'string' && valor.trim().length > 0;
}

async function listar() {
  return productoresModel.listar();
}

async function crear({ nombre, lugar, rubro } = {}) {
  if (!textoValido(nombre) || !textoValido(lugar) || !textoValido(rubro)) {
    throw new AppError('Nombre, lugar y rubro son obligatorios.', 400);
  }
  return productoresModel.crear({
    nombre: nombre.trim(),
    lugar: lugar.trim(),
    rubro: rubro.trim()
  });
}

module.exports = { listar, crear };