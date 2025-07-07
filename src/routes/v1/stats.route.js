const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const statsValidation = require('../../validations/stats.validation');
const statsController = require('../../controllers/stats.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(statsValidation.createStats), statsController.createStats)
  .get(validate(statsValidation.getStatss), statsController.getStatss);

router
  .route('/:statsId')
  .get(validate(statsValidation.getStats), statsController.getStats)
  .patch(validate(statsValidation.updateStats), statsController.updateStats)
  .delete(validate(statsValidation.deleteStats), statsController.deleteStats);

module.exports = router;
