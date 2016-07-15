/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$http', function ($scope, $http) {
  var initialize, loadRoutes;
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
    $scope.currentLocationMarker = null; // KS! This appears to be proprietary
    console.log('map initialized!');
    console.log($scope.currentLocationMarker, $scope.layers);
    var request;
  };
  loadRoutes = function() {
    request = $http.get('./geojson/');
    $scope.map.data.loadGeoJson(request);
  };
  
  initialize();
  loadRoutes();
}
]);