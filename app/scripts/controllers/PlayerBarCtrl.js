(function() {
	function PlayerBarCtrl($scope, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		
		this.update = function() {
			var currentBuzz = SongPlayer.currentBuzzObject;
			SongPlayer.timeUpdate($scope, currentBuzz);
		}
		
		this.update();		
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['$scope','Fixtures', 'SongPlayer', PlayerBarCtrl]);
	
	
})();