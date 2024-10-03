const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.usuarios );

router.post('/registroUsario', usuariosController.registroUsuarios );

router.get('/detalleUsario/:id', usuariosController.detalleUsuarios );

router.post('/editarUsuario/:id', usuariosController.editarUsuarios );

router.post('/eliminarUsuario/:id', usuariosController.eliminarUsuarios );

module.exports = router;