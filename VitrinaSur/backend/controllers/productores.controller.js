const Productor = require("../models/productores.model");

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
    return "Debes enviar los datos del productor";
  }

  if (
    typeof datos.nombre !== "string" ||
    !datos.nombre.trim() ||
    datos.nombre.trim().length > 150
  ) {
    return "El nombre debe tener entre 1 y 150 caracteres";
  }

  for (const campo of ["comuna", "categoria"]) {
    if (
      datos[campo] != null &&
      (typeof datos[campo] !== "string" ||
        datos[campo].length > (campo === "comuna" ? 150 : 100))
    ) {
      return `El campo ${campo} no es válido`;
    }
  }

  if (
    datos.descripcion != null &&
    typeof datos.descripcion !== "string"
  ) {
    return "La descripción debe ser texto";
  }

  return null;
};

const obtenerProductores = async (req, res, next) => {
  try {
    res.json(await Productor.obtenerTodos());
  } catch (error) {
    next(error);
  }
};

const obtenerProductorPorId = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const productor = await Productor.obtenerPorId(req.params.id);

    if (!productor) {
      return res.status(404).json({
        mensaje: "Productor no encontrado",
      });
    }

    res.json(productor);
  } catch (error) {
    next(error);
  }
};

const crearProductor = async (req, res, next) => {
  try {
    const error = validar(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const productor = await Productor.crear({
      ...req.body,
      nombre: req.body.nombre.trim(),
    });

    res.status(201).json({
      mensaje: "Productor creado correctamente",
      productor,
    });
  } catch (error) {
    next(error);
  }
};

const actualizarProductor = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const error = validar(req.body);
    if (error) return res.status(400).json({ mensaje: error });

    const productor = await Productor.actualizar(req.params.id, {
      ...req.body,
      nombre: req.body.nombre.trim(),
    });

    if (!productor) {
      return res.status(404).json({
        mensaje: "Productor no encontrado",
      });
    }

    res.json({
      mensaje: "Productor actualizado correctamente",
      productor,
    });
  } catch (error) {
    next(error);
  }
};

const eliminarProductor = async (req, res, next) => {
  try {
    if (!idValido(req.params.id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const productor = await Productor.eliminar(req.params.id);

    if (!productor) {
      return res.status(404).json({
        mensaje: "Productor no encontrado",
      });
    }

    res.json({
      mensaje: "Productor eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerProductores,
  obtenerProductorPorId,
  crearProductor,
  actualizarProductor,
  eliminarProductor,
};