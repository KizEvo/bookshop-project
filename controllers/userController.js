import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from '../errors/index.js'
import User from '../models/User.js'
import Token from '../models/Token.js'
import {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
} from '../utils/index.js'

const getAllUsers = async (req, res) => {
  const users = await User.find({})
  res.status(StatusCodes.OK).json({ users, totalUsers: users.length })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id })
  if (!user) {
    throw new NotFoundError('No user with this id')
  }
  checkPermissions(req.user, user._id)
  res.status(StatusCodes.OK).json({ user })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  const { name, email, lastName, location, shippingLocation } = req.body
  if (!name || !email || !lastName || !location || !shippingLocation) {
    throw new BadRequestError('Please provide all values')
  }
  const user = await User.findOne({ _id: req.user.userId })

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  user.name = name
  user.email = email
  user.lastName = lastName
  user.location = location
  user.shippingLocation = shippingLocation

  await user.save()
  const tokenUser = createTokenUser(user)
  // attachCookiesToResponse({res, user: tokenUser})

  let refreshToken = ''

  // check for existing token, if true use it
  const existingToken = await Token.findOne({ user: user._id })
  if (existingToken) {
    const { isValid } = existingToken
    if (!isValid) {
      throw new UnauthenticatedError('Invalid credentials')
    }
    refreshToken = existingToken.refreshToken

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })
    res.status(StatusCodes.OK).json({ user: tokenUser })
    return
  }

  refreshToken = crypto.randomBytes(40).toString('hex')
  const userAgent = req.headers['user-agent']
  const ip = req.ip
  const userToken = { refreshToken, ip, userAgent, user: user._id }
  await Token.create(userToken)

  attachCookiesToResponse({ res, user: tokenUser, refreshToken })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const updateUserPassword = async (req, res) => {
  res.send('update user password')
}

export {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
