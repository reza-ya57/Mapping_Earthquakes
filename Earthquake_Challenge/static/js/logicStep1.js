// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center at the San Francisco airport.
//let map = L.map('mapid').setView([30, 30], 2);


//Create the tile layer that will be the background of our map.
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps ={
  'Streets': street,
  'Satellite': satStreet
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom:3,
  layers: [street]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

//Accessing the earthquale GeoJSON data.
past7DaysEarthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Accessing the Toronto neighborhoods GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/reza-ya57/Mapping_Earthquakes/main/torontoNeighborhoods.json"


//Accessing the airport GeoJSON URL
var torontoData = "https://raw.githubusercontent.com/reza-ya57/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json"

//Vreate a style for the lines
let myStyle = {
  fillColor: "#ffffa1",
  weight: 1,
   fill: 'true',
  
}


// Grabbing our GeoJSON data.
d3.json(past7DaysEarthquakes).then(function(data) {
  // Create a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});