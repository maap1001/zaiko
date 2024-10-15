const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/', inventarioController.inventario );
router.get('/obtenerProductoUbicacion', inventarioController.obtenerProductosYUbicaciones );
router.post('/crearInventario', inventarioController.crearInventario );
router.get('/detalleInventario/:id', inventarioController.detalleInventario );
router.post('/editarInventario/:id', inventarioController.editarInventario );
router.post('/eliminarInventario/:id', inventarioController.eliminarInventario );

module.exports = router;