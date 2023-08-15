import nodemailer from "nodemailer"
const OrderConfirmEmail=(data)=>{

var transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

var mailOptions = {
  from: process.env.EMAIL_ID,
  to:  data.email,
  cc: "shubhank2343@gmail.com",
  subject: ` Booking Confirmation - StressAway Session`,
   html:`<p>Dear ${data.name},<br/>

   We are excited to confirm your booking for a psychotherapy session with StressAway. Here are the details:<br/>
   
   - Date: ${data.date}<br/>
   - Time: ${data.time}<br/>
   - Duration: 30 mins <br/>
   - Mode: ${data.mode}<br/><br/>
   
   Please prepare for the session by finding a quiet and comfortable space. If it's an online session, ensure a stable internet connection. For first-time sessions, please arrive a few minutes early to complete any necessary tests.<br/>
   
   You can reschedule only before 6 hours of the session. <br/>
   
   Rest assured that your privacy and confidentiality are paramount to us. Feel free to reach out to us at +918423341071 for any further assistance.<br/>
   
   We look forward to providing you with a therapeutic experience that promotes peace, resilience, and stress relief.<br/>
   
   Warm regards,<br/>
   
   StressAway Team</p>`
};

transporter.sendMail(mailOptions);
}
export default OrderConfirmEmail;