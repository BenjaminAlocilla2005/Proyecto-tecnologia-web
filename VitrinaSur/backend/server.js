const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const productoresRoutes = require("./routes/productores.routes");
const prepedidosRoutes = require("./routes/prepedidos.routes");
const authRoutes = require("./routes/auth.routes");

const PORT = 3001;

// Permitir solicitudes desde el frontend React
// Permitir solicitudes desde el frontend React
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Permitir recibir datos en formato JSON
app.use(express.json());
app.use(cookieParser());
app.use("/api/productos", productosRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/productores", productoresRoutes);
app.use("/api/prepedidos", prepedidosRoutes);
app.use("/api/auth", authRoutes);

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

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err);

  // Error de clave foránea: categoría o productor inexistente
  if (err.code === "23503") {
    return res.status(409).json({
      mensaje: "La operación no se puede realizar por una relación entre registros",
    });
  }

  // Error de valor duplicado
  if (err.code === "23505") {
    return res.status(409).json({
      mensaje: "Ya existe un registro con ese valor",
    });
  }

  // Restricción CHECK o NOT NULL
  if (err.code === "23514" || err.code === "23502") {
    return res.status(400).json({
      mensaje: "Los datos no cumplen las restricciones de la base de datos",
    });
  }

  return res.status(500).json({
    mensaje: "Error interno del servidor",
  });
});

iniciarServidor();