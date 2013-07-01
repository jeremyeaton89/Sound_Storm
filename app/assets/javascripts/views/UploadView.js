SoundStorm.Views.UploadView = Backbone.View.extend({

	initialize: function() {
		this.model = user;
		this.id = "upload_modal";
		className: "modal"
	},

	events: {
		"click button.submit": "createTrack",
	},

	template: JST['users/upload'],

	render: function() {
		var that = this;
		var content = this.template({ user: that.model });
		this.$el.html(content);
		return this;
	},

	
});