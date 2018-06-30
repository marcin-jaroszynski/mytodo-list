const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const config = require('config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const taskRoutes = require('./routes/tasks');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

async function dbConnect() {
	try {
	    await mongoose.connect(config.get('DB_HOST'), config.get('DB_OPTIONS'));
	} catch(error) {
		console.log(errorLog('UNABLE TO CONNECT WITH MONGODB!'));
	    console.log(errorLog('ERROR: ' + error));
	    process.exit(0);
	}
}

dbConnect();

app.get('/api/tasks', taskRoutes.getTasks);
app.post('/api/task/add', taskRoutes.add);

app.listen(config.get('PORT'), function() {
	console.log('API MYTODO-LIST server listening on port: ' + config.get('PORT'));
});

module.exports = app;