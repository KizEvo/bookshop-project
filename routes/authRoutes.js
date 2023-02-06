import express from 'express'
const router = express.Router()
import { authenticationUser } from '../middlewares/authentication.js'
import rateLimiter from 'express-rate-limit'

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
})

import {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/verify-email').post(verifyEmail)
router.route('/logout').delete(authenticationUser, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

export default router
