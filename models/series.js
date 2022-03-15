const mongoose = require('mongoose')
const Schema = mongoose.Schema

const serieSchema = new Schema({
  name: { String },
  released_year: { Number },
  synopsis: { String },
  genre: { String },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  episodes: [{ type: Schema.Types.ObjectId, ref: 'Episode' }],
})

// serieSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject()
//   object.id = _id
//   return object
// })

module.exports = mongoose.model('Serie', serieSchema)
