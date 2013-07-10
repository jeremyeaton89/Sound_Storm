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

		var comment = $(that).closest(".widget").find('img[data-track-time="' + Math.floor($thisAudio[0].currentTime) + '"]')
			if (comment.length > 0) {
				comment.each(function(i, img) {
					$(img).trigger("mouseover");
					setTimeout(function() { $(img).trigger("mouseout") }, 3000);
				});
			}
		}, 1000);
	});
	
	// Comment Field & Track buttons slide down on first click
	$("body").on("click", ".play-button, .seeker-container", function() {
		if ($(this).closest(".widget").hasClass("track virgin")) {
			$(this).closest(".widget").removeClass("virgin").find(".buttons-and-stats").animate({
				"top": "120px"
			}, 400);
			$(this).closest(".widget").next(".comment-form").removeClass("hidden").animate({
				"opacity": 1,
				"margin-top": "60",
				"top": "-30px"
			}, 600);

			// Place Comment image
			var src = $(this).closest(".widget").next(".comment-form").find("img").attr("src");
			var img = $('<img class="tiny-image hidden" src="' + src + '"">') //.css("left", offset + "px");
			$(this).closest(".widget").find(".seeker-container").append(img);
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

				var comment = $(that).closest(".widget").find('img[data-track-time="' + Math.floor($thisAudio[0].currentTime) + '"]')
				if (comment.length > 0) {
					comment.each(function(i, img) {
						$(img).trigger("mouseover");
						setTimeout(function() { $(img).trigger("mouseout") }, 3000);
					});
				}
			}, 1000);

		} else {
			$(this).addClass("play").removeClass("pause");
			$thisAudio[0].pause();
			interval = window.clearInterval(interval);
		}

	});

	// Comment Form 
	$("body").on("focus", "input.comment-field", function(event) {
		event.preventDefault();
		
		var $formDiv = $(this).closest(".comment-form")
		var offset = $formDiv.prev(".widget").find(".seeker").width();
		var commentTime = $formDiv.prev(".widget").find("audio")[0].currentTime;
		
		$formDiv.prev(".widget").find(".tiny-image")
			.removeClass("hidden").css("left", (offset - 370) + "px");
		$formDiv.off("mouseover mouseout");
		$formDiv.css({
			"background-color": "#666666",
			"border": "1px solid black"
		});
		
		// plug form with data
		
		$(this).siblings("input[name='comment[track_id]']")
			.val($formDiv.prev(".widget").attr("data-track-id"));
		$(this).siblings("input[name='comment[offset]']").val(offset);
		$(this).siblings("input[name='comment[track_time]']").val(Math.floor(commentTime));

	});

	//Comment hover
	$("body").on("mouseover mouseout", ".comments img", function(event) {
		$(this).prev("span").toggleClass("hidden");
		$(this).toggleClass("comment-image").toggleClass("comment-hover");
	})

	// Turn on hover styling on comment form
	$("body").on("blur", "input[type='text']", function(event) {

		$(this).closest(".comment-form").prev(".widget").find(".tiny-image").addClass("hidden")
		$(this).closest(".comment-form").css({
			"background-color": "#f6f4f2",
			"border": "1px solid silver"
		});
		$(this).closest(".comment-form").on("mouseover", function() { 
			$(this).css("background-color", "#dcdcdc");
		});
		$(this).closest(".comment-form").on("mouseout", function() { 
			$(this).css("background-color", "#f6f4f2");
		});
	});
});	