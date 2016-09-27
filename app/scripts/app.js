'use strict';

/**
 * @ngdoc overview
 * @name trimappApp
 * @description
 * # trimappApp
 *
 * Main module of the application.
 */
// TODO: Fix this whole trimappApp nonsense. Should just be 'app.'
angular.module('trimappApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'ui.bootstrap', 'trimappApp.map', 'trimappApp.configuration', 'trimappApp.helpers']).config([
    '$routeProvider', // KS, don't know what's going on here.
    function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        //controller: 'mapCtrl', <--This causes our script to load twice.
        //controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
    }
]).run([
    // If I understand this correctly, we're just attaching confing information to the rootScope.
    '$rootScope', 'config',
    function($rootScope, config) {
        $rootScope.config = config;
        //return $rootScope;
    }
]);
