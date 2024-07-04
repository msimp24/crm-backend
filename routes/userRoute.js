const express = require('express')
const userAuth = require('../controllers/userAuthController')
const { authenticate, restrictTo } = require('../middleware/auth')
const router = express.Router()

router.route('/register').post(userAuth.register)
router.route('/login').post(userAuth.login)
router.route('/profile').get(authenticate, restrictTo, userAuth.getUser)

module.exports = router
