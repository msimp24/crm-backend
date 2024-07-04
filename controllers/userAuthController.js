const User = require('../models/User')
const jwt = require('jsonwebtoken')

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body

  try {
    const user = new User({ email, password, confirmPassword })
    await user.save()
    res.status(201).json({
      status: 'Success',
      user: user,
    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    })
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    if (!email) {
      return res.status(401).json({ message: 'Please enter an email address' })
    }

    const user = await User.findOne({ email: email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Incorrect password' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour',
    })
    res.json({ token, user })
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: error.message,
    })
  }
}

const getUser = (req, res, next) => {
  const user = req.user

  res.status(200).json({
    user: user,
  })
}

module.exports = { register, login, getUser }
