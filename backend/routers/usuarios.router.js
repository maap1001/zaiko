const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.usuarios );

router.post('/registroUsario', usuariosController.registroUsuarios );

module.exports = router;