const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createInfo = {
  body: Joi.object().keys({
    text: Joi.string().required(),
    number: Joi.number().required(),
  }),
};

const getInfos = {
  query: Joi.object().keys({
    text: Joi.string(),
    number: Joi.number(),
  }),
};

const getInfo = {
  params: Joi.object().keys({
    infoId: Joi.string().custom(objectId),
  }),
};

const updateInfo = {
  params: Joi.object().keys({
    infoId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
      number: Joi.number(),
    })
    .min(1),
};

const deleteInfo = {
  params: Joi.object().keys({
    infoId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createInfo,
  getInfos,
  getInfo,
  updateInfo,
  deleteInfo,
};
