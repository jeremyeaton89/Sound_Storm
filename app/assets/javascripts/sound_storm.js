window.SoundStorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new SoundStorm.Models.User().fetch({
    	success: function(response, data) {
        SoundStorm.currentUser = response; // for debugger
    		new SoundStorm.Routers.Router(
    			$("#content"), response
    		);
		    Backbone.history.start();
    	}
    });
  }
};

$(document).ready(function(){
  SoundStorm.initialize();
});
