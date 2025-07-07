const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const carousalSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    imageurl: {
      type: String,
      required: true,
      trim: true,
    },
    buttonText: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
carousalSchema.plugin(toJSON);
carousalSchema.plugin(paginate);

/**
 * @typedef Carousal
 */
const Carousal = mongoose.model('Carousal', carousalSchema);

module.exports = Carousal;
