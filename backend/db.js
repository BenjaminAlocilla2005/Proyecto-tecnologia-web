
require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 5432,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000
});

// Captura errores inesperados de conexiones inactivas.
pool.on('error', (error) => {
  console.error(
    'Error inesperado en una conexión inactiva de PostgreSQL:',
    error.message
  );
});

module.exports = pool;
