var socket = io.connect('http://'+App.Config.ip+':'+App.Config.port);

socket.on('news', function (data) {
	console.log(data);
	socket.emit('move', { my: 'data' });
});

socket.on('users', function (data) {
	//App.PopulateMap(data);
	console.log('New user!');
	console.log(data);
});

socket.on('swag', function(){
	console.log('swag');
});

socket.on('message', function (data){
	$('#message').html(data.message);
	$('#message').addClass('alert alert-success');
	$('#message').slideDown(300).delay(6000).fadeTo(2000, 0);
});

$('#hej').click(function(){
	socket.emit('move', {my: 'data'});
});

function sendMove(data) {
	socket.emit('move', data);
}

function getUsers() {
	socket.emit('command', 'getUsers');
}

function userLogin(data) {
	console.log('Logging in');
	socket.emit('login', App.User);
	socket.send('yolo');
}