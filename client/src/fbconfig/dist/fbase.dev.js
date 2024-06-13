"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = exports.db = exports.auth = void 0;

var _app = require("firebase/app");

var _auth = require("firebase/auth");

var _firestore = require("firebase/firestore");

var _storage = require("firebase/storage");

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var firebaseConfig = {
  apiKey: "AIzaSyBkcfRwUbkn63VjO2TKFvKhXVoS-DVgq8M",
  authDomain: "react-firebase-ccf3e.firebaseapp.com",
  projectId: "react-firebase-ccf3e",
  storageBucket: "react-firebase-ccf3e.appspot.com",
  messagingSenderId: "1716554590",
  appId: "1:1716554590:web:05004484f17f7518d45dcf",
  measurementId: "G-9R7GRDXBL8"
}; // Initialize Firebase

var app = (0, _app.initializeApp)(firebaseConfig);
var auth = (0, _auth.getAuth)(app);
exports.auth = auth;
var db = (0, _firestore.getFirestore)(app);
exports.db = db;
var storage = (0, _storage.getStorage)(app);
exports.storage = storage;