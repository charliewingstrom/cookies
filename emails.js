import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `charliewingstrom@gmail.com`,
    pass: `DontPushYourPassword`
  }
});
function getTemplateEmail(order, callback) {
  console.log(order)
  fs.readFile('./orderEmailTemplate.html', {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      throw err
    }
    else {
      callback(null, html)
    }
  })
}
export default function sendOrderConfirmation(order) {
  getTemplateEmail(order["order"], function(err, html) {
    var template = handlebars.compile(html)
    var replacements = {
      username: "John Doe"
    }
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: `charliewingstrom@gmail.com`,
      to: order["email"],
      subject: "Shan's Cookies - Order Confirmation",
      html: htmlToSend
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  })
}


