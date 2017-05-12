$(document).ready(function() {

	var map = new google.maps.Map(document.getElementById('new-map1'), {
    zoom: 15,
    center: {lat: 41.3850639, lng: 2.1734034999999494}
  });

console.log(map);
  var geocoder = new google.maps.Geocoder();

  document.getElementById('new-submit1').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });

  function geocodeAddress(geocoder, resultsMap) {
	  var address = document.getElementById('new-address1').value;

	  geocoder.geocode({'address': address}, function(results, status) {
	    if (status === 'OK') {
	      resultsMap.setCenter(results[0].geometry.location);
	      var marker = new google.maps.Marker({
	        map: resultsMap,
	        position: results[0].geometry.location
	      });
	      document.getElementById('new-latitude1').value = results[0].geometry.location.lat();
	      document.getElementById('new-longitude1').value = results[0].geometry.location.lng();

	    } else {
	      alert('Geocode was not successful for the following reason: ' + status);
	    }
	  });
	}
});
