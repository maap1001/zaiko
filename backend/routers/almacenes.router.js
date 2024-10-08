const express = require('express');
const router = express.Router();
const almacenesController = require('../controllers/almacenes.controller');

router.get('/registroAlmacenes', almacenesController.registroAlmacenes);
router.get('/listarAlmacenes', almacenesController.listarAlmacenes);
router.post('/', almacenesController.crearAlmacen); 
router.post('/editar/:id', almacenesController.editarAlmacen);
router.post('/eliminar/:id', almacenesController.eliminarAlmacen);


module.exports = router;
