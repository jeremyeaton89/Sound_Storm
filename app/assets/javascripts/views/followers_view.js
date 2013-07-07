SoundStorm.Views.FollowersView = Backbone.View.extend({

	id: "following_view",
	template: JST['followings/followers'],

	initialize: function() {
		this.listenTo(SoundStorm.currentUser.followers, "add", this.render);
		this.listenTo(SoundStorm.currentUser.followers, "remove", this.render);
	},

	events: {
		"click button.follow": "followUserBack",
	},

	followUserBack: function(event) {
		var that = this;
		var follower_id = $(event.target).attr("data-user-id"); 
		$.ajax({
			url: "/followings",
			type: "post",
			data: { following: {
				follower_id: SoundStorm.currentUser.id,
				followed_user_id: follower_id 
			}},
			success: function() {
				// debugger
				$(event.target).html("Following").attr("disabled", "true");
				newFollowedUser = SoundStorm.currentUser.followers.get(follower_id)
				SoundStorm.currentUser.followedUsers.add(newFollowedUser);
			}
		})
	},

	render: function() {
		var content = this.template({ followers: SoundStorm.currentUser.followers });
		this.$el.html(content);
		return this;
	}
});