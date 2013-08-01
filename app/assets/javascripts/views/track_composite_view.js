SoundStorm.Views.TrackCompositeView = Backbone.View.extend({

	className: "track-composite-view",
	template: JST['composite'],

	events: {
		"submit form": "createComment"
	},

	createComment: function(event) {
		event.preventDefault();
		var that = this;

		var attrs = $(event.target).serializeJSON();

		SoundStorm.currentUser.comments.create(attrs, { 
			success: function(model, data) {
				$(event.target).find(".comment-field").val("")
				var comment = JST['tracks/comment']({ comment: model });
				that.model.get("comments").push(model.get("comment"));

				$(event.target).closest(".comment-form").prev(".widget").find(".comments").append(comment)
				
				setTimeout(function() { 
					$(".comment-hover.temp").removeClass("comment-hover").addClass("comment-image");
					$(".comment-popup.temp").addClass("hidden");
					$(".temp").removeClass("temp");
				}, 3000);
			}
		});
	},

	render: function() {
		this.$el.html(this.template());

		var trackView = new SoundStorm.Views.TrackView({ model: this.model });
		this.$el.append(trackView.render().$el);

		// var comments = new SoundStorm.Collections.Comments(this.model.get("comments"));
		var commentListView = new SoundStorm.Views.CommentListView({ model: this.model });
		this.$el.append(commentListView.render().$el);

		var likers = new SoundStorm.Collections.Users(this.model.get("likers"));
		var likeListView = new SoundStorm.Views.LikeListView({ collection: likers });
		this.$el.append(likeListView.render().$el);

		return this;
	},
});