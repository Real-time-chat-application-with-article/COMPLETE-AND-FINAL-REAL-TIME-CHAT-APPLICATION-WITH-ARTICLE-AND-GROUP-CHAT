"use strict";

var UserModel = require("../models/UserModel");

var validator = require('validator');

function checkEmail(request, response) {
  var email, _checkEmail;

  return regeneratorRuntime.async(function checkEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = request.body.email;

          if (email) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Email address is empty",
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
          _context.next = 8;
          return regeneratorRuntime.awrap(UserModel.findOne({
            email: email
          }).select("-password"));

        case 8:
          _checkEmail = _context.sent;

          if (_checkEmail) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Sorry, User not found, try again",
            error: true
          }));

        case 11:
          return _context.abrupt("return", response.status(200).json({
            message: "It really you",
            success: true,
            data: _checkEmail
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = checkEmail;