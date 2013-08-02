// $(function() {
// 	interval = window.setInterval();

// 	// Play Button
// 	$("body").on("click", ".play-set .play-button", function() {

// 		var $thisAudio = $(this).closest(".play-set").find("audio.current-track");
// 		var totalTime = 0;
// 		var durations = $(this).closest(".play-set").find("audio").map(function(i, audio) {
// 			return audio.duration;
// 		})
// 		durations.each(function(i, n) {
// 			totalTime += n;
// 		})

// 		console.log("total time", totalTime);
// 		if ($(this).hasClass("play")) {
// 			interval = window.clearInterval(interval);

// 			// pause all audio
// 			$(".play-button").addClass("play").removeClass("pause");
// 			$("audio").each(function(i, audio) { audio.pause() });
			
// 			// play this audio
// 			$(this).removeClass("play").addClass("pause");
// 			$thisAudio[0].play();

// 			var that = this;
// 			interval = window.setInterval(function() {
// 				var width = $thisAudio[0].currentTime / $thisAudio[0].duration * 100;
// 				$(that).parent().siblings(".visualizer").find(".seeker").width(width + "%");

// 				var comment = $(that).closest(".widget").find('img[data-track-time="' + Math.floor($thisAudio[0].currentTime) + '"]')
// 				if (comment.length > 0) {
// 					comment.each(function(i, img) {
// 						$(img).trigger("mouseover");
// 						setTimeout(function() { $(img).trigger("mouseout") }, 3000);
// 					});
// 				}
// 			}, 1000);

// 		} else {
// 			$(this).addClass("play").removeClass("pause");
// 			$thisAudio[0].pause();
// 			interval = window.clearInterval(interval);
// 		}
// 	});

// 	// Seeking
// 	$("body").on("click", ".play-set .seeker-container", function(event) {
// 		interval = window.clearInterval(interval);	

// 		var totalTime = 0;
// 		var durations = $(this).closest(".play-set").find("audio").map(function(i, audio) {
// 			return audio.duration;
// 		})
// 		durations.each(function(i, n) {
// 			totalTime += n;
// 		})	

// 		var playSetTime = (event.offsetX - 2)/ $(this).width() * totalTime;

// 		var bucket = 0;
// 		var trackToPlayIndex;
// 		durations.each(function(i, duration) { 
// 			bucket += duration;
// 			if (playSetTime <= bucket) {
// 				trackToPlayIndex = i;
// 				return false;
// 			} 
// 		});

// 		var remainingTime = 0;
// 		durations.slice(0, trackToPlayIndex).each(function(i, n) {
// 			remainingTime += n;
// 		})
// 		if (trackToPlayIndex == 0) {
// 			var timeOffSet = playSetTime;
// 		} else {			
// 			var timeOffSet = playSetTime - remainingTime;
// 		}
// 		// pause all audio
// 		$(".play-button").addClass("play").removeClass("pause");
// 		$("audio").each(function(i, audio) { audio.pause() });

// 		// play this audio
// 		$thisAudio = $(this).closest(".widget").find("audio:eq(" + trackToPlayIndex + ")");
// 		$(this).closest(".widget").find(".play-button").removeClass("play").addClass("pause");
// 		$(this).closest(".widget").find("audio").removeClass("current-track");
// 		$thisAudio.addClass("current-track");
// 		$thisAudio[0].currentTime = timeOffSet;
// 		$thisAudio[0].play();
// 		console.log("track: " + trackToPlayIndex, "playSetTime: " + playSetTime, "bucket: " + bucket, "offset: " + timeOffSet)


// 		var that = this;
// 		interval = window.setInterval(function() {
// 			var width = playSetTime++ / totalTime * 100;
// 			$(that).find(".seeker").width(width + "%");	
// 			if (width >= 100) { interval = window.clearInterval(interval); }	
// 		}, 1000);
// 	});
// });

// // play next track on ended
// function playNext() {
// 	var $currentTrack = $(".pause").closest(".widget").find(".current-track")
// 		.removeClass("current-track");
// 	if ($currentTrack.next("audio").length > 0) {
// 		$currentTrack.next("audio").addClass("current-track")[0].play();
// 	} else {
// 		$(".pause").removeClass("pause").addClass("play");
// 	}
// }















