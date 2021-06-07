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

// Create the earthquake layer for our map.
let earthquakes = new L.LayerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5,-98.5],
  zoom:3,
  layers: [street]
})

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

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
    // This function returns the style data for each of the earthquakes we plot on
    // the map. We pass the magnitude of the earthquake into a function
    // to calculate the radius.
    function styleInfo(feature){
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }

   // This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude) {
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
          }
          if (magnitude > 1) {
            return "#d4ee00";
          }
          return "#98ee00";
    }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }
  // Create a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
      // We turn each feature into a circleMarker on the map.
      pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
        // .bindPopup("<h2>"+ feature.properties.name+"</h2><hr><h3>"+feature.properties.city+", "+feature.properties.country+"</h3>");
      },
       // We set the style for each circleMarker using our styleInfo function.
      style: styleInfo,
      // We create a popup for each circleMarker to display the magnitude and
     //  location of the earthquake after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
          layer.bindPopup("Magnitude: "+ feature.properties.mag + "<br>Location: "+ feature.properties.place);
      }
    }).addTo(earthquakes);
    
    //Then we add the earthquake layer to our map.
    earthquakes.addTo(map);
});


  //   L.geoJson(data).addTo(map);
// });
//   L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature, layer){
//       layer.bindPopup("<h2>Neighborhood: "+feature.properties.AREA_NAME+"</h2>")
//     }
  
//   }).addTo(map);

// });

// d3.json(torontoData).then(function(data)  {
 
  
//   //Creating a GeoJson layer with the retrieved data.
//   console.log(data);
//   L.geoJson(data, {
//     style: myStyle,
//     onEachFeature: function(feature,layer){       
//       layer.bindPopup("<h2>Airline Code: "+feature.properties.airline+"</h2><hr><h3>Destination: "+feature.properties.dst+"</h2>");
//     }
//   }).addTo(map);
//  });
  //  L.geoJSON(data, {
  //    onEachFeature: function(feature, layer) {
  //      console.log(layer);
  //      layer.bindPopup("<h2>Airport Code: </h2>");
  //    }
  //  }).addTo(map);
  // }


// Add GeoJSON data.
// Grabbing our GeoJSON data.Using pointToLayer Function
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>"+ feature.properties.name+"</h2><hr><h3>"+feature.properties.city+", "+feature.properties.country+"</h3>");
//   }
// }).addTo(map);


// // Grabbing our GeoJSON data.Using onEachFeature Function
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup("<h2>Airport Code: "+ feature.properties.faa +"</h2><hr><h3>Airport Name: "+feature.properties.name+"</h3>");
    
//   }
// }).addTo(map);

// //Create tile layer
// let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//   maxZoom: 18,
//   accessToken: API_KEY
// });




// //Add tile to Map
// street.addTo(map);



// Coordinates for each point to be used in the line.
// let line = [
//   //[33.9416, -118.4085],
//   [37.6213, -122.3790],
//   [30.1975, -97.6664],
//   [43.6777, -79.6248],
//   //[40.7899, -111.9791],
//   //[47.4502, -122.3088],
//   [40.6413, -73.7781]
// ];



// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//   color: "blue",
//   weight: '4',
//   opacity: '0.5',
//   dashArray: '5, 10'
// }).addTo(map);





// mapbox/streets-v11
// mapbox/outdoors-v11
// mapbox/light-v10
// mapbox/dark-v10
// mapbox/satellite-v9
// mapbox/satellite-streets-v11