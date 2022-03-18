const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
  name: String,
  released_year: Number,
  synopsis: String,
  genre: String,
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

module.exports = mongoose.model('Movie', movieSchema)
