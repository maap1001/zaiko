const express = require('express');
const router = express.Router();
const almacenesController = require('../controllers/almacenes.controller');

router.get('/', almacenesController.almacenes);
router.post('/crearAlmacen', almacenesController.crearAlmacenes);
router.get('/detalleAlmacen/:id', almacenesController.detalleAlmacenes);
router.post('/editarAlmacen/:id', almacenesController.editarAlmacenes);
router.post('/eliminarAlmacen/:id', almacenesController.eliminarAlmacenes);

module.exports = router;
