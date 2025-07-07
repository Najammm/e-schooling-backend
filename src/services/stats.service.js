const httpStatus = require('http-status');
const { Stats } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a stats
 * @param {Object} statsBody
 * @returns {Promise<Stats>}
 */
const createStats = async (statsBody) => {
  return Stats.create(statsBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryStats = async (filter, options, limit) => {
  const stats = await Stats.paginate(filter, options, limit);
  return stats;
};

/**
 * Get stats by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getStatsById = async (id) => {
  return Stats.findById(id);
};

/**
 * Update stats by id
 * @param {ObjectId} statsId
 * @param {Object} updateBody
 * @returns {Promise<HeaderInformation>}
 */
const updateStatsById = async (statsId, updateBody) => {
  const stats = await getStatsById(statsId);
  if (!stats) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stats not found');
  }
  if (updateBody.email && (await Stats.isEmailTaken(updateBody.email, statsId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(stats, updateBody);
  await stats.save();
  return stats;
};

/**
 * Delete stats by id
 * @param {ObjectId} statsId
 * @returns {Promise<Stats>}
 */
const deleteStatsById = async (statsId) => {
  const stats = await getStatsById(statsId);
  if (!stats) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stats not found');
  }
  await stats.remove();
  return stats;
};

module.exports = {
  createStats,
  queryStats,
  getStatsById,
  updateStatsById,
  deleteStatsById,
};
