
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Orígenes permitidos separados por comas en FRONTEND_URL.
// En desarrollo, si no se configura, se permite cualquier origen.
// En producción, configura explícitamente el dominio del frontend.
const origenesConfigurados = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL
      .split(',')
      .map((origen) => origen.trim())
      .filter(Boolean)
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite solicitudes sin Origin, como algunas herramientas de servidor.
      if (!origin) return callback(null, true);

      // Sin configuración, facilita el desarrollo local.
      if (origenesConfigurados.length === 0) {
        return callback(null, true);
      }

      if (origenesConfigurados.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Origen no permitido por CORS'));
    }
  })
);

app.use(express.json({ limit: '100kb' }));

// Comprobación sencilla del estado de la API.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    estado: 'ok',
    mensaje: 'API disponible'
  });
});

// Rutas de productos: GET, POST, PUT y DELETE.
app.use('/api/productos', productosRoutes);

// Obtener categorías.
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM categorias'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);

    return res.status(500).json({
      error: 'No se pudieron obtener las categorías.'
    });
  }
});

// Obtener productores.
app.get('/api/productores', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM productores'
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener productores:', error.message);

    return res.status(500).json({
      error: 'No se pudieron obtener los productores.'
    });
  }
});

// Ruta no encontrada.
app.use((req, res) => {
  return res.status(404).json({
    error: 'Ruta no encontrada.'
  });
});

// Manejo centralizado de errores.
app.use((error, req, res, next) => {
  console.error('Error en la API:', error.message);

  if (res.headersSent) {
    return next(error);
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'El cuerpo de la solicitud contiene JSON inválido.'
    });
  }

  if (error.message === 'Origen no permitido por CORS') {
    return res.status(403).json({
      error: 'Origen no autorizado.'
    });
  }

  return res.status(500).json({
    error: 'Ocurrió un error interno en el servidor.'
  });
});

// Verificar PostgreSQL antes de aceptar solicitudes.
async function iniciarServidor() {
  try {
    await pool.query('SELECT 1');

    const servidor = app.listen(PORT, () => {
      console.log(`Backend disponible en el puerto ${PORT}`);
      console.log('Conexión con PostgreSQL verificada.');
    });

    servidor.on('error', (error) => {
      console.error('Error al iniciar el servidor:', error.message);
      process.exitCode = 1;
    });
  } catch (error) {
    console.error(
      'No se pudo conectar con PostgreSQL. El servidor no iniciará.',
      error.message
    );

    process.exitCode = 1;
  }
}

iniciarServidor();
