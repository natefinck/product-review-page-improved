/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const products = require('./products.js');

var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const app  = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
const port = process.env.PORT || 5000;

app.get('/ping', function (req, res) {
  res.send({success: true, message: 'pong'})
});

app.get('/products', async (req, res) => {
  res.send({products});
});

app.get('/products/:productid', async (req, res) => {
  res.send(products.products[req.params.productid])
  // return res.status(200).json(products.products[req.params.productid]);
});

app.use('/static', express.static(path.join(__dirname, '..', 'build', 'static')));
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('*', (req, res) => res.sendFile('index.html', { root: path.join(__dirname, '..', 'build') }));

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});