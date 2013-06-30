SoundStorm.Views.ProfileView = Backbone.View.extend({

	initialize: function(profile) {
		this.model = user;
	},

	template: JST['users/profile'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});