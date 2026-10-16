
const express = require("express");
const router = express.Router();

// Productores temporales de VitrinaSur
const productores = [
  {
    id: 1,
    nombre: "Productores de Chiloé",
    comuna: "Castro",
    descripcion: "Producción local de miel y alimentos artesanales",
    categoria: "Alimentos",
  },
  {
    id: 2,
    nombre: "Artesanas de Chiloé",
    comuna: "Dalcahue",
    descripcion: "Elaboración de tejidos y artesanías tradicionales",
    categoria: "Artesanía",
  },
  {
    id: 3,
    nombre: "Emprendimientos locales",
    comuna: "Quellón",
    descripcion: "Elaboración de mermeladas y productos típicos",
    categoria: "Gastronomía",
  },
];

// Obtener todos los productores
router.get("/", (req, res) => {
  res.json(productores);
});

module.exports = router;
