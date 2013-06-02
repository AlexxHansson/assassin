var socket = io.connect('http://'+App.Config.ip+':'+App.Config.port);

socket.on('news', function (data) {
	console.log(data);
});

socket.on('message', function (data){
	$('#message').html(data.message);
	$('#message').addClass('alert alert-success');
	$('#message').slideDown(300).delay(6000).fadeTo(2000, 0);
});

socket.on('newUser', function (data){
	console.log('New user signed in: '+data.username+'!');
	App.Users.push(data);
});

function sendMove(data) {
	socket.emit('move', data);
}

function getUsers() {
	socket.emit('command', 'getUsers');
}

function kill(data) {
	socket.emit('kill', data);
}

socket.on('users', function (data) {
	console.log('Loading users!');
	App.Users = data;
	App.PopulateMap(data);
});

function userLogin(data) {
	console.log('Logging in');
	socket.emit('login', App.User);
}