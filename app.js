const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

//import routes

const userRouter = require('./routes/userRoute')
const itemRouter = require('./routes/itemRouter')
const cartRouter = require('./routes/cartRouter')
const orderRouter = require('./routes/orderRoute')

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(express.raw())

app.use('/', userRouter)
app.use('/item', itemRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

module.exports = app
