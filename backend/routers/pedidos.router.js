const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');
const pedidosController = require('../controllers/pedidos.controller');

router.get('/registroPedidos',middlewareAutenticacion, pedidosController.registroPedidos );
router.get('/listarPedidos',middlewareAutenticacion, pedidosController.listarPedidos );

module.exports = router;