SoundStorm.Views.UserActivityFeedView = Backbone.View.extend({

	id: "user_activity_feed_view",
	tagName: "section",
	className: "middle-column",
	template: JST['users/user_activity_feed'],

	initialize: function(userAssets) {
		this.userAssets = userAssets;
	},

	events: {
		"click button.add-to-set": "popSetForm",
		"click button.cancel": "removePopup",
		"click input[type='submit']": "createSet",
		"click .track button.remove": "removeTrack",
		"click .play-set button.remove": "removePlaySet",
	},

	popSetForm: function(event) {
		$(event.target).addClass("hidden");
		$(event.target).parent(".track").after(JST['popups/add_to_set']());		
	},

	removePopup: function(event) {
		$(event.target).parent(".popup").siblings(".track").find("button.add-to-set").removeClass("hidden");
		$(event.target).parent(".popup").remove();
	},

	createSet: function(event) {
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		SoundStorm.currentUser.playSets.create(attrs);
		console.log(SoundStorm.currentUser);
	},

	removeTrack: function(event) {
		var that = this;
		var trackId = $(event.target).parent(".track").attr("data-id");
		SoundStorm.currentUser.tracks.get(trackId).destroy({ 
			success: function(model, response) {
				console.log(model.get('name') + " deletion success!");
				$(event.target).parent(".track").remove();
			}
		});
	},

	removePlaySet: function(event) {

	},

	render: function() {
		// debugger
		var content = this.template({ userAssets: this.userAssets });

		this.$el.html(content);
		return this;
	}
});