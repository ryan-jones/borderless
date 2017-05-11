
var geocoder = new google.maps.Geocoder();
var coordinates= [];
var landingAddress = cities;
var infowindow;

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
      //get dinamically from the API JS the resturants in the area
      let city = document.getElementById('address').value;
      loadCityCompanies(city);
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
    // console.log(companies);
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


    function loadCityCompanies(location) {
      $.ajax({

        url: "http://localhost:3000/api?location=" + location,
        method: 'GET',
        success: function(companies) {
          $('.company-list').html('');
          var companyContent = '';
          companies.forEach((company) => {
            companyContent = `<div class="col-md-6 company company-detail" id="${company._id}"><div class="col-md-3 company-icons"><img src=${company.icon}></div><div class="col-md-3">${company.name}<br>${company.type}</div><button id="${company._id}" class="button-id">Details</button></div>`;
            $('.company-list').append(companyContent);
          }) 
      },
        error: function (err) {
        console.log(err);
        }
      });
    };

    // $('.button-id').click( function() {
    //   console.log('bla');
    //   var tempDiv = $(this).attr('id');
    //   console.log(tempDiv);
    //   showCompanyDetail(tempDiv);
    //   return false;
    //   $('#parent').toggle();
    //   $('#hide-company').toggle();
    // });

    // $('#hide-company').click(function(){
    //   $('#parent').toggle();
    //   $('#hide-company').toggle();
    // });

    // function showCompanyDetail(companyId) {
    //   console.log(companyId);
    //   $.ajax({

    //     url: "http://localhost:3000/api/company/?companyId=" + companyId,
    //     method: 'GET',
    //     success: function(company) {
    //       $('#hide-company').html('');
    //       var companyDetail = `<div class="col-md-6 company company-detail"><div class="col-md-3 company-icons"><img src=${company.icon}></div><div class="col-md-3">${company.name}<br>${company.type}</div></div>`;
    //         $('#hide-company').append(companyDetail);
    //       console.log(company);
    //     },
    //     error: function (err) {
    //     console.log(err);
    //     }, 
    //   });
    // };

          
      

  $(document).ready(function(){
    geocodeAddressFirst(geocoder, map);

}); //document ready

