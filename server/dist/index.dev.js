"use strict";

var express = require('express');

var cors = require('cors');

require('dotenv').config();

var connectDB = require('./config/connectDB');

var router = require('./routes/index');

var cookiesParser = require('cookie-parser');

var _require = require('./socket/index'),
    app = _require.app,
    server = _require.server;

var axios = require("axios"); // const app = express()


app.use(cors({
  origin: "http://192.168.156.157:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookiesParser());
var PORT = process.env.PORT || 8080;
app.get('/', function (request, response) {
  response.json({
    message: "Server running at " + PORT
  });
});
app.post("/groupsignup", function _callee(request, response) {
  var _request$body, username, email, password, profile_pic, r;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _request$body = request.body, username = _request$body.username, email = _request$body.email, password = _request$body.password, profile_pic = _request$body.profile_pic;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(axios.post("https://api.chatengine.io/users/", {
            username: username,
            secret: password,
            first_name: username,
            avatar: profile_pic,
            email: email
          }, {
            headers: {
              "Private-Key": "81e1b97f-a237-4142-b731-184e62c29769"
            }
          }));

        case 4:
          r = _context.sent;
          return _context.abrupt("return", response.status(r.status).json(r.data));

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](1);
          return _context.abrupt("return", response.status(500).json({
            message: _context.t0.message || _context.t0,
            error: true,
            failure: "jesysys"
          }));

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); //api endpoints

app.use('/api', router);
connectDB().then(function () {
  server.listen(PORT, function () {
    console.log("server running at " + PORT);
  });
});