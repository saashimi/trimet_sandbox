/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', '$timeout', 'appIDService', function ($scope, $rootScope, $http, $timeout, appIDService) {
  var APPID, displayMarkers, displayRouteStops, initialize, loadRoutes, l, mapObjects, toggleFeature, trimetRouteAPI, searchFeatures, setMapOnAll, clearObjects, deleteObjects;

  //----Initial States----//
    APPID = appIDService.APPID();
    $scope.selectedSearchValue = void 0;
    $scope.searchFields = [];
    mapObjects = [];
    searchFeatures = null;

    $scope.onSelectSearch = function($item, $model, $label) {
      var rte, f, i, len;
      if (searchFeatures === null) {
        return;
      }
      rte = $item.route; // This is an integer (route number)
      console.log(rte);

      for (i = 0, len = searchFeatures.length; i < len; i++) {
        f = searchFeatures[i];
        if (f.rte === rte) {
          console.log(f.geojsonFilename);
          trimetRouteAPI(APPID, rte);
          displayRouteStops(rte);
          toggleFeature(f.geojsonFilename);
        }
        $scope.selectedSearchValue = void 0;
      }
      return;
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
            request = $http.get('search/routeList.json');
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
    deleteObjects();
    $scope.map.data.forEach(function(feature) {
      $scope.map.data.remove(feature);
    });

     /* $scope.map.data.setStyle({
        visible: true,
        strokeColor: 'blue',
        zIndex: 999   
      }); */

    //---Zoom to route geojson extents---
    var bounds = new google.maps.LatLngBounds();
    $scope.map.data.addListener('addfeature', function(e) {
        processPoints(e.feature.getGeometry(), bounds.extend, bounds);
        $scope.map.fitBounds(bounds);
    });

    var path = 'geojson/';
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

  displayRouteStops = function(dataIn) {
    $scope.map.data.loadGeoJson('./geojson/tm_route_stops_rte_' + dataIn + '.geojson');
    setTimeout(function() {
    /*must use coop multitasking here, otherwise the styles will not be loaded before the 
    geojson loads.*/  
      $scope.map.data.setStyle(function(feature) {
        var dir = feature.getProperty('dir');
        var blueUrl = 'https://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png';
        var greenUrl = 'https://maps.google.com/mapfiles/kml/paddle/grn-blank-lv.png';
        var iconColor = dir===0 ? blueUrl : greenUrl;  
        return({
        icon: iconColor,
        strokeColor: 'blue'  
        });
      });
    }, 0);
  };


  trimetRouteAPI = function(passAPPID, passRouteInput) {
  /* Accesses the TriMet API for live vehicle location info.
  Output: An array containing objects: lat/long, vehicle ID, timestamp, direction, 
  and verbose route information.
  Input: Route number from user selection from search. */
  
  var url = "https://developer.trimet.org/ws/v2/vehicles/appID="; 
  var dataOut = [];
  var innerData;
  $.post(url + passAPPID, function(data) {
    data = data.resultSet.vehicle;
    $.each(data, function(outerIndex, outerValue) { // Key into the inner JSON
        innerData = data[outerIndex];
        $.each(innerData, function(innerIndex, innerValue) {
          if (innerIndex === "routeNumber" && 
              innerValue === Number(passRouteInput)) { 
            var dataPacket = {
              latitude : innerData.latitude,       
              longitude : innerData.longitude,     
              vehicleID : innerData.vehicleID,     
              time : innerData.time,          
              direction : innerData.direction,      
              signMessageLong : innerData.signMessageLong 
            };
            dataOut.push(dataPacket);
            displayMarkers(dataOut);
          } 
        });
      });
    });
  },

  displayMarkers = function(dataIn) {
    /* Displays marker data from TriMet API data coordinates.
    Input: output from trimetFuncs.trimetStops(); an object containing lat/long coords,
           vehicle ID, timestamp, direction, and verbose route information.
    Output: A blue marker on the google map canvas if direction = 0; 
            A green marker on the google map canvas if direction = 1. */
      var markerData = dataIn;
      for( var i = 0; i < markerData.length; i++ ) {
        var position = new google.maps.LatLng(
                                              markerData[i].latitude, 
                                              markerData[i].longitude
                                              );
        //console.log(position);
        if (markerData[i].direction === 0) { 
          var marker = new google.maps.Marker({
              icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              position: position,
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              clickable: true,
              zIndex: 999 // places markers above stop icons.
          });
        } else {
              marker = new google.maps.Marker({
              icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
              position: position,
              map: $scope.map,
              animation: google.maps.Animation.DROP,
              clickable: true,
              zindex: 999
          });
          }

          //TODO: Make Unix time conversion its own function
          var date = new Date(markerData[i].time);
          if (date.getHours() > 12) { 
            var hours = date.getHours() - 12;
          } else { 
            hours = date.getHours();
          }
          var minutes = "0" + date.getMinutes();
          var logTime = hours + ":" + minutes.substr(-2);
        

        var infoContent = ('<h5><p> Vehicle Number: ' + String(markerData[i].vehicleID) + 
            '</br>' + '<p>' + String(markerData[i].signMessageLong) + '</br>'
            +'<h6><p> This position was logged at: ' + logTime + '</br></h6>' 
            
            );
        marker.info = new google.maps.InfoWindow({
          content: infoContent
        })

        mapObjects.push(marker);
        //Zooms in on marker upon click.
        google.maps.event.addListener(marker, 'click', function() {
          $scope.map.panTo(this.getPosition());
          $scope.map.setZoom(15);
          this.info.open($scope.map, this);
        });  
      }
    },

  setMapOnAll = function(map) {
    for (var i = 0; i < mapObjects.length; i++) {
      mapObjects[i].setMap(map);
    }
  };

  // Removes the mapObjects from the map, but keeps them in the array.
  clearObjects = function() {
    setMapOnAll(null);
  };

  // Deletes all mapObjects in the array by removing references to them.
  deleteObjects = function() {
    clearObjects();
    mapObjects = [];
  };



 //---KS: This is the only block that would work to avoid js firing before the map canvas 
$scope.init = function() {
  console.log('scope.init!');
  initialize();
};
$timeout($scope.init);
}
]);