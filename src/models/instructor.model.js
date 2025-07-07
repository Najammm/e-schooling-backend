const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const instructorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
instructorSchema.plugin(toJSON);
instructorSchema.plugin(paginate);

/**
 * @typedef Instructor
 */
const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;
