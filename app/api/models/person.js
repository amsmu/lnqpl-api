const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cryptr = require('cryptr');
const cryptr = new Cryptr('you-wont-be-able-to-crack-it');

const PersonSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
    required: true,
  },
  address: {
    type: String,
    trim: true,
    required: true,
  },
  ssn: {
    type: String,
    trim: true,
    required: true,
  },
});

PersonSchema.pre('save', function (next) {
  this.ssn = cryptr.encrypt(this.ssn);
  next();
});

PersonSchema.post('find', function (result) {
  for (var i = 0; i < result.length; i++) {
    result[i].ssn = cryptr.decrypt(result[i].ssn);
  }
});

module.exports = mongoose.model('Person', PersonSchema);
