SoundStorm.Views.UserActivityFeedView = Backbone.View.extend({

	id: "user_activity_feed_view",
	tagName: "section",
	className: "middle_column",
	template: JST['users/user_activity_feed'],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	}
});