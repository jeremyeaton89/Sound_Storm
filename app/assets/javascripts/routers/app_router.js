SoundStorm.Routers.Router = Backbone.Router.extend({
	initialize: function($rootEl) {
		this.$rootEl = $rootEl;
	},

	routes: {
		"": "index",
		"profile": "showProfile",
		"profile/edit": "editProfile",
	},

	index: function() {

		var dashboardView = new SoundStorm.Views.DashboardView();
		this.$rootEl.html(dashboardView.render().$el);
	},

	showProfile: function() {
		console.log("In showProfile")
		var that = this;
		var user = new SoundStorm.Models.User();

		user.fetch({
			success: function() {
				var profileView = new SoundStorm.Views.ProfileView(user);
				that.$rootEl.html(profileView.render().$el);
			}
		});
	},

	editProfile: function() {

	}
});
