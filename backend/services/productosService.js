const AppError = require('../utils/AppError');
const productosModel = require('../models/productosModel');
const productoresModel = require('../models/productoresModel');

function textoOpcional(valor) {
  return typeof valor === 'string' && valor.trim() ? valor.trim() : null;
}

function validarId(valor, mensaje) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(mensaje, 400);
  }
  return id;
}

// Valida el body y devuelve datos limpios.
function normalizar(body = {}) {
  const { nombre, productor, lugar, precio, imagen, categoria_id } = body;

  if (typeof nombre !== 'string' || !nombre.trim()) {
    throw new AppError('El nombre del producto es obligatorio.', 400);
  }

  const precioNumerico = Number(precio);
  if (
    precio === undefined || precio === null || precio === '' ||
    !Number.isInteger(precioNumerico) || precioNumerico <= 0
  ) {
    throw new AppError('El precio debe ser un número entero mayor que cero.', 400);
  }

  if (categoria_id === undefined || categoria_id === null || categoria_id === '') {
    throw new AppError('La categoría es obligatoria.', 400);
  }
  const categoriaId = validarId(categoria_id, 'La categoría seleccionada no es válida.');

  return {
    nombre: nombre.trim(),
    precio: precioNumerico,
    imagen: textoOpcional(imagen),
    categoriaId,
    productor: textoOpcional(productor),
    lugar: textoOpcional(lugar)
  };
}

async function resolverProductor(productor, lugar) {
  if (!productor) return null;
  return productoresModel.buscarOCrear(productor, lugar || 'Chiloé');
}

async function listar(query = {}) {
  const q = textoOpcional(query.q);
  const categoriaId = query.categoria_id
    ? validarId(query.categoria_id, 'La categoría del filtro no es válida.')
    : null;
  return productosModel.listar({ q, categoriaId });
}

async function crear(body) {
  const datos = normalizar(body);
  const productorId = await resolverProductor(datos.productor, datos.lugar);
  const id = await productosModel.crear({ ...datos, productorId });
  return productosModel.obtenerPorId(id);
}

async function actualizar(idParam, body) {
  const id = validarId(idParam, 'El identificador del producto no es válido.');
  const datos = normalizar(body);
  const productorId = await resolverProductor(datos.productor, datos.lugar);
  const actualizado = await productosModel.actualizar(id, { ...datos, productorId });
  if (!actualizado) throw new AppError('Producto no encontrado.', 404);
  return productosModel.obtenerPorId(id);
}

async function eliminar(idParam) {
  const id = validarId(idParam, 'El identificador del producto no es válido.');
  const eliminado = await productosModel.eliminar(id);
  if (!eliminado) throw new AppError('Producto no encontrado.', 404);
}

module.exports = { listar, crear, actualizar, eliminar };