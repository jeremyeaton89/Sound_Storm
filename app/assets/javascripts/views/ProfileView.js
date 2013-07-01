SoundStorm.Views.ProfileView = Backbone.View.extend({

	id: "profileView",
	tagName: "section",
	className: "left-sidebar",
	template: JST['users/profile'],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	}
});