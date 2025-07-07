const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { instructorService } = require('../services');

const createInstructor = catchAsync(async (req, res) => {
  const instructor = await instructorService.createInstructor(req.body);
  res.status(httpStatus.CREATED).send(instructor);
});

const getInstructors = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'position', 'image', 'link']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await instructorService.queryInstructor(filter, options);
  res.send(result);
});

const getInstructor = catchAsync(async (req, res) => {
  const instructor = await instructorService.getInstructorById(req.params.instructorId);
  if (!instructor) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Instructor not found');
  }
  res.send(instructor);
});

const updateInstructor = catchAsync(async (req, res) => {
  const instructor = await instructorService.updateInstructorById(req.params.instructorId, req.body);
  res.send(instructor);
});

const deleteInstructor = catchAsync(async (req, res) => {
  await instructorService.deleteInstructorById(req.params.instructorId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInstructor,
  getInstructors,
  getInstructor,
  updateInstructor,
  deleteInstructor,
};
