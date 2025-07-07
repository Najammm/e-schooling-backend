const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const infoSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
infoSchema.plugin(toJSON);
infoSchema.plugin(paginate);

/**
 * @typedef Info
 */
const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
