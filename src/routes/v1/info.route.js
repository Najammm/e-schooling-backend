const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const infoValidation = require('../../validations/info.validation');
const infoController = require('../../controllers/info.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('info'), validate(infoValidation.createInfo), infoController.createInfo)
  .get(validate(infoValidation.getInfos), infoController.getInfos);

router
  .route('/:infoId')
  .get(validate(infoValidation.getInfo), infoController.getInfo)
  .patch(auth('info'), validate(infoValidation.updateInfo), infoController.updateInfo)
  .delete(auth('info'), validate(infoValidation.deleteInfo), infoController.deleteInfo);

module.exports = router;
