const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { faqService } = require('../services');

const createFaq = catchAsync(async (req, res) => {
  const faq = await faqService.createFaq(req.body);
  res.status(httpStatus.CREATED).send(faq);
});

const getFaqs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['question', 'answer']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await faqService.queryFaq(filter, options);
  res.send(result);
});

const getFaq = catchAsync(async (req, res) => {
  const faq = await faqService.getFaqById(req.params.faqId);
  if (!faq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  }
  res.send(faq);
});

const updateFaq = catchAsync(async (req, res) => {
  const faq = await faqService.updateFaqById(req.params.faqId, req.body);
  res.send(faq);
});

const deleteFaq = catchAsync(async (req, res) => {
  await faqService.deleteFaqById(req.params.faqId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFaq,
  getFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
};
