const express = require('express');
const router = express.Router();
const graficosController = require('../controllers/graficos.controller');


router.get('/', graficosController.graficos );

module.exports = router;