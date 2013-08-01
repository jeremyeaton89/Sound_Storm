SoundStorm.Views.LikeListView = Backbone.View.extend({

	className: "like-list-container",
	template: JST['tracks/like_list'],


	render: function() {
		var content = this.template({ likers: this.collection });
		this.$el.html(content);
		return this;
	},
});