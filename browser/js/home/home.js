app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function($scope) {
   $scope.geoFindMe = function() {

  var output = document.getElementById("out");
  console.log("Near the top. Wheee");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }
  console.log("Just before the success");

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';
    console.log("Writing HTML for long and lat");


    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
    console.log("after getting image from googleapis");

    output.appendChild(img);
    console.log("after output.appendChild");

  };

  function error() {
     console.log("error() function");

    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";
  console.log("after output.innerHTML Location... p tag");

  navigator.geolocation.getCurrentPosition(success, error);
}
}
);
