const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

router.get('/registroCategorias', categoriasController.registroCategorias );
router.get('/listarCategorias', categoriasController.listarCategorias );

module.exports = router;