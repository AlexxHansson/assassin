var express = require('express')
  , socketio = require('socket.io')
  , app = express()
  , http = require('http');


var server = http.createServer(app);
var io = socketio.listen(server);

//Config
app.use(express.bodyParser());

/*
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
*/

var users = [];

app.configure(function(){
    app.set('port', 8080);
    app.use('/', express.static(__dirname + '/app'));
    app.use('/js', express.static(__dirname + '/app/js'));
    //app.use('/socket.io', express.static(__dirname + '/'));
});

app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/app/index.html');
});


io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'You are now connected!' });

  socket.on('move', function (data) {
    console.log(data);
  });

  socket.on('yolo', function(){
    socket.send('swag');
  });

  socket.on('login', function(data) {
    users.push(data);
    socket.emit('users', users);
  });
});

server.listen(app.get('port'));