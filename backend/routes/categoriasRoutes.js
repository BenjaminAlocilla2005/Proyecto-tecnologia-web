const express = require('express');
const router = express.Router();
const { getCategorias } = require('../controllers/categoriasController');

router.get('/', getCategorias);

module.exports = router;