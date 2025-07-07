const httpStatus = require('http-status');
const { Carousal } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a carousal
 * @param {Object} carousalBody
 * @returns {Promise<Carousal>}
 */
const createCarousal = async (carousalBody) => {
  return Carousal.create(carousalBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryCarousal = async (filter, options) => {
  const carousal = await Carousal.paginate(filter, options);
  return carousal;
};

/**
 * Get carousal by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getCarousalById = async (id) => {
  return Carousal.findById(id);
};

/**
 * Update carousal by id
 * @param {ObjectId} carousalId
 * @param {Object} updateBody
 * @returns {Promise<HeaderInformation>}
 */
const updateCarousalById = async (carousalId, updateBody) => {
  const carousal = await getCarousalById(carousalId);
  if (!carousal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Carousal not found');
  }
  if (updateBody.email && (await Carousal.isEmailTaken(updateBody.email, carousalId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(carousal, updateBody);
  await carousal.save();
  return carousal;
};

/**
 * Delete carousal by id
 * @param {ObjectId} carousalId
 * @returns {Promise<Carousal>}
 */
const deleteCarousalById = async (carousalId) => {
  const carousal = await getCarousalById(carousalId);
  if (!carousal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Carousal not found');
  }
  await carousal.remove();
  return carousal;
};

module.exports = {
  createCarousal,
  queryCarousal,
  getCarousalById,
  updateCarousalById,
  deleteCarousalById,
};
