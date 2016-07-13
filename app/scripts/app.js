'use strict';

/**
 * @ngdoc overview
 * @name trimappApp
 * @description
 * # trimappApp
 *
 * Main module of the application.
 */
angular.module('trimappApp', ['ngAnimate', 'ngResource', 'ngRoute', 'ngSanitize', 'ngTouch', 'trimappApp.map'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mapCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
