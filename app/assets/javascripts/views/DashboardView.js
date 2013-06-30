SoundStorm.Views.DashboardView = Backbone.View.extend({

	template: JST['users/dashboard'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
});