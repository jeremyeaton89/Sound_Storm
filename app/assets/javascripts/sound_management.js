$(function() {
	var interval = window.setInterval();
	
	// Seeking
	$("body").on("click", ".seeker-container", function(event) {
		interval = window.clearInterval(interval);		
		// if ($(this).)

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
		if ($(this).closest(".widget").hasClass("track")) {
			$(this).closest(".widget").find(".buttons-and-stats").animate({
				"top": "120px"
			}, 400);
			$(this).closest(".widget").next(".comment-form").removeClass("hidden").animate({
				"opacity": 1,
				"margin-top": "60",
				"top": "-30px"
			}, 600);
			// debugger
			
			$(this).closest(".widget").next(".comment-form").bind("hover", function(){
				console.log("HEREHEREHERHEREHER");
				console.log(this)
				$(this).css("background-color", "#ccc")
			}, function() {
				$(this).css("background-color", "#f6f4f2");
			});

		}
	})
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
				console.log($thisAudio[0].currentTime)	
			}, 200);

		} else {
			$(this).addClass("play").removeClass("pause");
			$thisAudio[0].pause();
			interval = window.clearInterval(interval);
		}

	});

	// Comment Form 
	$("body").on("focus", "input[type='text']", function(event) {
		event.preventDefault();
		// debugger
		$(this).closest(".comment-form").off("mouseover mouseout");

		$(this).closest(".comment-form").css({
			"background-color": "#666666",
			"border": "1px solid black"
		});

		var offset = $(this).closest(".comment-form").prev(".widget").find(".seeker").width();
		$img = $("<img src=\"<%= SoundStorm.currentUser.escape('profile_picture_url') %>\">").css({
			height: "12px",
			width: "12px",
			position: "relative"
		});
		// debugger
		var commentTime = $(this).closest(".comment-form").prev(".widget").find("audio")[0].currentTime
		var commentImageUrl = SoundStorm.currentUser.profile_picture_url
		console.log(event);

		$(this).closest(".comment-form").prev(".widget").find("seeker-container")//.append(img)

	});
	// Turn on hover styling on comment form
	$("body").on("blur", "input[type='text']", function(event) {
		$(this).closest(".comment-form").css({
			"background-color": "#f6f4f2",
			"border": "1px solid silver"
		});
		$(this).closest(".comment-form").on("mouseover", function() { 
			$(this).css({
				"background-color": "#dcdcdc",
				"border": "1px solid silver"
			});
		});
		$(this).closest(".comment-form").on("mouseout", function() { 
			$(this).css({
				"background-color": "#f6f4f2",
				"border": "1px solid silver"
			});
		});
	});


});	