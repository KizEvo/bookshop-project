import express from 'express'
const router = express.Router()
import {
  authenticationUser,
  authorizePermissions,
} from '../middlewares/authentication.js'
import { createOrder, getAllOrders } from '../controllers/orderController.js'

router
  .route('/')
  .post(authenticationUser, createOrder)
  .get(authenticationUser, authorizePermissions('admin'), getAllOrders)

export default router
