const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const configSchema = new Schema({
  secret: { type: String, required: true }
});

const ONE_DAY = 86400;

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

configSchema.static('generate', async function(payload) {
  let secret = await this.getSecret();
  return jwt.sign(payload, secret, { expiresIn: ONE_DAY });

});

module.exports = mongoose.model('token', configSchema);
