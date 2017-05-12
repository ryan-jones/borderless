
var geocoder = new google.maps.Geocoder();
var coordinates= [];
var landingAddress = cities;
var infowindow;
var arr = '';
var description = '';
var type = [];
var level = [];
var markers = [];

infowindow = new google.maps.InfoWindow();


//loads all of the markers on to the map
 function startMarkers() {
    markers = [];
    locations.forEach(function(companies){
      map = map;
      let companyId = companies._id;
      let title = companies.name;
      let type = companies.type;
      let picture = companies.icon;
      let description = companies.description;
      let details = companies.details;
      let website = companies.website;
      let web = companies.webdeveloper;
      let mobile = companies.mobiledeveloper;
      let ux = companies.uxdeveloper;
      console.log('title', title);
      let position = {
        lat: companies.coordinates[1],
        lng: companies.coordinates[0]
      };

      var icon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';

      if (companies.description === "YES") {
        icon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
      }

      var pin = new google.maps.Marker({icon, position, map, title, type, description, details, website, web, mobile, ux, companyId});
      markers.push(pin);

      google.maps.event.addListener(pin, 'click', function(){
        infowindow.setContent('<section class="marker-text"><div><h3> Name:' + companies.name + '</h3></div><div><p><strong>Industry: </strong>' + companies.type + '</p></div><div><p><strong>Willing to sponsor: </strong>' + companies.description + '</p></div><div><p><strong>Additional Criteria for consideration: </strong>' + companies.details + '</p></div><div><p><strong>Website: </strong>' + companies.website + '</p></div></section');
        infowindow.open(map, this);
        console.log(infowindow);
      })

      companyContent = `<div class="col-md-6 company company-detail" id="${companies._id}"><div class="col-md-3 company-icons"><img src=${companies.icon}></div><div class="col-md-3">${companies.name}<br>${companies.type}</div></div>`;
      $('.company-list').append(companyContent);
      }); // locations.forEach
    }; // startMarkers



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

// allows user to search by city******************
    $('.submit').on('click', function() {
      let city = document.getElementById('address').value;  //#address found on explore.ejs
      deleteMarkers();
      geocodeAddress(geocoder, map);
      map.setZoom(12);  //zooms in on the requested city
      loadCityCompanies(city);
    });


  //takes the city selected in explore.ejs and assigns it as the address for centering the map
    function geocodeAddress(geocoder, resultsMap) {
      let address = document.getElementById('address').value;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          resultsMap.setCenter(results[0].geometry.location);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }


//************ Selector for sponsors by position *************** //

    $('.checkbox').on('click', function(e) {
        arr = e.target.defaultValue.split(" ");
        type = arr[0];
        level = arr[1];
        $('.checkbox').not(this).prop('checked', false);
        console.log('index 0', arr[0], 'index 1', arr[1]);
      });





//dynamically loads company divs on explore.ejs based on city location selected
    function loadCityCompanies(location) {
      $.ajax({

        url: "https://localhost:3000/api?location=" + location + "&position=" + type + "&level=" +level,
        method: 'GET',

        success: function(companies) {
          $('.company-list').html('');
          var companyContent = '';

          companies.forEach((company) => {
            map = map;
            let companyId = company._id;
            let title = company.name;
            let type = company.type;
            let picture = company.icon;
            let description = company.description;
            let details = company.details;
            let website = company.website;
            let web = company.webdeveloper;
            let mobile = company.mobiledeveloper;
            let ux = company.uxdeveloper;
            console.log('title', title);
            let position = {
              lat: company.coordinates[1],
              lng: company.coordinates[0]
            };

            var icon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';

            if (company.description === "YES") {
              icon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            }

            var pin = new google.maps.Marker({icon, position, map, title, type, description, details, website, web, mobile, ux, companyId});
            markers.push(pin);

            google.maps.event.addListener(pin, 'click', function(){
              infowindow.setContent('<div><h3> Name:' + company.name + '</h3></div><div><p><strong>Industry: </strong>' + company.type + '</p></div><div><p><strong>Willing to sponsor: </strong>' + company.description + '</p></div><div><p><strong>Additional Criteria for consideration: </strong>' + company.details + '</p></div><div><p><strong>Website: </strong>' + company.website + '</p></div>');
              infowindow.open(map, this);
              console.log(infowindow);
            })

            companyContent = `<div class="col-md-12 company company-detail" id="${company._id}"><div class="col-md-12"><h4><strong>${company.name}</strong></h4><br>${company.type}</div></div>`;
            $('.company-list').append(companyContent);
          })

        },

        error: function (err) {
        console.log(err);
        }
      });
  }; //loadCityCompanies

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }
    // $('.company-detail').on('click', function() {
    //   window.open('http://localhost:3000/bla')
    // });

$(document).ready(function(){
    geocodeAddressFirst(geocoder, map);

}); //document ready
