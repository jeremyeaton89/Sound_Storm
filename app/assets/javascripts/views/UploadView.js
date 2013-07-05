SoundStorm.Views.UploadView = Backbone.View.extend({

	initialize: function() {
		this.model = SoundStorm.currentUser;
		className: "upload"
	},

	events: {
		"click button.submit": "createTrack",
	},

	template: JST['upload'],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	},

	createTrack: function(event) {
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		SoundStorm.currentUser.tracks.create(attrs, {
			success: function() {
				Backbone.history.navigate("#/profile", { trigger: true });		
			}
		});
	}

	
});