const jwt = require('jsonwebtoken');
const TokenModel = require('../../db/models/token');
const UserModel = require('../../db/models/user');
const TaskModel = require('../../db/models/task');

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


async function clear() {
  await UserModel.remove({});
  await TokenModel.remove({});
  await TaskModel.remove({});
}

module.exports = { generateToken, clear };
