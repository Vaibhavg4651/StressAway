import nodemailer from "nodemailer"
const sendEmail=async(email, name)=>{
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
        to: email,
        cc: "shubhank2343@gmail.com",
        subject: `Welcome to StressAway - Your Account Signup is Successful!`,

         html:`<p>Dear ${name}, <br/>

         Welcome to StressAway! Your account signup is complete, and we're excited to have you on board.<br/>
         
         Here are the next steps to get started:<br/>
         
         1. You can give the Diagnostic test initially. It’s Free! <br/>
         2. If you feel like talking to someone, book a session right away. Your mental health is our Priority! <br/>
         3. Subscribe to the newsletter to know when we’ll be having a session in your school/college.<br/>
         
         If you need any assistance, our support team is here to help. You can write to us anytime at stressaway07@gmail.com or call at 8423341071.<br/>
         
         We're honored to be part of your journey towards a happier and healthier life.<br/>
         
         Warm regards,<br/>
         
         StressAway Team</p>`
       };
       
       transporter.sendMail(mailOptions)
}
export default sendEmail;