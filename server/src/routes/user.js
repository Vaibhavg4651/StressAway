import express from 'express'
const router = express.Router()
import {
    authUser,
  registerUser,
  logout,
  getUsers,
  getUserById,
  updateTest,
  updatePassword
  } from '../controllers/userController.js'
  import { protect } from '../../middleware/authMiddleware.js'
  import {  checkout , paymentVerification , getSessions } from '../controllers/sessionController.js'


  router.route('/register').post(registerUser).get(protect, getUsers)
  router.post('/login', authUser)
  router.get('/user/logout',logout)
  
  //to add current mood
  router
  .put('/user', getUserById)
  
  //to add the Test Data
  router
  .put('/user/test', updateTest)
  
  //to reset the password
  router
  .put('/user/resetpassword', updatePassword)

  router.route("/user/session/checkout").post(checkout); // to create a new session
  router.route("/user/getsessions").post(getSessions); // to get all the sessions of a user
  router.route("/user/session/paymentverification").post(paymentVerification); // to verify the payment



  export default router