const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  items: [
    {
      itemId: String,
      quantity: Number,
      price: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  invoice: {
    type: String,
    required: true,
  },
  totalPrice: { type: Number, required: true },
  status: ['pending', 'shipped', 'delivered'],
  createdAt: Date,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
