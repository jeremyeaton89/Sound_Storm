SoundStorm.Views.FollowingIndexView = Backbone.View.extend({

	template: JST['followings/index'],

	render: function() {
		var content = this.template({ users: this.collection });
		this.$el.html(content);
		return this;
	}
});