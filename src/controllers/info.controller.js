const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { infoService } = require('../services');

const createInfo = catchAsync(async (req, res) => {
  const info = await infoService.createInfo(req.body);
  res.status(httpStatus.CREATED).send(info);
});

const getInfos = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['text', 'number']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await infoService.queryInfo(filter, options);
  res.send(result);
});

const getInfo = catchAsync(async (req, res) => {
  const info = await infoService.getInfoById(req.params.infoId);
  if (!info) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Info not found');
  }
  res.send(info);
});

const updateInfo = catchAsync(async (req, res) => {
  const info = await infoService.updateInfoById(req.params.infoId, req.body);
  res.send(info);
});

const deleteInfo = catchAsync(async (req, res) => {
  await infoService.deleteInfoById(req.params.infoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createInfo,
  getInfos,
  getInfo,
  updateInfo,
  deleteInfo,
};
