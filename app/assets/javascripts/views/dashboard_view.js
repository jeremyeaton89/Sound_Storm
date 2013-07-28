SoundStorm.Views.DashboardView = Backbone.View.extend({

	template: JST['users/dashboard'],

	events: {
		"submit form": "createComment",
		"click button.like": "createLike",
		"click button.unlike": "removeLike",
		"click button.add-to-set": "popSetForm",
		"click button.close": "removePopup",
		"click button.submit": "createPlaySet",
		"click .track button.remove": "removeTrack",
		"click button.remove-play-set": "removePlaySet",
		"click button.add-song-to-play-set": "addSong",
		"click button.remove-song-from-play-set": "removeSong",
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

	popSetForm: function(event) {
		//remove outstanding set popups
		$(".add-to-set-popup").remove();
		$(".add-to-set").removeAttr("disabled");

		$(event.target).attr("disabled", "true"); 
		$(event.target).closest(".buttons-and-stats").after(JST['popups/add_to_set']({
			trackId: $(event.target).attr("data-track-id")
		}));		
	},

	removePopup: function(event) {
		$(event.target).closest(".track").find("button.add-to-set").removeAttr("disabled"); 
		$(event.target).closest(".popup").remove();
	},

	createPlaySet: function(event) {
		event.preventDefault();
		var attrs = $(event.target.form).serializeJSON();
		SoundStorm.currentUser.playSets.create(attrs, {
			success: function(model, response) {
				var $popup = $(event.target).closest("div.popup");
				$popup.find("ul").append(JST['snippets/set']({ set: model}));
				$popup.find("input[type='text']").val("");
			}
		});
		
	},

	removeTrack: function(event) {
		var trackId = $(event.target).closest(".track").attr("data-track-id");

		SoundStorm.currentUser.tracks.get(trackId).destroy({ 
			success: function(model, response) {
				// $(event.target).closest(".track").next("")
				$(event.target).closest(".track").remove();
				if (SoundStorm.currentUser.likes.hasTrack(trackId)) {
					var like = SoundStorm.currentUser.likes.findWhere({
					user_id: SoundStorm.currentUser.id,
					track_id: +trackId
					});
					SoundStorm.currentUser.likes.remove(like);
				}
			}
		});
	},

	removePlaySet: function(event) {
		var playSetId = $(event.target).closest(".play-set").attr("data-play-set-id");
		SoundStorm.currentUser.playSets.get(playSetId).destroy({ 
			success: function(model, response) {
				console.log(model.get('name') + " deletion success!");
				$(event.target).closest(".play-set").remove();
			}
		});
	},
	// add track to set
	addSong: function(event) {
		debugger
		$(event.target).addClass("hidden");
		$(event.target).siblings("button").removeClass("hidden");
		var track = SoundStorm.currentUser.tracks.get($(event.target).closest(".widget").attr("data-track-id"));
		var playSet = SoundStorm.currentUser.playSets.get($(event.target).attr("data-play-set-id"));
		$.ajax({
			url: "play_settings.json",
			type: "POST",
			data: { play_setting: { 
				track_id: track.id,
				play_set_id: playSet.id
			}},
			success: function(response) {
				debugger
				playSet.tracks.add(track);
			}
		});	
	},

	
	// remove track from set
	removeSong: function(event) {
		$(event.target).addClass("hidden");
		$(event.target).siblings("button").removeClass("hidden");
		var track = SoundStorm.currentUser.tracks.get($(event.target).closest(".widget").attr("data-track-id"));
		var playSet = SoundStorm.currentUser.playSets.get($(event.target).attr("data-play-set-id"));

		$.ajax({
			url: "play_settings/1.json", //hackey?
			type: "DELETE",
			data: { 
				track_id: track.id,
				play_set_id: playSet.id
			},
			success: function(response) {
				playSet.tracks.remove(track);
			}
		});	
	},
});