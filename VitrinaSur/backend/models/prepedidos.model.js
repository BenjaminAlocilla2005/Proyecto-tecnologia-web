const prepedidos = [];
let siguienteId = 1;

const crear = (datos) => {
  const nuevoPrepedido = {
    id: siguienteId++,
    ...datos,
    estado: "pendiente",
    fecha: new Date().toISOString(),
  };

  prepedidos.push(nuevoPrepedido);
  return nuevoPrepedido;
};

const obtenerTodos = () => prepedidos;

module.exports = { crear, obtenerTodos };