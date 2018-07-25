const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const taskRoutes = require('./routes/tasks');
const loginRoutes = require('./routes/login');
const jwt = require('jsonwebtoken');
const setup = require('./setup');
const TokenModel = require('./db/models/token');


setup();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let authCheck = async (req, res, next) => {
  let response = { success: false };
  let token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    try {
      let secret = await TokenModel.getSecret();
      req.decoded = await jwt.verify(token, secret);
      next();
    } catch(error) {
      console.log('AuthCheck.error: ', error);
      res.json(response);
    }
  } else {
    res.json(response);
  }
};

app.get('/api/login', loginRoutes.login);
app.get('/api/tasks', authCheck, taskRoutes.getTasks);
app.post('/api/task/add', authCheck, taskRoutes.add);
app.post('/api/task/finished', authCheck, taskRoutes.finished);
app.post('/api/task/edit', authCheck, taskRoutes.edit);
app.post('/api/task/remove', authCheck, taskRoutes.remove);


app.listen(config.get('PORT'), function() {
  console.log('API MYTODO-LIST server listening on port: ' + config.get('PORT'));
});

module.exports = app;
