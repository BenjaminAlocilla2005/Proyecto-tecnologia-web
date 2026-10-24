const prepedidos = [];

const crear = (datos) => {
  const nuevoPrepedido = {
    id: prepedidos.length + 1,
    productoId: datos.productoId,
    producto: datos.producto,
    nombre: datos.nombre,
    telefono: datos.telefono,
    cantidad: datos.cantidad,
    precioUnitario: datos.precioUnitario,
    total: datos.total,
    estado: "pendiente",
    fecha: new Date().toISOString(),
  };

  prepedidos.push(nuevoPrepedido);

  return nuevoPrepedido;
};

const obtenerTodos = () => prepedidos;

module.exports = {
  crear,
  obtenerTodos,
};
