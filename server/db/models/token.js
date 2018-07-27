const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const configSchema = new Schema({
  secret: { type: String, required: true }
});

configSchema.static('setup', async function() {
  await this.remove({});
  let secret = crypto.randomBytes(32).toString('hex');
  let instance = new this({ secret: secret });
  await instance.save();
});

configSchema.static('getSecret', async function() {
  let data = await this.findOne({});
  if (!data) {
    return '';
  }
  return data.secret;
});

module.exports = mongoose.model('token', configSchema);
