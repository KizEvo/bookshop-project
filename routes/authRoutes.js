import express from 'express'
const router = express.Router()
import { authenticationUser } from '../middlewares/authentication.js'

import {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js'

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verify-email').post(verifyEmail)
router.route('/logout').delete(authenticationUser, logout)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password').post(resetPassword)

export default router
