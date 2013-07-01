SoundStorm.Views.ProfileCompositeView = Backbone.View.extend({

	id: "profile_composite_view",
	template: JST['users/profile_composite'],

	render: function() {
		this.$el.html(this.template());
	
		// render Profile
		
		var profileView = new SoundStorm.Views.ProfileView({
			model: this.model
		});
		this.$el.append(profileView.render().$el);
		// render User Activity Feed
		var tracks = SoundStorm.Collections.Tracks()
		tracks.fetch({
			success: function() {
				
			}
		})

		var userActivityFeedView = new SoundStorm.Views.UserActivityFeedView()

		// render Sidebar

		return this;
	}
});