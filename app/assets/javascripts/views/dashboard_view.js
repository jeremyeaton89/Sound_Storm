SoundStorm.Views.DashboardView = Backbone.View.extend({

	template: JST['users/dashboard'],

	render: function() {
		var content = this.template(); // ({ tracks: tracks });
		this.$el.html(content);

		// dashboard feed
		var that = this;
		$.ajax({
			url: "/followings",
			type: "GET",
			success: function(response) {

				var allUsers = new SoundStorm.Collections.Users(response);
				allUsers.remove(SoundStorm.currentUser.id);
				var users = allUsers.filter(function(user) {
					return (SoundStorm.currentUser.followedUsers.pluck("username").indexOf(user.get("username")) == -1) &&
					(SoundStorm.currentUser.followers.pluck("username").indexOf(user.get("username")) == -1);
				});
				var users = new SoundStorm.Collections.Users(users);
				var dashboardFollowView = new SoundStorm.Views.DashboardFollowView({
					collection: users
				});
				that.$el.append(dashboardFollowView.render().$el);
			}
		})

		return this;
	}
});