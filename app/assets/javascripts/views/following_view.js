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
		var followeeId = $(event.target).attr("data-user-id");
		$.ajax({
			url: "/followings/1", // dummy id... :/  -- backbone relational en el futuro?? grab follower/followee off this model's association
			type: "DELETE",
			data: {
				follower_id: SoundStorm.currentUser.id,
				followee_id: followeeId
			},
			success: function() {
				unfollowedUser = SoundStorm.currentUser.followedUsers.get(followeeId);
				SoundStorm.currentUser.followedUsers.remove(unfollowedUser);
				that.collection.add(unfollowedUser);
			}
		});
	},

	render: function() {
		var content = this.template({ followedUsers: SoundStorm.currentUser.followedUsers });
		this.$el.html(content);
		return this;
	}
});