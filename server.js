const express = require('express');
const logger = require('morgan');
const users = require('./routes/users');
const person = require('./routes/person');
const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const app = express();

app.set('secret', 'lnqplApi');

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('development'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.json({ display_message: 'Welcome back home!' });
});

app.use('/users', users);
app.use('/person', person);

app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.status === 404) res.status(404).json({ message: err.message });
  else res.status(500).json({ message: err.message });
});

app.listen(8000, function () {
  console.log('Server is listening on port 8000');
});
