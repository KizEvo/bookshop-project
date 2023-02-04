import express from 'express'
const router = express.Router()

import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js'

import {
  authenticationUser,
  authorizePermissions,
  unauthenticateTestAdmin,
} from '../middlewares/authentication.js'

router
  .route('/')
  .get(authenticationUser, authorizePermissions('admin'), getAllUsers)

router.route('/showMe').get(authenticationUser, showCurrentUser)
router
  .route('/updateUser')
  .patch(authenticationUser, unauthenticateTestAdmin, updateUser)

router
  .route('/updateUserPassword')
  .patch(authenticationUser, unauthenticateTestAdmin, updateUserPassword)

router.route('/:id').get(authenticationUser, getSingleUser)

export default router
