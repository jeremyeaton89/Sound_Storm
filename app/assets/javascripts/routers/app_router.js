SoundStorm.Routers.Router = Backbone.Router.extend({
	initialize: function($rootEl) {
		this.$rootEl = $rootEl;
		this.collection = new SoundStorm.Collections.Tracks(); // includes Tracks.currentUserTracks();
		// this.children = []; or _([])

	},

	routes: {
		"": "index",
		"profile": "showProfileComposite",
		"profile/edit": "editProfile",
	},

	index: function() {

		var dashboardView = new SoundStorm.Views.DashboardView();
		this.$rootEl.html(dashboardView.render().$el);
	},

	showProfileComposite: function() {
		var that = this;
		var user = new SoundStorm.Models.User();

		user.fetch({
			success: function() {
				var profileCompositeView = new SoundStorm.Views.ProfileCompositeView({
					model: user
				});
				that.$rootEl.html(profileCompositeView.render().$el);
				// that.currentView = 
			}
		});
		
	},

	showProfile: function() {
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
		var that = this;
		var user = new SoundStorm.Models.User();

		user.fetch({
			success: function() {
				var profileEditView = new SoundStorm.Views.ProfileEditView({ model: user });
				that.$rootEl.html(profileEditView.render().$el);
			}
		});
	}
});
