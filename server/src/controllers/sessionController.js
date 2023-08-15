import Session from "../models/session.js";
import asyncHandler from "express-async-handler";
import nodeSchedule from "node-schedule";
import sendReminderEmail from "../../utils/sessionReminder.js";
import OrderConfirmEmail from "../../utils/sessionBookedEmail.js";
import crypto from "crypto";
import { instance } from "../../index.js";

const checkout = asyncHandler(async(req, res)=>{ 
  const options = {
    amount: Number(req.body.amount) * 100, 
    currency: "INR",
  }

  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
     order,
  });
})

const paymentVerification= asyncHandler(async(req, res)=>{
  try {
  const {userId, name, email, phoneNumber,appointmentDate, appointmentTime, appointmentType , razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;
    if (!userId || !email || !name || !phoneNumber  || !appointmentDate || !appointmentTime || !appointmentType) {
      throw new Error("provide all details during registeration ...");
    }

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {

    const newSession = new Session({
      userId: userId,
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      appointmentType: appointmentType,
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
    });
    
    const session = await newSession.save();
    console.log(session);
    OrderConfirmEmail({email : email, name: name, date: appointmentDate, time: appointmentTime, mode: appointmentType});
    const desiredDate = new Date(appointmentDate);
    const oneDayBeforeDesiredDate = new Date(desiredDate.getTime() - 8 * 60 * 60 * 1000);
    const job1 = nodeSchedule.scheduleJob(oneDayBeforeDesiredDate, () => {
      sendReminderEmail({email : email, name: name, date: appointmentDate, time: appointmentTime, mode: appointmentType});
    });
    
  } else {
    res.status(400).json({
      success: false,
    });
  }
  res.status(200).json({ success: true, message: "payment successful"})
 }catch (error) {
    res.status(500).json({ success: false, message: error.message });
 }
});


const getSessions = asyncHandler(async(req, res)=>{
  const {userId} = req.body;
  const documents = await Session.find({userId: userId});

  try{
    if(documents){
      res.status(200).json({ success: true, message: documents})
  }
  else{
    res.status(400).json({ success: false, message: "no sessions found"})
  }
  }catch(error){
    res.status(500).json({ success: false, message: error.message });
  }
});

export { checkout, paymentVerification , getSessions};