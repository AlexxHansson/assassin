var App = {};

App.Config = {
  ip: '172.20.10.2',
  //ip: 'localhost',
  //ip: '194.47.142.119',
  port: 8080
}

App.User = {
  id: 1,
  username: null,
  email: null,
  kills: 0,
  position: {lat:0, lng:0}
}

App.Users = null;
App.UserLayer = L.layerGroup();

//Init
$(function() {

	if(localStorage.username
	&& localStorage.email) {

	 	App.User.username = localStorage.username;
	  	App.User.email = localStorage.email;
		login();
	}
});

$('#loginBtn').click(function() {
 	localStorage.username = App.User.username = $('#username').val();
  localStorage.email = App.User.email = $('#email').val();
  login();
});

function login() {
	$('#login').hide();
	App.InitLocation();
	userLogin();
	getUsers();
}


var x = document.getElementById("demo");

App.InitLocation = function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(InitMap);
	} else {
		x.innerHTML="Geolocation is not supported by this browser.";
	}
}

function InitMap(position) {
	App.User.position.lat = position.coords.latitude;
	App.User.position.lng = position.coords.longitude;
	App.Map = L.map('map').setView([App.User.position.lat, App.User.position.lng], 16);

	L.tileLayer('http://{s}.tile.cloudmade.com/cec90b3181b34d52a7b677e48ac6b136/997/256/{z}/{x}/{y}.png', {
		maxZoom: 18
	}).addTo(App.Map);

	var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(App.Map);
}

//Update location
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(App.SavePosition);
	} else {
		x.innerHTML="Geolocation is not supported by this browser.";
	}
}
	
App.SavePosition = function(position) {
	App.User.position.lat = position.coords.latitude;
	App.User.position.lng = position.coords.longitude;

	x.innerHTML="Username: "+App.User.username+"<br>Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;	
}

//Game Loop
setInterval(function() {
	getLocation();
	sendMove(App.User);
    getUsers();

}, 1000);

App.UpdateMap = function(users) {
	/*
  	$.each(users, function(i, user){
  		if(user.e) {
  			var newLatLng = new L.LatLng(user.position.lat, user.position.lng);
	  		console.log(App.Users[i]);
		    App.Users[i].marker.setLatLng(newLatLng);	
  		}
	});
*/
}

App.PopulateMap = function(users) {
  App.UserLayer.clearLayers();

  	$.each(users, function(i, user){
  		if(user.email != App.User.email) {
  			var marker = L.marker([user.position.lat, user.position.lng]);
		    App.UserLayer.addLayer(marker);

		    var d = distance(App.User.position.lat, App.User.position.lng, user.position.lat, user.position.lng);
		    console.log((Math.floor(d*1000)));

		    if(user.position.lat < App.User.position.lat + 0.1 
		    || user.position.lat > App.User.position.lat - 0.1
		  	&& user.position.lng < App.User.position.lng + 0.1
		  	|| user.position.lng > App.User.position.lng - 0.1
		  	&& user.email != App.User.email) {
			  	//console.log('near: '+user.username);
			  	
			  	$('#assasinate').html('<img src="http://www.gravatar.com/avatar/'+md5(user.email)+'" />').show();
		  	}
  		}
	    
	});

	App.UserLayer.addTo(App.Map);
  
}


function distance(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = (lat2-lat1).toRad();
	var dLon = (lon2-lon1).toRad();
	var lat1 = lat1.toRad();
	var lat2 = lat2.toRad();
	
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c;
	return d;
}

if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}


