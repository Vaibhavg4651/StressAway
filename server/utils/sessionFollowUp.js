import nodemailer from "nodemailer"

const sessionFollowup = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD 
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: data.email,
      cc: "shubhank2343@gmail.com",
      subject: "Therapy Session with StressAway Tomorrow!",
      html:`<p>Dear ${data.name},<br/>

      Just a quick reminder that your therapy session with StressAway is scheduled for tomorrow, [Date] at [Time] with [Therapist Name]. We're excited to connect with you and provide the support you need.<br/>
      
      Platform: [Online platform/phone number]<br/>
      
      Please find a quiet and comfortable space and ensure a stable internet connection. Also, make sure to log in a few minutes early to get familiar with the platform.<br/>
      
      If you need to reschedule or cancel, kindly notify us at least 24 hours in advance to accommodate others in need.<br/>
      
      We're here to help you manage stress and support your well-being. If you have any questions or need assistance, feel free to reach out to our team.<br/>
      
      Looking forward to seeing you tomorrow!<br/>
      
      Warm regards,<br/>
      
      StressAway Team  </p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sessionFollowup;