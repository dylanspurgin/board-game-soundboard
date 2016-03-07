angular.module('SoundboardModule', [])

.controller('SoundboardController', function($ionicPlatform, $cordovaFile, $cordovaMedia, $timeout) {
    
  var vm = this,
      media;

  vm.play = play;

  vm.sounds = [
    {
      name: 'Sheep',
      src: 'www/sounds/sheep.mp3'
    },
    {
      name: 'Wood',
      src: 'www/sounds/wood.mp3'
    },
    {
      name: 'Buzzer',
      src: 'www/sounds/buzzer.mp3'
    }
  ];

  function play (src) {
    if (media) {
      media.release();
      media = null;
    }
    return $ionicPlatform.ready(function() {})
      .then(function() {
        return $cordovaFile.checkFile(cordova.file.applicationDirectory, src);
      })
      .then(function(file) {
        media = $cordovaMedia.newMedia(file.nativeURL);
        media.play();
      },function (err) {
        console.log("Couldn't get file", err);
      });
  }

});