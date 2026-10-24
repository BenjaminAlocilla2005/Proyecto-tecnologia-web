const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Conexión a Postgres
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// --- IMPORTAMOS LAS RUTAS MODULARES ---
const productosRoutes = require('./routes/productosRoutes');

// --- USAMOS LAS RUTAS ---
// Esto le dice a Express: "Cuando alguien pida /api/productos, usa el archivo productosRoutes"
app.use('/api/productos', productosRoutes);

// --- RUTAS QUE DEJAMOS AQUÍ DIRECTAMENTE (Para no complicar más la modularización) ---
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/productores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productores');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en el puerto ${PORT}`);
});