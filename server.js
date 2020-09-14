import express from 'express';
import bodyParser from 'body-parser';
import readInventory from './readInventory.js';
import readOrders from './readOrders.js';
import convertOrdersToCSV from './convertOrdersToCSV.js';
import * as fs from 'fs';
import cors from 'cors';
import multer from 'multer';
import checkout from './checkout.js';
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

// exported functions
//----------------------------------------------------
checkout(app, urlencodedParser);
readInventory(app)
readOrders(app)
convertOrdersToCSV(app)
//----------------------------------------------------

// adds a cookie to the inventory
app.post('/addACookie', upload.single('photo'), urlencodedParser, (req, res) => {
  let rawdata = fs.readFileSync('cookies.json');
  let result = JSON.parse(rawdata);
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
  let rawdata = fs.readFileSync('cookies.json');
  let inventory = JSON.parse(rawdata);
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

app.get('/ordersAsCSV', (req, res) => {
  res.download('./orders.csv')
})

app.post('/removeOrders', urlencodedParser, (req, res) => {
  fs.writeFile('orders.json', JSON.stringify([]), function(err) {
    if (err) return console.log(err);
  })
})

