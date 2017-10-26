// var server = require('http').createServer();
// var io = require('socket.io')(server);
// io.on('connection', function(client){
//   client.on('event', function(data){});
//   client.on('disconnect', function(){});
// });
// server.listen(3000);


// var app = require('express')();
// var server = require('http').createServer(app);
// var io = require('socket.io')(server);
// io.on('connection', function(){ /* … */ });

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World</h1>');
// });

// server.listen(3000);
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);

    io.emit('chat message', msg);
  });
});
app.use(express.static('public'));

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');

  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});