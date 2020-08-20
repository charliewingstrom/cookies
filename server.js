import express from 'express';
import bodyParser from 'body-parser';
import readFile from './readFile.js';
import * as fs from 'fs';
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

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
          // check to see if the user is requesting more cookies than are avaliable
          if (cookieAmount <= inventoryArray[cookie]["amountLeft"]) {
            inventoryArray[cookie]["amountLeft"] -= cookieAmount;
          }
          else {
            res.redirect('/error');
          }
        }
      }
  }
  console.log(inventoryArray)
  var newInventory = JSON.stringify(inventoryArray);
  console.log(newInventory)
  fs.writeFile('cookies.json', newInventory, function(err) {
    if (err) return console.log(err);
  })
  res.redirect('back')
})

app.post('/addACookie', urlencodedParser, (req, res, next) => {
  
  console.log("Here is a post from addACookie")
  console.log(req.body.cookieName)
  console.log(req.body.price)
  console.log(req.body.amount)
  if (req.body.cookieName && req.body.price && req.body.amount) {
    let result = readFile();
    var inventoryArray = [];
    Object.keys(result).forEach(function(key) {
      inventoryArray.push(result[key]);
    })

    inventoryArray.push(
      {"name":req.body.cookieName,
      "price":Number(req.body.price),
      "amountLeft":Number(req.body.amount)})
    var newInventory = JSON.stringify(inventoryArray);
    console.log(newInventory)
    fs.writeFile('cookies.json', newInventory, function(err) {
      if (err) return console.log(err);
    })
  }
  res.redirect('back');
})