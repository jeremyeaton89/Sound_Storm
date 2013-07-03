SoundStorm.Views.PlaySetEditView = Backbone.View.extend({

	template: JST['play_sets/edit'],

	events: {
		"click button.submit": "submit"
	},

	render: function() {
		var content = this.template({ playSet: this.model });
		this.$el.html(content);
		return this;
	},

	submit: function(event) {
		var that = this;
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		this.model.save(attrs, {
			success: function() {
				Backbone.history.navigate("#/profile", { trigger: true });
			}
		});
		
	}
});