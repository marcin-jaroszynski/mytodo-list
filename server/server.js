const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const config = require('config');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/test', function(req, res) {
	res.json({success: true});
});

app.listen(config.get('PORT'), function() {
	console.log('API MYTODO-LIST server listening on port: ' + config.get('PORT'));
});

module.exports = app;