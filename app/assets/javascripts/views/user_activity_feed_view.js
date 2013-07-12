SoundStorm.Views.UserActivityFeedView = Backbone.View.extend({

	id: "user_activity_feed_view",
	tagName: "section",
	className: "middle-column",
	template: JST['users/user_activity_feed'],

	initialize: function(userAssets) {
		this.userAssets = userAssets;
		// this.listenTo(SoundStorm.currentUser.tracks, "change", this.render);
		// this.listenTo(SoundStorm.currentUser.playSets, "change", this.render);		
	},

	events: {
		"click button.add-to-set": "popSetForm",
		"click button.close": "removePopup",
		"click button.submit": "createPlaySet",
		"click .track button.remove": "removeTrack",
		"click .play-set button.remove": "removePlaySet",
		"click button.add-song-to-play-set": "addSong",
		"click button.remove-song-from-play-set": "removeSong",
		"click button.like": "createLike",
		"click button.unlike": "removeLike",
		"submit form.comment-form-tag": "createComment"
	},

	popSetForm: function(event) {
		$(event.target).addClass("hidden");
		$(event.target).closest(".track").after(JST['popups/add_to_set']({
			trackId: $(event.target).attr("data-track-id")
		}));		
	},

	removePopup: function(event) {
		$(event.target).closest(".popup").siblings(".track").find("button.add-to-set").removeClass("hidden");
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
				console.log(model.get('name') + " deletion success!");
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
				$(event.target).parent(".play-set").remove();
			}
		});
	},
	// add track to set
	addSong: function(event) {
		$(event.target).addClass("hidden");
		$(event.target).siblings("button").removeClass("hidden");
		var track = SoundStorm.currentUser.tracks.get($(event.target).closest(".popup").attr("data-track-id"));
		var playSet = SoundStorm.currentUser.playSets.get($(event.target).attr("data-play-set-id"));
		$.ajax({
			url: "play_settings.json",
			type: "POST",
			data: { play_setting: { 
				track_id: track.id,
				play_set_id: playSet.id
			}},
			success: function(response) {
				playSet.tracks.add(track);
			}
		});	
	},
	// remove track from set
	removeSong: function(event) {
		$(event.target).addClass("hidden");
		$(event.target).siblings("button").removeClass("hidden");
		var track = SoundStorm.currentUser.tracks.get($(event.target).attr("data-track-id"));
		var playSet = SoundStorm.currentUser.playSets.get($(event.target).attr("data-play-set-id"));
		// debugger
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

	createComment: function(event) {
		event.preventDefault();
		var attrs = $(event.target).serializeJSON();
		SoundStorm.currentUser.comments.create(attrs, { 
			success: function(model, data) {
				$(event.target).find(".comment-field").val("")
				var comment = JST['tracks/comment']({ comment: model });
				// var img = _.clone($(event.target).closest(".comment-form").prev(".widget").find("img.tiny-image").addClass("visible"));
				console.log($(comment).siblings("span").css("left"))
				// debugger
				$(comment).siblings("span").css("left", "+=12px");
				console.log($(comment).siblings("span").css("left"))

				$(event.target).closest(".comment-form").prev(".widget").find(".comments").append(comment)
				
				// debugger
				setTimeout(function() { 
					$(comment).siblings("img").trigger("mouseover") 
					$(comment).remove();
				}, 3000);
			}
		});
	},

	render: function() {
		var content = this.template({ userAssets: this.userAssets });
		this.$el.html(content);
		return this;
	}
});