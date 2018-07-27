const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Token = require('./token');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  login: { type: String, required: true },
  password: { type: String, required: true }
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.static('validateCreditentials', async function(login, password) {
  let user = await this.findOne({login: login});
  if (!user) {
    return false;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return false;
  }
  return true;
});

userSchema.static('getToken', async function(login) {
  let user = await this.findOne({login: login});
  if (!user) {
    return '';
  }
  let secret = await Token.getSecret();
  const payload = {
    login: user.login,
    password: user.password
  };
  const ONE_DAY = 86400;
  return jwt.sign(payload, secret, { expiresIn: ONE_DAY });
});

module.exports = mongoose.model('user', userSchema);
