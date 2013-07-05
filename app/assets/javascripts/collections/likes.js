SoundStorm.Collections.Likes = Backbone.Collection.extend({
	model: SoundStorm.Models.Likes,
	url: "/likes",
	
	hasTrack: function(trackId) {
		var hasIt = false;

		this.each(function(like) {
			if (like.get("track_id") == trackId) 
				hasIt = true;
		});
		return hasIt;
	}
});
