const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: Number,
  category: {
    type: Array,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: {
    type: Array,
  },
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item
