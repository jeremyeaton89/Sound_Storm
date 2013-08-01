SoundStorm.Views.CommentListView = Backbone.View.extend({

	className: "comment-list-container",
	template: JST['tracks/comment_list'],

	initialize: function() {
		this.listenTo(SoundStorm.currentUser.comments, "add", this.render);
	},

	render: function() {
		var comments = new SoundStorm.Collections.Comments(this.model.get("comments"));
		var content = this.template({ comments: comments });
		this.$el.html(content);
		return this;
	},
});