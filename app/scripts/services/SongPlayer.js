(function() {
	function SongPlayer($rootScope, Fixtures) {
		var SongPlayer = {};
/**
* @desc gets current Album from Fixtures.
* @type {Object}
*/		
		var currentAlbum = Fixtures.getAlbum();



/**
* @desc Buzz object audio file
* @type {Object}
*/
		var currentBuzzObject = null;
		
/**
* @function setSong
* @desc Stops currently playing song and loads new audio file as currentBuzzObject
* @param {Object} song
*/
		
		var setSong = function(song) {
			if (currentBuzzObject) {
				stopSong();
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentBuzzObject.bind('timeupdate', function() {
				$rootScope.$apply(function() {
					SongPlayer.currentTime = currentBuzzObject.getTime();
				});
				
				
			});
			
			
			SongPlayer.currentSong = song;
		};

/**
* @function playSong
* @desc plays the currentBuzzObject and sets the playing property of the song to true  
* @param {Object} song
*/
		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
			
		};
		
		
/**
* @function pauseSong
* @desc pauses the currentBuzzObject and sets the playing property of the song to false  
* @param {Object} song
*/
		var pauseSong = function(song) {
			currentBuzzObject.pause();
			song.playing = false;
			
		};
		

/**
* @function getSongindex
* @desc returns the index of a given song 
* @param {Object} song
*/		
		
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);	
		};
		
		
		var stopSong = function() {
			currentBuzzObject.stop();
			SongPlayer.currentSong.playing = null;
			
		}
		

/**
 * @desc Active song object begins with first song so Player bar play will work. First song is then set to start 
 * @type {Object}
 */
		
		var firstSong = currentAlbum.songs[0];
		
		setSong(firstSong);
		
/**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
		
		SongPlayer.currentTime = null;		
		
		
		
		
/**
* SongPlayer.play property - @function
* @desc if current song is not song passed, sets and plays the new song. If current song is the song passed, plays song if song is paused. 
* @param {Object} song
*/		
		
		
		SongPlayer.play = function(song) {
			
			song = song || SongPlayer.currentSong;
			if(SongPlayer.currentSong !== song) {
				setSong(song);
			
				playSong(song);
			
			} else if (SongPlayer.currentSong === song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
					
				}
				
				
			}
			
		};

/**
* SongPlayer.pause property - @function
* @desc pauses song passed. 
* @param {Object} song
*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			pauseSong(song);
			
			
		};
		
/**
* SongPlayer.previous property - @function
* @desc gets current index of song and decreases by one and sets and plays the new song.  stops song if first one.
* @param {Object} song
*/		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
         		stopSong();
     		} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
     		}
			
		};
		
		/**
* SongPlayer.next property - @function
* @desc gets current index of song and increase by one and sets and plays the new song. Goes to first song if at last song.
* @param {Object} song
*/		
		SongPlayer.next = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex++;
			if (currentSongIndex > currentAlbum.songs.length - 1) {
         		var song = currentAlbum.songs[0];
				setSong(song);
				playSong(song);
     		} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
     		}
			
		};
		
		
/**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
		
		SongPlayer.setCurrentTime = function(time) {
     		if (currentBuzzObject) {
         		currentBuzzObject.setTime(time);
     		}
 		};
		
		
		
		
		return SongPlayer;
		
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
	
	
})();