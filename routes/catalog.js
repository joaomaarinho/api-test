const express = require('express')
const router = express.Router()

const catalog = require('../controllers/catalog')
const catchAsync = require('../utils/catchAsync')
const { verifyToken, isAdmin } = require('../middleware')

router
  .route('/register-movie')
  .post(verifyToken, catchAsync(catalog.createMovie))

router
  .route('/register-serie')
  .post(verifyToken, catchAsync(catalog.createSerie))

router.route('/catalogo').get(verifyToken, catchAsync(catalog.showAllContent))

router
  .route('/catalog/:id')
  .get(verifyToken, catchAsync(catalog.showOne))
  .delete(verifyToken, catchAsync(catalog.deleteOne))
  .put(verifyToken, catchAsync(catalog.editOne))

module.exports = router
