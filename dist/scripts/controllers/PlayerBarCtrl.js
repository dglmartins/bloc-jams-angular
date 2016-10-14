(function() {
	function PlayerBarCtrl($scope, $timeout, Fixtures, SongPlayer) {
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
/**
 * call the function to start, as the first song is already loaded into currentBuzzObject.   
 */	
		this.update();		
	}
	
	angular
		.module('blocJams')
		.controller('PlayerBarCtrl', ['$scope','$timeout','Fixtures', 'SongPlayer', PlayerBarCtrl]);
	
	
})();