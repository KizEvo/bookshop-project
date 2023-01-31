import express from 'express'
const router = express.Router()
import {
  authenticationUser,
  authorizePermissions,
} from '../middlewares/authentication.js'
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getPersonalUserOrders,
  getSingleOrder,
  updateOrder,
} from '../controllers/orderController.js'

router
  .route('/')
  .post(authenticationUser, createOrder)
  .get(authenticationUser, authorizePermissions('admin'), getAllOrders)

router
  .route('/getPersonalUserOrders')
  .get(authenticationUser, getPersonalUserOrders)

router
  .route('/:id')
  .get(authenticationUser, authorizePermissions('admin'), getSingleOrder)
  .patch(authenticationUser, authorizePermissions('admin'), updateOrder)
  .delete(authenticationUser, authorizePermissions('admin'), deleteOrder)

export default router
