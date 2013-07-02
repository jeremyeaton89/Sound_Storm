SoundStorm.Routers.Router = Backbone.Router.extend({
	initialize: function($rootEl, user) {
		this.$rootEl = $rootEl;
		this.user = user;
	},

	routes: {
		"": "index",
		"upload": "showUpload",
		"profile": "showProfileComposite",
		"profile/edit": "editProfile",
	},

	index: function() {
		var dashboardView = new SoundStorm.Views.DashboardView();
		this.$rootEl.html(dashboardView.render().$el);
	},

	showUpload: function() {
		var uploadView = new SoundStorm.Views.UploadView();
		this.$rootEl.html(uploadView.render().$el);
	},

	showProfileComposite: function() {
		// debugger
		var profileCompositeView = new SoundStorm.Views.ProfileCompositeView({
			model: this.user
		});
		this.$rootEl.html(profileCompositeView.render().$el);
	},

	editProfile: function() {
		var profileEditView = new SoundStorm.Views.ProfileEditView({ model: this.user });
		this.$rootEl.html(profileEditView.render().$el);
	}
});
