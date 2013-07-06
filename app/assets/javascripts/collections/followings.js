SoundStorm.Collections.Followings = Backbone.Collection.extend({
	model: SoundStorm.Models.Following,
	url: "/followings",

});

// Later, grab folowing prospects form fb friends and top creators of each category