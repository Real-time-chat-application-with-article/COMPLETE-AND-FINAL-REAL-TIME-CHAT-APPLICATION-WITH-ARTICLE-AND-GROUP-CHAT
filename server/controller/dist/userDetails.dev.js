"use strict";

var getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");

function userDetails(request, response) {
  var token, user;
  return regeneratorRuntime.async(function userDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = request.cookies.token || "";
          console.log("this is the cookies token recived = |", token);
          _context.next = 5;
          return regeneratorRuntime.awrap(getUserDetailsFromToken(token));

        case 5:
          user = _context.sent;
          return _context.abrupt("return", response.status(200).json({
            message: "user details",
            data: user
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

module.exports = userDetails;