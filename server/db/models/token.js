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
  let secret = '';
  if (data) {
    secret = data.secret;
  }
  return secret;
});

configSchema.static('getToken', async function(login, password) {
  let secret = await this.getSecret();
  const payload = {
    login: login,
    password: password
  };
  return jwt.sign(payload, secret, { expiresIn: 60*60*24 });
});

module.exports = mongoose.model('token', configSchema);
