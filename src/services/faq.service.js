const httpStatus = require('http-status');
const { Faq } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a faq
 * @param {Object} faqBody
 * @returns {Promise<Faq>}
 */
const createFaq = async (faqBody) => {
  return Faq.create(faqBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFaq = async (filter, options) => {
  const faq = await Faq.paginate(filter, options);
  return faq;
};

/**
 * Get faq by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getFaqById = async (id) => {
  return Faq.findById(id);
};

/**
 * Update faq by id
 * @param {ObjectId} faqId
 * @param {Object} updateBody
 * @returns {Promise<HeaderInformation>}
 */
const updateFaqById = async (faqId, updateBody) => {
  const faq = await getFaqById(faqId);
  if (!faq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  }
  if (updateBody.email && (await Faq.isEmailTaken(updateBody.email, faqId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(faq, updateBody);
  await faq.save();
  return faq;
};

/**
 * Delete faq by id
 * @param {ObjectId} faqId
 * @returns {Promise<Faq>}
 */
const deleteFaqById = async (faqId) => {
  const faq = await getFaqById(faqId);
  if (!faq) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faq not found');
  }
  await faq.remove();
  return faq;
};

module.exports = {
  createFaq,
  queryFaq,
  getFaqById,
  updateFaqById,
  deleteFaqById,
};
