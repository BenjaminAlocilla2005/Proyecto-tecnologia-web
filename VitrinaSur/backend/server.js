const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const app = express();
const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const productoresRoutes = require("./routes/productores.routes");
const prepedidosRoutes = require("./routes/prepedidos.routes");

const PORT = 3001;

// Permitir solicitudes desde el frontend React
app.use(cors({
  origin: "http://localhost:5173"
}));

// Permitir recibir datos en formato JSON
app.use(express.json());
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productores", productoresRoutes);
app.use("/api/prepedidos", prepedidosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de VitrinaSur funcionando correctamente",
  });
});

// Verificar PostgreSQL e iniciar servidor
async function iniciarServidor() {
  try {
    const resultado = await pool.query("SELECT NOW()");

    console.log("PostgreSQL conectado correctamente");
    console.log("Fecha de PostgreSQL:", resultado.rows[0].now);

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con PostgreSQL:", error.message);
    process.exit(1);
  }
}

iniciarServidor();