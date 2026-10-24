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


export const registrarPrepedido = async (datos) => {
  const respuesta = await fetch(`${API_URL}/prepedidos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  let resultado;

  try {
    resultado = await respuesta.json();
  } catch {
    throw new Error("El servidor devolvió una respuesta inválida.");
  }

  if (!respuesta.ok) {
    throw new Error(
      resultado.mensaje || "No se pudo registrar el prepedido."
    );
  }

  return resultado;
};


export const obtenerProductoPorId = async (id) => {
  const respuesta = await fetch(
    `${API_URL}/productos/${encodeURIComponent(id)}`
  );

  if (!respuesta.ok) {
    if (respuesta.status === 404) {
      throw new Error("Producto no encontrado");
    }

    throw new Error("Error al obtener el producto");
  }

  return respuesta.json();
};