'use strict';
/* Controllers */

angular.module('hangularApp.controllers', []).
   controller('HangularCtrl',
      ['$scope', 'wordUtils', 'wordProvider',
          function($scope, wordUtils, wordProvider) {

                

              $scope.gui = {};
              
              $scope.gui.images = [
                  {path: "images/hangman_0.png"},
                  {path: "images/hangman_1.png"},
                  {path: "images/hangman_2.png"},
                  {path: "images/hangman_3.png"},
                  {path: "images/hangman_4.png"},
                  {path: "images/hangman_5.png"},
                  {path: "images/hangman_6.png"},
                  {path: "images/hangman_7.png"}
              ];
              
              var setWords = function(word) {
                $scope.gui.searchterm = word;
                $scope.gui.hiddenSearchterm = wordUtils.convertToHidden(word);                  
              };
              
              wordProvider.getRandomWord(setWords);
              
          }]);
