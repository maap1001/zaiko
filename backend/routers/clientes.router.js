const express = require('express');
const router = express.Router();
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

const clientesController = require('../controllers/clientes.controller');

router.get('/registroClientes',middlewareAutenticacion, clientesController.registroClientes );
router.get('/listarClientes',middlewareAutenticacion, clientesController.listarClientes );

module.exports = router;