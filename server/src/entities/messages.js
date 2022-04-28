const mongoose = require('../db/conn.js');

const messageSchema = new mongoose.Schema({
  text: {type: String, unique: false, required: true},
  created: {type: Date, default: Date.now},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  liked_by: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;