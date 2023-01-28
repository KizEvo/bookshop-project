import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'
import checkPermissions from '../utils/checkPermissions.js'

const fakeStripeAPI = (amount, currency) => {
  const client_secret = 'randomSecret'
  return { amount, client_secret }
}

const createOrder = async (req, res) => {
  const { productsInCart } = req.body

  if (!productsInCart || productsInCart.length < 1) {
    throw new BadRequestError('There is no products in cart')
  }

  let orderProducts = []
  let totalPrice = 0

  for (const product of productsInCart) {
    const productInDB = await Product.findOne({ _id: product.id })
    if (!productInDB) {
      throw new NotFoundError(`No product with this ID: ${product.id}`)
    }

    const { name, price, image, _id } = productInDB
    const singleOrderProduct = {
      name,
      image,
      quantity: product.quantity,
      price,
      productId: _id,
    }

    orderProducts = [...orderProducts, singleOrderProduct]
    totalPrice = totalPrice + product.quantity * price
  }

  const paymentIntent = fakeStripeAPI({ amount: totalPrice, currency: 'usd' })

  const order = await Order.create({
    orderProducts,
    totalPrice,
    user: req.user.userId,
    clientSecret: paymentIntent.client_secret,
  })

  res
    .status(StatusCodes.CREATED)
    .json({ order, clientSecret: order.clientSecret })
}

const getPersonalUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId })
    .select('createdAt orderProducts status totalPrice user')
    .sort('-createdAt')

  res.status(StatusCodes.OK).json({ orders })
}

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
  res.status(StatusCodes.OK).json({ orders })
}

export { createOrder, getAllOrders, getPersonalUserOrders }
