(function () {
	function AlbumCtrl($scope, $timeout, Fixtures, SongPlayer) {
		this.albumData = Fixtures.getAlbum();
		this.songPlayer = SongPlayer;

		
		$scope.nextClick = function() {
			$timeout(function() {
			angular.element('.next').trigger('click');
			});
		};
		
		
/**
 * @function update
 * @desc updates the currentBuzzObject from PlayerBar and calls SongPlayer.timeUpdate using the controller's $scope so that $scope.$apply works.   
 */			
		this.update = function() {
			SongPlayer.timeUpdate($scope);
		};
	}
	
	angular
		.module('blocJams')
		.controller('AlbumCtrl', ['$scope', '$timeout', 'Fixtures', 'SongPlayer', AlbumCtrl]);
	
})();