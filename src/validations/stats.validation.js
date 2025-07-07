const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createStats = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    number: Joi.number().required(),
  }),
};

const getStatss = {
  query: Joi.object().keys({
    text: Joi.string(),
    number: Joi.number(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getStats = {
  params: Joi.object().keys({
    statsId: Joi.string().custom(objectId),
  }),
};

const updateStats = {
  params: Joi.object().keys({
    statsId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
      number: Joi.number(),
    })
    .min(1),
};

const deleteStats = {
  params: Joi.object().keys({
    statsId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createStats,
  getStatss,
  getStats,
  updateStats,
  deleteStats,
};
