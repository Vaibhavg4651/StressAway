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
  from: data.from,
  to:  process.env.EMAIL_ID,
  subject: `New Order Placed In ProShop from user with email id ${data.from}`,
   html:`<h4>Congratulation Admin <br /><h3>Mobile number</h3><br /> Shipping Address : ${data.address.address } ,${data.address.city}, ${data.address.postalCode},  ${data.address.country} <br /> Check on Website : <br /><a href=${process.env.REACT_URL}>Check Here</a></h4>`
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