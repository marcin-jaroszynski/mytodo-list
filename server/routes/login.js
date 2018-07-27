const UserModel = require('../db/models/user');

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

module.exports = { login };
