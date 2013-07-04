SoundStorm.Views.ProfileEditView = Backbone.View.extend({

	events: {
		"click button#profile_save": "submit"
	},

	template: JST['users/profileEdit'],

	render: function() {
		var content = this.template({ user: this.model });
		this.$el.html(content);
		return this;
	},

	submit: function(event) {
		var that = this;
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		// debugger
		this.model.set(attrs);
		this.model.save({}, {
			success: function() {
				Backbone.history.navigate("#/profile", { trigger: true });
			},
			error: function(model, response) {
				console.log(JSON.parse(response.responseText)["errors"]["city"][0]);
			}
		});
		
	}
});