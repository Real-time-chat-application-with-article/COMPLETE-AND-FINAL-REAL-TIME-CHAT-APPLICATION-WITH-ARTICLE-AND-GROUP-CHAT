"use strict";

var getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

var UserModel = require("../models/UserModel");

function updateUserDetails(request, response) {
  var token, user, name, profile_pic, updateUser, userInfomation;
  return regeneratorRuntime.async(function updateUserDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = request.cookies.token || "";
          _context.next = 4;
          return regeneratorRuntime.awrap(getUserDetailsFromToken(token));

        case 4:
          user = _context.sent;
          name = request.body.name;
          profile_pic = request.body.profile_pic;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", response.status(400).json({
            message: "Something went wrong",
            error: true
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(UserModel.updateOne({
            _id: user._id
          }, {
            name: name,
            profile_pic: profile_pic
          }));

        case 11:
          updateUser = _context.sent;
          _context.next = 14;
          return regeneratorRuntime.awrap(UserModel.findById(user._id));

        case 14:
          userInfomation = _context.sent;
          return _context.abrupt("return", response.json({
            message: "user update successfully",
            data: userInfomation,
            success: true
          }));

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

module.exports = updateUserDetails;