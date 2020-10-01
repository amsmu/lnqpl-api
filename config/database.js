const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost/lnqpl';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
