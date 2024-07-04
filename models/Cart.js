const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    items: [
      {
        itemId: {
          type: String,
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: Number,
      },
    ],
    bill: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
