SoundStorm.Routers.Router = Backbone.Router.extend({
	initialize: function($rootEl, user) {
		this.$rootEl = $rootEl;
		this.user = user;
	},

	routes: {
		"": "index",
		"upload": "upload",
		"profile": "profileComposite",
		"profile/edit": "editProfile",
		"tracks/:id/edit": "editTrack",
		"tracks/:id": "showTrack",
		"play_sets/:id/edit": "editPlaySet",
		"play_sets/:id": "showPlaySet"
	},

	index: function() {
		var dashboardView = new SoundStorm.Views.DashboardView();
		this.$rootEl.html(dashboardView.render().$el);
	},

	upload: function() {
		var uploadView = new SoundStorm.Views.UploadView();
		this.$rootEl.html(uploadView.render().$el);
	},

	profileComposite: function() {
		var that = this;
		this.user.fetch({
			success: function(model, response) {
			var profileCompositeView = new SoundStorm.Views.ProfileCompositeView({
				model: model
			});
			that.$rootEl.html(profileCompositeView.render().$el);
			}
		});
	},

	editProfile: function() {
		var profileEditView = new SoundStorm.Views.ProfileEditView({ model: this.user });
		this.$rootEl.html(profileEditView.render().$el);
	},

	editTrack: function(id) {
		var trackEditView = new SoundStorm.Views.TrackEditView({ 
			model: SoundStorm.currentUser.tracks.get(id)
		});
		this.$rootEl.html(trackEditView.render().$el);
	},

	editPlaySet: function(id) {
		var playSetEditVew = new SoundStorm.Views.PlaySetEditView({
			model: SoundStorm.currentUser.playSets.get(id)
		});
		this.$rootEl.html(playSetEditVew.render().$el);
	}
});
