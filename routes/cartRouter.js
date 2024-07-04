const express = require('express')
const cartController = require('./../controllers/cartController')
const { authenticate, restrictTo } = require('../middleware/auth')
const router = express.Router()

router
  .route('/')
  .post(authenticate, cartController.createCart)
  .get(authenticate, cartController.getCartItems)

router.route('/').delete(authenticate, cartController.deleteItem)

module.exports = router
