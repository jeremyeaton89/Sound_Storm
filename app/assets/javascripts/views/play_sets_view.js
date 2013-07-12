SoundStorm.Views.PlaySetsView = Backbone.View.extend({

	template: JST['play_sets/index'],

	render: function() {
		var content = this.template();
		this.$el.html(content);
		return this;
	},
});