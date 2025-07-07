const httpStatus = require('http-status');
const { HeaderInformation } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a headerInformation
 * @param {Object} headerInformationBody
 * @returns {Promise<HeaderInformation>}
 */
const createHeaderInformation = async (headerInformationBody) => {
  return HeaderInformation.create(headerInformationBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHeaderInformation = async (filter, options) => {
  const headerInformation = await HeaderInformation.paginate(filter, options);
  return headerInformation;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getHeaderInformationById = async (id) => {
  return HeaderInformation.findById(id);
};

/**
 * Update headerInformation by id
 * @param {ObjectId} headerInformationId
 * @param {Object} updateBody
 * @returns {Promise<HeaderInformation>}
 */
const updateHeaderInformationById = async (headerInformationId, updateBody) => {
  const headerInformation = await getHeaderInformationById(headerInformationId);
  if (!headerInformation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'HeaderInformation not found');
  }
  if (updateBody.email && (await HeaderInformation.isEmailTaken(updateBody.email, headerInformationId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(headerInformation, updateBody);
  await headerInformation.save();
  return headerInformation;
};

/**
 * Delete headerInformation by id
 * @param {ObjectId} headerInformationId
 * @returns {Promise<HeaderInformation>}
 */
const deleteHeaderInformationById = async (headerInformationId) => {
  const headerInformation = await getHeaderInformationById(headerInformationId);
  if (!headerInformation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'HeaderInformation not found');
  }
  await headerInformation.remove();
  return headerInformation;
};

module.exports = {
  createHeaderInformation,
  queryHeaderInformation,
  getHeaderInformationById,
  updateHeaderInformationById,
  deleteHeaderInformationById,
};
