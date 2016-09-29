/* global google */
'use strict';
angular.module('trimappApp.map', ['trimappApp.helpers']).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', '$timeout', 'trimetAPIService', 'appIDService', function ($scope, $rootScope, $http, $timeout, trimetAPIService, appIDService) {
  var APPID, initialize, loadRoutes, l, test, toggleFeature, searchFeatures;

  //----Initial States----//
    APPID = appIDService.APPID();
    $scope.selectedSearchValue = void 0;
    $scope.searchFields = [];
    searchFeatures = null;

    $scope.onSelectSearch = function($item, $model, $label) {
      var rte, f, i, j, k, lat, latlng, len, len1, len2, len3, linearRing, lng, o, polygon, ref, ref1, ref2, x1, x2, y1, y2;
      if (searchFeatures === null) {
        return;
      }
      rte = $item.route; // This is an integer (route number)
      console.log(rte);

      for (i = 0, len = searchFeatures.length; i < len; i++) {
        f = searchFeatures[i];
        if (f['rte'] === rte) {
          console.log(f['geojsonFilename']);
          trimetAPIService.trimetRouteAPI(APPID,rte);
          toggleFeature(f['geojsonFilename']);
        }
        $scope.selectedSearchValue = void 0;
      }
      return
    };
  
  initialize = function() {
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    //--- Loads the parameters that will populate during searches
    setTimeout(function() {
            var request;
            request = $http.get('/search/routeList.json');
            return request.then(function(result) {
              var feature, k, len2, ref1, results;
              console.log('got search data');             
              ref1 = result.data.features;
              searchFeatures = ref1;
              results = [];

              for (k = 0, len2 = ref1.length; k < len2; k++) {
                feature = ref1[k];
              
                $scope.searchFields.push({
                  text: feature.routeVerbose,
                  route: feature.rte,
                  routeDesc:feature.rte_desc,
                });
              }
              return ;
            }); 
          }, 0);  
    console.log('map initialized!');

  };

  
  toggleFeature = function(routeData) {
    $scope.map.data.forEach(function(feature) {
      $scope.map.data.remove(feature);
    });

    var path = './geojson/'
      $scope.map.data.setStyle({
        visible: true,
        strokeColor: 'blue',
        zIndex: 999   
      })

    //---Zoom to route geojson extents---
    var bounds = new google.maps.LatLngBounds();
    $scope.map.data.addListener('addfeature', function(e) {
        processPoints(e.feature.getGeometry(), bounds.extend, bounds);
        $scope.map.fitBounds(bounds);
    });

    var path = './geojson/'
    var rteGeoJSON = $scope.map.data.loadGeoJson(path + routeData);

    function processPoints(geometry, callback, thisArg) {
        if (geometry instanceof google.maps.LatLng) {
            callback.call(thisArg, geometry);
        } else if (geometry instanceof google.maps.Data.Point) {
            callback.call(thisArg, geometry.get());
        } else {
            geometry.getArray().forEach(function (g) {
                processPoints(g, callback, thisArg);
            });
        }
    }
  };

  
  loadRoutes = function() {
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
            });
        })(l)); // immediately pushes geojson objects to results
        }
        return results;
      }, 0);
  };
 //---KS: This is the only block that would work to avoid js firing before the map canvas 
$scope.init = function() {
  console.log('scope.init!');
  initialize()
}
$timeout($scope.init);
}
])

.factory('test', function() {
  return {
    testPrint: function() {
      console.log('yeah test');
    }
  };

});