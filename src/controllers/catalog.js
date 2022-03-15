require('dotenv').config()
const jwt = require('jsonwebtoken')

const Movie = require('../models/movie')
const Serie = require('../models/series')
const Episode = require('../models/series')
const User = require('../models/user')

const { createMovieError } = require('../middleware')

module.exports.showAllContent = async (req, res) => {
  const movies = await Movie.find({})

  const moviesMap = {}

  movies.forEach((movie) => {
    moviesMap[movie._id] = movie
  })
  res.send(moviesMap)
}

module.exports.createMovie = async (req, res) => {
  try {
    const { movieName, releasedYear, description, movieGenre } = req.body

    if (!(movieName && releasedYear && description && movieGenre)) {
      res.status(400).send('All inputs are required')
    }

    const token = req.headers.authorization.split(' ')[1]

    const tokenUser = jwt.decode(token, { complete: true })

    const movie = await Movie.create({
      name: movieName,
      released_year: releasedYear,
      synopsis: description,
      genre: movieGenre,
    })
    movie.uploadedBy = tokenUser.payload.user_id
    await movie.save()

    res.status(200).send(movie)
  } catch (error) {
    res.status(400).json(createMovieError(error))
  }
}
