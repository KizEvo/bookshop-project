import express from 'express'
const router = express.Router()
import {
  authenticationUser,
  authorizePermissions,
} from '../middlewares/authentication.js'

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  showStats,
  getSingleProduct,
} from '../controllers/productController.js'

router
  .route('/')
  .post(authenticationUser, authorizePermissions('admin'), createProduct)
  .get(getAllProducts)

router
  .route('/stats')
  .get(authenticationUser, authorizePermissions('admin'), showStats)

router
  .route('/:id')
  .get(getSingleProduct)
  .delete(authenticationUser, authorizePermissions('admin'), deleteProduct)
  .patch(authenticationUser, authorizePermissions('admin'), updateProduct)

export default router
