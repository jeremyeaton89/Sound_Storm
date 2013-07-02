SoundStorm.Models.PlaySet = Backbone.Model.extend({
	initialize: function() {
		this.tracks = new SoundStorm.Collections.Tracks();
	},
	url: "/play_sets",
	// toJSON: function() {
	// 	return this.model.toJSON();
	// }
	// url: "/play_sets",

	parse: function(response) {
		this.tracks.set(response.tracks);
		return response;
	}
});