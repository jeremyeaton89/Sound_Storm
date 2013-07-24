// $(function() {
// 	// tag first audio of each playset
// 	var interval = window.setInterval();

// 	// Play Button
// 	$("body").on("click", ".play-set .play-button", function() {
// 		// debugger
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
// 			$(this).removeClass("play").addClass("pause")
// 			$thisAudio[0].play();
// 			// $thisAudio.bind("ended", function() {
// 			// 	if ($(this).next().is("audio")) {

// 			// 	}
// 			// }) 


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

// 	// play next track on ended
// 	// $("body").bind("ended", "audio", function() {
// 	// 	alert("end!")
// 	// })
// });