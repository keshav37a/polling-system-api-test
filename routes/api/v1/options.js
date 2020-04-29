const express = require('express');
const router = express.Router();
const optionsController = require('../../../controllers/api/v1/options_controller');
const passport = require('passport');

router.get('/', optionsController.home);
router.get('/:id/add_vote', optionsController.addVote);
router.delete('/:id/delete', passport.authenticate('jwt', {session:false}), optionsController.deleteOption);

module.exports = router;