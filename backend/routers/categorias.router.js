const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

router.get('/', categoriasController.categorias);
router.post('/crearCategoria', categoriasController.crearCategorias);
router.get('/detalleCategoria/:id', categoriasController.detalleCategorias);
router.post('/editarCategoria/:id', categoriasController.editarCategorias);
router.post('/eliminarCategoria/:id', categoriasController.eliminarCategorias);

module.exports = router;
