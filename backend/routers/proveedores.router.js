const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/',middlewareAutenticacion, proveedoresController.proveedores );
router.post('/crearProveedor',middlewareAutenticacion, proveedoresController.crearProveedores );

module.exports = router;