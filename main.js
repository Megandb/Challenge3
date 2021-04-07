
function getAPIdata() {

	// construct request
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=86ebf55b3238aba1bea41b17fde7feec&q=the%20Hague,nl';

	// get current weather
	fetch(request)	
	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response);
		var weatherBox = document.getElementById('weather');
		//weatherBox.innerHTML = response;
		//weatherBox.innerHTML = response.weather[0].description;
		//weatherBox.innerHTML = response.main.temp;

		 var degC = Math.floor(response.main.temp - 273.15);
		// var weatherBox = document.getElementById('weather');
		weatherBox.innerHTML = degC + '&#176;C <br>' + response.weather[0].description;
		
		document.getElementById("cloudImg").src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";

	});
}

// init data stream
getAPIdata();


	mapboxgl.accessToken = 'pk.eyJ1IjoibWVnYW5kYiIsImEiOiJja21rbGdmZGUxMjM5MndrNW01aHVqOGF4In0.82YZUBlVT8K_2h9ii2QWag';

	// var long;
	// var lat;
	//var land;
	// Initialate map
	var map = new mapboxgl.Map({
	  container: 'map',
	  style: 'mapbox://styles/mapbox/streets-v11',
	  center: [30.2194, 51.2705],
	  style: 'mapbox://styles/mapbox/dark-v10',
	  pitch: 45,
	  zoom: 11.15
	});

	var geocoder = new MapboxGeocoder({
	  accessToken: mapboxgl.accessToken,
	  types: 'country,region,place,postcode,locality,neighborhood',
	  mapboxgl: mapboxgl
	});

	// Zoekbalk
	map.addControl(geocoder, 'top-left');

	// Navigatie knoppen
	map.addControl(new mapboxgl.NavigationControl());


geocoder.on('result', function(response) {
  document.getElementById('long').innerHTML = response.result.center[0];
  // long = response.result.center[0];
  document.getElementById('lat').innerHTML = response.result.center[1];
  // lat = response.result.center[1];
  document.getElementById('city').innerHTML = response.result.place_name;
  // Height();
  var length = response.result.context.length - 1;
  console.log(length);
  land = response.result.context[length].short_code;
  console.log(land);
  Country();
});

function Country(){
  var rescountries = "https://restcountries.eu/rest/v2/alpha/" + land;
  fetch(rescountries)
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    console.log(response);
    document.getElementById('flag').src = response.flag;
    document.getElementById('people').innerHTML = response.demonym;
    var languageTotal = "";
    for(var i = 0; i<response.languages.length ; i++){
      languageTotal = languageTotal + " " + response.languages[i].name + "<br>"
    }
    document.getElementById('languages').innerHTML = languageTotal;
    var currencyTotal = "";
    for(var i = 0; i<response.currencies.length ; i++){
      currencyTotal = currencyTotal + " " + response.currencies[i].name + "<br>"
    }
    document.getElementById('currency').innerHTML = currencyTotal;
    var timezoneTotal = "";
    for(var i = 0; i<response.timezones.length ; i++){
      timezoneTotal = timezoneTotal + " " + response.timezones[i] + "<br>"
    }
    document.getElementById('timezone').innerHTML = timezoneTotal;
    document.getElementById('region').innerHTML = response.subregion;
  })
}
