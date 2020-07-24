import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import readFile from './readFile.js';
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