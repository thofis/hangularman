'use strict';
/* Controllers */

angular.module('hangularApp.controllers', []).
   controller('HangularCtrl',
      ['$scope', 'wordUtils', 'wordProvider', 'gameState', 'alphabet', 'nrOfTries', '$modal',
          function($scope, wordUtils, wordProvider, gameState, alphabet, nrOfTries, $modal) {

              $scope.gui = {};

              $scope.gui.searchterm;
              $scope.gui.hiddenSearchterm;

              var images = [];
              $scope.gui.currentImage;

              $scope.gui.buttons1;
              $scope.gui.buttons2;
              $scope.gui.buttons3;
              $scope.gui.buttons4;

              $scope.gui.buttonClicked = function(btn) {
                  console.log(btn.char);
                  var newHidden = wordUtils.processCharacter(btn.char,
                     $scope.gui.searchterm, $scope.gui.hiddenSearchterm);
                  gameState.processGuess($scope.gui.searchterm, $scope.gui.hiddenSearchterm, newHidden);
                  updateGui();

                  $scope.gui.hiddenSearchterm = newHidden;
                  btn.enabled = false;
              };

              var updateGui = function() {
                  updateCurrentImage();
                  if (gameState.isGameWon()) {
                      var wonMsg = "Congratulations! You won!";
                      console.log(wonMsg);
                      showDialog(wonMsg);
                  }
                  if (gameState.isGameLost()) {
                      var lostMessage = "What a shame! You lost!";
                      console.log(lostMessage);
                      showDialog(lostMessage);
                  }
              };

              var showDialog = function(msg) {
                  var modal = $modal.open({
                      templateUrl: "partials/dialog.html",
                      controller: "DialogCtrl",
                      resolve: {
                          message : function() { return msg; }
                      }
                  });
                  modal.result.then(function() {
                      // new game
                      init();
                  });
              };

              var updateCurrentImage = function() {
                  var currentIndex = nrOfTries - gameState.getTriesLeft();
                  $scope.gui.currentImage = images[currentIndex];
              };

              var setWords = function(word) {
                  $scope.gui.searchterm = word;
                  $scope.gui.hiddenSearchterm = wordUtils.convertToHidden(word);
              };

              var init = function init() {

                  gameState.init();
                  wordProvider.getRandomWord(setWords);

                  (function initImages() {
                      for (var i = 0; i <= 7; i++) {
                          images.push({path: "images/hangman_" + i + ".png"});
                      }
                      updateCurrentImage();
                  }());

                  (function initButtons() {
                      var i = 0;
                      $scope.gui.buttons1 = [];
                      $scope.gui.buttons2 = [];
                      $scope.gui.buttons3 = [];
                      $scope.gui.buttons4 = [];
                      while (i < 7) {
                          $scope.gui.buttons1.push({char: alphabet.charAt(i++), enabled: true});
                      }
                      while (i < 13) {
                          $scope.gui.buttons2.push({char: alphabet.charAt(i++), enabled: true});
                      }
                      while (i < 20) {
                          $scope.gui.buttons3.push({char: alphabet.charAt(i++), enabled: true});
                      }
                      while (i < 26) {
                          $scope.gui.buttons4.push({char: alphabet.charAt(i++), enabled: true});
                      }
                  }());
              };
              init();
          }]).
   controller('DialogCtrl', ['$scope', '$modalInstance', 'message', function($scope, $modalInstance, message) {

           $scope.message = message;

           $scope.ok = function() {
               $modalInstance.close();
           };

           $scope.cancel = function() {
               $modalInstance.dismiss('cancel');
           };

       }]);
