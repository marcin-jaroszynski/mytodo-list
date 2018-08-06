const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
  const payload = {
    login: user.login,
    password: user.password
  };
  let token = await Token.generate(payload);
  return token;
});

module.exports = mongoose.model('user', userSchema);
