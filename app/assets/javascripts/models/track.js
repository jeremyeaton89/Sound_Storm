SoundStorm.Models.Track = Backbone.Model.extend({

	initialize: function() {
		this.comments = new SoundStorm.Collections.Comments();
	},

});
