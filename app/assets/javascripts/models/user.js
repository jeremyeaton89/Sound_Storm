SoundStorm.Models.User = Backbone.Model.extend({
	initialize: function() {
		this.tracks = new SoundStorm.Collections.Tracks();
		this.playSets = new SoundStorm.Collections.PlaySets();
		this.likes = new SoundStorm.Collections.Likes();
	},

	url: function() {
		if (this.id) {
			return "/users/" + this.id;
		} else {
			return "/users";
		}
	},

	parse: function(response) {
		var that = this;
		if (response && response.likes) { // ?
			_(response.likes).each(function(like) {
				that.likes.add(new SoundStorm.Models.Like(like));
			});
		}
		if (response && response.tracks) this.tracks.set(response.tracks);
		if (response && response.play_sets) this.playSets.set(response.play_sets);
		
		return response;
	}
});