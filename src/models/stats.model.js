const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const statsSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
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
statsSchema.plugin(toJSON);
statsSchema.plugin(paginate);

/**
 * @typedef Stats
 */
const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
