const express = require("express");
const pool = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Importar rutas
const productosRoutes = require("./routes/productos.routes");
const categoriasRoutes = require("./routes/categorias.routes");
const productoresRoutes = require("./routes/productores.routes");
const prepedidosRoutes = require("./routes/prepedidos.routes");
const authRoutes = require("./routes/auth.routes");

// Puerto de Render o puerto local
const PORT = process.env.PORT || 3001;

// Permitir solicitudes desde React en desarrollo y producción
const origenesPermitidos = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: origenesPermitidos,
    credentials: true,
  })
);

// Configuración para recibir datos JSON y cookies
app.use(express.json());
app.use(cookieParser());

// Rutas de la API
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

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({
    mensaje: "Ruta no encontrada",
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err);

  // Error de clave foránea
  if (err.code === "23503") {
    return res.status(409).json({
      mensaje:
        "La operación no se puede realizar por una relación entre registros",
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
      mensaje:
        "Los datos no cumplen las restricciones de la base de datos",
    });
  }

  return res.status(500).json({
    mensaje: "Error interno del servidor",
  });
});

// Mostrar detalles seguros del error de conexión
function mostrarErrorConexion(error) {
  console.error("Error al conectar con PostgreSQL");

  console.error("Tipo:", error.name || "No disponible");
  console.error("Código:", error.code || "No disponible");
  console.error("Mensaje:", error.message || "No disponible");

  if (error.cause) {
    console.error(
      "Causa:",
      error.cause.message || "No disponible"
    );
  }

  if (Array.isArray(error.errors)) {
    error.errors.forEach((errorInterno, indice) => {
      console.error(`Error interno ${indice + 1}:`);
      console.error(
        "Código:",
        errorInterno.code || "No disponible"
      );
      console.error(
        "Mensaje:",
        errorInterno.message || "No disponible"
      );
    });
  }
}

// Verificar PostgreSQL e iniciar servidor
async function iniciarServidor() {
  try {
    const resultado = await pool.query("SELECT NOW()");

    console.log("PostgreSQL conectado correctamente");
    console.log(
      "Fecha de PostgreSQL:",
      resultado.rows[0].now
    );

    app.listen(PORT, "0.0.0.0", () => {
      console.log(
        `Servidor ejecutándose en el puerto ${PORT}`
      );
    });
  } catch (error) {
    mostrarErrorConexion(error);
    process.exit(1);
  }
}

iniciarServidor();