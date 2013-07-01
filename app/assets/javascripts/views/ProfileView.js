SoundStorm.Views.ProfileView = Backbone.View.extend({

	id: "profile_view",
	tagName: "section",
	className: "left-column",
	template: JST['users/profile'],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	}
});