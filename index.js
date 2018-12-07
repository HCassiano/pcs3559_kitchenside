/*
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool',(req,res) => res.send(cool()))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
*/

var express = require('express');
var app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

app.post('/ingredients', function (req, res) {
  //var ingredients = JSON.parse()
  var ingredients = req.body.ingredients
  var status = "{ " + "\"status\": " + "\"OK\" }"
  console.log(ingredients)
  res.send(status);
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
