const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidos.controller');

router.get('/registroPedidos', pedidosController.registroPedidos );
router.get('/listarPedidos', pedidosController.listarPedidos );

module.exports = router;