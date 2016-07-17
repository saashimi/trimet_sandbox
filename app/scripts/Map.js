/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
  var initialize, loadRoutes, l, initializeLayerData, searchFeatures;
  // l is a declared variable

  //----Initial States----//
    $scope.selectedSearchValue = void 0;
    $scope.searchFields = [];
    searchFeatures = null;


  initialize = function() {
    console.log("we're in initialize!");
    $scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: {lat: 45.5231, lng: -122.6765},
      zoom: 13
    });
 

    setTimeout(function() {
            var request;
            request = $http.get('/search/routeList.json');
            return request.then(function(result) {
              var feature, k, len2, ref1, results;
              console.log('got search data');
              console.log(result.data.features);

              /*
              ref1 = result;
              results = [];
              var abbrevs = [];
              for (k = 0, len2 = ref1.length; k < len2; k++) {
                feature = ref1[k];

                if(abbrevs.indexOf(feature.properties.Abbrev) == -1){
                    $scope.searchFields.push({
                        text:feature.properties.Abbrev,
                        buildingName: feature.properties.Name,
                        building: feature.properties.BLDG_AIM,
                        isBuilding:true
                    })
                    abbrevs.push(feature.properties.Abbrev)
                }

                $scope.searchFields.push({
                  text: feature.properties.Department,
                  buildingName: feature.properties.Name,
                  building:feature.properties.BLDG_AIM,
                  department: feature.properties.Department,
                  room: feature.properties.Room,
                  isBuilding: false
                });

                $scope.searchFields.push({
                  text: feature.properties.Room,
                  buildingName: feature.properties.Name,
                  building:feature.properties.BLDG_AIM,
                  department: feature.properties.Department,
                  room: feature.properties.Room,
                  isBuilding: false
                });

                $scope.searchFields.push({
                  text: feature.properties.Name,
                  buildingName: feature.properties.Name,
                  building:feature.properties.BLDG_AIM,
                  department: feature.properties.Department,
                  room: feature.properties.Room,
                  isBuilding: true
                });
              }
              return ; */
            }); 

          }, 0);

  
    loadRoutes();


    console.log('map initialized!');

  };
  initializeLayerData = function(layerData) {
      layerData.features = $scope.map.data.addGeoJson(layerData.geojsonFilename);
  };
 
  loadRoutes = function() {
    console.log("we're in loadRoutes!");
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




}
]);