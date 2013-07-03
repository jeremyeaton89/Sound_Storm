SoundStorm.Views.TrackEditView = Backbone.View.extend({

	template: JST['tracks/edit'],

	events: {
		"click input[type='submit']": "submit"
	},

	render: function() {
		var content = this.template({ track: this.model });
		this.$el.html(content);
		return this;
	},

	submit: function(event) {
		var that = this;
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		// this.model.set(attrs);
		this.model.save(attrs, {
			success: function() {
				Backbone.history.navigate("#/profile", { trigger: true });
			},
			error: function(model, response) {
				console.log(JSON.parse(response.responseText)["errors"]["city"][0]);
			}
		});
		
	}
});