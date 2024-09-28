const express = require('express');
const router = express.Router();
const auditoriaController = require('../controllers/auditoria.controller');


router.get('/', auditoriaController.auditoria );

module.exports = router;