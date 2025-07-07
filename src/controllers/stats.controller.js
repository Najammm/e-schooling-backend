const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { statsService } = require('../services');

const createStats = catchAsync(async (req, res) => {
  const stats = await statsService.createStats(req.body);
  res.status(httpStatus.CREATED).send(stats);
});

const getStatss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text', 'number']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await statsService.queryStats(filter, options);
  res.send(result);
});

const getStats = catchAsync(async (req, res) => {
  const stats = await statsService.getStatsById(req.params.statsId);
  if (!stats) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Stats not found');
  }
  res.send(stats);
});

const updateStats = catchAsync(async (req, res) => {
  const stats = await statsService.updateStatsById(req.params.statsId, req.body);
  res.send(stats);
});

const deleteStats = catchAsync(async (req, res) => {
  await statsService.deleteStatsById(req.params.statsId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createStats,
  getStatss,
  getStats,
  updateStats,
  deleteStats,
};
