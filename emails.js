import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `charliewingstrom@gmail.com`,
    pass: `DontPushYourPassword`
  }
});

export default function sendOrderConfirmation(order) {
    var mailOptions = {
        from: `charliewingstrom@gmail.com`,
        to: order["email"],
        subject: "Shan's Cookies - Order Confirmation",
        html: "<h1>Here is some html</h1>"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
