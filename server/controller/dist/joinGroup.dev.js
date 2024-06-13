"use strict";

require("dotenv").config();

var express = require("express");

var cors = require("cors");

var axios = require("axios");

var app = express();
app.use(express.json());

function GroupAcessing(request, response) {
  var _request$body, name, email, password, profile_pic, responsefromSite;

  return regeneratorRuntime.async(function GroupAcessing$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _request$body = request.body, name = _request$body.name, email = _request$body.email, password = _request$body.password, profile_pic = _request$body.profile_pic;
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post("https://api.chatengine.io/users/", {
            username: name,
            secret: password,
            first_name: name,
            avatar: profile_pic,
            email: email
          }, {
            headers: {
              "Private-Key": "81e1b97f-a237-4142-b731-184e62c29769"
            }
          }));

        case 4:
          responsefromSite = _context.sent;
          return _context.abrupt("return", response.status(responsefromSite.status).json({
            message: "successfully",
            data: responsefromSite.data,
            successs: true
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

module.exports = GroupAcessing;