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
  import {  checkout , paymentVerification } from '../controllers/sessionController.js'


  router.route('/register').post(registerUser).get(protect, getUsers)
  router.post('/login', authUser)
  router.get('/user/logout',logout)
  
  router
  .put('/user', getUserById)

  router.route("/user/session/checkout").post(checkout);
  router.route("/user/session/paymentverification").post(paymentVerification);



  export default router