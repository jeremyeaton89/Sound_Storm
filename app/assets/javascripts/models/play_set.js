SoundStorm.Models.PlaySet = Backbone.Model.extend({
	initialize: function() {
		this.tracks = new SoundStorm.Collections.Tracks();
	},

	parse: function(response) {
		this.tracks.set(response.tracks);
		return response;
	}
});