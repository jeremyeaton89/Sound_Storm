$(function() {
	var interval = window.setInterval();
	
	// Seeking
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
	
	// Play Button
	$("body").on("click", ".play-button", function() {
		var $thisAudio = $(this).parent().siblings("audio");


		if ($(this).hasClass("play")) {
			interval = window.clearInterval(interval);

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

	// Comment Form
	$("body").on("focus", "input", function(event) {
		event.preventDefault();
		var offsetX = $(this).closest(".comment-form").prev(".widget").find(".seeker").width();
		$img = $("<img src=\"<%= SoundStorm.currentUser.escape('profile_picture_url') %>\">").attr({
			height: "12px",
			width: "12px"
		});
		// debugger
		
		$(this).closest(".widget").find("audio")[0].currentTime
		console.log(event);
	})

});	