import { StatusCodes } from 'http-status-codes'
import { BadRequestError, NotFoundError } from '../errors/index.js'
import { uploadImage } from '../utils/index.js'
import moment from 'moment'
import Product from '../models/Product.js'
import User from '../models/User.js'
import * as Cloudinary from 'cloudinary'
import mongoose from 'mongoose'

const createProduct = async (req, res) => {
  const imageProps = await uploadImage(req)
  req.body.user = req.user.userId
  req.body.image = imageProps.secure_url

  const product = await Product.create(req.body)
  res.status(StatusCodes.CREATED).json({ product })
}

const getAllProducts = async (req, res) => {
  const { category, name, author, sort, price } = req.query

  const queryObject = {}

  if (category && category !== 'all') {
    queryObject.category = category
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }
  }
  if (author) {
    queryObject.author = { $regex: author, $options: 'i' }
  }
  if (price === 0) {
    queryObject.price = { $gte: price }
  } else if (price > 0) {
    queryObject.price = { $lte: price }
  }
  let result = Product.find(queryObject)

  if (sort === 'newest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('createdAt')
  }

  const page = Number(req.query.page) || 1 //get page from query here then update new page number then send back the pages
  const limit = 9

  const skip = (page - 1) * limit
  result = result.skip(skip).limit(limit)

  const products = await result

  const totalProducts = await Product.countDocuments(queryObject)
  const numberOfPages = Math.ceil(totalProducts / limit)

  res.status(StatusCodes.OK).json({ products, totalProducts, numberOfPages })
}

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })
  if (!product) {
    throw new NotFoundError('Product does not exist')
  }
  res.status(StatusCodes.OK).json({ product })
}

const updateProduct = async (req, res) => {
  const { name, author, price, description, category } = req.body
  const product = await Product.findOne({ _id: req.params.id })
  if (!product) {
    throw new NotFoundError('Product does not exist')
  }

  if (!name || !author || !price || !description || !category) {
    throw new BadRequestError('Please provide all values')
  }

  const imageName = product.image.slice(61, -4)
  await Cloudinary.v2.uploader.destroy(imageName, { invalidate: true })

  const imageProps = await uploadImage(req)

  product.name = name
  product.description = description
  product.price = price
  product.author = author
  product.category = category
  product.image = imageProps.secure_url

  await product.save()
  res.status(StatusCodes.OK).json({ product })
}

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id })
  if (!product) {
    throw new NotFoundError('Product does not exist')
  }

  const imageName = product.image.slice(61, -4)
  await Cloudinary.v2.uploader.destroy(imageName, { invalidate: true })

  await product.remove()
  res.status(StatusCodes.OK).json({ msg: 'Product deleted!' })
}

const showStats = async (req, res) => {
  //total user stats
  let totalUser = await User.aggregate([
    { $match: { role: 'user' } },
    { $group: { _id: '$role', count: { $sum: 1 } } },
  ])

  totalUser = totalUser.reduce((acc, curr) => {
    const { _id: genre, count } = curr
    acc[genre] = count
    return acc
  }, {})

  //product category stats

  const matchAdminId =
    req.user.userId === '63ddaca09cd08c87a79a82d9'
      ? '630862af6ba43117e086105e'
      : '630862af6ba43117e086105e'

  let stats = await Product.aggregate([
    { $match: { user: mongoose.Types.ObjectId(matchAdminId) } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: genre, count } = curr
    acc[genre] = count
    return acc
  }, {})

  const defaultValue = {
    adventure: stats.adventure || 0,
    horror: stats.horror || 0,
    classic: stats.classic || 0,
    mystery: stats.mystery || 0,
    fantasy: stats.fantasy || 0,
    historical: stats.historical || 0,
    'sci-fi': stats['sci-fi'] || 0,
  }

  let monthlyUser = await User.aggregate([
    { $match: { role: 'user' } },
    {
      $group: {
        _id: { year: { $year: '$verified' }, month: { $month: '$verified' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 5 },
  ])

  monthlyUser = monthlyUser
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item
      const date = moment()
        .month(month - 1)
        .year(year - 1)
        .format('MMM Y')
      return { date, count }
    })
    .reverse()

  res.json({ defaultValue, totalUser, monthlyUser })
}

export {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
  getSingleProduct,
}
