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
function getTemplateEmail(callback) {
  fs.readFile('./orderEmailTemplate.hbs', {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      throw err
    }
    else {
      callback(null, html)
    }
  })
}
export default function sendOrderConfirmation(order) {
  getTemplateEmail(function(err, html) {
    var template = handlebars.compile(html)
    var replacements = {
      name: order.name,
      order: Object.entries(order.order),
      total: order.total
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


