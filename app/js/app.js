var App = {};

App.Config = {
  ip: '172.20.10.4',
  port: 8080
}

App.User = {
  id: 1,
  username: null,
  kills: 0,
  position: {lat:0, lng:0}
}

//Login
$('#loginBtn').click(function(){
  getLocation();
  App.User.username = $('#username').val();
  $('#login').hide();
});



var x = document.getElementById("demo");

function getLocation() {
	
	if (navigator.geolocation) {
	
		navigator.geolocation.getCurrentPosition(showPosition);
		
	} else {
	
		x.innerHTML="Geolocation is not supported by this browser.";
	}
}
	
function showPosition(position) {
  App.User.position.lat = position.coords.latitude;
  App.User.position.lng = position.coords.longitude;

	x.innerHTML="Username: "+App.User.username+"<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	
	
	App.map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
	
	L.tileLayer('http://{s}.tile.cloudmade.com/cec90b3181b34d52a7b677e48ac6b136/997/256/{z}/{x}/{y}.png', {
		maxZoom: 18
	}).addTo(App.map);
	
	var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(App.map);

  userLogin();
}

function yolo() {
  console.log('hello!');
}

App.PopulateMap = function(users) {
  console.log('Populating Map');
  console.log(users);
  $.each(users, function(i, user){
    var marker = L.marker([user.position.lat, user.position.lng]).addTo(App.map);
  });
}