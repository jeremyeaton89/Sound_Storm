SoundStorm.Views.DashboardView = Backbone.View.extend({

	template: JST['users/dashboard'],

	render: function() {
		// var tracks = [];
		// SoundStorm.currentUser.followedUsers.each(function(user) {
		// 	user.get("tracks").forEach(function(track) {
		// 		tracks.push(track);
		// 	});
		// });
debugger

		var content = this.template(); // ({ tracks: tracks });
		this.$el.html(content);
		return this;
	}
});