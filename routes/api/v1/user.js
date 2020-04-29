const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/user_controller');

router.post('/create-user', userController.signUp);
router.post('/create-session', userController.createSession);

module.exports = router;