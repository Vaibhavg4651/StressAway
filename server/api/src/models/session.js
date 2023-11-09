import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
    {
      userId:{
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      appointmentDate: {
        type: String,
        required: true,
      },
      appointmentTime: {
        type: String,
        required: true,
      }, 
      appointmentType:{
        type: String,
        required: true,
      },
      razorpay_order_id: {
        type: String,
        required: true,
      },
      razorpay_payment_id: {
        type: String,
        required: true,
      },
      razorpay_signature:{
        type: String,
        required: true,
      } 
    },
    { timestamps: true }
  );
  const session = mongoose.model('session', sessionSchema)
  
  export default session