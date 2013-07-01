SoundStorm.Models.User = Backbone.Model.extend({
	initialize: function() {
		this.tracks = new SoundStorm.Collections.Tracks();
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
		
		_(response.tracks).each(function(trackAttrs) {
			that.tracks.add(new SoundStorm.Models.Track(trackAttrs));
		});
	}
});