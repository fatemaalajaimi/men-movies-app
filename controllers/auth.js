const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')

const User = require('../models/user.js')

//Add routers here

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
  //Check if the user already exist or no
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (userInDatabase) {
    return res.send('Username already taken.')
  }

  // Check if passwords match or not
  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match')
  }

  // Hashing the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 10)
  req.body.password = hashedPassword

  // Assign the value Normal to the user type as a default value
  req.body.type = 'Normal'

  // Creating the user
  const user = await User.create(req.body)
  //res.send(`Thanks for signing up ${user.username}`)
  res.render('auth/sign-in.ejs')
})

router.get('/sign-in', (req, res) => {
  res.render('auth/sign-in.ejs')
})

router.post('/sign-in', async (req, res) => {
  // Check it the user exist or not
  const userInDatabase = await User.findOne({ username: req.body.username })
  if (!userInDatabase) {
    return res.send('Login failed. Please try again.')
  }

  // Check if the entered user matches the one stored in the DB
  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  )
  if (!validPassword) {
    return res.send('Login failed. Please try again.')
  }

  // There is a user AND they had the correct password. Time to make a session!
  // Avoid storing the password, even in hashed format, in the session
  // If there is other data you want to save to `req.session.user`, do so here!
  req.session.user = {
    type: userInDatabase.type,
    username: userInDatabase.username,
    _id: userInDatabase._id
  }

  res.redirect('/')
})

router.get('/sign-out', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

module.exports = router
