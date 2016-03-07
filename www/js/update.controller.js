angular.module('UpdateModule', [])

.controller('UpdateController', function($scope, $ionicPopup, $state, $timeout) {

  var vm = this;
  var deploy = new Ionic.Deploy();

  console.log('UpdateController');
  vm.checkingForUpdate = false;
  vm.hasUpdate = false;
  vm.installingUpdate = false;
  

  vm.checkForUpdates = checkForUpdates;
  vm.doUpdate = doUpdate;


  $scope.$on('$ionicView.enter', function(e) {
    checkForUpdates();
  });


  // Check Ionic Deploy for new code
  function checkForUpdates () {
    console.log('checkForUpdates');
    vm.checkingForUpdate = true;
    deploy.check().then(function(hasUpdate) {
      console.log('hasUpdate',hasUpdate);
      $timeout(function () {
        vm.hasUpdate = hasUpdate;
        vm.checkingForUpdate = false;  
      });
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
      vm.checkingForUpdate = false;
    });
  }
  
  // Update app code with new release from Ionic Deploy
  function doUpdate () {
    vm.installingUpdate = true;
    deploy.update().then(function(res) {
      vm.installingUpdate = false;
      $ionicPopup.alert({
        title: 'Update complete', // String. The title of the popup.
        template: 'The update has been installed successfully.' // String (optional). The html template to place in the popup body.
      }).then(function () {
        $state.go('app.soundboard');
      });
    }, function(err) {
      vm.installingUpdate = false;
      $ionicPopup.alert({
        title: 'Update failed', // String. The title of the popup.
        template: err.message || 'The update failed to download or install.' // String (optional). The html template to place in the popup body.
      });
    }, function(prog) {
      // console.log('Ionic Deploy: Progress... ', prog);
    });
  };

})