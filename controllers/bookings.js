const express = require('express')
const axios = require('axios')
const router = express.Router()

const Booking = require('../models/booking.js')
const Movie = require('../models/movie.js')

router.get('/displayBookings', async (req, res) => {
  // I have to return user's booking only not all of them
  const populatedBookings = await Booking.find({
    userID: req.session.user._id
  }).populate('movieID')

  // console.log(allBookings)

  res.render('bookings/show.ejs', {
    bookings: populatedBookings
  })
})

router.post('/new/:movieId', async (req, res) => {
  try {
    req.body.userID = req.session.user._id
    req.body.movieID = req.params.movieId
    await Booking.create(req.body)

    // I have to deduct the number of reserved ticket from number of available tickets

    const selectedMovie = await Movie.findById(req.params.movieId)

    console.log(selectedMovie)
    console.log(req.body.ticketsCount)
    selectedMovie.availableTickets -= req.body.ticketsCount

    await selectedMovie.save()

    res.redirect('/')
  } catch (err) {
    console.error(error)
    res.redirect('/')
  }
})

module.exports = router
