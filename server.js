import express from 'express';
import bodyParser from 'body-parser';
import sendOrderConfirmation from './emails.js';
import readInventory from './readInventory.js';
import readOrders from './readOrders.js';
import * as fs from 'fs';
import cors from 'cors';
import querystring from 'querystring';
import multer from 'multer';
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({extended: true}));
app.use(express.json())
const port = process.env.PORT || 5000;
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.listen(port, () => console.log(`Listening on port ${port}`));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/images');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

app.get('/cookies_backend', (req, res) => {
  let result = readInventory();
  res.send({ cookies: result});
})

// get the list of orders
app.get('/get_orders', (req, res) => {
  let result = readOrders();
  res.send({orders: result});
})

// updates the current inventory, removing the amount requested in the cart from the total
app.post('/checkout', urlencodedParser, (req, res) => {
  let cartInput = req.body.cart;
  let name = req.body.name;
  let email = req.body.email;
  let phoneNumber = req.body.phoneNumber;
  let total = req.body.total;

  // make sure the cart is not empty
  if (cartInput === '') {
    res.redirect('/error')
    return
  }

  // get the current inventory 
  let result = readInventory();
  var inventoryArray = [];
  Object.keys(result).forEach(function(key) {
    inventoryArray.push(result[key]);
  })
  
  // removes the amount of cookies ordered from the inventory
  // recreates a dictionary from the string provided from cartInput
  var cartInputArray = cartInput.split(',')
  for (var i = 0; i < cartInputArray.length; i+=2)
  {
    var cookieName = cartInputArray[i];
    var cookieAmount = cartInputArray[i+1];
    cartInputArray[i+1] = Number(cartInputArray[i+1])
    for (var cookie in inventoryArray)
      {
        if (cookieName === inventoryArray[cookie]["name"]) {
          // check to see if the user is requesting more cookies than are avaliable
          if (cookieAmount <= inventoryArray[cookie]["amountLeft"]) {
            inventoryArray[cookie]["amountLeft"] -= cookieAmount;
          }
          else {
            res.redirect('/error');
            return;
          }
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
    "order":cartInputArray,
    "total": total,
    "timeOfOrder": formattedDate
  }
  //sendOrderConfirmation(order);
  let orderList = readOrders();
  orderList.push(order);
  fs.writeFile('orders.json', JSON.stringify(orderList), function(err) {
    if (err) return console.log(err);
  })

  var newInventory = JSON.stringify(inventoryArray);
  fs.writeFile('cookies.json', newInventory, function(err) {
    if (err) return console.log(err);
  })

  const encodedOrder = querystring.stringify(order)
  res.redirect('/orderSuccess?order' + encodedOrder)
})

// adds a cookie to the inventory
app.post('/addACookie', upload.single('photo'), urlencodedParser, (req, res) => {
  let result = readInventory();
  var inventoryArray = [];
  Object.keys(result).forEach(function(key) {
    inventoryArray.push(result[key]);
  })
  inventoryArray.push({
    "name":req.body.name,
    "price":Number(req.body.price),
    "amountLeft":Number(req.body.amount),
    "imageLocation":req.file.originalname
  })
  var newInventory = JSON.stringify(inventoryArray);  
  fs.writeFile('cookies.json', newInventory, function(err) {
    if (err) return console.log(err);
  })
  res.redirect('back')
})

app.get('/images/:photoName', (req, res) => {
  console.log(req.params.photoName)
  res.sendFile('/uploads/images/' + req.params.photoName, {root: '.'})
})
app.post('/sessions', urlencodedParser, (req, res, next) => {
  if (req.body.user.password === "p") {
    res.sendStatus(200)
  }
  else {
    res.sendStatus(204)
  }
})
