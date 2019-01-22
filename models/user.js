const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 1
  },
  username: {
    type: String,
    minlength: 1,
    required: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  }
});

exports = mongoose.model('User', UserSchema);