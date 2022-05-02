const mongoose = require('../db/conn.js');

const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  username: {type: String, unique: true, required: true},
  created: {type: Date, default: Date.now},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  birthdate: {type: Date, required: false},
});

userSchema.pre("save", function (next) {
  const user = this;
  const saltRounds = 10;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError);
          }

          user.password = hash
          next();
        })
      }
    })
  } else {
    return next();
  }
});

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(error, isMatch) {
    if (error) {
      return callback(error)
    } else {
      callback(null, isMatch)
    }
  })
};

userSchema.methods.toJSON = function() {
  var obj = this.toObject()
  delete obj.password
  return obj
}

const User = mongoose.model('User', userSchema);

module.exports = User;