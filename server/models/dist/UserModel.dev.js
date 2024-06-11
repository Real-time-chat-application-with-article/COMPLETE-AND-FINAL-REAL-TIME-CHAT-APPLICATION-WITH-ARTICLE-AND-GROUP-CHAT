"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "provide name"]
  },
  email: {
    type: String,
    required: [true, "provide email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "provide password"]
  },
  profile_pic: {
    type: String,
    "default": ""
  }
}, {
  timestamps: true
});
var UserModel = mongoose.model('User-Info', userSchema);
module.exports = UserModel;