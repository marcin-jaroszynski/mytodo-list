const jwt = require('jsonwebtoken');
const TokenModel = require('../../db/models/token');

async function generateToken() {
  let token = '';
  try {
    await TokenModel.setup();
    let secret = await TokenModel.getSecret();
    const payload = {
      login: 'login',
      password: 'password'
    };
    token = jwt.sign(payload, secret, { expiresIn: 60 });
  } catch(error) {
  }
  return token;
}

module.exports = { generateToken };
