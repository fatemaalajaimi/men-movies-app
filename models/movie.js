const mongoose = require('mongoose')
/*
- Name
- Category
- Running Time
- Release Date
- Language
- Subtitle(s)
- image
- User ID (FK)
- timestamp
*/

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    runningTime: {
      type: String,
      required: true
    },
    releaseDate: {
      type: Date,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    availableTickets: {
      type: Number,
      required: true,
      default: 30
    },
    image: {
      type: String,
      required: false,
      default:
        'https://cdn.cinematerial.com/p/297x/fhfecufs/the-batman-movie-poster-md.jpg?v=1645104442'
    },
    owner: {
      // This is like the FK (_id)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // The name of the model that we exported
    }
  },
  {
    timestamps: true
  }
)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie
