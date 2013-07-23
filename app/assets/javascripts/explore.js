$(function() {
// Explore page pause play handling
	$("body").on("click", ".play-button-thumbnail.play", function(event) {
		$(".play-button-thumbnail").removeClass("pause").addClass("play")
		$("audio").each(function(i, audio) { audio.pause() });
		$(this).removeClass("play").addClass("pause").closest(".thumbnail").find("audio")[0].play();
	});
	$("body").on("click", ".play-button-thumbnail.pause", function(event) {
		$(this).closest(".thumbnail").find("audio")[0].pause();
		$(this).removeClass("pause").addClass("play");
	});

	// enable carousel buttons on load if needed
	$(".carousel").each(function(i, carousel) {
		if ($(carousel).find("li").length < 5) 
			$(carousel).find(".right").removeClass("active").addClass("disabled");
	})

	$("body").on("click", ".right.active", function(event) {
		var that = this;
		var $firstVisibleLi = $(this).closest(".carousel").find("li").not(".hidden").first();
		$firstVisibleLi.animate({ "opacity": 0 }, 400, function() {
			$(this).addClass("hidden");
			$liToAnimate = $($(that).closest(".carousel").find("li").not(".hidden")[3]);
			$liToAnimate.css("opacity", 0).animate({ "opacity": 1}, 800);
			if ($(that).closest(".carousel").find("li").not(".hidden").length <= 4) 
				$(that).removeClass("active").addClass("disabled")
			if ($(that).closest(".carousel").find("li:first").hasClass("hidden")) 
				$(that).closest(".carousel").find(".left").removeClass("disabled").addClass("active");
		});
	});

	$("body").on("click", ".left.active", function(event) {
		var $carousel = $(this).closest(".carousel");

		$($carousel.find("li").not(".hidden")[3]).animate({ "opacity": 0 }, 400, function(){
			$carousel.find("li.hidden").last()
				.css("opacity", 0).removeClass("hidden").animate({ "opacity": 1}, 800);
			$(this).css("opacity", 1);
			$carousel.find(".right").removeClass("disabled").addClass("active");
			if ($carousel.find("li.hidden").length == 0) {
				$carousel.find(".left").removeClass("active").addClass("disabled");

			}
		});
	});
});