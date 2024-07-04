const express = require('express')
const orderController = require('./../controllers/orderController')
const { authenticate, restrictTo } = require('../middleware/auth')
const router = express.Router()

router.route('/payment').post(authenticate, orderController.stripePayment)

module.exports = router
