const express = require('express');
const router = express.Router();
const homeRouter = require('./home.router');

router.use('/admin', homeRouter);

module.exports = router;
