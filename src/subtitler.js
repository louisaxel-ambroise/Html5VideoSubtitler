(function($) {
	function Subtitler(){
		this._playButton = $("#playpause");
		this._video = document.getElementById("videoPlayer");
		this._timeDisplayer = $("#display");
	}

	Subtitler.prototype = {
		initialize: function(){
			this._playButton.click($.proxy(this.playVideo, this));
			this._video.addEventListener("timeupdate", $.proxy(this.timeUpdated, this));
		},

		playVideo: function(){
			if(this._video.paused){
				this._video.play();
				this._video.playbackRate = 1;
				$("#playImage").attr("src", "images/pause.png");
			}
			else{
				this._video.pause();
				$("#playImage").attr("src", "images/play.png");
			}
		},

		stopVideo: function(){
			this._video.pause();
			this._video.currentTime = 0;
		},

		timeUpdated: function(e){
			var elapsed = Math.floor(e.target.currentTime);
			var hours = Math.floor(elapsed/3600);
			elapsed = elapsed%3600;
			var minutes =  Math.floor(elapsed/60);
			elapsed = elapsed%60;
			var seconds =  Math.floor(elapsed);

			this._timeDisplayer.text(format(hours)+":"+format(minutes)+":"+format(seconds));
		}
	}

	$(document).ready(function(){
		var instance = new Subtitler();
		instance.initialize();
	});

	function format(time){
		if(time < 10)
			return "0" + time;
		return time;
	}

})(jQuery);