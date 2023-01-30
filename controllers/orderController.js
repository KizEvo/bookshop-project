import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

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
  const { orderId } = req.query

  if (orderId && orderId.length !== 24)
    throw new BadRequestError('Please provide the correct Order ID format')

  const page = Number(req.query.page) || 1
  const limit = 5

  const skip = (page - 1) * limit

  const filterOrder = []
  if (orderId) {
    filterOrder.push(
      { $match: { _id: mongoose.Types.ObjectId(orderId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'users',
        },
      },
      {
        $unwind: '$users',
      },
      {
        $project: {
          orderProducts: 1,
          totalPrice: 1,
          status: 1,
          createdAt: 1,
          customerInfo: {
            name: '$users.name',
            shippingLocation: '$users.shippingLocation',
          },
        },
      }
    )
  } else if (!orderId) {
    filterOrder.push(
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'users',
        },
      },
      { $unwind: '$users' },
      {
        $project: {
          orderProducts: 1,
          totalPrice: 1,
          status: 1,
          createdAt: 1,
          customerInfo: {
            name: '$users.name',
            shippingLocation: '$users.shippingLocation',
          },
        },
      }
    )
  }

  const totalOrders = await Order.countDocuments({})
  const numberOfPagesOrders = Math.ceil(totalOrders / limit)

  const dataToSendBack = await Order.aggregate(filterOrder)

  res.status(StatusCodes.OK).json({
    orders: dataToSendBack,
    numberOfPagesOrders,
  })
}

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id

  if (orderId.length !== 24)
    throw new BadRequestError('Please provide the correct Order ID format')

  const order = await Order.findById(orderId).select('-clientSecret')

  if (!order) throw new NotFoundError('No order was found with this ID')

  res.status(StatusCodes.OK).json({ order })
}

const deleteOrder = async (req, res) => {
  const orderId = req.params.id

  if (orderId.length !== 24)
    throw new BadRequestError('Please provide the correct order ID format')

  await Order.deleteOne({ _id: orderId })
  res.status(StatusCodes.OK).json('success')
}

export {
  createOrder,
  getAllOrders,
  getPersonalUserOrders,
  getSingleOrder,
  deleteOrder,
}
