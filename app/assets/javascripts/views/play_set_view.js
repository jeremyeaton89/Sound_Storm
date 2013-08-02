SoundStorm.Views.PlaySetView = Backbone.View.extend({

	className: "playSetView",
	template: JST['play_sets/show'],

	events: {
		"click button.remove": "removeTrack"
	},

	render: function() {
		var content = this.template({ playSet: this.model });
		this.$el.html(content);
		return this;
	},

	removeTrack: function(event) {
		var trackId = $(event.target).attr("data-id");
		debugger
		var that = this;
		$.ajax({
			url: "play_settings/1.json", //hackey?
			type: "DELETE",
			data: { 
				track_id: trackId,
				play_set_id: this.model.id
			},
			success: function(response) {
				that.model.get("tracks").forEach(function(track) {
					if (track.id == trackId) {
						var i = that.model.get("tracks").indexOf(track);
						that.model.get("tracks").splice(i, 1);
					}
				})
				that.render();
			}
		});	
		// var track = SoundStorm.
		// this.model.tracks.remove(trackId)
	}	
});