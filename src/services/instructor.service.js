const httpStatus = require('http-status');
const { Instructor } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a stats
 * @param {Object} statsBody
 * @returns {Promise<Instructor>}
 */
const createInstructor = async (statsBody) => {
  return Instructor.create(statsBody);
};

/* Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryInstructor = async (filter, options) => {
  const stats = await Instructor.paginate(filter, options);
  return stats;
};

/**
 * Get Instructor by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getInstructorById = async (id) => {
  return Instructor.findById(id);
};

/**
 * Update Instructor by id
 * @param {ObjectId} InstructorId
 * @param {Object} updateBody
 * @returns {Promise<Instructor>}
 */
const updateInstructorById = async (instructorId, updateBody) => {
  const instructor = await getInstructorById(instructorId);
  if (!instructor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }
  if (updateBody.email && (await Instructor.isEmailTaken(updateBody.email, instructorId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(instructor, updateBody);
  await instructor.save();
  return instructor;
};

/**
 * Delete instructor by id
 * @param {ObjectId} instructorId
 * @returns {Promise<Instructor>}
 */
const deleteInstructorById = async (instructorId) => {
  const instructor = await getInstructorById(instructorId);
  if (!instructor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }
  await instructor.remove();
  return instructor;
};

module.exports = {
  createInstructor,
  queryInstructor,
  getInstructorById,
  updateInstructorById,
  deleteInstructorById,
};
