import User from '../models/User.js'
import Token from '../models/Token.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import {
  attachCookiesToResponse,
  createTokenUser,
  sendResetPasswordEmail,
  sendVerificationEmail,
} from '../utils/index.js'
import crypto from 'crypto'

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  if (name.length <= 3) {
    throw new BadRequestError(
      'Please enter more than 3 characters for your name'
    )
  }

  if (password.length <= 5) {
    throw new BadRequestError('Your password is too short, please try again')
  }

  const isEmailExist = await User.findOne({ email })
  if (isEmailExist) {
    throw new BadRequestError('Email already exist')
  }

  const isFirstAccount = await User.countDocuments({})
  const role = isFirstAccount === 0 ? 'admin' : 'user'

  const verificationToken = crypto.randomBytes(40).toString('hex')
  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  })

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: process.env.ORIGIN,
  })

  res.status(StatusCodes.CREATED).json({
    msg: 'success! please verify your email to continue',
  })
}

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Verification Failed')
  }

  if (user.verificationToken !== verificationToken) {
    throw new UnauthenticatedError('Verification Failed')
  }

  user.isVerified = true
  user.verified = Date.now()
  user.verificationToken = ''

  await user.save()

  res.status(StatusCodes.OK).json({ msg: 'Email Verified!' })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError('Please verify your email')
  }

  const tokenUser = createTokenUser(user)

  // create refresh token
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

const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId })

  res.cookie('refreshToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.cookie('accessToken', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: 'User logged out' })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new BadRequestError('Please provide a valid email')
  }

  const user = await User.findOne({ email })
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString('hex')
    const fiveMins = 1000 * 60 * 5
    const passwordTokenExpirateDate = new Date(Date.now() + fiveMins)

    user.passwordToken = passwordToken
    user.passwordTokenExpirateDate = passwordTokenExpirateDate

    await user.save()

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      passwordToken: user.passwordToken,
      origin: process.env.ORIGIN,
    })
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Please check your email for reset password link' })
}

const resetPassword = async (req, res) => {
  const { token, email, password } = req.body

  if (!token || !email || !password) {
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({ email })
  if (user) {
    const currentDate = new Date()

    if (
      user.passwordToken === token &&
      user.passwordTokenExpirateDate > currentDate
    ) {
      user.password = password
      user.passwordToken = null
      user.passwordTokenExpirateDate = null
      await user.save()
    }
  }
  res.status(StatusCodes.OK).json({ msg: 'Success' })
}

export { register, login, verifyEmail, logout, forgotPassword, resetPassword }
