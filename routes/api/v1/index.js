const express = require('express');
const router = express.Router();

router.use('/questions', require('./questions'));
router.use('/options', require('./options'));
router.use('/users', require('./user'));

module.exports = router;