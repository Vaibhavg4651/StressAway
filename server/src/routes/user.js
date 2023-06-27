import express from 'express'
const router = express.Router()
import {
    authUser,
  registerUser,
  logout,
  getUsers,
  getUserById,
  } from '../controllers/userController.js'
  import { protect } from '../../middleware/authMiddleware.js'



  router.route('/register').post(registerUser).get(protect, getUsers)
  router.post('/login', authUser)
  router.post('/logout', protect,logout)
  
  router
  .route('/:id')
  .get(protect, getUserById)


  export default router