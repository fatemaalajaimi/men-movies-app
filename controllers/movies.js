const express = require('express')
const multer = require('multer')
const router = express.Router()

const Movie = require('../models/movie.js')

// Because I don't need the index page of the movies I will comment this
/*
router.get('/', async (req, res) => {
  try {
    const populatedMovies = await Movie.find({}).populate('owner')

    // Add the following:
    res.render('movies/index.ejs', {
      movies: populatedMovies
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
*/

router.get('/new', async (req, res) => {
  res.render('movies/new.ejs')
})

router.post('/', async (req, res) => {
  console.log(req.body)
  req.body.owner = req.session.user._id
  await Movie.create(req.body)
  res.redirect('/')
})

// Show the details of one movie only
router.get('/:movieId', async (req, res) => {
  try {
    const populatedMovies = await Movie.findById(req.params.movieId).populate(
      'owner'
    )

    res.render('movies/show.ejs', {
      movie: populatedMovies
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.delete('/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
    if (movie.owner.equals(req.session.user._id)) {
      await Movie.deleteOne()
      res.redirect('/')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
})

router.get('/:movieId/edit', async (req, res) => {
  try {
    const currentMovie = await Movie.findById(req.params.movieId)
    res.render('movies/edit.ejs', {
      movie: currentMovie
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.put('/:movieId', async (req, res) => {
  try {
    const currentMovie = await Movie.findById(req.params.movieId)
    if (currentMovie.owner.equals(req.session.user._id)) {
      await currentMovie.updateOne(req.body)
      res.redirect('/')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// Remove the reserved tickets
// router.put('/:movieId/:noTickets', async (req, res) => {
//   try {
//     const currentMovie = await Movie.findById(req.params.movieId)
//     currentMovie.availableTickets -= req.params.noTickets
//     await currentMovie.updateOne(req.body)
//   } catch (error) {
//     console.log(error)
//     res.redirect('/')
//   }
// })

// router.put('/:movieId/:noTickets', async (req, res) => {
//   try {
//     const { movieId, noTickets } = req.params

//     // Find the movie by ID
//     const currentMovie = await Movie.findById(movieId)

//     if (!currentMovie) {
//       return res.status(404).json({ message: 'Movie not found' })
//     }

//     // Parse the number of tickets to deduct
//     const ticketsToDeduct = parseInt(noTickets, 10)

//     if (isNaN(ticketsToDeduct) || ticketsToDeduct <= 0) {
//       return res.status(400).json({ message: 'Invalid number of tickets' })
//     }

//     // Check if there are enough available tickets
//     if (currentMovie.availableTickets < ticketsToDeduct) {
//       return res.status(400).json({ message: 'Not enough tickets available' })
//     }

//     // Deduct the reserved tickets
//     currentMovie.availableTickets -= ticketsToDeduct
//     await currentMovie.save()

//     return res.status(200).json({
//       message: 'Tickets updated successfully',
//       movie: currentMovie
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ message: 'Internal server error' })
//   }
// })

module.exports = router
