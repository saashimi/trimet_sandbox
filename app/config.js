(function () {
    'use strict';
    angular.module('trimappApp.configuration', [])
        .factory('config', function() {
            var config = 
            {
                layers: [
                  {'geojsonFilename': 'tm_routes_rte__1.geojson', 'rte': 1}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__10.geojson', 'rte': 10}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__100.geojson', 'rte': 100}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__11.geojson', 'rte': 11}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__119.geojson', 'rte': 119}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__12.geojson', 'rte': 12}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__14.geojson', 'rte': 14}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__15.geojson', 'rte': 15}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__152.geojson', 'rte': 152}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__154.geojson', 'rte': 154}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__155.geojson', 'rte': 155}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__156.geojson', 'rte': 156}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__16.geojson', 'rte': 16}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__17.geojson', 'rte': 17}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__18.geojson', 'rte': 18}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__19.geojson', 'rte': 19}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__190.geojson', 'rte': 190}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__193.geojson', 'rte': 193}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__194.geojson', 'rte': 194}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__195.geojson', 'rte': 195}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__20.geojson', 'rte': 20}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__200.geojson', 'rte': 200}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__203.geojson', 'rte': 203}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__208.geojson', 'rte': 208}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__21.geojson', 'rte': 21}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__22.geojson', 'rte': 22}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__23.geojson', 'rte': 23}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__24.geojson', 'rte': 24}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__25.geojson', 'rte': 25}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__29.geojson', 'rte': 29}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__290.geojson', 'rte': 290}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__291.geojson', 'rte': 291}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__30.geojson', 'rte': 30}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__32.geojson', 'rte': 32}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__33.geojson', 'rte': 33}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__34.geojson', 'rte': 34}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__35.geojson', 'rte': 35}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__36.geojson', 'rte': 36}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__37.geojson', 'rte': 37}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__38.geojson', 'rte': 38}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__39.geojson', 'rte': 39}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__4.geojson', 'rte': 4}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__43.geojson', 'rte': 43}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__44.geojson', 'rte': 44}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__45.geojson', 'rte': 45}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__46.geojson', 'rte': 46}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__47.geojson', 'rte': 47}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__48.geojson', 'rte': 48}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__50.geojson', 'rte': 50}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__51.geojson', 'rte': 51}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__52.geojson', 'rte': 52}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__53.geojson', 'rte': 53}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__54.geojson', 'rte': 54}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__55.geojson', 'rte': 55}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__56.geojson', 'rte': 56}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__57.geojson', 'rte': 57}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__58.geojson', 'rte': 58}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__59.geojson', 'rte': 59}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__6.geojson', 'rte': 6}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__61.geojson', 'rte': 61}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__62.geojson', 'rte': 62}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__63.geojson', 'rte': 63}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__64.geojson', 'rte': 64}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__65.geojson', 'rte': 65}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__66.geojson', 'rte': 66}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__67.geojson', 'rte': 67}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__68.geojson', 'rte': 68}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__70.geojson', 'rte': 70}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__71.geojson', 'rte': 71}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__72.geojson', 'rte': 72}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__75.geojson', 'rte': 75}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__76.geojson', 'rte': 76}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__77.geojson', 'rte': 77}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__78.geojson', 'rte': 78}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__79.geojson', 'rte': 79}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__8.geojson', 'rte': 8}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__80.geojson', 'rte': 80}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__81.geojson', 'rte': 81}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__84.geojson', 'rte': 84}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__85.geojson', 'rte': 85}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__87.geojson', 'rte': 87}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__88.geojson', 'rte': 88}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__9.geojson', 'rte': 9}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__90.geojson', 'rte': 90}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__92.geojson', 'rte': 92}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__93.geojson', 'rte': 93}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__94.geojson', 'rte': 94}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__96.geojson', 'rte': 96}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__97.geojson', 'rte': 97}
                  ,
                  {'geojsonFilename': 'tm_routes_rte__99.geojson', 'rte': 99}
                  ,

                ]
            };
            // want to keep this as lightweight as possible, otherwise we get
            // some async load problems.
            return config;
        });
       
}).call(this);
//Emulating config.js from psu-campus-map