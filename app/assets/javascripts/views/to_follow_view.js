SoundStorm.Views.ToFollowView = Backbone.View.extend({

	id: "to_follow_view",
	template: JST['followings/to_follow'],

	events: {
		"click button.follow": "followUser",
	},

	initialize: function() {
		this.collection.remove(SoundStorm.currentUser.id);
		this.listenTo(this.collection, "add", this.render);
	},

	followUser: function(event) {
		var that = this;
		$.ajax({
			url: "/followings",
			type: "post",
			data: { following: {
				follower_id: SoundStorm.currentUser.id,
				followed_user_id: $(event.target).attr("data-user-id") 
			}},
			success: function(response) {
				$(event.target).closest("li").remove();
				newFollowedUser = that.collection.get(response.followed_user_id);
				that.collection.remove(newFollowedUser);
				SoundStorm.currentUser.followedUsers.add(newFollowedUser);
			}
		})
	},

	render: function() {
		var content = this.template({ users: this.collection });
		this.$el.html(content);
		return this;
	}
});