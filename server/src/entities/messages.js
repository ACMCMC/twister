const mongoose = require('../db/conn.js');
const User = require('./users.js');

const messageSchema = new mongoose.Schema({
  text: {type: String, unique: false, required: true},
  created: {type: Date, default: Date.now},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  liked_by: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  parent: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: false},
});

messageSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.__v;
    return obj;
}

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;