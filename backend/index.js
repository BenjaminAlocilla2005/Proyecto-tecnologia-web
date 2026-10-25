
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./db');

const productosRoutes = require('./routes/productosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');
const productoresRoutes = require('./routes/productoresRoutes');
const AppError = require('./utils/AppError');

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

      // Sin configuración, solo se permite en desarrollo local.
      if (origenesConfigurados.length === 0) {
        if (process.env.NODE_ENV === 'production') {
          return callback(new Error('Origen no permitido por CORS'));
        }
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

// Rutas de categorías y productores.
app.use('/api/categorias', categoriasRoutes);
app.use('/api/productores', productoresRoutes);

// Ruta no encontrada.
app.use((req, res) => {
  return res.status(404).json({
    error: 'Ruta no encontrada.'
  });
});

// Errores de PostgreSQL provocados por datos del cliente, no del servidor
const ERRORES_PG = {
  '23502': [400, 'Falta un campo obligatorio.'],
  '23503': [400, 'Referencia inválida (por ejemplo, la categoría no existe).'],
  '23505': [409, 'Ya existe un registro con esos datos.'],
  '23514': [400, 'Un valor no cumple las restricciones permitidas.'],
  '22P02': [400, 'Formato de dato inválido.']
};

// Manejo centralizado de errores.
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  // Errores esperados lanzados por los servicios (400, 404, ...)
  if (error instanceof AppError) {
    return res.status(error.status).json({
      error: error.message,
      detalles: error.detalles
    });
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'El cuerpo de la solicitud contiene JSON inválido.'
    });
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      error: 'El cuerpo de la solicitud es demasiado grande.'
    });
  }

  if (error.message === 'Origen no permitido por CORS') {
    return res.status(403).json({
      error: 'Origen no autorizado.'
    });
  }

  if (ERRORES_PG[error.code]) {
    const [status, mensaje] = ERRORES_PG[error.code];
    return res.status(status).json({ error: mensaje });
  }

  // El detalle va solo al log del servidor, nunca al cliente
  console.error('Error en la API:', error);

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
