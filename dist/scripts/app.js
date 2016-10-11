(function() {
     function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});

		//creates the states for going from page to another
		// assigns the controllers to the states as well
		 
		 $stateProvider
			.state('landing', {
				url: '/',
			 	controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
		})
			.state('album', {
				url: '/album',
			 	controller: 'AlbumCtrl as album',
				templateUrl: '/templates/album.html'
		})
			.state('collection', {
				url: '/collection',
			 	controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
		});
		
	 
	 
	 }
	
	angular
         .module('blocJams', ['ui.router'])
         .config(config);

})();


