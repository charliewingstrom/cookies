import express from 'express';
import bodyParser from 'body-parser';
import readFile from './readFile.js';
import * as fs from 'fs';
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/cookies_backend', (req, res) => {
  let result = readFile();
  res.send({ cookies: result});
})

// updates the current inventory, removing the amount requested in the cart from the total
app.post('/', urlencodedParser, (req, res, next) => {
  let cartInput = req.body.cart;
  let result = readFile();

  var inventoryArray = [];
  Object.keys(result).forEach(function(key) {
    inventoryArray.push(result[key]);
  })
  console.log("Inventory: ")
  for (var cookie in inventoryArray)
  {
    console.log(cookie + " Here is the cookie");
    console.log(inventoryArray[cookie]);
    console.log(inventoryArray[cookie]["amountLeft"]);
  }

  console.log("Cart: ")
  console.log(cartInput)
  console.log(typeof cartInput)
  /*
  fs.writeFile('cookies.json', req.body.what, function(err) {
    if (err) return console.log(err);
  })*/
  res.send(req.body.cart)
  next();
})