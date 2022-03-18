require('dotenv').config()
const jwt = require('jsonwebtoken')

const Movie = require('../models/movie')
const Serie = require('../models/series')
const Episode = require('../models/series')

const { createMovieError } = require('../middleware')

module.exports.showAllContent = async (req, res) => {
  const movies = await Movie.find({})
  res.json(movies)
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

module.exports.showOne = async (req, res) => {
  const movie = await Movie.findById(req.params.id)
  if (!movie) {
    return res.send('Cannot find movie')
  }
  return res.send(movie)
}

module.exports.createSerie = async (req, res) => {
  try {
    const {
      serieName,
      releasedYear,
      serieSynopsis,
      serieGenre,
      episodes,
    } = req.body

    if (
      !(serieName && releasedYear && serieSynopsis && serieGenre && episodes)
    ) {
      res.status(400).send('All inputs are required')
    }

    const token = req.headers.authorization.split(' ')[1]

    const tokenUser = jwt.decode(token, { complete: true })

    const serie = await Serie.create({
      name: serieName,
      released_year: releasedYear,
      synopsis: serieSynopsis,
      genre: serieGenre,
      episodes: [
        await Episode.create({
          season: episodes.season,
          ep_name: episodes.ep_name,
          ep_number: episodes.ep_number,
          ep_synopsis: episodes.ep_synopsis,
        }),
      ],
    })
    serie.uploadedBy = tokenUser.payload.user_id
    await serie.save()

    res.status(200).send(serie)
  } catch (error) {
    res.status(400).json(error)
  }
}
