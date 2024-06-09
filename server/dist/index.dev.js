"use strict";

var express = require('express');

var cors = require('cors');

require('dotenv').config();

var connectDB = require('./config/connectDB');

var router = require('./routes/index');

var cookiesParser = require('cookie-parser');

var _require = require('./socket/index'),
    app = _require.app,
    server = _require.server; // const app = express()


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookiesParser());
var PORT = process.env.PORT || 8080;
app.get('/', function (request, response) {
  response.json({
    message: "Server running at " + PORT
  });
}); //api endpoints

app.use('/api', router);
connectDB().then(function () {
  server.listen(PORT, function () {
    console.log("server running at " + PORT);
  });
});