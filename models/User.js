const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is a required field'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Tour name must only contain characters'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      validate: {
        //This only works on SAVE and CREATE!!
        validator: function (el) {
          return el === this.password
        },
        message: 'Passwords are not the same',
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true }
)

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  // if the user is changing the password, we will create a new hash for it,
  // if not, we simply return
  if (!this.isModified('password')) return next()

  this.password = await bcrypt.hash(this.password, 12)

  this.confirmPassword = undefined
  next()
})

// Compare the given password with the hashed password in the database
userSchema.methods.correctPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}
const User = mongoose.model('User', userSchema)

module.exports = User
