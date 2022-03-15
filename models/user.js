const mongoose = require('mongoose')

const { isEmail } = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  first_name: {
    type: String,
    default: null,
    required: [true, 'Please enter your first name'],
  },
  last_name: {
    type: String,
    default: null,
    required: [true, 'Please provide your last name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    // minlength: [8, "Minimum password length is 8 characters"], not working bc of hash
  },
  token: { type: String },
  admin: { type: Boolean, default: false },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
  series: [{ type: Schema.Types.ObjectId, ref: 'Serie' }],
})

userSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

module.exports = mongoose.model('User', userSchema)
