/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  var initialize, loadRoutes, l, initializeLayerData;
  // l is a declared variable
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
    $scope.currentLocationMarker = null; // KS! This appears to be proprietary
    console.log('map initialized!');
  };
  initializeLayerData = function(layerData) {
      layerData.features = $scope.map.data.addGeoJson(layerData.geojsonFilename);
  }
  
  
  loadRoutes = function() {
    $scope.layers = $scope.config.layers;
    $rootScope.map = $scope.map;
      setTimeout(function() { // cooperative multitasking... pause the javascript execution
        var k, len2, ref1, results;
        ref1 = $scope.layers;
        results = [];
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          l = ref1[k];
          results.push((function(l) {
            var request;
            request = $http.get('./geojson/' + l.geojsonFilename);
            //                v-----request.then() is a promise
            return request.then(function(result) {
              console.log('we made it! load this layer:', l.geojsonFilename); // loads all geojson data one at a time 
              l.geojsonFilename = result.data;
              initializeLayerData(l);
            });
        })(l)); // immediately pushes geojson objects to results
        }
        return results;
      }, 0);
  };
  
  initialize();
  loadRoutes();
}
]);