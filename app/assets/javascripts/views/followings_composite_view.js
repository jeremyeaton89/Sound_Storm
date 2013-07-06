SoundStorm.Views.FollowingsCompositeView = Backbone.View.extend({

	id: "profile_composite_view",
	template: JST['users/profile_composite'],

	initialize: function() {
		// this.listenTo()
	},
	render: function() {
		this.$el.html(this.template());
	
		// render Profile
		var profileView = new SoundStorm.Views.ProfileView({
			model: this.model
		});
		this.$el.append(profileView.render().$el);
		
		// render User Activity Feed [tracks, sets, reposts]
		var userAssets = [];

		_([this.model.tracks, this.model.playSets]).each(function(collection) {
			collection.each(function(model) {
				userAssets.push(model);
			});
		});
		userAssets.sort(function(prevAsset, currAsset) {
			return prevAsset.get("created_at") < currAsset.get("created_at"); 
		});
		var userActivityFeedView = new SoundStorm.Views.UserActivityFeedView(userAssets);

		this.$el.append(userActivityFeedView.render().$el);
		// render Sidebar
		var profileSidebarView = new SoundStorm.Views.ProfileSidebar();
		this.$el.append(profileSidebarView.render().$el);

		return this;
	}
});