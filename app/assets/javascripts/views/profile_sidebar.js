SoundStorm.Views.ProfileSidebar = Backbone.View.extend({

	id: "profile_sidebar",
	tagName: "section",
	className: "right-column",
	template: JST['users/profile_sidebar'],

	render: function() {
		var content = this.template({ userAssets: this.userAssets });

		this.$el.html(content);
		return this;
	}
});

	$("button.add-to-set").on("click", function(event) {
		var track = $(this).parent(".track");
	});