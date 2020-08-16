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
  console.log("Cart: ")
  var cartInputArray = cartInput.split(',')
  // removes the amount of cookies ordered from the inventory
  for (var i = 0; i < cartInputArray.length; i+=2)
  {
    var cookieName = cartInputArray[i];
    var cookieAmount = cartInputArray[i+1];
    console.log("There were " + cartInputArray[i+1] + " cookies of type " + cartInputArray[i]);
    for (var cookie in inventoryArray)
      {
        if (cookieName === inventoryArray[cookie]["name"]) {
          inventoryArray[cookie]["amountLeft"] -= cookieAmount
        }
      }
  }
  console.log(inventoryArray)
  /*
  fs.writeFile('cookies.json', req.body.what, function(err) {
    if (err) return console.log(err);
  })*/
  var newInventory = JSON.stringify(inventoryArray);
  console.log(newInventory)
  fs.writeFile('cookies.json', newInventory, function(err) {
    if (err) return console.log(err);
  })
  res.send(req.body.cart)
  next();
})

app.post('/addACookie', urlencodedParser, (req, res, next) => {
  
})