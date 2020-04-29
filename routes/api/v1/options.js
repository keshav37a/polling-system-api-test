const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/api/v1/options_controller');

router.get('/', optionsController.home);

module.exports = router;