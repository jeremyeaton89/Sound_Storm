SoundStorm.Views.TrackCompositeView = Backbone.View.extend({

	className: "track-composite-view",
	template: JST['tracks/show'],

	events: {
		
	},

	render: function() {
		var content = this.template({ track: this.model });
		this.$el.html(content);
		return this;
	},
});