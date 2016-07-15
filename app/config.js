(function () {
    'use strict';
    angular.module('trimappApp.configuration', [])
        .factory('config', function() {
            var config = 
            {
                layers: [

                    {
                      id: 'rte_1',
                      geojsonFilename: 'tm_routes_rte__1.geojson'
                    },

                    {
                      id: 'rte_10',
                      geojsonFilename: 'tm_routes_rte__10.geojson'
                    },

                    {
                      id: 'rte_100',
                      geojsonFilename: 'tm_routes_rte__100.geojson'
                    },

                    {
                      id: 'rte_11',
                      geojsonFilename: 'tm_routes_rte__11.geojson'
                    },

                    {
                      id: 'rte_119',
                      geojsonFilename: 'tm_routes_rte__119.geojson'
                    },

                    {
                      id: 'rte_12',
                      geojsonFilename: 'tm_routes_rte__12.geojson'
                    },

                    {
                      id: 'rte_14',
                      geojsonFilename: 'tm_routes_rte__14.geojson'
                    },

                    {
                      id: 'rte_15',
                      geojsonFilename: 'tm_routes_rte__15.geojson'
                    },

                    {
                      id: 'rte_152',
                      geojsonFilename: 'tm_routes_rte__152.geojson'
                    },

                    {
                      id: 'rte_154',
                      geojsonFilename: 'tm_routes_rte__154.geojson'
                    },

                    {
                      id: 'rte_155',
                      geojsonFilename: 'tm_routes_rte__155.geojson'
                    },

                    {
                      id: 'rte_156',
                      geojsonFilename: 'tm_routes_rte__156.geojson'
                    },

                    {
                      id: 'rte_16',
                      geojsonFilename: 'tm_routes_rte__16.geojson'
                    },

                    {
                      id: 'rte_17',
                      geojsonFilename: 'tm_routes_rte__17.geojson'
                    },

                    {
                      id: 'rte_18',
                      geojsonFilename: 'tm_routes_rte__18.geojson'
                    },

                    {
                      id: 'rte_19',
                      geojsonFilename: 'tm_routes_rte__19.geojson'
                    },

                    {
                      id: 'rte_190',
                      geojsonFilename: 'tm_routes_rte__190.geojson'
                    },

                    {
                      id: 'rte_193',
                      geojsonFilename: 'tm_routes_rte__193.geojson'
                    },

                    {
                      id: 'rte_194',
                      geojsonFilename: 'tm_routes_rte__194.geojson'
                    },

                    {
                      id: 'rte_195',
                      geojsonFilename: 'tm_routes_rte__195.geojson'
                    },

                    {
                      id: 'rte_20',
                      geojsonFilename: 'tm_routes_rte__20.geojson'
                    },

                    {
                      id: 'rte_200',
                      geojsonFilename: 'tm_routes_rte__200.geojson'
                    },

                    {
                      id: 'rte_203',
                      geojsonFilename: 'tm_routes_rte__203.geojson'
                    },

                    {
                      id: 'rte_208',
                      geojsonFilename: 'tm_routes_rte__208.geojson'
                    },

                    {
                      id: 'rte_21',
                      geojsonFilename: 'tm_routes_rte__21.geojson'
                    },

                    {
                      id: 'rte_22',
                      geojsonFilename: 'tm_routes_rte__22.geojson'
                    },

                    {
                      id: 'rte_23',
                      geojsonFilename: 'tm_routes_rte__23.geojson'
                    },

                    {
                      id: 'rte_24',
                      geojsonFilename: 'tm_routes_rte__24.geojson'
                    },

                    {
                      id: 'rte_25',
                      geojsonFilename: 'tm_routes_rte__25.geojson'
                    },

                    {
                      id: 'rte_29',
                      geojsonFilename: 'tm_routes_rte__29.geojson'
                    },

                    {
                      id: 'rte_290',
                      geojsonFilename: 'tm_routes_rte__290.geojson'
                    },

                    {
                      id: 'rte_291',
                      geojsonFilename: 'tm_routes_rte__291.geojson'
                    },

                    {
                      id: 'rte_30',
                      geojsonFilename: 'tm_routes_rte__30.geojson'
                    },

                    {
                      id: 'rte_32',
                      geojsonFilename: 'tm_routes_rte__32.geojson'
                    },

                    {
                      id: 'rte_33',
                      geojsonFilename: 'tm_routes_rte__33.geojson'
                    },

                    {
                      id: 'rte_34',
                      geojsonFilename: 'tm_routes_rte__34.geojson'
                    },

                    {
                      id: 'rte_35',
                      geojsonFilename: 'tm_routes_rte__35.geojson'
                    },

                    {
                      id: 'rte_36',
                      geojsonFilename: 'tm_routes_rte__36.geojson'
                    },

                    {
                      id: 'rte_37',
                      geojsonFilename: 'tm_routes_rte__37.geojson'
                    },

                    {
                      id: 'rte_38',
                      geojsonFilename: 'tm_routes_rte__38.geojson'
                    },

                    {
                      id: 'rte_39',
                      geojsonFilename: 'tm_routes_rte__39.geojson'
                    },

                    {
                      id: 'rte_4',
                      geojsonFilename: 'tm_routes_rte__4.geojson'
                    },

                    {
                      id: 'rte_43',
                      geojsonFilename: 'tm_routes_rte__43.geojson'
                    },

                    {
                      id: 'rte_44',
                      geojsonFilename: 'tm_routes_rte__44.geojson'
                    },

                    {
                      id: 'rte_45',
                      geojsonFilename: 'tm_routes_rte__45.geojson'
                    },

                    {
                      id: 'rte_46',
                      geojsonFilename: 'tm_routes_rte__46.geojson'
                    },

                    {
                      id: 'rte_47',
                      geojsonFilename: 'tm_routes_rte__47.geojson'
                    },

                    {
                      id: 'rte_48',
                      geojsonFilename: 'tm_routes_rte__48.geojson'
                    },

                    {
                      id: 'rte_50',
                      geojsonFilename: 'tm_routes_rte__50.geojson'
                    },

                    {
                      id: 'rte_51',
                      geojsonFilename: 'tm_routes_rte__51.geojson'
                    },

                    {
                      id: 'rte_52',
                      geojsonFilename: 'tm_routes_rte__52.geojson'
                    },

                    {
                      id: 'rte_53',
                      geojsonFilename: 'tm_routes_rte__53.geojson'
                    },

                    {
                      id: 'rte_54',
                      geojsonFilename: 'tm_routes_rte__54.geojson'
                    },

                    {
                      id: 'rte_55',
                      geojsonFilename: 'tm_routes_rte__55.geojson'
                    },

                    {
                      id: 'rte_56',
                      geojsonFilename: 'tm_routes_rte__56.geojson'
                    },

                    {
                      id: 'rte_57',
                      geojsonFilename: 'tm_routes_rte__57.geojson'
                    },

                    {
                      id: 'rte_58',
                      geojsonFilename: 'tm_routes_rte__58.geojson'
                    },

                    {
                      id: 'rte_59',
                      geojsonFilename: 'tm_routes_rte__59.geojson'
                    },

                    {
                      id: 'rte_6',
                      geojsonFilename: 'tm_routes_rte__6.geojson'
                    },

                    {
                      id: 'rte_61',
                      geojsonFilename: 'tm_routes_rte__61.geojson'
                    },

                    {
                      id: 'rte_62',
                      geojsonFilename: 'tm_routes_rte__62.geojson'
                    },

                    {
                      id: 'rte_63',
                      geojsonFilename: 'tm_routes_rte__63.geojson'
                    },

                    {
                      id: 'rte_64',
                      geojsonFilename: 'tm_routes_rte__64.geojson'
                    },

                    {
                      id: 'rte_65',
                      geojsonFilename: 'tm_routes_rte__65.geojson'
                    },

                    {
                      id: 'rte_66',
                      geojsonFilename: 'tm_routes_rte__66.geojson'
                    },

                    {
                      id: 'rte_67',
                      geojsonFilename: 'tm_routes_rte__67.geojson'
                    },

                    {
                      id: 'rte_68',
                      geojsonFilename: 'tm_routes_rte__68.geojson'
                    },

                    {
                      id: 'rte_70',
                      geojsonFilename: 'tm_routes_rte__70.geojson'
                    },

                    {
                      id: 'rte_71',
                      geojsonFilename: 'tm_routes_rte__71.geojson'
                    },

                    {
                      id: 'rte_72',
                      geojsonFilename: 'tm_routes_rte__72.geojson'
                    },

                    {
                      id: 'rte_75',
                      geojsonFilename: 'tm_routes_rte__75.geojson'
                    },

                    {
                      id: 'rte_76',
                      geojsonFilename: 'tm_routes_rte__76.geojson'
                    },

                    {
                      id: 'rte_77',
                      geojsonFilename: 'tm_routes_rte__77.geojson'
                    },

                    {
                      id: 'rte_78',
                      geojsonFilename: 'tm_routes_rte__78.geojson'
                    },

                    {
                      id: 'rte_79',
                      geojsonFilename: 'tm_routes_rte__79.geojson'
                    },

                    {
                      id: 'rte_8',
                      geojsonFilename: 'tm_routes_rte__8.geojson'
                    },

                    {
                      id: 'rte_80',
                      geojsonFilename: 'tm_routes_rte__80.geojson'
                    },

                    {
                      id: 'rte_81',
                      geojsonFilename: 'tm_routes_rte__81.geojson'
                    },

                    {
                      id: 'rte_84',
                      geojsonFilename: 'tm_routes_rte__84.geojson'
                    },

                    {
                      id: 'rte_85',
                      geojsonFilename: 'tm_routes_rte__85.geojson'
                    },

                    {
                      id: 'rte_87',
                      geojsonFilename: 'tm_routes_rte__87.geojson'
                    },

                    {
                      id: 'rte_88',
                      geojsonFilename: 'tm_routes_rte__88.geojson'
                    },

                    {
                      id: 'rte_9',
                      geojsonFilename: 'tm_routes_rte__9.geojson'
                    },

                    {
                      id: 'rte_90',
                      geojsonFilename: 'tm_routes_rte__90.geojson'
                    },

                    {
                      id: 'rte_92',
                      geojsonFilename: 'tm_routes_rte__92.geojson'
                    },

                    {
                      id: 'rte_93',
                      geojsonFilename: 'tm_routes_rte__93.geojson'
                    },

                    {
                      id: 'rte_94',
                      geojsonFilename: 'tm_routes_rte__94.geojson'
                    },

                    {
                      id: 'rte_96',
                      geojsonFilename: 'tm_routes_rte__96.geojson'
                    },

                    {
                      id: 'rte_97',
                      geojsonFilename: 'tm_routes_rte__97.geojson'
                    },

                    {
                      id: 'rte_99',
                      geojsonFilename: 'tm_routes_rte__99.geojson'
                    },
                           
                ]
            };
            
            return config;
        });
       
}).call(this);
//Emulating config.js from psu-campus-map