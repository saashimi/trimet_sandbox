/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  var initialize, loadRoutes, l;
  // l is a declared variable
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
    $scope.currentLocationMarker = null; // KS! This appears to be proprietary
    console.log('map initialized!');
  };
  loadRoutes = function() {
    $scope.layers = $scope.config.layers;
    $rootScope.map = $scope.map;
      setTimeout(function() { // cooperative multitasking... pause the javascript execution
        var k, len2, ref1, results;
        ref1 = $scope.layers;
        console.log(ref1);
        results = [];
        for (k = 0, len2 = ref1.length; k < len2; k++) {
          l = ref1[k];
          results.push((function(l) {
            var d, len3, o, ref2, results1;
            ref2 = l.data;
            results1 = [];
            for (o = 0, len3 = ref2.length; o < len3; o++) {
              d = ref2[o];
              results1.push((function(d) {
                var request;
                request = $http.get('./geojson/' + d.geojsonFilename);
                //                v-----request.then() is a promise
                return request.then(function(result) {
                  d.geojson = result.data;
                  return initializeLayerData(d); // loads all geojson data one at a time 
                });
              })(d)); // immediately pushes geojson objects to results1;
            }
            return results1;
          })(l)); // immediately pushes to results;
        }
        return results;
      }, 0);
  };
  
  initialize();
  loadRoutes();
}
]);