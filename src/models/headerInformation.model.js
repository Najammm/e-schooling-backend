const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const headerInformationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
headerInformationSchema.plugin(toJSON);
headerInformationSchema.plugin(paginate);

/**
 * @typedef HeaderInformation
 */
const HeaderInformation = mongoose.model('HeaderInformation', headerInformationSchema);

module.exports = HeaderInformation;
