
import { useState } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

const FORM_INICIAL = {
  nombre: '',
  productor: '',
  lugar: '',
  precio: '',
  imagen: '',
  categoria_id: '1'
};

export default function AgregarProducto() {
  const [formData, setFormData] = useState({ ...FORM_INICIAL });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((anterior) => ({
      ...anterior,
      [name]: value
    }));
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje(texto);
    setTipoMensaje(tipo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cargando) return;

    mostrarMensaje('', '');

    const nombre = formData.nombre.trim();
    const precio = Number(formData.precio);
    const categoriaId = Number(formData.categoria_id);

    if (!nombre) {
      mostrarMensaje(
        'El nombre del producto es obligatorio.',
        'error'
      );
      return;
    }

    if (nombre.length > 150) {
      mostrarMensaje(
        'El nombre no puede superar los 150 caracteres.',
        'error'
      );
      return;
    }

    if (
      formData.precio.trim() === '' ||
      !Number.isFinite(precio) ||
      precio <= 0 ||
      !Number.isSafeInteger(precio)
    ) {
      mostrarMensaje(
        'Ingresa un precio entero válido mayor que cero.',
        'error'
      );
      return;
    }

    if (
      !Number.isInteger(categoriaId) ||
      categoriaId <= 0
    ) {
      mostrarMensaje('Selecciona una categoría válida.', 'error');
      return;
    }

    if (!API_URL) {
      mostrarMensaje(
        'Falta configurar la URL de la API en el archivo .env.',
        'error'
      );
      return;
    }

    setCargando(true);

    try {
      const respuesta = await fetch(`${API_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          productor: formData.productor.trim(),
          lugar: formData.lugar.trim(),
          precio,
          imagen: formData.imagen.trim(),
          categoria_id: categoriaId
        })
      });

      const datos = await respuesta.json().catch(() => ({}));

      if (!respuesta.ok) {
        throw new Error(
          datos.error ||
          datos.mensaje ||
          'No se pudo guardar el producto.'
        );
      }

      setFormData({ ...FORM_INICIAL });

      mostrarMensaje(
        '¡Producto agregado con éxito!',
        'exito'
      );
    } catch (error) {
      mostrarMensaje(
        error.message === 'Failed to fetch'
          ? 'No se pudo conectar con el servidor. Comprueba la URL de la API.'
          : error.message || 'Ocurrió un error inesperado.',
        'error'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="section">
      <h2>Agregar nuevo producto</h2>

      {mensaje && (
        <p
          role={tipoMensaje === 'error' ? 'alert' : 'status'}
          aria-live={tipoMensaje === 'error' ? 'assertive' : 'polite'}
          style={{
            color: tipoMensaje === 'exito' ? 'green' : 'red',
            fontWeight: 'bold'
          }}
        >
          {mensaje}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          width: '100%',
          maxWidth: '400px'
        }}
      >
        <label htmlFor="nombre">Nombre del producto *</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej.: Miel de ulmo"
          maxLength={150}
          autoComplete="off"
          required
        />

        <label htmlFor="productor">Productor</label>
        <input
          id="productor"
          name="productor"
          type="text"
          value={formData.productor}
          onChange={handleChange}
          placeholder="Nombre del productor"
        />

        <label htmlFor="lugar">Lugar</label>
        <input
          id="lugar"
          name="lugar"
          type="text"
          value={formData.lugar}
          onChange={handleChange}
          placeholder="Ej.: Castro"
        />

        <label htmlFor="precio">Precio en pesos chilenos (CLP) *</label>
        <input
          id="precio"
          name="precio"
          type="number"
          min="1"
          step="1"
          value={formData.precio}
          onChange={handleChange}
          placeholder="Ej.: 5000"
          required
        />

        <label htmlFor="imagen">Nombre de la imagen</label>
        <input
          id="imagen"
          name="imagen"
          type="text"
          value={formData.imagen}
          onChange={handleChange}
          placeholder="Ej.: miel.jpg"
        />

        <label htmlFor="categoria_id">Categoría *</label>
        <select
          id="categoria_id"
          name="categoria_id"
          value={formData.categoria_id}
          onChange={handleChange}
          required
        >
          <option value="1">Miel</option>
          <option value="2">Textiles</option>
          <option value="3">Quesos</option>
        </select>

        <button
          type="submit"
          className="primary-button"
          disabled={cargando}
          style={{ marginTop: '10px' }}
        >
          {cargando ? 'Guardando...' : 'Guardar producto'}
        </button>
      </form>
    </section>
  );
}

