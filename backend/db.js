const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    // CAMBIO IMPORTANTE: Ahora imprimirá TODO el error en la terminal
    console.error('❌ ERROR FATAL conectando a PostgreSQL:');
    console.error(err); 
    return;
  }
  console.log('✅ ¡Conexión exitosa a la base de datos PostgreSQL!');
  release();
});

module.exports = pool;