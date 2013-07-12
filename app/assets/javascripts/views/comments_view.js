SoundStorm.Views.CommentsView = Backbone.View.extend({

	template: JST['users/comments'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
});