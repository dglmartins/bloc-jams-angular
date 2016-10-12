(function() {
	function SongPlayer(Fixtures) {
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
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
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
		
		
		

/**
 * @desc Active song object begins with first song so Player bar play will work. First song is then set to start 
 * @type {Object}
 */
		var firstSong = currentAlbum.songs[0];
		
		SongPlayer.currentSong = firstSong;
		
		setSong(firstSong);
		
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
* @desc gets current index of song and decreases by one. 
* @param {Object} song
*/		
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			if (currentSongIndex < 0) {
         		currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
     		} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
     		}
			
		};
		
		
		
		
		
		
		
		return SongPlayer;
		
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
	
	
})();