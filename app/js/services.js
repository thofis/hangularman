'use strict';

/* Services */

angular.module('hangularApp.services', []).
   value('alphabet', 'abcdefghijklmnopqrstuvwxyz').
   service('wordUtils', ['alphabet', function(alphabet) {

           this.isLetter = function(ch) {
               return alphabet.indexOf(ch.toLowerCase()) >= 0;
           };

           this.convertToHidden = function(term) {
               var hidden = "";
               for (var i = 0; i < term.length; i++) {
                   var ch = term.charAt(i);
                   if (this.isLetter(ch)) {
                       hidden += "-";
                   } else {
                       hidden += ch;
                   }
               }
               return hidden;
           };
       }]).
   factory('wordProvider', ['$http', function($http) {
           var wp = {};

           var callbackFunction;

           var provideWord = function(data, status, headers, config) {
               var countries = data;
               var randomIndex = Math.floor(Math.random() * countries.length);
               var word = countries[randomIndex];
               callbackFunction(word);
           };

           wp.getRandomWord = function(fn) {
               callbackFunction = fn;
               $http.get('resources/countries.json').success(provideWord);
           };

           return wp;
       }]);
