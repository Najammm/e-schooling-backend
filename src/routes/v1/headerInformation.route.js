const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const headerInformationValidation = require('../../validations/headerInformation.validation');
const headerInformationController = require('../../controllers/headerInformation.controller');

const router = express.Router();

router
  .route('/')
  .post(
    auth('headerInformation'),
    validate(headerInformationValidation.createHeaderInformation),
    headerInformationController.createHeaderInformation
  )
  .get(validate(headerInformationValidation.getHeaderInformations), headerInformationController.getHeaderInformations);

router
  .route('/:headerInformationId')
  .get(validate(headerInformationValidation.getHeaderInformation), headerInformationController.getHeaderInformation)
  .patch(
    auth('headerInformation'),
    validate(headerInformationValidation.updateHeaderInformation),
    headerInformationController.updateHeaderInformation
  )
  .delete(
    auth('headerInformation'),
    validate(headerInformationValidation.deleteHeaderInformation),
    headerInformationController.deleteHeaderInformation
  );

module.exports = router;
