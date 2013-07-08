$(function() {
	var interval = window.setInterval();
	
	$("body").on("click", ".seeker-container", function(event) {
		interval = window.clearInterval(interval);		

		var $thisAudio = $(this).closest(".widget").find("audio");
		$thisAudio[0].currentTime = (event.offsetX - 2)/ $(this).width() * $thisAudio[0].duration;
		// pause all audio
		$(".play-button").addClass("play").removeClass("pause");
		$("audio").each(function(i, audio) { audio.pause() });
		// play this audio
		$(this).closest(".widget").find(".play-button").removeClass("play").addClass("pause");
		$thisAudio[0].play();

		var that = this;
		interval = window.setInterval(function() {
			var width = $thisAudio[0].currentTime / $thisAudio[0].duration * 100;
			$(that).find(".seeker").width(width + "%");		
		}, 200);
	});
	
	$("body").on("click", ".play-button", function() {
		var $thisAudio = $(this).parent().siblings("audio");
		// var interval ; 

		if ($(this).hasClass("play")) {
			interval = window.clearInterval(interval);
			// if (interval !== "undefined") interval = window.clearInterval(interval);
			// pause all audio
			$(".play-button").addClass("play").removeClass("pause");
			$("audio").each(function(i, audio) { audio.pause() });
			// play this audio
			$(this).removeClass("play").addClass("pause")
			$thisAudio[0].play();

			var that = this;
			interval = window.setInterval(function() {
				var width = $thisAudio[0].currentTime / $thisAudio[0].duration * 100;
				$(that).parent().siblings(".visualizer").find(".seeker").width(width + "%");		
			}, 200);

		} else {
			$(this).addClass("play").removeClass("pause");
			$thisAudio[0].pause();
			interval = window.clearInterval(interval);
		}

	});



	// $("body").on("click", ".play-button", function() {
	// 	// debugger
	// 	$(this).closest(".widget").toggleClass("playing");

	// 	if ($(this).closest(".widget").hasClass("playing")) {
	// 		$(this).removeClass("play").addClass("pause").find("audio")[0].play();
	// 		$(".play-button").not($(this)).removeClass("play").addClass("pause")
	// 		$("audio").not($(this).find("audio"))[0].pause()
	// 		$(".sound").not(this).removeClass("playing");
	// 	} else {
	// 		$(this).find("audio")[0].pause();
	// 	}


		// if ($(this).closest(".widget").hasClass("playing")) {
		// 	$(this).find("audio")[0].pause();
		// 	$(this).closest(".widget").removeClass("playing");
		// } else {
		// 	$(this).find("audio")[0].play();
		// 	$("playing").find("audio")[0].pause();
		// 	$("playing").removeClass("playing");
		// 	$(this).closest(".widget").addClass("playing");
		// }

		// $("audio").not(this).each(function(i, audio) { audio.pause() });
	// });


});	