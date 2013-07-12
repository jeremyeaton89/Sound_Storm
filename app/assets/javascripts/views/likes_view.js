SoundStorm.Views.LikesView = Backbone.View.extend({

	template: JST['users/likes'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
});