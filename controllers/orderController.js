const Order = require('./../models/Order')
const Cart = require('./../models/Cart')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const stripe = require('stripe')(
  'sk_test_51NQwFaI3n3pvzwuN6t5HrEDL2kqtWBMQIM1YjYaRcurW7rjcUJP329r1WupgVmroPLvWIuyCJerUq5wZ8sV5MMbr00e7TbEKCc'
)

const getOrders = async (req, res) => {
  const ownerId = req.user._id

  try {
    const order = await Order.find({ ownerId: ownerId }).sort({ date: -1 })
    res.status(200).send(order)
  } catch (err) {
    res.status(500).send(err)
  }
}

const stripePayment = async (req, res, next) => {
  const ownerId = req.user._id

  try {
    const cart = await Cart.findOne({ ownerId })

    console.log(cart.items)

    if (cart && cart.items.length > 0) {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cart.items.map((item) => {
          return {
            price_data: {
              currency: 'cad',
              product_data: {
                name: item.name,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          }
        }),
        success_url: 'http://localhost:3000',
        cancel_url: 'http://localhost:3000',
      })

      res.status(200).json({
        status: 'success',
        url: session.url,
        session: session,
        cartId: cart._id,
      })
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}

module.exports = { getOrders, stripePayment }
