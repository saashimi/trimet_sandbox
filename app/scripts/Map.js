/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',['$scope', function ($scope) {
  var initialize;
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'));
    console.log('map initialized!');
  };
  initialize(); 
}
]);