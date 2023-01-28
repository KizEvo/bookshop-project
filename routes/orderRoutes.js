import express from 'express'
const router = express.Router()
import {
  authenticationUser,
  authorizePermissions,
} from '../middlewares/authentication.js'
import {
  createOrder,
  getAllOrders,
  getPersonalUserOrders,
} from '../controllers/orderController.js'

router
  .route('/')
  .post(authenticationUser, createOrder)
  .get(authenticationUser, authorizePermissions('admin'), getAllOrders)

router
  .route('/getPersonalUserOrders')
  .get(authenticationUser, getPersonalUserOrders)

export default router
