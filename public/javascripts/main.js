

  let map = new google.maps.Map(document.getElementById('map'), {
  zoom: 15,
  center: {lat: 41.3977381,
    lng: 2.190471916}
  });
  let geocoder = new google.maps.Geocoder();

  $('#submit').on('click', function() {
    geocodeAddress(geocoder, map);
  });


//takes the city selected in index.ejs and assigns it as the address
  function geocodeAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        // var marker = new google.maps.Marker({
        //   map: resultsMap,
        //   position: results[0].geometry.location
        // });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

//loads all of the markers on to the map
 function startMarkers() {

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
    }); // locations.forEach
} // startMap


$(document).ready(function(){

  startMarkers();
});
