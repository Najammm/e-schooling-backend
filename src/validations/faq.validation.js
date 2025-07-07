const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFaq = {
  body: Joi.object().keys({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

const getFaqs = {
  query: Joi.object().keys({
    question: Joi.string(),
    answer: Joi.string(),
    limit: Joi.number().integer(),
  }),
};

const getFaq = {
  params: Joi.object().keys({
    faqId: Joi.string().custom(objectId),
  }),
};

const updateFaq = {
  params: Joi.object().keys({
    faqId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      question: Joi.string(),
      answer: Joi.string(),
    })
    .min(1),
};

const deleteFaq = {
  params: Joi.object().keys({
    faqId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFaq,
  getFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
};
