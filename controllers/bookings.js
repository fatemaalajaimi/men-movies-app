const express = require('express')
const axios = require('axios')
const router = express.Router()

const Booking = require('../models/booking.js')
const Movie = require('../models/movie.js')

router.get('/displayBookings/:userId', async (req, res) => {
  // I have to return user's booking only not all of them
  const populatedBookings = await Booking.find({}).populate('movieID')

  console.log(allBookings)

  //res.render('movies/new.ejs')
})

router.post('/new/:movieId', async (req, res) => {
  try {
    req.body.userID = req.session.user._id
    req.body.movieID = req.params.movieId
    await Booking.create(req.body)

    // I have to deduct the number of reserved ticket from number of available tickets
    // Call the movies route to update available tickets
    // const movieServiceUrl = `http://localhost:3000/movies/${req.session.user._id}/${req.body.ticketsCount}`
    // const movieResponse = await axios.put(movieServiceUrl)

    // if (movieResponse.status !== 200) {
    //   return res
    //     .status(movieResponse.status)
    //     .json({ message: movieResponse.data.message })
    // }

    res.redirect('/')
  } catch (err) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
