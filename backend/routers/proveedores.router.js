const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');

router.get('/registroPorveedores', proveedoresController.registroProveedores );
router.get('/listarPorveedores', proveedoresController.listarProveedores );

module.exports = router;