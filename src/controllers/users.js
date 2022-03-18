require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs/dist/bcrypt')
const { toJSON } = require('flatted')

const User = require('../models/user')
const { createUserError } = require('../middleware')

module.exports.showAllUsers = async (req, res) => {
  const users = await User.find()

  res.json(users)
}

module.exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, admin } = req.body

    if (!(email && password && first_name && last_name)) {
      res.status(400).send('Please, all inputs are required!')
    }

    const oldUser = await User.findOne({
      email,
    })

    if (oldUser) {
      return res.status(409).send('User already exists! Try logging in')
    }

    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      admin,
    })

    const token = jwt.sign(
      {
        user_id: user._id,
        email,
        isAdmin: user.admin,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: '3h',
      },
    )
    user.token = token

    res.header('Authorization', token).status(201).send(user)
  } catch (err) {
    console.log(err)
    res.status(400).json(createUserError(err))
  }
}

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(400).send('Please, all inputs are required!')
    }

    const user = await User.findOne({
      email,
    })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: await user._id,
          email,
          isAdmin: user.admin,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '3h',
        },
      )
      user.token = token

      if (!req.headers.authorization) {
        res.header('Authorization', token)
      }

      res.status(201).json(user)
    }

    res.status(400).send('Invalid email or password')
  } catch (error) {
    console.log(error)
  }
}

module.exports.logoutUser = (req, res) => {
  res.header('Authorization', '')
  // delete header.authorization
}

module.exports.showUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    return res.send('Cannot find user')
  }
  return res.send(user)
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params
  await User.findByIdAndDelete(id)
  res.send('User successfully deleted')
}

module.exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const update = req.body
    const user = await User.findByIdAndUpdate(id, update)
    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
}
