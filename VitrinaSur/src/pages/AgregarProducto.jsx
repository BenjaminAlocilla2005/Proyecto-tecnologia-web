import { useState } from 'react';

export default function AgregarProducto() {
  const [formData, setFormData] = useState({
    nombre: '', productor: '', lugar: '', precio: '', imagen: '', categoria_id: 1
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDACIÓN EN EL CLIENTE (Rúbrica)
    if (!formData.nombre || !formData.precio) {
      setMensaje('El nombre y el precio son obligatorios');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/productos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setMensaje('¡Producto agregado con éxito!');
        setFormData({ nombre: '', productor: '', lugar: '', precio: '', imagen: '', categoria_id: 1 });
      } else {
        setMensaje('Error al agregar el producto');
      }
    } catch (error) {
      setMensaje('Error de conexión');
    }
  };

  return (
    <section className="section">
      <h2>Agregar Nuevo Producto</h2>
      {mensaje && <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red', fontWeight: 'bold' }}>{mensaje}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="nombre" placeholder="Nombre del producto" value={formData.nombre} onChange={handleChange} required />
        <input name="productor" placeholder="Productor" value={formData.productor} onChange={handleChange} />
        <input name="lugar" placeholder="Lugar" value={formData.lugar} onChange={handleChange} />
        <input name="precio" type="number" placeholder="Precio" value={formData.precio} onChange={handleChange} required />
        <input name="imagen" placeholder="Nombre de la imagen (ej: queso.jpg)" value={formData.imagen} onChange={handleChange} />
        
        <select name="categoria_id" value={formData.categoria_id} onChange={handleChange}>
          <option value="1">Miel</option>
          <option value="2">Textiles</option>
          <option value="3">Quesos</option>
        </select>

        <button type="submit" className="primary-button" style={{ marginTop: '10px' }}>Guardar Producto</button>
      </form>
    </section>
  );
}