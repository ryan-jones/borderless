
var geocoder = new google.maps.Geocoder();
var coordinates= [];
var landingAddress = cities;
var infowindow;

//defines the initial centering of the map on explore.ejs based on selected city from landing page
  function geocodeAddressFirst(geocoder, resultsMap) {
    geocoder.geocode( { 'address': landingAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        coordinates.push(latitude);
        coordinates.push(longitude);
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: Number(coordinates[0]), lng: Number(coordinates[1])},
        zoom: 12,
        });
        startMarkers();
        loadCityCompanies(landingAddress);
        return map;
      }
    });
  }


    $('.submit').on('click', function() {
      geocodeAddress(geocoder, map);
      map.setZoom(12);  //zooms in on the requested city
      let city = document.getElementById('address').value;  //#address found on explore.ejs
      loadCityCompanies(city);
    });


  //takes the city selected in explore.ejs and assigns it as the address for centering the map
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
      locations.forEach(function(companies){
        map = map;
        let title = companies.name;
        let position = {
          lat: companies.coordinates[1],
          lng: companies.coordinates[0]
        };
        var icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

        if (companies.description === "YES") {
          icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
        }

         var pin = new google.maps.Marker({position, map, title,icon});
        markers.push(pin);

      }); // locations.forEach
    };  // startMarkers


//dynamically loads company divs on explore.ejs based on city location selected
    function loadCityCompanies(location) {
      console.log(location);
      $.ajax({

        url: "http://localhost:3000/api?location=" + location,
        method: 'GET',
        success: function(companies) {
          $('.company-list').html('');
          var companyContent = '';
          companies.forEach((company) => {
            companyContent = `<div class="col-md-6 company company-detail" id="${company._id}"><div class="col-md-3 company-icons"><img src=${company.icon}></div><div class="col-md-3">${company.name}<br>${company.type}</div></div>`;
            $('.company-list').append(companyContent);
          })

          console.log(companies);
      },
        error: function (err) {
        console.log(err);
        }
      });
    };


    //************ Selector for sponsors by position *************** //

    

    $('.company-detail').on('click', function() {
      window.open('http://localhost:3000/bla')
    });

  $(document).ready(function(){
    geocodeAddressFirst(geocoder, map);

}); //document ready
