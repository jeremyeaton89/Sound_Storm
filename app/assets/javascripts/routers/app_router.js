SoundStorm.Routers.app_router = Backbone.Router.extend({
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
	}
});
