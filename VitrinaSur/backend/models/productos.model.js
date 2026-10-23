const productos = [
  {
    id: 1,
    nombre: "Miel de Chiloé",
    precio: 6500,
    categoria: "Alimentos",
    productor: "Productores de Chiloé",
  },
  {
    id: 2,
    nombre: "Chaleco de lana",
    precio: 25000,
    categoria: "Artesanía",
    productor: "Artesanas de Chiloé",
  },
  {
    id: 3,
    nombre: "Mermelada artesanal",
    precio: 4500,
    categoria: "Gastronomía",
    productor: "Emprendimientos locales",
  },
];

// Obtener todos los productos
const obtenerTodos = () => {
  return productos;
};

// Obtener un producto por su ID
const obtenerPorId = (id) => {
  return productos.find((producto) => producto.id === Number(id));
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
};
