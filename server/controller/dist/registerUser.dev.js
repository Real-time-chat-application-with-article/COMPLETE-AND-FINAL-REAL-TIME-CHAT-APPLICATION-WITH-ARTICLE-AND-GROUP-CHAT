"use strict";

var UserModel = require("../models/UserModel");

var bcryptjs = require('bcryptjs');

var validator = require('validator');

function registerUser(request, response) {
  var _request$body, name, email, password, profile_pic, checkEmail, salt, hashpassword, payload, user, userSave;

  return regeneratorRuntime.async(function registerUser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _request$body = request.body, name = _request$body.name, email = _request$body.email, password = _request$body.password, profile_pic = _request$body.profile_pic;

          if (!(!name || !email || !password || !profile_pic)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "All Information are required",
            error: true
          }));

        case 4:
          if (validator.isEmail(email)) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Invalid Email Address",
            error: true
          }));

        case 6:
          if (validator.isStrongPassword(password)) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Sorry, your password must be strong",
            error: true
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(UserModel.findOne({
            email: email
          }));

        case 10:
          checkEmail = _context.sent;

          if (!checkEmail) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Already user exits",
            error: true
          }));

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(bcryptjs.genSalt(10));

        case 15:
          salt = _context.sent;
          _context.next = 18;
          return regeneratorRuntime.awrap(bcryptjs.hash(password, salt));

        case 18:
          hashpassword = _context.sent;
          payload = {
            name: name,
            email: email,
            profile_pic: profile_pic,
            password: hashpassword
          };
          user = new UserModel(payload);
          _context.next = 23;
          return regeneratorRuntime.awrap(user.save());

        case 23:
          userSave = _context.sent;
          return _context.abrupt("return", response.status(201).json({
            message: "User created successfully",
            data: userSave,
            success: true
          }));

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 27]]);
}

module.exports = registerUser;