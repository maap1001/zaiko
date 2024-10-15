const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');
const upload = require('../utils/multer');
const middlewareAutenticacion = require('../utils/middleareAutenticacion');

router.get('/', productosController.productos );
router.get('/obtenerCategoriaProveedor', productosController.obtenerCategoriasYProveedores );
router.post('/crearProductos',upload.single('imagen'), productosController.crearProductos );
router.get('/detalleProductos/:id', productosController.detalleProductos );
router.post('/editarProductos/:id',upload.single('imagen'), productosController.editarProductos );
router.post('/eliminarProductos/:id', productosController.eliminarProductos );


module.exports = router;