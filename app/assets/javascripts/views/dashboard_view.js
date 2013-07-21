SoundStorm.Views.DashboardView = Backbone.View.extend({

	template: JST['users/dashboard'],

	events: {
		"submit form": "createComment",
		"click button.like": "createLike",
		"click button.unlike": "removeLike",
	},

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
	},

	createComment: function(event) {
		event.preventDefault();

		var attrs = $(event.target).serializeJSON();
		SoundStorm.currentUser.comments.create(attrs, { 
			success: function(model, data) {
				$(event.target).find(".comment-field").val("")
				var comment = JST['tracks/comment']({ comment: model });
				
				$(event.target).closest(".comment-form").prev(".widget").find(".comments").append(comment)
				
				setTimeout(function() { 
					$(".comment-hover.temp").removeClass("comment-hover").addClass("comment-image");
					$(".comment-popup.temp").addClass("hidden");
					$(".temp").removeClass("temp");
				}, 3000);
			}
		});
	},

	createLike: function(event) {
		// SoundStorm.currentUser.likes.create({ ... }) => undefined is not a function. wtf

		$.ajax({
			url: "/likes",
			type: "post",
			data: { like: {
				track_id: $(event.target).closest("div.track").attr("data-track-id"), 
				user_id: SoundStorm.currentUser.id
			}},
			success: function(response) {
				SoundStorm.currentUser.likes.add(new SoundStorm.Models.Like(response));
				$(event.target).addClass("hidden");
				$(event.target).siblings("button.unlike").removeClass("hidden");
			}
		});
	},

	removeLike: function(event) {
		SoundStorm.currentUser.likes.findWhere({
			user_id: SoundStorm.currentUser.id,
			track_id: +($(event.target).closest("div.track").attr("data-track-id"))
		}).destroy({
			success: function(response) {
				$(event.target).addClass("hidden");
				$(event.target).siblings("button.like").removeClass("hidden");		
			}
		});
	},
});