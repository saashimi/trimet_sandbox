/* global google */
'use strict';
angular.module('trimappApp.map', []).controller('mapCtrl',[
  '$scope', '$rootScope', '$http', '$timeout', 'appIDService', function ($scope, $rootScope, $http, $timeout, appIDService) {
  var APPID, clickListener, displayMarkers, displayRouteStops, initialize, infowindow, infoWindowSetup, loadRoutes, l, mapObjects, toggleFeature, trimetRouteAPI, trimetStopAPI, searchFeatures, setMapOnAll, stopLayer, clearObjects, deleteObjects;

  //----Initial States----//
    APPID = appIDService.APPID();
    $scope.selectedSearchValue = void 0;
    $scope.searchFields = [];
    mapObjects = [];
    infowindow = new google.maps.InfoWindow();
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
    console.log('map initialized!')

  };

  
  toggleFeature = function(routeData) {
    deleteObjects();
    $scope.map.data.forEach(function(feature) {
      $scope.map.data.remove(feature);
    });

     $scope.map.data.setStyle({
        visible: true,
        strokeColor: 'blue',
        zIndex: 999   
      });

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
    var dir, blueUrl, greenUrl, iconColor, stopID, stopName, stopRouteServed, response;
    if (stopLayer) {
      stopLayer.forEach(function(feature) {
        stopLayer.remove(feature);
      });   
    };
    stopLayer = new google.maps.Data( {map: $scope.map} );
    stopLayer.loadGeoJson('./geojson/tm_route_stops_rte_' + dataIn + '.geojson');
    setTimeout(function() {
    /*must use coop multitasking here, otherwise the styles will not be loaded before the 
    geojson loads.*/  
      stopLayer.setStyle(function(feature) {
        dir = feature.getProperty('dir');
        blueUrl = 'https://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png';
        greenUrl = 'https://maps.google.com/mapfiles/kml/paddle/grn-blank-lv.png';
        iconColor = dir===0 ? blueUrl : greenUrl;  
        return({
          icon: iconColor,
          clickable: true
        });
      });
      $scope.map.addListener('zoom_changed', function() {
        //Prevents visual clutter by hiding bus stops until a close-in zoom level.
        var zoomLevel = $scope.map.getZoom();
        if (zoomLevel < 15) {
          stopLayer.setMap(null);
        } else {
          stopLayer.setMap($scope.map);
        }
      });
    }, 0);
    stopLayer.addListener('click', function(event) {
    //Waits for user to click on a stop and calls triMet arrivals API for info on
    //selected stop.
    stopID = event.feature.getProperty("stop_id");
    stopName = event.feature.getProperty("stop_name");
    stopRouteServed = event.feature.getProperty("rte");  
    infowindow.setPosition(event.latLng);
    response = trimetStopAPI(stopRouteServed, stopID, stopName);   
    });
  }; 

  trimetRouteAPI = function(passAPPID, passRouteInput) {
  /* Accesses the TriMet API for live vehicle location info.
  Output: An array containing objects: lat/long, vehicle ID, timestamp, direction, 
  and verbose route information.
  Input: Route number from user selection from search. */
  var url, dataOut, innerData, dataPacket;
  url = "https://developer.trimet.org/ws/v2/vehicles/appID="; 
  dataOut = [];
  innerData;
  $.post(url + passAPPID, function(data) {
    data = data.resultSet.vehicle;
    $.each(data, function(outerIndex, outerValue) { // Key into the inner JSON
        innerData = data[outerIndex];
        $.each(innerData, function(innerIndex, innerValue) {
          if (innerIndex === "routeNumber" && 
              innerValue === Number(passRouteInput)) { 
              dataPacket = {
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
      var markerData, marker, position, icon;
      markerData = dataIn;
      for( var i = 0; i < markerData.length; i++ ) {     
        marker = new google.maps.Marker();
        position = new google.maps.LatLng(
                                    markerData[i].latitude, 
                                    markerData[i].longitude
                                    );         
        var blueIcon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";       
        var greenIcon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
        icon = markerData[i].direction===0 ? blueIcon : greenIcon;
        marker.setOptions({
          icon: icon,
          position: position,
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          clickable: true,
          zIndex: 999 // places markers above stop icons.
        });
                 
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
      };
    },

  trimetStopAPI = function(passStopRouteServed, passStopInput, passStopName) {
    /* Accesses TriMet arrivals API for realtime vehicle ETAs for that particular
    route and stop. 
    Input data: Route number, Stop ID, descriptive stop name.
    Output data: Array of incoming vehicle IDs,
                 Array of incoming vehicle ETAs in unix time format,
                 Verbose stop name. */

    var url = "https://developer.trimet.org/ws/v2/arrivals?locIDs=";
    var locID = passStopInput;
    var urlTrailing =  "&minutes&appID=";
    var innerStopData;
    var vehicleList = [];
    var arrivalTime = [];
    $.post(url + locID + urlTrailing + APPID, function(data) {
    data = data.resultSet.arrival;
      $.each(data, function(index, value) {
        innerStopData = data[index]
        $.each(innerStopData, function(innerIndex, innerValue) {
          if (innerIndex === "route" && innerValue === passStopRouteServed) { 
            var vehicleID = innerStopData.vehicleID;
            vehicleList.push(vehicleID);        
            arrivalTime.push(innerStopData.estimated);         
          }
        });
      });
      infoWindowSetup(vehicleList, arrivalTime, passStopName, locID);
    });
  },

  infoWindowSetup = function(passVehicles, passArrivals, passStopName, passStopInput) {
      /* Sets up the info windows for selected route stops. 
      Inputs: array of incoming vehicles,
              array of incoming arrival times,
              verbose stop name
      Output: infowindow content displayed on the google maps canvas, pertaining
              to the selected stop. */

      var formattedETA = [];
      //Converts unix time format to HH:MM format.
      
      $.each(passArrivals, function(index, value) {
        var date = new Date(value);
        if (date.getHours() > 12) { 
          var hours = date.getHours() - 12;
        } else { 
          var hours = date.getHours();
        }
        var minutes = "0" + date.getMinutes();
        var ETA = hours + ":" + minutes.substr(-2);
        formattedETA.push(ETA);
      });

      // Formats and populates the info window. 
      var infoContent = (
        "<h5><p> This is stop: " + passStopInput + "</br>"
        + "<h4><p>" + passStopName + "</br></h4>"
        + "<h6><p>Upcoming Vehicles (ID#): " + passVehicles + "</br></h6>"
        + "<h6><p>Estimated arrival times: " + formattedETA + "</br></h6>"
      )
      infowindow.setContent(infoContent);
      infowindow.setOptions(
        {pixelOffset: new google.maps.Size(0,-10)}
        );
      infowindow.open($scope.map);
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