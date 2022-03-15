const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = require('./user')

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

movieSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = mongoose.model('Movie', movieSchema)
