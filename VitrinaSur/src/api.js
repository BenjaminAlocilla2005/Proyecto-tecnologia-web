const API_URL = import.meta.env.VITE_API_URL

export async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status} al consultar ${path}`)
  }
  return res.json()
}