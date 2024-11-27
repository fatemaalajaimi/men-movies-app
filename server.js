const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const session = require('express-session')

const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')

const Movie = require('./models/movie.js')

// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000'

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }))
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'))
// Morgan for logging HTTP requests
app.use(morgan('dev'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)

// Add our custom middleware right after the session middleware
app.use(passUserToView)

//Route - Go directly to home page
app.get('/', async (req, res) => {
  try {
    const populatedMovies = await Movie.find({}).populate('owner')

    // Add the following:
    res.render('index.ejs', {
      movies: populatedMovies
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

const authController = require('./controllers/auth.js')
const moviesController = require('./controllers/movies.js')
const bookingController = require('./controllers/bookings.js')

app.use('/auth', authController)
app.use('/movies', isSignedIn, moviesController)
app.use('/bookings', isSignedIn, bookingController)

app.listen(port, () => {
  console.log(`The express app is r
    eady on port ${port}!`)
})
