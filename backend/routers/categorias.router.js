const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

router.get('/registroCategorias', categoriasController.registroCategorias);
router.get('/listarCategorias', categoriasController.listarCategorias);
router.post('/', categoriasController.createCateg); 
router.post('/eliminar/:id', categoriasController.deleteCateg);
router.post('/editar/:id', categoriasController.editarCategoria);


module.exports = router;
