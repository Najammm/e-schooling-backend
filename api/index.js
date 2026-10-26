const mongoose = require('mongoose');
const app = require('../src/app');
const config = require('../src/config/config');

let connection;

const connectDB = () => {
  if (!connection) {
    connection = mongoose.connect(config.mongoose.url, config.mongoose.options).catch((err) => {
      connection = null; // retry on the next request
      throw err;
    });
  }
  return connection;
};

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(500).json({ message: 'Database connection failed' });
  }
  return app(req, res);
};
