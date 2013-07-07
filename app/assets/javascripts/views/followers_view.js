SoundStorm.Views.FollowersView = Backbone.View.extend({

	id: "following_view",
	template: JST['followings/followers'],

	initialize: function() {
		this.listenTo(SoundStorm.currentUser.followers, "add", this.render);
		this.listenTo(SoundStorm.currentUser.followers, "remove", this.render);
	},

	render: function() {
		var content = this.template({ followers: SoundStorm.currentUser.followers });
		this.$el.html(content);
		return this;
	}
});