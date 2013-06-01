var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.listen(8888);

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/app/index.html');
});

io.sockets.on('connection', function (socket) {
    console.log('user connected');
    socket.emit('news', { hello: 'world' });

    socket.on('move', function (data) {
        console.log(data);
    });
});