// Add console.log to check to see if our code is working.
console.log("working");



// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([40.197, -97.6664], 5);

// Coordinates for each point to be used in the line.
let line = [
  //[33.9416, -118.4085],
  [37.6213, -122.3790],
  [30.1975, -97.6664],
  [43.6777, -79.6248],
  //[40.7899, -111.9791],
  //[47.4502, -122.3088],
  [40.6413, -73.7781]
];

// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
  color: "blue",
  weight: '4',
  opacity: '0.5',
  dashArray: '5, 10'
}).addTo(map);

//Create tile layer
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//Add tile to Map
street.addTo(map);



// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11