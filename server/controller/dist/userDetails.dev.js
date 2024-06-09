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
          _context.next = 4;
          return regeneratorRuntime.awrap(getUserDetailsFromToken(token));

        case 4:
          user = _context.sent;
          return _context.abrupt("return", response.status(200).json({
            message: "user details",
            data: user
          }));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

module.exports = userDetails;