const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.usuarios );

module.exports = router;