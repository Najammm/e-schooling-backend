const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createCarousal = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    imageurl: Joi.string().required(),
    buttonText: Joi.string().required(),
  }),
};

const getCarousals = {
  query: Joi.object().keys({
    text: Joi.string(),
    imageurl: Joi.string(),
    buttonText: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCarousal = {
  params: Joi.object().keys({
    carousalId: Joi.string().custom(objectId),
  }),
};

const updateCarousal = {
  params: Joi.object().keys({
    carousalId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
      imageurl: Joi.string(),
      buttonText: Joi.string(),
    })
    .min(1),
};

const deleteCarousal = {
  params: Joi.object().keys({
    carousalId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCarousal,
  getCarousals,
  getCarousal,
  updateCarousal,
  deleteCarousal,
};
