const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

router.get('/registroProductos', productosController.registroProductos );
router.get('/listarProductos', productosController.listarProductos );

module.exports = router;