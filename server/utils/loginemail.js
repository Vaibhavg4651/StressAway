import nodemailer from "nodemailer";
const loginEmail = async (email, name) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email,
    subject: `Welcome to StressAway - Your Account Signup is Successful!`,

    html: `<p>Dear ${name}, <br/>
Warm welcome to StressAway! We are thrilled to inform you that your login to our platform was successful. <br/>

At StressAway, we are dedicated to providing you with the tools, resources, and guidance to help you manage and reduce stress effectively. <br/>

Remember, managing stress is a journey, and we are here to support you every step of the way.<br/>

If you have any questions, concerns, or need assistance, please don't hesitate to reach out to us at stressaway07@gmail.com. We're always here to help!<br/>

Thank you once again for choosing StressAway. We look forward to accompanying you on your path to a stress-free life!<br/>

Best regards,<br/>

The StressAway Team`,
  };

  transporter.sendMail(mailOptions);
};
export default loginEmail;
