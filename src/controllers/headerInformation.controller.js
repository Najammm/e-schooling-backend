const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { headerInformationService } = require('../services');

const createHeaderInformation = catchAsync(async (req, res) => {
  const headerInformation = await headerInformationService.createHeaderInformation(req.body);
  res.status(httpStatus.CREATED).send(headerInformation);
});

const getHeaderInformations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['email', 'phone', 'facebook', 'twitter', 'linked']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await headerInformationService.queryHeaderInformation(filter, options);
  res.send(result);
});

const getHeaderInformation = catchAsync(async (req, res) => {
  const headerInformation = await headerInformationService.getHeaderInformationById(req.params.headerInformationId);
  if (!headerInformation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'HeaderInformation not found');
  }
  res.send(headerInformation);
});

const updateHeaderInformation = catchAsync(async (req, res) => {
  const headerInformation = await headerInformationService.updateHeaderInformationById(
    req.params.headerInformationId,
    req.body
  );
  res.send(headerInformation);
});

const deleteHeaderInformation = catchAsync(async (req, res) => {
  await headerInformationService.deleteHeaderInformationById(req.params.headerInformationId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHeaderInformation,
  getHeaderInformations,
  getHeaderInformation,
  updateHeaderInformation,
  deleteHeaderInformation,
};
