const express = require('express');
const router = express.Router();
const devolucionesController = require('../controllers/devoluciones.controller');

router.get('/registroDevoluciones', devolucionesController.registroDevolcuiones );
router.get('/listarDevoluciones', devolucionesController.listarDevolcuiones );

module.exports = router;