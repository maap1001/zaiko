const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

router.get('/registroClientes', clientesController.registroClientes );
router.get('/listarClientes', clientesController.listarClientes );

module.exports = router;