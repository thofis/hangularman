'use strict';


// Declare app level module which depends on filters, and services
angular.module('hangularApp', [
    'ngRoute',
    'hangularApp.filters',
    'hangularApp.services',
    'hangularApp.directives',
    'hangularApp.controllers'
]).
   config(['$routeProvider', function($routeProvider) {
           $routeProvider.when('/', {templateUrl: 'partials/hangman.html', controller: 'HangularCtrl'});
           $routeProvider.otherwise({redirectTo: '/'});
       }]);
