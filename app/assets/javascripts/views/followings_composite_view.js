SoundStorm.Views.FollowingsCompositeView = Backbone.View.extend({

	id: "followings_composite_view",
	template: JST['followings/followings_composite'],

	render: function() {
		this.$el.html(this.template());

		// render to_follow view
		var users = this.collection.filter(function(user) {
			return (SoundStorm.currentUser.followedUsers.pluck("username").indexOf(user.get("username")) == -1) &&
			(SoundStorm.currentUser.followers.pluck("username").indexOf(user.get("username")) == -1);
		});

		var toFollowView = new SoundStorm.Views.ToFollowView({
			collection: new SoundStorm.Collections.Users(users)
		});
		this.$el.append(toFollowView.render().$el);

		// render following view
		var followingView = new SoundStorm.Views.FollowingView({
			collection: toFollowView.collection
		});
		this.$el.append(followingView.render().$el);

		// render followers view
		var followersView = new SoundStorm.Views.FollowersView({
			collection: toFollowView.collection
		});
		this.$el.append(followersView.render().$el);

		return this;
	}
});