const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const carousalValidation = require('../../validations/carousal.validation');
const carousalController = require('../../controllers/carousal.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(carousalValidation.createCarousal), carousalController.createCarousal)
  .get(validate(carousalValidation.getCarousals), carousalController.getCarousals);

router
  .route('/:carousalId')
  .get(validate(carousalValidation.getCarousal), carousalController.getCarousal)
  .patch(validate(carousalValidation.updateCarousal), carousalController.updateCarousal)
  .delete(validate(carousalValidation.deleteCarousal), carousalController.deleteCarousal);

module.exports = router;
