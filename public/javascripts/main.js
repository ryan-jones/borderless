
var geocoder = new google.maps.Geocoder();
var coordinates= [];
var landingAddress = cities;
console.log(locations);
console.log(landingAddress);
var map;




  function geocodeAddressFirst(geocoder, resultsMap) {
    geocoder.geocode( { 'address': landingAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        coordinates.push(latitude);
        coordinates.push(longitude);
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(coordinates[0]), lng: Number(coordinates[1])},
        zoom: 8,
        });
        return map;
      }
    });


    // geocoder.geocode({'address': landingAddress}, function(results, status) {
    //   if (status === 'OK') {
    //     console.log(resultsMap);
    //     resultsMap.setCenter(results[0].geometry.location);
    //
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
  }



    $('.submit').on('click', function() {
      geocodeAddress(geocoder, map);
      map.setZoom(12);  //zooms in on the requested city
    });


  //takes the city selected in index.ejs and assigns it as the address
    function geocodeAddress(geocoder, resultsMap) {
      let address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          console.log(resultsMap);
          resultsMap.setCenter(results[0].geometry.location);
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
        var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

        if(places.description === "maybe"){
          icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
        } else if (places.description === "yes") {
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        }
        var pin = new google.maps.Marker({position, map, title, icon});
        markers.push(pin);
      }); // locations.forEach
  } // startMap



  $(document).ready(function(){
    geocodeAddressFirst(geocoder, map);
    startMarkers();

  }); //document ready
