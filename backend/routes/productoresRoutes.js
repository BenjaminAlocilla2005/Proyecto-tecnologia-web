const express = require('express');
const router = express.Router();
const { getProductores, createProductor } = require('../controllers/productoresController');

router.get('/', getProductores);
router.post('/', createProductor);

module.exports = router;