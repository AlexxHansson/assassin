var App = {};

App.Config = {
  ip: '172.20.10.4',
  //ip: 'localhost',
  //ip: '194.47.142.119',
  port: 8080
}

App.User = {
  id: 1,
  username: null,
  kills: 0,
  position: {lat:0, lng:0}
}

App.Users = null;

//Init
$(function() {
	
	if(localStorage.username) {
		
		$('#login').hide();
		getLocation();
		userLogin();
		getUsers();
		App.User.username = localStorage.username;
	}
});

$('#loginBtn').click(function(){
  getLocation();
  userLogin();
  getUsers();
  App.User.username = $('#username').val();
  localStorage.username = App.User.username;
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
	if(App.Map) {
		App.User.position.lat = position.coords.latitude;
		App.User.position.lng = position.coords.longitude;
		App.Map.setView([position.coords.latitude, position.coords.longitude], 15);
	} else {
		x.innerHTML="Username: "+App.User.username+"<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	
	
		App.Map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 15);
		
		L.tileLayer('http://{s}.tile.cloudmade.com/cec90b3181b34d52a7b677e48ac6b136/997/256/{z}/{x}/{y}.png', {
			maxZoom: 18
		}).addTo(App.Map);
		
		var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(App.Map);
	}
  
}

//Game Loop
setInterval(function() {
	console.log('Update');
	
	getLocation();
	sendMove(App.User);
    App.UpdateMap(App.Users);
    //Collision
    //
}, 2000);

App.UpdateMap = function(users) {
	$.each(users, function(i, user){
		
		
	});
}

App.PopulateMap = function(users) {
  console.log('Populating Map');
  console.log(users);
  $.each(users, function(i, user){
    App.Users[i].marker = L.marker([user.position.lat, user.position.lng]).addTo(App.Map);
    
    
    if(user.position.lat < App.User.position.lat + 0.1 || 
  		user.position.lat > App.User.position.lat - 0.1 &&
  		user.position.lng < App.User.position.lng + 0.1 ||
  		user.position.lng > App.User.position.lng - 0.1) {
	  		console.log(user.username);
  		}
  			
  });
}