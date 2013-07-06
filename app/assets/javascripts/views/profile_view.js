SoundStorm.Views.ProfileView = Backbone.View.extend({

	id: "profile_view",
	tagName: "section",
	className: "left-column",
	template: JST['users/profile'],

	initialize: function() {
		_.bindAll(this, "render");
		this.model.on("change", this.render);
		// this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	}
});