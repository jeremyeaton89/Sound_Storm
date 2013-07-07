SoundStorm.Views.FollowingView = Backbone.View.extend({

	id: "following_view",
	template: JST['followings/following'],

	initialize: function() {
		this.listenTo(SoundStorm.currentUser.followedUsers, "add", this.render);
		this.listenTo(SoundStorm.currentUser.followedUsers, "remove", this.render);
	},

	events: {
		"click button.unfollow": "unfollowUser",
	},

	unfollowUser: function(event) {
		var that = this;
		var followedUserId = $(event.target).attr("data-user-id");
		$.ajax({
			url: "/followings/1", // dummy id... :/  -- backbone relational en el futuro?? grab follower/followee off this model's association
			type: "DELETE",
			data: {
				follower_id: SoundStorm.currentUser.id,
				followed_user_id: followedUserId
			},
			success: function() {
				if (SoundStorm.currentUser.followers.get(followedUserId)) {
					var follower = SoundStorm.currentUser.followers.get(followedUserId)
					SoundStorm.currentUser.followedUsers.remove(follower);
					SoundStorm.currentUser.followers.trigger("add");
				} else {
					unfollowedUser = SoundStorm.currentUser.followedUsers.get(followedUserId);
					SoundStorm.currentUser.followedUsers.remove(unfollowedUser);
					that.collection.add(unfollowedUser);
				}
			}
		});
	},

	render: function() {
		var content = this.template({ followedUsers: SoundStorm.currentUser.followedUsers });
		this.$el.html(content);
		return this;
	}
});