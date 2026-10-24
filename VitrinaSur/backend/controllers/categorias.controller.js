const Categoria = require("../models/categorias.model");

const idValido = (id) =>
  /^[1-9]\d*$/.test(String(id)) &&
  Number.isSafeInteger(Number(id)) &&
  Number(id) <= 2147483647;

const validar = (datos) => {
  if (
    !datos ||
    typeof datos !== "object" ||
    Array.isArray(datos)
  ) {
    return "Debes enviar los datos de la categoría";
  }

  if (
    typeof datos.nombre !== "string" ||
    !datos.nombre.trim() ||
    datos.nombre.trim().length > 100
  ) {
    return "El nombre debe tener entre 1 y 100 caracteres";
  }

  if (
    datos.descripcion != null &&
    typeof datos.descripcion !== "string"
  ) {
    return "La descripción debe ser texto";
  }

  return null;
};

const obtenerCategorias = async (req, res, next) => {
  try {
    res.json(await Categoria.obtenerTodos());
  } catch (error) {
    next(error);
  }
};

const obtenerCategoriaPorId = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const categoria = await Categoria.obtenerPorId(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

const crearCategoria = async (req, res, next) => {
  try {
    const error = validar(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const categoria = await Categoria.crear({
      nombre: req.body.nombre.trim(),
      descripcion: req.body.descripcion,
    });

    res.status(201).json({
      mensaje: "Categoría creada correctamente",
      categoria,
    });
  } catch (error) {
    next(error);
  }
};

const actualizarCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const error = validar(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const categoria = await Categoria.actualizar(req.params.id, {
      nombre: req.body.nombre.trim(),
      descripcion: req.body.descripcion,
    });

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    res.json({
      mensaje: "Categoría actualizada correctamente",
      categoria,
    });
  } catch (error) {
    next(error);
  }
};

const eliminarCategoria = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const categoria = await Categoria.eliminar(req.params.id);

    if (!categoria) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};