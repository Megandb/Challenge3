
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
		
		//zonsopkomst
		var weatherBox = document.getElementById('sunrise');
		var sunrise = Math.floor(response.sys.sunrise);
		weatherBox.innerHTML = 'sunrise :' + sunrise + '<br>';

		//Voor het omzetten naar normale tijd
		var tijd = new Date(sunrise); //door deze twee regels word de tijd normaal in plaats van milliseconden.
		document.getElementById('sunrise').innerHTML = tijd.toString(); //to string maakt hij er een gewonere datum tijd notatie van. Maar je kan ook uren en minuten los er uithalen zoals voor ch2
	

		//zonsondergang
		var weatherBox = document.getElementById('sunset');
		var sunset = Math.floor(response.sys.sunset);
		weatherBox.innerHTML = 'sunset :' + sunset + '<br>';

		var tijd = new Date(sunset); //door deze twee regels word de tijd normaal in plaats van milliseconden.
		document.getElementById('sunset').innerHTML = tijd.toString();
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
	  center: [ 4.288788, 52.078663],
	  style: 'mapbox://styles/mapbox/dark-v10',
	  pitch: 45,
	  zoom: 11.15


	});



