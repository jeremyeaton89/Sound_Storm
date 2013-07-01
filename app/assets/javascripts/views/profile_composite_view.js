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

		// render Sidebar

		return this;
	}
});