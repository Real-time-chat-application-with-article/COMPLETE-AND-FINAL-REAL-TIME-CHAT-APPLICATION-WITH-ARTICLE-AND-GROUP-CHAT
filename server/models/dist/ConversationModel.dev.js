"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  text: {
    type: String,
    "default": ""
  },
  imageUrl: {
    type: String,
    "default": ""
  },
  videoUrl: {
    type: String,
    "default": ""
  },
  seen: {
    type: Boolean,
    "default": false
  },
  msgByUserId: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});
var conversationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User-Info'
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'User-Info'
  },
  messages: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Message'
  }]
}, {
  timestamps: true
});
var MessageModel = mongoose.model('Message', messageSchema);
var ConversationModel = mongoose.model('Conversation', conversationSchema);
module.exports = {
  MessageModel: MessageModel,
  ConversationModel: ConversationModel
};