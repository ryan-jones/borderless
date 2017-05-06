var geocoder;
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
    }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
  geocodeAddress(geocoder, map);
  console.log('eeeyyyyy')
  });
  
  function geocodeAddress(geocoder, resultsMap) {

  let address = document.getElementById('name').value;
  console.log(address);
  
  geocoder.geocode({'address': address}, function(results, status) {

  if (status === 'OK') {
    resultsMap.setCenter(results[0].geometry.location);
    let marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
      }
      });
   }

function startMap() {
  

  // var map = new google.maps.Map(
  //   document.getElementById('map'),
  //   {
  //     zoom: 14,
  //     center: chosenCity
  //   });

    let markers = [];
    locations.forEach(function(places){
      let title = places.name;
      let position = {
        lat: places.coordinates[1],
        lng: places.coordinates[0]
      };
      var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';

      if(places.description === "coffeeshop"){
        icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      }
      var pin = new google.maps.Marker({position, map, title, icon});
      markers.push(pin);
    }); // var map
     // startMap
};


$(document).ready(function(){
console.log(locations);
initialize();
  startMap();
});
