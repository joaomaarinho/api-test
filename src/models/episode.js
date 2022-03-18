const mongoose = require('mongoose')
const Schema = mongoose.Schema

const episodeSchema = new Schema({
  season: { Number },
  name: { String },
  ep_number: { Number },
  synopsis: { String },
  ref_show: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
})

// episodeSchema.method('toJSON', function () {
//   const { __v, _id, ...object } = this.toObject()
//   object.id = _id
//   return object
// })

module.exports = mongoose.model('Episode', episodeSchema)
