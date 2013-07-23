$(function() {

	// Volume Control
	$(".volume").on("mouseover", function(event) {
		$(".volume").css("width", "100px");
		$(".volume-control").removeClass("hidden");
	});

	$(".volume-control").on("click", function(event) {
		$(".volume-dial").width(event.offsetX);
		$("audio").each(function(i, audio) {
			console.log(audio);
			audio.volume = event.offsetX / 125;
		});
	});

	$(".volume").on("mouseout", function(event) {
		$(".volume").css("width", "10px");
		$(".volume-control").addClass("hidden");
	});
});