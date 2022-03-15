const jwt = require('jsonwebtoken')
const User = require('./models/user')

module.exports.refreshToken = (req, res, next) => {}

module.exports.verifyToken = (req, res, next) => {
  const headerToken = req.headers.authorization

  if (!headerToken) {
    return res.status(403).send('A token is required!')
  }

  const token = headerToken.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY)
    req.user = decoded
    return next()
  } catch (error) {
    //redirect to login page
    return res.status(401).send('Invalid token!')
  }
}

module.exports.createUserError = (err) => {
  console.log(err.message, err.code)
  let errors = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}
module.exports.createMovieError = (err) => {
  console.log(err.message, err.code)
  let errors = {
    name: '',
    released_year: '',
    synopsis: '',
    genre: '',
  }

  if (err.message.includes('movie validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

//admin only requests
module.exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  const decoded = jwt.decode(token, {
    complete: true,
  })
  if (!decoded.payload.isAdmin) {
    res.send('You are not allowed to see this request')
  } else {
    next()
  }
}

//requests for logged user or admin
module.exports.isUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]

  const userId = req.params.id

  const decodedToken = jwt.decode(token, {
    complete: true,
  })
  if (decodedToken.payload.user_id === userId || decodedToken.payload.isAdmin) {
    next()
  } else {
    res.send('You are not allowed to do this!')
  }
}
