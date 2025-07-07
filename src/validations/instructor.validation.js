const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createInstructor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    position: Joi.string().required(),
    image: Joi.string().required(),
    link: Joi.string(),
  }),
};

const getInstructors = {
  query: Joi.object().keys({
    name: Joi.string(),
    position: Joi.string(),
    image: Joi.string(),
    link: Joi.string(),
  }),
};

const getInstructor = {
  params: Joi.object().keys({
    instructorId: Joi.string().custom(objectId),
  }),
};

const updateInstructor = {
  params: Joi.object().keys({
    instructorId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      position: Joi.string(),
      image: Joi.string(),
      link: Joi.string(),
    })
    .min(1),
};

const deleteInstructor = {
  params: Joi.object().keys({
    instructorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInstructor,
  getInstructors,
  getInstructor,
  updateInstructor,
  deleteInstructor,
};
