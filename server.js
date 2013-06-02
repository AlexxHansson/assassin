var express = require('express')
  , socketio = require('socket.io')
  , app = express()
  , http = require('http')
  , $ = require('jquery');


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

    $.each(users, function(i, item){
      if(item.email == data.email) {
        users[i].position = data.position;
      }
    });
  });

  socket.on('kill', function(data) {
    $.each(users, function(i, item){
      if(item.email == data.email) {
        users.splice(i, 1);
      }
    });
  });

  socket.on('login', function(data) {
    var exist = false;
    $.each(users, function(i, item){
      if(item.username == data.username) {
        exist = true;
      }
    });

    if(!exist) {
      users.push(data);  
    }
    socket.broadcast.emit('newUser', data);
  });

  socket.on('command', function(data){
    switch(data)
    {
      case 'getUsers':
      socket.emit('users', users);
      break;
    }
  })
});

server.listen(app.get('port'));