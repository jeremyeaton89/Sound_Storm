SoundStorm.Collections.Comments = Backbone.Collection.extend({
	model: SoundStorm.Models.Comment,
	url: "/comments",
	comparator: function(comment) {
		return comment.get("track_time");
	}
});