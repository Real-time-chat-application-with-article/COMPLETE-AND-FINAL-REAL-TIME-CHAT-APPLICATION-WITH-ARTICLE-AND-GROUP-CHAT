"use strict";

var UserModel = require("../models/UserModel");

var bcryptjs = require('bcryptjs');

var jwt = require('jsonwebtoken');

var validator = require('validator');

var LocalStorage = require("node-localstorage").LocalStorage;

var localStorage = new LocalStorage('./scratch'); // Save the value to local storage

var createToken = function createToken(_id) {
  var jwtKey = process.env.JWT_SECREAT_KEY;
  return jwt.sign({
    _id: _id
  }, jwtKey, {
    expiresIn: '1d'
  });
};

function checkPassword(request, response) {
  var _request$body, password, userId, user, verifyPassword, tokenData, token, cookieOptions;

  return regeneratorRuntime.async(function checkPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _request$body = request.body, password = _request$body.password, userId = _request$body.userId;

          if (!(!password || !userId)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Please input your password",
            error: true
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(UserModel.findById(userId));

        case 6:
          user = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(bcryptjs.compare(password, user.password));

        case 9:
          verifyPassword = _context.sent;

          if (verifyPassword) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Please check password",
            error: true
          }));

        case 12:
          tokenData = {
            id: user._id,
            email: user.email
          };
          _context.next = 15;
          return regeneratorRuntime.awrap(jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
            expiresIn: '1d'
          }));

        case 15:
          token = _context.sent;
          console.log("this is yoken 1\n", token);
          cookieOptions = {
            http: false,
            secure: false
          };
          return _context.abrupt("return", response.cookie('token', token, cookieOptions).status(200).json({
            message: "Login successfully",
            token: token,
            success: true
          }));

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}

module.exports = checkPassword;