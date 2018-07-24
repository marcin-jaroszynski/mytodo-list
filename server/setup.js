const config = require('config');
const mongoose = require('mongoose');
const TokenModel = require('./db/models/token');

mongoose.Promise = global.Promise;

async function dbConnect() {
  try {
    await mongoose.connect(config.get('DB_HOST'), config.get('DB_OPTIONS'));
  } catch(error) {
    console.log('UNABLE TO CONNECT WITH MONGODB!');
    console.log('ERROR: ' + error);
    process.exit(0);
  }
}

async function setup() {
  await dbConnect();
  await TokenModel.setup();
}

module.exports = setup;
