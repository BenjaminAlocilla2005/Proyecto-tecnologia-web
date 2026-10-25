require('dotenv').config();

const { Pool } = require('pg');

// En producción (Neon, Supabase...) se usa DATABASE_URL.
// En local se usan las variables DB_*.
const configuracion = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 5432
    };

const pool = new Pool({
  ...configuracion,
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
