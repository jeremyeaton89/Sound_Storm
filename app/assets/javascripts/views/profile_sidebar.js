SoundStorm.Views.ProfileSidebar = Backbone.View.extend({

	id: "profile_sidebar",
	tagName: "section",
	className: "right-column",
	template: JST['users/profile_sidebar'],

	initialize: function() {
		this.listenTo(SoundStorm.currentUser.likes, "add", this.render);
		this.listenTo(SoundStorm.currentUser.likes, "remove", this.render);
		this.listenTo(SoundStorm.currentUser.playSets, "add", this.render);
		this.listenTo(SoundStorm.currentUser.playSets, "remove", this.render);
		this.listenTo(SoundStorm.currentUser.comments, "add", this.render);
	},

	render: function() {
		var content = this.template({ userAssets: this.userAssets });
		this.$el.html(content);
		return this;
	}
});
