
'use strict';

/**
 * @ngdoc function
 * @name trimappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trimappApp
 */
angular.module('trimappApp')
  .controller('someOtherCtrl', function () {
    console.log('we\'re in main.js.');
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });