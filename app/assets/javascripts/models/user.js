SoundStorm.Models.User = Backbone.Model.extend({
	url: function() {
		if (this.id) {
			return "/users/" + this.id;
		} else {
			return "/users";
		}
	}
});