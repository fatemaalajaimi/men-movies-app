const mongoose = require('mongoose')
/*
- id
- user id
- movie id
- chosen date
- number of tickets
- timestamp
*/

const bookingSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    movieID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    bookingDate: {
      type: Date,
      required: true
    },
    ticketsCount: {
      type: Number,
      required: true,
      min: 1,
      max: 30
    }
  },
  {
    timestamps: true
  }
)

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
