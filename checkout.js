
import sendOrderConfirmation from './emails.js';
import * as fs from 'fs';

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

export default function(app, urlencodedParser) {
    // updates the current inventory, removing the amount requested in the cart from the total
app.post('/checkout', urlencodedParser, (req, res) => {
    let cartInput = req.body.order.cart;
    let name = req.body.order.name;
    let email = req.body.order.email;
    let phoneNumber = req.body.order.phoneNumber;
    let total = req.body.order.total;
  
    if (isEmpty(cartInput)) {
      res.sendStatus(203)
      return
    }
  
    let rawInventory = fs.readFileSync('cookies.json');
    let inventory = JSON.parse(rawInventory);
    for (var cookie in cartInput) {
      for (var i in inventory) {
        if (cookie === inventory[i]["name"])
          // if the amount is less than or equal to the amount left
          if (cartInput[cookie] <= inventory[i]["amountLeft"]) {
            inventory[i]["amountLeft"] -= cartInput[cookie]
          }
          else {
            res.sendStatus(204)
            return
          }
      }
    }
    // add the order to orders.json
    var currDate = new Date()
    const formattedDate = (currDate.getMonth()+1)+"/"+currDate.getDate()+" "+currDate.getHours()+":"+String(currDate.getMinutes()).padStart(2, '0')
    let order = {
      "name":name,
      "email":email,
      "phoneNumber":phoneNumber,
      "order":cartInput,
      "total": total,
      "timeOfOrder": formattedDate
    }
    let rawdata = fs.readFileSync('orders.json');
    let orderList = JSON.parse(rawdata);
    orderList.push(order);
    fs.writeFile('orders.json', JSON.stringify(orderList), function(err) {
      if (err) return console.log(err);
    })
    sendOrderConfirmation(order);
    var newInventory = JSON.stringify(inventory);
    fs.writeFile('cookies.json', newInventory, function(err) {
      if (err) return console.log(err);
    })
  
    res.sendStatus(200);
  })
}