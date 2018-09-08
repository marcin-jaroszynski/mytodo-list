const UserModel = require('../db/models/user');
const TokenModel = require('../db/models/token');

async function login(req, res) {
  const response = { success: false, token: '', message: '' };
  if (req.body.login && req.body.password) {
    if (await UserModel.validateCreditentials(req.body.login, req.body.password)) {
      response.success = true;
      response.token = await UserModel.getToken(req.body.login);
    } else {
      res.status(401);
      response.message = 'Login or password are not valid';
    }
  }
  return res.json(response);
}

async function autologin(req, res) {
  const response = { success: false };
  res.status(401);
  if (!req.body.login || !req.body.token) {
    return res.json(response);
  }
  try {
    await TokenModel.verify(req.body.token);
    response.success = true;
    res.status(200);
  } catch(e) {
  }
  return res.json(response);
}

module.exports = { login, autologin };
