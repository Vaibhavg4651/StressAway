import nodemailer from "nodemailer"
const sendEmail=async(email)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
          user: "vaibhavg4651@gmail.com",
          pass: "wntbyrxxylggsobh"
        }
       });
       
       var mailOptions = {
        from:"vaibhavg4651@gmail.com",
        to: email,
        subject: `Registration Successful`,
         html:`<h4>click on following link to verify your email</h4><br/><a href="">Click Here</a><br/><p>If you have not requested then please ignore it</p>`
       };
       
       transporter.sendMail(mailOptions)
}
export default sendEmail;