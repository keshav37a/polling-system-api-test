const express = require('express');
const router = express.Router();
const questionsController = require('../../../controllers/api/v1/questions_controller');
const optionsController = require('../../../controllers/api/v1/options_controller');
const passport = require('passport');

router.get('/', questionsController.home);
router.get('/:id', questionsController.getQuestionDetails);
router.post('/create', questionsController.createQuestion);
router.post('/:id/options/create', optionsController.createOption);
router.delete('/:id/delete', passport.authenticate('jwt', {session:false}), questionsController.deleteQuestion);

module.exports = router;