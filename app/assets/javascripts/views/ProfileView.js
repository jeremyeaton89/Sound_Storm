SoundStorm.Views.ProfileView = Backbone.View.extend({

	initialize: function(user) {
		console.log(user);
		this.model = user;
	},

	template: JST['users/profile'],

	render: function() {
		var that = this;
								console.log(this.model)

		var content = this.template({ user: that.model });
		this.$el.html(content);
		return this;
	}
});