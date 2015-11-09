var data;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query=';
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {};
  $scope.getSongs = function() {

    $http.get(baseUrl + $scope.searchedTrack).success(function(response){
     /* data =*/ $scope.tracks = response.tracks.items;
      console.log(response);
    })

  };
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

  $scope.stop = function(song) {
    $scope.audioObject.pause();
    $scope.currentSong = false;
    return;
  }

  $scope.playlist = [];
  $scope.addSong = function(song) {
    console.log(song);
    $scope.playlist.push({title: song.name, artist: song.artists[0].name});

  }

  $scope.remove = function(song) {
    var index = $scope.playlist.indexOf(song);
    $scope.playlist.splice(index, 1);
  }
});

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
