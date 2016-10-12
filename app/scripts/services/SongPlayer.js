(function() {
	function SongPlayer() {
		var SongPlayer = {};
		
		var currentSong = null;

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
				currentSong.playing = null;
			}

			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});

			currentSong = song;
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
* SongPlayer.play property - @function
* @desc if current song is not song passed, sets and plays the new song. If current song is the song passed, plays song if song is paused. 
* @param {Object} song
*/		
		
		SongPlayer.play = function(song) {
			
			if(currentSong !== song) {
				setSong(song);
			
				playSong(song);
			
			} else if (currentSong === song) {
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
			pauseSong(song);
			
			
		};
		
		
		
		
		return SongPlayer;
		
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', SongPlayer);
	
	
})();