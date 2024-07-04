const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return res.status(401).json({
      status: 'Failed',
      message: 'Authentication required',
    })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decodedToken.userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    req.user = user
    next()
  } catch (err) {
    res.status(401).json({
      message: 'Invalied token',
    })
  }
}

const restrictTo = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'failed',
      message: 'You do not have permission to perform this action',
    })
  }
  next()
}
module.exports = { authenticate, restrictTo }
