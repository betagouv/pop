const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport')
router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(bodyParser.json())
const User = require('../models/user')
require('../passport')(passport)
const config = require('../config.js')

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({
      success: false,
      msg: 'Please pass username and password.'
    })
  } else {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password
    })
    newUser.save(function (err) {
      console.log(err)
      if (err) {
        return res.status(400).json({
          success: false,
          msg: 'Username already exists.'
        })
      }
      res.status(200).json({
        success: true,
        msg: 'Successful created new user.'
      })
    })
  }
})

router.post('/signin', (req, res) => {
  User.findOne({
    username: req.body.username
  }, function (err, user) {
    if (err) throw err

    if (!user) {
      res.status(401).send({
        success: false,
        msg: 'Authentication failed. User not found.'
      })
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign({_id: user._id}, config.secret)
          res.json({
            success: true,
            token: 'JWT ' + token
          })
        } else {
          res.status(401).send({
            success: false,
            msg: 'Authentication failed. Wrong password.'
          })
        }
      })
    }
  })
})

router.post('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.send({
    success: true,
    msg: 'It works!'
  })
})

module.exports = router
