
const bodyParser = require("body-parser");
const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const io = socketIO(server);

var app = express();
var request = require('ajax-request');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//const io = socketIO(server);

var latestOrder = "sem nenhum pedido!";
var latestOrderID = 1;

// parse application/x-www-form-urlencoded and json
app.use(bodyParser.urlencoded());
app.use(bodyParser.json({extended: true}));

app.post('/ingredients', function (req, res) {
  console.log(req.body);
  var ingredients = req.body.ingredients; 
  ingredients = JSON.parse(ingredients)
  for (var i = 0; i < ingredients.length; i++) {
      console.log(ingredients[i])
  }
  //console.log(ingredients[0])
  var status = "{ " + "\"status\": " + "\"OK\" }"
  latestOrder = ingredients;
  io.emit('newOrder', latestOrderID, latestOrder);
  latestOrderID = latestOrderID + 1;
  res.send(status);
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/orders', function (req, res) {
  	res.send(latestOrder);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


//setInterval(() => io.emit('newOrder', latestOrder), 1000);