var socket = io.connect('http://localhost:8888');
	
socket.on('news', function (data) {
	console.log(data);
	socket.emit('move', { my: 'data' });
});