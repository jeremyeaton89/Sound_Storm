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
		"profile/:id": "showProfile",
		"tracks/:id/edit": "editTrack",
		"tracks/:id": "showTrack",
		"tracks": "showTracks",
		"play_sets/:id/edit": "editPlaySet",
		"play_sets/:id": "showPlaySet",
		"play_sets": "showPlaySets",
		"likes": "showLikes",
		"followings": "followingsIndex",
		"comments": "showComments",
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

	showProfile: function(id) {
		var that = this;
		$.ajax({
			url: "/users/" + id,
			type: "GET",
			success: function(model, response) {
				var user = new SoundStorm.Models.User(model)
				var profileShowView = new SoundStorm.Views.ProfileShowView({
					model: user
				})
				that.$rootEl.html(profileShowView.render().$el);
			}

		})
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
	},

	followingsIndex: function() {
		var that = this;
		$.ajax({
			url: "/followings",
			type: "GET",
			success: function(response) {
				var followingsCompositeView = new SoundStorm.Views.FollowingsCompositeView({
					collection: new SoundStorm.Collections.Followings(response)
				});
				that.$rootEl.html(followingsCompositeView.render().$el);
			}
		})
	},

	showTrack: function(id) {
		var that = this;
		$.ajax({
			url: "/tracks/" + id,
			type: "GET",
			success: function(response) {
				var track = new SoundStorm.Models.Track(response);
				var trackCompositeView = new SoundStorm.Views.TrackCompositeView({ model: track });
				that.$rootEl.html(trackCompositeView.render().$el);
			}
		})
	},

	showComments: function() {
		var commentsView = new SoundStorm.Views.CommentsView();
		this.$rootEl.html(commentsView.render().$el);
	},

	showPlaySet: function(id) {
		var playSetView = new SoundStorm.Views.PlaySetView({ 
			model: SoundStorm.currentUser.playSets.get(id) 
		});
		this.$rootEl.html(playSetView.render().$el);
	},

	showPlaySets: function() {
		var playSetsView = new SoundStorm.Views.PlaySetsView();
		this.$rootEl.html(playSetsView.render().$el);
	},

	showLikes: function() {
		var likesView = new SoundStorm.Views.LikesView();
		this.$rootEl.html(likesView.render().$el);
	}
});
