const express = require('express');
const router = express.Router();
const perfilUsuarioController = require('../controllers/perfilUsuario.controller');

router.get('/', perfilUsuarioController.perfilUsuario );

module.exports = router;