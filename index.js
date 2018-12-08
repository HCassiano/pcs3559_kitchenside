var http = require('http');
const bodyParser = require("body-parser");
const socketIO = require('socket.io');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');
//const socketio = require('socket.io')();

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT);
/*
//var server = require('http').Server(express)
var app = module.exports.app = express();
//var app = express();
var server = http.createServer(app);
var io = require('socket.io').attach(server);  //pass a http.Server instance
server.listen(PORT);  //listen on port 80
*/
//const server = express()
//  .use((req, res) => res.sendFile(INDEX) )
//  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//const io = socketIO(server);
//var request = require('ajax-request');
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
//const io = socketIO(server);

//setup stuff

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

/*
app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT);
});
*/

//setInterval(() => io.emit('newOrder', latestOrder), 1000);