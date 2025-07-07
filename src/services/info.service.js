const httpStatus = require('http-status');
const { Info } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a stats
 * @param {Object} statsBody
 * @returns {Promise<Info>}
 */
const createInfo = async (statsBody) => {
  return Info.create(statsBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInfo = async (filter, options) => {
  const stats = await Info.paginate(filter, options);
  return stats;
};

/**
 * Get info by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getInfoById = async (id) => {
  return Info.findById(id);
};

/**
 * Update info by id
 * @param {ObjectId} infoId
 * @param {Object} updateBody
 * @returns {Promise<Info>}
 */
const updateInfoById = async (infoId, updateBody) => {
  const info = await getInfoById(infoId);
  if (!info) {
    throw new ApiError(httpStatus.NOT_FOUND, 'info not found');
  }
  if (updateBody.email && (await Info.isEmailTaken(updateBody.email, infoId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(info, updateBody);
  await info.save();
  return info;
};

/**
 * Delete info by id
 * @param {ObjectId} infoId
 * @returns {Promise<Info>}
 */
const deleteInfoById = async (infoId) => {
  const info = await getInfoById(infoId);
  if (!info) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Info not found');
  }
  await info.remove();
  return info;
};

module.exports = {
  createInfo,
  queryInfo,
  getInfoById,
  updateInfoById,
  deleteInfoById,
};
