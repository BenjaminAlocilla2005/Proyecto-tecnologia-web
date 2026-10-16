
const express = require("express");
const router = express.Router();

// Datos temporales para probar la API
const productos = [
  {
    id: 1,
    nombre: "Miel de Chiloé",
    precio: 6500,
    categoria: "Alimentos",
    productor: "Productores de Chiloé",
  },
  {
    id: 2,
    nombre: "Chaleco de lana",
    precio: 25000,
    categoria: "Artesanía",
    productor: "Artesanas de Chiloé",
  },
  {
    id: 3,
    nombre: "Mermelada artesanal",
    precio: 4500,
    categoria: "Alimentos",
    productor: "Emprendimientos locales",
  },
];

// Obtener todos los productos
router.get("/", (req, res) => {
  res.json(productos);
});

module.exports = router;
