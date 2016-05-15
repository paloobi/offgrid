app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope, $http) {

  $scope.options = [
    {
      val: "rideshare",
      text: "using a rideshare"
    },
    {
      val: "blind date",
      text: "going on a blind date"
    },
    {
      val: "hiking",
      text: "going hiking"
    },
    {
      val: "camping",
      text:"going camping"
    },
    {
      val: "flight",
      text: "taking a flight"
    },
    {
      val: "drinking",
      text: "going out drinking"
    }
  ]

  $scope.offGrid = false;

  $scope.goOffGrid = function() {
    $http.post('/api/offGrid', $scope.offGridData)
    .then(function(){
      $scope.offGrid = true;
    })
    .catch(function() {
      console.error("ERROR - offgrid api call failed")
    });
  }

  $scope.goOnGrid = function() {
    $scope.offGrid = false;
  }

  $scope.geoFindMe = function() {

    var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.remove();

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: latitude, lng: longitude}
      });
      console.log(map);

      var img = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
      var beachMarker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        draggable: true,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: img
      });


    };

    function error() {
       console.log("error() function");

      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";

    navigator.geolocation.getCurrentPosition(success, error, {timeout:10000});
  }

});
