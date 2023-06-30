// const sdk = require('api')('@phonepe-docs/v1#199b5kmnlcno4ot5');
import Session from "../models/session.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendemail.js";
import crypto from "crypto";


const registerSession = asyncHandler(async (req, res) => {
    const {userId, name, email, phoneNumber,appointmentDate, appointmentTime, appointmentType } = req.body;
    if (!userId || !email || !name || !phoneNumber  || !appointmentDate || !appointmentTime || !appointmentType) {
      throw new Error("provide all details during registeration ...");
    }
  
    
    // const hashedpassword = await bcrypt.hash(req.body.password, 10);
    const code = crypto.randomBytes(32).toString("hex");

    // sdk.payApi1()
    //   .then(({ data }) => console.log(data))
    //   .catch(err => console.error(err));
  
    const newSession = new Session({
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
      phoneNumber:req.body.phoneNumber,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      appointmentType: req.body.appointmentType,
    });

    const session = await newSession.save();
  sendEmail(req.body.email, code);
  res.status(200).json({ success: true, message: session });

});

export {registerSession};