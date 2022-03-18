const express = require('express')
const router = express.Router()

const {
  createMovie,
  showAllContent,
  showOne,
  deleteOne,
  editOne,
} = require('../controllers/catalog')
const catchAsync = require('../utils/catchAsync')
const { verifyToken, isAdmin } = require('../middleware')

router.route('/register-movie').post(verifyToken, catchAsync(createMovie))

router.route('/catalogo').get(verifyToken, catchAsync(showAllContent))

router
  .route('/catalog/:id')
  .get(verifyToken, catchAsync(showOne))
  .delete(verifyToken, catchAsync(deleteOne))
  .put(verifyToken, catchAsync(editOne))

module.exports = router
