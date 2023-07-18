import nodemailer from "nodemailer"
const OrderConfirmEmail=(data)=>{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL_ID,
  to:  data.email,
  cc: email,
  subject: ` Booking Confirmation - StressAway Session`,
   html:`<p>Dear ${data.name},

   We are excited to confirm your booking for a psychotherapy session with StressAway. Here are the details:
   
   - Date: ${data.date}
   - Time: ${data.time}
   - Duration: ${data.duration}
   - Mode: ${data.mode}
   
   Please prepare for the session by finding a quiet and comfortable space. If it's an online session, ensure a stable internet connection. For first-time sessions, please arrive a few minutes early to complete any necessary tests.
   
   You can reschedule only before 6 hours of the session. 
   
   Rest assured that your privacy and confidentiality are paramount to us. Feel free to reach out to us at +918423341071 for any further assistance.
   
   We look forward to providing you with a therapeutic experience that promotes peace, resilience, and stress relief.
   
   Warm regards,
   
   StressAway Team</p>`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}
export default OrderConfirmEmail;