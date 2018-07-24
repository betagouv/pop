const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt.hash(this.password, 10, (e, hash) => {
      this.password = hash
      next()
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, res) {
    if (err) {
      return cb(err)
    }
    cb(null, res)
  })
}

module.exports = mongoose.model('User', UserSchema)
