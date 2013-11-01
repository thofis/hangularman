'use strict';

/* Services */

angular.module('hangularApp.services', []).
   value('alphabet', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').
   value('nrOfTries', 7).
   value('hiddenSymbol', "-").
   service('wordUtils', ['alphabet', 'hiddenSymbol',
       function(alphabet, hiddenSymbol) {

           this.isLetter = function(ch) {
               return alphabet.indexOf(ch.toUpperCase()) >= 0;
           };

           this.convertToHidden = function(term) {
               var hidden = "";
               for (var i = 0; i < term.length; i++) {
                   var ch = term.charAt(i);
                   if (this.isLetter(ch)) {
                       hidden += hiddenSymbol;
                   } else {
                       hidden += ch;
                   }
               }
               return hidden;
           };

           this.processCharacter = function(character, term, hiddenTerm) {
               var newHiddenTerm = "";
               for (var i = 0; i < term.length; i++) {
                   if (hiddenTerm.charAt(i) === hiddenSymbol) {
                       if (character === term.charAt(i).toUpperCase()) {
                           newHiddenTerm += term.charAt(i);
                       } else {
                           newHiddenTerm += hiddenSymbol;
                       }
                   } else {
                       newHiddenTerm += hiddenTerm.charAt(i);
                   }
               }
               return newHiddenTerm;
           };

       }]).
   factory('gameState', ['nrOfTries', function(nrOfTries) {
           
           var gs = {};
           
           var triesLeft;
           
           var gameLost;
           
           var gameWon;
           
           gs.processGuess = function(term, oldHidden, newHidden) {
               if (term === newHidden) {
                   // game won
                   gameWon = true;
               } else {
                   if (oldHidden === newHidden) {
                       // wrong guess
                       triesLeft--;
                       if (triesLeft <= 0) {
                           // game lost
                           gameLost = true;
                       }
                   } else {
                       // right guess
                   }
               }
           };
           
           gs.getTriesLeft = function() {
             return triesLeft;  
           };
           
           gs.isGameWon = function () {
               return gameWon;
           };

           gs.isGameLost = function () {
               return gameLost;
           };
           
           gs.init = function() {
             triesLeft = nrOfTries;
             gameLost = false;
             gameWon = false;
           };

           return gs;
           
           
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
