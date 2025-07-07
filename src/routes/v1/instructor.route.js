const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const instructorValidation = require('../../validations/instructor.validation');
const instructorController = require('../../controllers/instructor.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('instructor'), validate(instructorValidation.createInstructor), instructorController.createInstructor)
  .get(validate(instructorValidation.getInstructors), instructorController.getInstructors);

router
  .route('/:instructorId')
  .get(validate(instructorValidation.getInstructor), instructorController.getInstructor)
  .patch(auth('instructor'), validate(instructorValidation.updateInstructor), instructorController.updateInstructor)
  .delete(auth('instructor'), validate(instructorValidation.deleteInstructor), instructorController.deleteInstructor);

module.exports = router;
