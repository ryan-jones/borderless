
var geolocation = new google.maps.Geocoder();
var address;
$('#test').on('click', function() {
  address = document.getElementById('city').value;
  console.log(address.value);
  window.location.href = "http://localhost:3000/explore?city=" + address  ;

});
