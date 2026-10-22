const API_URL = "http://localhost:3001/api";

// Obtener productos desde Express
export const obtenerProductos = async () => {
  const respuesta = await fetch(`${API_URL}/productos`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener los productos");
  }

  return respuesta.json();
};

// Obtener categorías desde Express
export const obtenerCategorias = async () => {
  const respuesta = await fetch(`${API_URL}/categorias`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener las categorías");
  }

  return respuesta.json();
};

// Obtener productores desde Express
export const obtenerProductores = async () => {
  const respuesta = await fetch(`${API_URL}/productores`);

  if (!respuesta.ok) {
    throw new Error("Error al obtener los productores");
  }

  return respuesta.json();
};
