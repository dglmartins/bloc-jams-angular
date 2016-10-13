(function() {
	function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		
/**
 * @function update
 * @desc updates the currentBuzzObject from PlayerBar and calls SongPlayer.timeUpdate using the controller's $scope so that $scope.$apply works.   
 */			
		
		
		
		this.update = function() {
			var currentBuzz = SongPlayer.currentBuzzObject;
			SongPlayer.timeUpdate($scope, currentBuzz);
		}
/**
 * call the function to start, as the first song is already loaded into currentBuzzObject.   
 */	
		this.update();		
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['$scope','Fixtures', 'SongPlayer', PlayerBarCtrl]);
	
	
})();