$(function() {
	$(".cover_login").on("click", function() {
		$("input").val("");
		$(".modal").removeClass("hidden");
		$(".signup").addClass("hidden");
		$(".login").removeClass("hidden");
	});

	$(".cover_signup").on("click", function() {
		$("input").val("");
		$(".modal").removeClass("hidden");
		$(".login").addClass("hidden");
		$(".signup").removeClass("hidden");
	})
})