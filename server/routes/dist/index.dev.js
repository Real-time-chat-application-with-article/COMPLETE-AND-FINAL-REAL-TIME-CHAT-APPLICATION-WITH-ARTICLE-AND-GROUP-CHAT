"use strict";

var express = require('express');

var registerUser = require('../controller/registerUser');

var checkEmail = require('../controller/checkEmail');

var checkPassword = require('../controller/checkPassword');

var userDetails = require('../controller/userDetails');

var logout = require('../controller/logout');

var updateUserDetails = require('../controller/updateUserDetails');

var searchUser = require('../controller/searchUser');

var GroupAcessing = require('../controller/joinGroup');

var router = express.Router(); //create user api

router.post('/register', registerUser); //check user email

router.post('/email', checkEmail); //check user password

router.post('/password', checkPassword); //login user details

router.get('/user-details', userDetails); //logout user

router.get('/logout', logout); //update user details

router.post('/update-user', updateUserDetails); //search user

router.post("/search-user", searchUser);
router.post("/groupsignup", GroupAcessing);
module.exports = router;