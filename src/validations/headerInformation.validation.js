const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createHeaderInformation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
    facebook: Joi.string().required(),
    twitter: Joi.string().required(),
    linkedin: Joi.string().required(),
  }),
};

const getHeaderInformations = {
  query: Joi.object().keys({
    email: Joi.string(),
    phone: Joi.string(),
    facebook: Joi.string(),
    twitter: Joi.string(),
    linkedin: Joi.string(),
  }),
};

const getHeaderInformation = {
  params: Joi.object().keys({
    headerInformationId: Joi.string().custom(objectId),
  }),
};

const updateHeaderInformation = {
  params: Joi.object().keys({
    headerInformationId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      phone: Joi.string(),
      facebook: Joi.string(),
      twitter: Joi.string(),
      linkedin: Joi.string(),
    })
    .min(1),
};

const deleteHeaderInformation = {
  params: Joi.object().keys({
    headerInformationId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createHeaderInformation,
  getHeaderInformations,
  getHeaderInformation,
  updateHeaderInformation,
  deleteHeaderInformation,
};
