(function () {
	function AlbumCtrl($scope, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;
		
		this.update = function() {
			var currentBuzz = SongPlayer.currentBuzzObject;
			SongPlayer.timeUpdate($scope, currentBuzz);
		}
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['$scope','Fixtures', 'SongPlayer', AlbumCtrl]);
	
})();