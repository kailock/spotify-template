/* Kaitlin Lockhart
   Angular functions for getting songs, play/stop, creating playlist, removing playlist items*/

var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query=';
var myApp = angular.module('myApp', []);

/* Angular controller */
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {};
  $scope.getSongs = function() {

    $http.get(baseUrl + $scope.searchedTrack).success(function(response){
     $scope.tracks = response.tracks.items;
      console.log(response);
    })

  };
  /* Play songs */
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause();
      $scope.currentSong = false;
      return;
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause();
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play();
      $scope.currentSong = song
    }
  }

  /* Stop songs */
  $scope.stop = function(song) {
    $scope.audioObject.pause();
    $scope.currentSong = false;
    return;
  }

  /* Create playlist & add items to it */
  $scope.playlist = [];
  $scope.addSong = function(song) {
    console.log(song);
    $scope.playlist.push({title: song.name, artist: song.artists[0].name});

  }

  /* Remove item from playlist */
  $scope.remove = function(song) {
    var index = $scope.playlist.indexOf(song);
    $scope.playlist.splice(index, 1);
  }
});

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
