/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',['$scope', function ($scope) {
  var initialize;
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: 45.5231, lng: -122.6765},
        zoom: 13
    });
    console.log('map initialized!');
    console.log($scope.map)
  };
  initialize(); 
}
]);