$(function() {
	
	$("html").on("click", ".play-area", function() {
		// debugger
		$(this).closest(".widget").toggleClass("playing");

		if ($(this).closest(".widget").hasClass("playing")) {
			$(this).find("audio")[0].play();
			$("audio").not($(this).find("audio"))[0].pause()
			$(".sound").not(this).removeClass("playing");
		} else {
			$(this).find("audio")[0].pause();
		}
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
	});


});	