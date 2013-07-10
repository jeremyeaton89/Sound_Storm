SoundStorm.Models.Track = Backbone.Model.extend({

	initialize: function() {
		this.comments = new SoundStorm.Collections.Comments();
	},

	parse: function(response) {
		debugger
		// parse comments
		return response;
	},


});
