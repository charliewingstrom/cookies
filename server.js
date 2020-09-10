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

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
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

  let inventory = readInventory();
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
  let orderList = readOrders();
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

// adds a cookie to the inventory
app.post('/addACookie', upload.single('photo'), urlencodedParser, (req, res) => {
  let result = readInventory();
  result.push({
    "name":req.body.name,
    "price":Number(req.body.price),
    "amountLeft":Number(req.body.amount),
    "imageLocation":req.file.originalname
  })
  var newInventory = JSON.stringify(result);  
  fs.writeFile('cookies.json', newInventory, function(err) {
    if (err) return console.log(err);
  })
  res.redirect('back')
})

app.get('/images/:photoName', (req, res) => {
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

app.post('/removeCookie', urlencodedParser, (req, res) => {
  let inventory = readInventory();
  let newInventory = []
  for (var index in inventory) {
    if (inventory[index].name !== req.body.cookieToRemove) {
      newInventory.push(inventory[index])
    }
    fs.writeFile('cookies.json', JSON.stringify(newInventory), function(err) {
      if (err) return console.log(err);
    })
  }

  res.sendStatus(200)
})
