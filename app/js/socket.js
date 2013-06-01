var socket = io.connect('http://172.20.10.4:8080/');
	
socket.on('news', function (data) {
	console.log(data);
	socket.emit('move', { my: 'data' });
});