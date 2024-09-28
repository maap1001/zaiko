const express = require('express');
const router = express.Router();
const penelGestinController = require('../controllers/panelGestion.controller');


router.get('/', penelGestinController.panelGestion );

module.exports = router;