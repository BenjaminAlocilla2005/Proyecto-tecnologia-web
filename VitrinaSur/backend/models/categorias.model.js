const categorias = [
  {
    id: 1,
    nombre: "Alimentos",
    descripcion: "Productos alimenticios de Chiloé",
  },
  {
    id: 2,
    nombre: "Artesanía",
    descripcion: "Creaciones artesanales de productores locales",
  },
  {
    id: 3,
    nombre: "Textiles",
    descripcion: "Prendas y tejidos tradicionales de Chiloé",
  },
  {
    id: 4,
    nombre: "Gastronomía",
    descripcion: "Preparaciones y sabores típicos del archipiélago",
  },
];

// Obtener todas las categorías
const obtenerTodos = () => {
  return categorias;
};

module.exports = {
  obtenerTodos,
};
