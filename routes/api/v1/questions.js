const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions_controller');

router.get('/', questionsController.home);

module.exports = router;