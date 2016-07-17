/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  var initialize, loadRoutes, l, initializeLayerData;
  // l is a declared variable
  initialize = function() {
    console.log("we're in initialize!");
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
    $scope.currentLocationMarker = null; // KS! This appears to be proprietary
    $scope.selectedSearchValue = void 0; // Evaluates given expression and returns undefined.
    console.log('map initialized!');
  };
  initializeLayerData = function(layerData) {
      layerData.features = $scope.map.data.addGeoJson(layerData.geojsonFilename);
  };
 
  loadRoutes = function() {
    console.log("we're in loadRoutes!")
    $scope.layers = $scope.config.layers;
    $rootScope.map = $scope.map;
      setTimeout(function() { // cooperative multitasking... pause the javascript execution. For now, removing this still makes the whole thing work.
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
              l.geojsonFilename = result.data;  // loads all geojson data one at a time 
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