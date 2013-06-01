var express = require('express')
  , http = require('http');

var app = express();

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('Express listening on '+app.get('port'));
});
var io = require('socket.io').listen(server);

//Config
app.use(express.bodyParser());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.configure(function(){
    app.set('port', 8888);
    app.use('/', express.static(__dirname + '/app'));
    app.use('/js', express.static(__dirname + '/app/js'));
    app.use('/socket.io', express.static(__dirname + '/'));
});

app.get('/', function (req, res) {
  //res.sendfile(__dirname + '/app/index.html');
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

app.listen(8888);