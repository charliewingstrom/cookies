import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'yahoo',
  auth: {
    user: 'charliewingstrom@yahoo.com',
    pass: 'dontpushyourpassword'
  }
});

export default function sendOrderConfirmation(order) {
    var mailOptions = {
        from: 'charliewingstrom@yahoo.com',
        to: order["email"],
        subject: "Shan's Cookies - Order Confirmation",
        text: 'That was easy! ' + "you ordered " + order["order"] 
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
