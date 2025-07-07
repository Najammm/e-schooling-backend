const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { carousalService } = require('../services');

const createCarousal = catchAsync(async (req, res) => {
  const carousal = await carousalService.createCarousal(req.body);
  res.status(httpStatus.CREATED).send(carousal);
});

const getCarousals = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text', 'imageurl', 'buttonText']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await carousalService.queryCarousal(filter, options);
  res.send(result);
});

const getCarousal = catchAsync(async (req, res) => {
  const carousal = await carousalService.getCarousalById(req.params.carousalId);
  if (!carousal) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Carousal not found');
  }
  res.send(carousal);
});

const updateCarousal = catchAsync(async (req, res) => {
  const carousal = await carousalService.updateCarousalById(req.params.carousalId, req.body);
  res.send(carousal);
});

const deleteCarousal = catchAsync(async (req, res) => {
  await carousalService.deleteCarousalById(req.params.carousalId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCarousal,
  getCarousals,
  getCarousal,
  updateCarousal,
  deleteCarousal,
};
