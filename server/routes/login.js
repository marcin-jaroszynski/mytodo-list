const TokenModel = require('../db/models/token');

async function login(req, res) {
  const response = { success: false, token: '', message: '' };
  if (req.query.login && req.query.password) {
    response.success = true;
    response.token = await TokenModel.getToken();
  //  console.log('DB.MODEL.LOGIN.login.response: ', response);
  }
//  console.log('DB.MODEL.LOGIN.login.response(2): ', response);
  return res.json(response);
}

module.exports = { login };
